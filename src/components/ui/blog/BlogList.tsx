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
          <Card key={i} className="bg-gray-900 border-blue-500/30">
            <CardHeader>
              <Skeleton className="h-4 w-32 bg-gray-700" />
              <Skeleton className="h-6 w-48 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert className="bg-red-900/20 border-red-500">
        <AlertDescription className="text-red-400">
          Error loading blogs: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">All Blogs</h2>
        <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Blog
        </Button>
      </div>
      
      {blogs?.length === 0 ? (
        <Card className="bg-gray-900 border-blue-500/30">
          <CardContent className="pt-6 text-center text-gray-400">
            No blogs yet. Create your first blog!
          </CardContent>
        </Card>
      ) : (
        blogs?.map((blog) => (
          <Card 
            key={blog.id} 
            className="bg-gray-900 border-blue-500/30 hover:border-blue-500 cursor-pointer transition-all"
            onClick={() => onSelectBlog(blog.id)}
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <span className="text-orange-400 text-sm font-medium">{blog.category}</span>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {blog.date}
                </span>
              </div>
              <CardTitle className="text-blue-400 text-xl">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-orange-300 line-clamp-3">
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