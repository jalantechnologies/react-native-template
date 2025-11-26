import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as path from 'path';

type SemverSegment = 'major' | 'minor' | 'patch';

interface PackageJson {
  name: string;
  version: string;
  [key: string]: unknown;
}

const semverSegments: SemverSegment[] = ['major', 'minor', 'patch'];
const releaseNotesDir = path.resolve(__dirname, '..', 'docs', 'release_notes');
const packageJsonPath = path.resolve(__dirname, '..', 'package.json');

const getSegmentFromArgs = (): SemverSegment => {
  const requestedSegment = process.argv[2] as SemverSegment | undefined;

  if (!requestedSegment) {
    return 'patch';
  }

  if (!semverSegments.includes(requestedSegment)) {
    const validSegments = semverSegments.join(', ');
    throw new Error(
      `Invalid semver segment "${requestedSegment}". Use one of: ${validSegments}.`,
    );
  }

  return requestedSegment;
};

const parseVersion = (rawVersion: string): [number, number, number] => {
  const parsed = rawVersion.split('.').map(Number);

  if (parsed.length !== 3 || parsed.some((value) => Number.isNaN(value))) {
    throw new Error(
      `Unable to parse version "${rawVersion}". Please ensure it follows the SemVer format (e.g., 1.2.3).`,
    );
  }

  return parsed as [number, number, number];
};

const stringifyVersion = ([major, minor, patch]: [number, number, number]): string =>
  `${major}.${minor}.${patch}`;

const bumpVersion = (
  [major, minor, patch]: [number, number, number],
  segment: SemverSegment,
): [number, number, number] => {
  if (segment === 'major') {
    return [major + 1, 0, 0];
  }

  if (segment === 'minor') {
    return [major, minor + 1, 0];
  }

  return [major, minor, patch + 1];
};

const releaseNotesTemplate = (version: string): string => {
  const isoDate = new Date().toISOString().split('T')[0];

  return `# Release ${version} (${isoDate})

## Summary
- Replace these example bullets with concise, customer-facing highlights.

## Fixes
- Document defect fixes in business terms so they can be published.

## Technical Notes
- Capture internal notes, migration steps, or QA guidance.
`;
};

const ensureReleaseNote = (version: string): void => {
  mkdirSync(releaseNotesDir, { recursive: true });
  const releaseNotePath = path.join(releaseNotesDir, `${version}.md`);

  try {
    readFileSync(releaseNotePath);
    console.info(
      `Release note "${releaseNotePath}" already exists. Please update it manually with the new details.`,
    );
  } catch (error) {
    writeFileSync(releaseNotePath, releaseNotesTemplate(version));
    console.info(
      `Created release note stub at "${releaseNotePath}". Please edit the file before distributing the release.`,
    );
  }
};

const updatePackageVersion = (segment: SemverSegment): string => {
  const packageJsonBuffer = readFileSync(packageJsonPath, 'utf-8');
  const packageJson: PackageJson = JSON.parse(packageJsonBuffer);

  const currentVersion = packageJson.version;
  if (typeof currentVersion !== 'string') {
    throw new Error('Missing "version" in package.json. Please add it before bumping.');
  }

  const bumpedVersion = bumpVersion(parseVersion(currentVersion), segment);
  packageJson.version = stringifyVersion(bumpedVersion);

  writeFileSync(`${packageJsonPath}`, `${JSON.stringify(packageJson, null, 2)}\n`);

  console.info(`Version updated: ${currentVersion} -> ${packageJson.version}`);
  return packageJson.version;
};

const run = (): void => {
  try {
    const segment = getSegmentFromArgs();
    const newVersion = updatePackageVersion(segment);
    ensureReleaseNote(newVersion);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred while bumping the version.';
    console.error(`${message} Resolve the issue and re-run the script.`);
    process.exitCode = 1;
  }
};

run();

