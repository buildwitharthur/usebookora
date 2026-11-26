-- CreateTable
CREATE TABLE "opening_hours" (
    "id" TEXT NOT NULL,
    "establishmentId" TEXT NOT NULL,
    "weekday" INTEGER NOT NULL,
    "opensAt" INTEGER NOT NULL,
    "closesAt" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "opening_hours_pkey" PRIMARY KEY ("id"),
    -- 0 = domingo ... 6 = sábado
    CONSTRAINT "opening_hours_weekday_check" CHECK ("weekday" BETWEEN 0 AND 6),
    -- Horários em blocos de 30 minutos, dentro do dia, e fechamento depois da abertura
    CONSTRAINT "opening_hours_opensAt_check" CHECK ("opensAt" >= 0 AND "opensAt" % 30 = 0),
    CONSTRAINT "opening_hours_closesAt_check" CHECK ("closesAt" <= 1440 AND "closesAt" % 30 = 0),
    CONSTRAINT "opening_hours_interval_check" CHECK ("closesAt" > "opensAt")
);

-- CreateIndex
CREATE UNIQUE INDEX "opening_hours_establishmentId_weekday_key" ON "opening_hours"("establishmentId", "weekday");

-- AddForeignKey
ALTER TABLE "opening_hours" ADD CONSTRAINT "opening_hours_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill: os estabelecimentos que já existem recebem o mesmo padrão dos novos
-- (DEFAULT_OPENING_HOURS): segunda a sexta, das 09:00 (540) às 18:00 (1080)
INSERT INTO "opening_hours" ("id", "establishmentId", "weekday", "opensAt", "closesAt", "updatedAt")
SELECT gen_random_uuid()::text, "establishments"."id", "days"."weekday", 540, 1080, CURRENT_TIMESTAMP
FROM "establishments"
CROSS JOIN generate_series(1, 5) AS "days"("weekday");
