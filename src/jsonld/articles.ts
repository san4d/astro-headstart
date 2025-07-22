import type { Article, BlogPosting, NewsArticle } from 'schema-dts';

type DisplayableArticle<T extends Article> = 
    Omit<T, '@type' | 'author' | 'datePublished' | 'dateModified' | 'headline'>
    & Required<Pick<T,  'author' | 'datePublished' | 'dateModified' | 'headline'>>

/**
 * Allows search results for your Article to use an Article display.
 * See https://developers.google.com/search/docs/appearance/structured-data/article for more information.
 * 
 * @returns https://schema.org/Article
 */
export function article(args: DisplayableArticle<Article>): Article {
    return ({
        '@type': 'Article',
        ...args
    })
}

/**
 * Allows search results for your BlogPosting to use an Article display.
 * See https://developers.google.com/search/docs/appearance/structured-data/article for more information.
 * 
 * @returns https://schema.org/BlogPosting
 */
export function blogPosting(args: DisplayableArticle<BlogPosting>): BlogPosting {
    return ({
        '@type': 'BlogPosting',
        ...args
    })
}

/**
 * Allows search results for your BlogPosting to use an Article display.
 * See https://developers.google.com/search/docs/appearance/structured-data/article for more information.
 * 
 * @returns https://schema.org/NewsArticle
 */
export function newsArticle(args: DisplayableArticle<NewsArticle>): NewsArticle {
    return ({
        '@type': 'NewsArticle',
        ...args
    })
}