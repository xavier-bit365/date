Page({
  onLoad() {},
  add(){
    wx.cloud.database().collection('goods')
    .add({
    data: {
      name:'菠萝',
      price: 10
    }
  })
  .then(res =>{
    console.log('添加成功',res)
  })
  .catch(res =>{
    console.log('添加失败',res)
  })
}
  })