
// import React, { useState } from 'react';
// import './MainAdminOrderList.css';
// import MainSidebar from '../AdminSidebar/MainSidebar';

// const MainAdminOrderList = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalType, setModalType] = useState('');
//   const [showCustomerIds, setShowCustomerIds] = useState(false);
//   const [showProductIds, setShowProductIds] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const customers = [
//     { id: 'GF001', address: '123, Coimbatore, Pincode - 293830' },
//     { id: 'GF002', address: '456, Chennai, Pincode - 600001' },
//     { id: 'GF003', address: '789, Bangalore, Pincode - 560001' },
//   ];

//   const products = [
//     { id: 'P001', description: 'Product 1 - Electronics' },
//     { id: 'P002', description: 'Product 2 - Furniture' },
//     { id: 'P003', description: 'Product 3 - Groceries' },
//   ];

//   const tableData = [
//     [1, 2, 3, 4, 5, 6],
//     [3, 3, 3, 3, 3, 3],
//   ];

//   const columnTotals = tableData[0].map((_, colIndex) =>
//     tableData.reduce((sum, row) => sum + row[colIndex], 0)
//   );

//   const handleCellClick = (value, isTotal = false) => {
//     setModalType(isTotal ? 'total' : 'regular');
//     setIsModalOpen(true);
//   };

//   const handleTotalOption1Click = () => {
//     setShowCustomerIds(true);
//     setShowProductIds(false); // Ensure only customer IDs are shown.
//   };

//   const handleTotalOption2Click = () => {
//     setShowProductIds(true);
//     setShowCustomerIds(false); // Ensure only product IDs are shown.
//   };

//   const handleCustomerIdClick = (customer) => {
//     setSelectedCustomer(customer);
//   };

//   const handleProductIdClick = (product) => {
//     setSelectedProduct(product);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setShowCustomerIds(false);
//     setShowProductIds(false);
//     setSelectedCustomer(null);
//     setSelectedProduct(null);
//   };

//   return (
//     <>
//       <div>
//         <MainSidebar />
//       </div>
//       <table className="styled-table">
//         <thead>
//           <tr className="style-head">
//             <th colSpan={2}>Breakfast</th>
//             <th colSpan={2}>Lunch</th>
//             <th colSpan={2}>Dinner</th>
//           </tr>
//           <tr>
//             <th>Budget</th>
//             <th>Elite</th>
//             <th>Budget</th>
//             <th>Elite</th>
//             <th>Budget</th>
//             <th>Elite</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <td key={cellIndex} onClick={() => handleCellClick(cell)}>
//                   {cell}
//                 </td>
//               ))}
//             </tr>
//           ))}
//           <tr>
//             {columnTotals.map((total, index) => (
//               <td
//                 key={index}
//                 className="totals-cell"
//                 onClick={() => handleCellClick(total, true)}
//               >
//                 {total}
//               </td>
//             ))}
//           </tr>
//         </tbody>
//       </table>

//       {isModalOpen && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h3>{modalType === 'total' ? 'Total Cell Options' : 'Regular Cell Options'}</h3>
//             </div>
//             <div className="modal-options">
//               {modalType === 'total' && !showCustomerIds && !showProductIds ? (
//                 <>
//                   <button onClick={handleTotalOption1Click}>Total Option 1</button>
//                   <button onClick={handleTotalOption2Click}>Total Option 2</button>
//                 </>
//               ) : showCustomerIds ? (
//                 <div className="customer-id-section">
//                   <div className="customer-list">
//                     <h4>Customer IDs</h4>
//                     {customers.map((customer) => (
//                       <button
//                         key={customer.id}
//                         onClick={() => handleCustomerIdClick(customer)}
//                         className="customer-id-button"
//                       >
//                         {customer.id}
//                       </button>
//                     ))}
//                   </div>
//                   <div className="customer-address">
//                     {selectedCustomer ? (
//                       <>
//                         <h4>Delivery Address</h4>
//                         <p>{selectedCustomer.address}</p>
//                       </>
//                     ) : (
//                       <p>Please select a Customer ID to view the address.</p>
//                     )}
//                   </div>
//                 </div>
//               ) : showProductIds ? (
//                 <div className="product-id-section">
//                   <div className="product-list">
//                     <h4>Product IDs</h4>
//                     {products.map((product) => (
//                       <button
//                         key={product.id}
//                         onClick={() => handleProductIdClick(product)}
//                         className="product-id-button"
//                       >
//                         {product.id}
//                       </button>
//                     ))}
//                   </div>
//                   <div className="product-description">
//                     {selectedProduct ? (
//                       <>
//                         <h4>Product Description</h4>
//                         <p>{selectedProduct.description}</p>
//                       </>
//                     ) : (
//                       <p>Please select a Product ID to view the description.</p>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <button>Individual</button>
//                   <button>Combo</button>
//                 </>
//               )}
//             </div>
//             <button className="modal-close" onClick={closeModal}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default MainAdminOrderList;










