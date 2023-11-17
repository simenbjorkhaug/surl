import { parse_param_type } from './param_types.ts'
import { extract_param_value } from './extract_param_value.ts'
import { param_pattern_index } from './param_pattern_index.ts'

export function map_params_to_values(
  pathParams: Generator<[string, string]>,
  pathParts: string[],
  urlParts: string[],
): Map<string, string | number | boolean | undefined> | null {
  const params = new Map<string, string | number | boolean | undefined>()

  for (const [name, type] of pathParams) {
    const index = param_pattern_index(
      name,
      type,
      pathParts,
      urlParts,
    )

    if (index === null) {
      return null
    }

    const value = extract_param_value(
      parse_param_type(String(type) as 'string' | 'number' | 'boolean'),
      urlParts[index],
    )

    if (value === null) {
      return null
    }

    if (params.has(name)) {
      throw new Error('Duplicate parameter')
    }

    params.set(name, value)
  }

  return params.size > 0 ? params : null
}
