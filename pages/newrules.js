import Head from 'next/head'
import styles from '../styles/Rules.module.css'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
// https://github.com/imcuttle/remark-heading-id
import remarkHeadingId from 'remark-heading-id'

// remark plugins: https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins

export default function Rules() {
    const [markdownContent, setMarkdownContent] = useState('');

    useEffect(() => {
        // Fetch the content of the rules.md file
        fetch('/rules.md')
            .then((response) => response.text())
            .then((data) => setMarkdownContent(data))
            .catch((error) => console.error('Error fetching rules.md:', error));
    }, []);

    // https://tailwindcss.com/docs/typography-plugin
    return (
        <div className={styles.container}>
            <Head>
                <title>200 Lounge | Rules</title>
                <meta name="description" content="MK8DX 200cc Lounge Rules" />
                <link rel="icon" href="/200.png" />
            </Head>
            <main className={styles.main}>
                <ReactMarkdown
                    children={markdownContent}
                    remarkPlugins={[remarkHeadingId]}
                    className='z-4 m-auto prose lg:prose-xl prose-blue dark:prose-cyan dark:text-white dark:prose-h1:text-zinc-50 dark:prose-h2:text-zinc-100 dark:prose-h3:text-zinc-200 dark:prose-p:text-white prose-code:text-emerald-500 dark:prose-strong:text-yellow-400 prose-strong:text-orange-700 prose-em:text-red-500 break-words'>
                    {/* {markdownContent} */}
                </ReactMarkdown>
            </main>
        </div>
    );
}