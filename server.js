const puppeteer = require('puppeteer');
const fileName = 'programme-tz';
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const httpPort = 1337;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

async function init() {
  const server = app.listen(httpPort);

  await generate(fileName, 'fr', httpPort);

  server.close();
}

async function generate(fileName, locale, httpPort) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-web-security', `--user-data-dir=data`]
  });
  const page = await browser.newPage();

  await page.goto(`http://localhost:${httpPort}`, {
    waitUntil: 'networkidle2'
  });

  await page.setViewport({
    width: 1240,
    height: 1740
  });

  await page.screenshot({ path: 'tz-programme.png' })

  await browser.close();
}

init();
