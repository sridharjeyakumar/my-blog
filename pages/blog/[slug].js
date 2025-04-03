/* eslint-disable no-unused-vars */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export default function BlogPost({ frontMatter, content }) {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <p>{new Date(frontMatter.date).toLocaleDateString()}</p>
      <MDXRemote {...content} />
    </div>
  );
}

export async function getStaticPaths() {
  const blogDir = path.join(process.cwd(), 'content', 'blog');
  if (!fs.existsSync(blogDir)) {
    return { paths: [], fallback: false };
  }

  const files = fs.readdirSync(blogDir);
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return { paths, fallback: false }; // Ensures no 404 error
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content', 'blog', `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontMatter, content } = matter(fileContent);
  const mdxContent = await serialize(content);

  return { props: { frontMatter, content: mdxContent } };
}
