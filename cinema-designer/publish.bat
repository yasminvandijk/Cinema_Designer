:: production build
@echo publishing production build to .\docs
call ng build --prod --base-href="https://yasminvandijk.github.io/Cinema_Designer/"

:: copy index.html as 404.html
@echo copying index.html to 404.html
call copy /y .\docs\index.html .\docs\404.html

:: copy contents /docs folder
@echo copying contents from .\docs to ..\docs
call xcopy /i/s/y .\docs ..\docs
pause