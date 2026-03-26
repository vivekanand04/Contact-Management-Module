import { lazy, Suspense, useCallback } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Snackbar, Alert, Box, CircularProgress } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { dismissToast } from './store/contactsThunks'

const ContactListPage = lazy(() => import('./pages/ContactListPage'))
const ContactDetailsPage = lazy(() => import('./pages/ContactDetailsPage'))

function App() {
  const toast = useSelector((state) => state.ui.toast)
  const dispatch = useDispatch()

  const handleCloseToast = useCallback(() => {
    dispatch(dismissToast())
  }, [dispatch])

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
              <CircularProgress />
            </Box>
          }
        >
          <Routes>
            <Route
              path="/"
              element={<ContactListPage />}
            />
            <Route
              path="/contacts/:contactId"
              element={<ContactDetailsPage />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseToast} severity={toast?.type ?? 'info'} variant="filled">
          {toast?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