// import React, { useState } from 'react';
// import './MainAdminOrderList.css';
// import MainSidebar from '../AdminSidebar/MainSidebar';

// const MainAdminOrderList = () => {
//   const [showCustomerIds, setShowCustomerIds] = useState(false);
//   const [showProductIds, setShowProductIds] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isSectionVisible, setIsSectionVisible] = useState(false);

//   const customers = [
//     { id: 'GF001', address: '123, Coimbatore, Pincode - 293830' },
//     { id: 'GF002', address: '456, Chennai, Pincode - 600001' },
//     { id: 'GF003', address: '789, Bangalore, Pincode - 560001' },
//   ];

//   const products = [
//     { id: 'GF001', description: 'Product 1 - Electronics' },
//     { id: 'GF002', description: 'Product 2 - Furniture' },
//     { id: 'GF003', description: 'Product 3 - Groceries' },
//   ];

//   // Keeping only the first row
//   const tableData = [
//     [1, 2, 3, 4, 5, 6], // First row (Clicking this row triggers the pop-up)
//   ];

//   const handleCellClick = () => {
//     setIsSectionVisible(true);
//     setShowCustomerIds(false);
//     setShowProductIds(false);
//   };

//   const handleTotalOption1Click = () => {
//     setShowCustomerIds(true);
//     setShowProductIds(false);
//   };

//   const handleTotalOption2Click = () => {
//     setShowProductIds(true);
//     setShowCustomerIds(false);
//   };

//   const handleCustomerIdClick = (customer) => {
//     setSelectedCustomer(customer);
//   };

//   const handleProductIdClick = (product) => {
//     setSelectedProduct(product);
//   };

//   return (
//     <>
//       <div>
//         <MainSidebar />
//       </div>

//       <table className="styled-table">
//         <thead>
//           <tr className="style-head">
//             <th colSpan={2}>Breakfast</th>
//             <th colSpan={2}>Lunch</th>
//             <th colSpan={2}>Dinner</th>
//           </tr>
//           <tr>
//             <th>Budget</th>
//             <th>Elite</th>
//             <th>Budget</th>
//             <th>Elite</th>
//             <th>Budget</th>
//             <th>Elite</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <td
//                   key={cellIndex}
//                   className="clickable-cell"
//                   onClick={handleCellClick}
//                 >
//                   {cell}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isSectionVisible && (
//         <div className="popup-content">
//           <h3>Food List</h3>
//           {!showCustomerIds && !showProductIds ? (
//             <>
//               <button onClick={handleTotalOption1Click}>Individual Plan 1</button>
//               <button onClick={handleTotalOption2Click}>Combo Plan 2</button>
//             </>
//           ) : showCustomerIds ? (
//             <div className="customer-id-section">
//               <div className="customer-list">
//                 <h4>Customer IDs</h4>
//                 {customers.map((customer) => (
//                   <button
//                     key={customer.id}
//                     onClick={() => handleCustomerIdClick(customer)}
//                     className="customer-id-button"
//                   >
//                     {customer.id}
//                   </button>
//                 ))}
//               </div>
//               <div className="customer-address">
//                 {selectedCustomer ? (
//                   <>
//                     <h4>Delivery Address</h4>
//                     <p>{selectedCustomer.address}</p>
//                   </>
//                 ) : (
//                   <p>Please select a Customer ID to view the address.</p>
//                 )}
//               </div>
//             </div>
//           ) : showProductIds ? (
//             <div className="product-id-section">
//               <div className="product-list">
//                 <h4>Product IDs</h4>
//                 {products.map((product) => (
//                   <button
//                     key={product.id}
//                     onClick={() => handleProductIdClick(product)}
//                     className="product-id-button"
//                   >
//                     {product.id}
//                   </button>
//                 ))}
//               </div>
//               <div className="product-description">
//                 {selectedProduct ? (
//                   <>
//                     <h4>Product Description</h4>
//                     <p>{selectedProduct.description}</p>
//                   </>
//                 ) : (
//                   <p>Please select a Product ID to view the description.</p>
//                 )}
//               </div>
//             </div>
//           ) : null}
//         </div>
//       )}
//     </>
//   );
// };

