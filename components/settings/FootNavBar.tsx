// components/TabBar.js
import Link from 'next/link';

interface Item {
  title: string;
  href: string;
}

interface Props {
  items: Item[];
}

const FootNavBar = ({ items }: Props) => {
  return (
    <>
      <div className="fixed bottom-0 w-full flex justify-around bg-white border-t border-gray-200 p-4">
        {items.map((item) => (
          <Link href={item.href} key={item.title} className="text-center text-black hover:text-gray-500 text-sm">
            {item.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default FootNavBar;
