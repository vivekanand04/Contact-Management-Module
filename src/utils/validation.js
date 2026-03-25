export const validateContact = (values) => {
  const errors = {}

  if (!values.firstName.trim()) errors.firstName = 'First name is required'
  if (!values.lastName.trim()) errors.lastName = 'Last name is required'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!emailRegex.test(values.email)) errors.email = 'Enter a valid email'

  const phoneRegex = /^[+\d][\d\s-]{7,}$/
  if (!values.phone.trim()) errors.phone = 'Phone number is required'
  else if (!phoneRegex.test(values.phone)) errors.phone = 'Enter a valid phone number'

  return errors
}