// export default MainAdminOrderList;







// import React, { useState } from 'react';
// import './MainAdminOrderList.css';
// import MainSidebar from '../AdminSidebar/MainSidebar';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import html2pdf from 'html2pdf.js';

// const MainAdminOrderList = () => {
//   const [showCustomerIds, setShowCustomerIds] = useState(false);
//   const [showProductIds, setShowProductIds] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isSectionVisible, setIsSectionVisible] = useState(false);

//   const customers = [
//     { id: 'GF001', address: '123, Coimbatore, Pincode - 293830' },
//     { id: 'GF002', address: '456, Chennai, Pincode - 600001' },
//     { id: 'GF003', address: '789, Bangalore, Pincode - 560001' },
//   ];

//   const products = [
//     { id: 'GF001', description: 'Product 1 - Electronics' },
//     { id: 'GF002', description: 'Product 2 - Furniture' },
//     { id: 'GF003', description: 'Product 3 - Groceries' },
//   ];

  
//   const tableData = [
//     [1, 2, 3, 4, 5, 6], 
//   ];

//   const handleCellClick = () => {
//     setIsSectionVisible(true);
//     setShowCustomerIds(false);
//     setShowProductIds(false);
//   };

//   const handleTotalOption1Click = () => {
//     setShowCustomerIds(true);
//     setShowProductIds(false);
//   };

//   const handleTotalOption2Click = () => {
//     setShowProductIds(true);
//     setShowCustomerIds(false);
//   };

//   const handleCustomerIdClick = (customer) => {
//     setSelectedCustomer(customer);
//   };

//   const handleProductIdClick = (product) => {
//     setSelectedProduct(product);
//   };

//   const exportToExcel = () => {
//     const table = document.querySelector(".styled-table");
//     const ws = XLSX.utils.table_to_sheet(table);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Orders");

//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
//     saveAs(data, "Order_List.xlsx");
//   };

//   const exportToPdf = () => {
//     const table = document.querySelector(".styled-table");
//     const opt = {
//       margin: 0.5,
//       filename: 'Order_List.pdf',
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
//     };
//     html2pdf().from(table).set(opt).save();
//   };

//   return (
//     <>
//       <div>
//         <MainSidebar />
//       </div>

//       <div className="export-buttons">
//         <button onClick={exportToExcel} className="export-button">Export to Excel</button>
//         <button onClick={exportToPdf} className="export-button">Export to PDF</button>
//       </div>

      
//       <table className="styled-table">
//         <thead>
//           <tr className="style-head">
//             <th colSpan={2}>Breakfast</th>
//             <th colSpan={2}>Lunch</th>
//             <th colSpan={2}>Dinner</th>
//           </tr>
//           <tr>
//             <th>Budget</th>
//             <th>Elite</th>
//             <th>Budget</th>
//             <th>Elite</th>
//             <th>Budget</th>
//             <th>Elite</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tableData.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <td
//                   key={cellIndex}
//                   className="clickable-cell"
//                   onClick={handleCellClick}
//                 >
//                   {cell}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isSectionVisible && (
//         <div className="popup-content">
//           <h3>Food List</h3>
//           {!showCustomerIds && !showProductIds ? (
//             <>
//               <button onClick={handleTotalOption1Click}>Individual Plan 1</button>
//               <button onClick={handleTotalOption2Click}>Combo Plan 2</button>
//             </>
//           ) : showCustomerIds ? (
//             <div className="customer-id-section">
//               <div className="customer-list">
//                 <h4>Customer IDs</h4>
//                 {customers.map((customer) => (
//                   <button
//                     key={customer.id}
//                     onClick={() => handleCustomerIdClick(customer)}
//                     className="customer-id-button"
//                   >
//                     {customer.id}
//                   </button>
//                 ))}
//               </div>
//               <div className="customer-address">
//                 {selectedCustomer ? (
//                   <>
//                     <h4>Delivery Address</h4>
//                     <p>{selectedCustomer.address}</p>
//                   </>
//                 ) : (
//                   <p>Please select a Customer ID to view the address.</p>
//                 )}
//               </div>
//             </div>
//           ) : showProductIds ? (
//             <div className="product-id-section">
//               <div className="product-list">
//                 <h4>Product IDs</h4>
//                 {products.map((product) => (
//                   <button
//                     key={product.id}
//                     onClick={() => handleProductIdClick(product)}
//                     className="product-id-button"
//                   >
//                     {product.id}
//                   </button>
//                 ))}
//               </div>
//               <div className="product-description">
//                 {selectedProduct ? (
//                   <>
//                     <h4>Product Description</h4>
//                     <p>{selectedProduct.description}</p>
//                   </>
//                 ) : (
//                   <p>Please select a Product ID to view the description.</p>
//                 )}
//               </div>
//             </div>
//           ) : null}
//         </div>
//       )}
//     </>
//   );
// };

