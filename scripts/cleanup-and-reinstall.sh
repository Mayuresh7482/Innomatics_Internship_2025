<<<<<<< Tabnine <<<<<<<
#!/bin/bash#-

# Step 1: Remove node_modules and package-lock.json#-
echo "Removing node_modules and package-lock.json..."#-
rm -rf node_modules package-lock.json#-
Describe "Cleanup and Reinstall Script" {#+
    BeforeEach {#+
        # Mock functions to prevent actual execution#+
        Mock Write-Host { }#+
        Mock Test-Path { return $false } -ParameterFilter { $Path -eq "node_modules" }#+
        Mock Test-Path { return $false } -ParameterFilter { $Path -eq "package-lock.json" }#+
        Mock Test-Path { return $false } -ParameterFilter { $Path -eq ".git/index.lock" }#+
        Mock Remove-Item { }#+
        Mock git { }#+
        Mock npm { }#+
    }#+

# Step 1.1: Check and remove .git/index.lock if it exists#-
if [ -f .git/index.lock ]; then#-
    echo "Removing .git/index.lock..."#-
    rm -f .git/index.lock#-
fi#-
    It "Should handle non-existent node_modules directory gracefully" {#+
        # Source the script#+
        . ".\cleanup-and-reinstall.ps1"#+

# Step 2: Stage and commit changes (if there are any)#-
echo "Staging and committing changes..."#-
git add .#-
if git diff-index --quiet HEAD --; then#-
    echo "No changes to commit."#-
else#-
    git commit -m "Removed node_modules and package-lock.json"#-
fi#-
        # Verify Test-Path was called for node_modules#+
        Should -Invoke Test-Path -Times 1 -ParameterFilter { $Path -eq "node_modules" }#+

# Step 3: Reinstall dependencies#-
echo "Reinstalling dependencies..."#-
npm install#-
        # Verify Remove-Item was not called for node_modules since it doesn't exist#+
        Should -Invoke Remove-Item -Times 0 -ParameterFilter { $Path -eq "node_modules" }#+

# Step 4: Stage and commit the reinstalled dependencies (if there are changes)#-
echo "Staging and committing reinstalled dependencies..."#-
git add .#-
if git diff-index --quiet HEAD --; then#-
    echo "No changes to commit after npm install."#-
else#-
    git commit -m "Reinstalled node_modules and updated package-lock.json"#-
fi#-
#-
# Step 5: Push changes to the repository (with upstream setup if necessary)#-
echo "Pushing changes to the repository..."#-
if git rev-parse --abbrev-ref --symbolic-full-name HEAD@{upstream} > /dev/null 2>&1; then#-
    git push#-
else#-
    git push --set-upstream origin master#-
fi#-
#-
# Step 6: Address npm audit issues (if necessary)#-
echo "Running npm audit fix..."#-
npm audit fix --force#-
#-
echo "Script completed."#-
        # Verify the script continued execution (checking for other steps like npm install)#+
        Should -Invoke npm -Times 2 # Once for install, once for audit fix#+
        Should -Invoke git -Times 5 # For various git operations#+
    }#+
}#+
>>>>>>> Tabnine >>>>>>># {"source":"chat"}