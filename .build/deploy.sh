####################################################################################
##
## Builds in the following order:
##  1. npm install all client dependencies
##  2. Build client (builds to ~/server/src/public)
##  3. npm install all server dependencies
##  4. Docker build and push to tag
####################################################################################
cd ../client
npm i
yarn run build
cd ../server
npm i
cd ../

docker build -t moohh/dice-roller:1.0.0 .
docker push moohh/dice-roller:1.0.0

echo '************************************************************************'
echo ''
echo ''
echo 'Ready to push and start container moohh/dice-roller:1.0.0'
echo 'Run command - heroku container:push web && heroku container:release web';
echo ''
echo ''
