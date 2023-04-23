import Document, {
  Html,
  Head,
  Main,
  NextScript,
  // DocumentContext,
} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html className="bg-background screen-h">
        <Head />
        <body style={{ backgroundColor: 'black' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
