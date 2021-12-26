import Head from 'next/head'

export default function Metatags({
  title = 'swk23c8', 
  description = 'Project built with React, Next.js and Firebase',
  image = 'https://i.ytimg.com/vi/iRAK3PTQrf8/maxresdefault.jpg',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
}

