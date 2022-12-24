const Order = require('../../../../models/Order');
const moment = require('moment');
const User = require('../../../../models/User');
moment.locale('es')

const orderRegister = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId)
    const { 
      clientName, 
      clientReference, 
      clientPhone, 
      finalPrice, 
      payMethod, 
      clientLocation, 
      clientAddress, 
      totalProducts, 
      orderList, 
    } = req.body

    const newOrder = new Order ({ 
      clientName, 
      clientReference, 
      clientPhone, 
      finalPrice, 
      payMethod, 
      clientLocation, 
      clientAddress, 
      totalProducts, 
      orderList,
      user: user._id,
    })
    newOrder.orderList = [...orderList]
    const savedOrder = await newOrder.save();
    user.orders = user.orders.concat(savedOrder._id)
    await user.save()

    const timeOrder = moment(newOrder.date).format("LT")
    console.log('Se registro la compra')

    res.json({
      success: true,
      msg: 'Se registro la compra',
      time: timeOrder
    })   

  } catch(error) {
    console.log(error);
    return res.json({
      success: false,
      errorMsg: 'Error al realizar la compra'
    })
  }  
}

module.exports = orderRegister