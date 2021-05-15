let name =''
let price = ''

Page({
  onLoad(){
    this.getList()
  },
  //获取列表数据
  getList(){
    wx.cloud.database().collection("goods")
    .get()
    .then(res => {
      console.log('商品列表请求成功',res)
      this.setData({
        list: res.data
      })
    })
    .catch(res => {
      console.log('商品列表请求失败',res)
    })
  },
  //跳转到商品详情页
  goDetail(e){
    console.log('点击了跳转商品详情的id',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/demo2/demo2?id=' + e.currentTarget.dataset.id,
    })
  },
  //获取用户输入的商品名
  getName(e){
    name=e.detail.value
    console.log(name)
  },
  //获取用户输入的商品价格
  getPrice(e){
    price=e.detail.value
    console.log(price)
  },
  //添加商品到数据库
  addGood(){
    console.log('商品名',name)
    console.log('商品价格',price)
    console.log('数字',parseInt(price))
    if (name ==''){
      wx.showToast({
        icon:'none',
        title: '商品名为空了',
      })
    }
    else if (price ==''){
      wx.showToast({
        icon:'none',
        title: '价格为空了',
      })
    }
    else {
      //添加操作
      console.log('可以进行添加操作了')
      wx.cloud.database().collection('goods')
        .add({
          data:{
          name:name,
          price:parseFloat(price)  
          }
        })
        .then(res =>{
          console.log('添加成功',res)
          this.getList()
        })
        .catch(res =>{
          console.log('添加失败',res)
        })
    }
  },
  //按商品价格进行排序
  paixu(){
        wx.cloud.database().collection("goods")
        .orderBy("price",'asc')
        .get()
        .then(res => {
          console.log('商品列表请求成功',res)
          this.setData({
            list: res.data
          })
        })
        .catch(res => {
          console.log('商品列表请求失败',res)
        })
      }
})