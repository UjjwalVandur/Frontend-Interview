import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Calendar } from 'lucide-react';
import type { Blog } from '@/types/blog';
import { fetchBlogs } from '@/api/blogs';

interface BlogListProps {
  onSelectBlog: (id: number) => void;
  onCreateNew: () => void;
}

function BlogList({ onSelectBlog, onCreateNew }: BlogListProps) {
  const { data: blogs, isLoading, isError, error } = useQuery<Blog[], Error>({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <Skeleton className="h-4 w-32 bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-6 w-48 bg-slate-200 dark:bg-slate-700" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full bg-slate-200 dark:bg-slate-700" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <AlertDescription className="text-red-800 dark:text-red-300">
          Error loading blogs: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">All Blogs</h2>
        <Button onClick={onCreateNew} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Blog
        </Button>
      </div>
      
      {blogs?.length === 0 ? (
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="pt-6 text-center text-slate-500 dark:text-slate-400">
            No blogs yet. Create your first blog!
          </CardContent>
        </Card>
      ) : (
        blogs?.map((blog) => (
          <Card 
            key={blog.id} 
            className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 cursor-pointer transition-all hover:shadow-md"
            onClick={() => onSelectBlog(blog.id)}
          >
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
                  {blog.category}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {blog.date}
                </span>
              </div>
              <CardTitle className="text-slate-900 dark:text-slate-100 text-lg sm:text-xl">
                {blog.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600 dark:text-slate-300 line-clamp-3">
                {blog.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default BlogList;