import Home from "../pages/Home";
import UserPageMain from "../pages/userpages/UserPageMain";
import UserPageModify from "../pages/userpages/UserPageModify";
import UserPageAccountModify from "../pages/userpages/UserPageAccountModify";
import UserPageSavingList from "../pages/userpages/UserPageSavingList";
import UserPageEmotionList from "../pages/userpages/UserPageEmotionList";
import Donation from "../pages/Donation";
import InitialPage from "../pages/InitialPage";
import AuthLogIn from "../pages/auth/AuthLogIn";
import AuthModifyPassword from "../pages/auth/AuthModifyPassword";
import AuthJoin from "../pages/auth/AuthJoin";
import NotFound from "../pages/userpages/NotFound";
import MyPage from "../pages/MyPage";
import DonationRecommendList from "../components/common/modals/donationModals/DonationRecommendList"
import { donationRecommend } from "../services/donation";

export const routerInfo = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "donationrecommendlist",
        element : <DonationRecommendList/>,
        loader: async()=>{
            return donationRecommend('DonationRecommendList')
        }
      },
    ]
  },

  {
    path: "/userpagemain",
    element: <UserPageMain />,
    children: [
      {
        path: "userpagemodify",
        element : <UserPageModify/>,
      },
      {
        path: "userpageaccountmodify",
        element : <UserPageAccountModify/>,
      },
      {
        path: "userpagesavinglist",
        element : <UserPageSavingList/>,
      },
      {
        path: "userpageemotionlist",
        element : <UserPageEmotionList/>,
      },
    ]
  },

  {
    path: "/initialpage",
    element: <InitialPage />,
    children: [
      {
        path: "authlogin",
        element : <AuthLogIn/>,
        children : [
          {
            path: "authmodifypassword",
            element: <AuthModifyPassword/>
          },
          {
            path: "authjoin",
            element: <AuthJoin/>
          },
        ]
      },
      {
        path: "authjoin",
        element : <AuthJoin/>,
      },
    ]
  },

  {
    path: "/donation",
    element: <Donation />,
  },

  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/mypage",
    element: <MyPage />,
  },


]