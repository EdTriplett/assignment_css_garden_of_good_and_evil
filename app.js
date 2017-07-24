const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  let options = {};
  options.alignment = req.cookies.alignment;
  options.good = req.cookies.good;
  options.evil = req.cookies.evil;
  res.render('index', options);
}) 

app.listen(3000)

app.post('/', (req, res) => {
  if (req.body.alignment === 'good') {
    res.cookies.alignment = 'good';
    res.cookies.good = true;
    res.cookies.evil = false;
  } else {
    res.cookies.alignment = 'evil';
    res.cookies.evil = true;
    res.cookies.good = false;
  }
  res.redirect("/");
})

// app.post("/favorite/:id", (req, res) => {
//   const id = req.params.id;
//   const favorites = req.cookies.favorites || [];
//   res.cookie("favorites", favorites.push(id));
//   res.redirect("/");
// });

