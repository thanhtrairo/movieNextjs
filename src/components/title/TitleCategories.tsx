import clsx from 'clsx'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa'

export const TitleCategories: React.FC<{
  children?: React.ReactNode
  title?: string
  textColor?: boolean
}> = ({ children, title, textColor }) => {
  return (
    <div className="cursor-pointer">
      <h3
        className={clsx(
          "group relative flex flex-row items-center space-x-2 text-24 font-medium text-white after:absolute after:ml-[-0.75rem] after:h-3/4 after:w-1 after:bg-yellow-400 after:content-['']",
          { textBlack: textColor }
        )}
      >
        <p>{children}</p>
        <FaAngleRight className="group-hover:text-yellow-400" />
      </h3>
      <p className="mt-1 opacity-70">{title}</p>
    </div>
  )
}
