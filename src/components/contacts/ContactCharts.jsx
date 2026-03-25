import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { Pie, Doughnut } from 'react-chartjs-2'
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartColors = ['#2563eb', '#14b8a6', '#0f172a', '#6366f1', '#f59e0b', '#10b981']
const chartOptions = { responsive: true, maintainAspectRatio: false }

function ContactCharts({ contacts }) {
  const tagCount = {}
  const companyCount = {}

  contacts.forEach((contact) => {
    const company = contact.company?.trim() || 'Unassigned'
    companyCount[company] = (companyCount[company] || 0) + 1
    ;(contact.tags?.length ? contact.tags : ['Untagged']).forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })

  const tagLabels = Object.keys(tagCount)
  const companyLabels = Object.keys(companyCount)

  const tagData = {
    labels: tagLabels,
    datasets: [{ data: tagLabels.map((label) => tagCount[label]), backgroundColor: chartColors }],
  }
  const companyData = {
    labels: companyLabels,
    datasets: [{ data: companyLabels.map((label) => companyCount[label]), backgroundColor: chartColors }],
  }

  return (
    <Grid
      container
      sx={{
        mb: 3,
        width: '100%',
        justifyContent: { xs: 'flex-start', md: 'space-evenly' },
        alignItems: 'stretch',
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          mb: { xs: 2, md: 0 },
          flexBasis: { xs: '100%', md: '47.5%' },
          maxWidth: { xs: '100%', md: '47.5%' },
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contacts by Tag
            </Typography>
            <Box sx={{ height: { xs: 220, md: 256 } }}>
              <Pie data={tagData} options={chartOptions} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          flexBasis: { xs: '100%', md: '47.5%' },
          maxWidth: { xs: '100%', md: '47.5%' },
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contacts by Company
            </Typography>
            <Box sx={{ height: { xs: 220, md: 256 } }}>
              <Doughnut data={companyData} options={chartOptions} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ContactCharts
