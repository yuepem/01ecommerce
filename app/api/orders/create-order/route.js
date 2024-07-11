/* import { db } from '@/server/index';
import { orders } from '@/server/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid';

const createOrderSchema = z.object({
  status: z.enum(['pending', 'processing', 'completed', 'cancelled']).optional(),
  total: z.number().positive(),
});

export async function createOrder(req, res) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, req.method, 'POST');
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ error: 'You must be logged in to create an order.' });
    }

    const userId = session.user.id;
    const validatedData = createOrderSchema.parse(req.body);

    const newOrder = await db.insert(orders)
      .values({
        id: uuidv4(), // Generate a new UUID for the order
        userId: userId,
        status: validatedData.status || 'pending',
        total: validatedData.total,
      })
      .returning();

    if (!newOrder || newOrder.length === 0) {
      throw new Error('Failed to create order');
    }

    const createdOrder = newOrder[0];

    return res.status(201).json(createdOrder);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Failed to create order:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
}

function methodNotAllowed(res, method, allowedMethod) {
  res.setHeader('Allow', [allowedMethod]);
  return res.status(405).end(`Method ${method} Not Allowed`);
} */