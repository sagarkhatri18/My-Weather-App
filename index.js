const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

// body parser was used to get the form data from html file
app.use(bodyParser.urlencoded({ extended: true }));

// static files were declared
app.use(express.static("public"));

// entry point of the app
app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

// handle the form submit
app.post("/", (req, res) => {
  const cityName = req.body.city;
  const apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a3cf36171b928818de3d4f9d9ccc9604&units=metric`;

  axios
    .get(apiURL)
    .then(response => {
        const data = response.data;

        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const countryName = data.sys.country;
        const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        const content = `
            <div class="container" style="margin:auto; width:50%; border-radius: 5px;background-color: #0c140c1f;padding: 20px; text-align:center">
            <h1>${cityName} - ${countryName}</h1>
            <h3>Current Temperature: ${temperature} °C</h2>
            <h3>Weather Description: ${description}</h2>
            <img src=${imageURL} />
            </div>
        `;

        res.send(content);
    })
    .catch(err => console.log(err));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
