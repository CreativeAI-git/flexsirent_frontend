export const generateSlug = (title, id) => {
  if (!title) return String(id);
  const cleanTitle = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${cleanTitle}-${id}`;
};

export const parseIdFromSlug = (slug) => {
  if (!slug) return null;
  const match = slug.match(/-(\d+)$/);
  return match ? match[1] : slug;
};
