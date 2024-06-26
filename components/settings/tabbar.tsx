// components/TabBar.js
import Link from 'next/link';

const TabBar = () => {
  return (
    <div className="fixed bottom-0 w-full flex justify-around bg-white border-t border-gray-200 p-4">
      <Link href="/" className="text-center text-black hover:text-gray-500">ホーム</Link>
      <Link href="/shorts" className="text-center text-black hover:text-gray-500">ショート</Link>
      <Link href="/add" className="text-center text-black hover:text-gray-500">追加</Link>
      <Link href="/mypage" className="text-center text-black hover:text-gray-500">マイページ</Link>
    </div>
  );
};

export default TabBar;
