import { useState } from 'react'
import { Button, Card, CardContent, Chip, Stack, TextField, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

const formatDate = (isoDate) => new Date(isoDate).toLocaleString()

function TimelineSection({ entries, placeholder, actionLabel, onAdd }) {
  const [content, setContent] = useState('')
  const [addedBy, setAddedBy] = useState('')

  const submit = () => {
    if (!content.trim() || !addedBy.trim()) return
    onAdd({ content: content.trim(), addedBy: addedBy.trim() })
    setContent('')
    setAddedBy('')
  }

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            <TextField
              label={placeholder}
              multiline
              minRows={3}
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Added By"
                value={addedBy}
                onChange={(event) => setAddedBy(event.target.value)}
                sx={{ flex: 1 }}
              />
              <Button component={motion.button} whileHover={{ scale: 1.03 }} variant="contained" onClick={submit}>
                {actionLabel}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <AnimatePresence>
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card>
              <CardContent sx={{ p: 2.5 }}>
                <Typography>{entry.content}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} flexWrap="wrap">
                  <Chip label={entry.addedBy} size="small" />
                  <Chip label={formatDate(entry.createdAt)} variant="outlined" size="small" />
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {!entries.length ? (
        <Typography color="text.secondary" textAlign="center">
          No records yet. Add your first entry.
        </Typography>
      ) : null}
    </Stack>
  )
}

export default TimelineSection
