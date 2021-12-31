import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { PostDetails } from '../../components/PostDetails';
import { PostTags } from '../../components/PostTags';
import { getAllPostSlugs, getPostBySlug, Post as PostPage } from '../../lib/posts';
import NextHead from 'next/head';
import { NextPageWithLayout } from '../_app';
import { ProgressLayout } from '../../components/Layout';

export const getStaticProps: GetStaticProps<{ post: PostPage }> = async ({ params }) => {
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

const PostPage: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
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
            timestamp={props.post.timestamp}
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

PostPage.getLayout = (page) => {
  return <ProgressLayout>{page}</ProgressLayout>;
};

PostPage.getMeta = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return {
    title: `${props.post.title} | Joseph Campuzano`,
    description: `${props.post.preview}`,
  };
};

export default PostPage;
