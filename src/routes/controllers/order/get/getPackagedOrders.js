const Order = require('../../../../models/Order');

const getPackagedOrders = async (req, res) => {
  try{
    const orders = await Order.find({ status: 'Empaquetado'}).populate('orderList.productId').populate('user')
      res
        .json({
          success: true,
          msg: 'Órdenes empaquetadas',
          data: orders
      })       
  } catch (error){
    console.log(error);
    return res
      .status(202)  
      .json({
        success: false,
        errorMsg: 'Error al obtener las órdenes empaquetadas'
      })
  }
}

module.exports = getPackagedOrders