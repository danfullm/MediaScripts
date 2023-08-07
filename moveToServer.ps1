$sourceFolder = "\\costar\POD\Work\04_Dan\ppressFiles"
$destinationFolder = "\\planetpress2019\pepperPOD\Repository\"

# Check if the source folder exists
if (-Not (Test-Path $sourceFolder -PathType Container)) {
    Write-Host "Source folder does not exist: $sourceFolder"
    exit
}

# Check if the destination folder exists
if (-Not (Test-Path $destinationFolder -PathType Container)) {
    Write-Host "Destination folder does not exist: $destinationFolder"
    exit
}

# Get the list of PDF files from the source folder
$pdfFiles = Get-ChildItem -Path $sourceFolder -Filter "*.pdf" -File

$totalFiles = $pdfFiles.Count
$filesMoved = 0

foreach ($file in $pdfFiles) {
    $fileName = $file.Name
    $filePath = $file.FullName
    
    # Copy the file to the destination folder
    Copy-Item -Path $filePath -Destination $destinationFolder
    
    $filesMoved++
    $remainingFiles = $totalFiles - $filesMoved
    
    Write-Host "Moved file: $fileName ($filesMoved of $totalFiles). $remainingFiles files remaining."
}

Write-Host "All PDF files have been moved from $sourceFolder to $destinationFolder."
