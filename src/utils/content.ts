import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedProjects(): Promise<CollectionEntry<'projects'>[]> {
  return getCollection('projects', ({ data }) => !data.draft);
}

export async function getFeaturedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getPublishedProjects();
  return projects.filter(({ data }) => data.featured);
}

/** Newest first; undated entries last, with stable ID ordering for equal dates. */
export function sortArticlesByDate(
  articles: readonly CollectionEntry<'writing'>[],
): CollectionEntry<'writing'>[] {
  return [...articles].sort((a, b) => {
    const aTime = a.data.publishedAt?.getTime() ?? -Infinity;
    const bTime = b.data.publishedAt?.getTime() ?? -Infinity;
    if (aTime !== bTime) return aTime > bTime ? -1 : 1;
    return a.id.localeCompare(b.id);
  });
}

export async function getPublishedWriting(): Promise<CollectionEntry<'writing'>[]> {
  const articles = await getCollection('writing', ({ data }) => !data.draft);
  return sortArticlesByDate(articles);
}
