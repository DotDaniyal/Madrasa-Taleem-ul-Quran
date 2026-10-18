import { pgTable, serial, text, timestamp, integer, boolean, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const teachers = pgTable('teachers', {
  id: serial('id').primaryKey(),
  nameUr: text('name_ur').notNull(),
  nameEn: text('name_en').notNull(),
  phoneNumber: text('phone_number').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  baseSalary: decimal('base_salary', { precision: 12, scale: 2 }).default('0'),
  status: text('status').default('active'),
});

export const teacherAttendance = pgTable('teacher_attendance', {
  id: serial('id').primaryKey(),
  teacherId: integer('teacher_id').references(() => teachers.id).notNull(),
  date: text('date').notNull(),
  checkInTime: text('check_in_time'),
  checkOutTime: text('check_out_time'),
  status: text('status').notNull(), // Present, Absent, Leave, Late, Half-Day
  notes: text('notes'),
});

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  rollNo: text('roll_no').notNull().unique(),
  fullName: text('full_name').notNull(),
  parentName: text('parent_name').notNull(),
  parentPhone: text('parent_phone').notNull(),
  programId: text('program_id').notNull(),
  monthlyFee: decimal('monthly_fee', { precision: 10, scale: 2 }).notNull(),
  admissionDate: text('admission_date').notNull(),
  status: text('status').default('active'),
});

export const feeVouchers = pgTable('fee_vouchers', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').references(() => students.id).notNull(),
  month: text('month').notNull(),
  year: integer('year').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: text('status').default('unpaid'), // unpaid, partial, paid, waived
  paidDate: text('paid_date'),
  paymentMethod: text('payment_method'),
  receiptNo: text('receipt_no'),
});
