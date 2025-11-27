const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose;
