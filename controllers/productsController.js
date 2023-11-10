import ProductByCategory from '../data/ProductByCategory';
import Products from '../models/Products'

// agrega un producto
export const postProducts = async (req, res) => {
  try {
    let product = req.body

    const newProduct = await Products.create(product)

    if (!newProduct) return res.json({ msg: "no se a podido crear el producto" });


    res.json({ msg: "se a agregado el producto correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

export const getProducts = async (req, res) => {

  const { header, type, page, limit } = req.query
  try {
    // el numero de pagina
    const PAGE = parseInt(page) || 0
    // el limite de productos por pagina
    const LIMIT = parseInt(limit) || 12
    let filter = {};

    let products = await ProductByCategory({ filter, PAGE, LIMIT })

    // devuelve todos los products
    const TOTAL_PRODUCTS = await Products.find({})
    // calcula el total de paginas segun lo que de TOTAL_PRODUCTS / limit
    // const TOTAL_PAGES = Math.trunc(TOTAL_PRODUCTS.length / limit)
    const TOTAL_PAGES = Math.ceil(TOTAL_PRODUCTS.length / limit)

    if (req.query.id) {
      filter = { category: req.query.id.split(",") };
    }
    // esto es xq si no me pasa header undefined
    if (parseInt(type) === 1 || parseInt(type) === -1) {
      products = await ProductByCategory({ filter, header, type, PAGE, LIMIT })
    }
    res.json({ products, TOTAL_PAGES, PAGE });

  } catch (error) {
    console.log(error)
    res.status(500).send("hubo un error");
  }
};

//devuelve producto por id
export const getProductById = async (req, res) => {
  try {
    const _id = req.params.productId
    const product = await Products.find({ _id })
    res.status(200).json(product[0]);
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};
