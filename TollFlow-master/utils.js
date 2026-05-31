export function createPageUrl(pageName) {
  if (pageName === "Dashboard") return "/";
  return "/" + pageName.toLowerCase();
}
