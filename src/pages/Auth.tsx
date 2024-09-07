import { useGetUser } from "@/auth/autheticateValidation"
import Login from "@/components/Auth/Login"
import Register from "@/components/Auth/Register"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"


const Auth = () => {
    const { state } = useLocation()
    // console.log(test)
    const { isSuccess } = useGetUser()
    const navigate = useNavigate()
    console.log(isSuccess)
    useEffect(() => {
        if (localStorage.getItem("token") && isSuccess) {
            return navigate("/")
        }
    }, [isSuccess, navigate])
    return (
        <div className="flex justify-center my-6">
            <Tabs defaultValue={state?.auth ? state.auth : "login"} className="">
                <TabsList className="mx-auto w-full">
                    <TabsTrigger className="w-full" value="login">Login</TabsTrigger>
                    <TabsTrigger className="w-full" value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login"><Login /></TabsContent>
                <TabsContent value="register"><Register /></TabsContent>
            </Tabs>
        </div>
    )
}

export default Auth