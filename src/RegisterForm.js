import React,{Component} from 'react'
import {Input,Form, Button} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import style from './css/Login.css'

export default class RegisterForm extends Component{

    render(){
        return(
            <Form className={style.formStyle}>

				<Form.Item name='userName' rules={[{required: true, message: '请输入用户名!'}]} >
                        <Input prefix={<UserOutlined style={{fontSize: 13}}/>} placeholder="Username"/>
                </Form.Item>

                <Form.Item name='password' rules={[{required: true, message: '请输入密码!'}]} >
                        <Input prefix={<LockOutlined style={{fontSize: 13}}/>} type="password"
                               placeholder="Password"/>
                </Form.Item>

                <Form.Item name='passwordRe' rules={[{required: true, message: '请输入密码!'}]} >
                        <Input prefix={<LockOutlined style={{fontSize: 13}}/>} type="password"
                               placeholder="Repeat password"/>
                </Form.Item>

				<Form.Item>
                    <Button className={style.loginButton} type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
