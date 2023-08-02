import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, ScrollView, PermissionsAndroid, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import FastImage from 'react-native-fast-image'
import Voice from '@react-native-voice/voice';
import axios from 'axios';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import Fonts from '../Utils/Fonts'
import Color from '../Utils/Color'
import ItemManga from '../Components/ItemManga';
import { FlashList } from '@shopify/flash-list';
import DropShadow from 'react-native-drop-shadow';
import { useDispatch } from 'react-redux';
import { actionDemo } from '../Redux/Action/action';
import AxiosIntance from '../Utils/AxiosIntance';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

function Timer() {
    var today = new Date();
    var time = today.getHours();
    if (time < 10) {
        return "Xin chào buổi sáng,"
    } else if (time < 12) {
        return "Xin chào buổi trưa,"
    } else if (time < 19) {
        return "Xin chào buổi chiều,"
    } else {
        return "Xin chào buổi tối,"
    }
}

const renderItem = ({ item, index }, parallaxProps) => {
    // console.log(item);
    return (
        <TouchableOpacity style={styles.item}>
            <ParallaxImage
                source={{ uri: item.illustration }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
            />
            <Text style={styles.titleManga} numberOfLines={1}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );
};

const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'Xin quyền truy cập',
                message:
                    'Cho phép sử dụng micro ',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the micro');
        } else {
            console.log('Micro permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};

const Home = () => {
    const [search, setSearch] = useState("");
    const [dataHot, setdataHot] = useState([]);
    const [dataAll, setdataAll] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechError = onSpeechError,
            Voice.onSpeechPartialResults = onSpeechPartialResults,
            Voice.onSpeechVolumeChanged = onSpeechVolumeChanged

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, [])

    onSpeechStart = (e) => {
        console.log("on Start ✓");
    }
    onSpeechEnd = (e) => {
        console.log("On End ✓");
    }
    onSpeechError = (e) => {
        console.log("on Error", e);
    }
    onSpeechVolumeChanged = (e) => {
        console.log("✓");
    }
    onSpeechPartialResults = (e) => {
        console.log("✓");
    }
    onSpeechResults = (e) => {
        console.log('kết quả', e.value[0]);
        setSearch(e.value[0]);
    }

    useEffect(() => {
        const GetList = async () => {
            const responseHot = await AxiosIntance().get("api/manga/getmanga/category/Hot");
            const response = await AxiosIntance().get("/api/manga/getallmanga/notequalhot");
            setdataAll(response);
            setdataHot(responseHot);
            if (response.error == false) {

            }
        }
        GetList();
        return () => {
        }
    }, [])
    // Bắt đầu ghi âm
    const startRecording = async () => {
        try {
            var isAvailable = Voice.isAvailable();

            console.log(("kết quả: " + await isAvailable).toString());
            if ((await isAvailable).toString() == 'false') {
                requestCameraPermission();
            }
            await Voice.start('vi-VN');
            console.log('bắt đầu ghi âm');

        } catch (error) {
            console.error(error);
        }
    };
    // Kết thúc ghi âm và chuyển đổi âm thanh thành văn bản
    const stopRecording = async () => {
        try {
            await Voice.stop();
            console.log('dừng ghi âm'); // Lấy kết quả đầu tiên và gán cho trường tìm kiếm
        } catch (error) {
            console.error(error);
        }
    };

    // Hàm chạy tìm kiếm
    const _onSearch = () => {
        navigation.navigate('Search', { key: search });
    }

    return (
        <View style={{ flex: 1, backgroundColor: Color.White }}>
            <ScrollView style={styles.container}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                nestedScrollEnabled={true}>
                <DropShadow style={styles.dropshadow}>
                    <View style={styles.inforUser}>
                        <FastImage
                            style={styles.imageUser}
                            source={require('../../assets/images/avatar-facebook-chat-2.jpg')} />
                        <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                            <Text style={styles.txtWelcome}>{Timer()}</Text>
                            <Text style={styles.nameUser}>Nguyễn Tuấn Anh</Text>
                        </View>
                    </View>
                </DropShadow>
                <View style={styles.boxInputSearch}>
                    <View style={styles.boxInput}>
                        <TouchableOpacity onPress={_onSearch} >
                            <Image style={styles.iconSearch} source={require('../../assets/images/ic-search.png')} />
                        </TouchableOpacity>
                        <TextInput style={styles.inputSearch} value={search} onChangeText={setSearch} placeholder={"Search"} />
                        <TouchableOpacity onPress={startRecording}>
                            <Image style={styles.iconSearch} source={require('../../assets/images/ic-microphone.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 25 }}>
                    <Carousel
                        sliderWidth={screenWidth}
                        sliderHeight={200}
                        itemWidth={screenWidth - 130}
                        data={ENTRIES1}
                        renderItem={renderItem}
                        hasParallaxImages={true}
                        autoplay={true}
                        enableMomentum={false}
                        lockScrollWhileSnapping={true}
                        autoplayInterval={8000}
                        autoplayDelay={0}
                        loop={true} />
                </View>
                <View style={styles.content_container}>
                    <View style={styles.txtTrending}>
                        <Text style={styles.txtTitle}>Trending Manga</Text>
                        <TouchableOpacity>
                            <Image style={styles.icDetail} source={require('../../assets/images/ic-ellipsis-horizontal.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    {
                        dataAll.length <= 0 ? <View style={{ height: 200, justifyContent: 'center' }} ><ActivityIndicator size="large" color="#00ff00" /></View>
                            : <View>
                                <View style={styles.listHorizontal}>
                                    <FlatList
                                        data={dataHot}
                                        renderItem={item => <View style={{ marginLeft: item.index == 0 ? 20 : 0 }}><ItemManga data={item} type={'horizontal'} /></View>}
                                        keyExtractor={item => item._id}
                                        horizontal
                                        estimatedItemSize={130}
                                        showsHorizontalScrollIndicator={false} />
                                </View>
                                <View style={styles.boxContent}>
                                    <View style={[styles.listHorizontal, { width: Dimensions.get('screen').width - 40, height: 'auto' }]}>
                                        <FlatList
                                            scrollEnabled={true}
                                            data={dataAll}
                                            estimatedItemSize={150}
                                            renderItem={item => <ItemManga data={item} type={'vertical'} />}
                                            keyExtractor={item => item._id}
                                            showsHorizontalScrollIndicator={false} />
                                    </View>
                                </View>
                            </View>
                    }
                </View>

            </ScrollView>
        </View>

    )
}
export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.White,
        // paddingLeft: 25,
        // paddingRight: 25
    },
    inforUser: {
        paddingTop: 40,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 15,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: Color.White
    },
    imageUser: {
        width: 58,
        height: 58,
        borderRadius: 58
    },
    txtWelcome: {
        fontFamily: Fonts.font_400,
        fontSize: 14,
        lineHeight: 21,
        color: Color.greyLight
    },
    nameUser: {
        fontFamily: Fonts.font_600,
        fontSize: 18,
        lineHeight: 24,
        color: "#1F1F39"
    },
    boxInputSearch: {
        backgroundColor: Color.White,
        paddingTop: 9,
        paddingLeft: 20,
        paddingRight: 20
    },
    boxInput: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Color.greyLighter,
        height: 56,
        borderRadius: 12,
        paddingLeft: 16,
        paddingRight: 16
    },
    iconSearch: {
        width: 24,
        height: 24,
    },
    inputSearch: {
        flex: 1,
        fontFamily: Fonts.font_600,
        fontSize: 16,
        paddingLeft: 16,
        paddingRight: 16
    },
    content_container: {
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    txtTrending: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtTitle: {
        fontFamily: Fonts.font_700,
        fontSize: 14,
        color: Color.blackDark
    },
    icDetail: {
        width: 24,
        height: 24
    },
    item: {
        width: screenWidth - 130,
        height: 200,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
    },
    boxContent: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    listHorizontal: {
        marginTop: 10,
        height: ((Dimensions.get('screen').width - 80) / 3) / (0.12 / 0.15) + 40,
        width: Dimensions.get("screen").width,
    },
    titleManga: {
        fontFamily: Fonts.font_600,
        textAlign: 'center',
        fontSize: 14,
        color: Color['blackLighter'],
    },
    dropshadow: {
        shadowColor: Color.greyLight,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
    }
})

var data = [{
    "_id": 1,
    "title": "History of the Ancient World's Society",
    "author": "Dr. Tikendranath Sarkar",
    "image": "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.media/ket-gioi.jpg"
}, {
    "_id": 2,
    "title": "Magic in the Ancient Greek World: 4",
    "author": "Derek Collins ",
    "image": "https://cdn.enovel.vn/covers/7/7159-huong-duong-duoi-sao-220x283.webp?v=2"
}, {
    "_id": 3,
    "title": "The History of the Ancient World",
    "author": "By Susan Wise Bauer",
    "image": "https://vn-live-01.slatic.net/p/cd6599122fd709cd562dd42e7d63ef76.jpg"
}, {
    "_id": 4,
    "title": "History of the Ancient World's Society",
    "author": "Dr. Tikendranath Sarkar",
    "image": "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.media/ket-gioi.jpg"
}, {
    "_id": 5,
    "title": "The History of the Ancient World",
    "author": "By Susan Wise Bauer",
    "image": "https://vn-live-01.slatic.net/p/cd6599122fd709cd562dd42e7d63ef76.jpg"
}, {
    "_id": 6,
    "title": "Magic in the Ancient Greek World: 4",
    "author": "Derek Collins ",
    "image": "https://cdn.enovel.vn/covers/7/7159-huong-duong-duoi-sao-220x283.webp?v=2"
}, {
    "_id": 7,
    "title": "The History of the Ancient World",
    "author": "By Susan Wise Bauer",
    "image": "https://vn-live-01.slatic.net/p/cd6599122fd709cd562dd42e7d63ef76.jpg"
}, {
    "_id": 8,
    "title": "History of the Ancient World's Society",
    "author": "Dr. Tikendranath Sarkar",
    "image": "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.media/ket-gioi.jpg"
}, {
    "_id": 9,
    "title": "Magic in the Ancient Greek World: 4",
    "author": "Derek Collins ",
    "image": "https://cdn.enovel.vn/covers/7/7159-huong-duong-duoi-sao-220x283.webp?v=2"
}, {
    "_id": 10,
    "title": "The History of the Ancient World",
    "author": "By Susan Wise Bauer",
    "image": "https://vn-live-01.slatic.net/p/cd6599122fd709cd562dd42e7d63ef76.jpg"
}, {
    "_id": 11,
    "title": "Magic in the Ancient Greek World: 4",
    "author": "Derek Collins ",
    "image": "https://cdn.enovel.vn/covers/7/7159-huong-duong-duoi-sao-220x283.webp?v=2"
}, {
    "_id": 12,
    "title": "The History of the Ancient World",
    "author": "By Susan Wise Bauer",
    "image": "https://vn-live-01.slatic.net/p/cd6599122fd709cd562dd42e7d63ef76.jpg"
}, {
    "_id": 13,
    "title": "History of the Ancient World's Society",
    "author": "Dr. Tikendranath Sarkar",
    "image": "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.media/ket-gioi.jpg"
}, {
    "_id": 14,
    "title": "Magic in the Ancient Greek World: 4",
    "author": "Derek Collins ",
    "image": "https://cdn.enovel.vn/covers/7/7159-huong-duong-duoi-sao-220x283.webp?v=2"
}, {
    "_id": 15,
    "title": "The History of the Ancient World",
    "author": "By Susan Wise Bauer",
    "image": "https://vn-live-01.slatic.net/p/cd6599122fd709cd562dd42e7d63ef76.jpg"
}, {
    "_id": 16,
    "title": "History of the Ancient World's Society",
    "author": "Dr. Tikendranath Sarkar",
    "image": "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.media/ket-gioi.jpg"
}, {
    "_id": 17,
    "title": "The History of the Ancient World",
    "author": "By Susan Wise Bauer",
    "image": "https://vn-live-01.slatic.net/p/cd6599122fd709cd562dd42e7d63ef76.jpg"
}, {
    "_id": 18,
    "title": "Magic in the Ancient Greek World: 4",
    "author": "Derek Collins ",
    "image": "https://cdn.enovel.vn/covers/7/7159-huong-duong-duoi-sao-220x283.webp?v=2"
}, {
    "_id": 19,
    "title": "History of the Ancient World's Society",
    "author": "Dr. Tikendranath Sarkar",
    "image": "https://307a0e78.vws.vegacdn.vn/view/v2/image/img.media/ket-gioi.jpg"
}, {
    "_id": 20,
    "title": "Magic in the Ancient Greek World: 4",
    "author": "Derek Collins ",
    "image": "https://cdn.enovel.vn/covers/7/7159-huong-duong-duoi-sao-220x283.webp?v=2"
}]
const ENTRIES1 = [
    {
        title: 'Long Vương Trở Lại',
        subtitle: 'Nắng Phổ Tang',
        illustration: 'https://cn-e-pic.itoon.org/editor-upload/79516da07695da660ad73427a4658c5a.webp',
    },
    {
        title: 'Cô vợ câm',
        subtitle: 'Ông già và biển cả',
        illustration: 'https://cn-e-pic.itoon.org/homepage-banners/586-726f.webp',
    },
    {
        title: 'Vợ nhỏ nhút nhát, Chồng à!',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://cn-e-pic.itoon.org/editor-upload/86ccd2ee740b8137c26dedee7a549c46.webp',
    },
    {
        title: 'Lạc Trôi',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_thumbnails/l_c_tr_i_s1___ngang-8388b9974776-1645600745385-MNXGJF6s.jpg',
    },
    {
        title: 'Tiến sĩ Hoàng Hậu',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_thumbnails/horizontal_poster-ffa0fc69cdf4-1631262110649-ic5nTcP0.jpg',
    },
];