const Bill = require("../models/bill.model");
const nodemailer = require("nodemailer");
const { generatePDF } = require("../utils/pdfgenerator.util");

const generateBill = async (req, res) => {
  try {
    const billData = req.body;

    // Check for existing invoice number
    const existingBill = await Bill.findOne({
      invoiceNumber: billData.invoiceNumber,
    });
    if (existingBill) {
      return res
        .status(400)
        .json({ message: "Invoice number already exists. Please try again." });
    }

    // Calculate quantity based on total amount and fuel rate
    const { totalAmount, fuelRate } = billData;
    billData.quantity = (totalAmount / fuelRate).toFixed(2);

    // Save to MongoDB
    const newBill = new Bill(billData);
    await newBill.save();

    // Generate PDF
    const pdfBuffer = await generatePDF(billData);

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Fuel Bill Generator" <${process.env.EMAIL_USER}>`,
      to: billData.email,
      subject: "Your Fuel Bill",
      text: "Please find your bill attached.",
      attachments: [
        {
          filename: "FuelBill.pdf",
          content: pdfBuffer,
        },
      ],
    });

    res.status(200).json({ message: "Bill generated and sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = { generateBill };
