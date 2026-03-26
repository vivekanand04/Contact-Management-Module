# Contact Management Module

This project provides a practical contact management experience with a clean user flow: users can manage contacts, view detailed information, and capture related communication history (notes, emails, and SMS).

## 1) Core Functionality

### Contact List

- Display a list of contacts.
- Add and edit contacts.
- Each contact supports the following fields:
  - First Name
  - Last Name
  - Email
  - Phone Number
  - Additional relevant fields (optional)

### Contact Details Page

When a user clicks a contact, the app displays a dedicated details view that includes:

- Contact information (the core contact fields)
- Notes
- Emails
- SMS messages

#### Notes Section

- Add multiple notes for a contact.
- Each note shows:
  - Note content
  - Added date/time
  - Added by

#### Emails Section

- Show a list of emails sent to the contact.
- Add new email entries.

#### SMS Section

- Show a list of SMS messages sent to the contact.
- Add new SMS entries.

## 2) Optimization & Scalability Enhancements

To ensure the application is highly optimized, scalable, and ready for future growth, several modern React performance and state-management techniques have been implemented. These optimizations help maintain a smooth and responsive UI even as the data size and feature set expand over time.

## ⚡ Implemented Optimization Techniques

### a) Lazy Loading (React.lazy + Suspense)
Improves initial load performance by loading heavy components (e.g., contact details view) only when required.

### b) Debouncing
Enhances user experience by limiting frequent updates during rapid input (e.g., search and filters).

### c) useMemo
Optimizes performance by caching expensive computations such as filtered or derived data.

### d) useCallback
Maintains stable function references to avoid triggering unwanted re-renders in child components.

### e) Proper Keys in Lists
Ensures efficient DOM reconciliation and prevents rendering issues in dynamic lists.

### f) Redux Toolkit (State Management)
Eliminates prop drilling by organizing global state (Contacts, Emails, SMS, Notes) into well-structured slices.

### g) localStorage Persistence
Provides data persistence by storing Contacts, Emails, SMS, and Notes locally, ensuring data remains intact across page refreshes and sessions.