import ProductsData from "@/public/ProductsData";

export const getProductById = (productId) => {
    const product = ProductsData.find(product => product.id === productId);
    if (!product) {
        throw new Error(`Product with id ${productId} not found`);
    }
    return product;
}
