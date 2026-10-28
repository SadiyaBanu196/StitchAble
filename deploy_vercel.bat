@echo off
title Deploy StitchAble to Vercel
echo ========================================================
echo        Deploying StitchAble to Vercel Cloud
echo ========================================================
echo.
echo Running Vercel deployment...
npx vercel --prod
echo.
pause
