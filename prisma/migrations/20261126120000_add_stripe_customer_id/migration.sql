-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripeCustomerId_key" ON "subscriptions"("stripeCustomerId");
