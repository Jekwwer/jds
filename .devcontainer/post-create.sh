#!/usr/bin/env bash
set -euo pipefail

# System tools (gh, jq, actionlint) come from devcontainer features.
npm ci
npm run build

# `--with-deps` pulls apt libs chromium needs alongside the browser binary.
sudo npx playwright install --with-deps chromium
