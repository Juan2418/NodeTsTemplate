const mongooseOriginal = require('mongoose');

export const mongoose = mongooseOriginal.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
});
