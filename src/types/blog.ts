import { QueryClient } from '@tanstack/react-query';

export interface Blog {
  id: number;
  category: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
}

export interface BlogFormData {
  category: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string;
}

export interface CreateBlogData {
  category: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
}

export type ViewType = 'list' | 'detail' | 'create';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});