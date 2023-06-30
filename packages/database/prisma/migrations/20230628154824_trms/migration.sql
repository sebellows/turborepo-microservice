-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'EMPLOYEE', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY');

-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('PHONE', 'EMAIL', 'TEXT');

-- CreateEnum
CREATE TYPE "OrderStatusType" AS ENUM ('CREATED', 'PENDING', 'SUCCESSFUL', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatusType" AS ENUM ('CREATED', 'PENDING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ImageFileType" AS ENUM ('PNG', 'JPG', 'WEBP');

-- CreateEnum
CREATE TYPE "ImageFormat" AS ENUM ('LANDSCAPE', 'PORTRAIT', 'SQUARE');

-- CreateEnum
CREATE TYPE "ProductStatusType" AS ENUM ('AVAILABLE', 'BACKORDER', 'DISCONTINUED', 'OUT_OF_STOCK');

-- CreateEnum
CREATE TYPE "ShipmentStatusType" AS ENUM ('CREATED', 'PENDING', 'COMPLETED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "gender" "Gender",
    "preferredLanguage" TEXT DEFAULT 'en',
    "role" "Role" DEFAULT 'CUSTOMER',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "municipality" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "isBillingAddress" BOOLEAN,
    "isPrimaryAddress" BOOLEAN NOT NULL,
    "isShippingAddress" BOOLEAN,
    "isValidAddress" BOOLEAN,
    "poBox" BOOLEAN,
    "userId" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT,
    "description" JSONB DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartproduct" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "cartproduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" "OrderStatusType",
    "paymentId" TEXT,
    "shipmentId" TEXT,
    "userId" TEXT,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderdetail" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "orderdetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "paymentMethod" TEXT NOT NULL,
    "status" "PaymentStatusType",
    "orderId" TEXT,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isoCurrencyCode" TEXT DEFAULT 'USD',
    "currentPrice" INTEGER NOT NULL,
    "discounted" BOOLEAN,
    "formattedValue" TEXT NOT NULL,
    "fullPrice" INTEGER NOT NULL,
    "productId" TEXT,

    CONSTRAINT "price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productimage" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "altText" TEXT,
    "aspectRatio" TEXT,
    "fileType" "ImageFileType" NOT NULL,
    "format" "ImageFormat" NOT NULL,
    "height" INTEGER,
    "width" INTEGER,
    "image" JSONB,

    CONSTRAINT "productimage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "label" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productvariant" (
    "id" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "colorSwatch" TEXT,
    "image" JSONB,
    "productId" TEXT,

    CONSTRAINT "productvariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "brand" TEXT NOT NULL,
    "code" TEXT,
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "ProductStatusType" NOT NULL,
    "priceId" TEXT,
    "stockId" TEXT,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER,
    "nextDelivery" TIMESTAMP(3),
    "nextDeliveryQuantity" INTEGER,
    "productId" TEXT NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastModification" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" "ShipmentStatusType",
    "orderId" TEXT,

    CONSTRAINT "shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_User_address" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_products" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Product_categories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Cart_products" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Product_reviews" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Product_variants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Product_images" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_parentId_key" ON "category"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_userId_key" ON "cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cartproduct_productId_key" ON "cartproduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "order_paymentId_shipmentId_userId_key" ON "order"("paymentId", "shipmentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "orderdetail_orderId_productId_key" ON "orderdetail"("orderId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "payment_orderId_key" ON "payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "price_productId_key" ON "price"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "review_productId_userId_key" ON "review"("productId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "productvariant_name_productId_key" ON "productvariant"("name", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "product_priceId_stockId_key" ON "product"("priceId", "stockId");

-- CreateIndex
CREATE UNIQUE INDEX "stock_productId_key" ON "stock"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "shipment_orderId_key" ON "shipment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "_User_address_AB_unique" ON "_User_address"("A", "B");

-- CreateIndex
CREATE INDEX "_User_address_B_index" ON "_User_address"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_products_AB_unique" ON "_Category_products"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_products_B_index" ON "_Category_products"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Product_categories_AB_unique" ON "_Product_categories"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_categories_B_index" ON "_Product_categories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Cart_products_AB_unique" ON "_Cart_products"("A", "B");

-- CreateIndex
CREATE INDEX "_Cart_products_B_index" ON "_Cart_products"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Product_reviews_AB_unique" ON "_Product_reviews"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_reviews_B_index" ON "_Product_reviews"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Product_variants_AB_unique" ON "_Product_variants"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_variants_B_index" ON "_Product_variants"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Product_images_AB_unique" ON "_Product_images"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_images_B_index" ON "_Product_images"("B");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartproduct" ADD CONSTRAINT "cartproduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "shipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderdetail" ADD CONSTRAINT "orderdetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderdetail" ADD CONSTRAINT "orderdetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price" ADD CONSTRAINT "price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productvariant" ADD CONSTRAINT "productvariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "price"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment" ADD CONSTRAINT "shipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_address" ADD CONSTRAINT "_User_address_A_fkey" FOREIGN KEY ("A") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_User_address" ADD CONSTRAINT "_User_address_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_products" ADD CONSTRAINT "_Category_products_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_products" ADD CONSTRAINT "_Category_products_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_categories" ADD CONSTRAINT "_Product_categories_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_categories" ADD CONSTRAINT "_Product_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Cart_products" ADD CONSTRAINT "_Cart_products_A_fkey" FOREIGN KEY ("A") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Cart_products" ADD CONSTRAINT "_Cart_products_B_fkey" FOREIGN KEY ("B") REFERENCES "cartproduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_reviews" ADD CONSTRAINT "_Product_reviews_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_reviews" ADD CONSTRAINT "_Product_reviews_B_fkey" FOREIGN KEY ("B") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_variants" ADD CONSTRAINT "_Product_variants_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_variants" ADD CONSTRAINT "_Product_variants_B_fkey" FOREIGN KEY ("B") REFERENCES "productvariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_images" ADD CONSTRAINT "_Product_images_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_images" ADD CONSTRAINT "_Product_images_B_fkey" FOREIGN KEY ("B") REFERENCES "productimage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
