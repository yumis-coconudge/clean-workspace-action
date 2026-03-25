# Clean Workspace Action 🗑

💡 [English](readme_en.md)

자바스크립트를 이용한 워크스페이스 비우기 액션입니다. Self-hosted runner에서 사용하기에 유용합니다.  
자바스크립트를 이용하기 때문에 어떠한 OS에서든 작동합니다.

# 사용법

## 기본 사용법

워크스페이스를 비웁니다. 워크스페이스 경로는 환경 변수를 이용합니다. (GITHUB_WORKSPACE)

```yaml
# ...
name: Some workflows
jobs:
  build:
    name: Some build
    runs-on: macos-latest
    steps:
      - uses: yumis-coconudge/clean-workspace-action@v1.0.7
# ...
```

## 고급 사용법

additional-path을 이용하면 워크스페이스와 함께 특정 디렉토리 또는 파일들을 같이 비웁니다.  
존재하지 않은 파일은 무시됩니다.

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
        run: echo "dir=$(yarn cache dir)" >> $GITHUB_OUTPUT

      # 워크스페이스와 Yarn 캐시 경로를 정리합니다.
      - uses: yumis-coconudge/clean-workspace-action@v1.0.7
        with:
          additional-path: "${{ steps.yarn-cache-dir-path.outputs.dir }}"
# ...
```

여러 파일을 사용하고 싶다면, ","로 분리할 수 있습니다.  
또한, [glob](<https://ko.wikipedia.org/wiki/%EA%B8%80%EB%A1%9C%EB%B8%8C_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)>) 패턴을 지원합니다.

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

      - uses: yumis-coconudge/clean-workspace-action@v1.0.7
        with:
          additional-path: "~/a.txt,~/b.txt"
# ...
```
