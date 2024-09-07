import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Editor from "@/pages/Editor"

import { Edit3Icon } from "lucide-react"

const BlogUpdate = ({ blogId }: { blogId: string }) => {
    return (
        <Dialog>
            <DialogTrigger><Edit3Icon className="text-emerald-500" size={"1.1rem"} /></DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-slate-600 border-b-2 pb-2 mb-3">Update your Post!</DialogTitle>

                    <DialogDescription className="">
                        <Editor blogId={blogId} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>

        </Dialog>
    )
}

export default BlogUpdate