import Category from "../models/Category";


//crea una categoria
export const createCategory = async (req, res) => {
    try {
         const { name } = req.body;

        // Verificar si ya existe una categoría con el mismo nombre
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({ msg: "La categoría con este nombre ya existe." });
        }

        const newCategory = await Category.create(req.body)

        if (!newCategory) return res.status(404).send("the category cannot be created!");

        const categories = await Category.find({})

        res.json({ categories, msg: "la categoria se a creado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
}


//devuelve todas las categorias o filtra una categoria
export const getCategories = async (req, res) => {
    try {

        let categories = await Category.find({})
        categories.forEach(category => {
            category.path = "lista-Productos/" + category._id
        });
        // si no mandamos id devuelve todas las categorias
        if (!req.query.id) return res.status(200).json(categories);

        const search = await Category.find({ _id: req.query.id })

        res.status(200).json(search);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
};

//elimina una categoria
export const deleteCategory = async (req, res) => {
    const { categoryId } = req.params

    try {
        const category = await Category.find({ categoryId })

        if (!category) {
            return res.status(404).json({ msg: "no existe esa categoria" });
        }
        const deletedCategory = await Category.findByIdAndDelete(categoryId)

        if (!deletedCategory) {
            return res.status(404).json({ msg: "no se a podido eliminar la categoria" });
        }

        res.json({ msg: "se a eliminado el producto correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
};

