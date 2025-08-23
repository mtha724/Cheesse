# Contributing to Cheesse  

Thank you for considering contributing to **Cheesse**!  
We welcome all contributions, whether it’s fixing bugs, improving documentation, or adding new features.  

---

## Branching Workflow
After forking and cloning the repository

- Always work on a feature branch instead of main.
- Branch names should describe the work being done:
  - feature/add-ai-bot
  - fix/move-validation
  - docs/update-readme
Example workflow:
```bash
git checkout -b feature/add-ai-bot
# make changes
git commit -m "Add easy-level AI opponent"
git push origin feature/add-ai-bot
```
## Coding Guidelines
- Adheres to JavaScript style guides
- Keeps code modular and easy to understand
- Commits: Keep them concise, descriptive, and meaningful.

## Testing
- Run all tests before submitting a PR:
```bash
npm test
```
Add tests for any new features you implement.
Ensure existing tests still pass after your changes

## Pull Requests
1. Push your branch to your fork:
```bash
git push origin feature/your-feature-name
```
2. Open a Pull Request (PR) against main in the original repository.
3. Include a clear description:
  - What the change does
  - Why it’s needed
  - Link any related issues (Closes #issue-number)
4. Make sure all GitHub Actions (tests, linting) pass before requesting review
