import Image from 'next/image'
import React from 'react'
import { CompanyType } from '~/type/type'

export const Company: React.FC<{ company: CompanyType; onSearch: Function }> = ({ company, onSearch }) => {
  return (
    <div className="group mx-2 my-6 hover:cursor-pointer" onClick={() => onSearch()}>
      <div className="flex gap-4">
        <div className=" relative basis-2/12 ">
          <div className="absolute top-0 left-0 hidden h-full w-full bg-blackOver group-hover:block"></div>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBLmgis87QFQ8MJ_qHIZqKeiUqYo6AJAMF3A&usqp=CAU"
            alt="logo"
            width={100}
            height={60}
          />
        </div>
        <div className="flex basis-10/12 flex-col space-y-1 group-hover:opacity-70">
          <p className="">{company.name}</p>
        </div>
      </div>
    </div>
  )
}
