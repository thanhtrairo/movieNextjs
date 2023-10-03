import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function Language({ onSetLanguage }: { onSetLanguage: Function }) {
  const router = useRouter()
  const [active, setActive] = useState<string | undefined>('EN')
  const handleLanguage = (language: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setActive(language)
    onSetLanguage(language)
    router.locale = language.toLocaleLowerCase()
    if (active === language) return
    // router.push(`/${language.toLocaleLowerCase()}${router.asPath}`)
    window.location.href = `${window.location.origin}/${language.toLocaleLowerCase()}${router.asPath}`
  }
  useEffect(() => {
    setActive(router.locale?.toLocaleUpperCase())
  }, [])

  return (
    <div className="absolute left-0 top-[110%] z-20 bg-black1">
      <div className="flex cursor-pointer p-1 hover:bg-gray2 sm:p-3" onClick={(e) => handleLanguage('EN', e)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            'ipc-icon ipc-icon--radio-button-checked language-menu-item-icon selected-language-icon  h-[16px] w-[16px] sm:h-[24px] sm:w-[24px]',
            { ['activeAll']: active === 'EN' }
          )}
          id="iconContext-radio-button-checked"
          viewBox="0 0 24 24"
          fill="currentColor"
          role="presentation"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
          <circle cx="12" cy="12" r="5"></circle>
        </svg>
        <p className="ml-1 sm:ml-3">English</p>
      </div>
      <div className="flex cursor-pointer p-1 hover:bg-gray2 sm:p-3 " onClick={(e) => handleLanguage('VI', e)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            'ipc-icon ipc-icon--radio-button-checked language-menu-item-icon selected-language-icon  h-[16px] w-[16px] sm:h-[24px] sm:w-[24px]',
            { ['activeAll']: active === 'VI' }
          )}
          id="iconContext-radio-button-checked"
          viewBox="0 0 24 24"
          fill="currentColor"
          role="presentation"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
          <circle cx="12" cy="12" r="5"></circle>
        </svg>
        <p className=" ml-1 sm:ml-3 ">Vietnamese</p>
      </div>
    </div>
  )
}
