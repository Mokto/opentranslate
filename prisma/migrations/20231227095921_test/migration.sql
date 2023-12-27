/*
  Warnings:

  - Made the column `projectId` on table `StoryblokProject` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StoryblokProject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "storyblokToken" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "StoryblokProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StoryblokProject" ("id", "projectId", "spaceId", "storyblokToken") SELECT "id", "projectId", "spaceId", "storyblokToken" FROM "StoryblokProject";
DROP TABLE "StoryblokProject";
ALTER TABLE "new_StoryblokProject" RENAME TO "StoryblokProject";
CREATE UNIQUE INDEX "StoryblokProject_projectId_key" ON "StoryblokProject"("projectId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
