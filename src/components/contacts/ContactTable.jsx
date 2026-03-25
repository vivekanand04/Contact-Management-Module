import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Chip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Pencil, Trash2, ChevronRight } from 'lucide-react'

function ContactTable({ contacts, onEdit, onDelete }) {
  const navigate = useNavigate()

  return (
    <TableContainer sx={{ borderRadius: 3, bgcolor: 'background.paper' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Contact</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <motion.tr
              key={contact.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{ display: 'table-row' }}
            >
              <TableCell>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {contact.firstName.charAt(0)}
                  </Avatar>
                  <Typography fontWeight={600}>
                    {contact.firstName} {contact.lastName}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{contact.company || '-'}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {contact.tags?.length
                    ? contact.tags.map((tag) => <Chip key={tag} label={tag} size="small" sx={{ mb: 0.5 }} />)
                    : '-'}
                </Stack>
              </TableCell>
              <TableCell align="right">
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
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ContactTable
