import { Layout } from 'antd';
import React from 'react';
import Logo from '../assests/images/TT Logo.png'




const { Header, Footer, Sider, Content } = Layout;

const MainTemplate = ({children}) => {
    return (
        <Layout style={{background:'#fff'}}>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%',
          background:'#fff',borderBottom:'2px solid #d8d7d7' }}>
                <div className="logo" >
                    <img src={Logo} width={200}/>
                </div>
               
            </Header>
            <Content
                style={{
                    padding: '64px 50px 0 50px',
                    minHeight: `100vh`,
                }}
            >
                {children}
            
            </Content>
          
        </Layout>
    )
}

export default MainTemplate