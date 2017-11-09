import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import {PostData} from '../../services/PostData';
import {Redirect} from 'react-router-dom';
import './Welcome.css';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      redirect: false
    };
    this.signup = this
      .signup
      .bind(this);
  }

  signup(res, type) {
    let postData;
    if (type === 'facebook' && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url
      };
    }

    if (postData) {
      PostData('signup', postData).then((result) => {
        let responseJson = result;
        sessionStorage.setItem("userData", JSON.stringify(responseJson));
        this.setState({redirect: true});
      });
    } else {}
  }

  render() {

    if (this.state.redirect || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'}/>)
    }

    const responseFacebook = (response) => {
      console.log("facebook console");
      console.log(response);
      this.signup(response, 'facebook');
    }

    return (

      <div>
            <FacebookLogin
              appId="151917181683965"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}/>
            <br/><br/>

      </div>
    );
  }
}

export default Welcome;