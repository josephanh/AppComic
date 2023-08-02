import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Button, ToastAndroid, Alert, Modal } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../Redux/store'
import Color from '../Utils/Color'
import { Dimensions } from 'react-native'
import { StatusBar } from 'react-native'
import FastImage from 'react-native-fast-image'
import DropShadow from 'react-native-drop-shadow'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Fonts from '../Utils/Fonts'
import { FlashList } from '@shopify/flash-list'
import { useNavigation } from '@react-navigation/native'
import { goToDetail, showLogin } from '../Redux/Action/action'
import { fetchManga } from '../Redux/Action/API/CallAPI'
import AxiosIntance from '../Utils/AxiosIntance'

const DetailManga = () => {

  const data = useSelector(state => state.detailManga.data);
  const user = useSelector((state) => state.login);
  // console.log(data);
  const [opacity, setOpacity] = useState(1);
  const navigation = useNavigation();
  const [ref, setref] = useState(null);
  const listRef = useRef(null);
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataMore, setdataMore] = useState([]);
  const dispatch = useDispatch();
  // console.log(data._id);
  useEffect(() => {
    if (user.isLogin) {
      dispatch(fetchManga(data._id));
    }
  }, [dispatch]);

  const onPress = () => {

  }

  const ItemManga = (props) => {
    let { data, type } = props;

    if (data.item != undefined) {
      data = data.item;
    }
    // console.log(data);
    const navigation = useNavigation();
    const gotoDetailManga = () => {
      listRef.current.scrollTo({ offset: 0, animated: true })
      dispatch(goToDetail(data));
      navigation.navigate('DetailManga');

    }
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
                      uri: data?.image?.url,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    defaultSource={require('../../assets/images/placeholder-image.png')}
                    resizeMode={FastImage.resizeMode.cover}

                  />
                </DropShadow>
                <Text style={styles.txtTitleHorizontal} numberOfLines={1}>{data?.title}</Text>
                <Text style={styles.txtAuthorHorizontal} numberOfLines={1}>{data?.author}</Text>

              </View>
            </TouchableOpacity>
            :
            type == "vertical" ?
              <DropShadow style={[styles.dropShadowVertical, styles.boxVertical]}>
                <TouchableOpacity activeOpacity={0.3} style={styles.containerVertical} onPress={gotoDetailManga}>
                  <FastImage
                    style={styles.imageSizeSmall}
                    source={{
                      uri: data?.image?.url,
                      headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    defaultSource={require('../../assets/images/placeholder-image.png')}
                    resizeMode={FastImage.resizeMode.cover}

                  />
                  <View>
                    <Text style={styles.txtTitleVertical} numberOfLines={2}>{data?.title}</Text>
                    <Text style={styles.txtAuthorVertical} numberOfLines={1}>{data?.author}</Text>
                  </View>


                </TouchableOpacity>
              </DropShadow>
              : <View></View>
        }
      </View>

    )
  }

  useEffect(() => {
    const GetList = async () => {
      const response = await AxiosIntance().get("api/manga/getmanga/category/Ngôn%20tình");
      setdataMore(response);
      // console.log(response);
      if (response.error == false) {

      }
    }
    GetList();
    return () => {
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.background_image}>
        <FastImage
          // nativeID={`image${data.data._id}Dest`}
          style={[styles.image_bg, { opacity: opacity }]}
          source={{
            uri: data?.image.url,
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.high,
          }}
          defaultSource={require('../../assets/images/placeholder-image.png')}
          resizeMode={FastImage.resizeMode.stretch} />
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 1)']}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 0.9 }}>
        </LinearGradient>
      </View>
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.ic_back} onPress={() => navigation.goBack()}>
          <Image style={{ width: 24, height: 24 }} source={require('../../assets/images/arrow-small-left.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={listRef}
        onScroll={e => {
          setOpacity(1 - e.nativeEvent.contentOffset.y * (1 / 400))
          setContentVerticalOffset(e.nativeEvent.contentOffset.y);
        }}>
        <View style={styles.container_content}>
          <DropShadow style={styles.dropShadowDetail}>
            <View style={styles.content}>
              <View style={styles.infoManga}>
                <FastImage
                  // nativeID={`image${data.data._id}Dest`}
                  style={styles.imageDetail}
                  source={{
                    uri: data.image.url,
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.high,
                  }}
                  defaultSource={require('../../assets/images/placeholder-image.png')}
                  resizeMode={FastImage.resizeMode.stretch} />
                <View style={{ padding: 10, flex: 1 }}>
                  <Text style={styles.txtTitleManga}>{data?.title}</Text>
                  <Text style={styles.txtAuth}>Tác giả: {data?.author}</Text>
                  <Text style={styles.txtAuth}>Thể loại: {data.category.title}</Text>

                </View>
              </View>
              <View style={{ marginTop: 5, flexDirection: 'row' }}>
                <Pressable style={styles.buttonRead}
                  onPress={() => {
                    if (user.isLogin) {
                      navigation.navigate('ReadingManga')
                    } else {
                      // alert("Bạn cần đăng nhập để đọc truyện")
                      // Alert.alert("Lỗi", "Bạn cần đăng nhập để thực hiện");
                      setModalVisible(true);
                    }
                  }}>
                  {
                    modalVisible ?
                      <View style={styles.centeredView}>
                        <Modal
                          animationType="slide"
                          transparent={true}
                          visible={modalVisible}
                          onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                          }}>
                          <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                              <Text style={[styles.modalText, styles.txtTitle, { color: "#b78a28" }]}>Bạn cần đăng nhập để thực hiện</Text>
                              <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <Pressable
                                  style={[styles.buttonRead]}
                                  onPress={() => {
                                    setModalVisible(!modalVisible)
                                    dispatch(showLogin({ showLogin: true }));
                                  }}>
                                  <Text style={[styles.txtTitleManga, { color: Color.White, fontSize: 14 }]}>Đăng nhập</Text>
                                </Pressable>
                                <Pressable
                                  style={[styles.buttonRead, { backgroundColor: Color.White }]}
                                  onPress={() => {
                                    setModalVisible(!modalVisible)
                                  }}>
                                  <Text style={[styles.txtTitleManga, { color: '#b78a28', fontSize: 14 }]}>Hủy</Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                        </Modal>
                      </View>
                      : <View></View>
                  }
                  <Text style={[styles.txtTitleManga, { color: Color.White, fontSize: 14 }]}>Đọc</Text>
                </Pressable>
                <Pressable style={[styles.buttonRead, { backgroundColor: Color.White }]}
                  onPress={async () => {
                    if (user.isLogin) {
                      try {
                        console.log(`${user.userInfo._id}/${data._id}`);
                        const response = await AxiosIntance().post(`api/user/bookmark/${user.userInfo._id}/${data._id}`);
                        // console.log(response);
                        if (response) {
                          ToastAndroid.show("Đã lưu truyện thành công!", 3000);
                        } else {
                          ToastAndroid.show("Đã lưu truyện thất bại!", 3000);
                        }
                      } catch (error) {
                        console.log(error);
                        ToastAndroid.show("Đã lưu truyện thất bại!", 3000);

                      }
                    } else {
                      setModalVisible(true);
                    }
                  }}
                >
                  <Text style={[styles.txtTitleManga, { color: '#b78a28', fontSize: 14 }]}>Đánh dấu</Text>
                </Pressable>
              </View>
              <Text style={styles.txtDescribe}>{data?.describe}</Text>
            </View>
          </DropShadow>
        </View>

        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <View>
            <View style={styles.txtTrending}>
              <Text style={styles.txtTitle}>Ngôn tình</Text>
              <TouchableOpacity>
                <Image style={styles.icDetail} source={require('../../assets/images/ic-ellipsis-horizontal.png')} />
              </TouchableOpacity>
            </View>
          </View>
          {/* <FlatList
            scrollEnabled={false}
            data={dataMore}
            renderItem={item => <ItemManga data={item} type={'horizontal'} />}
            estimatedItemSize={107}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            onPointerEnter={onPress}
          /> */}
          <View style={styles.listDataMore}>
            {
              dataMore.map((item) => <ItemManga key={item._id} data={item} type={'horizontal'} />)
            }
          </View>
        </View>

        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <View>
            <View style={styles.txtTrending}>
              <Text style={styles.txtTitle}>Lịch sử</Text>
              <TouchableOpacity>
                <Image style={styles.icDetail} source={require('../../assets/images/ic-ellipsis-horizontal.png')} />
              </TouchableOpacity>
            </View>
          </View>
          {/* <FlatList
            scrollEnabled={false}
            data={dataMore}
            renderItem={item => <ItemManga data={item} type={'horizontal'} />}
            estimatedItemSize={107}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            onPointerEnter={onPress}
          /> */}
          <View style={styles.listDataMore}>
            {
              dataMore.map((item) => <ItemManga key={item._id} data={item} type={'horizontal'} />)
            }
          </View>
        </View>


      </ScrollView>
      <StatusBar translucent backgroundColor={'transparent'} />
    </View>
  )
}

