import React, { useCallback } from 'react';
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil';
import styled from 'styled-components';
import type { StyledComponent } from 'styled-components';
import ContentLoader from 'react-content-loader';
import {BlogPostsState} from '../store/blogPosts';
import { BlogPostModalState } from '../store/blogPosts';

const BlogItemPlaceholder: React.FC = props => {
  return (
    <ContentLoader viewBox="0 0 300 64" height={64} width={300} {...props}>
      <rect x="105" y="0" rx="5" ry="5" width="195" height="15" />
      <rect x="105" y="25" rx="5" ry="5" width="195" height="15" />
      <rect x="105" y="50" rx="5" ry="5" width="195" height="15" />
      <rect x="0" y="0" rx="0" ry="0" width="90" height="64" />
    </ContentLoader>
  )
}

const BlogItem: React.FC<{
  title: string,
  url: string,
  thumbnail: string,
  index: number
}> = ({title, url, thumbnail, index}) => {
  const setBlogPostModalState = useSetRecoilState(BlogPostModalState);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(({currentTarget}) => {
    setBlogPostModalState({
      isActive: true,
      blogPostIndex: Number(currentTarget.dataset.index),
      scrollY: window.scrollY
    });
  }, [setBlogPostModalState]);

  return (
    <S.Item>
      <S.Link type="button" onClick={onClick} data-index={index} aria-label="記事の詳細を開く">
        <S.Figure><img src={thumbnail} alt={title} /></S.Figure>
        <S.Title>{title}</S.Title>
      </S.Link>
    </S.Item>
  )
}

const BlogList: React.FC = () => {

  const blogPostsLoadable = useRecoilValueLoadable(BlogPostsState);

  switch (blogPostsLoadable.state) {
    case 'hasValue':
      return (
        <S.List>
          {
            blogPostsLoadable.contents.map((blogPost, index) => (
              <BlogItem title={blogPost.title} url={blogPost.url} thumbnail={blogPost.thumbnail} index={index} key={index} />
            ))
          }
        </S.List>
      )
    case 'loading':
      return (
        <S.List>
          { [1,2,3,4,5,6].map(item => <S.Item key={item}><BlogItemPlaceholder /></S.Item>) }
        </S.List>
      )
    case 'hasError':
      throw blogPostsLoadable.contents
  }
}

const S: {[s: string]: StyledComponent<any, any, {}, never>} = {};

S.Item = styled.li`
  width: 300px;
  margin: 0 20px 40px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

S.Link = styled.button`
  display: flex;
  justify-content: space-between;
  text-align: left;
`;

S.Figure = styled.figure`
  width: 90px;
  height: 64px;
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

S.Title = styled.p`
  width: calc(100% - 105px);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
`;

S.List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 680px;
  margin-top: 30px;
`;

export default BlogList;