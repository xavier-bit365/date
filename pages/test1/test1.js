let name =''
let date = ''

Page({
  onLoad(){
    this.getList()
  },
  //获取列表数据
  getList(){
    wx.cloud.database().collection("events")
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
    console.log('点击了跳转事件详情的id',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/test2/test2?id=' + e.currentTarget.dataset.id,
    })
  },
  //获取用户输入的事件
  getname(e){
    name=e.detail.value
    console.log(name)
  },
  //获取用户输入的商品日期
  getdate(e){
    date=e.detail.value
    console.log(date)
  },
  //添加商品到数据库
  addname(){
    console.log('事件',name)
    console.log('日期',date)
    if (name ==''){
      wx.showToast({
        icon:'none',
        title: '事件为空了',
      })
    }
    else if (date ==''){
      wx.showToast({
        icon:'none',
        title: '日期为空了',
      })
    }
    else {
      //添加操作
      console.log('可以进行添加操作了')
      wx.cloud.database().collection('events')
        .add({
          data:{
          name:name,
          date:date    
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
  }
})