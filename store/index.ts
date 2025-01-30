import * as Crypto from 'expo-crypto';
import Storage from 'expo-sqlite/kv-store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Invoice, BusinessEntityType, InvoiceInfoType, InvoiceItemType } from '~/schema/invoice';
import { generateInvoiceNumber, getLastInvoice } from '~/utils/invoice';

// TODO: ADD TOTAL AND ITS ROUND OFF FUNCTION

export type InvoiceState = {
  profile: BusinessEntityType;
  onboardingCompleted: boolean;
  invoiceNumberFormat: string;

  newInvoice: Partial<Invoice> | null;
  invoices: Invoice[];

  // contacts
  contacts: BusinessEntityType[];
  addContact: (contact: BusinessEntityType) => void;
  deleteContact: (id: string) => void;
  updateContact: (contact: BusinessEntityType) => void;

  setProfile: (profile: BusinessEntityType) => void;
  setOnboardingCompleted: () => void;
  setInvoiceNumberFormat: (format: string) => void;
  deleteAccount: () => void;

  startNewInvoice: () => void;
  resetNewInvoice: () => void;
  saveInvoice: () => void;
  deleteInvoice: (id: string) => void;

  addRecipientInfo: (recipient: BusinessEntityType | null) => void;
  addInvoiceInfo: (invoiceInfo: InvoiceInfoType) => void;
  addItems: (items: InvoiceItemType[]) => void;
};

export const useStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      profile: {
        id: Crypto.randomUUID(),
        name: '',
        address: '',
        gst: '',
      },
      onboardingCompleted: false,
      invoiceNumberFormat: 'INV-XXX',

      newInvoice: null,
      invoices: [],

      contacts: [],

      // PROFILE
      setProfile: (profile) =>
        set(() => ({
          profile: { ...profile, gst: profile.gst || '' },
          onboardingCompleted: false,
        })),
      setOnboardingCompleted: () => set(() => ({ onboardingCompleted: true })),
      setInvoiceNumberFormat: (format) => set(() => ({ invoiceNumberFormat: format })),

      // INVOICE
      startNewInvoice: () => {
        const lastInvoice = getLastInvoice(get().invoices);
        const invoiceNumberFormat = get().invoiceNumberFormat;
        set(() => ({
          newInvoice: {
            id: Crypto.randomUUID(),
            invoiceNumber: generateInvoiceNumber(lastInvoice, invoiceNumberFormat),
            sender: get().profile,
            items: [{ name: 'Example', quantity: 1, price: 20 }],
            date: new Date(),
            // dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toLocaleDateString(),
          },
        }));
      },
      resetNewInvoice: () => set(() => ({ newInvoice: null })),
      saveInvoice: () => {
        const newInvoice = get().newInvoice as Invoice; //TODO: fix this
        if (!newInvoice) return;

        set((state) => ({
          invoices: [newInvoice, ...state.invoices],
          newInvoice: null,
        }));
        if (newInvoice?.recipient) get().addContact(newInvoice.recipient);
      },
      deleteInvoice: (id) => {
        set((state) => ({
          invoices: state.invoices.filter((i) => i.id !== id),
        }));
      },

      addRecipientInfo: (recipient) =>
        set((state) => ({
          newInvoice: { ...state.newInvoice, recipient: recipient || undefined },
        })),
      addInvoiceInfo: (invoiceInfo) =>
        set((state) => ({ newInvoice: { ...state.newInvoice, ...invoiceInfo } })),
      addItems: (items) => set((state) => ({ newInvoice: { ...state.newInvoice, items } })), //todo: may be we should append items

      //contact
      addContact: (contact) =>
        set((state) => {
          const contactExists = state.contacts.some((c) => c.id === contact.id);
          if (contactExists) {
            return state;
          }
          return { contacts: [contact, ...state.contacts] };
        }),
      deleteContact: (id) => {
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== id),
        }));
      },
      updateContact: (contact) => {
        set((state) => ({
          contacts: state.contacts.map((c) => (c.id === contact.id ? contact : c)),
        }));
      },

      // function to reset the app
      deleteAccount: () => {
        set(() => ({
          profile: {
            id: Crypto.randomUUID(),
            name: '',
            address: '',
            gst: '',
          },
          onboardingCompleted: false,
          invoiceNumberFormat: 'INV-XXX',
          newInvoice: null,
          invoices: [],
          contacts: [],
        }));
      },
    }),

    { name: 'billmate-store', getStorage: () => Storage }
  )
);
