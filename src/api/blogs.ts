import type { Blog, CreateBlogData } from '@/types/blog';

export const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch('http://localhost:3001/blogs');
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
};

export const fetchBlogById = async (id: number): Promise<Blog> => {
  const response = await fetch(`http://localhost:3001/blogs/${id}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
};

export const createBlog = async (blogData: CreateBlogData): Promise<Blog> => {
  const response = await fetch('http://localhost:3001/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blogData),
  });
  if (!response.ok) throw new Error('Failed to create blog');
  return response.json();
};