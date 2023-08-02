import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from '../Utils/Color'
import Fonts from '../Utils/Fonts'
import { AnimatedFlashList } from '@shopify/flash-list'
import ItemManga from '../Components/ItemManga'
import AxiosIntance from '../Utils/AxiosIntance'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'

const Bookmark = () => {
    const user = useSelector((state) => state.login);
    const [bookmark, setbookmark] = useState([]);
    const [dataDexuat, setdataDexuat] = useState([]);
    useEffect(() => {
        if (user.isLogin) {
            const getData = async () => {
                const response = await AxiosIntance().get(`api/user/getbookmark/${user.userInfo._id}`);
                // console.log(response.result.bookmark);
                setbookmark(response.result.bookmark)
            }
            getData();
        }
        const getDataDexuat = async () => {
            const responseHot = await AxiosIntance().get("api/manga/getmanga/all");
            setdataDexuat(responseHot);
        }
        getDataDexuat();
        return () => {

        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.boxTitleBookmarks}>
                <Text style={styles.txtTitleBookmark}>Truyện đã lưu</Text>
            </View>
            <View>
                {
                    bookmark.length == 0
                        ? <View style={styles.empty_folder}>
                            <Text style={styles.txtTitleBookmark}>Chưa lưu truyện</Text>
                            <Image style={styles.ic_empty} source={require('../../assets/images/ic-folder-empty.png')} />
                        </View>
                        : <View>
                            <FlatList
                                scrollEnabled={true}
                                data={bookmark}
                                estimatedItemSize={150}
                                renderItem={item => <ItemManga data={item} type={'horizontal'} />}
                                keyExtractor={item => item._id}
                                horizontal
                                showsHorizontalScrollIndicator={false} />

                        </View>
                }
            </View>
            <View style={styles.content_container}>
                <View style={styles.txtTrending}>
                    <Text style={styles.txtTitle}>Truyện đề xuất</Text>
                    <TouchableOpacity>
                        <Image style={styles.icDetail} source={require('../../assets/images/ic-ellipsis-horizontal.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listHorizontal}>
                <AnimatedFlashList
                    data={dataDexuat}
                    renderItem={item => <ItemManga data={item} type={'horizontal'} />}
                    estimatedItemSize={107}
                    keyExtractor={item => item._id}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default Bookmark

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.White,
        padding: 20,
        paddingTop: 40
    },
    txtTitleBookmark: {
        fontFamily: Fonts.font_700,
        fontSize: 16,
        color: Color.blackDark,
        marginTop: 10
    },
    empty_folder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFBF5',
        padding: 25,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
    },
    ic_empty: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        tintColor: 'red',
    },
    content_container: {
        marginTop: 20,
    },
    txtTrending: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    txtTitle: {
        fontFamily: Fonts.font_700,
        fontSize: 16,
        color: Color.blackDark
    },
    icDetail: {
        width: 24,
        height: 24
    },
    listHorizontal: {
        flex: 1,
    }
})

var DataBookmarks = []
var data = [{
    "_id": 1,
    "title": "Yêu anh hơn cả Tử Thần    ",
    "author": "Tào Đình",
    "image": "https://cn-e-pic.itoon.org/cartoon-posters/657686919.webp",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."
}, {
    "_id": 2,
    "title": "Cố Mạn bên nhau cả đời",
    "author": "Derek Collins ",
    "image": "https://ainoicuocsonglagioihan.vn/wp-content/uploads/2018/12/62.jpg",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."
}, {
    "_id": 3,
    "title": "Ăn mày dĩ vẵng",
    "author": "By Susan Wise Bauer",
    "image": "https://weriviu.com/wp-content/uploads/2022/05/an-may-di-vang.png",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."

}, {
    "_id": 4,
    "title": "Đối Bất Khởi, Ngã Vô Địch (Xin lỗi, ta vô địch 1 tỉ năm)",
    "author": "Liễu Thập Ức Niên",
    "image": "https://nae.vn/ttv/ttv/public/images/story/9155908a7d01871ba8332459c9372fcca9e775952f1a0b37d59d62b01cabda20.jpg",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."
}, {
    "_id": 5,
    "title": "Ông già và biển cả",
    "author": "Ernest Hemingway",
    "image": "https://bizweb.dktcdn.net/100/370/339/products/ong-gia-va-bien-ca.jpg?v=1590059664563",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."
}, {
    "_id": 6,
    "title": "Aftermath: Ác quỷ rừng phế tích",
    "author": "Nam Thanh",
    "image": "https://weriviu.com/wp-content/uploads/2022/06/aftermath-ac-quy-rung-phe-tich.png",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."
}]