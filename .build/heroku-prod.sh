cd ..
heroku container:push web -a cc-dice-roller
heroku container:release web -a cc-dice-roller

heroku open -a cc-dice-roller