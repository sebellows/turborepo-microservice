/*
  Warnings:

  - The primary key for the `addresses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `addresses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `amount` on the `cart_products` table. All the data in the column will be lost.
  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `parentId` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `order_details` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `order_details` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `shipmentId` on the `orders` table. All the data in the column will be lost.
  - The `id` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `paymentId` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `payments` table. All the data in the column will be lost.
  - The `id` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `prices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `discounted` on the `prices` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `prices` table. All the data in the column will be lost.
  - The `id` column on the `prices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `product_images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `product_images` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `code` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `hex` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `swatch` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `stockId` on the `products` table. All the data in the column will be lost.
  - The `priceId` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `avatarId` on the `profiles` table. All the data in the column will be lost.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_Category_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductVariant_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Product_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Product_variants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `avatars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shipments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[SKU]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stockId]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[swatchId]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,productId]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[priceId]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `B` on the `_Product_images` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `orderId` on the `order_details` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `provider` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SKU` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `swatchId` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandName` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ShippingStatusType" AS ENUM ('CREATED', 'PENDING', 'COMPLETED');

-- AlterEnum
ALTER TYPE "ProductStatusType" ADD VALUE 'UNAVAILABLE';

-- DropForeignKey
ALTER TABLE "_Category_products" DROP CONSTRAINT "_Category_products_A_fkey";

-- DropForeignKey
ALTER TABLE "_Category_products" DROP CONSTRAINT "_Category_products_B_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariant_images" DROP CONSTRAINT "_ProductVariant_images_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductVariant_images" DROP CONSTRAINT "_ProductVariant_images_B_fkey";

-- DropForeignKey
ALTER TABLE "_Product_categories" DROP CONSTRAINT "_Product_categories_A_fkey";

-- DropForeignKey
ALTER TABLE "_Product_categories" DROP CONSTRAINT "_Product_categories_B_fkey";

-- DropForeignKey
ALTER TABLE "_Product_images" DROP CONSTRAINT "_Product_images_B_fkey";

-- DropForeignKey
ALTER TABLE "_Product_variants" DROP CONSTRAINT "_Product_variants_A_fkey";

-- DropForeignKey
ALTER TABLE "_Product_variants" DROP CONSTRAINT "_Product_variants_B_fkey";

-- DropForeignKey
ALTER TABLE "avatars" DROP CONSTRAINT "avatars_profileId_fkey";

-- DropForeignKey
ALTER TABLE "cart_products" DROP CONSTRAINT "cart_products_productId_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parentId_fkey";

-- DropForeignKey
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_shipmentId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderId_fkey";

-- DropForeignKey
ALTER TABLE "prices" DROP CONSTRAINT "prices_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_variantId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_priceId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_stockId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_avatarId_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "shipments" DROP CONSTRAINT "shipments_orderId_fkey";

-- DropForeignKey
ALTER TABLE "stock" DROP CONSTRAINT "stock_productId_fkey";

-- DropIndex
DROP INDEX "addresses_userId_key";

-- DropIndex
DROP INDEX "orders_paymentId_shipmentId_userId_key";

-- DropIndex
DROP INDEX "payments_orderId_key";

-- DropIndex
DROP INDEX "prices_productId_key";

-- DropIndex
DROP INDEX "product_images_variantId_key";

-- DropIndex
DROP INDEX "product_variants_name_productId_key";

-- DropIndex
DROP INDEX "product_variants_uid_key";

-- DropIndex
DROP INDEX "products_priceId_stockId_key";

-- DropIndex
DROP INDEX "profiles_avatarId_key";

-- AlterTable
ALTER TABLE "_Product_images" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cart_products" DROP COLUMN "amount",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sessionId" INTEGER;

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "parentId",
ADD COLUMN     "parentId" INTEGER,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "order_details" DROP CONSTRAINT "order_details_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "orderId",
ADD COLUMN     "orderId" INTEGER NOT NULL,
ADD CONSTRAINT "order_details_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "shipmentId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "paymentId",
ADD COLUMN     "paymentId" INTEGER,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "payments" DROP CONSTRAINT "payments_pkey",
DROP COLUMN "orderId",
DROP COLUMN "paymentMethod",
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "prices" DROP CONSTRAINT "prices_pkey",
DROP COLUMN "discounted",
DROP COLUMN "productId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "currentPrice" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "fullPrice" SET DATA TYPE DECIMAL(65,30),
ADD CONSTRAINT "prices_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "product_images_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "product_variants" DROP COLUMN "code",
DROP COLUMN "hex",
DROP COLUMN "swatch",
DROP COLUMN "uid",
ADD COLUMN     "SKU" TEXT NOT NULL,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "ProductStatusType" NOT NULL,
ADD COLUMN     "stockId" INTEGER,
ADD COLUMN     "swatchId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "brand",
DROP COLUMN "status",
DROP COLUMN "stockId",
ADD COLUMN     "brandName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "priceId",
ADD COLUMN     "priceId" INTEGER;

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "avatarId",
ADD COLUMN     "avatar" JSONB,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_Category_products";

-- DropTable
DROP TABLE "_ProductVariant_images";

-- DropTable
DROP TABLE "_Product_categories";

-- DropTable
DROP TABLE "_Product_variants";

-- DropTable
DROP TABLE "avatars";

-- DropTable
DROP TABLE "shipments";

-- DropTable
DROP TABLE "stock";

-- DropEnum
DROP TYPE "ShipmentStatusType";

-- CreateTable
CREATE TABLE "user_payments" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentMethod" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "accountNo" INTEGER NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_sessions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "userId" TEXT,

    CONSTRAINT "shopping_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresOn" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL,
    "description" JSONB,
    "name" TEXT NOT NULL,
    "percentage" DECIMAL(65,30) NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swatches" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN DEFAULT false,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "hex" TEXT,
    "image" JSONB,

    CONSTRAINT "swatches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_attributes" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attribute" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,

    CONSTRAINT "product_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProductCategories" (
    "categoryId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ProductCategories_pkey" PRIMARY KEY ("categoryId","productId")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER,
    "nextDelivery" TIMESTAMP(3),
    "nextDeliveryQuantity" INTEGER,
    "productId" TEXT,
    "productVariantId" TEXT,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_options" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "providerId" INTEGER NOT NULL,

    CONSTRAINT "shipping_options_pkey" PRIMARY KEY ("providerId","name")
);

-- CreateTable
CREATE TABLE "shipping_providers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "shipping_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ShippingStatusType",
    "shipmentMethod" TEXT,
    "orderId" INTEGER NOT NULL,
    "providerId" INTEGER NOT NULL,

    CONSTRAINT "shipping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopping_sessions_userId_key" ON "shopping_sessions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "inventory_productId_productVariantId_key" ON "inventory"("productId", "productVariantId");

-- CreateIndex
CREATE UNIQUE INDEX "shipping_orderId_key" ON "shipping"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "shipping_providerId_key" ON "shipping"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "_Product_images_AB_unique" ON "_Product_images"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_images_B_index" ON "_Product_images"("B");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_parentId_key" ON "categories"("name", "parentId");

-- CreateIndex
CREATE UNIQUE INDEX "order_details_orderId_productId_key" ON "order_details"("orderId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_paymentId_key" ON "orders"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_userId_key" ON "orders"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_SKU_key" ON "product_variants"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_stockId_key" ON "product_variants"("stockId");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_swatchId_key" ON "product_variants"("swatchId");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_id_productId_key" ON "product_variants"("id", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "products_priceId_key" ON "products"("priceId");

-- AddForeignKey
ALTER TABLE "user_payments" ADD CONSTRAINT "user_payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_sessions" ADD CONSTRAINT "shopping_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_products" ADD CONSTRAINT "cart_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_products" ADD CONSTRAINT "cart_products_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "shopping_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts" ADD CONSTRAINT "discounts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_attributes" ADD CONSTRAINT "product_attributes_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_swatchId_fkey" FOREIGN KEY ("swatchId") REFERENCES "swatches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brandName_fkey" FOREIGN KEY ("brandName") REFERENCES "brands"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "prices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategories" ADD CONSTRAINT "ProductCategories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_productId_productVariantId_fkey" FOREIGN KEY ("productId", "productVariantId") REFERENCES "product_variants"("productId", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_options" ADD CONSTRAINT "shipping_options_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "shipping_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_providerId_shipmentMethod_fkey" FOREIGN KEY ("providerId", "shipmentMethod") REFERENCES "shipping_options"("providerId", "name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping" ADD CONSTRAINT "shipping_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "shipping_providers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_images" ADD CONSTRAINT "_Product_images_B_fkey" FOREIGN KEY ("B") REFERENCES "product_images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
