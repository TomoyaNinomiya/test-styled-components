import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
import Link from '../components/common/Link';
import styles from '../components/common/contents.module.scss';

const BlogList = dynamic(() => import('../components/BlogList'));

const Home: NextPage = () => {
  return (
    <>
      <h2 className={styles.title}>Home</h2>
      <BlogList />
      <p className={styles.description}>
        <Link href="/about" passHref>
          <a className={styles.link}>About &rarr;</a>
        </Link>
      </p>
    </>
  )
}

export default Home;