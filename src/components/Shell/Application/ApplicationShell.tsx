import React, { ReactNode, FC } from 'react';

import Head from 'next/head';

import META from 'constants/meta';

import { styles } from '.';

interface Props {
  children: ReactNode;
}

const ApplicationShell: FC<Props> = (props) => {
  const { children } = props;

  return (
    <>
      <Head>
        {/* Device */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Primary Meta Tags */}
        <link rel="icon" href="/favicon.ico" />
        <title>{META.title}</title>
        <meta name="title" content={META.title} />
        <meta name="description" content={META.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={META.title} />
        <meta property="og:description" content={META.description} />
        <meta property="og:url" content={META.domain} />
        <meta property="og:image" content={META.image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={META.title} />
        <meta property="twitter:description" content={META.description} />
        <meta property="twitter:url" content={META.domain} />
        <meta property="twitter:image" content={META.image} />

        {/* Bots */}
        <meta key="robots" name="robots" content="index, follow" />
      </Head>
      <div className={styles.container}>
        <div className={styles.content}>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default ApplicationShell;
