# Contributing to Cheesse  

Thank you for considering contributing to **Cheesse**!  
We welcome all contributions, whether it’s fixing bugs, improving documentation, or adding new features.  

> **Note:** Please make sure to follow the [Code of Conduct](CODE_OF_CONDUCT.md) while interacting with the team and community.

---

## Filing a Bug Report

If you find a bug, please help us reproduce and fix it by providing:

1. **A clear and descriptive title**  
2. **Steps to reproduce the bug**  
3. **Expected behavior**  
4. **Actual behavior**  
5. **Screenshots or error messages** (if applicable)  
6. **Environment information**: OS, browser, Node.js version  

Create a new issue using the **“bug” label** so we can triage it efficiently.  

---

## Suggesting a New Feature

To propose a new feature:

1. Open a new issue with the **“enhancement” label**.  
2. Include:  
   - A short description of the feature  
   - Motivation: why this feature is needed  
   - Any relevant mockups, designs, or links  

Feature requests are reviewed by maintainers, and discussion is encouraged before implementation.  

---

## Submitting Issue Report

For other problems you can submit an issue report.

The default set of issue labels in GitHub is:
- bug:	Indicates an unexpected problem or unintended behavior
- documentation:	Indicates a need for improvements or additions to documentation
- duplicate:	Indicates similar issues, pull requests, or discussions
- enhancement:	Indicates new feature requests
- good first issue:	Indicates a good issue for first-time contributors
- help wanted:	Indicates that a maintainer wants help on an issue or pull request
- invalid:	Indicates that an issue, pull request, or discussion is no longer relevant
- question:	Indicates that an issue, pull request, or discussion needs more information
- wontfix:	Indicates that work won't continue on an issue, pull request, or discussion


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

## Pull Requests
1. Make your changes following the coding guidelines (see below)
2. Push your branch to your fork:
```bash
git push origin feature/your-feature-name
```
2. Open a Pull Request (PR) against main in the original repository.
3. Include a clear description:
  - What the change does
  - Why it’s needed
  - Link any related issues (Closes #issue-number)
4. Make sure all GitHub Actions (tests, linting) pass before requesting review

After submission:
Maintainers will review the code and provide feedback. You may be asked to make updates and once approved, the PR will be merged.

## Coding Guidelines
- Adheres to JavaScript style guides
- Keeps code modular and easy to understand
- Commits: Keep them concise, descriptive, and meaningful.
```bash
git commit -m "feat: Added easy AI bot functionality"
```

## Testing
- Run all tests before submitting a PR:
```bash
npm test
```
Add tests for any new features you implement.
Ensure existing tests still pass after your changes

---

## Types of Contributions:
We welcome contributions such as:
  - Bug fixes
  - New features
  - Documentation improvements
  - UI/UX improvements
  - Test coverage
    
We prefer contributors avoid:
  - Submitting incomplete or untested features
  - Changing core architecture without discussion
  - Off-topic code or unrelated experiments

---

## Getting Started for Newcomers
- Look for issues labeled “good first issue” to find beginner-friendly tasks.
- These issues are suitable for newcomers and come with guidance on how to get started.
- Ask questions on the issue thread — maintainers are happy to help

## Roadmap / Vision
A1 Release: Local PvP gameplay, full chess rules, basic GUI.
A2 Release (Planned): Single-player with AI, enhanced visuals, online multiplayer.
Future: Improvements in AI difficulty, animations, and potential new game modes.

A clear table can be found in [README.md](README.md)

---

## Project Ground Rules
- Respectful and professional communication is expected.
- Follow the [Code of Conduct](CODE_OF_CONDUCT.md).
- Ensure your changes do not break existing functionality.
- Contributions should align with the project vision.

---

## Getting in Touch
- Ask questions or discuss ideas via GitHub issues first.
- PR comments and issue discussions are the primary channels.
  
