import Link from './Link';
import Navi from './Navi';
import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/">DEMO</Link>
      </h1>
      <Navi />
    </header>
  )
}

export default Header;