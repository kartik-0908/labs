'use server';

import { auth, signIn } from '@/auth';
import { client } from '@/lib/mem';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function addMem(mem: string) {
  const session = await auth()
  try {
    const res = await client.add([{
      "role": "user", "content": mem
    }], { user_id: session?.user?.email })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

export async function getAllMem() {
  const session = await auth()
  try {
    console.log(session?.user?.email)
    const res = await client.getAll({ user_id: session?.user?.email })
    return res;

  } catch (error) {
    console.log(error)
    return null
  }
}

export async function deleteMem(id: string) {
  try {
    const res = await client.delete(id)
  } catch (error) {
    console.log(error)
  }
}

export async function queryMem(query: string) {
  try {
    const res = await client.search(query)
    return res;
  } catch (error) {
    console.log(error)
  }
}