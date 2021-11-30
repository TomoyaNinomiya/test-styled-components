
import styles from './MenuButton.module.scss'

const MenuButton: React.FC<{
  onClick: React.ReactEventHandler,
  isActive: boolean
}> = ({onClick, isActive}) => {

  return(
    <>
      <button type="button" className={styles.button} onClick={onClick} aria-label="ナビゲーションの切り替え" aria-expanded={isActive}>
        <i className={styles.icon}><span></span><span></span><span></span></i>
      </button>
    </>
  )
}

export default MenuButton;