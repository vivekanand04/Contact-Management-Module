import { createSlice } from '@reduxjs/toolkit'
import { getSeedContacts } from '../services/contactService'

const CONTACTS_STORAGE_KEY = 'contact_management_contacts'

function normalizeContact(contact) {
  return {
    ...contact,
    tags: Array.isArray(contact.tags) ? contact.tags : [],
    notes: Array.isArray(contact.notes) ? contact.notes : [],
    emails: Array.isArray(contact.emails) ? contact.emails : [],
    sms: Array.isArray(contact.sms) ? contact.sms : [],
  }
}

function loadContactsFromLocalStorage() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    const raw = window.localStorage.getItem(CONTACTS_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    return parsed.map(normalizeContact)
  } catch {
    return null
  }
}

const initialState = loadContactsFromLocalStorage() ?? getSeedContacts().map(normalizeContact)

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    createContact(state, action) {
      const payload = action.payload
      state.unshift({
        ...payload,
        id: crypto.randomUUID(),
        notes: [],
        emails: [],
        sms: [],
        createdAt: new Date().toISOString(),
      })
    },
    updateContact(state, action) {
      const { id, payload } = action.payload
      const now = new Date().toISOString()
      return state.map((contact) => (contact.id === id ? { ...contact, ...payload, updatedAt: now } : contact))
    },
    deleteContact(state, action) {
      const id = action.payload
      return state.filter((contact) => contact.id !== id)
    },
    appendTimelineEntry(state, action) {
      const { contactId, section, payload } = action.payload
      const now = new Date().toISOString()

      return state.map((contact) => {
        if (contact.id !== contactId) return contact
        return {
          ...contact,
          [section]: [
            {
              id: crypto.randomUUID(),
              createdAt: now,
              ...payload,
            },
            ...(contact[section] ?? []),
          ],
        }
      })
    },
  },
})

export const { createContact, updateContact, deleteContact, appendTimelineEntry } = contactsSlice.actions
export default contactsSlice.reducer

