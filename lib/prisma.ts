// /lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();  // Use let in implementation
  }
  prisma = globalThis.prisma;  // Safely assign it to globalThis.prisma
}

export default prisma;
