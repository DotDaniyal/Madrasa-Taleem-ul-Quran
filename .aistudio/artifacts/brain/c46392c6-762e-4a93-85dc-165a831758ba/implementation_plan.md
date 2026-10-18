# Madrasa 100% Free Client-Side Management System

This upgrade transitions the institution management module to a 100% client-side architecture, utilizing `localStorage` and `IndexedDB` for permanent, offline-first data storage. This removes all backend dependencies, making the system free and portable.

## User Review & Critical Decisions

- **Confirmed Decision 1**: **Storage Strategy**: Move entirely to `localStorage` for all institutional records.
- **Confirmed Decision 2**: **Data Safety**: Implement a robust JSON Backup/Restore engine to ensure data is not lost when browser cache is cleared.
- **Confirmed Decision 3**: **Authentication**: Client-side credential matching (PIN-based) against stored records.

## 1. Overview & Core Concept

- **What It Does**: A completely offline-first, client-side management portal.
- **Target Audience / Persona**: Madrasa admins and staff.
- **Key Value**: Free, zero-hosting-cost, private, and portable madrasa management.

## 2. Technical Architecture & Data Strategy

- **Persistence Layer**: `src/utils/localStorage.ts` acts as the primary data access layer.
- **Backup Engine**: `src/pages/AdminBackup.tsx` provides JSON-based import/export.
- **Data Model**:
  - `madrasa_teachers`: Teacher profiles, credentials, salary.
  - `madrasa_student_fees`: Ledger for fee vouchers.
  - ...all other keys as defined in the master prompt.

## 3. Implementation Phases

1.  **Phase 1: Storage Layer**: Build `localStorage` CRUD service.
2.  **Phase 2: Management UI**: Create Teachers, Students, Fees, and Donation forms/tables.
3.  **Phase 3: Auth & Portal**: Implement Teacher/Student portals.
4.  **Phase 4: Backup/Restore & CSV Engine**: Implement export/import functionality.
