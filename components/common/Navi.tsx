import {
  useState,
  useCallback
} from 'react';
import MenuButton from './MenuButton';
import MenuList from './MenuList';
import styles from './Navi.module.scss';

const Navi: React.FC = () => {

  const [menuState, setMenuState] = useState(false);

  const onClickToggleMenu = useCallback(() => {
    setMenuState(oldState => !oldState)
  }, [setMenuState]);

  const onClickCloseMenu = useCallback(() => {
    setMenuState(false);
  }, [setMenuState]);

  return(
    <>
      <MenuButton onClick={onClickToggleMenu} isActive={menuState}></MenuButton>
      <div className={styles.menu} aria-hidden={!menuState}>
        <div className={styles.bg} onClick={onClickCloseMenu} />
        <MenuList onClick={onClickCloseMenu}></MenuList>
      </div>
    </>
  )
}

export default Navi;