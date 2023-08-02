import { StyleSheet, Image, View, Switch, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Color from '../Utils/Color';
import Fonts from '../Utils/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { CheckLogin, showLogin } from '../Redux/Action/action';




const Profile = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);
  return (
    <View style={styles.container}>
      <Text style={styles.txtTitleProfile}>Thông tin người dùng</Text>
      <View style={styles.inForPro}>
        <Image style={styles.avatar} source={{ uri: 'https://phunugioi.com/wp-content/uploads/2020/01/anh-avatar-supreme-dep-lam-dai-dien-facebook.jpg' }} />
        <View style={{ justifyContent: 'center', marginLeft: 10 }}>
          <Text style={styles.userName}>{user.userInfo.name}</Text>
          <Text style={styles.userEmail}>{user.userInfo.email}</Text>
        </View>
      </View>

      <ScrollView style={{ marginTop: 32 }}>
        <View style={styles.item}>
          <Text style={styles.txtTitleSettings}>Eren Turkmen</Text>
          <Switch
            trackColor={{ false: Color.greyLight, true: Color.purplePrimary }}
            thumbColor={isEnabled ? Color.White : Color.White}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.txtTitleSettings}>Language</Text>
          <TouchableOpacity>
            <Image style={styles.iconRight} source={require('../../assets/images/ic-angle-right.png')} />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.txtTitleSettings}>Change Password</Text>
          <TouchableOpacity>
            <Image style={styles.iconRight} source={require('../../assets/images/ic-angle-right.png')} />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.txtTitleSettings}>Privacy</Text>
          <TouchableOpacity>
            <Image style={styles.iconRight} source={require('../../assets/images/ic-angle-right.png')} />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.txtTitleSettings}>Terms & Conditions</Text>
          <TouchableOpacity>
            <Image style={styles.iconRight} source={require('../../assets/images/ic-angle-right.png')} />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {
          dispatch(showLogin({ showLogin: true }))
          dispatch(CheckLogin({ isLogin: false, userInfo: {} }))
        }}>
          <Text style={styles.txtTitleSettings}>Sign Out</Text>
          <TouchableOpacity onPress={() => {
            dispatch(showLogin({ showLogin: true }));
            dispatch(CheckLogin({ isLogin: false, userInfo: {} }))
          }}>
            <Image style={styles.iconRight} source={require('../../assets/images/ic-signout.png')} />
          </TouchableOpacity>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
    paddingLeft: 20,
    paddingRight: 20
  },
  browse: {
    marginTop: 50,
    color: Color.blackPrimary
  },
  inForPro: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 200,
  },
  item: {
    backgroundColor: Color.greyLighter,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 16
  },
  txtTitleSettings: {
    fontFamily: Fonts.font_600,
    color: Color.greyDark,
    fontSize: 16,
    lineHeight: 24
  },
  iconRight: {
    width: 24,
    height: 24
  },
  userName: {
    fontFamily: Fonts.font_700,
    fontSize: 16,
    color: Color.blackPrimary
  },
  userEmail: {
    fontFamily: Fonts.font_500,
    fontSize: 14,
    color: Color.greyPrimary
  },
  txtTitleProfile: {
    fontFamily: Fonts.font_700,
    fontSize: 16,
    color: Color.blackPrimary,
    marginTop: 50
  }
})