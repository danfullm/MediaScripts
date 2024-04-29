#!/bin/bash
set -e

. ~/.bash_profile || true
nvm install
nvm use
npm install
ESLINT_NO_DEV_ERRORS=true CI=false npm run build
docker build -t jwpepper.azurecr.io/pepper-review-sheet:latest -f Dockerfile ./ --progress=plain
docker push jwpepper.azurecr.io/pepper-review-sheet:latest
