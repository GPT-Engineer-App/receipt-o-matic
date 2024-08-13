import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import ReceiptPDF from '../components/ReceiptPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Index = () => {
  const [receiptNumber, setReceiptNumber] = useState(1);

  useEffect(() => {
    const storedNumber = localStorage.getItem('lastReceiptNumber');
    if (storedNumber) {
      setReceiptNumber(parseInt(storedNumber, 10) + 1);
    }
  }, []);

  const handleCreateReceipt = () => {
    localStorage.setItem('lastReceiptNumber', receiptNumber.toString());
    setReceiptNumber(prevNumber => prevNumber + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-right">מערכת יצירת קבלות</h1>
      <PDFDownloadLink document={<ReceiptPDF receiptNumber={receiptNumber} />} fileName={`receipt-${receiptNumber}.pdf`}>
        {({ blob, url, loading, error }) => (
          <Button className="text-xl px-6 py-3" onClick={handleCreateReceipt}>
            {loading ? 'טוען...' : 'יצר קבלה'}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default Index;
