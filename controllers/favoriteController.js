import Favorite from "../models/Favorite"
import Products from "../models/Products"

export const postFavoriteProduct = async (req, res) => {
    const { id } = req.body.product
    try {
        const userId = req.userId
        let favorite = await Favorite.find({ user: userId })
            .populate({ path: "favoriteProducts", model: "Product" })
            .populate({ path: 'favoriteProducts', populate: { path: 'category', model: 'Category' } })
            .exec()
        let product = await Products.find({ _id: id })

        if (!product[0]) return res.status(404).json({ msg: "el producto no existe" });

        if (favorite[0]) {
            favorite[0].favoriteProducts.push(id);
            await favorite[0].save();
            return res.json({ msg: "el producto a sido agregado correctamente a la lista de favoritos" });
        }
        else {
            const newFavorite = await Favorite.create({
                user: userId,
                favoriteProducts: [id],
            })

            if (!newFavorite) return res.json({ msg: "no se a podido agregar a la lista de favoritos" });

            return res.json({ msg: "el producto a sido agregado correctamente" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "hubo un error" });
    }
}

export const getFavoriteProduct = async (req, res) => {
    try {
        const userId = req.userId
        const favorite = await Favorite.find({ user: userId })
            .populate({ path: "favoriteProducts", model: "Product" })
            .populate({ path: 'favoriteProducts', populate: { path: 'category', model: 'Category' } })
            .exec()

        if (favorite.length == 0) return res.status(404).json({ msg: "no hay favoritos agregados" })

        res.json(favorite);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'hubo un error' })
    }
}

export const deleteFavoriteProduct = async (req, res) => {
    const { productId } = req.params


    try {

        const filter = { user: req.userId, favoriteProducts: productId };

        // Verificar si el producto está en la lista de favoritos
        const favorite = await Favorite.findOne(filter);

        if(!favorite) return res.json({ msg: "el producto no se encuentra en la lista de favorito del usuario" })

        const deletedFavorite = await Favorite.findOneAndUpdate(
            { user: req.userId },
            { $pull: { favoriteProducts: productId } },
            { new: true }
        );
        if (!deletedFavorite || deletedFavorite.favoriteProducts.includes(productId)) return res.json({ msg: "el producto de favoritos no se a podido eliminar" })

        res.json({ msg: "el producto de favoritos se a eliminado" })

    } catch (error) {
        res.status(500).send("hubo un error");
    }
}