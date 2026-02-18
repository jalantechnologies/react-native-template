### CI/CD hotfix
- Fixed `Version Bump` failure on merge where `git commit` failed with missing author identity.
- Added local git author config in `version-bump.yml` before committing rotated release notes.
- Restores bump commit creation so production and permanent preview can trigger from the bump push.
