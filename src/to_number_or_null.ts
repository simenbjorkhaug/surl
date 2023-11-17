export function to_number_or_null(value: string): number | null {
  const parsed = parseInt(value)

  if (isNaN(parsed)) {
    return null
  }

  return parsed
}
