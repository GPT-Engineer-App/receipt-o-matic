import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import ReceiptPDF from '../components/ReceiptPDF';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const Index = () => {
  const [receiptNumber, setReceiptNumber] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const storedNumber = localStorage.getItem('lastReceiptNumber');
    if (storedNumber) {
      setReceiptNumber(parseInt(storedNumber, 10) + 1);
    }
  }, []);

  const handleCreateReceipt = () => {
    setShowPreview(true);
  };

  const handleConfirmReceipt = () => {
    localStorage.setItem('lastReceiptNumber', receiptNumber.toString());
    setReceiptNumber(prevNumber => prevNumber + 1);
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-right">מערכת יצירת קבלות</h1>
      {!showPreview ? (
        <Button className="text-xl px-6 py-3" onClick={handleCreateReceipt}>
          יצר קבלה
        </Button>
      ) : (
        <div className="w-full max-w-3xl">
          <PDFViewer width="100%" height="500px">
            <ReceiptPDF receiptNumber={receiptNumber} />
          </PDFViewer>
          <div className="mt-4 flex justify-between">
            <Button onClick={() => setShowPreview(false)}>ביטול</Button>
            <PDFDownloadLink document={<ReceiptPDF receiptNumber={receiptNumber} />} fileName={`receipt-${receiptNumber}.pdf`}>
              {({ blob, url, loading, error }) => (
                <Button onClick={handleConfirmReceipt} disabled={loading}>
                  {loading ? 'טוען...' : 'אישור והורדה'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
