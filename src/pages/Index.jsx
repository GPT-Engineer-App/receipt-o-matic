import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReceiptPDF from '../components/ReceiptPDF';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const Index = () => {
  const [receiptNumber, setReceiptNumber] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [receiptData, setReceiptData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReceiptData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">מערכת יצירת קבלות</h1>
      {!showPreview ? (
        <div className="w-full max-w-md">
          <div className="mb-4">
            <Label htmlFor="amount">סכום</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={receiptData.amount}
              onChange={handleInputChange}
              placeholder="הכנס סכום"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description">תיאור</Label>
            <Input
              id="description"
              name="description"
              type="text"
              value={receiptData.description}
              onChange={handleInputChange}
              placeholder="הכנס תיאור"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="date">תאריך</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={receiptData.date}
              onChange={handleInputChange}
            />
          </div>
          <Button className="w-full text-xl px-6 py-3" onClick={handleCreateReceipt}>
            יצר קבלה
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-3xl">
          <PDFViewer width="100%" height="500px" className="mb-4">
            <ReceiptPDF receiptNumber={receiptNumber} receiptData={receiptData} />
          </PDFViewer>
          <div className="flex justify-between">
            <Button onClick={() => setShowPreview(false)}>ביטול</Button>
            <PDFDownloadLink 
              document={<ReceiptPDF receiptNumber={receiptNumber} receiptData={receiptData} />} 
              fileName={`receipt-${receiptNumber}.pdf`}
            >
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
