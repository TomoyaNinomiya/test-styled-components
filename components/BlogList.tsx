import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from './Link';
import styled from 'styled-components';
import type { StyledComponent } from 'styled-components';
import ContentLoader from 'react-content-loader';

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

interface BlogPost {
  category: string
  date: string
  post_type: string
  thumbnail: string
  title: string
  url: string
}

const fetchBlogPosts = async () => {
  if (process.env.isProd) {
    try {
      const response = await axios.get<BlogPost[]>('https://launchcart.jp/get_post_info/', {
        params: {
          latest: true,
          posts_per_page: 6
        },
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  } else {
    return require('../moch/get_post_info.json');
  }
}

const BlogItem: React.FC<{
  title: string,
  url: string,
  thumbnail: string
}> = ({title, url, thumbnail}) => {

  return (
    <S.Item>
      <Link href={url} passHref>
        <S.Link>
          <S.Figure><img src={thumbnail} alt={title} /></S.Figure>
          <S.Title>{title}</S.Title>
        </S.Link>
      </Link>
    </S.Item>
  )
}

const BlogList: React.FC = () => {

  const [blogPosts, setBlogPosts] = useState([] as BlogPost[]);

  const [blogPostsLoadState, setBlogPostsLoadState] = useState(false);

  useEffect(() => {
    (async () => {
      setBlogPosts(await fetchBlogPosts());
      setBlogPostsLoadState(true);
    })();
  }, [fetchBlogPosts, setBlogPosts, setBlogPostsLoadState]);

  if (blogPostsLoadState) {
    return (
      <S.List>
        {
          blogPosts.map((blogPost, index) => (
            <BlogItem title={blogPost.title} url={blogPost.url} thumbnail={blogPost.thumbnail} key={index} />
          ))
        }
      </S.List>
    )
  } else {
    return (
      <S.List>
        { [1,2,3,4,5,6].map(item => <S.BlogItemPlaceholder key={item} />) }
      </S.List>
    )
  }
}

const S: {[s: string]: StyledComponent<any, any, {}, never>} = {};

S.BlogItemPlaceholder = styled(BlogItemPlaceholder)`
  width: 300px;
  margin: 0 20px 40px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

S.Item = styled.li`
  width: 300px;
  margin: 0 20px 40px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

S.Link = styled.a`
  display: flex;
  justify-content: space-between;
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