/*
  Warnings:

  - You are about to drop the `course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sample_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `Enrollment_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `Enrollment_studentId_fkey`;

-- DropTable
DROP TABLE `course`;

-- DropTable
DROP TABLE `enrollment`;

-- DropTable
DROP TABLE `sample_users`;

-- DropTable
DROP TABLE `student`;
