import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Contact } from 'lucide-react'

function AppShell({ title, subtitle, children, actions }) {
  return (
    <Box sx={{ minHeight: '100vh', py: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <AppBar position="static" color="transparent" elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
            <Toolbar sx={{ px: { xs: 2, md: 3 }, py: 1, bgcolor: 'background.paper', borderRadius: 3 }}>
              <Contact size={24} />
              <Box sx={{ ml: 1.5, flex: 1 }}>
                <Typography variant="h6">{title}</Typography>
                {subtitle ? (
                  <Typography variant="body2" color="text.secondary">
                    {subtitle}
                  </Typography>
                ) : null}
              </Box>
              {actions}
            </Toolbar>
          </AppBar>
        </motion.div>
        {children}
      </Container>
    </Box>
  )
}

export default AppShell
