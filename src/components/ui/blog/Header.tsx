import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold">
            CA
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">
            CA MONK
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a className="hover:text-indigo-600 cursor-pointer">Tools</a>
          <a className="hover:text-indigo-600 cursor-pointer">Practice</a>
          <a className="hover:text-indigo-600 cursor-pointer">Events</a>
          <a className="hover:text-indigo-600 cursor-pointer">Job Board</a>
          <a className="hover:text-indigo-600 cursor-pointer">Points</a>
        </nav>

        {/* Profile Button */}
        <div className="hidden md:block">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Profile
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700 dark:text-slate-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 px-4 py-4 space-y-3 bg-white dark:bg-slate-900">
          <p className="hover:text-indigo-600 cursor-pointer">Tools</p>
          <p className="hover:text-indigo-600 cursor-pointer">Practice</p>
          <p className="hover:text-indigo-600 cursor-pointer">Events</p>
          <p className="hover:text-indigo-600 cursor-pointer">Job Board</p>
          <p className="hover:text-indigo-600 cursor-pointer">Points</p>

          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-3">
            Profile
          </Button>
        </div>
      )}
    </header>
  );
}
