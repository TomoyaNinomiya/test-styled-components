import { useRouter } from "next/router";
import Link from './Link';
import styled, { css } from 'styled-components';
import type { StyledComponent } from 'styled-components';

const MenuItem: React.FC<{
  to: string
}> = ({children, to}) => {

  const router = useRouter();

  return (
    <S.Item>
      <Link href={to} passHref>
        <S.Link isCurrent={router.pathname === to}>{children}</S.Link>
      </Link>
    </S.Item>
  )
}

const MenuList: React.FC<{
  onClick: React.ReactEventHandler
}> = ({onClick}) => {
  return (
    <S.List onClick={onClick}>
      <MenuItem to="/">HOME</MenuItem>
      <MenuItem to="/about">ABOUT</MenuItem>
    </S.List>
  )
}

const S: {[s: string]: StyledComponent<any, any, {}, never>} = {};

interface NaviMenuProps {
  onClick: React.ReactEventHandler
}

S.List = styled.ul<NaviMenuProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 60px;
  background: ${({theme}) => theme.colors.primary};
  color: ${({theme}) => theme.colors.bg};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 11;
`;

S.Item = styled.li`
  width: 100%;
  max-width: 320px;
  margin: 10px auto;
  &:last-child {
    margin-bottom: 0;
  }
`;

interface StyledLinkProps {
  isCurrent: boolean
}

S.Link = styled.a<StyledLinkProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: solid 1px ${({theme}) => theme.colors.bg};
  border-radius: 4px;
  transition: .3s;
  cursor: pointer;
  &:hover,
  &:active {
    background: ${({theme}) => theme.colors.bg};
    color: ${({theme}) => theme.colors.primary};
  }
  ${({isCurrent}) =>
    isCurrent &&
    css`
      background: ${({theme}) => theme.colors.bg};
      color: ${({theme}) => theme.colors.primary};
    `
  }
`;

export default MenuList;