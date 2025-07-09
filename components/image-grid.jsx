'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SmartLink from './SmartLink';

const imageSets = [
  [
    { src: '/banner/amazon.svg', link: '/company/Amazon', name: 'Amazon' },
    { src: '/banner/atlassian.svg', link: '/company/Atlassian', name: 'Atlassian' },
  ],
  [
    { src: '/banner/google.webp', link: '/company/Google', name: 'Google' },
    { src: '/banner/ibm.svg', link: '/company/IBM', name: 'IBM' },
  ],
  [
    { src: '/banner/meta.svg', link: '/company/Meta', name: 'Meta' },
    { src: '/banner/netflix.png', link: '/company/Netflix', name: 'Netflix' },
  ],
  [
    { src: '/banner/microsoft.webp', link: '/company/Microsoft', name: 'Microsoft' },
    { src: '/banner/uber.svg', link: '/company/Uber', name: 'Uber' },
  ],
];

export default function ImageGrid() {
  const [activeIndexes, setActiveIndexes] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndexes((prev) =>
        prev.map((index, i) => (index + 1) % imageSets[i].length)
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-6 py-10">
      {imageSets.map((set, idx) => {
        const current = set[activeIndexes[idx]];
        return (
          <SmartLink
            key={idx}
            href={current.link}
            className="flex flex-col items-center justify-center bg-zinc-800/60 backdrop-blur-md rounded-xl shadow-md p-4 hover:scale-105 transition-transform"
          >
            <div className="relative w-24 h-20 sm:w-28 sm:h-24">
              <Image
                src={current.src}
                alt={current.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="mt-3 text-sm sm:text-base font-medium text-white">
              {current.name}
            </p>
          </SmartLink>
        );
      })}
    </div>
  );
}
