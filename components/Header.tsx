import NextLink from 'next/link';
import { cn } from '../lib/cn';
import { FCWithClassName } from '../lib/types';
import { Container } from './Container';

export const Header: FCWithClassName = (props) => {
  return (
    <header
      className={cn(
        'bg-gradient-to-tl from-pink-900 to-indigo-900 text-white shadow-md',
        props.className
      )}
    >
      <Container>
        <NextLink href="/">
          <a className="text-md font-mono">Joseph Campuzano</a>
        </NextLink>
      </Container>
    </header>
  );
};
