import { z } from 'zod';

export const businessEntitySchema = z.object({
  id: z.string().uuid(),
  name: z.string({ required_error: 'Name is required.' }).min(1, 'Name is required'),
  address: z.string({ required_error: 'Address is required.' }).min(1, 'Address is required'),
  gst: z.string().optional(),
});

export type BusinessEntityType = z.infer<typeof businessEntitySchema>;

export const ownerEntitySchema = z.object({
  id: z.string().uuid(),
  name: z.string({ required_error: 'Name is required.' }).min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().min(1, 'Email is required'),
  contact: z.string().min(1, 'Contact number is required'),
  altContact: z.string().optional(),
  website: z.string().optional(),
  gst: z.string().min(1, 'GST No. is required'),
  logo: z.string().optional(),
  pan: z.string().optional(),
  upi: z.string().optional(),
});

export type OwnerEntityType = z.infer<typeof ownerEntitySchema>;

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
  total: z.number({ required_error: 'Total is required.' }).min(1, 'Total is required.'),
});

export type InvoiceItemType = z.infer<typeof invoiceItemSchema>;

// export const itemsSchema = z.object({ items: invoiceItemSchema.array() });

// export type ItemsType = z.infer<typeof itemsSchema>;

export type Invoice = InvoiceInfoType & {
  id: string;
  sender: OwnerEntityType;
  recipient: BusinessEntityType;
  items: InvoiceItemType[];
};
