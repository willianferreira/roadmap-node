export const PAGE_SIZE = 3;

export function getPageParams(req) {
  const rawPage = parseInt(req.query.page, 10);

  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const offset = (page - 1) * PAGE_SIZE;

  return { page, limit: PAGE_SIZE, offset };
}
