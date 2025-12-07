# Wiki Article Viewer Component

A comprehensive React component for viewing individual wiki articles with rich markdown rendering and user-friendly interface.

## Features

- ✅ **Dynamic Routing**: Works with `/wiki/[id]` for any article ID
- ✅ **Markdown Rendering**: Full markdown support with `react-markdown`
- ✅ **Responsive Design**: Mobile-friendly layout using shadcn/ui components
- ✅ **Rich Styling**: Custom styled markdown components with proper typography
- ✅ **Image Support**: Displays article images with Next.js Image optimization
- ✅ **Breadcrumb Navigation**: Shows "Home > Article Title" navigation
- ✅ **Conditional Edit Button**: Shows edit button based on user permissions
- ✅ **Article Metadata**: Displays author, creation date, and article type
- ✅ **TypeScript Support**: Fully typed with clear interfaces

## Routes

- `/wiki/[id]` - View any article by ID (e.g., `/wiki/1`, `/wiki/welcome-guide`)

## Components Used

### shadcn/ui Components

- `Button` - Edit buttons and navigation actions
- `Card` - Main content container
- `Badge` - Article type indicator
- Custom styles for responsive layout

### Third-party

- `react-markdown` - Markdown rendering with custom component styling
- `next/image` - Optimized image rendering
- `lucide-react` - Icon components (Edit, Home, Calendar, User, etc.)

## Component Architecture

```
WikiArticleViewer (main component)
├── Breadcrumb Navigation
├── Article Header
│   ├── Title (H1)
│   ├── Metadata (Author, Date, Badge)
│   └── Edit Button (conditional)
├── Article Content (Card)
│   ├── Article Image (optional)
│   └── Rendered Markdown Content
└── Footer Actions
    ├── Back to Articles Button
    └── Edit Button (conditional)
```

## Article Data Structure

```typescript
interface Article {
  id: string; // Unique article identifier
  title: string; // Article title
  content: string; // Markdown content
  author: string; // Author name
  createdAt: string; // Creation date (ISO format)
  imageUrl?: string; // Optional header image URL
}
```

## Key Features Explained

### 1. **Smart Markdown Rendering**

The component uses `react-markdown` with custom styled components for:

- Headings (H1-H6) with proper hierarchy
- Paragraphs with optimal line height
- Lists (ordered and unordered)
- Code blocks and inline code
- Tables with borders and styling
- Blockquotes with left border
- Links with proper styling and security

### 2. **Responsive Image Display**

- Uses Next.js `Image` component for optimization
- Responsive sizing (h-64 on mobile, h-80 on desktop)
- Proper aspect ratio handling with `object-cover`
- Fallback handling for missing images

### 3. **Conditional Edit Access**

- Edit button only appears when `canEdit` prop is `true`
- Appears both in header and footer for easy access
- Mock permission system (ready for real auth integration)

### 4. **Professional Typography**

- Custom prose styling that respects theme colors
- Proper spacing and hierarchy
- Code syntax highlighting support
- Table styling with borders and alternating rows

### 5. **Navigation & UX**

- Breadcrumb navigation for context
- Back button for easy navigation
- Click handlers ready for routing integration
- Loading and error states (ready for implementation)

## Mock Data Features

The component currently displays a comprehensive sample article with:

- **Rich Content**: Headers, paragraphs, lists, code blocks, tables
- **Multiple Sections**: Getting started, features, examples, tips
- **Code Examples**: JavaScript code blocks with syntax highlighting
- **Table Example**: Feature comparison table
- **Various Markdown Elements**: Blockquotes, links, emphasis

## Styling Integration

### Theme Support

- Respects light/dark mode through CSS custom properties
- Uses semantic color tokens (`--foreground`, `--muted`, etc.)
- Proper contrast ratios for accessibility

### Custom Markdown Styles

```css
/* Components receive custom styling for: */
- Headings: Proper font weights and spacing
- Code: Background colors and syntax highlighting
- Tables: Borders and structured layout
- Links: Primary color with hover effects
- Blockquotes: Left border and italic styling
```

## Usage Examples

### Basic Article View

```bash
# View article with ID "1"
/wiki/1

# View article with slug
/wiki/getting-started
```

### With Edit Permissions

The component automatically shows edit buttons when `canEdit={true}` is passed.

### Custom Styling

The markdown renderer accepts custom components for complete style control.

## Integration Notes

This is a **UI-only** implementation. To integrate with a real backend:

1. **Replace mock data** in `/src/app/wiki/[id]/page.tsx` with actual API fetching
2. **Implement real navigation** in click handlers (replace console.log statements)
3. **Add authentication** to determine `canEdit` permissions
4. **Add error handling** for missing articles or failed requests
5. **Implement search** and article discovery features
6. **Add social features** like comments, likes, or sharing

## Performance Considerations

- **Image Optimization**: Uses Next.js Image component with priority loading
- **Markdown Parsing**: Client-side rendering with react-markdown
- **Static Generation**: Ready for ISR or SSG implementation
- **Code Splitting**: Component can be lazy-loaded if needed

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and navigation
- **Focus Management**: Keyboard navigation support
- **Alt Text**: Image alt attributes for screen readers
- **Color Contrast**: Theme-aware colors with proper contrast ratios
- **Link Security**: External links open safely with proper attributes

## Development

To test the component:

```bash
npm run dev
```

Then navigate to any of these URLs:

- http://localhost:3000/wiki/1
- http://localhost:3000/wiki/welcome-guide
- http://localhost:3000/wiki/any-id-here

The component will display the same comprehensive sample article with the provided ID.
