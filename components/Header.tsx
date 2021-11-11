import styled from 'styled-components';
import type { StyledComponent } from 'styled-components';
import Link from './Link';
import Navi from './Navi';

const Header: React.FC = () => {
  return (
    <S.Header>
      <S.Title>
        <Link href="/">DEMO</Link>
      </S.Title>
      <Navi />
    </S.Header>
  )
}

export default Header;

const S: {[s: string]: StyledComponent<any, any, {}, never>} = {};

S.Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-bottom: solid 1px ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.bg};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
`;

S.Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;
