import Products from "../models/Products";

const ProductByCategory = async({ filter, PAGE, LIMIT, header = "name", type = 1 }) => {
    return await Products.find(filter)
            .skip(PAGE > 0 ? ((PAGE - 1) * LIMIT) : 0)
            .limit(LIMIT)
            .sort({ [header]: (type) })
}
 
export default ProductByCategory;