const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const indexRouter = require('../routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.use('/api/movies', indexRouter);

app.use(function(req, res, next) {
  res.status(404).send({ error: 'Not found' })
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send({ error: err })
});

module.exports = app;