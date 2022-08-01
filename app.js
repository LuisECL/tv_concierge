const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000")
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.render('./public/index', function (err, html) {
  if (err) {
    console.log(err);
  }
})