@echo off
title Deploy StitchAble to Vercel
echo ========================================================
echo        Deploying StitchAble to Vercel Cloud
echo ========================================================
echo.
echo Running Vercel deployment...
call pnpm dlx vercel --prod
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Trying fallback with npx...
    call npx vercel --prod
)
echo.
pause
