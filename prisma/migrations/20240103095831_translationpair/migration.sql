-- CreateTable
CREATE TABLE "TranslationPair" (
    "id" STRING NOT NULL,
    "from" STRING NOT NULL,
    "to" STRING NOT NULL,
    "language" STRING NOT NULL,
    "projectId" STRING NOT NULL,

    CONSTRAINT "TranslationPair_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TranslationPair_projectId_key" ON "TranslationPair"("projectId");

-- AddForeignKey
ALTER TABLE "TranslationPair" ADD CONSTRAINT "TranslationPair_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
