import { memo } from 'react'
import { Card, CardContent, Stack, Typography } from '@mui/material'
import { Inbox } from 'lucide-react'
import { motion } from 'framer-motion'

const MotionDiv = motion.div

function EmptyState({ title, description }) {
  return (
    <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Card>
        <CardContent sx={{ p: 5 }}>
          <Stack alignItems="center" spacing={1.5}>
            <Inbox size={30} />
            <Typography variant="h6">{title}</Typography>
            <Typography color="text.secondary">{description}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </MotionDiv>
  )
}

export default memo(EmptyState)
