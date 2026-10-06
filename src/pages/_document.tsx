import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html suppressHydrationWarning>
      <Head>
        <title>FinFlow</title>
        <meta property="og:title" content="FinFlow" key="title" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
