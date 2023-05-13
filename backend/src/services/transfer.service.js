const { default: axios } = require('axios');

const configDataFrom = {
  fromName: 'Nguyễn Văn Nam',
  fromAddress: 'Chợ Châu Phong',
  fromWardName: 'Xã Liên Hà',
  fromDistrictName: 'Huyện Đông Anh',
  fromProvinceName: 'Hà Nội',
  fromPhoneNumber: '0346663207',
};
const createOrderTransfer = async (orderData, listProduct) => {
  const payload = {
    payment_type_id: 2,
    note: orderData.note,
    from_name: configDataFrom.fromName,
    from_phone: configDataFrom.fromPhoneNumber,
    from_address: configDataFrom.fromAddress,
    from_ward_name: configDataFrom.fromWardName,
    from_district_name: configDataFrom.fromDistrictName,
    from_province_name: configDataFrom.fromProvinceName,
    required_note: 'KHONGCHOXEMHANG',
    return_name: configDataFrom.fromName,
    return_phone: configDataFrom.fromPhoneNumber,
    return_address: configDataFrom.fromAddress,
    return_ward_name: configDataFrom.fromWardName,
    return_district_name: configDataFrom.fromDistrictName,
    return_province_name: configDataFrom.fromProvinceName,
    client_order_code: '',
    to_name: orderData.buyerName,
    to_phone: orderData.phoneNumber,
    to_address: orderData.address,
    to_ward_name: 'Phường 14',
    to_district_name: 'Quận 10',
    to_province_name: 'TP Hồ Chí Minh',
    cod_amount: 200000,
    content: 'Theo New York Times',
    weight: 200,
    length: 1,
    width: 19,
    height: 10,
    cod_failed_amount: 2000,
    pick_station_id: 1444,
    deliver_station_id: null,
    insurance_value: 10000000,
    service_id: 0,
    service_type_id: 2,
    coupon: null,
    pick_shift: null,
    pickup_time: 1665272576,
    items: listProduct.map((item) => ({
      name: item.name,
      code: item.code,
      quantity: 1,
      price: 10000,
      length: 12,
      width: 12,
      height: 12,
      category: {
        level1: 'Máy tính',
      },
    })),
  };
  const res = await axios.post('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create', payload, {
    headers: {
      ShopId: 123874,
      Token: '274e39a9-d7b3-11ed-ab31-3eeb4194879e',
    },
  });
  if (res.data) {
    console.log('Tạo đơn hàng thành công');
  }
  return res.data;
};

module.exports = { createOrderTransfer };
