import type { Blog, BlogPosting } from "schema-dts";

/**
 * Defines a blog that may contain {@link BlogPosting | Blog Postings}
 * 
 * @returns https://schema.org/Blog
 */
export function blog(args: Omit<Blog, '@type'>): Blog {
    return {
        '@type': 'Blog',
        ...args
    }
}