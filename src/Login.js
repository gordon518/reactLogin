import React, { Component } from 'react'
import {Tabs} from 'antd';
import style from './css/Login.css'
import LoginForm from './LoginForm'
import RegisterForm from "./RegisterForm";

const { TabPane } = Tabs;

export default class Login extends Component {
  render() {
    const {saveUserInfo, setFetch} = this.props;
    return (
            <Tabs defaultActiveKey="1" tabBarStyle={{textAlign: 'center'}} className={style.container}>
                <TabPane tab="Login" key="1">
                    <LoginForm saveUserInfo={saveUserInfo} setFetch={setFetch}/>
                </TabPane>
                <TabPane tab="Register" key="2">
                    <RegisterForm/>
                </TabPane>
            </Tabs>
    );
  }
}
