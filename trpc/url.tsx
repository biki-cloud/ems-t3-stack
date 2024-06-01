export function getBaseUrl() {
    //process.env.VERCEL_URLがセットされている場合は、そのURLを返す
    if (process.env.VERCEL_BRANCH_URL) return `https://${process.env.VERCEL_BRANCH_URL}`;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    //それ以外の場合は、ローカルのURLを返す
    return `${process.env.NEXT_PUBLIC_APP_URL}`;
  }