

import { useState, useEffect,useContext } from "react";

import { donationRecommendAll } from "@/services/donation.js"
import ReactCardSlider from 'react-card-slider-component';

import { GlobalContext} from '@/App'

const DonationCards= (props)=> {
    const [flag,setFlag]=useState(false)
    const [cards,setCards]=useState([])
    const [slide, setSlide]=useState()

    const {setDonation,modalState,setModalState}=useContext(GlobalContext)


    const cardStyle = {
        position: 'fixed',
        top: '30%',
        left: '53.5%',
        transform: 'translate(-50%, -50%)',
        width: '1140px',
        padding: '20px',
        borderRadius: '10px',
        zIndex: '1',
        textAlign: 'center'
      };
      
      const clickSound = new Audio('/sounds/Select.mp3')
      const playClick = () => {
        clickSound.play() }


      const clicked=((donation)=>{
        setModalState("donate-price")
        setDonation(donation)
      })
      
      async function fetchData() {
        const response = await donationRecommendAll();
        setCards(response.data.data);
        setSlide(cards.map(cards => ({
            image: cards.imageUrl,
            title: cards.name,
            description: "모금액: " + addCommasToNumber(cards.currentAmount) + "원", // Format number with commas
            clickEvent: () => {clicked(cards), playClick() }
        })));
    }
    
    function addCommasToNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
        
        useEffect(()=>{
            fetchData();
        },[modalState])


  
    useEffect(()=>{
        if (props.state==="donate-list")
            setFlag(true)
        else
            setFlag(false)
        });

    return (
        <>
        {flag && (
            <div style={cardStyle}>
                <ReactCardSlider slides={slide}/>
            </div>
            )}
        </>
    )
}

export default DonationCards