import { useNavigate } from 'react-router-dom'
import { Avatar, Card, CardContent, Chip, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { ChevronRight, Pencil, Trash2 } from 'lucide-react'

function ContactCardGrid({ contacts, onEdit, onDelete }) {
  const navigate = useNavigate()

  return (
    <Grid container spacing={2}>
      {contacts.map((contact) => (
        <Grid item xs={12} sm={6} lg={4} key={contact.id}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>{contact.firstName.charAt(0)}</Avatar>
                  <Stack sx={{ minWidth: 0, flex: 1 }}>
                    <Typography fontWeight={600} noWrap>
                      {contact.firstName} {contact.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {contact.email}
                    </Typography>
                  </Stack>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {contact.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  {contact.company || 'No company'}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ minHeight: 32, mb: 1 }}>
                  {contact.tags?.length
                    ? contact.tags.map((tag) => <Chip key={tag} label={tag} size="small" sx={{ mb: 0.5 }} />)
                    : <Typography variant="caption" color="text.secondary">No tags</Typography>}
                </Stack>

                <Stack direction="row" justifyContent="flex-end">
                  <Tooltip title="View details">
                    <IconButton onClick={() => navigate(`/contacts/${contact.id}`)}>
                      <ChevronRight size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit contact">
                    <IconButton onClick={() => onEdit(contact)}>
                      <Pencil size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete contact">
                    <IconButton color="error" onClick={() => onDelete(contact.id)}>
                      <Trash2 size={18} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  )
}

export default ContactCardGrid
