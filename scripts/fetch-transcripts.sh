#!/usr/bin/env bash
# Download a Master.dev course's caption files.
#
#   ./scripts/fetch-transcripts.sh 2023-04-18-fullstack-v3 ./transcripts slugs.txt
#
# The caption host serves plain, unsigned URLs:
#   https://captions.master.dev/assets/courses/<course>/<n>-<slug>.vtt
# where <n> is the lesson's 0-based position in the course index. Read the
# lesson titles off the course page, slugify them, and feed them in as
# slugs.txt — one "<n>-<slug>.vtt" per line.
set -euo pipefail
course="${1:?course id, e.g. 2023-04-18-fullstack-v3}"
outdir="${2:?output directory}"
list="${3:?file listing <n>-<slug>.vtt per line}"
base="https://captions.master.dev/assets/courses/$course"
mkdir -p "$outdir"
ok=0 failed=()
while read -r f; do
    [ -z "$f" ] && continue
    if [ "$(curl -s -o "$outdir/$f" -w '%{http_code}' "$base/$f")" = "200" ]; then
        ok=$((ok + 1))
    else
        rm -f "$outdir/$f"; failed+=("$f")
    fi
done < "$list"
echo "downloaded $ok"
[ ${#failed[@]} -eq 0 ] || printf 'failed: %s\n' "${failed[@]}"
