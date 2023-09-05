# React_Symfony_note_Taker
a Note Taking web_app made with React and symfony

this is a step-by-step on how to configure this project:
1/ clone the repository ( the ReMade Branch)
2/ make sure you're in the repository with cd Remade
3/ run : composer install
4/ change in the file .env:
        your database url/user/password
5/ to migrate the DataBase use : 
        php bin/console doctrine:database:create
        php bin/console make:migration
        php bin/console doctrine:migrations:migrate

5 / for the node.js dependencies use : yarn install / or npm install
6/ then yarn encore dev --watch  # or npm run encore dev --watch to apply any changes you make
7/in another Terminal use : symfony serve -d
                                npm run watch   
access the application by going to http://localhost:8000 (usually) or check the above command results
