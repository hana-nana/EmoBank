import ReactModal from "react-modal"
import { accountDetail } from "../../../../services/account"
import { useEffect } from "react"
import { useState, useRef } from "react"
import "@/styles/common/AccountsCreateFormResult.css"
import { useNavigate } from "react-router-dom"

const CreateResult = () => {
    const navigate = useNavigate()
    let [mainImg,setMainImg] = useState(null);


    const [result, setResult] = useState([])
    const accountResult = async () => {
        let response
        try {
        const token = sessionStorage.getItem('token')
        const userId = sessionStorage.getItem('userId')
        response = await accountDetail(userId, token)
        setResult(response.data)
        console.log(response.data)
        if (response.data.imageUrl) {
            setMainImg(response.data.imageUrl)}
    }
    catch (error) {
        console.log('에러', error)
        alert('계좌정보를 불러올 수 없습니다.')
    }
    
}
    useEffect(() => {
        accountResult()
    },[])

const goMain = () => {
    console.log(1111)
    navigate('/Home')
}

const container1 = useRef(null);
const container2 = useRef(null);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (container1.current) {
          container1.current.classList.add("sign-in");
        }
      }, 500);

      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (container2.current) {
          container2.current.classList.add("sign-in");
        }
      }, 500);

      return () => clearTimeout(timer);
    }, []);


    return (
        <>
        <div className='createcontainer'>
        <div id="container1" className="container1" ref={container1}>
        <div id="container2" className="container2" ref={container2}>
        <img src="/assets/curtain.png" className="curtain1" />
    

        <p className='resulttitle'>저희 은행의 가족이 되신걸 환영합니다</p>
        <div className="bankbookcontainer">
        <div className="goal">
            목표금액 : {result.goal}
        </div>
        <hr />
        <div className="image">
            <div>

            <img src={mainImg} alt="IMG" 
            style={{border: "solid 1px lightgray", borderRadius: "5px", }}/>
            </div>
        </div>
        <hr />

        <div className="owner">
            예금주 : {result.name}님
        </div>

        <div className="balance">
            계좌잔액 : {result.balance}
        </div>
        <div className="createDate">
            게좌개설일 : {result.createAt? result.createAt.slice(0,10): result.createAt}
        </div>
        <p className="logo-title" style={{color:'black' }}>감정저축은행</p>
        <img className="stamp" src="/assets/image10.png" alt="stamp" />
        <button className="gohome" onClick={goMain}>은행으로</button>
        </div>



        <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-up"></div>
          <div className="img sign-up"></div>
        </div>
      </div>

    </div>
    </div>
    </div>
    </>
    )
}

export default CreateResult