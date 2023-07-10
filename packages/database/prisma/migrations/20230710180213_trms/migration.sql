/*
  Warnings:

  - You are about to drop the column `productId` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `inventory` table. All the data in the column will be lost.
  - You are about to drop the column `SKU` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `stockId` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `priceId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `swatches` table. All the data in the column will be lost.
  - You are about to drop the `_Product_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_attributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_categories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[variantId,variantSku]` on the table `inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Made the column `quantity` on table `inventory` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `uid` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('IN_STOCK', 'IN_TRANSIT', 'NO_LONGER_SOLD', 'NONE', 'ON_ORDER');

-- DropForeignKey
ALTER TABLE "_Product_images" DROP CONSTRAINT "_Product_images_A_fkey";

-- DropForeignKey
ALTER TABLE "_Product_images" DROP CONSTRAINT "_Product_images_B_fkey";

-- DropForeignKey
ALTER TABLE "inventory" DROP CONSTRAINT "inventory_productId_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "product_attributes" DROP CONSTRAINT "product_attributes_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_brandName_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_priceId_fkey";

-- DropIndex
DROP INDEX "inventory_productId_productVariantId_key";

-- DropIndex
DROP INDEX "product_variants_SKU_key";

-- DropIndex
DROP INDEX "product_variants_stockId_key";

-- DropIndex
DROP INDEX "products_priceId_key";

-- AlterTable
ALTER TABLE "inventory" DROP COLUMN "productId",
DROP COLUMN "productVariantId",
ADD COLUMN     "code" TEXT,
ADD COLUMN     "status" "StockStatus",
ADD COLUMN     "variantId" TEXT,
ADD COLUMN     "variantSku" TEXT,
ALTER COLUMN "quantity" SET NOT NULL;

-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "SKU",
DROP COLUMN "stockId",
ADD COLUMN     "active" BOOLEAN DEFAULT false,
ADD COLUMN     "inseam" TEXT[],
ADD COLUMN     "size" TEXT[],
ADD COLUMN     "waist" TEXT[],
ALTER COLUMN "sortOrder" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "priceId",
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "uid" TEXT NOT NULL,
ALTER COLUMN "brandName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "swatches" DROP COLUMN "active";

-- DropTable
DROP TABLE "_Product_images";

-- DropTable
DROP TABLE "product_attributes";

-- DropTable
DROP TABLE "product_categories";

-- CreateTable
CREATE TABLE "variant_options" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "SKU" TEXT NOT NULL,
    "size" TEXT,
    "inseam" TEXT,
    "waist" TEXT,
    "priceId" INTEGER,
    "variantId" TEXT NOT NULL,

    CONSTRAINT "variant_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "variant_options_SKU_key" ON "variant_options"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "variant_options_priceId_key" ON "variant_options"("priceId");

-- CreateIndex
CREATE UNIQUE INDEX "variant_options_variantId_SKU_key" ON "variant_options"("variantId", "SKU");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_variantId_variantSku_key" ON "inventory"("variantId", "variantSku");

-- CreateIndex
CREATE UNIQUE INDEX "products_uid_key" ON "products"("uid");

-- AddForeignKey
ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "prices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_fkey" FOREIGN KEY ("brand") REFERENCES "brands"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_variantId_variantSku_fkey" FOREIGN KEY ("variantId", "variantSku") REFERENCES "variant_options"("variantId", "SKU") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
