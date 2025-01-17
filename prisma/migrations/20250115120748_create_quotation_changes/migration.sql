-- AlterTable
ALTER TABLE `quotation` DROP PRIMARY KEY,
    DROP COLUMN `client_name`,
    DROP COLUMN `contact_email`,
    DROP COLUMN `contact_person`,
    DROP COLUMN `contact_phone`,
    DROP COLUMN `date`,
    DROP COLUMN `day_to_expire`,
    DROP COLUMN `quotation_number`,
    ADD COLUMN `client_data_id` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `initial_payment_percentage` INTEGER NULL,
    ADD COLUMN `last_payment_percentage` INTEGER NULL,
    ADD COLUMN `payment_grace_days` INTEGER NULL,
    ADD COLUMN `status_id` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `tcs_edited` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `tcs_id` INTEGER NOT NULL,
    ADD COLUMN `time` BIGINT NOT NULL,
    ADD COLUMN `validity_days` INTEGER NOT NULL,
    ADD COLUMN `vat_excluded` INTEGER NOT NULL DEFAULT 0,
    MODIFY `quotation_id` VARCHAR(12) NOT NULL,
    ALTER COLUMN `currency_id` DROP DEFAULT,
    MODIFY `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `quotation_status` (
    `status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(12) NOT NULL,

    PRIMARY KEY (`status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotation_client_data` (
    `client_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `external_ref` VARCHAR(191) NULL,
    `contact_person` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `box_number` INTEGER NULL,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `address_Line_1` VARCHAR(191) NULL,

    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotation_items` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `quot_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `quantity` DOUBLE NOT NULL,
    `units` VARCHAR(191) NOT NULL,
    `unitPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `quotation_quotation_id_key` ON `quotation`(`quotation_id`);

-- CreateIndex
CREATE INDEX `idx_quotation_quotation_id` ON `quotation`(`quotation_id`);

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `quotation_status`(`status_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_client_data_id_fkey` FOREIGN KEY (`client_data_id`) REFERENCES `quotation_client_data`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation` ADD CONSTRAINT `quotation_tcs_id_fkey` FOREIGN KEY (`tcs_id`) REFERENCES `quotation_tcs`(`tc_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation_items` ADD CONSTRAINT `quotation_items_quot_id_fkey` FOREIGN KEY (`quot_id`) REFERENCES `quotation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
