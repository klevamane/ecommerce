import express from 'express';

import ShoppingCart from '../controllers/ShoppingCart';

const router = express.Router();

// customers
router.get('/generateUniqueId', ShoppingCart.generateUniqueId);
router.post('/add', ShoppingCart.addProductInCart);
router.delete('/empty/:cart_id', ShoppingCart.emptyCart);
router.get('/totalAmount/:cart_id', ShoppingCart.getTotalAmountInCart);
router.get('/saveForLater/:item_id', ShoppingCart.saveItemForLater);
router.get('/getSaved/:cart_id', ShoppingCart.getItemsSavedForLater);
router.delete('/removeProduct/:item_id', ShoppingCart.removeItemFromCart);

export default router;
