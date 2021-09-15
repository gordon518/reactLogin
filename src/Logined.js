import React, { Component } from 'react'
import {Button, notification} from 'antd'
import style from './css/Logined.css'
import {get, post} from './fetch';

export default class Logined extends Component {

    handleLogout = (e) => {
        var postData={};
        post('/logout', postData).then((response)=> {
            if(!response.err) {
                this.props.saveUserInfo(postData);
			}
            else {
                console.log(response);
				notification['error']({message: response.err});
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
                <p>Welcome: {userInfo.userName}</p>
                <p className={style.centerP}>Welcome my blog~</p>
                <Button type="primary">My Space</Button>
                <Button onClick={this.handleLogout} >Logout</Button>
            </div>
        );
    }
}