import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'

function ContactFilters({
  selectedCompany,
  selectedTag,
  companies,
  tags,
  onCompanyChange,
  onTagChange,
  showCompany = true,
  showTag = true,
}) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      {showCompany ? (
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Company</InputLabel>
          <Select
            value={selectedCompany}
            label="Company"
            onChange={(event) => onCompanyChange(event.target.value)}
          >
            <MenuItem value="all">All Companies</MenuItem>
            {companies.map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}

      {showTag ? (
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Tag</InputLabel>
          <Select value={selectedTag} label="Tag" onChange={(event) => onTagChange(event.target.value)}>
            <MenuItem value="all">All Tags</MenuItem>
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
    </Stack>
  )
}

export default ContactFilters
