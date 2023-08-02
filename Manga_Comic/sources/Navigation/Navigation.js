import { Easing, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPreset, CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';
import Home from '../Home/Home';
import BottomNavigation from './BottomNavigation';
import DetailManga from '../App/DetailManga';
import ReaddingManga from '../App/ReaddingManga';
import { useSelector } from 'react-redux';
import { store } from '../Redux/store';
import SignIn from '../User/SignIn';
import SignUp from '../User/SignUp';
import Search from '../App/Search';

const Stack = createStackNavigator();
const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 50,
        mass: 3,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

const closeConfig = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.linear,

    }
}

const HomeNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                // ...TransitionPresets.SlideFromRightIOS,
                cardStyleInterpolator:
                    CardStyleInterpolators.forFadeFromBottomAndroid,
                // transitionSpec: {
                //     open: config,
                //     close: closeConfig,
                // },
                animation: 'fade',
            }}>
            <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
            <Stack.Screen name='DetailManga' component={DetailManga} />
            <Stack.Screen name='ReadingManga' component={ReaddingManga} />
            <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
    )
}

const UserNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
            }}>
            <Stack.Screen name='ScreenLogin' component={SignIn} />
            <Stack.Screen name='ScreenRegister' component={SignUp} />
        </Stack.Navigator>
    )
}


const Navigation = () => {
    const store = useSelector(store => store);

    var isLogin = useSelector(store => store.login.isLogin);
    var isShowLogin = useSelector(store => store.showLogin.showLogin);
    // console.log(store);
    return (
        <View style={{ flex: 1 }}>
            {
                isLogin || !isShowLogin
                    ? <HomeNavigation />
                    : <UserNavigation />
            }
        </View>

    )
}

export default Navigation

const styles = StyleSheet.create({})