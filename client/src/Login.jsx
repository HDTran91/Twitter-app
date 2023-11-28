/* eslint-disable no-unused-vars */
import {useNavigate, useSearchParams} from "react-router-dom"
import { useEffect } from "react"
export default function Login() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  useEffect(()=>{
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    // eslint-disable-next-line no-unused-vars
    const new_user = params.get('new_user')
    const verify = params.get('verify')
    //test UI for login
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    navigate('/')
    
  }, [params, navigate])
  return (
    <div>Login</div>
  )
}