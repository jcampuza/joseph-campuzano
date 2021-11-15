import { InferGetStaticPropsType } from 'next';
import { FC, ReactElement } from 'react';
import { Layout } from '../components/Layout';
import { PostSummary } from '../components/PostSummary';
import { getAllPostsSummary } from '../lib/posts';
import { NextPageWithLayout } from './_app';

export const getStaticProps = async () => {
  const posts = await getAllPostsSummary();

  return {
    props: { posts },
  };
};

const Index: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const renderArticlesList = () => {
    if (!props.posts.length) {
      return (
        <>
          <p>Nothing here at the moment.I&apos;m still setting things up</p>
        </>
      );
    }

    return (
      <ul>
        {props.posts.map((post) => (
          <li key={post.slug}>
            <PostSummary
              key={post.slug}
              title={post.title}
              timestamp={post.timestamp}
              excert={post.excert}
              href={`/posts/${post.slug}`}
              tags={post.tags}
              timeToReadMins={post.timeToReadMins}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="font-sans">
      <div className="mb-8">
        <h1 className="font-mono text-2xl">Recent Posts</h1>
        <small className="text-xs text-gray-700 italic">
          Still a work in progress, so there might not be a lot here yet.
        </small>
      </div>
      <main>
        <section>{renderArticlesList()}</section>
      </main>
    </div>
  );
};

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Index;
