-- CreateExtension
CREATE EXTENSION IF NOT EXISTS citext;

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "establishmentId" TEXT NOT NULL,
    "name" CITEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id"),
    -- Duração em blocos de 30 minutos
    CONSTRAINT "services_durationMinutes_check" CHECK ("durationMinutes" > 0 AND "durationMinutes" % 30 = 0),
    CONSTRAINT "services_priceCents_check" CHECK ("priceCents" >= 0)
);

-- CreateIndex
CREATE UNIQUE INDEX "services_establishmentId_name_key" ON "services"("establishmentId", "name");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
