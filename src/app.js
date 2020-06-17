const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const weather = require("./utils/weather.js");
const port = process.env.PORT || 3000;

//paths
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
console.log("partialsPath" + partialsPath);
const app = express();

// handelbars config
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//static resources
app.use(express.static(path.join(__dirname, "../public")));

//dynymic resources with handlebars
app.get("", (req, res) => {
  res.render("index", { title: "dynamic title" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "dynamic help" });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "please provide search param" });
  } else {
    res.send({ products: [] });
  }
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "please provide address" });
  } else {
    weather.geoCode(
      weather.geocodingUrl,
      req.query.address,
      weather.url,
      (url) => {
        request({ url: url, json: true }, (error, response) => {
          if (response.body.error) {
            console.log("geocoding request error");
          } else if (response) {
            const body = response.body;
            // console.log(body);

            res.send({ temperatur: body.current.temperature });
            console.log("end");
          }
        });
      }
    );
  }
});

app.get("*", (req, res) => {
  res.render("error", { errorMsg: "url not known" });
});

app.listen(port, () => {
  console.log("server is running...");
});
