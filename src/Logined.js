import React, { Component } from 'react'
import {Button, notification} from 'antd'
import style from './css/Logined.css'
import {get, post} from './fetch';

export default class Logined extends Component {

    handleLogout = (e) => {
        var postData={};
        post('/logout', postData).then((response)=> {
            if(response.retCode==0) {
                this.props.saveUserInfo(postData);
			}
            else {
                console.log(response);
				notification['error']({message: response.retMsg});
			}
		}).catch((error)=> {
			console.log(error);
			notification['error']({message: error});
		});
    }

    render() {
        const {userInfo} = this.props;
        return(
            <div className={style.container}>
                <img src={require('./css/timg.jpeg')}/>
                <p>欢迎：{userInfo.userName}</p>
                <p className={style.centerP}>光临我的博客~</p>
                <Button type="primary">我的空间</Button>
                <Button onClick={this.handleLogout} >登出</Button>
            </div>
        );
    }
}