import React from 'react'
import { Link } from "react-router-dom"
import '@/styles/common/InitialPage.css'

const InitialPage = () => {
    return (
        <div className='page-background'>
            <div className='initial'>
                <Link className='join' to="authjoin">회원가입</Link>
                <Link className='sign' to="authlogin">로그인</Link>
            </div>
        </div>
    )
}

export default InitialPage
