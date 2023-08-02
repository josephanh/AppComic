import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Color from "../Utils/Color";
import AxiosIntance from "../Utils/AxiosIntance";
import ItemManga from "../Components/ItemManga";

const Search = (props) => {
    const { navigation, route } = props;
    const { params } = route;
    const [data, setdata] = useState([]);
    useEffect(() => {
        const GetList = async () => {
            // http://localhost:3000/api/manga/search/all?keyword=ngôn%20tình
            const response = await AxiosIntance().get(`/api/manga/search/all?keyword=${params.key}`);
            setdata(response);
            console.log(response);
            if (response.error == false) {

            }
        }
        GetList();
        return () => {
        }
    }, [])
    console.log(params);
    return (
        <View style={styles.container}>
            <StatusBar translucent={false} backgroundColor={"#fff"} />
            <Text>{params.key}</Text>
            <FlatList
                scrollEnabled={true}
                data={data}
                estimatedItemSize={150}
                renderItem={item => <ItemManga data={item} type={'vertical'} />}
                keyExtractor={item => item._id}
                showsHorizontalScrollIndicator={false} />
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.White,
    }
});
