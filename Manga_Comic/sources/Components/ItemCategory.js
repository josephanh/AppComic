import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Color from '../Utils/Color'
import FastImage from 'react-native-fast-image'

const ItemCategory = (props) => {

    let { data } = props;

    if (data.item != undefined) {
        data = data.item;
    }

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.4}>
            <FastImage
                style={styles.image}
                source={{
                    uri: data.image,
                    headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                }}
                defaultSource={require('../../assets/images/placeholder-image.png')}
                resizeMode={FastImage.resizeMode.cover}/>
                <Text style={styles.txtTitleVertical} numberOfLines={1}>{data.name} </Text>
        </TouchableOpacity>
    )
}

export default ItemCategory

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.White,
        width: (Dimensions.get('screen').width - 40)/ 4,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    image: {
        width: 30,
        height: 30
    },
    txtTitleVertical: {
        fontFamily: Fonts.font_500,
        fontSize: 12,
        padding: 5,
        color: Color.greyLight,
        textAlign: 'center'
    },
})