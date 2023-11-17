import { parse_param_type } from './param_types.ts'

export function* extract_path_params(
  path: string,
): Generator<[string, string]> {
  const paramRegex = /{(\w+)(?::(\w+))?}/g

  let match: RegExpExecArray | null
  while ((match = paramRegex.exec(path)) !== null) {
    yield [
      match[1],
      parse_param_type(
        match[2] as 'string' | 'number' | 'boolean',
      ),
    ]
  }
}
