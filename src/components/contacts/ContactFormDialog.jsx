import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { validateContact } from '../../utils/validation'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  tags: '',
}

function ContactFormDialog({ open, mode, initialData, onClose, onSubmit }) {
  const [values, setValues] = useState(initialData || initialState)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setValues(initialData || initialState)
    setErrors({})
  }, [initialData, open])

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const submit = () => {
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    onSubmit({
      ...values,
      tags: values.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}>
        <DialogTitle>{mode === 'edit' ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="First Name"
                value={values.firstName}
                onChange={handleChange('firstName')}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />
              <TextField
                label="Last Name"
                value={values.lastName}
                onChange={handleChange('lastName')}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />
            </Box>
            <TextField
              label="Email"
              value={values.email}
              onChange={handleChange('email')}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              label="Phone Number"
              value={values.phone}
              onChange={handleChange('phone')}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />
            <TextField label="Company (Optional)" value={values.company} onChange={handleChange('company')} />
            <TextField
              label="Tags (Optional)"
              placeholder="Lead, Priority, Vendor"
              value={values.tags}
              onChange={handleChange('tags')}
            />
            {values.tags ? (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {values.tags
                  .split(',')
                  .map((tag) => tag.trim())
                  .filter(Boolean)
                  .map((tag) => (
                    <Chip key={tag} label={tag} size="small" sx={{ mb: 1 }} />
                  ))}
              </Stack>
            ) : (
              <Typography variant="caption" color="text.secondary">
                Add comma-separated tags for quick filtering.
              </Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={onClose}>Cancel</Button>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button variant="contained" onClick={submit}>
              {mode === 'edit' ? 'Save Changes' : 'Create Contact'}
            </Button>
          </motion.div>
        </DialogActions>
      </motion.div>
    </Dialog>
  )
}

export default ContactFormDialog
