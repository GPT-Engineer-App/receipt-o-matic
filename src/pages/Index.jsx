import React from 'react';
import { Button } from "@/components/ui/button";
import ReceiptPDF from '../components/ReceiptPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">מערכת יצירת קבלות</h1>
      <PDFDownloadLink document={<ReceiptPDF />} fileName="receipt.pdf">
        {({ blob, url, loading, error }) => (
          <Button className="text-xl px-6 py-3">
            {loading ? 'טוען...' : 'יצר קבלה'}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default Index;
