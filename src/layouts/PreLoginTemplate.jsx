import React, { Fragment } from 'react'
import { Form, Layout, Menu, Input, Button, Card, Row, Col } from 'antd';
import { Navigate } from 'react-router-dom';
import Logo from '../assests/images/TT Logo.png'



const { Header ,Content} = Layout;
const PreLoginTemplate = ({ children }) => {

    let auth = (localStorage.getItem('pcpAdmin'));    
 
    let data = auth ? JSON?.parse(atob(auth)) :false;
    
    if (data && data?.userid === "SUPER_ADMIN") {
      return  <Navigate to={'/dashboard'} replace />;
    }

    return (
        <Fragment>
             <Layout style={{background:'#fff'}}>
             <Header style={{ position: 'fixed', zIndex: 1, width: '100%',
          background:'#fff',borderBottom:'2px solid #d8d7d7' }}>
                <div className="logo" >
                    <img src={Logo} width={200}/>
                </div>
               
            </Header>
            <Content
                // style={{
                //     padding: '64px 0',
                //     minHeight: `calc(100vh-64px)`,
                // }}
            >
                {children}
            
            </Content>
            </Layout>
        </Fragment>
    )
}

export default PreLoginTemplate