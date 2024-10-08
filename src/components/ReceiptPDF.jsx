import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register Arial font
Font.register({
  family: 'Arial',
  src: 'https://fonts.gstatic.com/s/arial/v5/Arial.ttf'
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Arial',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 12,
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'right',
  },
});

const ReceiptPDF = ({ receiptNumber, receiptData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>עוסק פטור מס׳: {receiptData.businessId}</Text>
      <Text style={styles.title}>קבלה</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>תאריך: {receiptData.date}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>שעה: {receiptData.time}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>מספר קבלה: {receiptNumber}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>תיאור המוצר: {receiptData.productDescription}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>מחיר ליחידה: ₪{receiptData.unitPrice}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>כמות: {receiptData.quantity}</Text>
          </View>
        </View>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>דמי משלוח: ₪{receiptData.shippingCost}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>סה"כ: ₪{receiptData.total}</Text>
          </View>
        </View>
      </View>
      <Text style={{ ...styles.tableCell, marginTop: 20, textAlign: 'center' }}>תודה רבה!</Text>
    </Page>
  </Document>
);

export default ReceiptPDF;
