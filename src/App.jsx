import { useState } from 'react'
import './App.css'
import {Layout, Space} from "antd";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Header from "/src/components/header/Header.jsx";
import Homepage from "/src/components/pages/Homepage.jsx";
import User from "/src/components/pages/User.jsx";
import Login from "/src/components/pages/Login.jsx";
import Wallet from "/src/components/pages/Wallet.jsx";
import Deposit from "/src/components/pages/Deposit.jsx";
import Test from "/src/components/pages/Test.jsx";
import Exchange from "/src/components/pages/Exchange.jsx";
import FooterPage from "/src/components/footer/footer.jsx";
import IDAuth from '/src/components/pages/IDAuth.jsx';
import PrimaryKYC from '/src/components/pages/PrimaryKYC.jsx';
import AdvancedKYC from '/src/components/pages/AdvancedKYC.jsx';
import Security from '/src/components/pages/Security.jsx';
const { Content } = Layout; 

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};
function App() {
  return (
    <BrowserRouter>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout>
          <Header />
          <Content>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<User />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/test" element={<Test />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/idauth" element={<IDAuth />} />
              <Route path="/primarykyc" element={<PrimaryKYC />} />
              <Route path="/advancedkyc" element={<AdvancedKYC />} />
              <Route path="/security" element={<Security />} />
            </Routes>
          </Content>
          <FooterPage />
        </Layout>
      </Space>
    </BrowserRouter>
  );
}

export default App
