import * as FileSystem from 'expo-file-system';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

import { Invoice } from '~/schema/invoice';

const generateHTML = (invoice: Invoice, subtotal: number, gst: number, total: number) => {
  const html = `
    <!doctype html>
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 12px;
            background-color: #f4f4f9;
            color: #333;
          }
          .invoice-container {
            width: 210mm;
            height: 297mm;
            margin: 0 auto;
            padding: 15mm;
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            position: relative;
            box-sizing: border-box;
          }
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
          .invoice-header h1 {
            font-size: 20px;
            margin: 0;
          }
          .company-logo {
            width: 100px;
            height: auto;
          }
          .info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .info h1 {
            font-size: 16px;
            margin-bottom: 8px;
          }
          .info p {
            margin: 3px 0;
          }
          .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
          }
          .invoice-table th,
          .invoice-table td {
            padding: 6px;
            text-align: left;
            border: 1px solid #ddd;
          }
          .invoice-table th {
            background-color: #575757;
            color: #fff;
            font-weight: bold;
          }
          .invoice-table tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          .totals {
            float: right;
            width: 300px;
            font-size: 14px;
            margin-top: 10px;
          }
          .totals .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
          }
          .totals .totals-row span:last-child {
            font-weight: bold;
          }
          .signature {
            border-top: 1px solid gray;
            position: absolute;
            bottom: 40mm;
            right: 20mm;
            text-align: right;
          }
          .signature h3 {
            margin: 0;
            font-size: 14px;
          }
          .signature p {
            margin: 5px 0 0;
            font-size: 12px;
            color: #555;
          }
          .footer {
            position: absolute;
            bottom: 20mm;
            font-size: 10px;
            color: #888;
            border-top: 1px solid #ddd;
            padding-top: 10px;
          }
          .footer h3 {
            font-size: 12px;
            margin-bottom: 8px;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <div class="invoice-info">
              <h1>Invoice</h1>
              <p>Invoice #: ${invoice.invoiceNumber}</p>
              <p>Date: ${new Date(invoice.date).toLocaleDateString()}</p>
              <p>Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}</p>
            </div>
            <!--
             <div class="company-info">
              <img src="[YOUR_LOGO_PATH]" alt="Company Logo" class="company-logo" />
            </div>
            -->
          </div>
    
          <div class="info">
            <div class="client-info">
              <h1>Bill to:</h1>
              <p>${invoice.recipient.name}</p>
              <p>${invoice.recipient.address}</p>
              <p>GST No.: ${invoice.recipient.gst}</p>
            </div>
            <div class="client-info">
              <h2>Your Company Name</h2>
              <p>${invoice.recipient.name}</p>
              <p>${invoice.recipient.address}</p>
              <p>GST No.: ${invoice.recipient.gst}</p>
            </div>
          </div>
    
          <table class="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
                ${invoice.items.map(
                  (item) => `<tr>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td>$ ${item.price}</td>
                                <td>$ ${item.price * item.quantity}</td>
                            </tr>`
                )}
              
            </tbody>
          </table>
    
          <div class="totals">
            <div class="totals-row">
              <span>Subtotal:</span>
              <span>₹ ${subtotal.toFixed(2)}</span>
            </div>
            <div class="totals-row">
              <span>GST (5%):</span>
              <span>₹ ${gst.toFixed()}</span>
            </div>
            <hr />
            <div class="totals-row">
              <span>Total:</span>
              <span>₹ ${total.toFixed()}</span>
            </div>
          </div>
    
          <div class="signature">
            <h3>Authorized Signature</h3>
            <p>Your Organization Name</p>
          </div>
    
          <div class="footer">
            <h3>Payment Terms</h3>
            <ul>
              <li>Please pay within 30 days of receiving this invoice.</li>
              <li>Make checks payable to: Your Company Name</li>
              <li>Bank Details: Bank Name, Account #: 123123123</li>
            </ul>
          </div>
        </div>
      </body>
    </html>  
    `;

  return html;
};

export const generateInvoicePdf = async (
  invoice: Invoice,
  subtotal: number,
  gst: number,
  total: number
) => {
  try {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await printToFileAsync({ html: generateHTML(invoice, subtotal, gst, total) });

    const permanentUri = FileSystem.documentDirectory + 'invoice.pdf';
    // MOVE TO DOCUMENT DIRECTORY
    await FileSystem.moveAsync({
      from: uri,
      to: permanentUri,
    });

    console.log('file moved to', permanentUri);

    console.log('File has been saved to:', permanentUri);
    await shareAsync(permanentUri, { UTI: '.pdf', mimeType: 'application/pdf' });
  } catch (error) {
    console.log('Failed to generate pdf', error);
  }
};
