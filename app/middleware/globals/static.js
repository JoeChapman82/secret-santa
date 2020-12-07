const express = require('express');
const path = require('path');

module.exports = (app) => {
    app.use(express.static(path.join(process.cwd(), '/app/assets/')));
    app.use(/.*assets.*font.*/, (req, res, next) => {
        res.status(404).send('Not found');
    });
    return app;
};
