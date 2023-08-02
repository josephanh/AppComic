import { StatusBar, StyleSheet, TouchableOpacity, View, Image, Button, Text, Pressable, ToastAndroid } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import TextInputCustom from '../Components/TextInput';
import Color from '../Utils/Color';
import Fonts from '../Utils/Fonts';
import AxiosIntance from '../Utils/AxiosIntance';
import { useDispatch } from 'react-redux';
import { CheckLogin, showLogin } from '../Redux/Action/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loginLoader, setloginLoader] = useState(false);

  const Login = async () => {
    setloginLoader(true);
    try {
      const response = await AxiosIntance().post('api/user/login',
      { email: email, password: password });
    console.log(response);
    if (response.result) {
      await AsyncStorage.setItem('token', response.token);
      dispatch(showLogin({ showLogin: false }));
      dispatch(CheckLogin({
        isLogin: true,
        userInfo: {
          email: response.user.email,
          name: response.user.name,
          _id: response.user._id,
          token: response.user.token
        }
      }));
    } else {
      setloginLoader(false);
      ToastAndroid.show("Kiểm tra tài khoản và mật khẩu", 3000);
    }
    } catch (error) {
      setloginLoader(false);
      ToastAndroid.show("Kiểm tra tài khoản và mật khẩu", 3000);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: 'stretch' }}>

        <View style={styles.txtWelcome}>
          <Text style={styles.txtTitleHello}>Welcome Back 👋</Text>
          <Text style={[styles.txtTitleHello, { marginTop: 8, fontSize: 14, fontFamily: Fonts.font_500 }]}>I am happy to see you again. You can continue where you left off by logging in</Text>
        </View>
        <View>
          <TextInputCustom
            type={'email'}
            placeholder={'Email Adress'}
            style={{ marginTop: 32 }}
            value={email}
            onChangeText={setEmail} />
          <TextInputCustom
            type={'password'}
            placeholder={'Password'}
            style={{ marginTop: 16 }}
            value={password}
            onChangeText={setPassword} />
          <TouchableOpacity style={styles.publicStyle} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <Pressable style={styles.buttonLogin} onPress={Login} android_ripple={{ color: Color.White }}>
            <Text style={styles.txtTextLoginButton}>Sign In</Text>
          </Pressable>
        </View>

      </View>
      <Text style={{ color: Color.greyPrimary, fontFamily: Fonts.font_500 }}>or</Text>
      <View style={{ alignSelf: 'stretch' }}>
        <TouchableOpacity activeOpacity={0.3} style={styles.boxButton}>
          <Image style={styles.icon} source={require('../../assets/images/ic-google-logo.png')} />
          <View style={styles.txtLogin}>
            <Text style={styles.txtTextLogin}>Sign In with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.3} style={[styles.boxButton, { marginTop: 16 }]}>
          <Image style={styles.icon} source={require('../../assets/images/ic-facebook-logo.png')} />
          <View style={styles.txtLogin}>
            <Text style={styles.txtTextLogin}>Sign In with Facebook</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.boxButton, { borderWidth: 0, marginTop: 50 }]}>
          <Text style={styles.txtAccount}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ScreenRegister')}>
            <Text style={[styles.txtAccount, { color: Color.blackPrimary }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    
        <Spinner
          visible={loginLoader}
          // textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          color='white'
          animation='fade'
          cancelable={false}
        />
 
      <StatusBar barStyle={'dark-content'} />
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  txtWelcome: {
    marginTop: 30
  },
  forgotPassword: {
    fontFamily: Fonts.font_500,
    color: Color.greyPrimary,
    textAlign: 'right',
    marginTop: 16
  },
  boxButton: {
    padding: 16,
    borderColor: Color.greyLighter,
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
    top: 16
  },
  txtLogin: {
    textAlign: 'center',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  txtTextLogin: {
    fontFamily: Fonts.font_600,
    color: Color.greyDark,
    fontSize: 14
  },
  buttonLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.purplePrimary,
    marginTop: 10,
    padding: 12,
    borderRadius: 10
  },
  txtTextLoginButton: {
    fontFamily: Fonts.font_600,
    color: Color.White,
    fontSize: 14
  },
  txtAccount: {
    fontFamily: Fonts.font_500,
    fontSize: 14,
    color: Color.greyLight
  },
  txtTitleHello: {
    fontFamily: Fonts.font_700,
    fontSize: 24,
    color: Color.blackDark
  },
  spinnerTextStyle: {
    color: 'black'
  },
})