import { InferGetStaticPropsType } from 'next';
import { ReactElement } from 'react';
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
              preview={post.preview}
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
    <main className="font-sans">
      <section>{renderArticlesList()}</section>
    </main>
  );
};

Index.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Index;
