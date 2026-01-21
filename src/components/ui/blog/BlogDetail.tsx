import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import type { Blog } from '@/types/blog';
import { fetchBlogById } from '@/api/blogs';

interface BlogDetailProps {
  blogId: number;
  onBack: () => void;
}

function BlogDetail({ blogId, onBack }: BlogDetailProps) {
  const { data: blog, isLoading, isError, error } = useQuery<Blog, Error>({
    queryKey: ['blog', blogId],
    queryFn: () => fetchBlogById(blogId),
    enabled: !!blogId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Button onClick={onBack} variant="ghost" className="text-blue-400">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Skeleton className="h-64 w-full bg-gray-700" />
        <Skeleton className="h-8 w-3/4 bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-700" />
        <Skeleton className="h-32 w-full bg-gray-700" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <Button onClick={onBack} variant="ghost" className="text-blue-400">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Alert className="bg-red-900/20 border-red-500">
          <AlertDescription className="text-red-400">
            Error loading blog: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="ghost" className="text-blue-400 hover:text-blue-300">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blogs
      </Button>

      <div className="bg-gray-900 border-2 border-green-500 rounded-lg overflow-hidden">
        <div className="h-64 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <span className="text-orange-400 text-2xl font-bold">Blog Cover Image</span>
        </div>

        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-green-400">{blog.title}</h1>
          
          <div className="flex items-center gap-6 text-sm">
            <span className="text-blue-400 flex items-center gap-2">
              {blog.category}
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {blog.date}
            </span>
          </div>

          <p className="text-green-300 text-lg leading-relaxed">
            {blog.description}
          </p>

          <div className="pt-6 border-t border-gray-700">
            <p className="text-green-400 whitespace-pre-wrap leading-relaxed">
              {blog.content}
            </p>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-6 border-t border-gray-700">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-medium">Tags:</span>
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="text-gray-400 text-sm">
                    {tag}{idx < blog.tags.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default BlogDetail;