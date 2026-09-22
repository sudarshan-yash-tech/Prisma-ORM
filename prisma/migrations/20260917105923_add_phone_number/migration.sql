/*
  Warnings:

  - You are about to drop the `course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sample_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teachingassignment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `Enrollment_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `enrollment` DROP FOREIGN KEY `Enrollment_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `exam` DROP FOREIGN KEY `Exam_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `mark` DROP FOREIGN KEY `Mark_examId_fkey`;

-- DropForeignKey
ALTER TABLE `mark` DROP FOREIGN KEY `Mark_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `teachingassignment` DROP FOREIGN KEY `TeachingAssignment_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `teachingassignment` DROP FOREIGN KEY `TeachingAssignment_teacherId_fkey`;

-- DropTable
DROP TABLE `course`;

-- DropTable
DROP TABLE `enrollment`;

-- DropTable
DROP TABLE `exam`;

-- DropTable
DROP TABLE `mark`;

-- DropTable
DROP TABLE `sample_users`;

-- DropTable
DROP TABLE `student`;

-- DropTable
DROP TABLE `teacher`;

-- DropTable
DROP TABLE `teachingassignment`;
