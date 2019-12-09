const request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();

var country = '';

app.use(bodyParser.json());

app.use(cors());

app.get('/api/data', function(req, res) {
    var resCountry = {"country" : country};
    res.send(JSON.parse(JSON.stringify([resCountry, resCurrency, resNews])));
});

app.post('/api/country', (req, res) => {
    // console.log(req.body.name)
    country = req.body.name;
    newsResponse(country);
    res.send({status: 'ok', country: req.body.name})
})

var porta = process.env.PORT || 8080;
app.listen(porta, function() {
  console.log('Server is running at localhost:'+porta);
});

// ********************************* NEWS - API *******************************************
// var country = 'br';
const apiKey = 'b652c21f8e4547b7924f4002b4caa66e';

const hostname = 'https://newsapi.org/v2/top-headlines';
const countryPath = '?country=';
const apikeyPath = '&apiKey='+apiKey;

var resNews = '';

// request(`${hostname}${countryPath}${apikeyPath}`,(err, res, body) => {
//     resNews = JSON.parse(body);
// }) 

function newsResponse(country) {
    request(`${hostname}${countryPath+country}${apikeyPath}`,(err, res, body) => {
        resNews = JSON.parse(body);
    }) 
    return resNews;
}
// ********************************** CURRENCY - API **************************************
var resCurrency = '';

const hostnameCurrency = 'https://economia.awesomeapi.com.br/all/USD-BRL,GBP-BRL';
request(`${hostnameCurrency}`,(err, res, body) => {
    resCurrency = JSON.parse(body);
})
