import NextLink from 'next/link';
import { FC } from 'react';
import { PostDetails } from './PostDetails';
import { PostTags } from './PostTags';

interface PostSummaryProps {
  href: string;
  title: string;
  preview: string;
  timestamp: number;
  tags: string[];
  timeToReadMins: number;
}

export const PostSummary: FC<PostSummaryProps> = (props) => {
  return (
    <article className="py-8 border-b border-gray-400">
      <header className="mb-2 flex flex-col">
        <NextLink href={props.href}>
          <a className="text-lg font-semibold underline">{props.title}</a>
        </NextLink>

        <PostDetails timeToReadMins={props.timeToReadMins} timestamp={props.timestamp} />
      </header>

      <p className="text-gray-800 mb-2">{props.preview}</p>

      <PostTags tags={props.tags} />
    </article>
  );
};
