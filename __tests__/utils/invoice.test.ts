import { Invoice } from '~/schema/invoice';
import { generateInvoiceNumber } from '../../utils/invoice';

describe('generateInvoiceNumber', () => {
  describe('given format XXX', () => {
    const format = 'XXX';

    it('it works for first invoice', () => {
      const lastInvoice = null;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('001');
    });

    it('it increments the invoice number', () => {
      const lastInvoice = { invoiceNumber: '001' } as Invoice;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('002');
    });

    it('it increments the invoice number above 4 digits', () => {
      const lastInvoice = { invoiceNumber: '1000' } as Invoice;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('1001');
    });
  });

  describe('given format  Prefix-XXX', () => {
    const format = 'Prefix-XXX';

    it('it works for first invoice', () => {
      const lastInvoice = null;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('Prefix-001');
    });

    it('it increments the invoice number', () => {
      const lastInvoice = { invoiceNumber: 'Prefix-041' } as Invoice;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('Prefix-042');
    });

    it('it increments the invoice number above 4 digits', () => {
      const lastInvoice = { invoiceNumber: 'Prefix-1000' } as Invoice;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('Prefix-1001');
    });
  });

  describe('given format  Prefix-XXX', () => {
    const format = 'XXX-Suffix';

    it('it works for first invoice', () => {
      const lastInvoice = null;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('001-Suffix');
    });

    it('it increments the invoice number', () => {
      const lastInvoice = { invoiceNumber: 'Prefix-041' } as Invoice;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('042-Suffix');
    });

    it('it increments the invoice number above 4 digits', () => {
      const lastInvoice = { invoiceNumber: 'Prefix-1000' } as Invoice;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('1001-Suffix');
    });
  });

  describe('given format  Prefix-XXX-Suffix', () => {
    const format = 'Prefix-XXX-Suffix';

    it('it works for first invoice', () => {
      const lastInvoice = null;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('Prefix-001-Suffix');
    });

    it('it increments the invoice number', () => {
      const lastInvoice = { invoiceNumber: 'Prefix-041' } as Invoice;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('Prefix-042-Suffix');
    });

    it('it increments the invoice number above 4 digits', () => {
      const lastInvoice = { invoiceNumber: 'Prefix-1000' } as Invoice;
      const invoiceNumber = generateInvoiceNumber(lastInvoice, format);
      expect(invoiceNumber).toBe('Prefix-1001-Suffix');
    });
  });
});
