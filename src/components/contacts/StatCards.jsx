import { Card, CardContent, Grid, Typography } from '@mui/material'

const cardStyles = { p: 3, border: '1px solid', borderColor: 'divider' }

function StatCards({ contacts }) {
  const total = contacts.length
  const withCompany = contacts.filter((c) => c.company).length
  const tagged = contacts.filter((c) => c.tags?.length).length

  const stats = [
    { label: 'Total Contacts', value: total },
    { label: 'With Company', value: withCompany },
    { label: 'Tagged Profiles', value: tagged },
  ]

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {stats.map((stat) => (
        <Grid key={stat.label} item xs={12} sm={4}>
          <Card>
            <CardContent sx={cardStyles}>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default StatCards
