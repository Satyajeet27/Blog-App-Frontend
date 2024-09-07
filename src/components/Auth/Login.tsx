import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useUserLogin } from "@/api/userApi"
import { LoaderCircle } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    email: z.string({ message: "must be string" }).email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
})


const Login = () => {
    const { userLogin, isPending, isSuccess, data } = useUserLogin()
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" }
    })
    const onSubmit = (value: z.infer<typeof formSchema>) => {
        userLogin(value)
        // console.log(data)

        form.reset({ email: "", password: "" })
    }
    useEffect(() => {
        if (isSuccess) {
            // console.log(data)
            // localStorage.setItem("token", data.token)
            // navigate("/")
        }
    }, [isSuccess, navigate, data])
    return (
        <Form {...form}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent>
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="m@example.com" required />
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} required />
                                </FormControl>
                            </FormItem>
                        )} />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">{isPending ? <LoaderCircle className="animate-spin" /> : "Sign In"}</Button>
                    </CardFooter>
                </form>
            </Card>
        </Form>
    )
}
export default Login