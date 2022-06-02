import React from 'react'
import { FaSpinner } from 'react-icons/fa'

export const Loading = ({
  children,
  width,
  height,
}: {
  children?: React.ReactNode
  width?: number
  height?: number
}) => {
  return (
    <div
      style={{ width: width, height: height }}
      className="flex items-center justify-center space-x-2 py-[16%] text-center text-green-400"
    >
      <FaSpinner className="animate-spin text-32 " />
      <p className="text-24">{children}</p>
    </div>
  )
}
