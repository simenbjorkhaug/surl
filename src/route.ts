import { extract_path_params } from './extract_path_params.ts'
import { map_params_to_values } from './map_params_to_values.ts'
import { split_url_path } from './split_url_path.ts'

export function route(
  path: string,
  url: string | URL,
): Map<string, string | number | boolean | undefined> | null {
  const pathParts = path.split('/')
  const urlParts = split_url_path(url)

  if (pathParts.length !== urlParts.length) {
    return null
  }

  return map_params_to_values(extract_path_params(path), pathParts, urlParts)
}
