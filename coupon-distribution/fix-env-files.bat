@echo off
echo This script will help remove .env files from Git tracking
echo Make sure you have Git installed and accessible from command line

cd %~dp0
echo Removing backend/.env from Git tracking...
git rm --cached backend/.env
echo Removing frontend/.env from Git tracking...
git rm --cached frontend/.env

echo.
echo Done! The .env files are now untracked but still exist in your local filesystem.
echo You can now commit these changes to ensure .env files won't be pushed anymore.
echo.
echo Run the following command to commit:
echo git commit -m "Remove .env files from tracking"
echo.
pause 