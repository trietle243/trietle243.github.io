/** Static user-site routes use trailing slashes and exclude query/fragment state. */
export function canonicalURL(pathname: string, site: URL): URL {
  const canonical = new URL(pathname, site);
  canonical.search = '';
  canonical.hash = '';
  if (!canonical.pathname.endsWith('/')) canonical.pathname += '/';
  return canonical;
}
