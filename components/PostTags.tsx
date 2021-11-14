import { FC } from 'react';
import { FCWithClassName } from '../lib/types';

interface PostTagsProps {
  tags: string[];
}

export const PostTags: FCWithClassName<PostTagsProps> = (props) => {
  return props.tags.length ? (
    <ul className="flex space-x-2">
      {props.tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 bg-gradient-to-r from-indigo-700 to-purple-900 text-white rounded-sm text-xs"
        >
          {tag}
        </span>
      ))}
    </ul>
  ) : null;
};