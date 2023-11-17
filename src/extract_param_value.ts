import { to_number_or_null } from './to_number_or_null.ts'

export function extract_param_value(
  type: 'string' | 'number' | 'boolean',
  value: string,
): string | number | boolean | null {
  const decodedValue = decodeURIComponent(value)

  switch (type) {
    case 'boolean': {
      return /^(true|false)$/i.test(decodedValue)
        ? decodedValue === 'true'
        : null
    }
    case 'number': {
      return to_number_or_null(decodedValue)
    }
    default: {
      return decodedValue
    }
  }
}
