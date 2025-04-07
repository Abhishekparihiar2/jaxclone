import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'

export type ResetPassInterface = {
    children: JSX.Element
}
const ResetPassRoute = ({children}: ResetPassInterface) => {
    const location = useLocation()
    let queryFound = false
    let token = null
    if(location.search.length > 0) {
        queryFound = true
        token = new URLSearchParams(location.search)
    }
    return !queryFound ? 
        <Navigate to="/login" state={{from: location}} replace />
        :
        children
}

export default ResetPassRoute