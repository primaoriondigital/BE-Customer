const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    booking_type: { type: String, required: true },
    cleaner_id: { type: String},
    status: { type: String, required: true },
    price: { type: Number },
    description: { type: String },
    rating: { type: Number },
    review: { type: String },
});

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
});

const priceSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
});

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, required: true },
});

const Category = mongoose.model('Category', categorySchema);
const Order = mongoose.model('Order', orderSchema);
const Price = mongoose.model('Price', priceSchema);
const Service = mongoose.model('Service', serviceSchema);

module.exports = {Order,Category,Price,Service};