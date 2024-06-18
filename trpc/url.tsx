export function getBaseUrl() {
  // console.log('process.env.NEXT_PUBLIC_VERCEL_ENV', process.env.NEXT_PUBLIC_VERCEL_ENV)
  // console.log('process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL', process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL)
  // console.log('process.env.NEXT_PUBLIC_VERCEL_URL', process.env.NEXT_PUBLIC_VERCEL_URL)
  // console.log('process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL', process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL)
  let url = '';
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    url = `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
  } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    // 独自ドメイン
    url = 'https://www.sunnybe.online';
    // Vercelのデフォルトドメイン
    // url = `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
  } else {
    // ローカルの場合は、ローカルのURLを返す
    url = `${process.env.NEXT_PUBLIC_APP_URL}`;
  }
  // console.log('selected url: ' + url)
  return url;
}