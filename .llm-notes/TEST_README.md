# Testing Guide

This project includes both unit tests (Vitest) and E2E tests (Playwright) with automated Neon database branching.

## Quick Start

```bash
# Run all tests (CI/CD mode)
npm run test:ci

# Run only unit tests
npm run test

# Run only E2E tests
npm run test:e2e
```

## Test Commands

### Unit Tests (Vitest)

| Command | Description |
|---------|-------------|
| `npm run test` | Run tests once (CI mode) |
| `npm run test:watch` | Run tests in watch mode (development) |
| `npm run test:ui` | Open Vitest UI |
| `npm run test:coverage` | Generate coverage report |

### E2E Tests (Playwright)

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run E2E tests (headless, HTML report) |
| `npm run test:e2e:ci` | Run E2E tests (CI mode, list output) |
| `npm run test:e2e:ui` | Run with Playwright UI |
| `npm run test:e2e:debug` | Run in debug mode |
| `npm run test:e2e:headed` | Run with visible browser |

### All Tests

| Command | Description |
|---------|-------------|
| `npm run test:ci` | Run all tests in CI mode |
| `npm run test:all` | Alias for `test:ci` |

## Environment Setup

### Required Environment Variables

Create a `.env.test` file with:

```env
# Neon Database
NEON_PROJECT_ID=your-project-id
NEON_API_KEY=your-api-key

# Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID=your-stack-project-id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your-stack-key
STACK_SECRET_SERVER_KEY=your-stack-secret

# Test User (for E2E auth tests)
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=your-test-password

# Other services
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
BLOB_READ_WRITE_TOKEN=your-blob-token
ANTHROPIC_API_KEY=your-anthropic-key
```

## How E2E Tests Work

1. **Global Setup**: Before tests run, a temporary Neon branch is created
   - Creates a new branch using the Neon API (inherits production data)
   - Runs database migrations
   - Stores connection info in `.env.test.local`

2. **Web Server**: Next.js dev server starts with the test branch DATABASE_URL

3. **Test Execution**: Playwright tests run against the dev server
   - Authentication tests run without saved auth state
   - Authenticated tests use saved auth state from setup

4. **Global Teardown**: After tests complete, the Neon branch is deleted
   - Cleans up the test branch
   - Removes temporary files

## CI/CD Usage

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps chromium

      - name: Run Tests
        run: npm run test:ci
        env:
          NEON_PROJECT_ID: ${{ secrets.NEON_PROJECT_ID }}
          NEON_API_KEY: ${{ secrets.NEON_API_KEY }}
          NEXT_PUBLIC_STACK_PROJECT_ID: ${{ secrets.NEXT_PUBLIC_STACK_PROJECT_ID }}
          NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: ${{ secrets.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY }}
          STACK_SECRET_SERVER_KEY: ${{ secrets.STACK_SECRET_SERVER_KEY }}
          TEST_USER_EMAIL: ${{ secrets.TEST_USER_EMAIL }}
          TEST_USER_PASSWORD: ${{ secrets.TEST_USER_PASSWORD }}
          UPSTASH_REDIS_REST_URL: ${{ secrets.UPSTASH_REDIS_REST_URL }}
          UPSTASH_REDIS_REST_TOKEN: ${{ secrets.UPSTASH_REDIS_REST_TOKEN }}
          BLOB_READ_WRITE_TOKEN: ${{ secrets.BLOB_READ_WRITE_TOKEN }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}

      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Test Structure

```
09-with-tests/
├── e2e/                    # E2E tests
│   ├── global-setup.ts     # Creates Neon branch
│   ├── global-teardown.ts  # Deletes Neon branch
│   ├── auth.setup.ts       # Authentication setup
│   ├── auth.spec.ts        # Auth flow tests
│   └── articles.spec.ts    # Article CRUD tests
├── test/
│   ├── unit/              # Unit tests
│   │   └── articles.test.ts
│   ├── utils/             # Test utilities
│   │   └── neon-branch.ts # Neon API integration
│   └── example.test.ts    # Example tests
├── playwright.config.ts   # Playwright configuration
└── vitest.config.ts       # Vitest configuration
```

## Neon Branch Management

The `NeonBranchManager` class handles automatic database branching:

- **Creates branches** using the Neon API (not CLI)
- **Gets connection strings** with credentials via API
- **Runs migrations** on the test branch
- **Inherits production data** from the parent branch
- **Cleans up** branches after tests
- **4-hour TTL** - Branches auto-delete after 4 hours as a failsafe

Each test run gets a fresh, isolated database branch (with production data) that is automatically created and destroyed. If cleanup fails, the branch will automatically expire after 4 hours.

## Troubleshooting

### Tests fail with "NEON_PROJECT_ID is required"
- Ensure `.env.test` exists with all required variables
- Check that environment variables are loaded in CI

### Database connection errors
- Verify NEON_API_KEY has correct permissions
- Check that NEON_PROJECT_ID is correct
- Ensure the Neon project exists and is accessible

### Authentication tests fail
- Verify TEST_USER_EMAIL and TEST_USER_PASSWORD match a real user in Stack
- Check Stack Auth credentials are correct
- Review auth.setup.ts for selector updates if Stack UI changed

### E2E tests timeout
- Increase timeout in playwright.config.ts
- Check that dev server starts successfully
- Verify database migrations complete

## Best Practices

1. **Always use `test:ci` in CI/CD** - it runs tests in non-interactive mode with list output
2. **Use `test:watch` during development** - for rapid feedback
3. **Run E2E tests before pushing** - catch integration issues early
4. **Keep test user credentials secure** - use secrets management in CI
5. **Review test reports** - Playwright generates HTML reports on failure

## Important Notes for CI/CD

### Reporter Behavior
- **Development (`npm run test:e2e`)**: Uses HTML reporter, opens interactive viewer
- **CI/CD (`npm run test:ci`)**: Uses list reporter, exits cleanly without hanging
- This ensures the test process doesn't wait for user interaction in automated environments

### Exit Codes
- `0` - All tests passed
- `1` - Some tests failed
- Use exit codes in your CI pipeline to determine pass/fail status
