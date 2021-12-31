import NextHead from 'next/head';
import { ReactElement } from 'react';
import { Layout } from '../components/Layout';
import { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
  return (
    <>
      <div className="font-sans">
        <h2 className="font-mono text-2xl mb-4">About Me</h2>
        <main className="space-y-4">
          <p>
            Hi, I&apos;m Joseph{' '}
            <span
              style={{ animationIterationCount: 1, animationDelay: '500ms' }}
              className="inline-block delay-100 animate-wiggle"
            >
              👋
            </span>
          </p>
          <p>
            I talk code, life, and anything else that may be on my mind. Sometimes I think of things
            that others may be interested in, so I figured I&apos;d start a small blog
          </p>

          <p>
            If you ever want to reach me, you can at{' '}
            <a className="text-blue-700 underline" href="mailto:campuzanojoseph@gmail.com">
              campuzanojoseph@gmail.com
            </a>
          </p>
        </main>
      </div>
    </>
  );
};

Index.getMeta = (props) => {
  return {
    title: 'About | Joseph Campuzano',
    description: 'About Joseph Campuzano',
  };
};

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Index;
