# Testing Documentation

## Overview

This project uses Vitest for unit/integration testing and Playwright for end-to-end testing. Tests use Neon database branches for isolation, allowing safe database operations without affecting production data.

## Setup

### Prerequisites

1. Copy `.env.test` and fill in the required environment variables:
   - `NEON_PROJECT_ID`: Your Neon project ID for branch management
   - Stack authentication keys
   - Redis and other service credentials

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Debug E2E tests
npm run test:e2e:debug

# Run specific test file
npx playwright test e2e/auth.spec.ts
```

### Run All Tests

```bash
npm run test:all
```

## Test Structure

```
project/
├── test/
│   ├── setup.ts           # Vitest setup and mocks
│   ├── utils/
│   │   └── neon-branch.ts  # Neon branch management utilities
│   └── unit/
│       └── articles.test.ts # Unit tests for article actions
├── e2e/
│   ├── auth.spec.ts        # E2E tests for authentication
│   └── articles.spec.ts    # E2E tests for article CRUD
├── vitest.config.ts        # Vitest configuration
└── playwright.config.ts    # Playwright configuration
```

## Neon Branch Management

Tests automatically create isolated Neon branches for database operations:

1. **Branch Creation**: A new branch is created before tests run
2. **Migrations**: Database migrations are applied to the branch
3. **Seeding**: Test data is seeded if needed
4. **Cleanup**: Branch is deleted after tests complete

This ensures:
- Tests don't affect production data
- Each test suite has a clean database state
- Parallel test execution is safe

## Writing Tests

### Unit Tests

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('Component/Function', () => {
  it('should do something', async () => {
    // Arrange
    const mockData = { /* ... */ };

    // Act
    const result = await myFunction(mockData);

    // Assert
    expect(result).toBe(expected);
  });
});
```

### E2E Tests

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature', () => {
  test('should perform action', async ({ page }) => {
    await page.goto('/');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/success');
  });
});
```

## Mocking

### Stack Authentication

For tests requiring authentication, mock the Stack auth:

```typescript
// Unit tests
vi.mock('@/stack/server', () => ({
  stackServerApp: {
    getUser: vi.fn().mockResolvedValue({ id: 'test-user' })
  }
}));

// E2E tests
await context.addCookies([{
  name: 'stack-auth-token',
  value: 'mock-token',
  domain: 'localhost',
  path: '/',
}]);
```

## CI/CD Integration

For CI environments, ensure:

1. Set `CI=true` environment variable
2. Configure Neon API access
3. Install Playwright browsers: `npx playwright install --with-deps`
4. Run tests: `npm run test:all`

## Troubleshooting

### Neon Branch Issues

If branch creation fails:
1. Verify `NEON_PROJECT_ID` is correct
2. Check Neon CLI authentication: `npx neonctl auth`
3. Ensure you have permissions to create branches

### Playwright Issues

If E2E tests fail:
1. Check the dev server is running: `npm run dev`
2. Verify browsers are installed: `npx playwright install`
3. Use debug mode: `npm run test:e2e:debug`

### Database Connection Issues

If database operations fail:
1. Check `.env.test` configuration
2. Verify Neon branch was created successfully
3. Check migration logs for errors