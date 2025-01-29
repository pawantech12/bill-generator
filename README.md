## 🚀 Billing System  

A web-based **Billing System** built using **ReactJS, TailwindCSS, Node.js (ExpressJS), and MongoDB**. The system enables users to generate fuel invoices dynamically and export them as PDFs. The backend leverages **jsPDF and jsPDF-AutoTable** for generating professional invoices.  

### ⚡ Current Features  
- Generate **fuel invoices** with station details, vehicle information, and payment details.  
- Select different **tax identifiers** (GST, CST, TXN) dynamically.  
- Export fuel bills as **PDF invoices**.  

### 🔧 Tech Stack  
- **Frontend**: ReactJS, TailwindCSS  
- **Backend**: Node.js, ExpressJS, MongoDB  
- **PDF Generation**: jsPDF, jsPDF-AutoTable  

### 📌 Upcoming Features
- User authentication & authorization.  
- Dashboard to view and manage invoices.  
- Multi-currency & multiple tax categories.  
- Email integration for sending invoices.  
- Advanced PDF styling with company branding.  

### 📂 Installation & Setup  

1. **Clone the Repository**  
   ```sh
   git clone https://github.com/pawantech12/bill-generator.git
   cd bill-generator
   ```

2. **Install Dependencies**  
   ```sh
   # Install frontend dependencies
   cd client
   pnpm install

   # Install backend dependencies
   cd ../server
   pnpm install
   ```

3. **Start the Application**  
   ```sh
   # Run the backend server
   cd server
   pnpm start

   # Run the frontend
   cd ../client
   pnpm run dev
   ```

4. **Access the Application**  
   Open your browser and visit:  
   ```
   http://localhost:5173/fuel-bill-generator
   ```

### 📜 API Endpoints  

| Method | Endpoint       | Description               |
|--------|--------------|---------------------------|
| POST   | `/api/bills` | Create a new bill         |

### 📌 Contribution  
Contributions are welcome! Feel free to submit a pull request or open an issue for suggestions.  

### 📜 License  
This project is free to use and does not include any license.
