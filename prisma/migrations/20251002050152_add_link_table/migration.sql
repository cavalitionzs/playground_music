-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "img_url" VARCHAR(500) NOT NULL,
    "img_alt" VARCHAR(500) NOT NULL,
    "music_title" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "img_url" VARCHAR(500) NOT NULL,
    "img_alt" VARCHAR(500) NOT NULL,
    "music_title" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);
