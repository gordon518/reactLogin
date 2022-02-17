import React, { useEffect } from 'react'
import {bindActionCreators} from 'redux'
import {useSelector, useDispatch} from 'react-redux'
import { notification } from 'antd';
import cookie from 'js-cookie';

import {actions} from './redux/actions'
import style from './css/App.css'
import Login from './Login'
import Logined from './Logined'
import {Loading} from './Loading'
import {get, post} from './fetch';

export default () => {

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const isFetching = useSelector(state => state.isFetching);
    const saveUserInfo = bindActionCreators(actions.saveUserInfo,dispatch);
    const setFetch = bindActionCreators(actions.setFetch,dispatch);

    // Similar to componentDidMount and componentDidUpdate:
    /* this is session version of useEffect
    useEffect(() => {
        get('/userInfo').then((response)=> {
            //props.setFetch(false);
            var ret=JSON.parse(response);
            if(!ret.err) {
                saveUserInfo(ret.userInfo);
            }
            else {
                console.log(ret.err);
                notification['error']({message: ret.err});
            }
        }).catch((error)=> {
            //props.setFetch(false);
            console.log(error);
            notification['error']({message: error});
        });
    }, [dispatch]);*/

    useEffect(() => {
        console.log("App::useEffect called");
        let token=cookie.get('token');
        console.log(token);
        if(token) {
            let postData={};
            post('/checkToken', postData, token).then((response)=> {
                //props.setFetch(false);
                var ret=JSON.parse(response);
                if(!ret.err) {
                    saveUserInfo({"userName":ret.userName});
                }
                else {
                    console.log(ret.err);
                    notification['error']({message: ret.err});
                }
            }).catch((error)=> {
                //props.setFetch(false);
                console.log(error);
                notification['error']({message: error});
            });                
        }
    }, [dispatch]);

    return (
        <div id="divFront">
            <div className={style.container}>
                <div className={style.contentContainer}>
                    <div className={style.content}>
                        <div className={style.intaner}>
                            Content
                        </div>
                    </div>
                    <div className={style.loginContainer}>
                        {userInfo && userInfo.userName ?
                        <Logined saveUserInfo={saveUserInfo} userInfo={userInfo} /> :
                        <Login saveUserInfo={saveUserInfo} setFetch={setFetch} />}
                    </div>
                </div>
            </div>
            {isFetching && <Loading/>}
        </div>
    );
}
