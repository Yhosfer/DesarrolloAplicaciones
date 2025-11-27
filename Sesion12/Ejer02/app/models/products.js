const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    amount: Number,
    description: String,
});
module.exports = mongoose.model('products', ProductSchema);
