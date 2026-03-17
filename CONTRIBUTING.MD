# Contributing to IqbalAPI

First off — thank you for taking the time to contribute. IqbalAPI exists to make Allama Iqbal's poetry accessible to every developer, and every contribution helps that mission.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started Locally](#getting-started-locally)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Credit & Attribution](#credit--attribution)

---

## Code of Conduct

Be respectful. This project is rooted in cultural heritage — treat it and each other accordingly.

---

## How Can I Contribute?

**Bug fixes**
Found something broken? Open an issue first, describe the problem, then submit a PR with the fix.

**New features**
Have an idea? Open an issue and discuss it before building. This keeps effort from going to waste.

**Data corrections**
If you find a verse that is incorrectly transcribed, mistranslated, or misattributed — please open an issue with the correct text and a source reference. Data integrity is the most important thing in this project.

**Documentation**
Improvements to the docs site, clearer examples, additional language examples — all welcome.

**Performance & architecture**
Suggestions for query optimization, caching, or API design improvements are very welcome.

---

## Getting Started Locally

### Prerequisites

- Node.js 18+
- PostgreSQL
- Git

### Setup

```bash
# 1. Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/iqbal-api.git
cd iqbal-api

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env
# Fill in your local PostgreSQL credentials in .env

# 4. Set up the database
# Import the schema and seed data (see /database folder)

# 5. Start the development server
npm run dev
```

### Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Port to run the server on (default: 3000) |

> Never commit your `.env` file. It is listed in `.gitignore` for a reason.

---

## Submitting Changes

1. **Fork** the repository
2. **Create a branch** — use a descriptive name
   ```bash
   git checkout -b fix/verse-pagination
   git checkout -b feature/books-filter
   ```
3. **Make your changes** — keep commits focused and descriptive
4. **Test** your changes locally before submitting
5. **Open a Pull Request** against the `main` branch
6. **Describe what you changed and why** in the PR description

Pull requests without a description will not be reviewed.

---

## Reporting Issues

When opening an issue please include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Your environment (OS, Node version, etc.)

For data issues (incorrect verses, translations) please include a source reference — AllamaIqbal.com or a verifiable published edition.

---

## Credit & Attribution

IqbalAPI is built and maintained by **Mirza AbdulMoeed** ([@TheMirza009](https://github.com/TheMirza009)).

This project is licensed under the **MIT License**. You are free to use, fork, and build on top of it — but please:

- Keep the copyright notice intact
- Credit the original project when building something public with it
- Do not misrepresent the source or authorship of the data

The poetry data is sourced from [AllamaIqbal.com](https://www.allamaiqbal.com).

---
