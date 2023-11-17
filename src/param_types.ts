const PARAM_TYPES = {
  number: 'number',
  boolean: 'boolean',
  string: 'string',
} as const

export function parse_param_type(
  type: 'number' | 'boolean' | 'string' = 'string',
) {
  return PARAM_TYPES[type]
}
