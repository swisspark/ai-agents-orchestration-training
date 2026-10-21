# AI Agents Orchestration Masterclass

Production-grade AI Agents Orchestration Masterclass: Build autonomous, concurrent agent systems using **Go** (backend) and **Node.js/TypeScript** (frontend/BFF).

## 📌 Executive Overview

This repository contains the full source code, lab exercises, architectural patterns, and slide decks for the **AI Agents Orchestration Masterclass**. Designed specifically for Senior Software Engineers, Architects, and Tech Leads.

## 🏗️ Repository Architecture

- `/backend-go`: High-performance Go microservice orchestrating concurrent tool executions using Goroutines and Channels.
- `/frontend-node`: TypeScript BFF using Vercel AI SDK and LangChain.js to stream agent reasoning in real-time.
- `/labs`: Step-by-step hands-on guides for students.
- `/slides`: Training presentation slides (`.pptx`).

## 🛠️ Tech Stack

- **Languages:** Go 1.22+, Node.js 20+, TypeScript
- **Tools:** GitHub Copilot, Docker, gRPC/REST SSE
- **AI Libraries:** Official GenAI Go SDK, LangChain.js, Vercel AI SDK

## Development checks

Install Node.js 22.13+, Go 1.24.11+, and Gitleaks 8.30.1. On macOS, install the
secret scanner with `brew install gitleaks`; alternatively use
`go install github.com/zricethezav/gitleaks/v8@v8.30.1` and put `$(go env GOPATH)/bin`
on your `PATH`.

From the repository root:

```sh
npm ci
npm run format
npm run check
npm run secrets
```

`npm ci` installs Lefthook's Git hooks. Reinstall them with
`npx --no-install lefthook install` if needed. Use the root lockfile and workspace
when updating frontend dependencies.

- **Pre-commit:** scans staged changes for secrets and checks Prettier, gofmt,
  ESLint, actionlint for GitHub workflows, TypeScript compilation, `go vet`,
  and race-enabled Go tests. The pinned actionlint tool is downloaded by Go
  on its first run.
- **Commit-msg:** enforces Conventional Commits, for example
  `feat(agent): add a new tool` or `docs: clarify setup`.
- **Pre-push:** repeats quality checks and scans all locally reachable Git history
  for secrets. Missing tools fail the checks rather than bypassing them.
- **CI:** repeats the quality and history-secret checks and validates new commit
  messages on pushes and pull requests. The initial repository commit is excluded
  when no previous commit is available.

Checks do not automatically modify or stage files. Run `npm run format` and stage
the results yourself. Environment files and private-key files are ignored by
default; `.env.example` may contain placeholders only. Gitleaks uses its built-in
rules without repository allowlists.

Hooks can be bypassed, and secret detectors cannot guarantee detection of every
credential (including secrets embedded in binary slides). Enable GitHub secret
scanning/push protection where available, and require the **Quality / quality**
check in branch protection or a ruleset. CI runs after a push and cannot undo a
leak; revoke and rotate any exposed credential immediately. Never put real
credentials in training material.

## 📜 License

Licensed under the [Apache License 2.0](LICENSE).
