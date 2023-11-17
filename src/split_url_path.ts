export function split_url_path(url: URL | string) {
  if (url instanceof URL) {
    return url.pathname.trim().split('/')
  }

  return new URL(
    url.startsWith('http') ? url : `http://localhost${url}`,
  ).pathname.trim().split('/')
}
