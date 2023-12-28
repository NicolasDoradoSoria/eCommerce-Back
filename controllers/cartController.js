import Cart from "../models/Cart";
import Products from "../models/Products";


//agrega un pedido al carrito
export const generateOrder = async (req, res) => {
  const { id, quantity } = req.body
  try {

    // devuelve el usuario logeado
    const userId = req.userId
    //devuelve el carrito si es que existe si no existe crea uno
    let cart = await Cart.find({ user: userId }).populate({ path: "products.id", model: "Cart" })
    //devuelve el producto que se va a agregar al carrito
    let product = await Products.find({ _id: id })
    console.log(product)
    if (!product[0]) return res.status(404).json({ msg: "el producto no existe" });

    // si existe un carrito 
    if (cart[0]) {
      let itemIndex = cart[0].products.findIndex(product => product.id._id == id);
      //product exists in the cart, update the quantity
      if (itemIndex > -1) {
        let productItem = cart[0].products[itemIndex]

        productItem.quantity += quantity;
        // si la cantidad es positiva multiplica la cantidad por el precio unitario y lo guarda en productItem.id.price si es 
        // negativa la cantidad le resto productItem.id.price al total
        quantity >= 1 ? productItem.price = productItem.id.price * productItem.quantity : productItem.price = productItem.price - productItem.id.price

        cart[0].products[itemIndex] = productItem;
      }
      else {
        //product does not exists in cart, add new item
        const price = quantity * product[0].price

        cart[0].products.push({ id, quantity, price });
      }

      await cart[0].save();
      return res.json({ msg: "el producto a sido agregado correctamente" });
    }
    else {
      //no cart for user, create new cart
      const price = product[0].price * quantity
      // es el precio unitario por la cantidad
      const newCart = Cart.create({
        user: userId,
        products: [{ id, quantity, price }],
      })


      if (!newCart) return res.status(404).json({ msg: "no se a podido crear el producto" });

      return res.json({ msg: "el producto a sido agregado correctamente" });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: error.message });
  }

};

//muestra un carrito por ID de usuario
export const getCart = async (req, res) => {
  try {
    const userId = req.userId
    const cart = await Cart.find({ user: userId }).populate({ path: "products.id", model: "Product" })

    if (cart.length == 0) return res.status(404).json({ msg: "el carrito no a sido creado" })
    
    //mostrar el carrito
    res.json(cart);
  } catch (error) {
    res.status(500).json({ msg: error.message });

  }
};

//elimina un producto por ID del carrito
export const deleteProductCart = async (req, res) => {

  const { idUser, idCart } = req.params
  
  try {
    const deletedcart = await await Cart.findOneAndUpdate({ user: idUser }, { $pull: { products: { _id: idCart } } });

    if (!deletedcart) return res.json({ msg: "el producto del carrito no se a podido eliminar" })

    res.json({ msg: "el producto se a eliminado" })

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });

  }
};


//elimina todos los productos del carrito por ID
export const deleteOrder = async (req, res) => {
  try {
    const user = req.params.idUser
    await Cart.findOneAndDelete(user)
    res.json({ msg: "el carrito fue limpieado correctamente" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: error.message });

  }
}

// actualiza el resumen de compra total, subTotal y descuento del cliente
export const summary = async (req, res) => {

  try {
    const userId = req.userId
    let cart = await Cart.find({ user: userId }).populate({ path: "products.id", model: "Cart" })

    // calulo el subtotal sin descuento
    cart[0].subtotal = cart[0].products.reduce((productAnt, productActual) => {
      return productAnt + productActual.id.originalPrice * productActual.quantity
    }, 0)

    // calculo el descuento 
    const discount = cart[0].products.reduce((productAnt, productActual) => {
      return productAnt + productActual.id.price * productActual.quantity
    }, 0)

    // guardo la diferencia entre el subtotal y el descuento 
    cart[0].discount = -cart[0].subtotal + discount
    cart[0].total = cart[0].subtotal + cart[0].discount
    await cart[0].save();

    return res.status(200).json({
      subtotal: cart[0].subtotal,
      discount: cart[0].discount,
      total: cart[0].total
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
}
