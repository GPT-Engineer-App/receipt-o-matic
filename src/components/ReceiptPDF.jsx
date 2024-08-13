import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Helvetica'
  }
});

const ReceiptPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>קבלה</Text>
        <Text style={styles.text}>תאריך: {new Date().toLocaleDateString('he-IL')}</Text>
        <Text style={styles.text}>מספר קבלה: {Math.floor(Math.random() * 1000000)}</Text>
        <Text style={styles.text}>סכום: ₪100</Text>
        <Text style={styles.text}>עבור: שירותים</Text>
        <Text style={styles.text}>תודה רבה!</Text>
      </View>
    </Page>
  </Document>
);

export default ReceiptPDF;
