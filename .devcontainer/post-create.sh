#!/usr/bin/env bash
set -euo pipefail

# System tools (gh, jq, actionlint) come from devcontainer features.
npm ci
npm run build
