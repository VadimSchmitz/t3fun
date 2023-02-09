import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      try {
        return ctx.prisma.todo.create({
          data: {
            title: input.title,
          },
        });
      } catch (error) {
        console.log(error);
        return null;
      }
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      try {
        return ctx.prisma.todo.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log(error);
        return null;
      }
    }),

  toggle: publicProcedure
    .input(
      z.object({
        id: z.string(),
        completed: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {
      try {
        return ctx.prisma.todo.update({
          where: {
            id: input.id,
          },
          data: {
            completed: input.completed,
          },
        });
      } catch (error) {
        console.log(error);
        return null;
      }
    }),
});
