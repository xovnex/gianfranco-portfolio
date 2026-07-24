import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

const App = lazy(() => import('./App'));
const BlogApp = lazy(() => import('./BlogApp.tsx'));

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Check if we're on a blog subdomain OR accessing a local /blog path
const hostname = window.location.hostname;
const pathname = window.location.pathname;
const isBlog = hostname.startsWith('blog.') || pathname.startsWith('/blog');

// Simple loading fallback
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-page text-text-main">
    <div className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
  </div>
);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<Loader />}>
        {isBlog ? <BlogApp /> : <App />}
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);