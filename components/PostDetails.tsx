import { cn } from '../lib/cn';
import { FCWithClassName } from '../lib/types';

interface PostDetailsProps {
  timestamp: number;
  timeToReadMins: number;
}

export const PostDetails: FCWithClassName<PostDetailsProps> = (props) => {
  const dateFormatted = new Date(props.timestamp).toLocaleDateString();

  return (
    <aside className={cn(props.className)}>
      <time className="block text-xs italic text-gray-700">{dateFormatted} </time>
      <small className="block italic text-gray-600">Reading Time: {props.timeToReadMins} min</small>
    </aside>
  );
};
