import React, { useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { FaChevronDown } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

const FuelBillGenerator = () => {
  const generateInvoiceNumber = () => {
    return `INV-${Date.now()}-${uuidv4().slice(0, 8)}`;
  };
  const [formData, setFormData] = useState({
    template: "template1",
    logo: "",
    stationName: "",
    stationAddress: "",

    fuelRate: "",
    totalAmount: "",
    billDate: format(new Date(), "yyyy-MM-dd"),
    billTime: format(new Date(), "HH:mm"),
    customerName: "",
    vehicleNumber: "",
    vehicleType: "petrol",
    paymentMethod: "cash",
    invoiceNumber: generateInvoiceNumber(),
    taxIdentifier: "none",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "taxIdentifier") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        [value]: prevData[value] || "", // Initialize the new tax identifier field if it doesn't exist
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/generate-bill`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("Bill generated successfully! Check your email.");
        // after success empty all form fields
        setFormData({
          template: "template1",
          logo: "",
          stationName: "",
          stationAddress: "",
          fuelRate: "",
          totalAmount: "",
          billDate: format(new Date(), "yyyy-MM-dd"),
          billTime: format(new Date(), "HH:mm"),
          customerName: "",
          vehicleNumber: "",
          vehicleType: "petrol",
          paymentMethod: "cash",
          invoiceNumber: generateInvoiceNumber(),
          taxIdentifier: "none",
          email: "",
        });
      } else {
        toast.error(data.message || "Failed to generate the bill.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateQuantity = (fuelRate, totalAmount) => {
    const quantity = (totalAmount / fuelRate).toFixed(2);
    return quantity || "---";
  };

  return (
    <div className="min-h-screen py-12 px-8 max-sm:px-5 flex gap-5 max-[1050px]:flex-col">
      <div className="w-1/2 max-[1050px]:w-full bg-white p-8 max-sm:px-5 rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-neutral-600 mb-8 text-center">
          Fuel & Petrol Bill Generator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Template */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Select Template
            </label>
            <div className="relative">
              <select
                name="template"
                value={formData.template}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 cursor-pointer rounded-lg bg-gray-50 text-gray-700  appearance-none 
                "
              >
                <option value="" disabled>
                  Select a Template
                </option>
                <option value="template1">Template 1</option>
                <option value="template2">Template 2</option>
              </select>
              <FaChevronDown className="absolute top-6 text-neutral-600 w-[14px] right-3 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Logo */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Select Logo
            </label>
            <div className="relative">
              <select
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 cursor-pointer rounded-lg bg-gray-50 text-gray-700  appearance-none"
              >
                <option value="" disabled>
                  Select a Logo
                </option>
                <option value="bharat_petroleum">Bharat Petroleum</option>
                <option value="indian_oil">Indian Oil</option>
                <option value="hp_oil">HP Oil</option>
                <option value="jio">Jio</option>
                <option value="essar_oil">Essar Oil</option>
                <option value="narayana">Narayana</option>
              </select>
              <FaChevronDown className="absolute top-6 text-neutral-600 w-[14px] right-3 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Fuel Station Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Fuel Station Name
            </label>
            <input
              type="text"
              name="stationName"
              value={formData.stationName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 "
              placeholder="Fuel Name"
            />
          </div>

          {/* Fuel Station Address */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Fuel Station Address
            </label>
            <input
              type="text"
              name="stationAddress"
              value={formData.stationAddress}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 "
              placeholder="Fuel Address"
            />
          </div>

          {/* Fuel Rate */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Fuel Rate
            </label>
            <input
              type="number"
              name="fuelRate"
              value={formData.fuelRate}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200  "
              placeholder="Fuel Rate"
            />
          </div>

          {/* Total Amount */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Total Amount
            </label>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 "
              placeholder="Total Amount"
            />
          </div>

          {/* Bill Date */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Bill Date
            </label>
            <input
              type="date"
              name="billDate"
              value={formData.billDate}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 cursor-pointer "
            />
          </div>

          {/* Bill Time */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Bill Time
            </label>
            <input
              type="time"
              name="billTime"
              value={formData.billTime}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 cursor-pointer rounded-lg bg-gray-50 text-gray-700  "
            />
          </div>

          {/* Customer Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200  rounded-lg bg-gray-50 text-gray-700  "
              placeholder="Customer Name"
            />
          </div>

          {/* Vehicle Number */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Vehicle Number
            </label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 "
              placeholder="Vehicle Number"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Vehicle Type
            </label>
            <div className="relative">
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 cursor-pointer appearance-none"
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="cng">CNG</option>
                <option value="electric">Electric</option>
              </select>
              <FaChevronDown className="absolute top-6 text-neutral-600 w-[14px] right-3 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="relative">
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 cursor-pointer appearance-none"
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
                <option value="card">Card</option>
              </select>
              <FaChevronDown className="absolute top-6 text-neutral-600 w-[14px] right-3 transform -translate-y-1/2" />
            </div>
          </div>

          {/* Invoice Number */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Invoice Number
            </label>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 "
              placeholder="Invoice Number"
            />
          </div>

          {/* Tax Identifier */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Tax Identifier
            </label>
            <div className="relative">
              <select
                name="taxIdentifier"
                value={formData.taxIdentifier}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 cursor-pointer appearance-none"
              >
                <option value="none">None</option>
                <option value="gst">GST No.</option>
                <option value="cst">CST No.</option>
                <option value="txn">TXN No.</option>
              </select>
              <FaChevronDown className="absolute top-6 text-neutral-600 w-[14px] right-3 transform -translate-y-1/2" />
            </div>
          </div>

          {formData.taxIdentifier !== "none" && (
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                {formData.taxIdentifier.toUpperCase()} No.
              </label>
              <input
                type="text"
                name={formData.taxIdentifier}
                value={formData[formData.taxIdentifier]}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200  "
                placeholder={formData.taxIdentifier.toUpperCase() + " No."}
              />
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-3  rounded-lg bg-gray-50 text-gray-700 border border-gray-200 focus:outline-neutral-700 transition-all ease-in-out duration-200 "
              placeholder="Email Address"
            />
            <p className="text-sm mt-2 text-gray-600">
              Please enter correct email. Bill PDF will be sent to this email
              address.
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-bold bg-neutral-700 hover:bg-neutral-800 rounded-lg transition duration-300 ease-in-out cursor-pointer"
            >
              {loading ? "Generating Bill..." : "Generate Bill"}
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 max-[1050px]:w-full py-5 px-8 border border-gray-300 h-fit overflow-x-auto">
        {formData.template === "template1" && (
          <div className="max-sm:w-[500px]">
            <h1 className="text-center text-blue-500 font-medium text-xl">
              Fuel Receipt
            </h1>
            <div className="flex justify-between">
              <div>
                <figure>
                  <img
                    src={`/${formData.logo || "placeholder"}.png`}
                    alt="logo"
                    className="w-28 h-28 object-contain rounded-full"
                  />
                </figure>
                <div className="flex flex-col gap-1 text-sm font-medium text-neutral-700">
                  <h4>Billed To:</h4>
                  <h4>Customer Name: {formData.customerName || "---"}</h4>
                  <h4>Vehicle No: {formData.vehicleNumber || "---"}</h4>
                  <h4>Vehicle Type: {formData.vehicleType || "---"}</h4>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm font-medium text-neutral-700 mt-5 w-[30%]">
                <h4>Receipt Details:</h4>
                <h4>Date: {formData.billDate || "---"}</h4>
                <h4>Time: {formData.billTime || "---"}</h4>
                <h4>Fuel Station: {formData.stationName || "---"}</h4>
                <h4>Station Address: {formData.stationAddress || "---"}</h4>
              </div>
            </div>
            {formData.taxIdentifier !== "none" && (
              <div className="text-center mt-16">
                <p className="text-neutral-700 font-medium">
                  {formData.taxIdentifier.toUpperCase()} No:{" "}
                  {formData[formData.taxIdentifier] || "---"}
                </p>
              </div>
            )}
            <div className="text-center mt-4">
              <p className="text-blue-500 font-medium">
                Payment Method: {formData.paymentMethod || "---"}
              </p>
            </div>
            <div className="mt-5">
              <table className="min-w-full table-auto text-sm  overflow-hidden">
                <thead>
                  <tr className="bg-blue-800 text-white">
                    <th className="py-3 px-4 text-left font-semibold">
                      Fuel Rate
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Quantity
                    </th>
                    <th className="py-3 px-4 text-left font-semibold">
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <td className="py-3 px-4 border border-gray-200 text-gray-800">
                      {formData.fuelRate || "---"}
                    </td>
                    <td className="py-3 px-4 border border-gray-200 text-gray-800">
                      {calculateQuantity(
                        formData.fuelRate,
                        formData.totalAmount
                      )}
                    </td>
                    <td className="py-3 px-4 border border-gray-200 text-gray-800">
                      {formData.totalAmount || "---"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-emerald-500 text-base text-center mt-20 mb-10 font-medium">
              Thank You for your purchase!
            </p>
          </div>
        )}

        {formData.template === "template2" && (
          <div className="max-sm:w-[500px]">
            <figure className="w-full flex flex-col items-center gap-3">
              <img
                src={`/${formData.logo || "placeholder"}.png`}
                alt="logo"
                className="w-40"
              />
              <h3 className="uppercase font-semibold text-sm">Welcome !</h3>
            </figure>
            <h4 className="text-neutral-700 mt-5 text-base">
              Receipt No: {formData.invoiceNumber || "---"}
            </h4>
            <div className="mt-5 uppercase text-sm font-semibold text-neutral-800">
              <h4>Product:</h4>
              <h4>Rate/ltr: {formData.fuelRate || "---"}</h4>
              <h4>Amount: {formData.totalAmount || "---"}</h4>
              <h4>
                Volume (ltr ):{" "}
                {calculateQuantity(formData.fuelRate, formData.totalAmount) ||
                  "---"}{" "}
                ltr
              </h4>
            </div>
            <div className="mt-5 uppercase text-sm font-semibold text-neutral-800">
              <h4>Veh Type: {formData.vehicleType || "---"}</h4>
              <h4>Veh no: {formData.vehicleNumber || "---"}</h4>
              <h4>Customer name: {formData.customerName || "---"}</h4>
            </div>
            <div className="mt-5 font-semibold text-sm">
              <div className="flex justify-between items-center">
                <span>Date: {formData.billDate || "---"}</span>
                <span>Time: {formData.billTime || "---"}</span>
              </div>
              <span className="mt-2">
                Mode: {formData.paymentMethod || "---"}
              </span>
            </div>
            <p className="my-20 text-center text-neutral-700">
              save fuel save money{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuelBillGenerator;
