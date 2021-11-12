import styled, { ThemeProvider } from 'styled-components';
import type { StyledComponent } from 'styled-components';
import Head from './Head'
import Header from './Header';
import Footer from './Footer';
import Modal from '../components/Modal';

const theme = {
  colors: {
    bg: '#fff',
    primary: 'rgba(0, 118, 255, 0.9)',
    text: '#000',
    border: '#eaeaea'
  }
};

const Layout: React.FC = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <Head />
      <Header />
      <S.Main>{children}</S.Main>
      <Footer />
      <Modal />
    </ThemeProvider>
  )
}

export default Layout;

const S: {[s: string]: StyledComponent<any, any, {}, never>} = {};

S.Main = styled.main`
  min-height: calc(100vh - 75px);
  padding: calc(4rem + 50px) 15px 4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;