import { useCallback } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { BlogPostsState, BlogPostModalState } from '../../store/blogPosts';
import styles from './Modal.module.scss';

const Modal: React.FC = () => {

  const blogPostsLoadable = useRecoilValueLoadable(BlogPostsState);
  const [blogPostModalState, setBlogPostModalState] = useRecoilState(BlogPostModalState);

  const onClickCloseModal = useCallback(() => {
    setBlogPostModalState({
      isActive: false,
      blogPostIndex: -1,
      scrollY: 100
    });
  }, [setBlogPostModalState]);
  switch(blogPostsLoadable.state) {
    case 'hasValue':

      const blogPost = blogPostsLoadable.contents[blogPostModalState.blogPostIndex];

      return (
        <>
          { blogPostModalState.isActive &&
            <>
              <div className={styles.bg} onClick={onClickCloseModal}></div>
              <div className={styles.body} style={ { top: `${blogPostModalState.scrollY + 100}px` } }>
                <figure className={styles.figure}><img src={blogPost.thumbnail_large} alt={blogPost.title} /></figure>
                <div className={styles.info}>
                  <p className={styles.category}>{blogPost.category}</p>
                  <p className={styles.date}>{blogPost.date}</p>
                </div>
                <h3 className={styles.title }>{blogPost.title}</h3>
                <a className={styles.link} href={blogPost.url} target="_blank" rel="noreferrer" onClick={onClickCloseModal}>もっと記事を読む &rarr;</a>
                <button className={styles.closeButton} type="button" aria-label="モーダルを閉じる" onClick={onClickCloseModal}>&times; Close</button>
              </div>
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

export default Modal;