import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";

export default class Home extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{'Panda Warrior'}</Text>
                <TouchableOpacity style={styles.btn} onPress={()=>Actions.normal_chat()}>
                    <Text style={styles.text}>All Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={()=>Actions.all_chat()}>
                    <Text style={styles.text}>Stream Chat</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    btn: {
        marginVertical: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: 'purple',
        borderRadius: 12,
        width: 300
    },
    title: {
        fontFamily: 'Muli-Italic',
        marginVertical: 40,
        fontSize: 60,
        color: 'purple'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontFamily: 'Muli-Light'
    }
});