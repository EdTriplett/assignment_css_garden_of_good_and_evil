const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  let options = {
    alignment: 'good',
    good: true,
    evil: false
  };
  if (req.cookies.alignment === "good") {
    options.alignment = "good";
    options.good = true;
    options.evil = false;
  } else if (req.cookies.alignment === "evil") {
  	options.alignment = "evil";
  	options.good = false;
  	options.evil = true;
  }
  options['favorite-food'] = req.cookies['favorite-food'];
  res.render('index', options);
}) 

app.listen(3000)

app.post('/', (req, res) => {
  // if (req.body.alignment === 'good') {
  // 	res.cookie("alignment", "good");
  // } else {
  // 	res.cookie("alignment", "evil");
  // }
  res.cookie("alignment", req.body.alignment)
  if (req.body['favorite-food']) {
  res.cookie("favorite-food", req.body['favorite-food'])
  }
  res.redirect("/");
})

// app.post("/favorite/:id", (req, res) => {
//   const id = req.params.id;
//   const favorites = req.cookies.favorites || [];
//   res.cookie("favorites", favorites.push(id));
//   res.redirect("/");
// });

