# event-matching-service

![Vercel](https://vercelbadge.vercel.app/api/biki-cloud/ems-t3-stack)

## Local Development

### Prepare development

#### Setting Environment variable
```bash
$ npm run apply-local-env
```
https://vercel.com/docs/cli

#### Setting DB
```bash
# start supabase locally
$ supabase start

# db init and insert
$ npm run db-local
```
https://supabase.com/docs/guides/cli/local-development

### Run

```bash
# local run
$ npm run dev
```

see http://localhost:3000

### Test

```bash
# execute test
$ npx playwright test --reporter=allure-playwright

# check test result with allure
$ allure generate allure-results -o allure-report --clean && allure open allure-report
```

## Technical Stack

### Architecture

<a href="https://create.t3.gg/" target="_blank">T3 Stack</a>

### Frontend & Backend Language

<a href="https://nextjs.org/" target="_blank"><img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"></a>
<a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"></a>

### Design

<a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /></a>
<a href="https://ui.shadcn.com/" target="_blank"><img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"></a>

### Deployment

<a href="https://vercel.com/" target="_blank"><img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"></a>

### DB

<a href="https://supabase.com/" target="_blank"><img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white"></a>

### File Cloud Storage

<a href="https://cloudinary.com/" target="_blank"><img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white"></a>

### CI/CD

<a href="https://docs.github.com/ja/actions" target="_blank"><img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"></a>

### E2E

<a href="https://playwright.dev/" target="_blank"><img src="https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white"></a>
