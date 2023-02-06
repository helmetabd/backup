import React, { useState } from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

const InputBox = (props) => {

    const [inputBox, setInputBox] = useState("");

    const onchangeInputBox = (e) => {
        setInputBox(e.target.value)
        props.onChangeText(e.target.value)
    }

    return (
        <View style={styles.containerInput}>
            <Text>{props.title}</Text>
            <TextInput style={styles.input} id={props.id} onChangeText={onchangeInputBox} value={inputBox}></TextInput>
        </View>
    );
}

const styles = StyleSheet.create({
    containerInput: {
        marginHorizontal: 20,
        padding: 10,
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: "gray",
        borderWidth: 1,
    }
})

export default InputBox;
