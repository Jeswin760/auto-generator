import React, { useRef } from "react";
import html2canvas from "html2canvas";
import sign from "../assets/sign.png";
import jsPDF from "jspdf";
import "./Certificate.css";

const Certificate = ({ name, course, date }) => {
  const certRef = useRef();

  const downloadPDF = () => {
    const input = certRef.current;
    html2canvas(input, { scale: 2, backgroundColor: "#ffffff", useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${name}_Certificate.pdf`);
    });
  };

  return (
    <div className="certificate-wrapper">
      <div className="certificate" ref={certRef}>
        <div className="certificate-border">
          <h1 className="certificate-title">Certificate of Completion</h1>
          <p className="certificate-text">This is to certify that</p>
          <h2 className="certificate-name">{name}</h2>
          <p className="certificate-text">
            has successfully completed the course
          </p>
          <h3 className="certificate-course">{course}</h3>
          <p className="certificate-date">Date: {date}</p>
          <div className="certificate-signature">
            <img src={sign} alt="Signature"  className="certificate-sign" />
            <p>Authorized Signature</p>
          </div>
        </div>
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download as PDF
      </button>
    </div>
  );
};

export default Certificate;
