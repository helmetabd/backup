import React, { useEffect } from 'react';
import {View, StyleSheet, Button, TouchableOpacity, Image, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {AppIcon, AppStyles} from '../AppStyles';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { Block } from 'galio-framework';

const InputImage = ({navigation}) => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [titleImage, setTitleImage] = useState(null);
    // const [linkImage, setLinkImage] = useState(null);
    const dispatch = useDispatch();
    const dataProfile = useSelector(state => state.dataProfile)

    const checkImage = () => {
        if(dataProfile.coverImage){
          setSelectedImage(dataProfile.coverImage)
        }
      }
    
      useEffect(() => {
        checkImage();
      }, []);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setTitleImage(result.assets[0].width);
        } else {
            alert('You did not select any image.');
        }
        console.log(titleImage);
        // console.log(result);
        // console.log(result.assets[0].width);
    };

    const upload = async (uri, name) => {

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const storageRef = ref(storage, `Patient/${dataProfile.name}/${titleImage}.${dataProfile.id}`);
    
        await uploadBytes(storageRef, blob)
        .then((snapshot) => {
            return getDownloadURL(storageRef)
        })
        .then(downloadUrl => {
            console.log(downloadUrl);
            // setLinkImage(downloadUrl);
            dispatch({type: "SET_DATA", payload: downloadUrl} )
            navigation.navigate("Home");
        })
        .catch(err => {
            console.log(err);
        })      
    }

    return (
        <Block flex center>
            <Block center>
                <Image source={!selectedImage ? AppIcon.images.defaultUser : {uri: selectedImage}} style={{width: 250, height: 250}}/>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => pickImageAsync()}>
                    <Text style={styles.loginText}>Pick Profile Image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => upload(selectedImage, dataProfile.name)}>
                    <Text style={styles.loginText}>Upload</Text>
                </TouchableOpacity>
            </Block>
        </Block>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
    },
    loginText: {
        color: AppStyles.color.white,
    },
})

export default InputImage;
