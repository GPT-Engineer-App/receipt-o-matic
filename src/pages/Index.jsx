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
    businessId: '031821952',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0],
    productDescription: '',
    unitPrice: '',
    quantity: '',
    shippingCost: '',
  });

  useEffect(() => {
    const storedNumber = localStorage.getItem('lastReceiptNumber');
    if (storedNumber) {
      setReceiptNumber(parseInt(storedNumber, 10) + 1);
    }
  }, []);

  const handleCreateReceipt = () => {
    const total = (parseFloat(receiptData.unitPrice) * parseFloat(receiptData.quantity)) + parseFloat(receiptData.shippingCost || 0);
    setReceiptData(prev => ({ ...prev, total: total.toFixed(2) }));
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

  const formatReceiptNumber = (num) => {
    return num.toString().padStart(4, '0');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">מערכת יצירת קבלות</h1>
      {!showPreview ? (
        <div className="w-full max-w-md">
          <div className="mb-4">
            <Label htmlFor="businessId">מספר עוסק פטור</Label>
            <Input
              id="businessId"
              name="businessId"
              type="text"
              value={receiptData.businessId}
              onChange={handleInputChange}
              placeholder="מספר עוסק פטור"
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
          <div className="mb-4">
            <Label htmlFor="time">שעה</Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={receiptData.time}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="productDescription">תיאור המוצר</Label>
            <Input
              id="productDescription"
              name="productDescription"
              type="text"
              value={receiptData.productDescription}
              onChange={handleInputChange}
              placeholder="תיאור המוצר"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="unitPrice">מחיר ליחידה</Label>
            <Input
              id="unitPrice"
              name="unitPrice"
              type="number"
              value={receiptData.unitPrice}
              onChange={handleInputChange}
              placeholder="מחיר ליחידה"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="quantity">כמות</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={receiptData.quantity}
              onChange={handleInputChange}
              placeholder="כמות"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="shippingCost">דמי משלוח</Label>
            <Input
              id="shippingCost"
              name="shippingCost"
              type="number"
              value={receiptData.shippingCost}
              onChange={handleInputChange}
              placeholder="דמי משלוח"
            />
          </div>
          <Button className="w-full text-xl px-6 py-3" onClick={handleCreateReceipt}>
            יצר קבלה
          </Button>
        </div>
      ) : (
        <div className="w-full max-w-3xl">
          <PDFViewer width="100%" height="500px" className="mb-4">
            <ReceiptPDF receiptNumber={formatReceiptNumber(receiptNumber)} receiptData={receiptData} />
          </PDFViewer>
          <div className="flex justify-between">
            <Button onClick={() => setShowPreview(false)}>ביטול</Button>
            <PDFDownloadLink 
              document={<ReceiptPDF receiptNumber={formatReceiptNumber(receiptNumber)} receiptData={receiptData} />} 
              fileName={`receipt-${formatReceiptNumber(receiptNumber)}.pdf`}
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
