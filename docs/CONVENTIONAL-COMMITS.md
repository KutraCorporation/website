# Conventional Commits

Use the Conventional Commits 1.0.0 format: `<type>[optional scope]: <description>`. Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Mark breaking changes with `!` or a `BREAKING CHANGE:` footer. Examples: `feat(search): add project suggestions`, `fix(contact): reject oversized messages`, `test(d1): cover persistence failures`. Husky runs commitlint on commit messages. Existing commits are not rewritten.
