import type { NextPage } from 'next'
import Link from '../../components/Link';
import Head from '../../components/Head';
import * as S from '../../components/styled-contents';

const Home: NextPage = () => {
  return (
    <>
      <Head title="About"></Head>
      <S.Title>About</S.Title>
      <S.Description>
        Next.js で styled components を使うDEMOのページです。<br />
        <Link href="/" passHref>
          <S.Link>&larr; Back to Home</S.Link>
        </Link>
      </S.Description>
    </>
  )
}

export default Home;