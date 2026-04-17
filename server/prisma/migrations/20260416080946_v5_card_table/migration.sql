/*
  Warnings:

  - You are about to drop the `_CardToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CardToTag" DROP CONSTRAINT "_CardToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardToTag" DROP CONSTRAINT "_CardToTag_B_fkey";

-- DropTable
DROP TABLE "_CardToTag";

-- CreateTable
CREATE TABLE "card_tags" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "card_tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "card_tags" ADD CONSTRAINT "card_tags_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_tags" ADD CONSTRAINT "card_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
