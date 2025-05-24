const express = require("express");

const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/scrapper", async (request, response) => {
  const puppeteer = require("puppeteer");

  const url = request.query.url;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  const html = await page.content();

  await browser.close();

  response.send(html);
});
