import React from 'react'
import axios from 'axios'
import back from '../../utils/back.js'
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

export default class Center extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
		back();
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
    render() {
        return (
            <div className="main-container" >
                <canvas id="back-canvas"></canvas>
                <div className="main-content" id="mainContent" >{this.props.children}</div>
            </div>
        )
    }
}