import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReceiptPDF from '../components/ReceiptPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Index = () => {
  const [receiptNumber, setReceiptNumber] = useState(1);
  const [receiptData, setReceiptData] = useState({
    businessId: '031821952',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0],
    productDescription: '',
    unitPrice: '',
    quantity: '',
    shippingCost: '',
    total: ''
  });

  useEffect(() => {
    const storedNumber = localStorage.getItem('lastReceiptNumber');
    if (storedNumber) {
      setReceiptNumber(parseInt(storedNumber, 10) + 1);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReceiptData(prev => {
      const newData = { ...prev, [name]: value };
      if (['unitPrice', 'quantity', 'shippingCost'].includes(name)) {
        const total = (parseFloat(newData.unitPrice || 0) * parseFloat(newData.quantity || 0)) + parseFloat(newData.shippingCost || 0);
        newData.total = total.toFixed(2);
      }
      return newData;
    });
  };

  const handleCreateReceipt = () => {
    localStorage.setItem('lastReceiptNumber', receiptNumber.toString());
    setReceiptNumber(prevNumber => prevNumber + 1);
  };

  const formatReceiptNumber = (num) => {
    return num.toString().padStart(4, '0');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">מערכת יצירת קבלות</h1>
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
        <div className="mb-4">
          <Label htmlFor="total">סה"כ</Label>
          <Input
            id="total"
            name="total"
            type="text"
            value={receiptData.total}
            readOnly
            className="bg-gray-100"
          />
        </div>
        <PDFDownloadLink 
          document={<ReceiptPDF receiptNumber={formatReceiptNumber(receiptNumber)} receiptData={receiptData} />} 
          fileName={`receipt-${formatReceiptNumber(receiptNumber)}.pdf`}
        >
          {({ blob, url, loading, error }) => (
            <Button 
              className="w-full text-xl px-6 py-3" 
              onClick={handleCreateReceipt} 
              disabled={loading}
            >
              {loading ? 'טוען...' : 'יצר קבלה'}
            </Button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Index;
