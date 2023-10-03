import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { FaAngleDown, FaBars, FaCaretDown, FaSearch } from 'react-icons/fa'
import MovieServices from '~/services/MovieServices'
import { AccountType, CompanyType, KeyType, MovieType, PersonType } from '../../type/type'
import useDebounce from '../debounce/debounce'

import { MovieSearch } from '../MoveToExplore/MovieSearch'
import All from './All'
import { Company } from './Company'
import { Keyword } from './Keyword'
import Language from './Language'
import Menu from './Menu'
import { Person } from './Person'
import { Sidebar } from './Sidebar'
import { useTranslation } from 'next-i18next'

const Header = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showAll, setShowAll] = useState<boolean>(false)
  const [showEN, setShowEN] = useState<boolean>(false)
  const [showProfile, setShowProfile] = useState<boolean>(false)
  const [language, setLanguage] = useState<string | undefined>('EN')

  const [search, setSearch] = useState<string>('')
  const [dataSearch, setDataSearch] = useState<any>()
  const [typeSearch, setTypeSearch] = useState<string>('multi')
  const [account, setAccount] = useState<AccountType>({ success: false, session_id: '', accountId: '', username: '' })

  const searchType = useMemo(() => {
    if (typeSearch === 'multi') return 'All'
    if (typeSearch === 'tv') return 'TVEpisodes'
    if (typeSearch === 'person') return 'Celebs'
    if (typeSearch === 'keyword') return 'Keywords'
    if (typeSearch === 'company') return 'Companies'
    if (typeSearch === 'movie') return 'Movie'
  }, [typeSearch])

  const router = useRouter()
  const debounceValue = useDebounce(search, 500)

  useEffect(() => {
    const getDataBySearch = async () => {
      if (search) {
        try {
          const res = await MovieServices.getSearch(debounceValue, typeSearch)
          setDataSearch(res.data.results)
        } catch (error) {
          console.log(error)
        }
      }
    }
    getDataBySearch()
  }, [debounceValue])

  useEffect(() => {
    const requestToken = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account') || '') : ''
    setAccount(requestToken)
  }, [])

  useEffect(() => {
    setLanguage(router.locale?.toLocaleUpperCase())
  }, [])

  const handleShow = (isSearch?: boolean) => {
    setShowMenu(false)
    setShowAll(false)
    setShowProfile(false)
    setShowEN(false)
    if (!isSearch) setSearch('')
  }

  const handleLogout = () => {
    localStorage.removeItem('account')
    location.reload()
  }

  const { t } = useTranslation()

  return (
    <>
      {(showMenu || showAll || showEN || showProfile || search) && (
        <div className="fixed left-0 top-0 z-20 h-screen w-full" onClick={() => handleShow()}></div>
      )}
      <div className=" border-[1px] border-black1 bg-black1 text-14 text-white">
        <div className="mx-auto flex flex-row  items-center sm:container sm:space-x-2">
          <div className="flexItemCenter hidden cursor-pointer sm:block">
            <div onClick={() => router.push('/')}>
              <Image src="/img/logo.svg" alt="VerCel Logo" width={70} height={36} />
            </div>
          </div>
          <div className="sm:flexItemCenter hidden  cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
            <FaBars className="mr-1 fill-white" />
            <p className="whitespace-nowrap">{t('header:Menu')}</p>
            {showMenu && <Menu />}
          </div>
          <div className="flexItemCenter relative cursor-pointer sm:hidden" onClick={() => setShowMenu(!showMenu)}>
            <FaBars className="mr-1 fill-white" />
            <p className="whitespace-nowrap">{t('header:Menu')}</p>
            {showMenu && <Sidebar onShow={() => setShowMenu(!showMenu)} />}
          </div>
          <div className="w-[80%] sm:w-[55%]">
            <form className="relative z-50 ml-2 flex w-full items-center rounded-md bg-white">
              {search && dataSearch && (
                <div className="absolute left-0 top-[100%] min-w-full bg-black1 py-4">
                  {dataSearch.length === 0 && (
                    <div className="min-w-full py-16 text-center text-red-600">Not results found</div>
                  )}
                  <div className="mx-2 mb-4">
                    {typeSearch === 'person'
                      ? dataSearch?.slice(0, 3).map((person: PersonType) => (
                          <div key={person.id}>
                            <Person person={person} onSearch={() => setSearch('')} />
                          </div>
                        ))
                      : typeSearch === 'keyword'
                      ? dataSearch?.slice(0, 3).map((keyword: KeyType) => (
                          <div key={keyword.id}>
                            <Keyword keyword={keyword} onSearch={() => setSearch('')} />
                          </div>
                        ))
                      : typeSearch === 'company'
                      ? dataSearch?.slice(0, 3).map((company: CompanyType) => (
                          <div key={company.id}>
                            <Company company={company} onSearch={() => setSearch('')} />
                          </div>
                        ))
                      : dataSearch?.slice(0, 3).map((movie: MovieType) => (
                          <div key={movie.id}>
                            <MovieSearch movie={movie} onSearch={() => setSearch('')} />
                          </div>
                        ))}
                  </div>
                </div>
              )}
              <div
                className="relative flex items-center rounded-l-md  border-r-[1px] p-2 text-black hover:bg-white1"
                onClick={() => setShowAll(!showAll)}
              >
                <p className="mr-1 cursor-pointer whitespace-nowrap font-medium">{t(`header:${searchType}`)}</p>
                <FaCaretDown />
                {showAll && (
                  <All onChangeTypeSearch={(typeSearch: string) => setTypeSearch(typeSearch)} typeSearch={typeSearch} />
                )}
              </div>
              <div className="flex w-full items-center" onClick={() => handleShow(true)}>
                <input
                  type="text"
                  placeholder={t(`header:${searchType}`)}
                  className="w-full px-2 text-black focus:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="absolute right-[2%] top-0 flex h-full items-center text-slate-600">
                  <FaSearch />
                </div>
              </div>
            </form>
          </div>

          <div className="flexItemCenter hidden sm:block">
            <svg
              className="ipc-logo navbar__imdbpro-menu-toggle__name fill-white"
              width="52"
              height="14"
              viewBox="0 0 52 14"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
            >
              <g fill="currentColor">
                <rect x="0" y="1" width="3.21" height="12.34"></rect>
                <path d="M10,1 L9.3,6.76 L8.84,3.63 C8.7,2.62 8.58,1.75 8.45,1 L4.3,1 L4.3,13.34 L7.11,13.34 L7.11,5.19 L8.3,13.34 L10.3,13.34 L11.42,5 L11.42,13.33 L14.22,13.33 L14.22,1 L10,1 Z"></path>
                <path d="M19.24,3.22 C19.3711159,3.29185219 19.4602235,3.42180078 19.48,3.57 C19.5340993,3.92393477 19.554191,4.28223587 19.54,4.64 L19.54,9.42 C19.578852,9.92887392 19.5246327,10.4405682 19.38,10.93 C19.27,11.12 18.99,11.21 18.53,11.21 L18.53,3.11 C18.7718735,3.09406934 19.0142863,3.13162626 19.24,3.22 Z M19.24,13.34 C19.8163127,13.3574057 20.3928505,13.3138302 20.96,13.21 C21.3245396,13.1481159 21.6680909,12.9969533 21.96,12.77 C22.2288287,12.5438006 22.4209712,12.2398661 22.51,11.9 C22.643288,11.1679419 22.6969338,10.4236056 22.67,9.68 L22.67,5.34 C22.6662002,4.55669241 22.6060449,3.77467335 22.49,3 C22.43037,2.59841431 22.260779,2.22116094 22,1.91 C21.6636187,1.56093667 21.2326608,1.317654 20.76,1.21 C19.7709421,1.02848785 18.7647002,0.958050915 17.76,1 L15.32,1 L15.32,13.34 L19.24,13.34 Z"></path>
                <path d="M27.86,10.34 C27.8769902,10.7218086 27.8501483,11.1043064 27.78,11.48 C27.72,11.63 27.46,11.71 27.26,11.71 C27.0954951,11.7299271 26.9386363,11.6349863 26.88,11.48 C26.7930212,11.1542289 26.7592527,10.8165437 26.78,10.48 L26.78,7.18 C26.7626076,6.84408875 26.7929089,6.50740774 26.87,6.18 C26.9317534,6.03447231 27.0833938,5.94840616 27.24,5.97 C27.43,5.97 27.7,6.05 27.76,6.21 C27.8468064,6.53580251 27.8805721,6.87345964 27.86,7.21 L27.86,10.34 Z M23.7,1 L23.7,13.34 L26.58,13.34 L26.78,12.55 C27.0112432,12.8467609 27.3048209,13.0891332 27.64,13.26 C28.0022345,13.4198442 28.394069,13.5016184 28.79,13.5 C29.2588971,13.515288 29.7196211,13.3746089 30.1,13.1 C30.4399329,12.8800058 30.6913549,12.5471372 30.81,12.16 C30.9423503,11.6167622 31.0061799,11.0590937 31,10.5 L31,7 C31.0087531,6.51279482 30.9920637,6.02546488 30.95,5.54 C30.904474,5.28996521 30.801805,5.05382649 30.65,4.85 C30.4742549,4.59691259 30.2270668,4.40194735 29.94,4.29 C29.5869438,4.15031408 29.2096076,4.08232558 28.83,4.09 C28.4361722,4.08961884 28.0458787,4.16428368 27.68,4.31 C27.3513666,4.46911893 27.0587137,4.693713 26.82,4.97 L26.82,1 L23.7,1 Z"></path>
              </g>
              <g fill="#33C5F3">
                <path d="M32.13,1 L35.32,1 C35.9925574,0.978531332 36.6650118,1.04577677 37.32,1.2 C37.717112,1.29759578 38.0801182,1.50157071 38.37,1.79 C38.6060895,2.05302496 38.7682605,2.37391646 38.84,2.72 C38.935586,3.27463823 38.9757837,3.8374068 38.96,4.4 L38.96,5.46 C38.9916226,6.03689533 38.9100917,6.61440551 38.72,7.16 C38.5402933,7.53432344 38.2260614,7.82713037 37.84,7.98 C37.3049997,8.18709035 36.7332458,8.28238268 36.16,8.26 L35.31,8.26 L35.31,13.16 L32.13,13.16 L32.13,1 Z M35.29,3.08 L35.29,6.18 L35.53,6.18 C35.7515781,6.20532753 35.9725786,6.12797738 36.13,5.97 C36.2717869,5.69610033 36.3308522,5.38687568 36.3,5.08 L36.3,4.08 C36.3390022,3.79579475 36.2713114,3.5072181 36.11,3.27 C35.8671804,3.11299554 35.5771259,3.04578777 35.29,3.08 Z"></path>
                <path d="M42,4.36 L41.89,5.52 C42.28,4.69 43.67,4.42 44.41,4.37 L43.6,7.3 C43.2290559,7.27725357 42.8582004,7.34593052 42.52,7.5 C42.3057075,7.61238438 42.1519927,7.81367763 42.1,8.05 C42.0178205,8.59259006 41.9843538,9.14144496 42,9.69 L42,13.16 L39.34,13.16 L39.34,4.36 L42,4.36 Z"></path>
                <path d="M51.63,9.71 C51.6472876,10.3265292 51.6003682,10.9431837 51.49,11.55 C51.376862,11.9620426 51.1639158,12.3398504 50.87,12.65 C50.5352227,13.001529 50.1148049,13.2599826 49.65,13.4 C49.0994264,13.5686585 48.5257464,13.6496486 47.95,13.64 C47.3333389,13.6524659 46.7178074,13.5818311 46.12,13.43 C45.6996896,13.322764 45.3140099,13.1092627 45,12.81 C44.7275808,12.5275876 44.5254637,12.1850161 44.41,11.81 C44.2627681,11.2181509 44.1921903,10.6098373 44.2,10 L44.2,7.64 C44.1691064,6.9584837 44.2780071,6.27785447 44.52,5.64 C44.7547114,5.12751365 45.1616363,4.71351186 45.67,4.47 C46.3337168,4.13941646 47.0688388,3.97796445 47.81,4 C48.4454888,3.98667568 49.0783958,4.08482705 49.68,4.29 C50.1352004,4.42444561 50.5506052,4.66819552 50.89,5 C51.1535526,5.26601188 51.3550281,5.58700663 51.48,5.94 C51.6001358,6.42708696 51.6506379,6.92874119 51.63,7.43 L51.63,9.71 Z M48.39,6.73 C48.412199,6.42705368 48.3817488,6.12255154 48.3,5.83 C48.2091142,5.71223121 48.0687606,5.64325757 47.92,5.64325757 C47.7712394,5.64325757 47.6308858,5.71223121 47.54,5.83 C47.447616,6.12046452 47.4136298,6.42634058 47.44,6.73 L47.44,10.93 C47.4168299,11.2204468 47.4508034,11.5126191 47.54,11.79 C47.609766,11.9270995 47.7570827,12.0067302 47.91,11.99 C48.0639216,12.0108082 48.2159732,11.9406305 48.3,11.81 C48.3790864,11.5546009 48.4096133,11.2866434 48.39,11.02 L48.39,6.73 Z"></path>
              </g>
            </svg>
          </div>
          <div className="sm:flexItemCenter hidden cursor-pointer">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              className="ipc-icon ipc-icon--watchlist ipc-button__icon ipc-button__icon--pre fill-slate-700"
              id="iconContext-watchlist"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
            >
              <path
                d="M17 3c1.05 0 1.918.82 1.994 1.851L19 5v16l-7-3-7 3V5c0-1.05.82-1.918 1.851-1.994L7 3h10zm-4 4h-2v3H8v2h3v3h2v-3h3v-2h-3V7z"
                fill="currentColor"
              ></path>
            </svg>
            <p className="ml-2 cursor-pointer whitespace-nowrap">{t(`header:WatchList`)}</p>
          </div>
          <div className="hidden sm:block">
            {account.session_id ? (
              <div className="relative">
                <p
                  className="flexItemCenter cursor-pointer whitespace-nowrap"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <span className="mr-1">{t(`header:HiYou`)}</span>
                  <span>
                    <FaAngleDown />
                  </span>
                </p>
                {showProfile && (
                  <div className="absolute left-0 top-full z-20 min-w-[100px] bg-black1 shadow-lg">
                    <Link href={`/profile`}>
                      <p className="cursor-pointer whitespace-nowrap p-3 hover:bg-gray2">{t('header:MyProfile')}</p>
                    </Link>
                    <p className="cursor-pointer whitespace-nowrap p-3 hover:bg-gray2" onClick={() => handleLogout()}>
                      {t(`header:Logout`)}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <p className="flexItemCenter cursor-pointer whitespace-nowrap">{t('header:SignIn')}</p>
              </Link>
            )}
          </div>
          <div className="sm:flexItemCenter relative hidden cursor-pointer" onClick={() => setShowEN(!showEN)}>
            <p className="mr-1">{language}</p>
            <FaCaretDown />
            {showEN && <Language onSetLanguage={(language: string) => setLanguage(language)} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
