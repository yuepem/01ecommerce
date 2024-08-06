import { v4 as uuidv4 } from 'uuid';

export const getOrCreateCartId = () => {
  let cartId = localStorage.getItem('temporaryCartId');
  if (!cartId) {
    cartId = uuidv4();
    localStorage.setItem('temporaryCartId', cartId);
  }
  return cartId;
};