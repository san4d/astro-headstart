import type { BreadcrumbList, Thing, URL } from "schema-dts";

export interface BreadcumbItem {
    name: string
    item: Thing | URL
}

/**
 * Allows search results for your site to use a Breadcumb display.
 * See https://developers.google.com/search/docs/appearance/structured-data/breadcrumb for more information.
 * 
 * @returns https://schema.org/BreadcrumbList
 */
export function breadcrumbs(...items: BreadcumbItem[]): BreadcrumbList {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            name: item.name,
            item: item.item,
        })),
        itemListOrder: 'Descending',
        numberOfItems: items.length
    }
}