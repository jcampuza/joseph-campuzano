import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { mdToHtml } from './mdToHtml';
import { omit } from './obj';
import { readingTimeMins } from './readingTime';

const postsDir = path.join(process.cwd(), '_posts');

export const parseFrontMatter = (data: Record<string, any>) => {
  const title = data.title as string;
  const excert = data.excert as string;
  const date = new Date(data.date);
  const tags = data.tags as string[];

  let errors: Record<string, any> = {};

  if (!title) {
    errors.title = 'Invalid or missing title';
  }

  if (!excert) {
    errors.excert = 'Invalid or missing excert';
  }

  if (!date || isNaN(date.getTime())) {
    errors.date = 'Invalid or missing date';
  }

  if (!tags || !tags.length) {
    errors.tags = 'Invalid or missing tags';
  }

  if (Object.keys(errors).length) {
    throw new Error(`Unable to parse front matter ${JSON.stringify(errors)}`);
  }

  return {
    title,
    excert,
    date,
    tags,
  };
};

export interface Post {
  html: string;
  timeToReadMins: number;
  slug: string;
  timestamp: number;
  excert: string;
  title: string;
  tags: string[];
}

export const parsePost = async (file: string): Promise<Post> => {
  const rawContent = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  const slug = file.replace(/\.md$/, '');
  const { content, data } = matter(rawContent);
  const { date, excert, title, tags } = parseFrontMatter(data);
  const result = (await mdToHtml(content)).toString();

  const timeToRead = readingTimeMins(result);

  return {
    html: result,
    timeToReadMins: timeToRead,
    slug,
    timestamp: date.getTime(),
    excert,
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
  return parsePost(fileName);
};

export const getAllPostsSummary = async () => {
  const files = getPostsFiles();
  const posts = await Promise.all(files.map((file) => parsePost(file)));

  return posts.map((post) => omit(post, 'html'));
};

export const getAllPosts = async () => {
  const files = getPostsFiles();

  const posts = await Promise.all(files.map((file) => parsePost(file)));

  return posts.sort((a, b) => a.timestamp - b.timestamp);
};
