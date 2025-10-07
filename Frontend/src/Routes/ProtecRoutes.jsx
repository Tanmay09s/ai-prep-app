import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const ProtecRoutes = ({children}) => {
    const {isAuthenitcate} = useSelector((state)=>state.userReducer)
    if(!isAuthenitcate){
        return <Navigate to = '/' replace/>
    }
  return children
}
