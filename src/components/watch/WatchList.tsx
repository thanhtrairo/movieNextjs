import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AccountType, MovieType } from '~/type/type'
import { SvgAdd } from '../SvgAdd'
import { TitleCategories } from '../title/TitleCategories'
import { WatchListComponent } from './WatchListComponent'

export const WatchList = ({ watchList, ratingList }: { watchList: MovieType[]; ratingList: MovieType[] }) => {
  const [account, setAccount] = useState<AccountType>({ success: false, session_id: '', accountId: '', username: '' })
  useEffect(() => {
    const account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account') || '') : ''
    setAccount(account)
  }, [])
  const { t } = useTranslation()
  return (
    <>
      {account.accountId ? (
        watchList?.length > 6 ? (
          <WatchListComponent
            movieList={watchList}
            titleCategories={t('header:FromYourWatchList')}
            watchList={watchList}
            ratingList={ratingList}
            slider
          />
        ) : (
          <WatchListComponent
            movieList={watchList}
            titleCategories={t('header:FromYourWatchList')}
            watchList={watchList}
            ratingList={ratingList}
          />
        )
      ) : (
        <div className="mb-10">
          <TitleCategories title="">{t('header:FromYourWatchList')}</TitleCategories>
          <div className=" p-6 text-center">
            <div className="flex flex-row justify-center">
              <SvgAdd width="30" height="36" />
            </div>
            <div className="my-6">
              <p className="font-medium">{t('header:SignInYourWatchList')}</p>
              <p>{t('header:SaveshowsAndWatch')}</p>
            </div>
            <div>
              <Link href="/login">
                <button className="rounded-md bg-yellow-400 px-6 py-1 font-medium text-black hover:bg-yellow-500">
                  {t('header:SignInToIMDb')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
