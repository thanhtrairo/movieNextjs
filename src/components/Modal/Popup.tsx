import Image from 'next/image'
import React from 'react'
import { default as _ReactPlayer, ReactPlayerProps } from 'react-player'
const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>

export const Popup: React.FC<{
  onShow: Function
  videoId: string
  autoPlay?: boolean
}> = ({ onShow, videoId, autoPlay }) => {
  return (
    <>
      <div className="fixed top-[45%] left-1 z-50  w-[98%] translate-y-[-50%] bg-gray3 p-2 text-white sm:left-[50%] sm:w-[40%] sm:translate-x-[-50%] sm:p-6">
        <div className="text-right">
          <span
            onClick={() => onShow()}
            className=" inline-block cursor-pointer py-1 px-4 font-medium text-white hover:bg-white2"
          >
            X
          </span>
        </div>
        <div className="w-[100%]">
          {videoId ? (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls={true}
              playing={autoPlay}
              width="100%"
            />
          ) : (
            <Image src="/img/errorVideo.webp" width={630} height={410} />
          )}
        </div>
      </div>
    </>
  )
}
