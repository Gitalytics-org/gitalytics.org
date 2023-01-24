const express = require('express');
const app = express();
const path = require("path");
const glob = require('glob');
const { request } = require('http');

const port = 3000;
const hostname = 'localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

glob.sync('./routes/*.js').forEach( function(file) {
    require(path.resolve(file))(app);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});