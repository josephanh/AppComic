import { StatusBar, StyleSheet, TouchableOpacity, View, Text, Dimensions, Button, Pressable, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import TextInputCustom from '../Components/TextInput'
import Color from '../Utils/Color'
import Fonts from '../Utils/Fonts'
import AxiosIntance from '../Utils/AxiosIntance'

const height = Dimensions.get('window').height


const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const Register = async () => {
        try {
            const response = await AxiosIntance().post('api/user/register',
                { email: email, password: password, confirm_pass: confirmPassword, name: user });
            console.log(response);
            if(response.result) {
                navigation.navigate("ScreenLogin");
            } else {
                ToastAndroid.show("Tài khoản đã tồn tại", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <KeyboardAwareScrollView style={{ height: height, backgroundColor: Color.White }} keyboardShouldPersistTaps={'handled'}>
            <View style={styles.container}>
                <View style={{ alignSelf: 'stretch' }}>

                    <View style={styles.txtWelcome}>
                        <Text style={styles.txtTitleHello}>Welcome to Manga 👋</Text>
                        <Text style={[styles.txtTitleHello, { marginTop: 8, fontSize: 14, fontFamily: Fonts.font_500 }]}>Hello, sign up to save your favorite series now!</Text>
                    </View>
                    <View>
                        <TextInputCustom
                            type={'user'}
                            placeholder={'Username'}
                            style={{ marginTop: 32 }}
                            value={user}
                            onChangeText={setUser} />
                        <TextInputCustom
                            type={'email'}
                            placeholder={'Email Adress'}
                            style={{ marginTop: 16 }}
                            value={email}
                            onChangeText={setEmail} />
                        <TextInputCustom
                            type={'password'}
                            placeholder={'Password'}
                            style={{ marginTop: 16 }}
                            value={password}
                            onChangeText={setPassword} />

                        <TextInputCustom
                            type={'password'}
                            placeholder={'Repeat Password'}
                            style={{ marginTop: 16 }}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword} />

                        <Pressable style={styles.buttonLogin} onPress={Register} android_ripple={{ color: Color.White }}>
                            <Text style={styles.txtTextLoginButton}>Sign Up</Text>
                        </Pressable>
                    </View>

                </View>
                <View style={{ alignSelf: 'stretch' }}>
                    <View style={[styles.boxButton, { borderWidth: 0, marginTop: 50 }]}>
                        <Text style={styles.txtAccount}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ScreenLogin')}>
                            <Text style={[styles.txtAccount, { color: Color.blackPrimary }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <StatusBar barStyle={'dark-content'} />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.White,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: height
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
        alignSelf: 'flex-start',
        fontSize: 14
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
        marginTop: 40,
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
    }
})