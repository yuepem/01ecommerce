import { db } from '@/server/index';
import { products } from '@/server/schema';

// GET /api/products : Retrieve all products.
export default async function getAllProducts(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        return;
    }

    try {
        const allProducts = await db.select().from('products');
        if (allProducts.length > 0) {
            res.status(200).json({ products: allProducts, message: "All products retrieved successfully" });
        } else {
            res.status(404).json({ error: 'No products found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}
