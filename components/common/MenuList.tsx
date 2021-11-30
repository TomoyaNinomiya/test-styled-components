import { useRouter } from "next/router";
import Link from './Link';
import styles from './MenuList.module.scss'

const MenuItem: React.FC<{
  to: string
}> = ({children, to}) => {

  const router = useRouter();

  return (
    <li className={styles.item}>
      <Link href={to} passHref>
        <a className={styles.link} aria-current={router.pathname === to}>{children}</a>
      </Link>
    </li>
  )
}

const MenuList: React.FC<{
  onClick: React.ReactEventHandler
}> = ({onClick}) => {
  return (
    <ul className={styles.list} onClick={onClick}>
      <MenuItem to="/">HOME</MenuItem>
      <MenuItem to="/about">ABOUT</MenuItem>
    </ul>
  )
}

export default MenuList;