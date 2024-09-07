import { useResetPassword } from '@/api/userApi'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole } from 'lucide-react'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({

    oldPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
    newPassword: z.string().min(6, { message: "Password must be at least 6 characters" })
})

const ChangePassword = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: ""
        }
    })
    const { resetPassword, isPending } = useResetPassword()
    const handleChangePassword = (value: z.infer<typeof formSchema>) => {
        console.log(value)
        resetPassword({ newPassword: value.newPassword, password: value.oldPassword })
    }
    useEffect(() => {
        if (!isPending) {
            form.reset()
        }
    }, [isPending, form])
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleChangePassword)} className='grid grid-cols-2 gap-4'>
                    <FormField control={form.control} name="oldPassword" render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <div className="flex items-center  bg-slate-200 rounded-lg">
                                    <LockKeyhole className='mx-1 text-slate-600' size={"1rem"} />
                                    <Input {...field} type='password' />
                                </div>
                            </FormControl>

                        </FormItem>
                    )} />
                    <FormField control={form.control} name="newPassword" render={({ field }) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <div className="flex items-center  bg-slate-200 rounded-lg ">
                                    <LockKeyhole className='mx-1 text-slate-600' size={"1rem"} />
                                    <Input {...field} type='password' />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <Button className='w-fit'>Reset</Button>
                </form>
            </Form>
        </div>
    )
}

export default ChangePassword