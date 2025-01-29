import { Invoice, InvoiceItemType } from '~/schema/invoice';

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
