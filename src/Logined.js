import React from 'react'
import {Button, notification} from 'antd'
import cookie from 'js-cookie';
import style from './css/Logined.css'
import {get, post} from './fetch';

export default (props) => {

    const handleLogout = (e) => {
        var postData={};
        let token=cookie.get('token');
        console.log(token);
        post('/logout', postData, token).then((response)=> {
            if(!response.err) {
                cookie.set('token', "");
                props.saveUserInfo(postData);
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

    const {userInfo} = props;
    return(
        <div className={style.container}>
            <img src={require('./css/timg.jpeg')}/>
            <p>Welcome: {userInfo.userName}</p>
            <p className={style.centerP}>Welcome my blog~</p>
            <Button type="primary">My Space</Button>
            <Button onClick={handleLogout} >Logout</Button>
        </div>
    );

};
