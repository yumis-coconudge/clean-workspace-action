# Clean Workspace Action π

π‘ [English](readme_en.md)

μλ°μ€ν¬λ¦½νΈλ₯Ό μ΄μ©ν μν¬μ€νμ΄μ€ λΉμ°κΈ° μ‘μμλλ€. Self-hosted runnerμμ μ¬μ©νκΈ°μ μ μ©ν©λλ€.  
μλ°μ€ν¬λ¦½νΈλ₯Ό μ΄μ©νκΈ° λλ¬Έμ μ΄λ ν OSμμλ  μλν©λλ€.

# μ¬μ©λ²

## κΈ°λ³Έ μ¬μ©λ²

μν¬μ€νμ΄μ€λ₯Ό λΉμλλ€. μν¬μ€νμ΄μ€ κ²½λ‘λ νκ²½ λ³μλ₯Ό μ΄μ©ν©λλ€. (GITHUB_WORKSPACE)

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

## κ³ κΈ μ¬μ©λ²

additional-pathμ μ΄μ©νλ©΄ μν¬μ€νμ΄μ€μ ν¨κ» νΉμ  λλ ν λ¦¬ λλ νμΌλ€μ κ°μ΄ λΉμλλ€.  
μ‘΄μ¬νμ§ μμ νμΌμ λ¬΄μλ©λλ€.

**κ²½κ³ **: μλͺ»λ κ²½λ‘λ₯Ό μ¬μ©νκ²λλ©΄ λ³΅κ΅¬ν  μ μμ΅λλ€. μ‘°μ¬νμΈμ.

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

      # μν¬μ€νμ΄μ€μ Yarn μΊμ κ²½λ‘λ₯Ό μ λ¦¬ν©λλ€.
      - uses: yumis-coconudge/clean-workspace-action@v1
        with:
          additional-path: "${{ steps.yarn-cache-dir-path.outputs.dir }}"
# ...
```

μ¬λ¬ νμΌμ μ¬μ©νκ³  μΆλ€λ©΄, ","λ‘ λΆλ¦¬ν  μ μμ΅λλ€.  
λν, [glob](<https://ko.wikipedia.org/wiki/%EA%B8%80%EB%A1%9C%EB%B8%8C_(%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)>) ν¨ν΄μ μ§μν©λλ€.

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
