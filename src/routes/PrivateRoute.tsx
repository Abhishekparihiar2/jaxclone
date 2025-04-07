import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import useAuth from '../shared/hooks/useAuth'
import usePermissions from '../shared/hooks/usePermissions'

export type PrivateRouteInterface = {
    children: JSX.Element
}
const PrivateRoute = ({children}: PrivateRouteInterface) => {
    const location = useLocation()
    const isLogged: boolean = useAuth();
    const isPermitted: boolean = usePermissions(location.pathname);
    // if(!isLogged)
    //     dispatch(new ResponseError("Please login again!").action())
    if(!isPermitted){
        return <Navigate to="/dashboard" state={{from: location}} replace />
    }
    return !isLogged ? 
        <Navigate to="/login" state={{from: location}} replace />
        :
        children
}

export default PrivateRoute