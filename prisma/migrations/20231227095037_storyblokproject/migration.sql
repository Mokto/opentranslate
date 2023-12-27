/*
  Warnings:

  - You are about to drop the column `storyblokToken` on the `Project` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "StoryblokProject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "storyblokToken" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "projectId" INTEGER,
    CONSTRAINT "StoryblokProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT
);
INSERT INTO "new_Project" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
