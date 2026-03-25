const now = new Date().toISOString()

export const getSeedContacts = () => [
  {
    id: 'c1',
    firstName: 'Aarav',
    lastName: 'Sharma',
    email: 'aarav.sharma@techsphere.io',
    phone: '+91 98765 43210',
    company: 'TechSphere',
    tags: ['Lead', 'Priority'],
    createdAt: now,
    notes: [
      { id: 'n1', content: 'Requested a product demo next week.', addedBy: 'Priya', createdAt: now },
    ],
    emails: [
      { id: 'e1', content: 'Sent pricing deck and onboarding plan.', addedBy: 'Sales Team', createdAt: now },
    ],
    sms: [{ id: 's1', content: 'Meeting reminder sent for Friday.', addedBy: 'CRM Bot', createdAt: now }],
  },
  {
    id: 'c2',
    firstName: 'Mira',
    lastName: 'Kapoor',
    email: 'mira.kapoor@northwind.com',
    phone: '+91 99888 77665',
    company: 'Northwind',
    tags: ['Customer'],
    createdAt: now,
    notes: [],
    emails: [],
    sms: [],
  },
]
