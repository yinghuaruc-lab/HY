@echo off
cd /d "%~dp0"
echo 📦 正在更新体重管理健康实验室...

echo.
echo 1️⃣ 添加更改...
git add .

echo.
echo 2️⃣ 输入提交信息（直接回车使用默认信息）:
set /p msg="> "
if "%msg%"=="" set msg=Update: %date% %time%

git commit -m "%msg%"

echo.
echo 3️⃣ 推送到 GitHub...
git push

echo.
echo ✅ 完成！项目已更新到 https://github.com/yinghuaruc-lab/HY
pause
