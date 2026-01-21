
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft } from 'lucide-react';
import type { Blog, BlogFormData, CreateBlogData } from '@/types/blog';
import { createBlog } from '@/api/blogs';

interface CreateBlogFormProps {
  onBack: () => void;
}

function CreateBlogForm({ onBack }: CreateBlogFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<BlogFormData>({
    category: '',
    title: '',
    description: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    tags: '',
  });

  const mutation = useMutation<Blog, Error, CreateBlogData>({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      setFormData({
        category: '',
        title: '',
        description: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        tags: '',
      });
      onBack();
    },
  });

  const handleSubmit = () => {
    const blogData: CreateBlogData = {
      category: formData.category,
      title: formData.title,
      description: formData.description,
      content: formData.content,
      date: formData.date,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    mutation.mutate(blogData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="ghost" className="text-blue-400 hover:text-blue-300">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold text-white">Create New Blog</h2>
      </div>

      {mutation.isError && (
        <Alert className="bg-red-900/20 border-red-500">
          <AlertDescription className="text-red-400">
            Error creating blog: {mutation.error.message}
          </AlertDescription>
        </Alert>
      )}

      <Card className="bg-gray-900 border-blue-500/30">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Category</label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Technology"
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Date</label>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Title</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of your blog"
                required
                rows={3}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Content</label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                required
                rows={8}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Tags (comma-separated)</label>
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., react, web dev, tutorial"
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={handleSubmit}
                disabled={mutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {mutation.isPending ? 'Creating...' : 'Create Blog'}
              </Button>
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateBlogForm;
