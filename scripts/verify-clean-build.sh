#!/bin/sh
# Always clone committed candidate source; no ignored generated files may leak in.
set -eu
repo=$(git rev-parse --show-toplevel)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT HUP INT TERM
git clone --quiet --no-local "$repo" "$tmp/source"
cd "$tmp/source"
[ ! -e src/generated/contact.json ] || { echo 'Generated contact must not be committed' >&2; exit 1; }
export SITE_CONTACT_JSON='{"phone":"96890000000","whatsapp":"96890000000","email":"synthetic@example.test","addressAr":"عنوان اختبار وهمي","addressEn":"Synthetic fixture only","hoursAr":"أوقات اختبار","hoursEn":"Synthetic hours","siteUrl":"https://site.example.test","privacyText":"Synthetic automated-test privacy text only. Not approved business content.","contentApproved":true,"privacyApproved":true,"mapQuery":"0,0"}'
export VITE_BASE=/
npm ci
# Exact Dockerfile verification order, after npm ci.
npm test
npm run build
npm run lint
node scripts/verify-site-output.mjs
unset SITE_CONTACT_JSON
if npm run build > "$tmp/missing-contact.log" 2>&1; then
 echo 'FAIL: build allowed missing contact configuration' >&2; exit 1
fi
grep -q SITE_CONTACT_JSON "$tmp/missing-contact.log"
echo 'PASS: fresh committed clone install/test/build/lint and generated output; missing contact refused'
