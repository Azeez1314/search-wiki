# 404 Error Page Component

A simple and user-friendly 404 error page for the Next.js wiki application.

## Features

- ✅ **Clean Design**: Centered layout with shadcn/ui components
- ✅ **Friendly Messaging**: Clear, helpful error messages
- ✅ **Visual Icon**: Search icon with X overlay to illustrate "not found"
- ✅ **Call-to-Action**: Prominent button to return to home
- ✅ **Responsive**: Works on all screen sizes
- ✅ **TypeScript**: Fully typed component
- ✅ **Accessible**: Proper heading hierarchy and semantic HTML

## Route

- **Automatic**: Triggered for any non-existent route (e.g., `/non-existent-page`, `/wiki/missing-article`)

## Components Used

### shadcn/ui Components

- `Button` - "Back to Wiki Home" call-to-action button
- `Card` - Container for the error message
- `CardContent` - Content wrapper with proper spacing

### Icons

- `Search` - Main illustration icon
- `X` - Overlay to show "not found" concept
- `Home` - Icon in the home button

## Component Structure

```
404 Page Layout
├── Centered Container (min-h-screen)
└── Card Container
    ├── Icon Illustration (Search + X)
    ├── "404" Heading
    ├── "Page Not Found" Subheading
    ├── Helpful Explanation Text
    └── "Back to Wiki Home" Button
```

## Design Details

### Visual Elements

- **Large 404**: Bold, prominent error code
- **Icon Illustration**: Search icon with red X overlay
- **Card Layout**: Clean, contained design
- **Proper Spacing**: Consistent padding and margins

### Typography

- **H1**: Large "404" in primary foreground color
- **H2**: "Page Not Found" subtitle
- **Body Text**: Helpful explanation in muted color
- **Button**: Clear call-to-action with home icon

### Colors & Theming

- Uses semantic CSS custom properties
- Respects light/dark mode automatically
- Proper contrast ratios for accessibility

## User Experience

### Messaging Strategy

- **Clear Error Code**: "404" is immediately recognizable
- **Friendly Tone**: Non-technical, helpful language
- **Solution Focused**: Explains what happened and offers next steps
- **Action Oriented**: Single, clear call-to-action

### Navigation

- **Home Button**: Takes users back to the main wiki page (`/`)
- **Visual Hierarchy**: Clear information flow from problem to solution
- **No Dead Ends**: Always provides a way forward

## Implementation

### File Location

- `/src/app/not-found.tsx` - Next.js App Router 404 page

### Automatic Triggering

Next.js automatically shows this page when:

- User navigates to a non-existent route
- API returns a 404 status
- `notFound()` function is called in a page component

### Testing URLs

You can test the 404 page by visiting:

- http://localhost:3000/non-existent-page
- http://localhost:3000/wiki/missing-article
- http://localhost:3000/any/invalid/path

## Customization Options

### Easy Modifications

1. **Change Button Text**: Update "Back to Wiki Home" to your preference
2. **Modify Icon**: Replace Search/X icons with custom illustration
3. **Update Message**: Customize the explanation text
4. **Add Links**: Include additional navigation options
5. **Brand Colors**: Adjust styling to match your brand

### Extension Ideas

- Add search functionality to help users find content
- Include popular wiki articles as suggestions
- Add breadcrumb navigation
- Include contact information or help links

## Accessibility Features

- **Semantic HTML**: Proper heading hierarchy (h1, h2)
- **Focus Management**: Button is keyboard accessible
- **Screen Reader**: Clear, descriptive text
- **Color Contrast**: High contrast text and icons
- **Icon Alt Text**: Meaningful icon descriptions

## Performance

- **Lightweight**: Minimal component with small bundle size
- **Fast Loading**: Uses only necessary shadcn/ui components
- **No External Deps**: Self-contained with existing project dependencies

This 404 page provides a professional, user-friendly experience while maintaining the simple, educational code structure perfect for learning Next.js development.
