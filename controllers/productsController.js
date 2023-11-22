import ProductByCategory from '../data/ProductByCategory';
import Category from '../models/Category';
import Options from '../models/Options';
import Products from '../models/Products'

// agrega un producto
export const postProducts = async (req, res) => {
  try {
    let product = req.body
    const { category } = req.body

    const categorySearch = await Category.find({ category });

    if (!categorySearch) return res.status(400).send("Invalid Category");

    const optionPromises = product.options.map(async (option) => {

      let existingOption = await Options.findOne({ name: option.name });

      if (existingOption) {
        return existingOption._id.toString();
      }
      else {
        let newOption = await Options.create(option)
        if (!newOption) return res.json({ msg: "no se a podido crear la option" });
        return newOption._id.toString();
      }
    })

    const optionIds = await Promise.all(optionPromises);

    product.options = optionIds;
    const newProduct = await Products.create(product)

    if (!newProduct) return res.json({ msg: "no se a podido crear el producto" });


    res.json({ msg: "se a agregado el producto correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).send("hubo un error");
  }
};

export const productsList = async (req, res) => {

  const { header, type, page, limit } = req.query
  try {
    let filter = {};
    if (req.body.name) {
      const searchTerm = req.body.name.toLowerCase();
      const regex = new RegExp(searchTerm, 'i'); // 'i' para ignorar mayúsculas/minúsculas
      filter = { ...filter, name: regex }
    }
    // el numero de pagina
    const PAGE = parseInt(page) || 0
    // el limite de productos por pagina
    const LIMIT = parseInt(limit) || 12

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
    const product = await Products.find({ _id }).populate("category")
    res.status(200).json(product[0]);
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

//elimina producto por id
export const deleteProductById = async (req, res) => {

  try {
    const _id = req.params.productId

    const product = await Products.find({ _id });
    //si el producto existe o no
    if (!product[0]) {
      return res.status(404).json({ msg: "no existe ese producto" });
    }
    const deletedProduct = await Products.findByIdAndDelete(_id)

    if (!deletedProduct) {
      return res.status(404).json({ msg: "no se a podido eliminar el producto" });
    }

    res.json({ msg: "se a eliminado el producto correctamente" });
  } catch (error) {
    res.status(500).send("hubo un error");
  }
};

