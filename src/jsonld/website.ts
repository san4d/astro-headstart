import type { WebApplication, WebPage, WebSite } from "schema-dts";

/**
 * Defines a set of related web pages
 * 
 * @returns https://schema.org/WebSite
 */
export function website(args: Omit<WebSite, '@type'>): WebSite {
    return {
        '@type': 'WebSite',
        ...args
    }
}

/**
 * The default type assumption
 * 
 * @returns https://schema.org/WebPage
 */
export function webpage(args: Omit<WebPage, '@type'>): WebPage {
    return {
        '@type': 'WebPage',
        ...args
    }
}

export function webapp(args: Omit<WebPage, '@type'>): WebApplication {
    return {
        '@type': 'WebApplication',
        ...args
    }
}