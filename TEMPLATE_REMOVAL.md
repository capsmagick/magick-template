# Template Documentation Removal Guide

This guide provides step-by-step instructions for removing all template documentation from your project before deploying to production.

## Why Remove Template Documentation?

Template documentation is designed to help you understand and set up the template. Once you're ready for production, removing it will:

- Reduce bundle size and improve performance
- Remove confusing template-specific content from your application
- Clean up your codebase for production use
- Prevent template documentation from appearing in search engines

## Quick Removal Script

For a fast automated removal, run this command from your project root:

```bash
# Remove all template documentation files and directories
rm -rf src/lib/template-docs/
rm -rf src/routes/\(template-docs\)/
rm -rf static/template-docs/
rm -f TEMPLATE_REMOVAL.md

# Note: You'll still need to manually edit src/routes/+page.svelte
echo "⚠️  Don't forget to remove TemplateShowcase from src/routes/+page.svelte"
```

## Manual Removal Steps

### 1. Remove Template Documentation Directory

```bash
rm -rf apps/web/src/lib/template-docs/
```

This removes:
- All template documentation components
- Data files (technologies.ts, features.ts, roadmap.ts)
- Type definitions
- Configuration files

### 2. Remove Template Documentation Routes

```bash
rm -rf apps/web/src/routes/\(template-docs\)/
```

This removes:
- `/guide` page
- `/roadmap` page
- All template-specific route groups

### 3. Remove Template Assets

```bash
rm -rf apps/web/static/template-docs/
```

This removes:
- Technology logos
- Template-specific images
- Any other template documentation assets

### 4. Update Main Page

Edit `apps/web/src/routes/+page.svelte` and remove the TemplateShowcase component:

**Remove these imports:**
```typescript
import TemplateShowcase from '$lib/template-docs/components/TemplateShowcase.svelte';
```

**Remove the component usage:**
```svelte
<!-- TEMPLATE DOCS: Remove this entire section for production -->
<TemplateShowcase />
```

### 5. Update Navigation (if applicable)

If you've added template documentation links to your navigation, remove them from:
- `apps/web/src/lib/components/nav-main.svelte`
- `apps/web/src/lib/components/app-sidebar.svelte`
- Any other navigation components

Look for and remove:
```svelte
<!-- Template documentation links -->
<a href="/guide">Template Guide</a>
<a href="/roadmap">Roadmap</a>
```

### 6. Clean Environment Variables

Update your environment files to remove template-specific variables:

**Remove from `.env` files:**
```bash
SHOW_TEMPLATE_DOCS=true
```

### 7. Update Package Dependencies (Optional)

If you're not using certain dependencies that were included for template documentation, you can remove them:

```bash
# Check if these are used elsewhere in your app before removing
bun remove lucide-svelte  # If only used for template docs
```

## Verification Checklist

After removal, verify everything works correctly:

- [ ] **Build succeeds**: Run `bun run build` without errors
- [ ] **No broken imports**: Check for any remaining imports from removed files
- [ ] **Navigation works**: All navigation links function correctly
- [ ] **No template content**: No template-specific content visible on any page
- [ ] **Environment clean**: No template-specific environment variables
- [ ] **Tests pass**: Run `bun run test` to ensure no test failures

## Testing Your Changes

1. **Clean build test:**
   ```bash
   rm -rf .svelte-kit node_modules/.cache
   bun install
   bun run build
   ```

2. **Development server test:**
   ```bash
   bun run dev
   ```
   Visit your application and ensure:
   - No template documentation sections appear
   - All navigation works correctly
   - No console errors related to missing files

3. **Production build test:**
   ```bash
   bun run build
   bun run preview
   ```

## Common Issues After Removal

### Import Errors
If you see import errors after removal, check for:
- Remaining imports from `$lib/template-docs/`
- Components still trying to use removed template data
- Navigation links pointing to removed routes

### Build Failures
Common causes:
- Unused imports in components
- Missing fallback content where template sections were removed
- TypeScript errors from removed type definitions

### Missing Content
If your main page looks empty after removal:
- Add your own content to replace the template showcase
- Update the page layout and styling as needed
- Consider adding your own feature highlights or company information

## What to Keep

These files and directories are part of your application, not template documentation:
- `apps/web/src/lib/components/ui/` - UI component library
- `apps/web/src/lib/utils/` - Utility functions
- `apps/server/` - Backend application code
- Authentication and database setup
- Build configuration files

## Next Steps After Removal

1. **Customize your application:**
   - Update branding and styling
   - Add your own content and features
   - Configure for your specific use case

2. **Set up production environment:**
   - Configure production database
   - Set up authentication providers
   - Configure deployment pipeline

3. **Add monitoring and analytics:**
   - Error tracking (Sentry, etc.)
   - Analytics (Google Analytics, etc.)
   - Performance monitoring

## Need Help?

If you encounter issues during removal:

1. **Check the build output** for specific error messages
2. **Search for remaining references** to template documentation:
   ```bash
   grep -r "template-docs" apps/web/src/
   grep -r "TemplateShowcase" apps/web/src/
   ```
3. **Restore from git** if needed and try again step by step
4. **Create an issue** on the template repository with details about the problem

## Backup Recommendation

Before starting the removal process, create a backup:

```bash
git add .
git commit -m "Backup before template documentation removal"
git tag template-docs-backup
```

This allows you to restore the template documentation if needed:

```bash
git checkout template-docs-backup
```

---

**Remember:** This removal is permanent. Make sure you've extracted any useful information from the template documentation before removing it.