import React from "react"
import { useAuthenticate, useGetUser } from "./autheticateValidation"
import { Navigate, useNavigate } from "react-router-dom"

type Props = {
    children: React.ReactNode
}

// const PrivateRoute = ({ children }: Props) => {
// const navigate = useNavigate()
//     const { userData, error, isLoading } = useGetUser()
//     if (isLoading) {
//         return <div>Loading</div>
//     }
//     if (error) {
//         navigate("/auth")
//     }
//     if (userData) {
//         return <>{children}</>
//     }
// }
const PrivateRoute = ({ children }: Props) => {
    const { isAuthenticated } = useAuthenticate()
    // console.log(isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to={"/auth"} />
    }
    return <>{children}</>
}

export default PrivateRoute