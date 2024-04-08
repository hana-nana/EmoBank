import { useState, useEffect } from "react"
import useStore from "../../../../../store/zustore"
import Anger from "./GameEmotionAnger"
import Shock from "./GameEmotionShock"
import Sad from "./GameEmotionSad"
import Neutral from "./GameEmotionNeutral"
import Horror from "./GameEmotionHorror"
import Good from "./GameEmotionGood"
import Hate from "./GameEmotionHate"

const Select = () => {
    const { emotion, modalName } = useStore()

    
    const [angry, setAngry] = useState(false)
    const [sadness, setSadness] = useState(false)
    const [fear, setFear] = useState(false)
    const [neutral, setNeutral] = useState(false)
    const [happiness, setHappiness] = useState(false)
    const [disgust, setDisgust] = useState(false)
    const [surprise, setSurprise] = useState(false)

    useEffect(() => {
        {
            switch (emotion) {
                case 'angry':
                    setAngry(true)
                    break
                case 'sadness':
                    setSadness(true)
                    break
                case 'fear':
                    setFear(true)
                    break
                case 'neutral':
                    setNeutral(true)
                    break
                case 'happiness':
                    setHappiness(true)
                    break
                case 'disgust':
                    setDisgust(true)
                    break
                case 'surprise':
                    setSurprise(true)
                    break
                default:
                    
                    setAngry(false)
                    setSadness(false)
                    setFear(false)
                    setNeutral(false)
                    setHappiness(false)
                    setDisgust(false)
                    setSurprise(false)
                    break
            }
        }
       
    }, [emotion, modalName])
    return (
        <div>
            {angry &&
                <Anger />}
            {sadness &&
                <Sad />}
            {neutral &&
                <Neutral />}
            {happiness &&
                <Good />}
            {fear &&
                <Horror />}
            {surprise &&
                <Shock />}
            {disgust &&
                <Hate />}
        </div>
    )
}

export default Select
