import { StatusBar, StyleSheet, TouchableOpacity, View, Image, Button } from 'react-native'
import React, { useState } from 'react'


import { useNavigation } from '@react-navigation/native'
import TextInputCustom from '../Components/TextInput';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{ alignSelf: 'stretch' }}>

                <View style={styles.txtWelcome}>
                    <Text type={24} content={'Forgot Password 🤔'} style={{ color: Color.blackPrimary }} />
                    <Text
                        style={{ marginTop: 8, color: Color.blackPrimary }}
                        type={400}
                        content={'We need your email adress so we can send you the password reset code.'} />
                </View>
                <View>
                    <TextInputCustom
                        type={'email'}
                        placeholder={'Email Adress'}
                        style={{ marginTop: 32 }}
                        value={email}
                        onChangeText={setEmail} />

                    <Button style={{ marginTop: 24 }} title={'Next'} onPress={()=> navigation.navigate('VerificationCode')} />
                </View>

            </View>

            <View style={{ alignSelf: 'stretch' }}>
                <View style={[styles.boxButton, { borderWidth: 0, marginTop: 50 }]}>
                    <TextCustom type={600} content={"Remember the password? "} />
                    <TouchableOpacity>
                        <TextCustom type={600} content={"Try again"} style={{ color: Color.blackPrimary }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ForgotPassword

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
    }
})