<<<<<<< Tabnine <<<<<<<
# PowerShell script for cleaning up and reinstalling node modules

# Step 1: Remove node_modules and package-lock.json
Write-Host "Removing node_modules and package-lock.json..."
if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }
if (Test-Path package-lock.json) { Remove-Item -Force package-lock.json }

# Step 1.1: Check and remove .git/index.lock if it exists
if (Test-Path .git/index.lock) {
    Write-Host "Removing .git/index.lock..."
    Remove-Item -Force .git/index.lock
}

# Step 2: Stage and commit changes (if there are any)
Write-Host "Staging and committing changes..."
git add .
$hasChanges = -not [string]::IsNullOrEmpty((git status --porcelain))
if (-not $hasChanges) {
    Write-Host "No changes to commit."
} else {
    git commit -m "Removed node_modules and package-lock.json"
}

# Step 3: Reinstall dependencies
Write-Host "Reinstalling dependencies..."
npm install

# Step 4: Stage and commit the reinstalled dependencies (if there are changes)
Write-Host "Staging and committing reinstalled dependencies..."
git add .
$hasChanges = -not [string]::IsNullOrEmpty((git status --porcelain))
if (-not $hasChanges) {
    Write-Host "No changes to commit after npm install."
} else {
    git commit -m "Reinstalled node_modules and updated package-lock.json"
}

# Step 5: Push changes to the repository (with upstream setup if necessary)
Write-Host "Pushing changes to the repository..."
$hasUpstream = $null -ne (git rev-parse --abbrev-ref --symbolic-full-name @{upstream} 2>$null)
if ($hasUpstream) {
    git push
} else {
    git push --set-upstream origin master
}

# Step 6: Address npm audit issues (if necessary)
Write-Host "Running npm audit fix..."
npm audit fix --force

Write-Host "Script completed."
>>>>>>> Tabnine >>>>>>># {"source":"chat"}