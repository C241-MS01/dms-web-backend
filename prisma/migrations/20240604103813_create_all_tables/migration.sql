-- CreateTable
CREATE TABLE `vehicle` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `analysis_result` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicleId` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `ear` DOUBLE NOT NULL,
    `mar` DOUBLE NOT NULL,
    `yawning_duration` DOUBLE NOT NULL,
    `notfocus_duration` DOUBLE NOT NULL,
    `bottle_duration` DOUBLE NOT NULL,
    `phone_duration` DOUBLE NOT NULL,
    `cigarette_duration` DOUBLE NOT NULL,
    `vape_duration` DOUBLE NOT NULL,
    `smoke_duration` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alert` (
    `id` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `analysis_result_Id` INTEGER NOT NULL,
    `vehicleId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `imgPath` VARCHAR(191) NOT NULL,
    `lat` DOUBLE NOT NULL,
    `long` DOUBLE NOT NULL,

    UNIQUE INDEX `Alert_analysis_result_Id_key`(`analysis_result_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `analysis_result` ADD CONSTRAINT `analysis_result_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `vehicle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alert` ADD CONSTRAINT `Alert_analysis_result_Id_fkey` FOREIGN KEY (`analysis_result_Id`) REFERENCES `analysis_result`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
