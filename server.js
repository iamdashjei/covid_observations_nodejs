const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const moment = require('moment');

const restController = require("./controller/rest_controller");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}))

restController.addBulkData();

app.get("/", (req, res) => {
  res.json({ info: 'Welcome!'});
});

app.get("/top/confirmed", (req, res) => {
  const max_result = req.query.max_result;
  const observation_date = moment(new Date(req.query.observation_date)).format('YYYY-MM-DD');
  restController.getCovidResult(max_result,observation_date).then(data => res.json({ observation_date: observation_date, countries: data}));
});

app.listen(port, () => {
  console.log(`Server started and listening on the port ${port}`);
});
