import type { NextPage } from 'next'
import Link from '../../components/common/Link';
import Head from '../../components/common/Head';
import styles from '../../components/common/contents.module.scss';

const Home: NextPage = () => {
  return (
    <>
      <Head title="About"></Head>
      <h2 className={styles.title}>About</h2>
      <p className={styles.description}>
        Next.js で styled components を使うDEMOのページです。<br />
        <Link href="/" passHref>
          <a className={styles.link}>&larr; Back to Home</a>
        </Link>
      </p>
    </>
  )
}

export default Home;