// components/TabBar.js
import Link from 'next/link';

interface Item {
  title: string;
  href: string;
  icon: JSX.Element;
  isSP: boolean;
}

interface Props {
  items: Item[];
}

const FootNavBar = ({ items }: Props) => {
  return (
    <div
      className={`fixed bottom-0 w-full flex justify-around bg-white border-t border-gray-200 p-4 transition-transform duration-300`}
    >
      {items.map((item) => (
        item.isSP && (
          <Link href={item.href} key={item.title} className="text-center text-black hover:text-gray-500 text-sm">
            {item.icon}
            <span className="ml-1">
              {item.title}
            </span>
          </Link>
        )
      ))}
    </div>
  );
};

export default FootNavBar;
