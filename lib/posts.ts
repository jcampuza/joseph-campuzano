import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { mdToHtml } from './mdToHtml';
import { omit } from './obj';
import { readingTimeMins } from './readingTime';

export interface Post {
  html: string;
  timeToReadMins: number;
  slug: string;
  timestamp: number;
  preview: string;
  title: string;
  tags: string[];
}

const postsDir = path.join(process.cwd(), '_posts');

export const parsePostFromFile = async (file: string): Promise<Post> => {
  const rawContent = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  const slug = file.replace(/\.md$/, '');
  const { content, data } = matter(rawContent);
  const title = data.title as string;
  const preview = data.preview as string;
  const date = new Date(data.date);
  const tags = data.tags as string[];
  const result = (await mdToHtml(content)).toString();
  const timeToRead = readingTimeMins(result);

  let errors: Record<string, any> = {};

  if (!title) {
    errors.title = 'Invalid or missing title';
  }

  if (!preview) {
    errors.preview = 'Invalid or missing preview';
  }

  if (!date || isNaN(date.getTime())) {
    errors.date = 'Invalid or missing date';
  }

  if (!tags || !tags.length) {
    errors.tags = 'Invalid or missing tags';
  }

  if (!result) {
    errors.html = 'Issue parsing HTML';
  }

  if (Object.keys(errors).length) {
    throw new Error(`Unable to parse front matter ${JSON.stringify(errors)}`);
  }

  return {
    html: result,
    timeToReadMins: timeToRead,
    slug,
    timestamp: date.getTime(),
    preview,
    title,
    tags,
  };
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

  return posts.map((post) => omit(post, 'html'));
};

export const getAllPosts = async () => {
  const files = getPostsFiles();

  const posts = await Promise.all(files.map((file) => parsePostFromFile(file)));

  return posts.sort((a, b) => a.timestamp - b.timestamp);
};
