import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect}from 'react'
import DropShadow from 'react-native-drop-shadow'
import Color from '../Utils/Color'
import Fonts from '../Utils/Fonts'
import FastImage from 'react-native-fast-image'
import { useDispatch } from 'react-redux'
import { goToDetail } from '../Redux/Action/action'
import { useNavigation } from '@react-navigation/native'
import AxiosIntance from '../Utils/AxiosIntance'

const ItemManga = (props) => {
    let { data, type } = props;
    // console.log(data);
    if (data.item != undefined) {
        data = data.item;
    }
    // console.log(data.image.url);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const gotoDetailManga = () => {
        dispatch(goToDetail(data));
        navigation.navigate('DetailManga');
    }

    // useEffect(() => {
    //     const GetList = async () => {
    //         const response = await AxiosIntance().get(`api/manga/${data._id}`);
    //         // console.log(response);
    //         if (response.error == false) {

    //         }
    //     }
    //     GetList();
    //     return () => {
    //     }
    // }, [])
    
    return (
        <View>
            {
                type == "horizontal" ?
                    <TouchableOpacity activeOpacity={0.3} style={styles.containerHorizontal} onPress={gotoDetailManga}>
                        <View>
                            <DropShadow style={styles.dropShadow}>
                                <FastImage
                                    style={styles.imageSizeLarge}
                                    source={{
                                        uri: data.image.url,
                                        headers: { Authorization: 'someAuthToken' },
                                        priority: FastImage.priority.normal,
                                    }}
                                    defaultSource={require('../../assets/images/placeholder-image.png')}
                                    resizeMode={FastImage.resizeMode.cover}

                                />
                            </DropShadow>
                            <Text style={styles.txtTitleHorizontal} numberOfLines={1}>{data.title}</Text>
                            <Text style={styles.txtAuthorHorizontal} numberOfLines={1}>{data.author}</Text>

                        </View>
                    </TouchableOpacity>
                    :
                    type == "vertical" ?
                        <DropShadow style={[styles.dropShadowVertical, styles.boxVertical]}>
                            <TouchableOpacity activeOpacity={0.3} style={styles.containerVertical} onPress={gotoDetailManga}>
                                <FastImage
                                    style={styles.imageSizeSmall}
                                    source={{
                                        uri: data.image.url,
                                        headers: { Authorization: 'someAuthToken' },
                                        priority: FastImage.priority.normal,
                                    }}
                                    defaultSource={require('../../assets/images/placeholder-image.png')}
                                    resizeMode={FastImage.resizeMode.cover}

                                />
                                <View>
                                    <Text style={styles.txtTitleVertical} numberOfLines={2}>{data.title}</Text>
                                    <Text style={styles.txtAuthorVertical} numberOfLines={1}>{data.author}</Text>
                                </View>


                            </TouchableOpacity>
                        </DropShadow>
                        : <View></View>
            }
        </View>

    )
}

export default ItemManga

const styles = StyleSheet.create({
    // style Horizontal
    containerHorizontal: {
        backgroundColor: Color.White,
        width: (Dimensions.get('screen').width - 80) / 3,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageSizeLarge: {
        width: ((Dimensions.get('screen').width - 80) / 3) * 0.9,
        height: undefined,
        borderRadius: 8,
        aspectRatio: 0.12/0.15
    },
    dropShadow: {
        shadowColor: Color['blackLighter'],
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtTitleHorizontal: {
        fontSize: 14,
        fontFamily: Fonts.font_600,
        color: Color.blackPrimary,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 5,
    },
    txtAuthorHorizontal: {
        fontSize: 14,
        fontFamily: Fonts.font_600,
        color: Color.greyLight,
        paddingLeft: 5
    },
    // style Vertical
    containerVertical: {
        flexDirection: 'row',
        backgroundColor: Color.White,
        padding: 10,
        borderRadius: 10
    },
    boxVertical: {
        marginTop: 8,
        marginBottom: 8
    },
    imageSizeSmall: {
        width: 68,
        height: 68,
        borderRadius: 8
    },
    dropShadowVertical: {
        shadowColor: Color.greyLight,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        margin: 3
    },
    txtTitleVertical: {
        fontFamily: Fonts.font_700,
        fontSize: 14,
        width: Dimensions.get('screen').width - 138,
        padding: 5,
        paddingLeft: 10,
        color: "#1F1F39"
    },
    txtAuthorVertical: {
        fontFamily: Fonts.font_500,
        fontSize: 14,
        width: Dimensions.get('screen').width - 138,
        padding: 5,
        paddingLeft: 10,
        color: Color.greyLight
    }
})

