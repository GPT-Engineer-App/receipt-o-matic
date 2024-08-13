import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'right',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'right',
  },
});

const ReceiptPDF = ({ receiptNumber }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>עוסק פטור מס׳: 0318219523</Text>
        <Text style={styles.title}>קבלה</Text>
        <Text style={styles.text}>תאריך: {new Date().toLocaleDateString('he-IL')}</Text>
        <Text style={styles.text}>מספר קבלה: {receiptNumber}</Text>
        <Text style={styles.text}>סכום: ₪100</Text>
        <Text style={styles.text}>עבור: שירותים</Text>
        <Text style={styles.text}>תודה רבה!</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptPDF;
