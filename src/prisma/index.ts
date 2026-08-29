import { PrismaClient } from "@prisma/client";
import updateSpotNotation from "@/prisma/hooks/climbing-spot-hooks";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    query: {
      climbingSpotComment: {
        async create({ args, query }) {
          const result = await query(args);
          if (result?.climbingSpotId) {
            await updateSpotNotation(result.climbingSpotId);
          }
          return result;
        },
        async update({ args, query }) {
          const result = await query(args);
          if (result?.climbingSpotId) {
            await updateSpotNotation(result.climbingSpotId);
          }
          return result;
        },
        async delete({ args, query }) {
          const comment = await prisma.climbingSpotComment.findFirst({
            where: args.where,
          });
          const result = await query(args);
          if (comment) {
            await updateSpotNotation(comment.climbingSpotId);
          }
          return result;
        },
      },
    },
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
