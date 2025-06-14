import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'



export default function LearnPrice({isLoggedIn}) {
  const navigate = useNavigate()
  return (
    <>
      <Outlet/>
    </>
  )
}
