 const fs = require('fs');
const path = require('path');

const versionType = process.argv[2] || 'patch';
const packageJsonPath = path.resolve(__dirname, '..', 'package.json');

const allowedTypes = ['major', 'minor', 'patch'];
if (!allowedTypes.includes(versionType)) {
  throw new Error(`Unsupported version type "${versionType}". Use one of ${allowedTypes.join(', ')}.`);
}

const fileContent = fs.readFileSync(packageJsonPath, 'utf8');
const pkg = JSON.parse(fileContent);

function incrementVersion(version, type) {
  const [major, minor, patch] = version.split('.').map(Number);

  if ([major, minor, patch].some((part) => Number.isNaN(part))) {
    throw new Error(`Invalid semver format "${version}".`);
  }

  if (type === 'major') {
    return `${major + 1}.0.0`;
  }

  if (type === 'minor') {
    return `${major}.${minor + 1}.0`;
  }

  return `${major}.${minor}.${patch + 1}`;
}

pkg.version = incrementVersion(pkg.version, versionType);

fs.writeFileSync(packageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');

console.log(`✅ Updated package version to ${pkg.version}`);

