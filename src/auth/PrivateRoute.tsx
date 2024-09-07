import React from "react"
import { useAuthenticate } from "./autheticateValidation"
import { Navigate } from "react-router-dom"

type Props = {
    children: React.ReactNode
}


const PrivateRoute = ({ children }: Props) => {
    const { isAuthenticated } = useAuthenticate()
    // console.log(isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to={"/auth"} />
    }
    return <>{children}</>
}

export default PrivateRoute