-- CreateTable
CREATE TABLE "Downvote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Downvote_pkey" PRIMARY KEY ("id")
);
