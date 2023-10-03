import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaSpinner, FaStar } from 'react-icons/fa'
import { mutate } from 'swr'
// import { fetcher } from '~/services/fetcher'
import MovieServices from '~/services/MovieServices'
// import { AccountType, MovieType } from '~/type/type'
import request from '~/utils/request'

export const Rate: React.FC<{
  onShow: Function
  movieId: string
}> = ({ onShow, movieId }) => {
  const [loadingRatingMovie, setLoadingRatingMovie] = useState<boolean>(false)
  const [rateSuccess, setRateSuccess] = useState<boolean>(false)
  const [currentStar, setCurrentStar] = useState<number>(0)
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined)
  const stars = Array.from({ length: 10 }, (_, i) => i + 1)

  // const [account, setAccount] = useState<AccountType>({ success: false, session_id: '', accountId: '', username: '' })

  const handleClick = (value: number) => {
    setCurrentStar(value)
  }

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue)
  }

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }

  const router = useRouter()

  // useEffect(() => {
  //   const account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account') || '') : ''
  //   setAccount(account)
  // }, [])

  // const { data: ratingList } = useSWR(
  //   account.session_id ? request.fetchRatingList(account.accountId, account.session_id) : null,
  //   fetcher
  // )
  const handleRateMovie = async () => {
    const account = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account') || '') : ''

    // const currentRating = ratingList?.results.map((rate: MovieType) =>
    //   rate.id === movieId ? { ...rate, rating: currentStar } : rate
    // )

    if (account.session_id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      try {
        setLoadingRatingMovie(true)
        // mutate(
        //   request.fetchRatingList(account.accountId, account.session_id),
        //   {
        //     results: currentRating,
        //   },
        //   false
        // )
        await MovieServices.postRateMovie(movieId, account.session_id, { value: currentStar }, config)
        mutate(request.fetchRatingList(account.accountId, account.session_id))
        setRateSuccess(true)
      } catch (error) {
        console.log(error)
      }
    } else {
      router.push('/login')
    }
  }

  useEffect(() => {
    if (rateSuccess) onShow()
  }, [rateSuccess])
  return (
    <>
      <div className="fixed left-[50%] top-[40%] z-50 translate-x-[-50%] translate-y-[-50%] text-white">
        <div className="relative bg-gray px-16 pb-8 pt-12">
          <span
            className="absolute right-0 top-[-10%] h-8 w-8 cursor-pointer rounded-full text-center leading-8 hover:bg-white4"
            onClick={() => onShow()}
          >
            x
          </span>
          <div className="absolute left-[42%] top-[-20%]">
            <div className="relative">
              <div className="absolute left-[42%] top-[36%] text-black">{currentStar > 0 ? currentStar : '?'}</div>
              <FaStar className="text-[72px] text-blue1" />
            </div>
          </div>
          <div className="text-center">
            <p className="py-4 text-12 text-yellow-400">RATE THIS</p>
            <p className="tracking-wide">Doctor Strange in the Multiverse of Madness</p>
            <div className="my-6 flex cursor-pointer justify-center gap-2 text-20">
              {stars.map((star: number) => (
                <span key={star} onClick={() => setCurrentStar(star)}>
                  <FaStar
                    onClick={() => handleClick(star)}
                    onMouseOver={() => handleMouseOver(star)}
                    onMouseLeave={handleMouseLeave}
                    color={(hoverValue || currentStar) >= star ? 'rgb(87 153 239)' : ''}
                  />
                </span>
              ))}
            </div>
            <p className="cursor-pointer bg-white4 px-12 py-2" onClick={() => handleRateMovie()}>
              {loadingRatingMovie ? <FaSpinner className="inline-block animate-spin text-16" /> : 'Rate'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
