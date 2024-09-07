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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useCreateUser } from "@/api/userApi"
import { LoaderCircle } from "lucide-react"

const formSchema = z.object({
    username: z.string().min(1, "Username is required"),
    fname: z.string().min(1, "First name is required"),
    lname: z.string().min(1, "Last name is required"),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    bio: z.string().min(1, "Bio is required"),
})


const Register = () => {
    const { createUser, isPending } = useCreateUser()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "", bio: "", username: "", fname: "", lname: "" }
    })
    const onSubmit = (value: z.infer<typeof formSchema>) => {
        console.log(value)
        createUser(value)
        // form.reset({ email: "", password: "" })
    }

    return (
        <Form {...form}>
            <Card className="w-full max-w-sm text-slate-700">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Let's get started with creating new account here!
                    </CardDescription>
                </CardHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="grid grid-cols-2 gap-2">
                        <FormField control={form.control} name="username" render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Satya123" required />
                                </FormControl>
                                <FormDescription>Username must be unique</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="m@example.com" required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="fname" render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="lname" render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-1">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="bio" render={({ field }) => (
                            <FormItem className="col-span-2 ">
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} required />
                                </FormControl>
                                <FormDescription>Password must be at least 6 characters</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">{isPending ? <LoaderCircle className="animate-spin" /> : "Create"}</Button>
                    </CardFooter>
                </form>
            </Card>
        </Form>
    )
}
export default Register