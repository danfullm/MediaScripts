call npm run build
docker build -t jwpepper.azurecr.io/pepper-review-sheet:latest -f Dockerfile ./ --progress=plain
docker push jwpepper.azurecr.io/pepper-review-sheet:latest
