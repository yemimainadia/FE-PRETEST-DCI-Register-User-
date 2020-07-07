import Head from 'next/head';

export default function Header({ pageConfig }) {
    const { title } = pageConfig;

    return (
        <>
            <Head>
                <title>Page: {title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
        </>
    )
}