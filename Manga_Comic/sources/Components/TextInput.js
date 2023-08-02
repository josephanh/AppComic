import { StyleSheet, TextInput, View, Image, Animated, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Color from '../Utils/Color';
import Fonts from '../Utils/Fonts';



const typeInput = {
    password: 'password',
    email: 'email',
    user: 'user'
}

const TextInputCustom = (props) => {
    const { type, placeholder, style, value, onChangeText } = props;
    const [state, setstate] = useState("");
    const [showPass, setshowPass] = useState(true);

    const [isFocused, setIsFocused] = useState(false);

    const backgroundColor = isFocused
        ? Color.greyLighter // màu nền khi TextInput được focus
        : Color.White; // màu nền khi TextInput không được focus

    const [animatedBackgroundColor] = useState(new Animated.Value(0));
    const [animatedBorderColor] = useState(new Animated.Value(0));
    const [iconLeft, setIconLeft] = useState(state == typeInput.email ? require('../../assets/images/ic-email-nomal.png') : require('../../assets/images/ic-password-nomal.png'));
    const [iconRight, setIconRight] = useState("");

    const handleFocus = () => {
        setIsFocused(true);
        state == typeInput.email 
        ? setIconLeft(require('../../assets/images/ic-email-focus.png'))
        : setIconLeft(require('../../assets/images/ic-user-focus.png'))
    };

    const handleBlur = () => {
        setIsFocused(false);
        state == typeInput.email 
        ? setIconLeft(require('../../assets/images/ic-email-nomal.png'))
        : setIconLeft(require('../../assets/images/ic-user-nomal.png'))
    };

    const handleFocusPass = () => {
        setIsFocused(true);
        setIconLeft(require('../../assets/images/ic-password-focus.png'));
        setIconRight(require('../../assets/images/ic-show.png'))
    };

    const handleBlurPass = () => {
        setIsFocused(false);
        setIconLeft(require('../../assets/images/ic-password-nomal.png'));
        setIconRight("");
    };

    Animated.timing(animatedBackgroundColor, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
    }).start();

    Animated.timing(animatedBorderColor, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
    }).start();

    const backgroundColorInterpolation = animatedBackgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: [Color.greyLighter, Color.White],
        extrapolate: 'clamp'
    });

    const borderColorInterpolation = animatedBorderColor.interpolate({
        inputRange: [0, 1],
        outputRange: [Color.greyLighter, Color.purplePrimary],
        extrapolate: 'clamp'
    });

    switch (type) {
        case typeInput.email:
            if (state == typeInput.email) break;
            setstate(typeInput.email);
            setIconLeft(require('../../assets/images/ic-email-nomal.png'));
            break;
        case typeInput.password:
            if (state == typeInput.password) break;
            setstate(typeInput.password);
            setIconLeft(require('../../assets/images/ic-password-nomal.png'));
            break;
        case typeInput.user:
            if (state == typeInput.user) break;
            setstate(typeInput.user);
            setIconLeft(require('../../assets/images/ic-user-nomal.png'));
            break;

        default:
            break;
    }
    return (
        <View>
            {
                ((state == typeInput.email) || (state == typeInput.user)) &&
                <Animated.View style={[styles.boxEmail, style,
                { backgroundColor: backgroundColorInterpolation, borderColor: borderColorInterpolation }]}>
                    <Animated.Image style={styles.icon} source={iconLeft} />
                    <TextInput
                        placeholder={placeholder}
                        style={[styles.txtEmail]}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        keyboardType={state == typeInput.email ? 'email-address' : 'default'}
                        returnKeyType={'next'} />
                </Animated.View>
            }
            {
                state == typeInput.password &&
                <Animated.View style={[styles.boxEmail, style,
                { backgroundColor: backgroundColorInterpolation, borderColor: borderColorInterpolation }]}>
                    <Animated.Image style={styles.icon} source={iconLeft} />
                    <TextInput
                        placeholder={placeholder}
                        style={[styles.txtEmail]}
                        password={true}
                        secureTextEntry={showPass}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={handleFocusPass}
                        onBlur={handleBlurPass}
                        returnKeyType={'done'} />
                    {
                        iconRight != ""
                            ? <TouchableOpacity
                                onPress={() => {
                                    setshowPass(!showPass);
                                    showPass
                                        ? setIconRight(require('../../assets/images/ic-hide.png'))
                                        : setIconRight(require('../../assets/images/ic-show.png'))

                                }} activeOpacity={0.5}>
                                <Animated.Image style={styles.icon} source={iconRight} />
                            </TouchableOpacity>
                            : <View></View>
                    }

                </Animated.View>
            }
        </View>
    )
}

export default TextInputCustom

const styles = StyleSheet.create({
    boxEmail: {
        backgroundColor: '#F6F1F1',
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingEnd: 16,
        alignItems: 'center'
    },
    txtEmail: {
        padding: 12,
        paddingLeft: 20,
        lineHeight: 24,
        color: Color.blackPrimary,
        flex: 1,
        fontFamily: Fonts.font_500,
        fontSize: 14
    },
    icon: {
        width: 24,
        height: 24,
    }
})