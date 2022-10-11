import Head from 'next/head';
import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}

export default function Container(props: Props) {
  const { children } = props;
  return (
    <div>
      <Head>
        <title>Create T3 App</title>
        <meta
          name="description"
          content="Generated by create-t3-app"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Navbar />
      <main className="flex flex-col justify-center py-2 px-8">{children}</main>
      <footer className="fixed inset-x-0 bottom-0 flex justify-center bg-white py-5 shadow">
        <div className="w-full max-w-4xl">
          <h4>Opensource</h4>
        </div>
      </footer>
    </div>
  );
}
