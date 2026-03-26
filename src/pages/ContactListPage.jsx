import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  useMediaQuery,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutGrid, List, Plus, Search } from 'lucide-react'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { useDispatch, useSelector } from 'react-redux'
import AppShell from '../components/layout/AppShell'
import StatCards from '../components/contacts/StatCards'
import ContactFormDialog from '../components/contacts/ContactFormDialog'
import ContactTable from '../components/contacts/ContactTable'
import ContactCardGrid from '../components/contacts/ContactCardGrid'
import ContactFilters from '../components/contacts/ContactFilters'
import EmptyState from '../components/contacts/EmptyState'
import { createContactAndToast, deleteContactAndToast, updateContactAndToast } from '../store/contactsThunks'
import { useDebouncedValue } from '../utils/useDebouncedValue'

const STORAGE_KEY = 'contact_management_list_preferences'
const ContactCharts = lazy(() => import('../components/contacts/ContactCharts'))

const readStoredPreferences = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { search: '', viewMode: 'table', selectedCompany: 'all', selectedTag: 'all' }
    const parsed = JSON.parse(raw)
    return {
      search: typeof parsed.search === 'string' ? parsed.search : '',
      viewMode: parsed.viewMode === 'card' ? 'card' : 'table',
      selectedCompany: typeof parsed.selectedCompany === 'string' ? parsed.selectedCompany : 'all',
      selectedTag: typeof parsed.selectedTag === 'string' ? parsed.selectedTag : 'all',
    }
  } catch {
    return { search: '', viewMode: 'table', selectedCompany: 'all', selectedTag: 'all' }
  }
}

function ContactListPage() {
  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contacts)

  const storedPrefs = useMemo(() => readStoredPreferences(), [])
  const [search, setSearch] = useState(storedPrefs.search)
  const [viewMode, setViewMode] = useState(storedPrefs.viewMode)
  const [selectedCompany, setSelectedCompany] = useState(storedPrefs.selectedCompany)
  const [selectedTag, setSelectedTag] = useState(storedPrefs.selectedTag)
  const [loading] = useState(false) // Placeholder for future server-side loading
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editContact, setEditContact] = useState(null)
  const isXs = useMediaQuery('(max-width:599px)')
  const debouncedSearch = useDebouncedValue(search, 250)

  const companies = useMemo(
    () => [...new Set(contacts.map((contact) => contact.company?.trim()).filter(Boolean))].sort(),
    [contacts],
  )

  const tags = useMemo(
    () => [...new Set(contacts.flatMap((contact) => contact.tags || []))].sort(),
    [contacts],
  )

  const filteredContacts = useMemo(() => {
    const query = debouncedSearch.toLowerCase().trim()
    return contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone} ${contact.company || ''}`
        .toLowerCase()
        .includes(query) &&
      (selectedCompany === 'all' || (contact.company || '') === selectedCompany) &&
      (selectedTag === 'all' || contact.tags?.includes(selectedTag)),
    )
  }, [contacts, debouncedSearch, selectedCompany, selectedTag])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ search, viewMode, selectedCompany, selectedTag }),
    )
  }, [search, viewMode, selectedCompany, selectedTag])

  const clearFilters = useCallback(() => {
    setSearch('')
    setSelectedCompany('all')
    setSelectedTag('all')
  }, [])

  const openCreateDialog = useCallback(() => {
    setEditContact(null)
    setDialogOpen(true)
  }, [])

  const openEditDialog = useCallback((contact) => {
    setEditContact({
      ...contact,
      tags: contact.tags?.join(', ') || '',
    })
    setDialogOpen(true)
  }, [])

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false)
  }, [])

  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteContactAndToast(id))
    },
    [dispatch],
  )

  const handleSubmit = useCallback(
    (payload) => {
      if (!editContact) {
        dispatch(createContactAndToast(payload))
        return
      }

      dispatch(updateContactAndToast({ id: editContact.id, payload }))
    },
    [dispatch, editContact],
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AppShell
        title="Contact Hub"
        subtitle="Track people, conversations, and communication touchpoints."
        actions={
          isXs ? (
            <Tooltip title="Add Contact">
              <IconButton color="primary" onClick={openCreateDialog} size="small" aria-label="Add Contact">
                <PersonAddAlt1Icon fontSize="small" />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              component={motion.button}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={openCreateDialog}
            >
              Add Contact
            </Button>
          )
        }
      >
        <StatCards contacts={contacts} />
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" py={2}>
              <CircularProgress size={24} />
            </Box>
          }
        >
          <ContactCharts contacts={contacts} />
        </Suspense>

        <Stack spacing={2} sx={{ mb: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }} sx={{ width: '100%' }}>
            <TextField
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, phone..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
              <ContactFilters
                selectedCompany={selectedCompany}
                selectedTag={selectedTag}
                companies={companies}
                tags={tags}
                onCompanyChange={setSelectedCompany}
                onTagChange={setSelectedTag}
                showTag={false}
              />
            </Box>
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ sm: 'center' }}
            justifyContent="center"
            sx={{ width: '100%', mt: 1 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1.5}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              justifyContent="center"
              sx={{ width: '100%' }}
            >
              <ContactFilters
                selectedCompany={selectedCompany}
                selectedTag={selectedTag}
                companies={companies}
                tags={tags}
                onCompanyChange={setSelectedCompany}
                onTagChange={setSelectedTag}
                showCompany={false}
              />

              <Stack direction="row" spacing={1.75} alignItems="center" justifyContent="center" sx={{ flexWrap: 'wrap' }}>
                {isXs ? (
                  <Tooltip title="Add Contact">
                    <IconButton color="primary" onClick={openCreateDialog} size="small" aria-label="Add Contact">
                      <PersonAddAlt1Icon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button variant="contained" onClick={openCreateDialog} startIcon={<Plus size={16} />}>
                    Add Contact
                  </Button>
                )}

                <Button variant="text" onClick={clearFilters}>
                  Clear Filters
                </Button>

                <ToggleButtonGroup
                  exclusive
                  value={viewMode}
                  onChange={(_, next) => next && setViewMode(next)}
                  size="small"
                >
                  <ToggleButton value="table">
                    <List size={16} />
                  </ToggleButton>
                  <ToggleButton value="card">
                    <LayoutGrid size={16} />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        {loading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : filteredContacts.length ? (
          <AnimatePresence mode="wait" initial={false}>
            {viewMode === 'table' ? (
              <motion.div
                key="table-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ContactTable contacts={filteredContacts} onEdit={openEditDialog} onDelete={handleDelete} />
              </motion.div>
            ) : (
              <motion.div
                key="card-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ContactCardGrid contacts={filteredContacts} onEdit={openEditDialog} onDelete={handleDelete} />
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <EmptyState
            title="No Contacts Found"
            description="Try changing search, company, or tag filters."
          />
        )}

        <ContactFormDialog
          key={dialogOpen ? (editContact ? `edit-${editContact.id}` : 'create') : 'closed'}
          open={dialogOpen}
          mode={editContact ? 'edit' : 'create'}
          initialData={editContact}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
        />
      </AppShell>
    </motion.div>
  )
}

export default ContactListPage
