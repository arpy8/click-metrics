import React, { useState } from "react";
import { message } from "antd";
import defaultQr from "../../assets/qrcode.png";

const Qrcode: React.FC = () => {
  const [img, setImg] = useState<string>(defaultQr); // Initialize with default QR image path
  const [qrinput, setQrinput] = useState<string>("click_matrics");

  const generateQR = async () => {
    try {
      if (qrinput.trim() === "") {
        message.error("Input cannot be empty");
        return;
      }
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        qrinput
      )}`;
      setImg(url);
      message.success("QR Code Generated Successfully");
    } catch (error) {
      console.error(error);
      message.error("Try Again");
    }
  };

  const click = () => {
    if (img !== defaultQr) {
      window.open(`${qrinput}`, "_blank");
    }
  };

  const downloadQR = () => {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        message.success("Download Successful");
      })
      .catch((error) => {
        console.error(error);
        message.error("Download Failed");
      });
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">QR CODE GENERATOR</h2>
      <div className="qr-code-box mb-4">
        {img && (
          <img
            src={img}
            className="qr-code-image cursor-pointer"
            onClick={click}
            onError={(e) => {
              (e.target as HTMLImageElement).src = defaultQr;
            }}
            alt="QR Code"
          />
        )}
      </div>
      <form className="form_container w-full max-w-sm flex flex-col items-center">
        <label className="mb-2 text-lg">Enter the link for QR code</label>
        <input
          type="text"
          className="input w-64 p-2 mb-4 border border-gray-300 rounded"
          placeholder="Enter the Link"
          value={qrinput}
          onChange={(e) => setQrinput(e.target.value)}
        />
        <div className="flex space-x-2">
          <button
            type="button"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={generateQR}
          >
            Generate QR
          </button>
          <button
            type="button"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            onClick={downloadQR}
          >
            Download QR
          </button>
        </div>
      </form>
    </div>
  );
};

export default Qrcode;
