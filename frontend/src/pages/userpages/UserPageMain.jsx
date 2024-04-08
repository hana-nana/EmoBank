import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import "@/styles/common/UserPageMain.css";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const UserPageMain = () => {
  const navigate = useNavigate();

  const onClick = () => {
    window.location.href = '/Home';
    
  };

  return (
    <>
    <img src="/assets/curtain.png" style={{position: 'fixed', top: '0', width:'100%', zIndex: '1' }}/>
    <img src="/assets/초록커튼.png" alt="" style={{position: 'fixed', top: '0%', left: '0',  zIndex: '0' }}/>
    <img src="/assets/초록커튼.png" alt="" style={{ position: 'fixed', top: '0%', right: '0',  zIndex: '0' }}/>
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <img src="/assets/bankhome.svg" alt="bankhome" onClick={onClick} style={{ position: 'fixed', top: '16%', right: '84%', width: '3%', zIndex: '2', cursor: 'pointer' }}/>
      <div style={{ fontFamily: 'SF_HambakSnow', zIndex: '2', display: 'flex' }}>
        <Link to="userpagemodify" style={{ color: 'white', textDecoration: 'none' }}><h4 style={{ textDecoration: 'none', padding: '100px', textShadow: 'white 5px 5px 5px'}}>회원정보수정</h4></Link>
        <Link to="userpageaccountmodify" style={{ color: 'white', textDecoration: 'none' }}><h4 style={{ textDecoration: 'none', padding: '100px', textShadow: 'white 5px 5px 5px' }}>통장정보수정</h4></Link>
        <Link to="userpageemotionlist" style={{ color: 'white', textDecoration: 'none' }}><h4 style={{ textDecoration: 'none', padding: '100px', textShadow: 'white 5px 5px 5px' }}>감정통계</h4></Link>
      </div>
    </div>
    </>
  );
}

export default UserPageMain;


{/* <ListGroup.Item >
      <Link to="userpagesavinglist">감정저축내역</Link>
      </ListGroup.Item> */}