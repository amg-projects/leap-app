import { router, publicProcedures } from './trpc'
import { z } from 'zod'

const messages: string[] = ['initial']

export const appRouter = router({
  chat: publicProcedures.query(async () => {
    return [...messages]
  }),
  newMessage: publicProcedures
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input: { message } }) => {
      messages.push(message)
    }),
})

export type AppRouter = typeof appRouter
