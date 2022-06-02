import Image from 'next/image'
import React from 'react'
import { KeyType } from '../../type/type'

export const Keyword: React.FC<{ keyword: KeyType; onSearch: Function }> = ({ keyword, onSearch }) => {
  return (
    <div className="group mx-2 my-6 hover:cursor-pointer" onClick={() => onSearch()}>
      <div className="flex gap-4">
        <div className=" relative basis-2/12 ">
          <div className="absolute top-0 left-0 hidden h-full w-full bg-blackOver group-hover:block"></div>
          <Image
            src="https://lamvt.vn/wp-content/uploads/2017/11/Identify-Keywords.jpg"
            alt="logo"
            width={100}
            height={60}
          />
        </div>
        <div className="flex basis-10/12 flex-col space-y-1 group-hover:opacity-70">
          <p className="">{keyword.name}</p>
        </div>
      </div>
    </div>
  )
}
