import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FiMenu, FiX, FiShield, FiHeart } from 'react-icons/fi';
import TaskList from './components/TaskList';
import './App.css';

const logo = require('./assets/images/logo.png');

// Enhanced Privacy Policy component with beautiful design
const PrivacyPolicy: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FiShield className="w-6 h-6 text-blue-600" />
            Privacy Policy
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close privacy policy"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium mb-2">
            <strong>🔒 Your privacy is our top priority.</strong>
          </p>
          <p className="text-green-700 text-sm">
            TaskMaster runs entirely in your browser with complete local storage - no data ever leaves your device.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">What We DON'T Do</h3>
          <div className="grid gap-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-800 text-sm">No account registration or signup required</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-800 text-sm">No advertisements or sponsored content</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-800 text-sm">No tracking, analytics, or user profiling</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-800 text-sm">No transmission of task data to remote servers</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-red-800 text-sm">No third-party scripts or cookies</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">How Your Data is Stored</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm leading-relaxed">
              All your tasks are stored locally using IndexedDB on your device. This means your data never leaves your computer
              unless you explicitly export or share it. Clearing your browser storage will permanently remove your tasks.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Security</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Since no data is transmitted to external servers, your tasks remain completely private and secure on your device.
            We implement modern web security practices including Content Security Policy headers to protect against potential threats.
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700 text-sm">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-xl">
        <button
          className="w-full btn-primary"
          onClick={onClose}
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  </div>
);

function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Task Master - Privacy-Focused Task Management</title>
        <meta name="description" content="Task Master - A privacy-focused task management app. Organize your tasks efficiently with no ads, no tracking, and complete local storage." />
        <meta name="keywords" content="task manager, productivity, to-do list, task master, organize tasks, project management, reminders, schedule, privacy-focused, no tracking" />
        <meta property="og:title" content="Task Master - Privacy-Focused Task Management" />
        <meta property="og:description" content="Organize your tasks efficiently with no ads, no tracking, and complete local storage. Your privacy matters." />
        <meta property="og:image" content="/assets/images/task-master.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Task Master - Privacy-Focused Task Management" />
        <meta name="twitter:description" content="Organize your tasks efficiently with no ads, no tracking, and complete local storage. Your privacy matters." />
        <meta name="twitter:image" content="/assets/images/task-master.png" />
        <link rel="canonical" href="https://yourdomain.com" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Skip Link for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>

        {/* Modern Navbar */}
        <nav className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40 shadow-sm" aria-label="Primary navigation">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo and Title */}
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="TaskMaster logo"
                  className="w-8 h-8 rounded-lg shadow-sm"
                  width="32"
                  height="32"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TaskMaster
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  aria-haspopup="dialog"
                >
                  Privacy Policy
                </button>
                <a
                  href="mailto:chetankumarpulipati4@gmail.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  aria-label="Contact support via email"
                >
                  Contact
                </a>
                <a
                  href="https://www.buymeacoffee.com/ckmrp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg font-medium transition-colors"
                  aria-label="Support the developer"
                >
                  ☕ Buy me a coffee
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t border-gray-200 py-4 space-y-3 animate-slide-up">
                <button
                  onClick={() => {
                    setShowPrivacy(true);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Privacy Policy
                </button>
                <a
                  href="mailto:chetankumarpulipati4@gmail.com"
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Contact
                </a>
                <a
                  href="https://www.buymeacoffee.com/ckmrp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-yellow-400 text-yellow-900 rounded-lg font-medium"
                >
                  ☕ Buy me a coffee
                </a>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main id="main-content" role="main">
          <h1 className="sr-only">TaskMaster Privacy-Focused Productivity App</h1>
          {showPrivacy ? (
            <PrivacyPolicy onClose={() => setShowPrivacy(false)} />
          ) : (
            <TaskList />
          )}
        </main>

        {/* Modern Footer */}
        <footer className="bg-white/80 backdrop-blur-lg border-t border-white/20 mt-12" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <span>Made with</span>
                <FiHeart className="w-4 h-4 text-red-500" aria-label="love" />
                <span>for productivity enthusiasts</span>
              </div>
              <p className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} Task Master. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
}

export default App;