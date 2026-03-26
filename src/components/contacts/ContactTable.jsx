import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
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
import { ChevronRight, MoveHorizontal, Pencil, Trash2 } from 'lucide-react'

const MotionTr = motion.tr

function ContactTable({ contacts, onEdit, onDelete }) {
  const navigate = useNavigate()

  return (
    <TableContainer sx={{ borderRadius: 3, bgcolor: 'background.paper' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Contact</TableCell>
            <TableCell sx={{ width: { xs: '40%', md: '18%' }, maxWidth: { md: 220 } }}>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <MotionTr
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
              <TableCell sx={{ width: { xs: '40%', md: '18%' }, maxWidth: { md: 220 } }}>
                <Stack
                  direction="row"
                  spacing={0.75}
                  alignItems="center"
                  sx={{
                    minWidth: 0,
                    '& .email-hint': { opacity: 0, transition: 'opacity 160ms ease' },
                    '&:hover .email-hint': { opacity: 0.6 },
                  }}
                >
                  <Tooltip title={contact.email} placement="top" arrow>
                    <Typography
                      variant="body2"
                      sx={{
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        cursor: 'help',
                      }}
                    >
                      {contact.email}
                    </Typography>
                  </Tooltip>
                  <MoveHorizontal className="email-hint" size={14} />
                </Stack>
              </TableCell>
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
                <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
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
                  <Box sx={{ ml: 'auto' }}>
                    <Tooltip title="View details">
                      <IconButton onClick={() => navigate(`/contacts/${contact.id}`)} aria-label="View details">
                        <ChevronRight size={18} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Stack>
              </TableCell>
            </MotionTr>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default memo(ContactTable)
