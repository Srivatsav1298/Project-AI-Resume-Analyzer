# Contributing to AI Resume Analyzer

Thank you for your interest in contributing! We welcome all contributions, from bug reports to feature implementations.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)

---

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful, professional, and constructive in all interactions.

### Expected Behavior
- Be inclusive and welcoming to all contributors
- Provide constructive feedback
- Focus on what's best for the project and community
- Respect diverse perspectives

### Unacceptable Behavior
- Harassment, discrimination, or inflammatory language
- Personal attacks or derogatory comments
- Unwelcome sexual attention or advances
- Other conduct deemed inappropriate by maintainers

---

## Getting Started

### Fork and Clone
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Project-AI-Resume-Analyzer.git
cd Project-AI-Resume-Analyzer

# Add upstream remote
git remote add upstream https://github.com/Srivatsav1298/Project-AI-Resume-Analyzer.git
```

### Set Up Development Environment
```bash
# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev
```

---

## Development Workflow

### Before You Start
1. Check [open issues](https://github.com/Srivatsav1298/Project-AI-Resume-Analyzer/issues) and [discussions](https://github.com/Srivatsav1298/Project-AI-Resume-Analyzer/discussions)
2. Create an issue if your feature isn't already discussed
3. Wait for feedback before starting development

### Creating a Feature
1. Keep changes focused and minimal
2. Follow the existing code structure
3. Update tests and documentation
4. Keep commits atomic and logical

### Testing Locally
```bash
# Type checking
npm run typecheck

# Development build
npm run dev

# Production build
npm run build

# Serve production build
npm start
```

---

## Coding Standards

### TypeScript Guidelines
- Use strict mode (`strict: true`)
- Explicitly type function parameters and returns
- Avoid `any` type; use `unknown` if necessary
- Use interfaces over types for object shapes

```typescript
// ✅ Good
interface ResumeData {
  id: string;
  content: string;
  uploadedAt: Date;
}

function analyzeResume(data: ResumeData): Promise<AnalysisResult> {
  // implementation
}

// ❌ Avoid
function analyzeResume(data: any): any {
  // implementation
}
```

### React Best Practices
- Use functional components with hooks
- Extract custom hooks for reusable logic
- Memoize expensive computations with `useMemo`
- Use `useCallback` for stable function references
- Keep components small and focused

```typescript
// ✅ Good
const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadResume } = useResume();

  const handleUpload = useCallback(async () => {
    if (!file) return;
    await uploadResume(file);
  }, [file, uploadResume]);

  return (
    <div onClick={handleUpload}>
      {/* JSX */}
    </div>
  );
};
```

### File Organization
```
src/
├── components/     # UI components
│   ├── index.ts   # Export barrel
│   └── ComponentName.tsx
├── hooks/         # Custom hooks
├── stores/        # State management
├── utils/         # Helper functions
└── types/         # TypeScript types
```

### Naming Conventions
- **Components**: PascalCase (e.g., `ResumeUpload.tsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useResume.ts`)
- **Utils**: camelCase (e.g., `pdfParser.ts`)
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase

---

## Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Build process, dependencies

### Examples
```bash
# Good commits
git commit -m "feat(analyzer): add keyword extraction algorithm"
git commit -m "fix(upload): handle large PDF files correctly"
git commit -m "docs: update installation instructions"
git commit -m "refactor(store): simplify state management logic"

# Detailed commit
git commit -m "feat(analyzer): add keyword extraction

- Implements TF-IDF algorithm for keyword scoring
- Adds support for multi-language extraction
- Improves accuracy by 15%

Closes #123"
```

### Best Practices
- Keep commits atomic (one logical change per commit)
- Write descriptive messages
- Reference related issues
- Use imperative mood ("Add feature" not "Added feature")

---

## Pull Request Process

### Before Submitting
1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Ensure code quality**
   ```bash
   npm run typecheck
   npm run build
   ```

3. **Test thoroughly**
   - Manual testing on multiple browsers
   - Verify no console errors
   - Test edge cases

### Creating a PR
1. **Clear title and description**
   ```markdown
   # Add keyword extraction to resume analyzer
   
   ## Description
   Implements TF-IDF based keyword extraction for improved resume analysis.
   
   ## Type of Change
   - [x] New feature
   - [ ] Bug fix
   - [ ] Breaking change
   
   ## Related Issues
   Closes #123
   
   ## How to Test
   1. Upload a sample resume
   2. Check that keywords are extracted correctly
   3. Verify scoring accuracy
   
   ## Checklist
   - [x] Code follows style guidelines
   - [x] TypeScript compiles without errors
   - [x] Tests added/updated
   - [x] Documentation updated
   - [x] No console warnings or errors
   ```

2. **Keep scope focused** – One feature per PR
3. **Provide context** – Explain the why, not just the what
4. **Link issues** – Use `Closes #issue-number`

### PR Review Process
- Be open to feedback and suggestions
- Respond to reviewer comments promptly
- Make requested changes in new commits
- Rebase and squash before merging

### Approval Requirements
- ✅ Passing CI/CD checks
- ✅ Code review approval
- ✅ Tests coverage maintained
- ✅ Documentation updated

---

## Testing Requirements

### What to Test
- ✅ New features work as expected
- ✅ Existing functionality still works
- ✅ Edge cases are handled
- ✅ Error states are managed
- ✅ Performance isn't degraded

### Manual Testing Checklist
```markdown
- [ ] Feature works on Chrome
- [ ] Feature works on Firefox
- [ ] Feature works on Safari
- [ ] Feature works on Mobile
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No lint warnings
- [ ] Loading states work
- [ ] Error handling works
- [ ] Accessibility is good
```

### Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest version

---

## Documentation

### Update Documentation For
- New features
- API changes
- Bug fixes (if they change expected behavior)
- Configuration updates
- Breaking changes

### Documentation Files
- `README.md` – Main documentation
- `docs/API.md` – API documentation
- `docs/COMPONENTS.md` – Component guide
- `docs/STATE.md` – State management guide
- Inline code comments – For complex logic

### Writing Guidelines
- Use clear, concise language
- Include examples where helpful
- Keep documentation current
- Use markdown formatting
- Add code syntax highlighting

---

## Common Scenarios

### Adding a New Component
```bash
# 1. Create the component
touch src/components/MyComponent.tsx

# 2. Create a story (if applicable)
touch src/components/MyComponent.stories.tsx

# 3. Update export barrel
# Edit: src/components/index.ts

# 4. Document the component
# Create/update: docs/COMPONENTS.md

# 5. Create a PR with all changes
```

### Fixing a Bug
```bash
# 1. Create a branch
git checkout -b fix/bug-description

# 2. Verify the bug
npm run dev
# (reproduce and confirm)

# 3. Implement fix
# (make changes)

# 4. Verify the fix
npm run typecheck
npm run build

# 5. Create a PR referencing the issue
```

### Updating Dependencies
```bash
# 1. Update packages
npm update

# 2. Verify compatibility
npm run typecheck
npm run build

# 3. Document changes
# Update: CHANGELOG.md

# 4. Create a PR
git commit -m "chore(deps): update dependencies"
```

---

## Helpful Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Git Best Practices](https://git-scm.com/book/en/v2)

---

## Questions?

- 📖 Check existing [issues](https://github.com/Srivatsav1298/Project-AI-Resume-Analyzer/issues)
- 💬 Start a [discussion](https://github.com/Srivatsav1298/Project-AI-Resume-Analyzer/discussions)
- 📧 Contact the maintainers

---

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

Thank you for making this project better! 🎉
