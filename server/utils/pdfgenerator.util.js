const { jsPDF } = require("jspdf");
require("jspdf-autotable");
const fs = require("fs");
const path = require("path");

// const generatePDF = async (data) => {

//   // Convert ArrayBuffer to Buffer
//   const pdfBytes = doc.output("arraybuffer");
//   const pdfBuffer = Buffer.from(pdfBytes); // Convert ArrayBuffer to Buffer

//   return pdfBuffer;
// };
const generatePDF = async (data) => {
  const doc = new jsPDF();

  // Select template based on data.template (template1 or template2)
  if (data.template === "template1") {
    return generateTemplate1(doc, data);
  } else if (data.template === "template2") {
    return generateTemplate2(doc, data);
  }

  // Fallback in case no template is specified (default to template1)
  return generateTemplate1(doc, data);
};

const generateTemplate1 = (doc, data) => {
  // Add title "Fuel Receipt" at the top center
  doc.setFontSize(20);
  doc.setTextColor(51, 102, 204); // RGB color for title
  doc.text("Fuel Receipt", 105, 30, { align: "center" });

  // Add logo at the top-left (adjusted position and scaling)
  const logoPath = path.join(__dirname, `../assets/${data.logo}.png`); // Ensure the logo exists at this path
  const logoBytes = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBytes.toString("base64")}`;

  // Place the logo before the "Billed To" section
  doc.addImage(logoBase64, "PNG", 10, 40, 40, 40); // Adjusted size and position

  // Billed To Section (Customer Info) - Left
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0); // Black color for text
  let y = 90; // Adjusted y position to move it below the logo
  const customerDetails = [
    `Billed To:`,
    `Customer Name: ${data.customerName}`,
    `Vehicle No: ${data.vehicleNumber}`,
    `Vehicle Type: ${data.vehicleType}`,
  ];
  customerDetails.forEach((detail) => {
    doc.text(detail, 20, y);
    y += 8; // Adjusted spacing
  });

  // Receipt Details Section - Right
  y = 50; // Start this section at the same level as "Billed To" section
  const receiptDetails = [
    `Receipt Details:`,
    `Date: ${data.billDate}`,
    `Time: ${data.billTime}`,
    `Fuel Station: ${data.stationName}`,
    `Station Address: ${data.stationAddress}`,
  ];

  // Function to handle text wrapping if it exceeds page width
  const wrapText = (text, x, y, maxWidth) => {
    const words = text.split(" ");
    let line = "";
    let lineHeight = 8;

    // Loop through each word and create a line
    words.forEach((word) => {
      const lineWidth = doc.getTextWidth(line + word);
      if (lineWidth < maxWidth) {
        line += word + " "; // Add the word to the current line if it fits
      } else {
        doc.text(line, x, y);
        y += lineHeight; // Move down after a line is written
        line = word + " "; // Start a new line with the current word
      }
    });

    // Print the last line
    if (line) {
      doc.text(line, x, y);
    }
  };

  // Loop through the receipt details and add them to the PDF
  receiptDetails.forEach((detail) => {
    if (detail.startsWith("Station Address:")) {
      // Wrap text for Station Address to avoid overflow
      wrapText(detail, 140, y, 60); // Adjust the maxWidth (60) to avoid overflow
    } else {
      doc.text(detail, 140, y);
      y += 8; // Adjusted spacing
    }
  });

  // Add tax identifier details dynamically
  if (data.taxIdentifier !== "none" && data[data.taxIdentifier]) {
    const taxIdentifierLabel = `${data.taxIdentifier.toUpperCase()} No.: ${
      data[data.taxIdentifier]
    }`;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black text
    doc.text(taxIdentifierLabel, 105, 130, { align: "center" }); // Horizontally center-aligned
  }

  // Payment Method in the center
  doc.setFontSize(14);
  doc.setTextColor(26, 51, 128); // Blue color for payment method
  doc.text(`Payment Method: ${data.paymentMethod}`, 105, 140, {
    align: "center",
  });

  // Receipt Summary Table with borders
  const tableHeader = ["Fuel Rate", "Quantity", "Total Amount"];
  const tableData = [
    [`${data.fuelRate}`, `${data.quantity}`, `${data.totalAmount}`],
  ];

  doc.autoTable({
    startY: 150,
    head: [tableHeader],
    body: tableData,
    theme: "grid", // grid style for borders
    headStyles: {
      fillColor: [51, 102, 204], // Blue header background
      textColor: [255, 255, 255], // White text color for header
    },
    styles: {
      cellPadding: 3,
      fontSize: 12,
    },
  });

  // Thank You Message at the bottom
  doc.setFontSize(14);
  doc.setTextColor(0, 128, 0); // Green color for thank you message
  doc.text("Thank you for your purchase!", 105, 270, { align: "center" });

  return createPDFBuffer(doc);
};
const generateTemplate2 = (doc, data) => {
  // Get PDF page width
  const pageWidth = doc.internal.pageSize.getWidth();

  // Calculate the X position for center alignment
  const logoWidth = 50; // Width of the logo
  const centerX = (pageWidth - logoWidth) / 2;

  // Add logo at the top-center
  const logoPath = path.join(__dirname, `../assets/${data.logo}.png`);
  const logoBytes = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBytes.toString("base64")}`;

  doc.addImage(logoBase64, "PNG", centerX, 20, logoWidth, 50); // Centered logo

  let y = 80; // Adjusted vertical position for text

  // Add Receipt No. (Invoice No.)
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0); // Black text
  doc.text(`Receipt No: ${data.invoiceNumber}`, 20, y); // Left aligned
  y += 10;

  doc.text(`Product Details:`, 20, y);
  y += 8;
  doc.text(`Fuel Rate: ${data.fuelRate} /Ltr`, 20, y);
  y += 8;
  doc.text(`Total Amount: ${data.totalAmount}`, 20, y);
  y += 8;
  doc.text(`Volume(Ltr): ${data.quantity}`, 20, y);
  y += 20;

  // Add Customer Details (Veh Type, Veh No, Customer Name)
  doc.text(`Veh Type: ${data.vehicleType}`, 20, y);
  y += 8;
  doc.text(`Veh No: ${data.vehicleNumber}`, 20, y);
  y += 8;
  doc.text(`Customer Name: ${data.customerName}`, 20, y);
  y += 20;

  // Add Date and Time (on the same line)
  doc.text(`Date: ${data.billDate}`, 20, y);
  doc.text(`Time: ${data.billTime}`, 180, y); // Right-aligned
  y += 10;

  // Add Payment Mode (centered)
  doc.setFontSize(14);
  doc.text(`Mode: ${data.paymentMethod}`, 20, y, { align: "left" });
  y += 20;

  // Add "Save fuel, save money" message (centered)
  doc.setFontSize(16);
  doc.setTextColor(0, 128, 0); // Green color for the message
  doc.text("Save fuel, save money", 105, y, { align: "center" });

  return createPDFBuffer(doc);
};

// Helper function to create PDF Buffer (both templates use this)
const createPDFBuffer = (doc) => {
  const pdfBytes = doc.output("arraybuffer");
  const pdfBuffer = Buffer.from(pdfBytes);
  return pdfBuffer;
};

module.exports = { generatePDF };
