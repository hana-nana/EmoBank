import { useEffect,useState } from "react";
import Dialog from "./gameModals/GameDialogForm";
import DonationDialogForm from "./donationModals/DonationDialogForm";
import UserData from "./accountModals/UserData";

const Dialogue = (()=>{

    const [modalIsOpen] = useState(false)
      useEffect(()=>{
      },[modalIsOpen])
    return (
        <>
          <UserData/>
          <DonationDialogForm isOpen={modalIsOpen}/>
          <Dialog isOpen={modalIsOpen} />
        </>
    );
})

export default Dialogue;