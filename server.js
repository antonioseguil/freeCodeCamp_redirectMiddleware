require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const urlValid = [
  { original_url: "https://freeCodeCamp.org", short_url: 1 },
  { original_url: "https://google.com.pe", short_url: 2 },
];

function seachrUrl(url = "") {
  return urlValid.findIndex((findurl) => findurl.original_url == url);
}

app.post(
  "/api/shorturl",
  (req, res, next) => {
    //validamos que exista la url
    let urlParam = req.body.url;
    let searchUrl = seachrUrl(urlParam);
    if (searchUrl >= 0) {
      next();
    } else {
      res.json({ error: "invalid url" });
    }
  },
  (req, res) => {
    let url = req.body.url;
    let objurl = urlValid[seachrUrl(url)];
    res.json(objurl);
  }
);

app.get("/api/shorturl/:short_url", (req, res) => {
  let obj = urlValid.find((urlS) => urlS.short_url == req.params.short_url);
  res.redirect(obj.original_url);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
