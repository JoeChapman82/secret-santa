require('dotenv').config();
const express = require('express');
const initDb = require('./app/model/init');
const bootstrap = require('./app/middleware/bootstrap');
const PORT = process.env.PORT;
const app = express();

bootstrap(app);
initDb();

app.listen(PORT, () => console.log(`Santa's secret tool, is listening on port ${PORT}`));
