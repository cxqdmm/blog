import React from 'react'
import axios from 'axios'
import './index.less'
 function translateParam(param) {
  if (typeof(param) === 'object') {
    let newParam = [];
    for (let key in param){
      if (param[key] instanceof Array) {
        newParam.push(`${key}=${encodeURIComponent(JSON.stringify(param[key]))}`);
      } else {
        newParam.push(`${key}=${encodeURIComponent(param[key])}`);
      }
    }
    return newParam.join('&');
  }

  return param;
}

 class LogInReg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'logIn':true,
            'reg':false,
            'name': '',
            'password': '',
            'password-repeat': '',
            'email': ''           
        }
    }
    componentDidMount() {

    }
    _sendAjax(url, type, data, params, callBack, errorCallBack) {
        return axios({
            method: type,
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            data:translateParam(data) || {},
            params: params || {},
        }).then(function(response) {
            if (callBack) {
                callBack(response.data);
            }
        })
        .catch(function(error) {
            if(errorCallBack) {
                errorCallBack(error)
            }
        });
    }
    submit() {
        var url = '/reg?v=' + (new Date()).getTime();
        var data = {
            'name': this.state.name,
            'password': this.state.password,
            'password-repeat': this.state['password-repeat'],
            'email': this.state.email
        };
        this._sendAjax(url,'post',data, null,function(res){

        },function() {
            console.log('error')
        })
    }
    render() {
        return (
                <div className="log-reg-container">
                    <canvas id="back-canvas"></canvas>
                    <div className="main-body">
                        <div className="index-tab-nav">
                            <div className="index-nav-bar" style={{"color": this.state.logIn ? '#0f88eb' : 'initial'}} onClick={() => {this.state.logIn = true;this.state.reg = false;this.setState()}}>登录</div>
                            <div className="index-nav-bar" style={{"color": this.state.reg ? '#0f88eb' : 'initial'}} onClick={() => {this.state.logIn = false;this.state.reg = true;this.setState()}}>注册</div>
                            <div className={`index-nav-slider ${this.state.reg ? 'slide-step1' : ''}`}></div>
                        </div>
                        <div className="index-tab-log" style={{"display": this.state.logIn ? 'initial' : 'none'}}>
                            <div className="index-table-cont">
                                <input type="text" className="index-tab-input" name="name" onChange={(e) => {this.state.name = e.target.value;}} placeholder="用户名" />
                                <input type="password" className="index-tab-input" name="password" onChange={(e) => {this.state.password = e.target.value;}} placeholder="密码"/>
                            </div>
                            <a className="index-table-opt ui-btn" href="javascript:;" onClick={() => {
                            }}>登录</a>
                        </div>
                        <div className="index-tab-reg" style={{"display": this.state.reg ? 'initial' : 'none'}}>
                            <div className="index-table-cont">
                                <input type="text" className="index-tab-input" name="name" onChange={(e) => {this.state.name = e.target.value;}} placeholder="用户名" />
                                <input type="password" className="index-tab-input" name="password" onChange={(e) => {this.state.password = e.target.value;}} placeholder="密码"/>
                                <input type="password" className="index-tab-input" name="password-repeat" onChange={(e) => {this.state['password-repeat'] = e.target.value;}} placeholder="确认密码"/>
                                 <input type="email" className="index-tab-input" name="email" onChange={(e) => {this.state.email = e.target.value;}} placeholder="邮箱" />
                            </div>
                            <a className="index-table-opt ui-btn" href="javascript:;" onClick={() => {
                            this.submit()
                            }}>提交</a>
                        </div>
                    </div>
                </div>
        )
    }
}

ReactDOM.render((
<LogInReg></LogInReg>
), document.getElementById('appRoot'))