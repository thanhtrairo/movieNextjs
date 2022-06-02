import Image from 'next/image'
import React from 'react'
import { FaWindowClose } from 'react-icons/fa'

export default function Menu() {
  return (
    <div className="absolute top-0 left-0 z-[60] h-full w-full bg-gray py-8">
      <div className="mx-auto w-[50%]">
        <div className="flex justify-between">
          <Image src="/img/logo2.svg" alt="logo2" className="w-auto" width={80} height={40} />
          <FaWindowClose className="text-48 hover:opacity-80" />
        </div>
        <div className="my-6">
          <div className="flex flex-row">
            <div className="basis-1/3">
              <div className="">
                <div className="mb-6 flex flex-row gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="ipc-icon ipc-icon--movie basis-1/12 fill-yellow-400"
                    id="iconContext-movie"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path>
                  </svg>
                  <div className="basis-11/12">
                    <h2 className="text-24 font-medium">Movies</h2>
                    <div className="abc leading-8">
                      <li>Release Calendar</li>
                      <li>DVD & Blu-ray Releases</li>
                      <li>Top 250 Movies</li>
                      <li>Most Popular Movies</li>
                      <li>Browse Movies by Genre</li>
                      <li>Top Box Office</li>
                      <li>ShowTimes & Tickets</li>
                      <li>In Theaters</li>
                      <li>Coming Soon</li>
                      <li>Movie News</li>
                      <li>India Movie Spotlight</li>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-6 flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      className="ipc-icon ipc-icon--people basis-1/12 fill-yellow-400"
                      id="iconContext-people"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      role="presentation"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"></path>
                    </svg>
                    <div className="basis-11/12">
                      <h2 className="text-24 font-medium">Celebs</h2>
                      <div className="leading-8">
                        <li>Born Today</li>
                        <li>Most Popular Celebs</li>
                        <li>Celebrity News</li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/3">
              <div className="">
                <div className="mb-6 flex flex-row gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="ipc-icon ipc-icon--television basis-1/12 fill-yellow-400"
                    id="iconContext-television"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"></path>
                  </svg>
                  <div className="basis-11/12">
                    <h2 className="text-24 font-medium">TV Shows</h2>
                    <div className="leading-8">
                      <li>What's on TV & Streaming</li>
                      <li>Top 250 TV Shows</li>
                      <li>Most Popular TV Shows</li>
                      <li>Browse TV Shows by Genre</li>
                      <li>TV News</li>
                      <li>India TV Spotlight</li>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-6 flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      className="ipc-icon ipc-icon--video-library basis-1/12 fill-yellow-400"
                      id="iconContext-video-library"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      role="presentation"
                    >
                      <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
                    </svg>
                    <div className="basis-11/12">
                      <h2 className="text-24 font-medium">Watch</h2>
                      <div className="leading-8">
                        <li>What to Watch</li>
                        <li>Latest Trailers</li>
                        <li>IMDb Originals</li>
                        <li>IMDb Picks</li>
                        <li>IMDb Podcasts</li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-1/3">
              <div>
                <div className="mb-6 flex flex-row gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="ipc-icon ipc-icon--star-circle-filled basis-1/12 fill-yellow-400"
                    id="iconContext-star-circle-filled"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    role="presentation"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.23 15.39L12 15.45l-3.22 1.94a.502.502 0 0 1-.75-.54l.85-3.66-2.83-2.45a.505.505 0 0 1 .29-.88l3.74-.32 1.46-3.45c.17-.41.75-.41.92 0l1.46 3.44 3.74.32a.5.5 0 0 1 .28.88l-2.83 2.45.85 3.67c.1.43-.36.77-.74.54z"></path>
                  </svg>
                  <div className="basis-11/12">
                    <h2 className="text-24 font-medium">Awards & Events</h2>
                    <div className="leading-8">
                      <li>Oscars</li>
                      <li>Best Picture Winners</li>
                      <li>Emmys</li>
                      <li>APA Heritage Month</li>
                      <li>STARmeter Awards</li>
                      <li>San Diego Comic-Con</li>
                      <li>New York Comic-Con</li>
                      <li>Sundance Film Festival</li>
                      <li>Toronto Int'l Film Festival</li>
                      <li>Awards Central</li>
                      <li>Festival Central</li>
                      <li>All Events</li>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-6 flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      className="ipc-icon ipc-icon--earth basis-1/12 fill-yellow-400"
                      id="iconContext-earth"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      role="presentation"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
                    </svg>
                    <div className="basis-11/12">
                      <h2 className="text-24 font-medium">Community</h2>
                      <div className="leading-8">
                        <li>Help Center</li>
                        <li>Contributor Zone</li>
                        <li>Polls</li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
