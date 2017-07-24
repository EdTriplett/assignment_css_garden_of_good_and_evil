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
    evil: false,
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
  options["favoriteColor"] = req.cookies.favoriteColor || "white";
  options.insanity = req.cookies.insanity || 2;

  if (options.insanity === "3") {
  	options.insane = true;
  } else {
  	options.insane = false;
  }

  if (options.insanity === "1") {
    options.boring = true;
  } else {
    options.boring = false;
  }


  res.render('index', options);
}) 

app.listen(3000)

app.post('/', (req, res) => {
  res.cookie("alignment", req.body.alignment)
  if (req.body['favorite-food']) {
	  res.cookie("favorite-food", req.body['favorite-food'])
  }
  if (req.body.favoriteColor) {
  	res.cookie("favoriteColor", req.body.favoriteColor);
  }
  res.cookie("insanity", req.body.insanity);
  res.redirect("/");
})
