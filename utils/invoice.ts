import { Invoice, InvoiceItemType } from '~/schema/invoice';
import { useStore } from '~/store';

const getSubtotal = (items: InvoiceItemType[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
const getGst = (items: InvoiceItemType[]) => {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return subtotal * 0.05;
};

export const getTotals = (invoice: Partial<Invoice>) => {
  const subtotal = getSubtotal(invoice.items || []);
  const gst = getGst(invoice.items || []);
  return { subtotal, gst, total: subtotal + gst };
};

export const getLastInvoice = (invoices: Invoice[]): Invoice | null => {
  // const invoices = useStore.getState().invoices || [];

  return invoices.reduce(
    (latest: Invoice | null, curr: Invoice) =>
      !latest || new Date(curr.date) > new Date(latest.date) ? curr : latest,
    null
  );
};

export const generateInvoiceNumber = (
  lastInvoice: Invoice | null,
  invoiceNumberFormat: string
): string => {
  const lastInvoiceNumber = lastInvoice?.invoiceNumber || '';

  // Split the format into parts based on "XXX"
  const parts = invoiceNumberFormat.split('XXX');
  const staticPrefix = parts[0] || ''; // Prefix before "XXX"
  const staticSuffix = parts.length > 1 ? parts.slice(1).join('XXX') : ''; // Suffix after "XXX"

  // Extract numeric part by removing prefix and suffix
  const lastInvoiceNumberSeq = lastInvoiceNumber
    .replace(staticPrefix, '')
    .replace(staticSuffix, '');

  // Convert to number and increment
  let lastInvoiceNumberInt = parseInt(lastInvoiceNumberSeq || '0', 10);
  if (isNaN(lastInvoiceNumberInt)) {
    lastInvoiceNumberInt = 0;
  }

  // Format with zero-padding
  const paddedNumber = (lastInvoiceNumberInt + 1).toString().padStart(3, '0');

  // Return new invoice number
  return `${staticPrefix}${paddedNumber}${staticSuffix}`;
};
