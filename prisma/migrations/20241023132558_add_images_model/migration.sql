/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Product_nome_key` ON `Product`(`nome`);
