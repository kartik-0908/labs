"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import { addMem } from "@/app/lib/actions"

export function MemBot() {
  const [newMemory, setNewMemory] = useState("")
  const handleSubmit = async () => {
    if (newMemory !== '') {
      await addMem(newMemory)
    }
    setNewMemory("")
  }
  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <div className="bg-background text-foreground p-6 overflow-auto">
        <div className="flex flex-col gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Memory</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Went for a walk in the park</TableCell>
                <TableCell>2023-08-01</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Had a great conversation with a friend</TableCell>
                <TableCell>2023-07-28</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tried a new recipe for dinner</TableCell>
                <TableCell>2023-07-15</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex items-center">
            <Textarea
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              placeholder="Add a new memory..."
              className="flex-1 resize-none rounded-lg bg-muted text-muted-foreground"
            />
            <Button onClick={handleSubmit} size="icon" className="ml-4 rounded-full">
              <PlusIcon className="w-5 h-5" />
              <span className="sr-only">Add Memory</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-muted text-muted-foreground p-6 overflow-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="AI Avatar" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 bg-card p-3 rounded-lg max-w-[70%]">
              <div className="font-medium">AI Assistant</div>
              <div className="text-card-foreground">
               te
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="grid gap-1 bg-primary p-3 rounded-lg max-w-[70%] text-primary-foreground">
              <div className="font-medium">You</div>
              <div>
               etw
              </div>
            </div>
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="AI Avatar" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 bg-card p-3 rounded-lg max-w-[70%]">
              <div className="font-medium">AI Assistant</div>
              <div className="text-card-foreground">
                Okay, that sounds like a great plan. For an e-commerce website focused on showcasing and selling
                handmade jewelry, I would recommend the following key features:
                <ul className="list-disc pl-4 mt-2">
                  <li>
                    A clean, visually-appealing product catalog with high-quality images and detailed descriptions
                  </li>
                  <li>A shopping cart and secure checkout process to allow customers to purchase items</li>
                  <li>An admin dashboard to manage orders, inventory, and customer information</li>
                  <li>Search and filtering capabilities to help customers find products easily</li>
                  <li>Responsive design to ensure a great experience on both desktop and mobile</li>
                </ul>
               etett
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="grid gap-1 bg-primary p-3 rounded-lg max-w-[70%] text-primary-foreground">
              <div className="font-medium">You</div>
              <div>
                Yes, that sounds perfect! I really like the features you mentioned, especially the admin dashboard and
                responsive design. Can you provide some more details on how we could implement those capabilities?
              </div>
            </div>
            <Avatar className="w-10 h-10 border">
              <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
