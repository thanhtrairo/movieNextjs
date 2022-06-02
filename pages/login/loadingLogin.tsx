import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Loading } from '~/components/loading/Loading'
import MovieServices from '~/services/MovieServices'

const loadingLogin = () => {
  const router = useRouter()
  useEffect(() => {
    const requestToken = localStorage.getItem('requestToken')
      ? JSON.parse(localStorage.getItem('requestToken') || '')
      : ''

    if (requestToken) {
      const handleLogin = async () => {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }

          const resSession = await MovieServices.postLogin({ request_token: requestToken }, config)
          const resAccount = await MovieServices.getAccount(resSession.data.session_id)

          const req = {
            success: resSession.data.success,
            session_id: resSession.data.session_id,
            accountId: resAccount.data.id,
            username: resAccount.data.username,
          }
          localStorage.setItem('account', JSON.stringify(req))
          localStorage.removeItem('requestToken')
          router.push('/')
        } catch (error) {
          console.log(error)
        }
      }
      handleLogin()
    }
  }, [])
  return <Loading>Login IMDb ...</Loading>
}

export default loadingLogin
