import ResponseError from '@expresso/modules/Response/ResponseError'
import { E164Number, parsePhoneNumberFromString } from 'libphonenumber-js'

function formatPhone(phone: string): E164Number | undefined {
  let transformPhone = ''

  if (phone.startsWith('+62')) {
    transformPhone = phone.replace('+62', '0')
  } else if (phone.startsWith('62')) {
    transformPhone = phone.replace('62', '0')
  } else if (phone.startsWith('08')) {
    transformPhone = phone
  } else {
    throw new ResponseError.BadRequest(
      'Incorrect Indonesian phone number format'
    )
  }

  const parsePhone = parsePhoneNumberFromString(transformPhone, 'ID')
  const newPhone = parsePhone?.number

  return newPhone
}

function formatPhoneWhatsApp(phone: string): string {
  let newPhone = ''

  if (phone.startsWith('08')) {
    // @ts-expect-error
    newPhone = formatPhone(phone)
  } else {
    newPhone = phone
  }

  let formatted = ''

  if (!newPhone.endsWith('@c.us')) {
    formatted = `${newPhone}@c.us`
  }

  const result = formatted.replace('+', '')

  return result
}

export { formatPhone, formatPhoneWhatsApp }
