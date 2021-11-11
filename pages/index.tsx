import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
import Link from '../components/Link';
import * as S from '../components/styled-contents';

const BlogList = dynamic(() => import('../components/BlogList'));

const Home: NextPage = () => {
  return (
    <>
      <S.Title>Home</S.Title>
      <BlogList />
      <S.Description>
        <Link href="/about" passHref>
          <S.Link>About &rarr;</S.Link>
        </Link>
      </S.Description>
    </>
  )
}

export default Home;