import React, {Component} from 'react';
import {Input, Form, Button, notification} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import cookie from 'js-cookie';
import {get, post} from './fetch';
import style from './css/Login.css';

export default (props) => {
    const handleLogin = (values) => {
        var postData={'userName':values.userName, 'password':values.password};
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
