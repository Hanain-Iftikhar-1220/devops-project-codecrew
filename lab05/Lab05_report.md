# Lab 05 — Builds, Dependencies and Versioned Artifacts

**Student:** Muhammad Anas  
**Roll Number:** 23-NTU-CS-1183  
**Course:** DevOps Principles and Practices  
**Lab:** 05 — Builds, Dependencies and Versioned Artifacts  
**Date:** 27 October 2026  
**Team:** CodeCrew

---

## 1. Objective

The objective of this lab was to manage project dependencies, automate the build process using npm and Make, use a lock file for reproducible installations, create a versioned npm package, test the package in a separate consumer directory, and publish it to GitHub Packages.

## 2. Dependency Management

The project uses `markdown-it` to convert Markdown source files into HTML pages.

The dependency is declared in `package.json`. The version range `^15.0.3` allows compatible releases in the 15.x version range while excluding version 16.0.0 and later.

The command used to inspect installed dependencies was:

```bash
npm ls --all
```

This command displays the installed dependency tree, including transitive dependencies and deduplicated packages.

The installed `markdown-it` version observed during testing was `15.0.3`.

## 3. Build Automation

The project contains a Makefile and a Node.js build script at `tools/build.js`.

The package defines the following npm commands:

- `npm test` runs the Node.js test suite.
- `npm run build` runs the build script.
- `make ci` runs the continuous integration sequence defined in the Makefile.

The build tool converts Markdown files from `src/` into HTML files in `out/`.

The project includes three Markdown source files:

- `src/notes.md`
- `src/greeting.md`
- `src/services.md`

The build process generates corresponding HTML files. The `out/` directory contains generated output and is not included in the submission ZIP.

## 4. Lock File and Reproducibility

The project contains both `package.json` and `package-lock.json`.

`package.json` declares the dependencies and their allowed version ranges. `package-lock.json` records the resolved dependency versions and related installation information.

The command used for a clean installation is:

```bash
npm ci
```

Unlike `npm install`, `npm ci` requires the package manifest and lock file to be in sync. If a dependency is added manually to `package.json` without updating the lock file, `npm ci` refuses to install the inconsistent dependency tree.

A reproducibility experiment can compare dependency-file hashes after two clean installations:

```bash
rm -rf node_modules
npm ci
find node_modules -type f | sort | xargs shasum | shasum

rm -rf node_modules
npm ci
find node_modules -type f | sort | xargs shasum | shasum
```

The actual hash outputs should be recorded from the terminal if this experiment is required as evidence.

## 5. Packaging the Application

The package metadata defines the package name, version, command-line executable, dependencies, and files to include.

**Package name:** `@hanain-iftikhar-1220/devops-pipeline`

**Local package artifact:** `hanain-iftikhar-1220-devops-pipeline-1.2.0.tgz`

The packaging commands are:

```bash
npm pack --dry-run
npm pack
```

The dry run previews the files that will be included. The generated `.tgz` file can be inspected with:

```bash
tar -tzf hanain-iftikhar-1220-devops-pipeline-1.2.0.tgz
```

The package should contain the files needed by a consumer, including `package.json`, `README.md`, and `tools/build.js`, without `node_modules/` or generated `out/` files.

## 6. Testing in a Separate Consumer Directory

The package was tested outside the project directory to verify that it could be installed and used independently.

A local tarball was installed in a separate consumer directory. The command-line tool was then run against a Markdown file:

```bash
printf '# test\n' > in.md
npx devops-build in.md out.html
cat out.html
```

The test succeeded and produced HTML containing the heading `test`.

This demonstrates that the packaged command-line tool can convert a Markdown input file into HTML in a separate consumer directory.

## 7. Dependency Failure Experiment

The dependency experiment moved `markdown-it` from `dependencies` to `devDependencies`, then packaged and installed the application in a fresh consumer directory.

The consumer command failed with `MODULE_NOT_FOUND` for `markdown-it`.

The reason is that `markdown-it` is required when the published command-line tool runs. A normal consumer installation does not install the package's development dependencies as runtime dependencies.

The fix was to restore `markdown-it` to `dependencies` and regenerate the installation state. The dependency tree was checked with:

```bash
npm ls --all
```

The final local package was tested again successfully.

## 8. Publishing to GitHub Packages

The package is published in the team's GitHub repository.

**Package:** `@hanain-iftikhar-1220/devops-pipeline`

**Verified published version:** `1.2.0`

**GitHub Packages URL:**

https://github.com/Hanain-Iftikhar-1220/devops-project-codecrew/pkgs/npm/devops-pipeline

The package page displayed version `1.2.0` as the latest version. The registry query also returned `1.1.0`.

The local submission contains a `1.2.0` tarball, but the registry query did not find version `1.2.0`. Therefore, `1.2.0` is recorded as the local artifact version, not as a published version.

GitHub Packages authentication uses a personal access token configured outside the project. Tokens and other secrets must never be included in the report or submission ZIP.

## 9. Submission Contents

The submission ZIP contains:

- The local `.tgz` package artifact
- `package.json`
- `package-lock.json`
- `Makefile`
- `README.md`
- `tools/build.js`
- The Markdown source files in `src/`
- The test file in `test/`
- This report

Generated `node_modules/` and `out/` directories are excluded from the submission ZIP.

## 10. Conclusion

This lab demonstrated dependency declaration, build automation, lock-file-based installation, package creation, independent consumer testing, and publishing to GitHub Packages.

The consumer test showed that the command-line package worked outside its development directory. The dependency failure experiment demonstrated why runtime dependencies must be declared in `dependencies`.

The published package URL provides access to the team's package page. The published version currently verified is `1.1.0`; the local `1.2.0` artifact must not be described as published until the registry confirms that version.
