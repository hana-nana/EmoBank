import React from "react"
import * as account from "/src/services/account.js"
import * as mypage from "/src/services/mypage.js"
import axios from "axios"
async function accountCreate() {
  var data = new FormData()

  data.append('accountTypeUniqueNo','004-1-74fe2deafd3277')
  data.append('userId','CommonHeader6')
  data.append('name','axiosTest')
  data.append('password','1234')
  data.append('goal',12345678)

  console.log(await account.accountCreate(data))
}

async function accountUpdate() {
  var data = new FormData()

  data.append('accountTypeUniqueNo','004-1-74fe2deafd3277')
  data.append('userId','CommonHeader6')
  data.append('name','updateTest')
  data.append('password','1234')
  data.append('goal',87654321)

  console.log(await account.accountCreate(data))
}

class MyPage extends React.Component {
  render () {
    return (
      <div>
        <h1>MyPage</h1>
        <button onClick={async () => {
          var data = await mypage.mypageInfo('userProdTest0')
          console.log('Info', data)
        }}>Info</button>
        <button onClick={async () => {
          var data = await mypage.mypageSum('userProdTest0')
          console.log('Sum',data)
        }}>Sum</button>
        <button onClick={async () => {
          var data = await mypage.mypageAccountHistory('userProdTest0')
          console.log('History',data)
        }}>History</button>
        <button onClick={async () => {
          var data = await mypage.mypageDepositLine('userProdTest0')
          console.log('DepositLine',data)
        }}>DepositLine</button>
        <button onClick={async () => {
          console.log('EmotionRank', await mypage.mypageEmotionRank('1234'))
        }}>EmotionRank</button>
        <button onClick={async () => {
          console.log('EmotionRank', await mypage.mypageUserUpdate({
            "originUserId" : "iiiidddd",
            "updateUserId" : "id",
            "password" : "1234",
            "nickname" : "iiiidddd",
            "gender" : "id"
          }))
        }}>Update</button>
        <button onClick={async () => console.log(await account.accountDetail('userProdTest0'))}>account</button>
        <button onClick={async () => await accountCreate()}>AccountCreate</button>
        <button onClick={async () => await accountUpdate()}>AccountUpdate</button>
      </div>
    )
  }
}

export default MyPage;