import json
import subprocess
import sys
from packaging.version import Version

def get_pr_version():
    with open('package.json') as f:
        data = json.load(f)
        return data['version']

def get_main_version():
    try:
        result = subprocess.run(
            ['git', 'show', 'origin/main:package.json'],
            capture_output=True,
            text=True,
            check=True
        )
        main_pkg_json = json.loads(result.stdout)
        return main_pkg_json['version']
    except subprocess.CalledProcessError:
        print("ERROR: Cannot access 'main:package.json'.")
        sys.exit(1)
    except json.JSONDecodeError:
        print("ERROR: Unable to parse JSON from main:package.json.")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)


def main():
    pr_version = get_pr_version()
    main_version = get_main_version()

    if Version(pr_version) <= Version(main_version):
        print(f"ERROR: The package.json version in the PR must be strictly greater than the version in the main branch.")
        print(f"Current PR version: {pr_version}, Main branch version: {main_version}")
        sys.exit(1)
    else:
        print(f"Version check passed: PR version {pr_version} > main version {main_version}")

if __name__ == '__main__':
    main()