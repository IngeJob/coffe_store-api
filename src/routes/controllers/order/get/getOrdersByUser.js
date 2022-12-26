const Order = require('../../../../models/Order');

const getOrdersByUser = async (req, res) => {
  try{
    const userId = req.userId
    const orders = await Order.find({ user: userId}).populate('orderList.productId').sort({date: 'desc'})
      res
        .json({
          success: true,
          msg: 'Órdenes del ususario',
          data: orders
      })       
  } catch (error){
    console.log(error);
    return res
      .status(202)  
      .json({
        success: false,
        errorMsg: 'Error al obtener las órdenes'
      })
  }
}

module.exports = getOrdersByUser