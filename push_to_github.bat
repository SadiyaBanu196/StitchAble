@echo off
title Push StitchAble to GitHub
echo ========================================================
echo             Push StitchAble to GitHub
echo ========================================================
echo.
echo Make sure you have created an empty repository on GitHub first!
echo (e.g. https://github.com/new with repository name: STITCHABLE)
echo.
set /p REPO_URL="Enter your GitHub Repository URL (e.g., https://github.com/SadiyaBanu196/STITCHABLE.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL provided. Aborting.
    pause
    exit /b 1
)

echo.
echo Adding remote origin: %REPO_URL%
git remote remove origin 2>nul
git remote add origin %REPO_URL%

echo Setting default branch to main...
git branch -M main

echo Pushing code to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   SUCCESS: Code pushed to GitHub successfully!
    echo ========================================================
) else (
    echo.
    echo [NOTICE] If push failed due to authentication, you can sign in
    echo via GitHub Credential Manager when prompted or use a Personal Access Token.
)

echo.
pause
