import * as FileSystem from 'expo-file-system';
import { printToFileAsync } from 'expo-print';

import { Invoice } from '~/schema/invoice';

const generateHTML = (invoice: Invoice, subtotal: number, gst: number, total: number) => {
  const itemsPerPage = 20;
  let html = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          @page {
            size: A4;
            margin: 0.5in;
          }
          *{
            background-color: white;
          }

          body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            background-color: #f4f4f9;
            color: #333;
            margin: 0;
            padding: 0;
          }

          .invoice-container {
            width: 100%;
            max-width: 8.3in;
            min-height: 11.7in;
            background-color: #fff;
            padding: 0.5in;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
            page-break-inside: avoid;
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
            width: 100%;
            max-width: 300px;
            font-size: 14px;
            margin-top: 10px;
            page-break-before: always;
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
            position: relative;
            bottom: 0;
            font-size: 10px;
            color: #888;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            page-break-before: always;
          }

          .footer h3 {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .contd {
            position: absolute;
            bottom: 10px;
            right: 20px;
            font-size: 12px;
            color: #888;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="invoice-header">
            <div class="invoice-info">
              <h1>Invoice</h1>
              <p>Invoice #: ${invoice.invoiceNumber}</p>
              <p>Date: ${invoice.date.toLocaleDateString()}</p>
              ${
                invoice.dueDate &&
                `<p>Due Date: ${invoice.dueDate.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}</p>`
              }
            </div>
          </div>

          <div class="info">
            <div class="client-info">
              <h1>Bill to:</h1>
              <p>${invoice.recipient.name}</p>
              <p>${invoice.recipient.address}</p>
              <p>GST No.: ${invoice.recipient.gst}</p>
            </div>
            <div class="client-info">
              <h1>From:</h1>
              <p>${invoice.sender.name}</p>
              <p>${invoice.sender.address}</p>
              <p>GST No.: ${invoice.sender.gst}</p>
            </div>
          </div>

          ${invoice.items
            .reduce((acc: string[], item, index) => {
              const pageBreak =
                index === itemsPerPage - 1 ? '<div class="contd">Contd...</div>' : '';
              if (index % itemsPerPage === 0) {
                if (acc.length > 0) {
                  acc.push('</table>');
                }
                acc.push(`
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
                `);
              }

              acc.push(`
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$ ${item.price}</td>
                  <td>$ ${item.price * item.quantity}</td>
                </tr>
              `);

              if (index % itemsPerPage === itemsPerPage - 1) {
                acc.push(`${pageBreak}`);
                acc.push('</tbody></table>');
              }

              return acc;
            }, [])
            .join('')}

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

    console.log('hello', invoice);

    const safeInvoiceNumber = invoice.invoiceNumber.replace(/[\/\\:*?"<>|]/g, '-');
    const permanentUri = FileSystem.documentDirectory + `invoice-${safeInvoiceNumber}.pdf`;
    // MOVE TO DOCUMENT DIRECTORY
    await FileSystem.moveAsync({
      from: uri,
      to: permanentUri,
    });

    return permanentUri;
  } catch (error) {
    console.log('Failed to generate pdf', error);
  }
};
