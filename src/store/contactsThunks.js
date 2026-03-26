import { appendTimelineEntry, createContact, deleteContact, updateContact } from './contactsSlice'
import { clearToast, showToast } from './uiSlice'

export const createContactAndToast = (payload) => (dispatch) => {
  dispatch(createContact(payload))
  dispatch(showToast({ type: 'success', message: 'Contact added successfully.' }))
}

export const updateContactAndToast = ({ id, payload }) => (dispatch) => {
  dispatch(updateContact({ id, payload }))
  dispatch(showToast({ type: 'success', message: 'Contact updated successfully.' }))
}

export const deleteContactAndToast = (id) => (dispatch) => {
  dispatch(deleteContact(id))
  dispatch(showToast({ type: 'success', message: 'Contact deleted successfully.' }))
}

export const appendTimelineEntryAndToast = ({ contactId, section, payload }) => (dispatch) => {
  dispatch(appendTimelineEntry({ contactId, section, payload }))
  dispatch(showToast({ type: 'success', message: `${section.toUpperCase()} entry added.` }))
}

// Convenience thunk for UI-only updates.
export const dismissToast = () => (dispatch) => {
  dispatch(clearToast())
}

