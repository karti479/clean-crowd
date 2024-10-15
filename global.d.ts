// global.d.ts
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;  // Use var in declaration but not in implementation
}

export {};