export default DetailManga

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  toolbar: {
    paddingTop: 30,
    position: 'absolute',
    zIndex: 20,
    paddingLeft: 5
  },
  ic_back: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background_image: {
    width: Dimensions.get('screen').width,
    height: 'auto',
    position: 'absolute',
    top: 0,
    zIndex: -1
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%'

  },
  image_bg: {
    width: Dimensions.get('screen').width,
    height: undefined,
    aspectRatio: 0.10 / 0.14,
    resizeMode: 'stretch'
  },
  container_content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height * 0.8,
    marginTop: 80
  },
  content: {
    width: Dimensions.get('screen').width * 0.8,
    backgroundColor: Color.White,
    borderRadius: 10,
    padding: 15
  },
  dropShadowDetail: {
    shadowColor: Color.greyLight,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  txtTrending: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20
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
  infoManga: {
    flexDirection: 'row'
  },
  imageDetail: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10
  },
  txtTitleManga: {
    fontFamily: Fonts.font_700,
    fontSize: 16,
    color: Color.purplePrimary,
    lineHeight: 24,
  },
  txtAuth: {
    fontFamily: Fonts.font_500,
    fontSize: 14,
    color: Color.blackPrimary,
    lineHeight: 24
  },
  txtDescribe: {
    fontFamily: Fonts.font_500,
    fontSize: 14,
    color: Color.blackDark,
    lineHeight: 25,
    textAlign: 'justify',
    marginTop: 10,
    letterSpacing: 0.18
  },
  buttonRead: {
    backgroundColor: '#b78a28',
    padding: 4,
    paddingLeft: 15,
    paddingRight: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#b78a28'
  },
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
    aspectRatio: 0.12 / 0.15
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listDataMore: {
    flexDirection: 'row',
  }
})

var DataDemo = [{
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