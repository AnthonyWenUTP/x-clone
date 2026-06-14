-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_replyToId_fkey";

-- CreateTable
CREATE TABLE "media_attachments" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "media_attachments_postId_idx" ON "media_attachments"("postId");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_replyToId_fkey" FOREIGN KEY ("replyToId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_attachments" ADD CONSTRAINT "media_attachments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
