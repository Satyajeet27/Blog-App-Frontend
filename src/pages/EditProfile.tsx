import { useUpdateUser } from '@/api/userApi'
import { useGetUser } from '@/auth/autheticateValidation'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Mail, User2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    username: z.string().readonly(),
    email: z.string().readonly(),
    fname: z.string().min(1, "First name is required"),
    lname: z.string().min(1, "Last name is required"),
    bio: z.string().min(1, "Bio is required"),
})

const EditProfile = () => {
    const { userData, isLoading } = useGetUser()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            fname: "",
            lname: "",
            bio: ""
        }
    })
    // console.log(userData)
    const loadData = {
        username: userData?.user?.username,
        email: userData?.user?.email,
        fname: userData?.user?.fname,
        lname: userData?.user?.lname,
        bio: userData?.user?.bio
    }

    const { updateUser, isPending } = useUpdateUser()
    const handleUpdate = (value: z.infer<typeof formSchema>) => {
        console.log(value)
        updateUser({ bio: value.bio, fname: value.fname, lname: value.lname })
    }
    useEffect(() => {
        if (!isLoading && userData) {
            form.reset(loadData)
        }
    }, [isLoading, userData])
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdate)} className='grid grid-cols-2 gap-4'>
                    <FormField control={form.control} name="username" render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <div className="flex items-center  bg-slate-200 rounded-lg">
                                    <User2 className='mx-1 text-slate-600' size={"1rem"} />
                                    <Input {...field} placeholder="Satya123" readOnly disabled />
                                </div>
                            </FormControl>

                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <div className="flex items-center  bg-slate-200 rounded-lg ">
                                    <Mail className='mx-1 text-slate-600' size={"1rem"} />
                                    <Input {...field} placeholder="m@example.com" readOnly disabled />
                                </div>
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
                    <Button className='w-fit'>{isPending ? <LoaderCircle className='animate-spin' /> : "Update"}</Button>
                </form>
            </Form>
        </div>
    )
}

export default EditProfile