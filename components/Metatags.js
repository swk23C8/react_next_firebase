import Head from 'next/head';

export default function Metatags({
    title = 'Medium/dev.to clone',
    description = 'Medium/dev.to clone with Next.js + firebase stack',
    image = 'https://i.imgur.com/rY3LgYr.jpeg',
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