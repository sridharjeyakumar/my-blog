/* eslint-disable no-unused-vars */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <div>
      <h1>My Blog</h1>
      {posts.map(post => (
        <div key={post.slug}>
          <Link href={`/blog/${post.slug}`}>
            <h2>{post.frontMatter.title}</h2>
          </Link>
          <p>{post.frontMatter.date}</p>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('content', 'blog'));
  const posts = files.map(filename => {
    const slug = filename.replace('.md', '');
    const content = fs.readFileSync(path.join('content', 'blog', filename), 'utf-8');
    const { data: frontMatter } = matter(content);
    return { slug, frontMatter };
  });
  return { props: { posts } };
}
