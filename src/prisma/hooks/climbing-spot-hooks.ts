import prisma from '@/prisma';

const updateSpotNotation = async (spotId: string) => {
  const comments = await prisma.climbingSpotComment.findMany({
    where: { climbingSpotId: spotId },
  });

  const totalNotation = comments.reduce((sum, comment) => sum + comment.notation, 0);
  const notationCount = comments.length;
  const averageNotation = notationCount > 0 ? totalNotation / notationCount : 0;

  await prisma.climbingSpot.update({
    where: { id: spotId },
    data: {
      notation: averageNotation,
      notationCount: notationCount,
    },
  });
};

export default updateSpotNotation;
