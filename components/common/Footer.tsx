import styles from './Footer.module.scss'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a className={styles.link}
        href="https://launchcart.jp/"
        target="_blank"
        rel="noopener noreferrer"
      >
        &copy; 2021 LaunchCart.jp
      </a>
    </footer>
  )
}

export default Footer;