import React, {Component} from 'react'
import {Input, Form, Button, notification} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {get, post} from './fetch';
import style from './css/Login.css'

export default class LoginForm extends Component {
    handleLogin = (values) => {
        var postData={'userName':values.userName, 'password':values.password};
		this.props.setFetch(true);
        post('/login', postData).then((response)=> {
			this.props.setFetch(false);
            if(response.retCode==0) {
                this.props.saveUserInfo(postData);
			}
            else {
                console.log(response);
				notification['error']({message: response.retMsg});
			}
		}).catch((error)=> {
			this.props.setFetch(false);
			console.log(error);
			notification['error']({message: error});
		});
    };

    render() {
        return (
            <Form onFinish={this.handleLogin} className={style.formStyle}>

                <Form.Item name='userName' rules={[{required: true, message: '请输入用户名!'}]} >
					<Input prefix={<UserOutlined style={{fontSize: 13}}/>} placeholder="Username" autoFocus />
                </Form.Item>

                <Form.Item name='password' rules={[{required: true, message: '请输入密码!'}]}>
					<Input prefix={<LockOutlined style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
                </Form.Item>

                <Form.Item>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

