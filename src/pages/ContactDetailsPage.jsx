import { useCallback, useMemo, useState } from 'react'
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
  useMediaQuery,
} from '@mui/material'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import AppShell from '../components/layout/AppShell'
import TimelineSection from '../components/contacts/TimelineSection'
import EmptyState from '../components/contacts/EmptyState'
import { appendTimelineEntryAndToast } from '../store/contactsThunks'

const MotionDiv = motion.div

function ContactDetailsPage() {
  const { contactId } = useParams()
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)
  const isWideLayout = useMediaQuery('(min-width:801px)')
  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contacts)

  const contactMap = useMemo(() => new Map(contacts.map((contact) => [contact.id, contact])), [contacts])

  const contact = useMemo(() => contactMap.get(contactId), [contactId, contactMap])
  const addNote = useCallback(
    (payload) => {
      dispatch(appendTimelineEntryAndToast({ contactId, section: 'notes', payload }))
    },
    [dispatch, contactId],
  )

  const addEmail = useCallback(
    (payload) => {
      dispatch(appendTimelineEntryAndToast({ contactId, section: 'emails', payload }))
    },
    [dispatch, contactId],
  )

  const addSms = useCallback(
    (payload) => {
      dispatch(appendTimelineEntryAndToast({ contactId, section: 'sms', payload }))
    },
    [dispatch, contactId],
  )

  const tabs = useMemo(() => {
    if (!contact) return []

    return [
      {
        label: 'Notes',
        node: (
          <TimelineSection
            entries={contact.notes}
            placeholder="Write a note"
            actionLabel="Add Note"
            onAdd={addNote}
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
            onAdd={addEmail}
          />
        ),
      },
      {
        label: 'SMS',
        node: <TimelineSection entries={contact.sms} placeholder="SMS update" actionLabel="Add SMS" onAdd={addSms} />,
      },
    ]
  }, [addEmail, addNote, addSms, contact])

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

  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            {isWideLayout ? (
              <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{
                    width: '100%',
                    minHeight: 140,
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Stack direction="column" spacing={1} alignItems="center" justifyContent="center" textAlign="center">
                      <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: 24 }}>
                        {contact.firstName.charAt(0)}
                      </Avatar>
                      <Typography variant="h5">
                        {contact.firstName} {contact.lastName}
                      </Typography>

                      <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ mt: 0.5 }}>
                        {contact.tags?.map((tag) => (
                          <Chip key={tag} label={tag} />
                        ))}
                      </Stack>
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Stack direction="column" spacing={1} alignItems="center" justifyContent="center" textAlign="center">
                      <Typography color="text.secondary">{contact.email}</Typography>
                      <Typography color="text.secondary">{contact.phone}</Typography>
                      {contact.company ? <Typography color="text.secondary">Company: {contact.company}</Typography> : null}
                    </Stack>
                  </Box>
                </Stack>
              </Stack>
            ) : (
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ width: 54, height: 54, bgcolor: 'primary.main', fontSize: 22 }}>
                    {contact.firstName.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h5">
                      {contact.firstName} {contact.lastName}
                    </Typography>
                    <Typography color="text.secondary">{contact.email}</Typography>
                    <Typography color="text.secondary">{contact.phone}</Typography>
                    {contact.company ? <Typography color="text.secondary">Company: {contact.company}</Typography> : null}
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {contact.tags?.map((tag) => (
                    <Chip key={tag} label={tag} />
                  ))}
                </Stack>
              </Stack>
            )}
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
    </MotionDiv>
  )
}

export default ContactDetailsPage
