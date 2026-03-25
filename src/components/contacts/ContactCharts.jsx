import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Pie, Doughnut } from 'react-chartjs-2'
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartColors = ['#2563eb', '#14b8a6', '#0f172a', '#6366f1', '#f59e0b', '#10b981']

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
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contacts by Tag
            </Typography>
            <Pie data={tagData} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contacts by Company
            </Typography>
            <Doughnut data={companyData} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ContactCharts
