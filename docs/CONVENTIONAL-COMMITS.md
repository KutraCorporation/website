# Conventional Commits

Use the Conventional Commits 1.0.0 format:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Use `!` or a `BREAKING CHANGE:` footer for breaking changes. Keep the subject imperative and concise. Examples:

- `feat(search): add project suggestions`
- `fix(contact): reject oversized messages`
- `test(d1): cover contact persistence failures`
- `ci(security): add CodeQL workflow`

The repository uses commitlint through the Husky `commit-msg` hook. Existing commits are not rewritten.
