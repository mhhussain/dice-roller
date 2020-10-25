cd ..
heroku container:push web -a cc-dice-roller-dev
heroku container:release web -a cc-dice-roller-dev

heroku open -a cc-dice-roller-dev