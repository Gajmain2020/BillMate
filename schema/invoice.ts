import { z } from 'zod';

export const businessEntitySchema = z.object({
  name: z.string({ required_error: 'Name is required.' }).min(1, 'Name is required'),
  address: z.string({ required_error: 'Address is required.' }).min(1, 'Address is required'),
  gst: z.string().optional(),
});

export type BusinessEntityType = z.infer<typeof businessEntitySchema>;

export const invoiceInfoSchema = z.object({
  invoiceNumber: z
    .string({ required_error: 'Invoice Number is required.' })
    .min(1, 'Invoice Number is required'),
  date: z.date({ required_error: 'Date is required.', invalid_type_error: "That's not a date" }),
  dueDate: z
    .date({ required_error: 'Date is required.', invalid_type_error: "That's not a date" })
    .optional(),
});

export type InvoiceInfoType = z.infer<typeof invoiceInfoSchema>;

export const invoiceItemSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }).min(1, 'Name is required.'),
  quantity: z.number({ required_error: 'Quantity is required.' }).min(1, 'Quantity is required.'),
  price: z.number({ required_error: 'Price is required.' }).min(1, 'Price is required.'),
});

export type InvoiceItemType = z.infer<typeof invoiceItemSchema>;

// export const itemsSchema = z.object({ items: invoiceItemSchema.array() });

// export type ItemsType = z.infer<typeof itemsSchema>;

export type Invoice = InvoiceInfoType & {
  sender: BusinessEntityType;
  recipient: BusinessEntityType;
  items: InvoiceItemType[];
};
