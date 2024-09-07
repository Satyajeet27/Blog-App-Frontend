import { Input } from '@/components/ui/input'
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useGetBlogById, usePublishBlog, useUpdateBlog } from '@/api/blogApi';
import { LoaderCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const acceptedImageFormats = ['image/jpeg', 'image/png', 'image/gif'];

export const formSchema = z.object({
    coverImage: z.instanceof(File)
        .refine((file) => acceptedImageFormats.includes(file.type), { message: 'Only .jpeg, .png, .gif formats are supported' }).refine((file) => file.size <= 5 * 1024 * 1024, { message: 'Max image size is 5MB' }).optional(),
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    content: z.string().min(1, 'Content is required').max(5000, 'Content must be less than 5000 characters'),
    category: z.string().min(1, 'Category is required'),
})



const Editor = ({ blogId }: { blogId?: string }) => {
    const { data } = useGetBlogById(blogId as string)
    const [imgC, setImgC] = useState<string>()
    const blogData = {
        category: data?.blogs?.category,
        content: data?.blogs?.content,
        title: data?.blogs?.title,
        coverImage: undefined
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
            category: "",
            coverImage: undefined,
            title: ""
        }
    })

    const { publishBlog, isPending, } = usePublishBlog()
    const { updateBlog, isPending: isUpdatePending, isSuccess } = useUpdateBlog(blogId as string)
    const onSubmit = (value: z.infer<typeof formSchema>) => {
        console.log(value)

        if (blogId) {
            updateBlog(value)
        } else {
            publishBlog(value)
        }
    }
    if (isSuccess) {
        window.location.reload()
    }
    useEffect(() => {
        // console.log(form.getValues("coverImage"))
        if (blogId) {
            form.reset(blogData)
        }
    }, [data, blogId, form])
    return (
        <div className=' text-slate-600'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4'>
                    <FormField
                        control={form.control} name='coverImage'
                        render={({ field }) => (
                            <FormItem className='col-span-2'>
                                <FormLabel>CoverImage</FormLabel>
                                <FormControl>
                                    <Input type='file' onChange={(e) => {
                                        setImgC(URL.createObjectURL(e.target.files?.[0] as File))
                                        return field.onChange(e.target.files?.[0])
                                    }}
                                        accept={acceptedImageFormats.join(',')} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    {
                        blogId && <div className="col-span-2 h-28 mx-auto w-36">
                            <img src={imgC ? imgC : data?.blogs?.coverImage} className='h-full w-full' alt="" />
                        </div>
                    }
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='category'
                        render={({ field }) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='content'
                        render={({ field }) => (
                            <FormItem className='col-span-2 '>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        blogId ? <Button type='submit' className='w-fit'>{isUpdatePending ? <LoaderCircleIcon className='animate-spin' /> : "Update"}</Button> :
                            <Button type='submit' className='w-fit'>{isPending ? <LoaderCircleIcon className='animate-spin' /> : "Publish"}</Button>
                    }


                </form>
            </Form>
        </div>
    )
}

export default Editor