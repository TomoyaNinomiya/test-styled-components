import { useCallback } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styled, { keyframes } from 'styled-components';
import type { StyledComponent } from 'styled-components';
import { BlogPostsState, BlogPostModalState } from '../store/blogPosts';

const Modal: React.FC = () => {


  const blogPostsLoadable = useRecoilValueLoadable(BlogPostsState);

  const [blogPostModalState, setBlogPostModalState] = useRecoilState(BlogPostModalState);

  const onClickCloseModal = useCallback(() => {
    setBlogPostModalState({
      isActive: false,
      blogPostIndex: -1,
      scrollY: 100
    });
  }, []);
  switch(blogPostsLoadable.state) {
    case 'hasValue':

      const blogPost = blogPostsLoadable.contents[blogPostModalState.blogPostIndex];

      return (
        <>
          { blogPostModalState.isActive &&
            <>
              <S.ModalBg onClick={onClickCloseModal}></S.ModalBg>
              <S.ModalBody scrollY={blogPostModalState.scrollY}>
                <S.Figure><img src={blogPost.thumbnail_large} alt={blogPost.title} /></S.Figure>
                <S.Info>
                  <S.Category>{blogPost.category}</S.Category>
                  <S.Date>{blogPost.date}</S.Date>
                </S.Info>
                <S.Title>{blogPost.title}</S.Title>
                <S.Link href={blogPost.url} target="_blank" onClick={onClickCloseModal}>もっと記事を読む &rarr;</S.Link>
                <S.CloseButton type="button" aria-label="モーダルを閉じる" onClick={onClickCloseModal}>&times; Close</S.CloseButton>
              </S.ModalBody>
            </> 
          }
        </>
      )
    case 'loading':
      return <h1>Loading...</h1>
    case 'hasError':
      throw blogPostsLoadable.contents 
  }
}

const S: {[s: string]: StyledComponent<any, any, {}, never>} = {};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const popIn = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
`;

S.ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 118, 255, 0.9);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  animation: ${fadeIn} .5s;
`;

interface ModalBodyProps {
  scrollY: number
}
S.ModalBody = styled.section<ModalBodyProps>`
  width: 360px;
  padding: 30px;
  border-radius: 4px;
  background: ${({theme}) => theme.colors.bg};
  position: absolute;
  left: calc(50% - 180px);
  top: ${({scrollY}) => scrollY + 100}px;
  z-index: 6;
  animation: ${popIn} .3s cubic-bezier(0.34, 1.56, 0.64, 1), ${fadeIn} .3s;
  @media screen and (max-width: 768px) {
    padding: 20px;
    top: ${({scrollY}) => scrollY + 80}px;
  }
  @media screen and (max-width: 424px) {
    width: 84%;
    left: 8%;
  }
`;

S.Figure = styled.figure`
  width: 100%;
  padding-bottom: 75%;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  & > img {
    max-width: none;
    width: auto;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
`;

S.Title = styled.h3`
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.33;
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
    font-size: 1.6rem;
  }
`;

S.Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

S.Date = styled.p`
  color: #888;
  font-size: 1.2rem;
`;
S.Category = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

S.Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 240px;
  height: 50px;
  padding: 0 10px;
  margin: 0 auto 15px;
  border: solid 1px ${({theme}) => theme.colors.primary};
  border-radius: 4px;
  color: ${({theme}) => theme.colors.primary};
  font-weight: bold;
  text-align: center;
  transition: 0.3s;
  &:hover,
  &:active {
    background: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.bg}
  }
`;

S.CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 240px;
  height: 44px;
  margin: 0 auto;
  border-radius: 4px;
  color: ${({theme}) => theme.colors.primary};
  font-weight: bold;
  text-align: center;
`;

export default Modal;