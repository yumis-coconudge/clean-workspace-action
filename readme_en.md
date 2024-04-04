# Clean Workspace Action 🗑

It's cleaning workspace action using JavaScript. It's useful for Self-hosted runner.  
It works any operating system that available for JavaScript environment.

# Usage

## Basic Usage

Cleaning workspace. Workspace path is using environment variable. (GITHUB_WORKSPACE)

```yaml
# ...
name: Some workflows
jobs:
  build:
    name: Some build
    runs-on: macos-latest
    steps:
      - uses: yumis-coconudge/clean-workspace-action@v1.0.6
# ...
```

## Advanced Usage

If you use additional-path, it cleans specific directory or files, and workspace.  
action will be ignored for no existed files.  
**CAUTION**: If you make mistake like wrong path. it cannot be recoverable. Be careful.

```yaml
# ...
name: Some workflows
jobs:
  build:
    name: Some build
    runs-on: macos-latest
    steps:
      - name: Get yarn cache directory.
        id: yarn-cache-dir-path
        run: echo "dir=$(yarn cache dir)" >> $GITHUB_OUTPUT

      # Clean workspace and Clean yarn cache
      - uses: yumis-coconudge/clean-workspace-action@v1.0.6
        with:
          additional-path: "${{ steps.yarn-cache-dir-path.outputs.dir }}"
# ...
```

If you want to use multiple files, it could split with ",".  
And also, it supports [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) pattern.

```yaml
# ...
name: Some workflows
jobs:
  build:
    name: Some build
    runs-on: macos-latest
    steps:
      - name: Get yarn cache directory.
        id: yarn-cache-dir-path
        run: echo "dir=$(yarn cache dir)" >> $GITHUB_OUTPUT

      - uses: yumis-coconudge/clean-workspace-action@v1.0.6
        with:
          additional-path: "~/a.txt,~/b.txt"
# ...
```
