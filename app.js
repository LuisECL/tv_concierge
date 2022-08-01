const express = require('express');
const app = express();

const Router = require('./routers/routes')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.use('/', Router)

app.listen(3000, () => {
  console.log("Server running on port 3000")
});