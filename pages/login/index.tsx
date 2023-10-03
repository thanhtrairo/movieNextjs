import React from 'react'
import Header from '../../src/components/header/Header'
import { useRouter } from 'next/router'
import MovieServices from '~/services/MovieServices'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'

const Login = () => {
  const router = useRouter()

  const handleCreateToken = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const createSession = async () => {
      try {
        const resToken = await MovieServices.getRequestToken()
        localStorage.setItem('requestToken', JSON.stringify(resToken.data.request_token))
        router.push(
          `https://www.themoviedb.org/authenticate/${resToken.data.request_token}?redirect_to=${window.location.href}/loadingLogin`
        )
      } catch (error) {
        console.log(error)
      }
    }
    createSession()
  }
  const { t } = useTranslation()
  return (
    <>
      <Header />
      <div className="pt-16">
        <div className="container mx-auto bg-white ">
          <div className="flex justify-center ">
            <div>
              <h2 className="text-center text-32 font-medium">{t('header:SignIn')}</h2>
              <div className="border-[1px] border-solid border-gray5">
                <form className="p-4">
                  <div className="my-4 text-center">
                    <button
                      onClick={(e) => handleCreateToken(e)}
                      className="inline-block min-w-[300px] rounded-lg bg-yellow-400 px-6 py-2 hover:bg-yellow-500"
                    >
                      {t('header:LoginIMDbByMovieDB')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale), ['common', 'header'])),
    },
  }
}
