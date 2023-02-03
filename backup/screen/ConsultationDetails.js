import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Block, Accordion, Text } from 'galio-framework';
import React, { useState } from 'react';
import {View, StyleSheet, Alert, ScrollView, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

const ConsultationDetails = ({route, navigation}) => {

    const dispatch = useDispatch();
    const dataConsult = useSelector(state => state.dataConsult)
    const dataDoctor = useSelector(state => state.dataDoctor);
    const [consultation, setConsultation] = useState({});
    const [dataArray, setDataArray] = useState([]);
    const [diagnose, setDiagnose] = useState({});
    const { item } = route.params;


    const fetchConsultation = async () => {
        axios.get(`http://192.168.1.5:8080/api/consult/${dataConsult.id}`, { 
            headers:{
                "Content-Type": "application/json",
                Authorization: await AsyncStorage.getItem('Authorization')
            }
        })
        .then(({ data }) => {
            console.log(data)
            setConsultation(data)
            let dataArr = {  title: "Details", content: data.description };
            setDataArray(dataArr);
        })
        .catch((error) => {
            console.log(error)
            Alert.alert('Something went wrong')
        });
    }

    const fetchDiagnose = async () => {

        if(dataConsult.status === "PROGRESS"){

            axios.get(`http://192.168.1.5:8080/api/diagnose/${dataConsult.id}`, { 
                headers:{
                    "Content-Type": "application/json",
                    Authorization: await AsyncStorage.getItem('Authorization')
                }
            })
            .then(({ data }) => {
                console.log(data)
                setDiagnose(data)
                let dataArr = {  title: "Diagnose", content: data.description }
                setDataArray(state => {
                    return [...state, dataArr]
                })
            })
            .catch((error) => {
                console.log(error)
                Alert.alert('Something went wrong')
            });
        }
    }
    
    useEffect(() => {
          fetchConsultation();
          fetchDiagnose();
    }, [])

    const convertDate = (date) => {
        const parseDate = date.toDateString().split(' ').slice(1);
        const finalDate = `${parseDate[1]} ${parseDate[0]} ${parseDate[2]}`;
        // console.log(newDate);
        return finalDate;
        // return console.log(date);
    }

    return (
    <ScrollView>
        <Block flex center>
            <Block row>
                <Image style={styles.gambar} source={{uri: dataDoctor.coverImage}}/>
                <Block>
                    <Block space='between' row>
                        <Text style={styles.or}>Dr. {dataDoctor.name}</Text>
                        <Text style={styles.comment}>{dataConsult.status}</Text>
                    </Block>
                    <Text style={styles.comment}>{dataDoctor.specialist}</Text>
                    <Text style={styles.comment}>{dataDoctor.subject} years old</Text>
                </Block>
            </Block>
            <Block center row>
                <AntDesign name="calendar" size={24} color="black" />
                <Text style={styles.comment}>{convertDate(dataConsult.date)}</Text>
            </Block >
            <Block style={{ height: 200 }}>
                <Accordion dataArray={dataArray} />
            </Block>
        </Block>
    </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default ConsultationDetails;
