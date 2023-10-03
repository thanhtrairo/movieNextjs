import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaRegWindowClose } from 'react-icons/fa'
import { AccountType } from '~/type/type'
// import Language from './Language'

export const Sidebar: React.FC<{ onShow: Function }> = ({ onShow }) => {
  const [account, setAccount] = useState<AccountType>({ success: false, session_id: '', accountId: '', username: '' })
  useEffect(() => {
    const requestToken = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account') || '') : ''
    setAccount(requestToken)
  }, [])
  const { t } = useTranslation()
  return (
    <div className="sidebar absolute left-0 top-full z-20 bg-black1 py-4">
      <div className="relative">
        <FaRegWindowClose onClick={() => onShow()} className="absolute right-0 top-[-20%] text-20 hover:text-red-600" />
        <Link href="/">
          <li>{t('header:Home')}</li>
        </Link>
        {account.session_id ? (
          <li className="group relative mr-1">
            {t('header:HiYou')}
            <div className="absolute right-0 top-0 z-20 hidden group-hover:block">
              <div className="absolute left-0 top-[110%] bg-black1 ">
                <Link href="/profile">
                  <div className="px-6 py-2 hover:bg-gray2">{t('header:MyProfile')}</div>
                </Link>
                <div className="px-6 py-2 hover:bg-gray2" onClick={() => localStorage.removeItem('account')}>
                  {t('header:Logout')}
                </div>
              </div>
            </div>
          </li>
        ) : (
          <Link href="/login">
            <li>{t('header:SignIn')}</li>
          </Link>
        )}

        {/* <li className="group relative">
          EN
          <div className="absolute top-0 right-0 hidden group-hover:block">
            <Language />
          </div>
        </li> */}
      </div>
    </div>
  )
}
