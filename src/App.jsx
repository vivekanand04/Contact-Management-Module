import { lazy, Suspense, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Snackbar, Alert, Box, CircularProgress } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { getSeedContacts } from './services/contactService'

const ContactListPage = lazy(() => import('./pages/ContactListPage'))
const ContactDetailsPage = lazy(() => import('./pages/ContactDetailsPage'))

function App() {
  const [contacts, setContacts] = useState(getSeedContacts)
  const [toast, setToast] = useState(null)

  const contactMap = useMemo(
    () => new Map(contacts.map((contact) => [contact.id, contact])),
    [contacts],
  )

  const createContact = (payload) => {
    const nextContact = {
      ...payload,
      id: crypto.randomUUID(),
      notes: [],
      emails: [],
      sms: [],
      createdAt: new Date().toISOString(),
    }

    setContacts((prev) => [nextContact, ...prev])
    setToast({ type: 'success', message: 'Contact added successfully.' })
  }

  const updateContact = (id, payload) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, ...payload, updatedAt: new Date().toISOString() } : contact,
      ),
    )
    setToast({ type: 'success', message: 'Contact updated successfully.' })
  }

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))
    setToast({ type: 'success', message: 'Contact deleted successfully.' })
  }

  const appendTimelineEntry = (contactId, section, payload) => {
    setContacts((prev) =>
      prev.map((contact) => {
        if (contact.id !== contactId) return contact
        return {
          ...contact,
          [section]: [
            {
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              ...payload,
            },
            ...contact[section],
          ],
        }
      }),
    )
    setToast({ type: 'success', message: `${section.toUpperCase()} entry added.` })
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <ContactListPage
                  contacts={contacts}
                  onCreate={createContact}
                  onUpdate={updateContact}
                  onDelete={deleteContact}
                />
              }
            />
            <Route
              path="/contacts/:contactId"
              element={
                <ContactDetailsPage
                  contactMap={contactMap}
                  onAddNote={(id, payload) => appendTimelineEntry(id, 'notes', payload)}
                  onAddEmail={(id, payload) => appendTimelineEntry(id, 'emails', payload)}
                  onAddSms={(id, payload) => appendTimelineEntry(id, 'sms', payload)}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setToast(null)} severity={toast?.type ?? 'info'} variant="filled">
          {toast?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
