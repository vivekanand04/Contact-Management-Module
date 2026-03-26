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

## 2) Optimization Techniques

To keep the UI responsive as the amount of data grows, the implementation uses several common React and state-management optimizations:

- `React.memo`: prevents unnecessary re-renders for components that receive the same props.
- `useMemo`: caches derived values (for example, filtered or transformed lists) to avoid repeated work.
- `useCallback`: stabilizes callback references passed down to child components.
- Lazy Loading (`React.lazy` + `Suspense`): defers loading of heavier pages/components (such as the contact details view) until they are needed.
- Debouncing: reduces excessive updates during fast user interactions (such as typing in search or filter inputs).
- Proper keys in lists: ensures React can efficiently reconcile list updates without rendering glitches.
- Redux Toolkit for structured state: helps avoid prop drilling by organizing contacts and related entities (emails, SMS, and notes) into focused slices.
- `localStorage` persistence: stores Contacts, Emails, SMS, and Notes so the user’s data remains available across browser refreshes and new sessions.
