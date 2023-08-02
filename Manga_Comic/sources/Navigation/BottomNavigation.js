import { StyleSheet, Image, View, Text } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DropShadow from 'react-native-drop-shadow';

import Home from '../Home/Home';
import Color from '../Utils/Color';
import Fonts from '../Utils/Fonts';
import Categories from '../Home/Categories';
import Bookmark from '../Home/Bookmark';
import Profile from '../Home/Profile';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
    return (
        <Tab.Navigator initialRouteName='Categories' screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Home') {
                    return focused ? <Image style={styles.iconFocus} source={require('../../assets/images/ic-home-nomal.png')} /> : <Image style={styles.iconNomal} source={require('../../assets/images/ic-home-focus.png')} />
                } else if (route.name === 'Categories') {
                    return focused ? <Image style={styles.iconFocus} source={require('../../assets/images/ic-categories-nomal.png')} /> : <Image style={styles.iconNomal} source={require('../../assets/images/ic-categories-focus.png')} />
                } else if (route.name === 'Bookmarks') {
                    return focused ? <Image style={styles.iconFocus} source={require('../../assets/images/ic-bookmark-nomal.png')} /> : <Image style={styles.iconNomal} source={require('../../assets/images/ic-bookmark-focus.png')} />
                } else if (route.name === 'Profile') {
                    return focused ? <Image style={styles.iconFocus} source={require('../../assets/images/ic-user-nomal.png')} /> : <Image style={styles.iconNomal} source={require('../../assets/images/ic-user-focus.png')} />
                }
            },
            lazy: true,
            tabBarActiveTintColor: Color.purplePrimary,
            tabBarInactiveTintColor: Color.greyLight,
            tabBarStyle: { height: 55, paddingBottom: 8, paddingTop: 8 },
            tabBarLabelStyle: styles.lableStyle,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            unmountOnBlur: true
        })}>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Categories' component={Categories} />
            <Tab.Screen name='Bookmarks' component={Bookmark} />
            <Tab.Screen name='Profile' component={Profile} />
        </Tab.Navigator>
    )
}

const CustomBottom = () => {
    return (
        <DropShadow style={styles.dropShadow}>
            <View style={styles.bottomBox}>

            </View>
        </DropShadow>
    )
}


const BottomNavigation = () => {
    const [index, setindex] = useState(0);
    return (
        <View style={styles.container}>
            <HomeNavigation />
        </View>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    dropShadow: {
        shadowColor: "#3d3d3d",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    bottomBox: {
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 100,
        margin: 10
    },
    iconNomal: {
        tintColor: Color.greyLight,
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    iconFocus: {
        tintColor: Color.purplePrimary,
        width: 24,
        height: 24,
        resizeMode: 'contain'
    }
})