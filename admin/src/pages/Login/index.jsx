
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, Space, Divider } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import styles from './login.module.scss';

const { Title, Text } = Typography;

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/admin');
      const data = response.data.data[0];
      if (data.email === email && data.password === password) {
        localStorage.setItem('isAuthenticated', 'true'); 
        onLogin();
        navigate('/dashboard');
      } else {
        setError('Invald criedentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form']}>
        <Title level={2} style={{color:'white'}} >Login</Title>
        <Text type="secondary">See your growth and get consulting support!</Text>
   
        <Divider />
        <Form layout="vertical" >
          <Form.Item label="Email" >
            <Input
             style={{backgroundColor:'white'}}
              type="email"
              placeholder="mail@website.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Item>
          {error && <Text type="danger">{error}</Text>}
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles['login-button']} onClick={handleSubmit}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles['login-image']}>
       <img height={670} width={938} src="https://images.unsplash.com/photo-1660914256311-918659fae88f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fDNkJTIwZGFyayUyMGFic3RyYWN0fGVufDB8fDB8fHww" alt="" />
      </div>
    </div>
  );
};

export default Login;
