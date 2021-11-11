
import styled, { css } from 'styled-components';
import type { StyledComponent } from 'styled-components';

const MenuButton: React.FC<{
  onClick: React.ReactEventHandler,
  isActive: boolean
}> = ({onClick, isActive}) => {

  return(
    <>
      <S.Button type="button" onClick={onClick} aria-label="ナビゲーションの切り替え">
        <S.Icon isActive={isActive}><span></span><span></span><span></span></S.Icon>
      </S.Button>
    </>
  )
}

const S: {[s: string]: StyledComponent<any, any, {}, never>} = {};

S.Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 12;
`;

interface NaviMenuProps {
  isActive: boolean
}

S.Icon = styled.i<NaviMenuProps>`
  display: block;
  width: 24px;
  height: 24px;
  position: relative;
  & > span {
    display: block;
    width: 100%;
    height: 2px;
    background: ${({theme}) => theme.colors.primary};
    position: absolute;
    left: 50%;
    transition: margin 0.3s ease 0.3s,
      top 0.3s ease 0.3s,
      bottom 0.3s ease 0.3s,
      opacity 0.3s ease 0.3s,
      transform 0.3s ease 0s;
    &:nth-child(1) {
      top: 4px;
      transform: translate(-50%, 0) rotate(0);
    }
    &:nth-child(2) {
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &:nth-child(3) {
      bottom: 4px;
      transform: translate(-50%, 0) rotate(0);
    }
    ${({isActive}) =>
      isActive &&
      css`
        background: ${({theme}) => theme.colors.bg};
        transition: margin 0.3s ease 0s,
          top 0.3s ease 0s, bottom 0.3s ease 0s,
          opacity 0.3s ease 0s,
          transform 0.3s ease 0.3s;
        &:nth-child(1) {
          top: 50%;
          margin-top: -1px;
          transform: translate(-50%, 0) rotate(45deg);
        }
        &:nth-child(2) {
          opacity: 0;
        }
        &:nth-child(3) {
          bottom: 50%;
          margin-bottom: -1px;
          transform: translate(-50%, 0) rotate(-45deg);
        }
      `
    }
  }
`;

export default MenuButton;