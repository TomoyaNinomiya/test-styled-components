import {
  useState,
  useCallback
} from 'react';
import styled, { css } from 'styled-components';
import type { StyledComponent } from 'styled-components';
import MenuButton from './MenuButton';
import MenuList from './MenuList';

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
      <S.Menu isActive={menuState}>
        <S.MenuBg onClick={onClickCloseMenu} />
        <MenuList onClick={onClickCloseMenu}></MenuList>
      </S.Menu>
    </>
  )
}

const S: {[s: string]: StyledComponent<any, any, {}, never>} = {};

interface NaviMenuProps {
  isActive: boolean
}

S.Menu = styled.div<NaviMenuProps>`
  visibility: hidden;
  opacity: 0;
  transition: .5s;
  ${({isActive}) =>
    isActive &&
    css`
      visibility: visible;
      opacity: 1;
    `
  }
`;

S.MenuBg = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.01);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  cursor: pointer;
`;

export default Navi;