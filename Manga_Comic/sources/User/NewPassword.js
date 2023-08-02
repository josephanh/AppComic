import { StatusBar, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React, { useState } from 'react'
import Color from '../../Constans/Color'
import TextCustom from '../../Components/Typography/Text'
import TextInputCustom from '../../Components/TextInput'
import Fonts from '../../Constans/Fonts'
import Button from '../../Components/Button'
import { useNavigation } from '@react-navigation/native'

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{ alignSelf: 'stretch' }}>
                <View style={styles.txtWelcome}>
                    <TextCustom type={24} content={'Create New Password 🔒'} style={{ color: Color.blackPrimary }} />
                    <TextCustom
                        style={{ marginTop: 8, color: Color.blackPrimary }}
                        type={400}
                        content={'You can create a new password, please dont forget it too.'} />
                </View>

                <View>
                    <TextInputCustom
                        type={'password'}
                        placeholder={'Password'}
                        style={{ marginTop: 16 }}
                        value={password}
                        onChangeText={setPassword} />
                    <TextInputCustom
                        type={'password'}
                        placeholder={'Repeat New Password'}
                        style={{ marginTop: 16 }}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword} />
                    <Button style={{ marginTop: 24 }} title={'Confirm'} onPress={()=> navigation.navigate('SignIn')}  />
                </View>

            </View>

            <View style={{ alignSelf: 'stretch' }}>
                <View style={[styles.boxButton, { borderWidth: 0, marginTop: 50 }]}>
                    <TextCustom type={600} content={"Didn’t receive an email? "} />
                    <TouchableOpacity>
                        <TextCustom type={600} content={"Send again"} style={{ color: Color.blackPrimary }} />
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar barStyle={'dark-content'} />
        </View>
    )
}

export default NewPassword

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
})