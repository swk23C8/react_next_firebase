import Head from 'next/head';

export default function Metatags({
  title = 'medium/dev.to clone',
  description = 'ZHONG XINA',
  image = 'https://pbs.twimg.com/profile_images/1427715634738208774/_yuPWpNo_400x400.jpg',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}
