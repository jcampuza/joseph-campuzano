import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { mdToHtml } from './mdToHtml';
import { omit } from './obj';
import { readingTimeMins } from './readingTime';
import { z } from 'zod';

// Runtime schema check so that build fails if something doesn't parse correctly
const PostSchema = z.object({
  html: z.string(),
  timeToReadMins: z.number(),
  slug: z.string(),
  timestamp: z.number(),
  preview: z.string(),
  title: z.string(),
  tags: z.string().array(),
});

export type IPost = z.infer<typeof PostSchema>;

export type IPostSummary = Omit<IPost, 'html'>;

const postsDir = path.join(process.cwd(), '_posts');

export const parsePostFromFile = async (file: string): Promise<IPost> => {
  const rawContent = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  const slug = file.replace(/\.md$/, '');
  const { content, data } = matter(rawContent);
  const title = data.title as string;
  const preview = data.preview as string;
  const date = new Date(data.date);
  const tags = data.tags as string[];
  const result = (await mdToHtml(content)).toString();
  const timeToReadMins = readingTimeMins(result);

  const post = PostSchema.parse({
    html: result,
    timeToReadMins,
    slug,
    timestamp: date.getTime(),
    preview,
    title,
    tags,
  });

  return post;
};

export const getPostsFiles = () => {
  return fs.readdirSync(postsDir);
};

export const getAllPostSlugs = () => {
  return fs.readdirSync(postsDir).map((file) => file.replace(/\.md$/, ''));
};

export const getPostBySlug = (slug: string) => {
  const fileName = `${slug}.md`;
  return parsePostFromFile(fileName);
};

export const getAllPostsSummary = async () => {
  const files = getPostsFiles();
  const posts = await Promise.all(files.map((file) => parsePostFromFile(file)));

  return posts
    .map((post) => omit(post, 'html') as IPostSummary)
    .sort((a, b) => b.timestamp - a.timestamp);
};

export const getAllPosts = async () => {
  const files = getPostsFiles();

  const posts = await Promise.all(files.map((file) => parsePostFromFile(file)));

  return posts.sort((a, b) => a.timestamp - b.timestamp);
};
