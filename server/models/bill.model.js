const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  template: { type: String, required: true },
  logo: { type: String, required: true },
  stationName: { type: String, required: true },
  stationAddress: { type: String, required: true },
  fuelRate: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  billDate: { type: String, required: true },
  billTime: { type: String, required: true },
  customerName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  taxIdentifier: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Bill", BillSchema);
