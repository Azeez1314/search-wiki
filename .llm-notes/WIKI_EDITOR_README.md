# Wiki Editor Component

This is a comprehensive wiki article editor component built with Next.js, shadcn/ui, and react-md-editor.

## Features

- ✅ **Dual Mode**: Works for both creating new articles and editing existing ones
- ✅ **Markdown Editor**: Full-featured markdown editor with live preview
- ✅ **File Uploads**: Drag-and-drop file attachment support
- ✅ **Form Validation**: Required field validation with error messages
- ✅ **Responsive Design**: Clean, mobile-friendly layout using shadcn/ui components
- ✅ **TypeScript**: Fully typed with clear interfaces

## Routes

- `/wiki/edit/new` - Create a new article (empty form)
- `/wiki/edit/[id]` - Edit an existing article (pre-populated with mock data)

## Components Used

### shadcn/ui Components

- `Button` - Action buttons with different variants
- `Input` - Text input for the article title
- `Label` - Form field labels
- `Card` - Layout containers with headers and content areas

### Third-party

- `@uiw/react-md-editor` - Markdown editor with preview capabilities

## Usage Examples

### Creating a New Article

```bash
# Navigate to create new article page
/wiki/edit/new
```

### Editing an Existing Article

```bash
# Navigate to edit existing article page
/wiki/edit/123  # where 123 is the article ID
```

## Component Architecture

```
WikiEditor (main component)
├── Title Input Section (Card)
├── Markdown Editor Section (Card)
├── File Upload Section (Card)
└── Action Buttons Section (Card)
```

## Form Data Structure

When the form is submitted, it logs the following data structure:

```typescript
interface FormData {
  title: string; // Article title
  content: string; // Markdown content
  files: File[]; // Array of uploaded files
}
```

## Key Features Explained

### 1. Smart Form Detection

The component automatically detects whether it's in "create" or "edit" mode based on props:

- `isEditing={false}` for new articles
- `isEditing={true}` with `articleId` for editing

### 2. Form Validation

- Title is required
- Content is required
- Real-time error display with red borders and error messages

### 3. File Upload

- Multiple file selection
- Display uploaded files with sizes
- Remove individual files capability
- Drag-and-drop area

### 4. Markdown Editor

- Full toolbar with formatting options
- Edit mode with live preview capabilities
- Syntax highlighting
- Responsive design

### 5. User Experience

- Loading states during form submission
- Confirmation dialogs for cancellation
- Clear visual hierarchy with card-based layout
- Accessible form controls with proper labels

## Mock Data (Development)

For demonstration purposes, editing existing articles shows mock data:

- Sample title: "Sample Article {id}"
- Sample markdown content with examples of:
  - Headers
  - Bold/italic text
  - Links
  - Code blocks

## Integration Notes

This is **UI-only** implementation. To integrate with a real backend:

1. **Replace mock data** in `/src/app/wiki/edit/[id]/page.tsx` with actual data fetching
2. **Implement API calls** in the `handleSubmit` function of `WikiEditor` component
3. **Add navigation logic** for successful submissions and cancellations
4. **Implement file upload** backend handling for the file attachments
5. **Add authentication** and permission checks as needed

## Styling

The component uses:

- **Tailwind CSS** for utility classes
- **CSS Custom Properties** for theming integration
- **shadcn/ui design tokens** for consistent styling
- **Custom styles** for react-md-editor integration

## Development

To test the component:

```bash
npm run dev
```

Then navigate to:

- http://localhost:3000/wiki/edit/new
- http://localhost:3000/wiki/edit/123 (or any ID)
