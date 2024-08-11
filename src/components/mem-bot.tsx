"use client"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { addMem, deleteMem, getAllMem } from "@/app/actions/actions"
import { CoreMessage } from "ai"
import { readStreamableValue } from 'ai/rsc';
import { continueConversation } from "@/app/actions/ai"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Microphone } from "./microphone"

export function MemBot() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [currentmodel, setCurrentModel] = useState("gpt4o")
  const [input, setInput] = useState('');
  const [newMemory, setNewMemory] = useState("")
  const [memories, setMemories] = useState<any[]>([])
  useEffect(() => {
    const fetchMemories = async () => {
      const memories = await getAllMem()
      console.log(memories)
      setMemories(memories)
    }
    fetchMemories()
  }, [])
  
  const handleSubmit2 = async () => {
    if (newMemory !== '') {
      await addMem(newMemory)
      const memories = await getAllMem()
      console.log(memories)
      setMemories(memories)

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
              {memories.map((memory) => (
                <TableRow key={memory.id}>
                  <TableCell>{memory.memory}</TableCell>
                  <TableCell>{memory.created_at}</TableCell>
                  <TableCell>
                    <Button onClick={async () => {
                      deleteMem(memory.id)
                      const memories = await getAllMem()
                      console.log(memories)
                      setMemories(memories)
                    }} variant="outline">Delete</Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center">
            <Textarea
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              placeholder="Add a new memory..."
              className="flex-1 resize-none rounded-lg bg-muted text-muted-foreground"
            />
            <Button onClick={handleSubmit2} size="icon" className="ml-4 rounded-full">
              <PlusIcon className="w-5 h-5" />
              <span className="sr-only">Add Memory</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-muted text-muted-foreground p-6 overflow-auto">
        <Select value={currentmodel} onValueChange={setCurrentModel}>
          <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="gpt4o">GPT4o</SelectItem>
              <SelectItem value="gpt4omini">GPT4omini</SelectItem>
              <SelectItem value="groq-llama3-8b-8192">Groq Llama 3(8b)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
          {messages.map((m, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content as string}
            </div>
          ))}
          <form
            onSubmit={async e => {
              e.preventDefault();
              const newMessages: CoreMessage[] = [
                ...messages,
                { content: input, role: 'user' },
              ];

              setMessages(newMessages);
              setInput('');

              const result = await continueConversation(newMessages, currentmodel);

              for await (const content of readStreamableValue(result)) {
                setMessages([
                  ...newMessages,
                  {
                    role: 'assistant',
                    content: content as string,
                  },
                ]);
              }
            }}
          >
            <input
              className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
              value={input}
              placeholder="Say something..."
              onChange={e => setInput(e.target.value)}
            />
            <Microphone/>
          </form>
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
