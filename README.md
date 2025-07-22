# Astro Headstart

One library that gives you a headstart managing your `head` in Astro. 
The library manages two essential types of head content:
1. [HTML meta tags](#meta-tags-from-the-html-specification): Standard HTML metadata and social media extensions
2. [JSON-LD](#json-ld-structured-data): Structured data for enhanced search results

## What's in the Package?

Headstart has three exports:

### Main Export
- **`astro-headstart`** - The main `<Headstart />` component for managing HTML head content

### Subpath Exports
- **`astro-headstart/meta`** - Meta tag components (StandardMeta, CommonMetaExtensions, OGMetaExtensions, XMetaExtensions)
- **`astro-headstart/jsonld`** - JSON-LD structured data component and Schema.org helpers 

The subpath exports are meant to allow developers to use specific components without needing the Headstart wrapper.

## Getting Started
### Installing Dependencies
Add `astro-headstart` to your project using a package manager:
```bash
# npm
npm install astro-headstart

# yarn
yarn add astro-headstart

# pnpm
pnpm add astro-headstart

# bun
bun add astro-headstart

# deno
deno add astro-headstart
```

For TypeScript users working with structured data, add [schema-dts](https://www.npmjs.com/package/schema-dts) as a dev dependency to access [Schema.org types](https://schema.org/docs/schemas.html):
```bash
# npm
npm install --save-dev schema-dts

# yarn
yarn add --dev schema-dts

# pnpm
pnpm add --save-dev schema-dts

# bun
bun add --dev schema-dts

# deno
deno add --dev schema-dts
```

### Using the `<Headstart />` Component

The `<Headstart />` component provides a simple API to manage HTML head content with support for both standard HTML meta tags and modern social media metadata.

```astro
---
import Headstart from 'astro-headstart';
---

<html>
  <head>
    <Headstart
      title="Page Title"
      charset="utf-8"
      description="Page description for search engines"
      viewport={{ width: "device-width", "initial-scale": 1 }}
      robots={['index', 'follow']}
      themeColors={[
        { color: '#ffffff', media: '(prefers-color-scheme: light)' },
        { color: '#000000', media: '(prefers-color-scheme: dark)' }
      ]}
      socials={{
        title: "Social Media Title",
        description: "Description for social previews",
        image: {
          url: new URL('/image.jpg', Astro.site),
          alt: "Image description",
          width: 1200,
          height: 630
        },
        // Platform-specific overrides for X.com and OpenGraph behavior
        platforms: {
          x: { creator: '@username' },
          og: { type: 'website' }
        }
      }}
      jsonLd={[/* Schema.org structured data */]}
    >
      <link rel="icon" href="/favicon.ico" />
      <!-- Other head elements via slot -->
    </Headstart>
  </head>
</html>
```

## Examples

### Blog Post Layout
```astro
---
import Headstart from 'astro-headstart';
import { article, website } from 'astro-headstart/jsonld';

export interface Props {
  title: string;
  description: string;
  publishedAt: Date;
  author: string;
}

const { title, description, publishedAt, author } = Astro.props;

const articleSchema = article({
  headline: title,
  description: description,
  author: { '@type': 'Person', name: author },
  datePublished: publishedAt.toISOString(),
  dateModified: publishedAt.toISOString()
});

const websiteSchema = website({
  name: 'My Blog',
  url: Astro.site
});
---

<html>
  <head>
    <Headstart
      title={`${title} | My Blog`}
      description={description}
      socials={{
        title,
        description,
        image: {
          url: new URL('/og-image.jpg', Astro.site),
          alt: 'Blog post cover image',
          width: 1200,
          height: 630
        }
      }}
      jsonLd={[articleSchema, websiteSchema]}
    />
  </head>
  <body>
    <slot />
  </body>
</html>
```

### Using Individual Components
```astro
---
import { StandardMeta, OGMetaExtensions } from 'astro-headstart/meta';
import { JSONLinkedData } from 'astro-headstart/jsonld';
---

<head>
  <StandardMeta 
    charset="utf-8" 
    description="Custom implementation" 
  />
  <OGMetaExtensions 
    type="article" 
    title="My Article" 
    description="Article description" 
  />
  <JSONLinkedData data={mySchemaData} />
</head>
```

## Meta Tags from the HTML Specification

Headstart provides comprehensive support for standard HTML meta tags as defined in the [HTML specification](https://html.spec.whatwg.org/multipage/semantics.html#standard-metadata-names):

### Standard Meta Properties
- **`charset`** - Document character set (defaults to UTF-8)
- **`description`** - Page description for search engines
- **`keywords`** - Comma-separated list of relevant keywords
- **`authors`** - Array of page authors
- **`generators`** - Software packages used to generate the document
- **`applicationName`** - Web application name with optional language
- **`referrerPolicy`** - Controls HTTP Referer header behavior
- **`themeColors`** - Suggested colors for browser UI theming
- **`colorSchemes`** - Preferred color schemes (light/dark mode support)
- **`refresh`** - Declarative page refresh configuration

### Meta Extensions

Beyond the HTML spec, Headstart supports commonly used [meta extensions](https://wiki.whatwg.org/wiki/MetaExtensions):

- **`viewport`** - Controls viewport sizing and scaling for responsive design
- **`robots`** - Search engine crawler directives (`index`, `follow`, `noarchive`, etc.)

## Social Media Meta Tags

Headstart automatically generates social media preview metadata for multiple platforms:

### OpenGraph Protocol (Facebook, LinkedIn, etc.)
Supports the full [OpenGraph specification](https://ogp.me/) including:
- Basic properties: `title`, `type`, `image`, `url`, `description`
- Rich media: video and audio content with dimensions and MIME types
- Content-specific metadata for articles, books, profiles, music, videos, and payments
- Locale and internationalization support

### X.com (Twitter) Cards
Complete support for [Twitter Card markup](https://developer.x.com/en/docs/x-for-websites/cards/overview/markup):
- Card types: `summary`, `summary_large_image`, `app`, `player`
- Creator and site attribution
- App store integration for mobile apps
- Video/audio player embedding

## JSON-LD Structured Data

Headstart includes built-in support for [Schema.org](https://schema.org/) structured data via JSON-LD, automatically generating `<script type="application/ld+json">` elements in your HTML head:

```astro
---
import { article, website } from 'astro-headstart/jsonld';

const articleData = article({
  headline: "My Blog Post",
  author: { "@type": "Person", name: "John Doe" },
  datePublished: "2024-01-01",
  dateModified: "2024-01-02"
});

const websiteData = website({
  name: "My Website",
  url: Astro.site
});
---
<Headstart jsonLd={[articleData, websiteData]} />
```

### Pre-built Schema Helpers

The pre-built schema helpers require the specific fields needed to utilize [Google's enhanced search result features](https://developers.google.com/search/docs/appearance/structured-data/search-gallery), which are based on [Schema.org](https://schema.org/docs/schemas.html) structured data. Test your implementation with [Google's Rich Results Test](https://search.google.com/test/rich-results):

| Function | Description |
|----------|-------------|
| `article()` | Article structured data for rich search results |
| `blogPosting()` | Blog post specific article data |
| `newsArticle()` | News article structured data |
| `website()` | Website-level structured data |
| `webpage()` | Individual page structured data |
| `webapp()` | Web application structured data |

## Slot Patterns for Integration

Headstart uses Astro's slot system to provide flexible integration points:

```astro
<Headstart title="My Page">
  <!-- High priority head elements (rendered first) -->
  <link slot="priority" rel="preload" href="/critical.css" as="style" />
  
  <!-- Standard head elements -->
  <link rel="stylesheet" href="/styles.css" />
  <link rel="icon" href="/favicon.ico" />
  
  <!-- Astro components work seamlessly -->
  <Font />
  <ClientRouter />
  <script src="/analytics.js"></script>
</Headstart>
```

The slot pattern allows you to:
- Integrate other Astro components like `<Font />` and `<ClientRouter />`
- Add custom meta tags, links, and scripts
- Control rendering order with the `priority` slot
- Maintain clean separation between framework-managed and custom head content

## TypeScript Support

Headstart is built with TypeScript and provides full type safety:

```ts
import type { Props as HeadstartProps } from 'astro-headstart';
import type { Thing } from 'schema-dts';

// Example Layout.astro Props
export interface Props {
  title: string;
  preview?: HeadstartProps['socials'];
  jsonLd?: Thing[];
}
```

## Contributing

Contributions are welcome! Please check the [issues page](https://github.com/san4d/astro-headstart/issues) for known bugs and feature requests.

## License

MIT - See [LICENSE](LICENSE.md) for details.