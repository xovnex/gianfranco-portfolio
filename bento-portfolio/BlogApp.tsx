import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { BlogLayout } from './pages/blog/BlogLayout';
import { BlogHome } from './pages/blog/BlogHome';
import { BlogPost } from './pages/blog/BlogPost';

export default function BlogApp() {
  // If the user accessed this via a /blog path instead of a subdomain,
  // we set the basename to /blog so routing works correctly.
  const isPathRouted = window.location.pathname.startsWith('/blog');
  const basename = isPathRouted ? '/blog' : '/';

  return (
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<BlogLayout />}>
            <Route index element={<BlogHome />} />
            <Route path=":slug" element={<BlogPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}