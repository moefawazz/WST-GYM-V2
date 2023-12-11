import React, { useRef, useEffect } from "react";
import QRCode from "qrcode";

const PopUpQrCode = ({ title, text, bgColor, isOpen, onCancel }) => {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const currentPageUrl = window.location.href;

    // Check if qrCodeRef.current is not null before generating the QR code
    if (qrCodeRef.current) {
      // Generate the QR code using qrcode library
      QRCode.toCanvas(qrCodeRef.current, currentPageUrl, function (error) {
        if (error) console.error("Error generating QR code:", error);
      });
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-[1rem] px-4 pt-5 pb-5 mx-[1.5rem] w-full text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="mt-3">
            <canvas ref={qrCodeRef} width={128} height={128}></canvas>
          </div>
          <div>
            <div className="mt-3 text-center sm:mt-5">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                {title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{text}</p>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              onClick={onCancel}
              type="button"
              className={`inline-flex justify-center w-full rounded-md border bg-red-600 shadow-sm px-4 py-2 text-base font-medium text-white ${bgColor} focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpQrCode;