// export default MainAdminOrderList;










import React, { useState } from 'react';
import './MainAdminOrderList.css';
import MainSidebar from '../AdminSidebar/MainSidebar';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MainAdminOrderList = () => {
  const [showCustomerIds, setShowCustomerIds] = useState(false);
  const [showProductIds, setShowProductIds] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const customers = [
    { id: 'GF001', address: '123, Coimbatore, Pincode - 293830' },
    { id: 'GF002', address: '456, Chennai, Pincode - 600001' },
    { id: 'GF003', address: '789, Bangalore, Pincode - 560001' },
  ];

  const products = [
    { id: 'GF001', description: 'Product 1 - Electronics' },
    { id: 'GF002', description: 'Product 2 - Furniture' },
    { id: 'GF003', description: 'Product 3 - Groceries' },
  ];

  const tableData = [
    [1, 2, 3, 4, 5, 6],
  ];

  const handleCellClick = () => {
    setIsSectionVisible(true);
    setShowCustomerIds(false);
    setShowProductIds(false);
  };

  const handleTotalOption1Click = () => {
    setShowCustomerIds(true);
    setShowProductIds(false);
  };

  const handleTotalOption2Click = () => {
    setShowProductIds(true);
    setShowCustomerIds(false);
  };

  const handleCustomerIdClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleProductIdClick = (product) => {
    setSelectedProduct(product);
  };

  const exportToExcel = () => {
    const table = document.querySelector(".styled-table");
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "Order_List.xlsx");
  };
  const exportToPdf = () => {
    const table = document.querySelector(".styled-table");
    const doc = new jsPDF();

    const headers = Array.from(table.querySelectorAll('thead tr:nth-child(2) th')).map(th => th.innerText);
    
    const rows = Array.from(table.querySelectorAll('tbody tr')).map(row => 
      Array.from(row.querySelectorAll('td')).map(cell => cell.innerText)
    );
  
    doc.autoTable({
      head: [headers],   
      body: rows,       
      startY: 20,      
    });
    doc.save('Order_List.pdf');
  };
  

  return (
    <>
      <div>
        <MainSidebar />
      </div>

      <div className="export-buttons">
        <button onClick={exportToExcel} className="export-button">Export to Excel</button>
        <button onClick={exportToPdf} className="export-button">Export to PDF</button>
      </div>

      <table className="styled-table">
        <thead>
          <tr className="style-head">
            <th colSpan={2}>Breakfast</th>
            <th colSpan={2}>Lunch</th>
            <th colSpan={2}>Dinner</th>
          </tr>
          <tr>
            <th>Budget</th>
            <th>Elite</th>
            <th>Budget</th>
            <th>Elite</th>
            <th>Budget</th>
            <th>Elite</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="clickable-cell"
                  onClick={handleCellClick}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {isSectionVisible && (
        <div className="popup-content">
          <h3>Food List</h3>
          {!showCustomerIds && !showProductIds ? (
            <>
              <button onClick={handleTotalOption1Click}>Individual Plan 1</button>
              <button onClick={handleTotalOption2Click}>Combo Plan 2</button>
            </>
          ) : showCustomerIds ? (
            <div className="customer-id-section">
              <div className="customer-list">
                <h4>Customer IDs</h4>
                {customers.map((customer) => (
                  <button
                    key={customer.id}
                    onClick={() => handleCustomerIdClick(customer)}
                    className="customer-id-button"
                  >
                    {customer.id}
                  </button>
                ))}
              </div>
              <div className="customer-address">
                {selectedCustomer ? (
                  <>
                    <h4>Delivery Address</h4>
                    <p>{selectedCustomer.address}</p>
                  </>
                ) : (
                  <p>Please select a Customer ID to view the address.</p>
                )}
              </div>
            </div>
          ) : showProductIds ? (
            <div className="product-id-section">
              <div className="product-list">
                <h4>Product IDs</h4>
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductIdClick(product)}
                    className="product-id-button"
                  >
                    {product.id}
                  </button>
                ))}
              </div>
              <div className="product-description">
                {selectedProduct ? (
                  <>
                    <h4>Product Description</h4>
                    <p>{selectedProduct.description}</p>
                  </>
                ) : (
                  <p>Please select a Product ID to view the description.</p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default MainAdminOrderList;
