import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register a Hebrew font
Font.register({
  family: 'Heebo',
  src: 'https://fonts.gstatic.com/s/heebo/v21/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSysdUmj.ttf'
});

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
    fontFamily: 'Heebo',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Heebo',
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'right',
    fontFamily: 'Heebo',
  },
});

const ReceiptPDF = ({ receiptNumber }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>עוסק פטור מס׳: 032832963</Text>
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
