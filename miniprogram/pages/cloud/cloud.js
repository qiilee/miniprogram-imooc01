wx.cloud.init();
const db = wx.cloud.database();

Page({
  insert: function () {
    // db.collection('user').add({
    //   data: {
    //     name: 'qilei',
    //     age:20
    //   },
    //   success: res=>{
    //     console.log(res)
    //   },
    //   fail: err=>{
    //     console.log(err)
    //   },      
    // })
    db.collection('user').add({
      data: {
        name: 'qilei',
        age: 20
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  update: function () {
    db.collection('user').doc('79550af2601d0c6702bb0e0e1ffad24a').update({
      data: {
        name: 'qilei',
        age: 18
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  search: function () {
    db.collection('user').where({
      name: "qilei"
    }).get().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  delete: function () {
    db.collection('user').doc('79550af2601d0c6702bb0e0e1ffad24a').remove().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  sum: function () {
    wx.cloud.callFunction({
      name: 'sum',
      data: {
        a: 2,
        b: 3
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  getOpenId: function () {
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  batchDelete: function () {
    wx.cloud.callFunction({
      name: 'batchDelete'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
})