import { useState } from 'react'
import { ArrowLeft, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogList from '@/components/ui/blog/BlogList';
import BlogDetail from '@/components/ui/blog/BlogDetail';
import CreateBlogForm from '@/components/ui/blog/CreateBlogForm';
import type { ViewType } from '@/types/blog';
import './App.css'


function App() {
  const [view, setView] = useState<ViewType>('list');
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectBlog = (id: number) => {
    setSelectedBlogId(id);
    setView('detail');
    setMobileMenuOpen(false);
  };

  const handleCreateNew = () => {
    setView('create');
    setMobileMenuOpen(false);
  };

  const handleBack = () => {
    setView('list');
    setSelectedBlogId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100">Blog App</h1>
          {/* <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6 xl:gap-8">
          {/* Left Panel - Blog List */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 xl:p-6 shadow-sm">
            {view === 'list' && (
              <BlogList onSelectBlog={handleSelectBlog} onCreateNew={handleCreateNew} />
            )}
            {view === 'detail' && (
              <div className="space-y-4">
                <Button onClick={handleBack} variant="ghost" className="text-indigo-600 dark:text-indigo-400">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to List
                </Button>
                <div className="text-slate-500 dark:text-slate-400 text-sm">
                  View details in the right panel →
                </div>
              </div>
            )}
            {view === 'create' && (
              <div className="space-y-4">
                <Button onClick={handleBack} variant="ghost" className="text-indigo-600 dark:text-indigo-400">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to List
                </Button>
                <div className="text-slate-500 dark:text-slate-400 text-sm">
                  Fill the form in the right panel →
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Detail/Form */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 xl:p-6 shadow-sm">
            {view === 'list' && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">B</span>
                  </div>
                  <h2 className="text-slate-900 dark:text-slate-100 text-2xl font-bold">Welcome to Blog App</h2>
                  <p className="text-slate-600 dark:text-slate-400">Select a blog from the list to view details</p>
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

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {view === 'list' && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
              <BlogList onSelectBlog={handleSelectBlog} onCreateNew={handleCreateNew} />
            </div>
          )}
          {view === 'detail' && selectedBlogId && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
              <BlogDetail blogId={selectedBlogId} onBack={handleBack} />
            </div>
          )}
          {view === 'create' && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm">
              <CreateBlogForm onBack={handleBack} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;