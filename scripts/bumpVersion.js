#!/usr/bin/env node
const { execSync } = require('child_process');
const { readFileSync, writeFileSync, existsSync, renameSync } = require('fs');
const path = require('path');

const PACKAGE_JSON = path.resolve(__dirname, '..', 'package.json');
const RELEASE_NOTES_DIR = path.resolve(__dirname, '..', 'docs', 'release_notes');

function fetchMainPackageJson() {
  let ref = null;

  try {
    execSync('git fetch origin main --quiet', { stdio: 'ignore' });
    ref = 'origin/main';
  } catch (error) {
    console.warn('⚠️  Could not fetch origin/main. Trying local main branch.');
  }

  if (!ref) {
    try {
      execSync('git show-ref --verify --quiet refs/heads/main');
      ref = 'main';
    } catch (error) {
      console.warn('⚠️  No local main branch found. Falling back to current package.json.');
      const current = JSON.parse(readFileSync(PACKAGE_JSON, 'utf8'));
      return current;
    }
  }

  const mainPackage = execSync(`git show ${ref}:package.json`, { encoding: 'utf8' });
  return JSON.parse(mainPackage);
}

function incrementPatch(version) {
  const parts = version.split('.').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    throw new Error(`Invalid semver format: ${version}`);
  }
  parts[2] += 1;
  return parts.join('.');
}

function updatePackageJson(nextVersion) {
  const packageJson = JSON.parse(readFileSync(PACKAGE_JSON, 'utf8'));
  packageJson.version = nextVersion;
  writeFileSync(PACKAGE_JSON, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
}

function renameReleaseNotes(previousVersion, nextVersion) {
  const previousPath = path.join(RELEASE_NOTES_DIR, `${previousVersion}.md`);
  const nextPath = path.join(RELEASE_NOTES_DIR, `${nextVersion}.md`);

  if (existsSync(nextPath)) {
    console.log(`✅ Release notes already exist for ${nextVersion}: ${nextPath}`);
    return nextPath;
  }

  if (!existsSync(previousPath)) {
    console.warn(`⚠️  No release notes found for ${previousVersion}. Create ${nextPath} manually if needed.`);
    return nextPath;
  }

  renameSync(previousPath, nextPath);
  console.log(`📝 Renamed release notes from ${previousVersion} to ${nextVersion}`);
  return nextPath;
}

function main() {
  const mainPackage = fetchMainPackageJson();
  const mainVersion = mainPackage.version;
  if (!mainVersion) {
    throw new Error('Version not found in origin/main package.json');
  }

  const nextVersion = incrementPatch(mainVersion);
  updatePackageJson(nextVersion);
  renameReleaseNotes(mainVersion, nextVersion);

  console.log(`✅ Updated package.json version to ${nextVersion}`);
}

main();
