import { cn } from '../lib/cn';
import { FCWithClassName } from '../lib/types';

interface PostDetailsProps {
  timestamp: number;
  timeToReadMins: number;
}

export const PostDetails: FCWithClassName<PostDetailsProps> = (props) => {
  return (
    <aside className={cn('flex flex-col', props.className)}>
      <time className="text-xs italic text-gray-700">
        {new Date(props.timestamp).toLocaleDateString()}{' '}
      </time>
      <small className="italic text-gray-600">Reading Time: {props.timeToReadMins} min</small>
    </aside>
  );
};
