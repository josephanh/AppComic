import { StyleSheet, FlatList, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemManga from '../Components/ItemManga'
import Color from '../Utils/Color'
import Fonts from '../Utils/Fonts'
import FastImage from 'react-native-fast-image'
import { FlashList } from "@shopify/flash-list";
import ItemCategory from '../Components/ItemCategory'
import ItemDetailCategory from '../Components/ItemDetailCategory'
import AxiosIntance from '../Utils/AxiosIntance'


const Categories = () => {
    const [dataAll, setdataAll] = useState([]);
    const [dataVienTuong, VienTuong] = useState([])
    useEffect(() => {
        const GetList = async () => {
            const response = await AxiosIntance().get("api/manga/manga-dexuat");
            const responseCategory = await AxiosIntance().get("/api/manga/getmanga/category/Cập nhật mới");
            setdataAll(response);
            VienTuong(responseCategory);
            // console.log(response);
            if (response.error == false) {

            }
        }
        GetList();
        return () => {
        }
    }, [])
    return (
        <ScrollView style={styles.container} nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 10 }}>
                <Text style={styles.txtTitle}>Thể loại truyện</Text>
            </View>
            <View>
                <FlatList
                    style={{ marginTop: 10 }}
                    data={category}
                    renderItem={item => <ItemCategory data={item} />}
                    keyExtractor={item => item._id}
                    numColumns={4}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false} />
            </View>

            <View style={styles.content_container}>
                <View style={styles.txtTrending}>
                    <Text style={styles.txtTitle}>Truyện đề xuất</Text>
                    <TouchableOpacity>
                        <Image style={styles.icDetail} source={require('../../assets/images/ic-ellipsis-horizontal.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: 'auto', height: 'auto' }}>
                <FlashList
                    scrollEnabled={false}
                    data={dataAll.slice(0, 6)}
                    renderItem={item => <ItemManga data={item} type={'horizontal'} />}
                    estimatedItemSize={107}
                    keyExtractor={item => item._id}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={styles.content_container}>
                <View style={styles.txtTrending}>
                    <Text style={styles.txtTitle}>Viễn tưởng</Text>
                    <TouchableOpacity>
                        <Image style={styles.icDetail} source={require('../../assets/images/ic-ellipsis-horizontal.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listHorizontal}>
                {
                    dataVienTuong.length == 0 ? <View></View>
                        : <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            {
                                dataVienTuong.map((item, index) => <ItemDetailCategory data={item} type={index == 0 ? 'vertical' : 'horizontal'} />)
                            }
                        </View>
                }
                {/* <ItemDetailCategory data={list} type={'vertical'} />
                <FlashList
                    scrollEnabled={false}
                    data={dataVienTuong}
                    renderItem={item => <ItemDetailCategory data={item} type={'horizontal'} />}
                    estimatedItemSize={107}
                    keyExtractor={item => item._id}
                    numColumns={4}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                /> */}
            </View>
            <View style={styles.content_container}>
                <View style={styles.txtTrending}>
                    <Text style={styles.txtTitle}>Ngôn tình</Text>
                    <TouchableOpacity>
                        <Image style={styles.icDetail} source={require('../../assets/images/ic-ellipsis-horizontal.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listHorizontal}>
                {/* <ItemDetailCategory data={list} type={'vertical'} /> */}
                {/* <FlashList
                    scrollEnabled={false}
                    data={data}
                    renderItem={(item) => <ItemDetailCategory data={item} type={'horizontal'} />}
                    estimatedItemSize={107}
                    keyExtractor={item => item._id}
                    numColumns={4}
                    showsVerticalScrollIndicator={false}
                /> */}
            </View>
        </ScrollView>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: Color.White,
        paddingTop: 40
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

var data = [{
    "_id": 1,
    "title": "Yêu anh hơn cả Tử Thần    ",
    "author": "Tào Đình",
    "image": "https://cn-e-pic.itoon.org/cartoon-posters/657686919.webp",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống. Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."
}, {
    "_id": 2,
    "title": "Cố Mạn bên nhau cả đời",
    "author": "Derek Collins ",
    "image": "https://ainoicuocsonglagioihan.vn/wp-content/uploads/2018/12/62.jpg",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống. Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."
}, {
    "_id": 3,
    "title": "Ăn mày dĩ vẵng",
    "author": "By Susan Wise Bauer",
    "image": "https://weriviu.com/wp-content/uploads/2022/05/an-may-di-vang.png",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống. Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."

}, {
    "_id": 4,
    "title": "Đối Bất Khởi, Ngã Vô Địch (Xin lỗi, ta vô địch 1 tỉ năm)",
    "author": "Liễu Thập Ức Niên",
    "image": "https://nae.vn/ttv/ttv/public/images/story/9155908a7d01871ba8332459c9372fcca9e775952f1a0b37d59d62b01cabda20.jpg",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống. Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."
}, {
    "_id": 5,
    "title": "Ông già và biển cả",
    "author": "Ernest Hemingway",
    "image": "https://bizweb.dktcdn.net/100/370/339/products/ong-gia-va-bien-ca.jpg?v=1590059664563",
    "describe": "Ruộng tốt vạn mẫu, nô bộc mấy trăm, hào môn đại trạch. . .Lý Tu Viễn xuyên qua trở thành địa chủ nhà đại thiếu gia, không có chút nào chí khí hắn vốn định làm một lần bại gia tử, khi một cái hoàn khố đệ tử, đùa giỡn đẹp tỷ, quảng thu tiểu thiếp, tiên y nộ mã. Thẳng đến có ngày hắn đột nhiên phát phát hiện mình nhà tại Quách Bắc huyện, huyện ngoài có cái Lan Nhược Tự. Càng trí mạng là Lý Tu Viễn trời sinh Thất Khiếu Linh Lung Tâm, quỷ quái ăn hắn một giọt tâm đầu huyết có thể tăng trăm năm tu vi, ăn hắn một mảnh tim can có thể thành ngàn năm lão yêu, đem cả người hắn nuốt, lập tức vũ hóa thành tiên."
}, {
    "_id": 6,
    "title": "Aftermath: Ác quỷ rừng phế tích",
    "author": "Nam Thanh",
    "image": "https://weriviu.com/wp-content/uploads/2022/06/aftermath-ac-quy-rung-phe-tich.png",
    "describe": "Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống.Một chàng trai hiền lành, tài năng, trong một lần hiến máu nhân đạo không may bị nhiễm HIV. Những tưởng chàng không thể thoát khỏi căn bệnh thế kỷ quái ác ấy, nhưng nhờ tình yêu của một nàng tiên nữ giáng trần, chàng đã được cứu sống."
},]


var category = [
    {
        _id: 1,
        name: "Hot nhất",
        image: "https://live.staticflickr.com/65535/52776883845_f800016b64.jpg"
    },
    {
        _id: 2,
        name: "Cập nhật mới",
        image: "https://live.staticflickr.com/65535/52776469931_d1288786e5.jpg"
    },
    {
        _id: 3,
        name: "Gia đình",
        image: "https://live.staticflickr.com/65535/52775940302_8a6a70a8d0.jpg"
    },
    {
        _id: 4,
        name: "Ngôn tình",
        image: "https://live.staticflickr.com/65535/52775940282_e51fdd1c05.jpg"
    },
    {
        _id: 5,
        name: "Viễn tưởng",
        image: "https://live.staticflickr.com/65535/52775940262_fe6011187b.jpg"
    },
    {
        _id: 6,
        name: "Lịch sử",
        image: "https://live.staticflickr.com/65535/52776727199_49bf14e631.jpg"
    },
]