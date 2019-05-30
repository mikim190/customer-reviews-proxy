const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');
const proxy = require('http-proxy-middleware');
const path = require('path');

const PORT = 3020;
const app = express();

app.use(express.static(path.join(__dirname, '../public/')));
app.use(bodyParser.json());
app.use(cors());


const apiReview = proxy('/review', {target: 'http://localhost:3007'});

const apiReservation = proxy('/reservations', {target: 'http://localhost:3010'});

const apiPhoto = proxy('/photo', {target: 'http://localhost:3002'});

const apiMenu = proxy('/API/restaurant', {target: 'http://localhost:3003'});

app.use(apiMenu);
app.use(apiPhoto);
app.use(apiReservation);
app.use(apiReview);

app.get('/restaurant/*', (req,res) => {
    res.sendFile(path.join(__dirname,'../public/index.html'));
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));