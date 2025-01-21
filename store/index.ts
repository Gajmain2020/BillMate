import Storage from 'expo-sqlite/kv-store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Invoice, BusinessEntityType, InvoiceInfoType, InvoiceItemType } from '~/schema/invoice';

// TODO: ADD TOTAL AND ITS ROUND OFF FUNCTION

export type InvoiceState = {
  profile: BusinessEntityType;
  newInvoice: Partial<Invoice> | null;

  setProfile: (profile: BusinessEntityType) => void;

  startNewInvoice: () => void;
  resetNewInvoice: () => void;

  addRecipientInfo: (recipient: BusinessEntityType) => void;
  addInvoiceInfo: (invoiceInfo: InvoiceInfoType) => void;
  addItems: (items: InvoiceItemType[]) => void;
  getSubtotal: () => number;
  getGst: () => number;
  getTotal: () => number;
};

export const useStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      profile: {
        name: '',
        address: '',
        gst: '',
      },
      newInvoice: null,

      // PROFILE
      setProfile: (profile) => set(() => ({ profile })),

      // INVOICE
      startNewInvoice: () =>
        set(() => ({
          newInvoice: {
            sender: get().profile,
            items: [{ name: 'Example', quantity: 1, price: 20 }],
            date: new Date(),
            // dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString(),
          },
        })),
      resetNewInvoice: () => set(() => ({ newInvoice: null })),
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
    }),
    { name: 'billmate-store', getStorage: () => Storage }
  )
);
