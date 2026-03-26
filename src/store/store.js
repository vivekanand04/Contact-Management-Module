import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './contactsSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    ui: uiReducer,
  },
})

const CONTACTS_STORAGE_KEY = 'contact_management_contacts'

let saveTimer = null
let lastContactsRef = store.getState().contacts

// Persist contacts to localStorage so notes/emails/sms survive refresh.
store.subscribe(() => {
  const nextContacts = store.getState().contacts
  if (nextContacts === lastContactsRef) return
  lastContactsRef = nextContacts

  if (typeof window === 'undefined' || !window.localStorage) return

  if (saveTimer) window.clearTimeout(saveTimer)
  saveTimer = window.setTimeout(() => {
    try {
      window.localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(nextContacts))
    } catch {
      // If storage is full/blocked, fail silently to avoid breaking app functionality.
    }
  }, 250)
})

