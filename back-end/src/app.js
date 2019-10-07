'use strict';

const express = require('express');

const app = express();

const cors = require('cors');
const morgan = require('morgan');

const router = require('./router');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = {
    server: app,
    start: (port) => {
        const PORT = port || process.env.port || 8080;
        app.listen(PORT, () => {
          // eslint-disable-next-line no-console
          console.log(`HELLO! Server is Up on PORT ${PORT}`);
        });
      },
}

