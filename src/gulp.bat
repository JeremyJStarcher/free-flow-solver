@echo off
taskkill /im gulp /im gulp.exe /im node /im node.exe /f

node --es_staging   .\node_modules\gulp\bin\gulp.js %1 %2 %3 %4 %5 %6 %7
