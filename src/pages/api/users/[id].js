import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { name, email } = req.body;
      const user = await prisma.user.update({
        where: { id: parseInt(id as string) },
        data: { name, email },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: { id: parseInt(id as string) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
