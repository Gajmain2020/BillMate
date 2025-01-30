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

const getLastInvoice = (): Invoice | null => {
  const invoices = useStore.getState().invoices || [];

  return invoices.reduce(
    (latest: Invoice | null, curr: Invoice) =>
      !latest || new Date(curr.date) > new Date(latest.date) ? curr : latest,
    null
  );
};

export const generateInvoiceNumber = (): string => {
  const lastInvoice = getLastInvoice();

  const lastInvoiceNumber = lastInvoice?.invoiceNumber;
  const lastInvoiceNumberInt = parseInt(lastInvoiceNumber?.split('-')[1] || '0', 10);

  return `INV-${lastInvoiceNumberInt + 1}`;
};
