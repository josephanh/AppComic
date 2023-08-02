import { Button, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Color from '../Utils/Color'
import Fonts from '../Utils/Fonts';
import { useNavigation } from '@react-navigation/native'
import RBSheet from "react-native-raw-bottom-sheet";
import CircleList from 'react-native-circle-list';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useEffect } from 'react';
import AxiosIntance from '../Utils/AxiosIntance';
import { FlatList } from 'react-native-gesture-handler';

const ReaddingManga = () => {
    // const data = useSelector(state => state.detailManga.data.chapters);
    // console.log(data);
    const [current, setcurrent] = useState(0);
    const [colorText, setcolorText] = useState(Color.blackDark);
    const [fontSizeText, setfontSizeText] = useState(14);
    const navigation = useNavigation();
    const mangaList = useSelector((state) => state.manga.mangaList);
    const loading = useSelector((state) => state.manga.loading);
    const error = useSelector((state) => state.manga.error);
    const user = useSelector((state) => state.login);
    const data = mangaList.chapters;
    const readRef = useRef();
    const refFontSize = useRef();
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    console.log(user.userInfo);
    if (user.isLogin) {
        setTimeout(() => {
            const CheckRead = () => {
                const response = AxiosIntance().post(`api/manga/reader/${mangaList._id}/${user.userInfo._id}`);
                console.log(response);
            }
            CheckRead();

        }, 5000);
    }


    return (
        <>{
            loading ? <ActivityIndicator></ActivityIndicator>
                : <View style={{ flex: 1, backgroundColor: Color.White }}>
                    <View>
                        <View style={styles.toolbar}>
                            <TouchableOpacity style={styles.ic_back} onPress={() => navigation.goBack()}>
                                <Image style={{ width: 24, height: 24 }} source={require('../../assets/images/arrow-small-left.png')} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.ic_back} onPress={() => this.RBSheetFont.open()} >
                                    <Image style={{ width: 24, height: 24 }} source={require('../../assets/images/ic_font.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.ic_back} onPress={() => this.RBSheet.open()} >
                                    <Image style={{ width: 24, height: 24 }} source={require('../../assets/images/ic-list-text.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.titleManga}>{mangaList.title}</Text>
                    </View>
                    <ScrollView
                        style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20 }}
                        ref={readRef}
                        onScroll={e => {
                            setContentVerticalOffset(e.nativeEvent.contentOffset.y);
                        }}>
                        <Text style={styles.txtTitle}>Chương {data[current].chapter_index}: {data[current].title}</Text>
                        <Text style={[styles.read, {color: colorText, fontSize: fontSizeText}]}>{data[current].content}</Text>
                    </ScrollView>
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={500}
                        openDuration={250}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20
                            }
                        }}>
                        <View>
                            <Text style={{ fontFamily: Fonts.font_700, fontSize: 16, padding: 10, color: Color.blackDark }}>Chọn Chương</Text>
                            <ScrollView style={{ width: Dimensions.get('screen').width }} showsVerticalScrollIndicator={false}>
                                {
                                    data.map((item, index) => {
                                        return (
                                            <TouchableOpacity style={styles.btnChangeChapter} onPress={() => {
                                                setcurrent(item.chapter_index - 1);
                                                this.RBSheet.close();
                                                readRef.current.scrollTo({ offset: 0, animated: true })
                                                key = { index }
                                            }}>
                                                <Text style={styles.read}>{item.chapter_index} - {item.title}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </RBSheet>
                    <RBSheet
                        ref={ref => {
                            this.RBSheetFont = ref;
                        }}
                        // height={200}
                        openDuration={250}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center",
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20
                            }
                        }}>
                        <View>
                            <Text style={{ fontFamily: Fonts.font_700, fontSize: 16, padding: 10, color: Color.blackDark }}>Chọn size chữ</Text>
                            <FlatList
                                data={[12, 14, 16, 18, 20, 22]}
                                keyExtractor={item => item.toFixed()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ padding: 10 }}
                                renderItem={item => {
                                    return (
                                        <TouchableOpacity onPress={()=> setfontSizeText(item.item.valueOf())}>
                                            <Text style={{
                                                backgroundColor: Color.greyLighter,
                                                padding: 15,
                                                margin: 5,
                                                borderRadius: 100,
                                                width: 50,
                                                height: 50,
                                                fontFamily: Fonts.font_600,
                                                color: Color.blackDark
                                            }}>{item.item.valueOf()}</Text>
                                        </TouchableOpacity>
                                    )
                                }} />

                            <Text style={{ fontFamily: Fonts.font_700, fontSize: 16, padding: 10, color: Color.blackDark }}>Chọn màu chữ</Text>
                            <FlatList
                                data={[Color.blackDark, Color.greyDark, Color.purpleDarker]}
                                keyExtractor={item => item.indexOf()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{ padding: 10 }}
                                renderItem={item => {
                                    return (
                                        <TouchableOpacity onPress={()=> setcolorText(item.item.valueOf())}>
                                            <Text style={{
                                                backgroundColor: item.item.valueOf(),
                                                padding: 20,
                                                margin: 5,
                                                borderRadius: 100,
                                                width: 50,
                                                height: 50,
                                                fontFamily: Fonts.font_600,
                                                color: Color.blackDark
                                            }}></Text>
                                        </TouchableOpacity>
                                    )
                                }} />
                        </View>
                    </RBSheet>
                    <StatusBar hidden={true} />
                </View>
        }</>
    )
}

export default ReaddingManga

const styles = StyleSheet.create({
    toolbar: {
        paddingTop: 30,
        // position: 'absolute',
        // zIndex: 20,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    ic_back: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    read: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: Fonts.font_500,
        color: Color.blackPrimary
    },
    btnChangeChapter: {
        margin: 10,
        backgroundColor: Color.greyLighter,
        padding: 20,
        borderRadius: 10
    },
    txtTitle: {
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: Fonts.font_700,
        fontSize: 18,
        color: Color.purplePrimary
    },
    titleManga: {
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
        textAlign: 'center',
        fontFamily: Fonts.font_700,
        color: 'red',
        fontSize: 16
    }
})
