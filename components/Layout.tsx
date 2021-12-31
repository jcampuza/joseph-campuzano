import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Container } from './Container';
import { Footer } from './Footer';
import { Header } from './Header';
import { Link } from './Link';

const Subheader = () => {
  return (
    <Container>
      <div className="flex space-x-2">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </div>
    </Container>
  );
};

export const Layout: FC = (props) => {
  return (
    <div className="min-h-screen flex flex-col justify-start">
      <Header />
      <div className="flex-1">
        <Subheader />
        <Container className="">{props.children}</Container>
      </div>
      <Footer />
    </div>
  );
};

const ScrollProgressHeader = dynamic(
  () => {
    const p = import('./ScrollProgressHeader').then((m) => m.ScrollProgressHeader);
    return p;
  },
  { ssr: false }
);

export const ProgressLayout: FC = (props) => {
  return (
    <div className="min-h-screen flex flex-col justify-start">
      <ScrollProgressHeader />
      <Header />
      <div className="flex-1">
        <Subheader />
        <Container className="">{props.children}</Container>
      </div>
      <Footer />
    </div>
  );
};
