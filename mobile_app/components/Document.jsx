import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Image, Linking } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 


const Document = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image style={styles.imageFront} source={{uri: props.front}} />
                <Image style={styles.imageBack} source={{uri: props.back}} />
            </View>

            <View style={styles.textWrapper}>
                <Text style={styles.text}>Similarity: {props.similarity}</Text>

                <TouchableOpacity onPress={() => Linking.openURL(props.link)}>
                    <Image style={styles.openImage} source={require('./../assets/openPdfIcon.png')} />
                </TouchableOpacity>
            </View>


        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
        paddingBottom: 30,
        paddingHorizontal: 10,
    },
    imageFront: {
        width: 170,
        height: 110,
        opacity: 0.75,
        borderTopLeftRadius: 20,
    },
    imageBack: {
        width: 170,
        height: 110,
        opacity: 0.75,
        borderTopRightRadius: 20,
    },
    imageWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    textWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 340,
        backgroundColor: '#8B8092',
        paddingVertical: 10,
        borderBottomRightRadius: 20,
    },
    text: {
        paddingLeft: 15,
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    openImage: {
        marginRight: 15,
    }
    });


export default Document;