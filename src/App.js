import React, { useEffect } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from './redux/actions'
import style from './css/App.css'
import Login from './Login'
import Logined from './Logined'
import {Loading} from './Loading'
import {get, post} from './fetch';

const App = (props) => {

    const {userInfo, saveUserInfo, isFetching, setFetch} = props;

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        get('/userInfo').then((response)=> {
            //props.setFetch(false);
            var ret=JSON.parse(response);
            if(!ret.err) {
                props.saveUserInfo(ret.userInfo);
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
    }, [saveUserInfo]);

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
                        <Login saveUserInfo={saveUserInfo} setFetch={setFetch}/>}
                    </div>
                </div>
            </div>
            {isFetching && <Loading/>}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return{
        saveUserInfo:bindActionCreators(actions.saveUserInfo,dispatch),
        setFetch:bindActionCreators(actions.setFetch,dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
        isFetching: state.isFetching,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);