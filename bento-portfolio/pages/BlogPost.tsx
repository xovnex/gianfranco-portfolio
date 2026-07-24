/// <reference types="vite/client" />
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import frontMatter from 'front-matter';
import { motion } from 'framer-motion';

// Vite specific way to import markdown files
const mdModules = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default' });

interface PostAttributes {
  title: string;
  date: string;
  excerpt?: string;
  [key: string]: any;
}

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState('');
  const [attributes, setAttributes] = useState<PostAttributes | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadPost() {
      try {
        const matchingPath = Object.keys(mdModules).find(path => path.endsWith(`/${id}.md`));
        if (matchingPath) {
          const rawMd = await mdModules[matchingPath]() as string;
          const { attributes, body } = frontMatter<PostAttributes>(rawMd);
          setAttributes(attributes);
          setContent(body);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to load markdown', err);
        setError(true);
      }
    }
    loadPost();
  }, [id]);

  if (error) {
    return (
      <div className="w-full max-w-[800px] mx-auto text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
      </div>
    );
  }

  if (!content) {
    return <div className="w-full max-w-[800px] mx-auto py-20 animate-pulse text-center">Loading...</div>;
  }

  return (
    <div className="w-full max-w-[800px] mx-auto pb-24 sm:pb-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8"
      >
        <Link to="/blog" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors w-fit">
          &larr; Back to Blog
        </Link>
        
        <div className="bg-card border border-border rounded-4xl p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          {attributes && (
            <div className="mb-8 border-b border-border/50 pb-8 relative z-10">
              <h1 className="text-4xl font-extrabold tracking-tight text-text-main mb-4">{attributes.title}</h1>
              <p className="text-sm text-text-muted">{attributes.date}</p>
            </div>
          )}

          <div className="prose prose-invert prose-slate max-w-none prose-a:text-primary hover:prose-a:text-primary-fg prose-img:rounded-2xl relative z-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
