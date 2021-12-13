# Clean Workspace Action

자바스크립트를 이용한 워크스페이스 비우기 액션입니다. Self-hosted runner에서 사용하기에 유용합니다.  
It's cleaning workspace action using JavaScript. It's useful for Self-hosted runner.

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
      - uses: yumis-coconudge/clean-workspace-action@master
# ...
```

## Advanced Usage

If you use additional-path, it cleans specific directory or files, and workspace.
additional-path을 이용하면 워크스페이스와 함께 특정 디렉토리 또는 파일들을 같이 비웁니다.

**CAUTION**: If you make mistake like wrong path. it cannot recoverable. Be careful.  
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
      - uses: yumis-coconudge/clean-workspace-action@master
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

      - uses: yumis-coconudge/clean-workspace-action@master
        with:
          additional-path: "${{ env.GITHUB_WORKSPACE }}/a.txt,${{ env.GITHUB_WORKSPACE }}/b.txt"
# ...
```
