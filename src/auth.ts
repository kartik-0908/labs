import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from '../lib/prisma';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials)  {
                const parsedCredentials = z
                    .object({ email: z.string().email() })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    return {
                        id: user.id.toString(),
                        email: user.email,
                    };
                }
                return null;
            },
        }),
    ],
});

async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });
        console.log(user)
        return user
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}