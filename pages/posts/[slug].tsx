import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { FC } from 'react';
import { PostDetails } from '../../components/PostDetails';
import { PostTags } from '../../components/PostTags';
import { getAllPostSlugs, getPostBySlug, Post } from '../../lib/posts';
import NextHead from 'next/head';

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({ params }) => {
  if (!params || !params.slug) {
    return {
      notFound: true,
    };
  }

  const post = await getPostBySlug(params.slug as string);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const allSlugs = getAllPostSlugs();

  return {
    paths: allSlugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};

const Post: FC<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return (
    <>
      <NextHead>
        <title>{props.post.title} | Joseph Campuzano</title>
      </NextHead>
      <article>
        <header className="">
          <h1 className="font-mono text-2xl">{props.post.title}</h1>

          <PostDetails
            className="mb-2"
            timeToReadMins={props.post.timeToReadMins}
            timestamp={props.post.timeToReadMins}
          />

          <PostTags tags={props.post.tags} />
        </header>
        <section
          className="prose my-8"
          dangerouslySetInnerHTML={{ __html: props.post.html }}
        ></section>
      </article>
    </>
  );
};

export default Post;
