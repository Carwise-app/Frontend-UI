import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'



export default function LearnPrice({isLoggedIn}) {
  const navigate = useNavigate()

  useEffect(()=> {
    if(!isLoggedIn){
      navigate("/")
    }
  },[isLoggedIn]) 

  return (
    <>
    {isLoggedIn && <Outlet/>}
    </>
  )
}
