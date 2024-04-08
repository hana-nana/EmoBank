import {useContext } from "react";

import DonationCards from "./donationModals/subsidiaryModals/DonationCards";
import { GlobalContext } from "../../../App";
import DonationCardConfirm from "./donationModals/subsidiaryModals/DonationCardConfirm";
import DonationHistory from "./donationModals/subsidiaryModals/DonationHistory";
import DonationClose from './donationModals/subsidiaryModals/DonationClose'

const Center = (()=>{

    const {modalState}= useContext(GlobalContext)

    return (
        <>
        <DonationHistory state={modalState}/>
        <DonationCards state={modalState}/>
        <DonationCardConfirm state={modalState}/>
        <DonationClose state={modalState}/>
        </>
    );
})

export default Center;