import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from './redux/actions'
import style from './css/App.css'
import Login from './Login'
import Logined from './Logined'
import {Loading} from './Loading'
import {get, post} from './fetch';

class App extends Component {

	render() {
		const {userInfo, saveUserInfo, isFetching, setFetch} = this.props;
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

    componentDidMount() {
		//this.props.setFetch(true);
        get('/userInfo').then((response)=> {
			//this.props.setFetch(false);
            if(!response.err) {
                this.props.saveUserInfo(response.userInfo);
			}
            else {
                console.log(response);
				notification['error']({message: response.err});
			}
		}).catch((error)=> {
			//this.props.setFetch(false);
			console.log(error);
			notification['error']({message: error});
		});
    }

}

function mapDispatchToProps(dispatch) {
    return{
        saveUserInfo:bindActionCreators(actions.saveUserInfo,dispatch),
		setFetch:bindActionCreators(actions.setFetch,dispatch),
    }
}

function mapStateToProps(state) {
    return{
        userInfo: state.userInfo,
        isFetching: state.isFetching,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)