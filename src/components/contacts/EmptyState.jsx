import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Inbox } from 'lucide-react'
import { motion } from 'framer-motion'

function EmptyState({ title, description }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card>
        <CardContent sx={{ p: 5 }}>
          <Stack alignItems="center" spacing={1.5}>
            <Inbox size={30} />
            <Typography variant="h6">{title}</Typography>
            <Typography color="text.secondary">{description}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default EmptyState
