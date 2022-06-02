import Link from 'next/link'
import React from 'react'
import { SvgAdd } from './SvgAdd'

export const BuyMovie: React.FC<{ num: boolean; price: boolean }> = ({ num, price }) => {
  return (
    <div className="group flex flex-row items-center space-x-2">
      {num && <p className="border-r-[1px] border-yellow-400 pr-2">1</p>}
      <SvgAdd width="32" height="42" />
      <div className="">
        {price ? (
          <div className="hover:opacity-70">
            <p>Doctor Strange in the Multiverse of Madness</p>
            <p className="text-12 group-hover:opacity-70">$187M</p>
          </div>
        ) : (
          <div>
            <p className="text-12 group-hover:opacity-70">May 27</p>
            <p>
              <Link href="/" passHref>
                <a className="hover:underline">Top Gun: Maverick</a>
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
