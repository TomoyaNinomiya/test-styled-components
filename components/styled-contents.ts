import styled from 'styled-components';

export const Title = styled.h2`
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
`;

export const Description = styled.p`
  margin-top: 20px;
  font-size: 2rem;
  text-align: center;
`;

export const Link = styled.a`
  color: ${({theme}) => theme.colors.primary};
  font-weight: bold;
  cursor: pointer;
  &:hover,
  &:active {
    text-decoration: underline;
  }
`;