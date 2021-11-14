import { NextPage } from 'next';
import NextHead from 'next/head';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Layout } from '../components/Layout';
import '../styles/globals.css';
import { defaultMetadata, Meta } from '../config/meta';

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
  getMeta?: (pageProps: T) => Meta;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const defaultGetLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const renderLayout = Component.getLayout ?? defaultGetLayout;

  const meta = {
    ...defaultMetadata,
    ...Component.getMeta?.(pageProps),
  };

  return (
    <>
      <NextHead>
        <title>{meta.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

        {/* Icon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="CampuzanoJoe" key="twhandle" />

        {/* Open Graph */}
        <meta
          property="og:url"
          content={`https://josephcampuzano.com${router.asPath}`}
          key="ogurl"
        />
        <meta property="og:image" content={meta.image} key="ogimage" />
        <meta property="og:title" content={meta.title} key="ogtitle" />
        <meta property="og:description" content={meta.description} key="ogdesc" />
        <meta name="description" content={meta.description} />
      </NextHead>

      {renderLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
