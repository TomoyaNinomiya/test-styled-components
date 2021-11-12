import { atom, selector } from 'recoil';
import axios from 'axios';
import type { BlogPost } from '../types/blogList';

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
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

export const BlogPostsState = atom({
  key: 'BlogPostsState',
  default: selector({
    key: 'FetchedBlogPosts',
    get: async () => await fetchBlogPosts()
  })
});

export const BlogPostModalState = atom({
  key: 'BlogPostModalState',
  default: {
    isActive: false,
    blogPostIndex: -1,
    scrollY: 100
  }
});