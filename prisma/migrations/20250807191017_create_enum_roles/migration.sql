-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."Roles" NOT NULL DEFAULT 'User';
