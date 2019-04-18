const express= require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const db= require('./db')
const collection = 'moviereview'

app.use(bodyparser.json())
