import fs from 'fs-extra';
import { deleteImage, uploadImage } from '../config/cloudinary';
import ProductByCategory from '../data/ProductByCategory';
import Category from '../models/Category';
import Options from '../models/Options';
import Products from '../models/Products'

// agrega un producto
export const postProducts = async (req, res) => {
  try {
    let product = req.body
    const { category } = req.body

    // busca la categoria
    const categorySearch = await Category.find({ category });
    let image = []
    if (req.files?.image) {
      const uploadPromises = req.files.image.map(async (element) => {
        const result = await uploadImage(element.tempFilePath)
        return { public_id: result.public_id, secure_url: result.secure_url }

      })
      image = await Promise.all(uploadPromises);
      product.image = image
      
      req.files.image.map(async (element) => {
        await fs.unlink(element.tempFilePath)
      })
    }
    // si la categoria es invalida tira error
    if (!categorySearch) return res.status(400).send("Invalid Category");

    if (product.options) {

      const optionPromises = product.options.map(async (option) => {
        let newOption = await Options.create({ option, productId: null })
        return newOption._id.toString();
      })
      const optionIds = await Promise.all(optionPromises);

      product.options = optionIds;
    }

    const newProduct = await Products.create(product)
    // Actualiza el productId en las opciones con el _id del producto recién creado
    if (product.options) {
      await Options.updateMany({ _id: { $in: optionIds } }, { productId: newProduct._id });

    }
    if (!newProduct) return res.json({ msg: "no se a podido crear el producto" });

    res.json({ msg: "se a agregado el producto correctamente" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
// devuelve los productos ordena y paginacion y hace la busqueda
export const productsList = async (req, res) => {

  const { header, type, page, limit } = req.query
  try {
    let TOTAL_PAGES = null
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
    if (limit) {
      TOTAL_PAGES = Math.ceil(TOTAL_PRODUCTS.length / limit)
    }
    else {
      TOTAL_PAGES = Math.ceil(products.length / 6)
    }

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
    res.status(500).json({ msg: error.message });
  }
};

//devuelve producto por id
export const getProductById = async (req, res) => {
  try {
    const _id = req.params.productId
    const product = await Products.find({ _id }).populate("category")
    res.status(200).json(product[0]);
  } catch (error) {
    res.status(500).json({ msg: error.message });

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
    product.image.map(async (element) => {
      await deleteImage(element.public_id)
    })
    await deleteImage(product.image)
    res.json({ msg: "se a eliminado el producto correctamente" });
  } catch (error) {
    res.status(500).json({ msg: error.message });

  }
};

export const findProductsByOption = async (req, res) => {
  try {
    const { optionValue, optionPassword } = req.body; // Valor de la opción a buscar, por ejemplo, 'XXL'

    const query = {};
    query[`option.${optionPassword}`] = optionValue;

    const options = await Options.find(query).populate('productId').exec();

    const products = options.map(option => option.productId);


    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });

  }
};

export const searchOption = async (req, res) => {

  try {
    const options = await Options.find({})

    // Array para almacenar los nombres de las claves
    const keyValues = {};

    // Recorrer cada opción para extraer los nombres de las claves
    options.forEach(option => {
      if (option.option) {
        const optionKeys = Object.keys(option.option); // Obtener las claves de attributes
        optionKeys.forEach(key => {
          // Agregar el nombre de la clave al array si no está presente
          if (!keyValues[key]) {
            keyValues[key] = option.option[key];
          }
        });
      }
    });
    // Crear un array con objetos { key, clave } para devolver los nombres de las claves y sus valores
    const result = Object.keys(keyValues).map(key => ({ key, clave: keyValues[key] }));

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });

  }
}