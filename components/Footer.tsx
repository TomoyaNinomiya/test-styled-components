import styled from 'styled-components';
import type { StyledComponent } from 'styled-components';

const Footer: React.FC = () => {
  return (
    <S.Footer>
      <S.Link
        href="https://launchcart.jp/"
        target="_blank"
        rel="noopener noreferrer"
      >
        &copy; 2021 LaunchCart.jp
      </S.Link>
    </S.Footer>
  )
}

const S: {[s: string]: StyledComponent<any, any, {}, never>} = {};

S.Footer = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid ${props => props.theme.colors.border};
  justify-content: center;
  align-items: center;
`;

S.Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export default Footer;