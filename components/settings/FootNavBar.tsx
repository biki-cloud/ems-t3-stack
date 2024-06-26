// components/TabBar.js
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Item {
  title: string;
  href: string;
}

interface Props {
  items: Item[];
}

const FootNavBar = ({ items }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = 0;

  const handleScroll = () => {
    if (window.scrollY < lastScrollY) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    lastScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed bottom-0 w-full flex justify-around bg-white border-t border-gray-200 p-4 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      {items.map((item) => (
        <Link href={item.href} key={item.title} className="text-center text-black hover:text-gray-500 text-sm">
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default FootNavBar;

