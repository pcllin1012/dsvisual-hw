#!/usr/bin/env bash
# Generate a self-contained public-practice repo tree from a vendored lab snapshot.
# Usage: scripts/make_lab_repo.sh <slug>   (no network; writes dist/lab-repos/ds2026-lab-<slug>)
set -euo pipefail
slug="${1:?usage: make_lab_repo.sh <slug>}"
root="$(cd "$(dirname "$0")/.." && pwd)"
src="$root/labs/$slug"
[ -d "$src" ] || { echo "no vendored snapshot: $src"; exit 1; }
out="$root/dist/lab-repos/ds2026-lab-$slug"
rm -rf "$out"; mkdir -p "$out/src" "$out/samples" "$out/.github/workflows"

# public content only
cp "$src/statement.md" "$out/statement.md"
[ -f "$src/statement.en.md" ] && cp "$src/statement.en.md" "$out/statement.en.md" || true
cp "$src"/samples/* "$out/samples/"

# template files
tpl="$root/scripts/lab-repo-template"
cp "$tpl/src/main.cpp" "$out/src/main.cpp"
cp "$tpl/Makefile" "$out/Makefile"
cp "$tpl/.github/workflows/check.yml" "$out/.github/workflows/check.yml"
dsvisual="https://skhuang.github.io/dsvisual"
sed -e "s/__SLUG__/$slug/g" -e "s#__DSVISUAL__#$dsvisual#g" "$tpl/README.md" > "$out/README.md"

# guard: never ship hidden data
if ls "$out"/tests 2>/dev/null || ls "$out"/ref.cpp 2>/dev/null; then echo "GUARD FAILED: hidden data present"; exit 1; fi
echo "generated $out"
