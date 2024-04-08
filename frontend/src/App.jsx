import {createContext,useState} from 'react';
import { Route, Routes } from "react-router-dom";

import "./styles/common/App.css";

import Home from "./pages/Home";
import UserPageMain from "./pages/userpages/UserPageMain";
import Donation from "./pages/Donation";
import UserPageModify from "./pages/userpages/UserPageModify";
import UserPageAccountModify from "./pages/userpages/UserPageAccountModify";
import UserPageSavingList from "./pages/userpages/UserPageSavingList";
import UserPageEmotionList from "./pages/userpages/UserPageEmotionList";
import NotFound from "./pages/userpages/NotFound";
import AuthJoin from "./pages/auth/AuthJoin"
import AuthLogin from "./pages/auth/AuthLogIn"
import AuthModifyPassword from "./pages/auth/AuthModifyPassword"
import InitialPage from "./pages/InitialPage";
import MyPage from "./pages/MyPage";
import CreateResult from "./components/common/modals/accountModals/AccountsCreateFormResult";
import AccountsCreate from "./pages/accounts/AccountsCreate";
import DonationRecommendList from './components/common/modals/donationModals/DonationDialogForm';
import FrameList from './pages/frames/FrameList'

export const GlobalContext= createContext({
  proximity: "",
  keyPressed: "",
  zoomed:false,
  modalState: "",
  donation:"",
  account:"",
  gender:"",
})


function App() {
  const [proximity,setProximity]=useState("")
  const [pressedKey, setPressedKey]=useState("")
  const [modalState, setModalState]=useState("")
  const [zoomed, setZoomed]=useState(false)
  const [donation,setDonation]=useState("")
  const [account,setAccount]=useState("")
  const [gender, setGender]=useState("")

  return (
 
    <GlobalContext.Provider value= {{proximity,setProximity,pressedKey, setPressedKey,zoomed,setZoomed,
    modalState,setModalState,donation,setDonation,account,setAccount, gender, setGender}}>
    <div className="App" >
      

      <Routes>
        <Route path="/accountscreate" element={<AccountsCreate/>}/>
        <Route path="/accountscreate/accountcreateformresult" element={<CreateResult/>}/>
        <Route path="/" element={<InitialPage/>}/>
        <Route path="/authlogin" element={<AuthLogin/>}/>
        <Route path="/authlogin/authmodifypassword" element={<AuthModifyPassword/>}/>
        <Route path="/authjoin" element={<AuthJoin/>}/>
        <Route path="/authlogin/authjoin" element={<AuthJoin/>}/>
        <Route exact path="/home" element={<Home/>} />
        <Route path="/donationrecommendlist" element={<DonationRecommendList />}/>
       
        <Route path="/userpagemain/*" element={<UserPageMain/>} />
        <Route path="userpagemain/userpagemodify" element={<UserPageModify />} />
        <Route path="userpagemain/userpageaccountmodify" element={<UserPageAccountModify />} />
        <Route path="userpagemain/userpagesavinglist" element={<UserPageSavingList />} />
        <Route path="userpagemain/userpageemotionlist" element={<UserPageEmotionList/>} />
        <Route path="/donation" element={<Donation />} />
        <Route path='*' element={<NotFound/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/framelist' element={<FrameList/>}/>
    </Routes>

        
          </div>
        </GlobalContext.Provider>
    
  );
}

export default App;
