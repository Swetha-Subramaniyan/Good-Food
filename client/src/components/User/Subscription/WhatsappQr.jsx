import React from "react";
import "./WhatsappQr.css"; 

const WhatsappQr = ({ onClose }) => {
  return (
    <div className="WhatsappQr-overlay">
      <div className="WhatsappQr-content">
        <h4>Scan the QR Code</h4>
        <p>Join our WhatsApp Sandbox for timely notifications!</p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
          alt="QR Code"
          className="qr-code"
        />
        <button onClick={onClose} >
          Close
        </button>
      </div>
    </div>
  );
};

export default WhatsappQr;