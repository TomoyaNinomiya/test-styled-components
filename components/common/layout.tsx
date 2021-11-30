import styled, { ThemeProvider } from 'styled-components';
import Head from './Head'
import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import styles from './layout.module.scss';

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
      <main className={styles.main}>{children}</main>
      <Footer />
      <Modal />
    </ThemeProvider>
  )
}

export default Layout;