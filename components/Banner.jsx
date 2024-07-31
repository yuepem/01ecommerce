'use client';

import Link from "next/link";


const Banner = () => {
  return (
    <div className="bg-slate-400 text-white py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-8xl h-60 mx-auto flex flex-col justify-around md:flex-row items-center ">
        <div className="mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-2">Summer Sale</h2>
          <p className="mb-4">Up to 50% off on selected items</p>
          <Link href='/promotion'>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-md font-semibold">Shop Now</button>
          </Link>
        </div>
        <img src="" alt="Summer Sale" className="rounded-md" />
      </div>
    </div>
  );
};

export default Banner;