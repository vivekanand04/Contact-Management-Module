import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutGrid, List, Plus, Search } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import StatCards from '../components/contacts/StatCards'
import ContactFormDialog from '../components/contacts/ContactFormDialog'
import ContactTable from '../components/contacts/ContactTable'
import ContactCardGrid from '../components/contacts/ContactCardGrid'
import ContactFilters from '../components/contacts/ContactFilters'
import EmptyState from '../components/contacts/EmptyState'

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

function ContactListPage({ contacts, onCreate, onUpdate, onDelete }) {
  const storedPrefs = useMemo(readStoredPreferences, [])
  const [search, setSearch] = useState(storedPrefs.search)
  const [viewMode, setViewMode] = useState(storedPrefs.viewMode)
  const [selectedCompany, setSelectedCompany] = useState(storedPrefs.selectedCompany)
  const [selectedTag, setSelectedTag] = useState(storedPrefs.selectedTag)
  const [loading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editContact, setEditContact] = useState(null)

  const companies = useMemo(
    () => [...new Set(contacts.map((contact) => contact.company?.trim()).filter(Boolean))].sort(),
    [contacts],
  )

  const tags = useMemo(
    () => [...new Set(contacts.flatMap((contact) => contact.tags || []))].sort(),
    [contacts],
  )

  const filteredContacts = useMemo(() => {
    const query = search.toLowerCase().trim()
    return contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.phone} ${contact.company || ''}`
        .toLowerCase()
        .includes(query) &&
      (selectedCompany === 'all' || (contact.company || '') === selectedCompany) &&
      (selectedTag === 'all' || contact.tags?.includes(selectedTag)),
    )
  }, [contacts, search, selectedCompany, selectedTag])

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ search, viewMode, selectedCompany, selectedTag }),
    )
  }, [search, viewMode, selectedCompany, selectedTag])

  const clearFilters = () => {
    setSearch('')
    setSelectedCompany('all')
    setSelectedTag('all')
  }

  const openCreateDialog = () => {
    setEditContact(null)
    setDialogOpen(true)
  }

  const openEditDialog = (contact) => {
    setEditContact({
      ...contact,
      tags: contact.tags?.join(', ') || '',
    })
    setDialogOpen(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AppShell
        title="Contact Management"
        subtitle="Track people, conversations, and communication touchpoints."
        actions={
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

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mb: 2 }} alignItems={{ md: 'center' }}>
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
          <ContactFilters
            selectedCompany={selectedCompany}
            selectedTag={selectedTag}
            companies={companies}
            tags={tags}
            onCompanyChange={setSelectedCompany}
            onTagChange={setSelectedTag}
          />
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
                <ContactTable contacts={filteredContacts} onEdit={openEditDialog} onDelete={onDelete} />
              </motion.div>
            ) : (
              <motion.div
                key="card-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ContactCardGrid contacts={filteredContacts} onEdit={openEditDialog} onDelete={onDelete} />
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
          open={dialogOpen}
          mode={editContact ? 'edit' : 'create'}
          initialData={editContact}
          onClose={() => setDialogOpen(false)}
          onSubmit={(payload) => (editContact ? onUpdate(editContact.id, payload) : onCreate(payload))}
        />
      </AppShell>
    </motion.div>
  )
}

export default ContactListPage
