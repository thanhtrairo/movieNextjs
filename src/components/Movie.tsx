import Link from 'next/link'
import React from 'react'
import { FaListUl } from 'react-icons/fa'
import apiConfig from '../../pages/api/apiConfig'
import { BuyMovie } from './BuyMovie'
import { Play } from './Play'
import LazyLoad from 'react-lazyload'
import Image from 'next/image'

export const Movie: React.FC<{
  children: React.ReactNode
  title: string
  list?: boolean
  name?: boolean
  price?: boolean
  srcImage?: string
}> = ({ children, title, list, name, price, srcImage }) => {
  return (
    <div className="mx-4 hover:cursor-pointer">
      <div className="group relative mb-3">
        <div className="absolute top-0 left-0 z-20 hidden h-full w-full bg-blackOver group-hover:block" />
        <LazyLoad once={true} placeholder={<div className="h-[200px] w-[200px] bg-gray"></div>}>
          <Image
            src={apiConfig.originalImage(srcImage)}
            alt=""
            priority
            width="200px"
            height="200px"
            layout="responsive"
          />
        </LazyLoad>
        <div className="absolute bottom-0 left-[2%] flex flex-row items-center space-x-2">
          {list ? <FaListUl className="group-hover:text-yellow-400" /> : <Play width="32" height="32" />}

          <p>{title}</p>
        </div>
      </div>
      {name ? (
        <Link href="/" passHref>
          <a className="hover:underline">{children}</a>
        </Link>
      ) : price ? (
        <BuyMovie num={false} price />
      ) : (
        <BuyMovie num={false} price={false} />
      )}
    </div>
  )
}
