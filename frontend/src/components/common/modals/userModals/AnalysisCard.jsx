import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { useEffect,useState } from 'react';
import {accountDetail} from '@/services/account.js'

import { MyResponsiveCalendar } from '../../../mypage/graph/calendar';
import { MyResponsiveLine } from '../../../mypage/graph/line';
import { MyResponsivePie } from '../../../mypage/graph/pie';
import { MyResponsiveRadar } from '../../../mypage/graph/radar';
import { MyResponsiveTimeRange } from '../../../mypage/graph/timerange';


import * as mypage from '@/services/mypage'
import * as emotions from '@/services/emotion'
import * as user from '@/services/user'
const AnalysisCard=()=>{
    const [flag,setFlag]=useState(false);
    const [flagLine,setFlagLine]=useState(false);
    const [flagCal,setFlagCal]=useState(false);

    const [name,setName]=useState(sessionStorage.getItem('nickname'))
    const [goal,setGoal]=useState()
    const [account,setAccount]=useState();
    const [ratio,setRatio]=useState();
    const [pieData,setPieData]=useState();
    const [lineData, setLineData] = useState([])
    const [calendarData, setCalendarData] = useState([])
    const [renderTest, setRenderTest] = useState(0)

    async function fetchData() {
        {
            const response = await accountDetail(sessionStorage.getItem('userId'));
            setAccount( response.data.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            setGoal(response.data.goal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            setRatio((response.data.balance/response.data.goal)*100)
        } 
    }

    async function mypageTest() {
      let result = await mypage.mypageDepositLine(sessionStorage.getItem('userId'))
      console.log('mypageDepositLine',result)
      const data = result.data.data.map(item => ({
        x: item.x.slice(5), // Extract MM-DD from date
        y: Math.round(item.y / 10000 * 10) / 10 + '만' // Convert y value and append '만'
    }));
      let line = [
        {
          "id": "user",
          "color": "hsl(212, 70%, 50%)",
          "data": data
        }
      ]
      console.log(line)
      setLineData(line)
    }

    async function emotionTest() {
        let memos = memo
        setMemo('')
        let emotion = await emotions.emotionAI({'userId':sessionStorage.getItem('userId'),'memo':memos})
        console.log(emotion)
        setData(
          [
            {
              "emotion": "공포",
              'user': 10 + parseFloat(emotion.data.fear)
            },
            {
              "emotion": "놀람",
              'user': 10 + parseFloat(emotion.data.surprise)
            },
            {
              "emotion": "화남",
              'user': 10 + parseFloat(emotion.data.angry)
            },
            {
              "emotion": "슬픔",
              'user': 10 + parseFloat(emotion.data.sadness)
            },
            {
              "emotion": "중립",
              'user': 10 + parseFloat(emotion.data.neutral)
            },
            {
              "emotion": "행복",
              'user': 10 + parseFloat(emotion.data.happiness)
            },
            {
              "emotion": "혐오",
              'user': 10 + parseFloat(emotion.data.disgust)
            }
          ]
        )
        setFlagLine(true)
      }

      async function getCalendar() {
        let a = await user.userAccountCheck(sessionStorage.getItem('userId'))
        console.log(a)
        let result = await mypage.mypageCalendar(sessionStorage.getItem('userId'))
        console.log(result)
        setCalendarData(result.data)
        setFlagCal(true)
      }
      


    async function getPieData() {
        console.log('test')
        let result = await mypage.mypageEmotionRank(sessionStorage.getItem('userId'))
        console.log(result)
        setPieData(
          [
            {
              "id": "공포",
              "value": result.data.fear,
              "color": "hsl(273, 70%, 50%)"
            },
            {
              "id": "놀람",
              "value": result.data.surprise,
              "color": "hsl(274, 70%, 50%)"
            },
            {
              "id": "화남",
              "value": result.data.angry,
              "color": "hsl(179, 70%, 50%)"
            },
            {
              "id": "슬픔",
              "value": result.data.sadness,
              "color": "hsl(47, 70%, 50%)"
            },
            {
              "id": "중립",
              "value": result.data.neutral,
              "color": "hsl(160, 70%, 50%)"
            },
            {
              "id": "행복",
              "value": result.data.happiness,
              "color": "hsl(86, 70%, 50%)"
            },
            {
              "id": "혐오",
              "value": result.data.disgust,
              "color": "hsl(112, 70%, 50%)"
            }
          ]
        )
        setFlag(true)
      }

    
    useEffect(()=>{
        fetchData()
        mypageTest()
        getPieData()
        getCalendar()
        emotionTest()
    },[])

    
    return ( 
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
            maxHeight: '850px',
            
          }}>
      
            <Container style={{marginTop:'50px'}}>

                        <Card style={{position: 'fixed', top: '11%', left: '15%', height:'237px',width:'270px'}}>
                          <Card.Title className="text-center" style={{marginTop:'17px'}}> <b>누적저축액</b></Card.Title>
                          <Card.Body className="text-center">
                                    <h4 style={{marginTop:'-10px'}}>₩{account}</h4>
                                
                                    <img src="/assets/running.gif" style={{width:'60px',marginTop:'13px',marginBottom:'10px'}}></img>
                                
                                    <p style={{fontSize:'12px',marginRight:'10px',marginTop:'4px',marginBottom:'-1px'}}>목표금액: ₩{goal}</p>
                               
                                <div style={{width:'160px',marginLeft:'-13px'}}>
                                <ProgressBar animated now={ratio} style={{marginLeft:'50px', marginTop:'3px',width:'150px'}} />
                                </div>
                             
                          </Card.Body>
                        </Card>
                       
                        <Card style={{position: 'fixed', top: '11%', left: '35%', height:'237px',width:'735px'}}>
                        <Card.Title className="text-center" style={{marginTop:'17px',marginBottom:'-10px'}}><b>저축캘린더</b></Card.Title>
                            <Card.Body>
                           
                                {flagCal && 
                                    <div style={{height:'180px', width:'700px'}}>
                                      <MyResponsiveTimeRange data={calendarData}></MyResponsiveTimeRange>
                                    </div>
                                  }
                             
                            </Card.Body>
                        </Card>
                   
                    
                        <Card style={{position: 'fixed', top: '45%', left: '15%', width:'450px',height:'328px'}} >
                        <Card.Title className="text-center" style={{marginTop:'17px'}}>
                          <b>감정빈도그래프</b>
                        </Card.Title>
                                <Card.Body>
                                { flagCal == true &&
                                    <div style={{height:'250px',width:'450px'}}>
                                        <MyResponsivePie data={pieData}></MyResponsivePie>
                                    </div>
                                }
                                </Card.Body>
                            </Card>
                        
                        <Card style={{position: 'fixed', top: '45%', left: '47.5%', width:'555px', height:'328px'}}>
                        <Card.Title className="text-center" style={{marginTop:'17px',marginBottom:'-40px'}}>
                          <b>저축금액추이</b>
                        </Card.Title>
                            <Card.Body style={{marginLeft:'50px'}}>
                            { flagCal == true &&
                                <div style={{height:'300px',width:'500px'}}>
                                <MyResponsiveLine data={lineData}></MyResponsiveLine>
                                </div>
                            }
                            </Card.Body>

                        </Card>
                    
                    
               
             </Container>
          </div>
      )
}

export default AnalysisCard