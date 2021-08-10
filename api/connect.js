const http = require("http");
const express = require("express");
const app = express();
const rp = require("request-promise");
const port = 7777;

const getSkillExchangeRate = async () => {
  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
    qs: {
      symbol: "skill",
      convert: "aed",
    },
    headers: {
      "X-CMC_PRO_API_KEY": "9e4d08b1-32f6-4830-8402-c118a31d0c29",
    },
    json: true,
    gzip: true,
  };
  //     rp(requestOptions)
  //   .then((response) => {
  //     console.log("API call response:", response.data["SKILL"].quote);
  //   })
  //   .catch((err) => {
  //     console.log("API call error:", err.message);
  //   });

  return await rp(requestOptions);
};

app.get("/", async function (req, res) {
  const response = await getSkillExchangeRate();

  const exchange_rate = response.data.SKILL.quote;

  res.json(exchange_rate);
});

app.listen(port, function (req, res) {
  console.log(`Server is running at port ${port}`);
});
