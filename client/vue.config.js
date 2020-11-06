module.exports = {
  "outputDir": "/Users/seraphim/code/dice-roller/server/public",
  "devServer": {
    "proxy": {
      "/": {
        "target": "http://localhost:5001"
      },
      "/authenticate": {
        "target": "http://localhost:5001"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}