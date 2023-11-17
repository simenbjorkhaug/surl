export function param_pattern_index(
  name: string,
  type: string,
  path_segments: string[],
  url_segments: string[],
) {
  const param_pattern = `{${name}${type !== 'string' ? ':' + type : ''}}`

  const index = path_segments.indexOf(param_pattern)

  if (index === -1 || !url_segments[index]) {
    return null
  }

  return index
}
