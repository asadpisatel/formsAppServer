-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `status` ENUM('Blocked', 'Active') NOT NULL DEFAULT 'Active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Template` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `imgUrl` VARCHAR(191) NULL,
    `topic` ENUM('General', 'Business', 'Education', 'Quiz', 'Test', 'Another') NOT NULL DEFAULT 'Another',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `customString1State` BOOLEAN NOT NULL DEFAULT false,
    `customString1Question` VARCHAR(191) NULL,
    `customString2State` BOOLEAN NOT NULL DEFAULT false,
    `customString2Question` VARCHAR(191) NULL,
    `customString3State` BOOLEAN NOT NULL DEFAULT false,
    `customString3Question` VARCHAR(191) NULL,
    `customString4State` BOOLEAN NOT NULL DEFAULT false,
    `customString4Question` VARCHAR(191) NULL,
    `customText1State` BOOLEAN NOT NULL DEFAULT false,
    `customText1Question` VARCHAR(191) NULL,
    `customText2State` BOOLEAN NOT NULL DEFAULT false,
    `customText2Question` VARCHAR(191) NULL,
    `customText3State` BOOLEAN NOT NULL DEFAULT false,
    `customText3Question` VARCHAR(191) NULL,
    `customText4State` BOOLEAN NOT NULL DEFAULT false,
    `customText4Question` VARCHAR(191) NULL,
    `customInt1State` BOOLEAN NOT NULL DEFAULT false,
    `customInt1Question` VARCHAR(191) NULL,
    `customInt2State` BOOLEAN NOT NULL DEFAULT false,
    `customInt2Question` VARCHAR(191) NULL,
    `customInt3State` BOOLEAN NOT NULL DEFAULT false,
    `customInt3Question` VARCHAR(191) NULL,
    `customInt4State` BOOLEAN NOT NULL DEFAULT false,
    `customInt4Question` VARCHAR(191) NULL,
    `customCheckbox1State` BOOLEAN NOT NULL DEFAULT false,
    `customCheckbox1Question` VARCHAR(191) NULL,
    `customCheckbox2State` BOOLEAN NOT NULL DEFAULT false,
    `customCheckbox2Question` VARCHAR(191) NULL,
    `customCheckbox3State` BOOLEAN NOT NULL DEFAULT false,
    `customCheckbox3Question` VARCHAR(191) NULL,
    `customCheckbox4State` BOOLEAN NOT NULL DEFAULT false,
    `customCheckbox4Question` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Response` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `templateId` VARCHAR(191) NOT NULL,
    `customString1Answer` VARCHAR(191) NULL,
    `customString2Answer` VARCHAR(191) NULL,
    `customString3Answer` VARCHAR(191) NULL,
    `customString4Answer` VARCHAR(191) NULL,
    `customText1Answer` TEXT NULL,
    `customText2Answer` TEXT NULL,
    `customText3Answer` TEXT NULL,
    `customText4Answer` TEXT NULL,
    `customInt1Answer` INTEGER NULL,
    `customInt2Answer` INTEGER NULL,
    `customInt3Answer` INTEGER NULL,
    `customInt4Answer` INTEGER NULL,
    `customCheckbox1Answer` BOOLEAN NULL,
    `customCheckbox2Answer` BOOLEAN NULL,
    `customCheckbox3Answer` BOOLEAN NULL,
    `customCheckbox4Answer` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Template` ADD CONSTRAINT `Template_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Response` ADD CONSTRAINT `Response_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
