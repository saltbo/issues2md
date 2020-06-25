# issues2md

<p align="left">
  <a href="https://github.com/saltbo/issues2md/actions"><img alt="GitHub Actions status" src="https://github.com/saltbo/issues2md/workflows/build/badge.svg"></a>
</p>

This action pull and convert issues to markdown documents for use in actions by:

- Post content in issues to a static blog


# Usage

See [action.yml](action.yml)

Basic:
```yaml
steps:
  - name: Fetch Issues
    uses: saltbo/issues2md@master
    with: 
      repo: saltbo/blog
      dist: docs/issues
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)