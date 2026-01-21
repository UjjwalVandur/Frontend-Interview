import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import type { Blog } from '@/types/blog';
import { fetchBlogById } from '@/api/blogs';
import { Card } from '../card';

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
        <Button onClick={onBack} variant="ghost" className="text-indigo-600 dark:text-indigo-400">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Skeleton className="h-48 sm:h-64 w-full bg-slate-200 dark:bg-slate-700 rounded-lg" />
        <Skeleton className="h-8 w-3/4 bg-slate-200 dark:bg-slate-700" />
        <Skeleton className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700" />
        <Skeleton className="h-32 w-full bg-slate-200 dark:bg-slate-700" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <Button onClick={onBack} variant="ghost" className="text-indigo-600 dark:text-indigo-400">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <AlertDescription className="text-red-800 dark:text-red-300">
            Error loading blog: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="space-y-6">
      <Button onClick={onBack} variant="ghost" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blogs
      </Button>

      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="h-48 sm:h-64 bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white text-xl sm:text-2xl font-bold px-4 text-center">Blog Cover Image</span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 wrap-break-words">
            {blog.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-sm">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300">
              {blog.category}
            </span>
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {blog.date}
            </span>
          </div>

          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {blog.description}
          </p>

          <div className="pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
              {blog.content}
            </p>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-start gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                <span className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default BlogDetail;