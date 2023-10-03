import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { FaPhotoVideo, FaSearch, FaTv } from 'react-icons/fa'

const All: React.FC<{ onChangeTypeSearch: Function; typeSearch: string }> = ({ onChangeTypeSearch, typeSearch }) => {
  const [active, setActive] = useState<string | undefined>('multi')
  const { t } = useTranslation()

  const handleSetTypeSearch = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, typeSearch: string) => {
    e.stopPropagation()
    setActive(typeSearch)
    onChangeTypeSearch(typeSearch)
  }

  useEffect(() => {
    setActive(typeSearch)
  }, [])
  return (
    <div className="All absolute left-0 top-[110%] z-20 min-w-[200px] cursor-pointer whitespace-pre bg-black1 text-white">
      <li
        className={clsx('group', { ['activeAll ']: active === 'multi' })}
        onClick={(e) => handleSetTypeSearch(e, 'multi')}
      >
        <FaSearch />
        <p>{t('common:All')}</p>
      </li>
      <li className={clsx('group', { ['activeAll ']: active === 'tv' })} onClick={(e) => handleSetTypeSearch(e, 'tv')}>
        <FaTv />
        <p>{t('common:TVEpisodes')}</p>
      </li>
      <li
        className={clsx('group', { ['activeAll ']: active === 'person' })}
        onClick={(e) => handleSetTypeSearch(e, 'person')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="ipc-icon ipc-icon--people searchCatSelector__itemIcon group-hover:opacity-100"
          id="iconContext-people"
          viewBox="0 0 24 24"
          fill="currentColor"
          role="presentation"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z"></path>
        </svg>
        <p>{t('common:Celebs')}</p>
      </li>
      <li
        className={clsx('group', { ['activeAll ']: active === 'company' })}
        onClick={(e) => handleSetTypeSearch(e, 'company')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="ipc-icon ipc-icon--business searchCatSelector__itemIcon group-hover:opacity-100"
          id="iconContext-business"
          viewBox="0 0 24 24"
          fill="currentColor"
          role="presentation"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M12 7V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-8zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm9 12h-7v-2h2v-2h-2v-2h2v-2h-2V9h7c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1zm-1-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path>
        </svg>
        <p>{t('common:Companies')}</p>
      </li>
      <li
        className={clsx('group', { ['activeAll ']: active === 'keyword' })}
        onClick={(e) => handleSetTypeSearch(e, 'keyword')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className="ipc-icon ipc-icon--label searchCatSelector__itemIcon group-hover:opacity-100"
          id="iconContext-label"
          viewBox="0 0 24 24"
          fill="currentColor"
          role="presentation"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84l3.96-5.58a.99.99 0 0 0 0-1.16l-3.96-5.58z"></path>
        </svg>
        <p>{t('common:Keywords')}</p>
      </li>
      <li
        className={clsx('group border-t-[1px] border-slate-300', { ['activeAll ']: active === 'movie' })}
        onClick={(e) => handleSetTypeSearch(e, 'movie')}
      >
        <FaPhotoVideo className="group-hover:opacity-100" />
        <p>{t('common:Movie')}</p>
      </li>
    </div>
  )
}

export default All
