# Clean Workspace Action

It's cleaning workspace action using JavaScript. It's useful for Self-hosted runner.  
자바스크립트를 이용한 워크스페이스 비우기 액션입니다. Self-hosted runner에서 사용하기에 유용합니다.

It works any operating system that available for JavaScript environment.  
자바스크립트를 이용하기 때문에 어떠한 OS에서든 작동합니다.

# Usage

## Basic Usage

Cleaning workspace. Workspace path is using environment variable. (GITHUB_WORKSPACE)  
워크스페이스를 비웁니다. 워크스페이스 경로는 환경 변수를 이용합니다. (GITHUB_WORKSPACE)

```yaml
# ...
name: Some workflows
jobs:
  build:
    name: Some build
    runs-on: macos-latest
    steps:
      - uses: yumis-coconudge/clean-workspace-action@v1
# ...
```

## Advanced Usage

If you use additional-path, it cleans specific directory or files, and workspace.  
additional-path을 이용하면 워크스페이스와 함께 특정 디렉토리 또는 파일들을 같이 비웁니다.

action will be ignored for no existed files.  
존재하지 않은 파일은 무시됩니다.

**CAUTION**: If you make mistake like wrong path. it cannot be recoverable. Be careful.  
**경고**: 잘못된 경로를 사용하게되면 복구할 수 없습니다. 조심하세요.

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
        run: echo "::set-output name=dir::$(yarn cache dir)"

      # Clean workspace and Clean yarn cache
      - uses: yumis-coconudge/clean-workspace-action@v1
        with:
          additional-path: "${{ steps.yarn-cache-dir-path.outputs.dir }}"
# ...
```

If you want to use multiple files, it could split with ",".  
여러 파일을 사용하고 싶다면, ","로 분리할 수 있습니다.

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
        run: echo "::set-output name=dir::$(yarn cache dir)"

      - uses: yumis-coconudge/clean-workspace-action@v1
        with:
          additional-path: "~/a.txt,~/b.txt"
# ...
```
