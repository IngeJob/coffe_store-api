const Product = require('../../../../models/Product');
const Category = require('../../../../models/Category');

const productRegister = async (req, res) => {
  try {
    const role = await User.findById ( req.role ) || null;
    if(!(role === 'MANAGER')) {
      return res
        .status(401)
        .json({error: 'Acceso no autorizado'})
    }
    const { name, description, image, price, nameCategory } = req.body
    const nameProduct = await Product.findOne({name});
    const category = await Category.findOne({ name: nameCategory});
    if(nameProduct){
      return res.json({
        success: false,
        errorMsg: 'Ya existe ese producto',
      })
    }
    if(!category){
      return res.json({
        success: false,
        errorMsg: 'No existe esa categoría',
      })
    }
    const newProduct = new Product ({ name, description, image, price, nameCategory: category._id })
    
    const savedProduct = await newProduct.save();
    category.listProducts = category.listProducts.concat(savedProduct._id)
    await category.save()

    res.json({
      success: true,
      msg: 'Se registro el producto'
    })   

  } catch(error) {
    console.log(error);
    return res.json({
      success: false,
      errorMsg: 'Error al crear el producto'
    })
  }  
}

module.exports = productRegister


  