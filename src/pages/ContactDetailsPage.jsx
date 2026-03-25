import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import AppShell from '../components/layout/AppShell'
import TimelineSection from '../components/contacts/TimelineSection'
import EmptyState from '../components/contacts/EmptyState'

function ContactDetailsPage({ contactMap, onAddNote, onAddEmail, onAddSms }) {
  const { contactId } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)

  const contact = useMemo(() => contactMap.get(contactId), [contactId, contactMap])
  if (!contact) {
    return (
      <AppShell
        title="Contact Details"
        actions={
          <Button startIcon={<ArrowLeft size={16} />} onClick={() => navigate('/')}>
            Back
          </Button>
        }
      >
        <EmptyState title="Contact not found" description="This contact may have been removed." />
      </AppShell>
    )
  }

  const tabs = [
    {
      label: 'Notes',
      node: (
        <TimelineSection
          entries={contact.notes}
          placeholder="Write a note"
          actionLabel="Add Note"
          onAdd={(payload) => onAddNote(contact.id, payload)}
        />
      ),
    },
    {
      label: 'Emails',
      node: (
        <TimelineSection
          entries={contact.emails}
          placeholder="Email summary"
          actionLabel="Add Email"
          onAdd={(payload) => onAddEmail(contact.id, payload)}
        />
      ),
    },
    {
      label: 'SMS',
      node: (
        <TimelineSection
          entries={contact.sms}
          placeholder="SMS update"
          actionLabel="Add SMS"
          onAdd={(payload) => onAddSms(contact.id, payload)}
        />
      ),
    },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <AppShell
        title="Contact Details"
        subtitle="View communication history and profile details."
        actions={
          <Button startIcon={<ArrowLeft size={16} />} onClick={() => navigate('/')}>
            Back
          </Button>
        }
      >
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ xs: 'flex-start', md: 'center' }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: 24 }}>
                {contact.firstName.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5">
                  {contact.firstName} {contact.lastName}
                </Typography>
                <Typography color="text.secondary">{contact.email}</Typography>
                <Typography color="text.secondary">{contact.phone}</Typography>
                {contact.company ? (
                  <Typography color="text.secondary">Company: {contact.company}</Typography>
                ) : null}
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {contact.tags?.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Tabs value={tab} onChange={(_, nextTab) => setTab(nextTab)} sx={{ mb: 2 }}>
              {tabs.map((item) => (
                <Tab key={item.label} label={item.label} />
              ))}
            </Tabs>
            {tabs[tab].node}
          </CardContent>
        </Card>
      </AppShell>
    </motion.div>
  )
}

export default ContactDetailsPage
