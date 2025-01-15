import { create } from 'zustand';

import { Invoice, BusinessEntityType, InvoiceInfoType, InvoiceItemType } from '~/schema/invoice';

// TODO: ADD TOTAL AND ITS ROUND OFF FUNCTION

export type InvoiceState = {
  newInvoice: Partial<Invoice> | null;
  startNewInvoice: () => void;
  resetNewInvoice: () => void;
  addSenderInfo: (sender: BusinessEntityType) => void;
  addRecipientInfo: (recipient: BusinessEntityType) => void;
  addInvoiceInfo: (invoiceInfo: InvoiceInfoType) => void;
  addItems: (items: InvoiceItemType[]) => void;
  getSubtotal: () => number;
  getGst: () => number;
  getTotal: () => number;
};

export const useStore = create<InvoiceState>((set, get) => ({
  newInvoice: null,
  startNewInvoice: () =>
    set(() => ({
      newInvoice: {
        items: [{ name: 'Example', quantity: 1, price: 20 }],
        date: new Date(),
        // dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString(),
      },
    })),
  resetNewInvoice: () => set(() => ({ newInvoice: null })),
  addSenderInfo: (sender) => set((state) => ({ newInvoice: { ...state.newInvoice, sender } })),
  addRecipientInfo: (recipient) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, recipient } })),
  addInvoiceInfo: (invoiceInfo) =>
    set((state) => ({ newInvoice: { ...state.newInvoice, ...invoiceInfo } })),
  addItems: (items) => set((state) => ({ newInvoice: { ...state.newInvoice, items } })), //todo: may be we should append items
  getSubtotal: () => {
    const items = get().newInvoice?.items || [];
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  },
  getGst: () => {
    const items = get().newInvoice?.items || [];
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return subtotal * 0.05;
  },
  getTotal: () => {
    const items = get().newInvoice?.items || [];
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return subtotal + subtotal * 0.05;
  },
}));
