import React, { useCallback } from 'react';
import { useSetRecoilState, useRecoilValueLoadable } from 'recoil';
import ContentLoader from 'react-content-loader';
import {BlogPostsState} from '../store/blogPosts';
import { BlogPostModalState } from '../store/blogPosts';
import styles from './BlogList.module.scss';

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
    <li className={styles.item}>
      <button type="button" className={styles.link} onClick={onClick} data-index={index} aria-label="記事の詳細を開く">
        <figure className={styles.figure}><img src={thumbnail} alt={title} /></figure>
        <h2 className={styles.title}>{title}</h2>
      </button>
    </li>
  )
}

const BlogList: React.FC = () => {

  const blogPostsLoadable = useRecoilValueLoadable(BlogPostsState);

  switch (blogPostsLoadable.state) {
    case 'hasValue':
      return (
        <ul className={styles.list}>
          {
            blogPostsLoadable.contents.map((blogPost, index) => (
              <BlogItem title={blogPost.title} url={blogPost.url} thumbnail={blogPost.thumbnail} index={index} key={index} />
            ))
          }
        </ul>
      )
    case 'loading':
      return (
        <ul className={styles.list}>
          { [1,2,3,4,5,6].map(item => <li className={styles.item} key={item}><BlogItemPlaceholder /></li>) }
        </ul>
      )
    case 'hasError':
      throw blogPostsLoadable.contents
  }
}

export default BlogList;