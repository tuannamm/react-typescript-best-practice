## 1. Branch: Mỗi repo require có 1 branch master để release

- **(1). features**: bao gồm các feature mới, style ui. update 1 feature mới
- **(2). fixes**: những task fix bug từ feature hoặc khác
- **(3). enhances**: refactor lại 1 feature hoặc component

## 2. Commit message:

- [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test][ name component/name feature]: descriptions
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs)
- **chore**: add something without touching production code (Eg: update npm dependencies)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: Reverts a previous commit
- **style**: Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
