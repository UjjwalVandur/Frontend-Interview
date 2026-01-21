import { QueryClient } from '@tanstack/react-query';

interface Blog {
  id: number;
  category: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
}

interface BlogFormData {
  category: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string;
}

interface CreateBlogData {
  category: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
}

type ViewType = 'list' | 'detail' | 'create';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});