import clsx from 'clsx'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

export const SvgAdd: React.FC<{ width: string; height: string; addWatchList?: boolean }> = ({
  width,
  height,
  addWatchList,
}) => {
  return (
    <div className="group relative">
      <svg
        className={clsx('ipc-watchlist-ribbon__bg fill-zinc-400 group-hover:fill-zinc-500', {
          ['addSuccess']: addWatchList,
        })}
        width={width}
        height={height}
        viewBox="0 0 24 34"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <polygon
          className="ipc-watchlist-ribbon__bg-ribbon"
          fill="#000000"
          points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
        ></polygon>
        <polygon
          className="ipc-watchlist-ribbon__bg-hover"
          points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
        ></polygon>
        <polygon
          className="ipc-watchlist-ribbon__bg-shadow"
          points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"
        ></polygon>
      </svg>
      {addWatchList ? (
        <FaCheck className="absolute left-[26%] top-[16%] text-14 text-black" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          className="ipc-icon ipc-icon--add ipc-icon--inline absolute left-[16%] top-[16%]"
          viewBox="0 0 24 24"
          fill="currentColor"
          role="presentation"
        >
          <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"></path>
        </svg>
      )}
    </div>
  )
}
