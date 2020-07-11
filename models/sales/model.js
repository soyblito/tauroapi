const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
  createDate: { type: Date, default: Date.now },
  clientName: String,
  clientPhone: Number,
  clientAdress: String,
  deliveryValue: Number,
  contactValue: Number,
  paymentValue: Number,
  sellsmenValue: Number,
  amount: Number,
  sellstateValue: Number,
  selectedProductsList: Array,
});

const model = mongoose.model('Sales', mySchema);
module.exports = model;

