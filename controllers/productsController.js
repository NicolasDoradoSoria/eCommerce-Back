import Products from '../models/Products'

// agrega un producto
export const postProducts = async (req, res) => {

    try {
      let product = req.body
      let images = [];
  
      if (req.files.images.length > 0) {
  
        req.files.images.forEach(element => {
          images.push({
            _id: shortid.generate(),
            fileName: element.filename,
            filePath: element.path,
          });
        });
      }
  
  
      product.images = images
      const newProduct = await Products.create(product)
  
      if (!newProduct) return res.json({ msg: "no se a podido crear el producto" });
  
  
      res.json({ msg: "se a agregado el producto correctamente" });
  
    } catch (error) {
      console.log(error);
      res.status(500).send("hubo un error");
    }
  };

  export const getProducts = async (req, res) => {

    try {
      const products = await Products.find({})

      res.json({ products});
  
    } catch (error) {
      console.log(error)
      res.status(500).send("hubo un error");
    }
  };