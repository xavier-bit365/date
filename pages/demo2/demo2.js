let price= ''
let id=''
Page({
  data:{
    good:{}
  },
  onLoad(options){
    console.log('列表携带的值',options)
    id=options.id
    this.getDetail()
  },
  //获取商品数据
  getDetail(){
    //查询单条数据 doc
    wx.cloud.database().collection('goods')
    .doc(id)
    .get()
    .then(res =>{
      console.log('商品详情页请求成功',res)
      this.setData({
        good:res.data
      })
    })
    .catch(res =>{
      console.log('商品详情页请求失败',res)
    })
  },
  //获取用户输入的新价格
  getPrice(e){
    price = e.detail.value
  },
  //修改商品价格
  update(){
    console.log('新的商品价格',price)
    if (price==''){
      wx.showToast({
        icon:'none',
        title: '价格为空啦',
      })
    }
    else{
      wx.cloud.database().collection('goods')
      .doc(id)
      .update({
        data:{
          price:price
        }
      })
      .then(res=>{
        console.log('更新成功',res)
        this.getDetail()
      })
      .catch(res=>{
        console.log('更新失败',res)
      })
    }
  },
  //删除操作
  shanchu(){
    console.log('点击了删除',id)
    //弹窗提示
    wx.showModal({
      title:"是否确定删除",
      content:'再仔细想一想，是否真的要删除，删除后就找不回来了',
      success(res){
        console.log("tishi",res)
        console.log("tishi",res.confirm)
        console.log("tishi",res.cancel)
        if(res.confirm==true){ //用户点击了确定
          console.log('用户点击了确定')
          //删除操作
          wx.cloud.database().collection('goods')
          .doc(id)
          .remove()
          .then(res=>{
            console.log('删除成功',res)
            wx.navigateTo({
              url: 'pages/demo1/demo1',
            })
          })
          .catch(res=>{
            console.log('删除失败',res)
          })
        }
        else if(res.cancel == true){ //用户点击了取消
          console.log('用户点击了取消')
          }
        }
    })
  }
})