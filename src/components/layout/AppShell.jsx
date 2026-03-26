import { AppBar, Box, Container, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'
import { Contact } from 'lucide-react'

const MotionDiv = motion.div

function AppShell({ title, subtitle, children, actions }) {
  const hideSubtitle = useMediaQuery('(max-width:799px)')

  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <MotionDiv initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <AppBar position="static" color="transparent" elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
            <Toolbar
              sx={{
                px: { xs: 2, md: 3 },
                py: 1,
                bgcolor: 'background.paper',
                borderRadius: 3,
                flexWrap: 'nowrap',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <Contact size={20} />
              <Box sx={{ ml: 1.5, flex: 1, minWidth: 0 }}>
                <Typography variant="h6" noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {title}
                </Typography>
                {subtitle && !hideSubtitle ? (
                  <Typography variant="body2" color="text.secondary">
                    {subtitle}
                  </Typography>
                ) : null}
              </Box>
              {actions ? (
                <Box sx={{ flexShrink: 0, ml: 1, display: 'flex', alignItems: 'center' }}>{actions}</Box>
              ) : null}
            </Toolbar>
          </AppBar>
        </MotionDiv>
        {children}
      </Container>
    </Box>
  )
}

export default AppShell
