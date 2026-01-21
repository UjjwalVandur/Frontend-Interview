import { useState } from 'react'
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogList from '@/components/ui/blog/BlogList';
import BlogDetail from '@/components/ui/blog/BlogDetail';
import CreateBlogForm from '@/components/ui/blog/CreateBlogForm';
import type { ViewType } from '@/types/blog';
import './App.css'

function App() {
  const [view, setView] = useState<ViewType>('list');
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  const handleSelectBlog = (id: number) => {
    setSelectedBlogId(id);
    setView('detail');
  };

  const handleCreateNew = () => {
    setView('create');
  };

  const handleBack = () => {
    setView('list');
    setSelectedBlogId(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 border-2 border-blue-500 rounded-lg p-6">
            {view === 'list' && (
              <BlogList onSelectBlog={handleSelectBlog} onCreateNew={handleCreateNew} />
            )}
            {view === 'detail' && (
              <div className="space-y-4">
                <Button onClick={handleBack} variant="ghost" className="text-blue-400">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to List
                </Button>
                <div className="text-gray-400 text-sm">
                  View details in the right panel →
                </div>
              </div>
            )}
            {view === 'create' && (
              <div className="space-y-4">
                <Button onClick={handleBack} variant="ghost" className="text-blue-400">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to List
                </Button>
                <div className="text-gray-400 text-sm">
                  Fill the form in the right panel →
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3 border-2 border-green-500 rounded-lg p-6">
            {view === 'list' && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h2 className="text-orange-400 text-3xl font-bold">Blog Cover Image</h2>
                  <p className="text-gray-400">Select a blog from the list to view details</p>
                </div>
              </div>
            )}
            {view === 'detail' && selectedBlogId && (
              <BlogDetail blogId={selectedBlogId} onBack={handleBack} />
            )}
            {view === 'create' && (
              <CreateBlogForm onBack={handleBack} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;