require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns");
const { log } = require("console");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const urlValid = [];

app.post(
  "/api/shorturl",
  (req, res, next) => {
    //validamos que exista la url
    let urlParam = req.body.url.replace('https://','');
    console.log("url enviada");
    console.log(urlParam);
    dns.lookup(urlParam, (err, address, family) => {
      if (err) {
        res.json({ error: "invalid url" });
      } else {
        console.log("si paso");
        next();
      }
    });
  },
  (req, res) => {
    console.log("entro");
    let url = req.body.url;
    let obj = {
      original_url: url, short_url: (urlValid.length + 1)
    }
    urlValid.push(obj);
    console.log("viendo cadena");
    console.log(urlValid);
    res.json(obj);
  }
);

app.get("/api/shorturl/:short_url", (req, res) => {
  let obj = urlValid.find((urlS) => urlS.short_url == req.params.short_url);
  res.redirect(obj.original_url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
