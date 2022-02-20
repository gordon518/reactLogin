import React, {Component} from 'react';
import {Input, Form, Button, notification} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import JSEncrypt from 'jsencrypt';
import cookie from 'js-cookie';
import {get, post} from './fetch';
import style from './css/Login.css';

const publicKey = 
`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwNAiZQKSICH+psi9k1NR
8x5+DqsnHfK/WAEqW6i2vLIbmcCwbJVx/rrf4g5z23qaZqV00PwMiDKCqgRNyGsY
LeW6wdh9QeYUSoqM2LJKndmInQyUPt1zemPKo5Z9xDDDAguM//mi1jD1WWeVkCDN
nKjviJkmYI+CU75QFjDl3b5yBKnuK15HeuKwROl80OZ5xaoH0NBGefdc5/ZsaWwa
xfKCXCwj0PFC7UdtC2dHD0mU8C8pDmfK5hCY8E2RFm2CfI2qpda3JXYq7LbO6/nR
u4U9Wv5vHqd07x495fHiKLsMTj1erzHEyqJGm9RwN2xuxfdK1nNkpP1X1bJd9Pen
kwIDAQAB
-----END PUBLIC KEY-----
`

export default (props) => {
    const handleLogin = (values) => {
        //First Encrypt password
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        var postData={'userName':values.userName, 'password':encrypt.encrypt(values.password)};
        //Then call URL to login
        props.setFetch(true);
        post('/login', postData).then((response)=> {
            var ret=JSON.parse(response);
            props.setFetch(false);
            if(!ret.err) {
                props.saveUserInfo(postData);
                cookie.set('token',ret.token);
            }
            else {
                console.log(ret);
                notification['error']({message: ret.err});
            }
        }).catch((error)=> {
            props.setFetch(false);
            console.log(error);
            notification['error']({message: error});
        });
    };

    return (
        <Form onFinish={handleLogin} className={style.formStyle}>

            <Form.Item name='userName' rules={[{required: true, message: 'Pls input username!'}]} >
                <Input prefix={<UserOutlined style={{fontSize: 13}}/>} placeholder="Username" autoFocus />
            </Form.Item>

            <Form.Item name='password' rules={[{required: true, message: 'Pls input password!'}]}>
                <Input prefix={<LockOutlined style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
            </Form.Item>

            <Form.Item>
                <Button className={style.loginButton} type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};
