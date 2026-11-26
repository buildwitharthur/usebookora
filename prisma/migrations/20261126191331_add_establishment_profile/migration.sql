-- CreateEnum
CREATE TYPE "BrandColor" AS ENUM ('indigo', 'blue', 'teal', 'green', 'orange', 'rose', 'purple', 'graphite');

-- AlterTable
ALTER TABLE "establishments" ADD COLUMN     "address" TEXT,
ADD COLUMN     "brandColor" "BrandColor" NOT NULL DEFAULT 'indigo',
ADD COLUMN     "description" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "phone" TEXT;
