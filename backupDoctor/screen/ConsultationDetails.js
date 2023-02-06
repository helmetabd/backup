import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Block, Accordion, Text, theme, Button } from 'galio-framework';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Alert, ScrollView, Image, Dimensions} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import localhostaddress from '../localhost';
import { AppStyles } from '../AppStyles';

const { width, height } = Dimensions.get("screen");

const ConsultationDetails = ({ navigation}) => {

    const dispatch = useDispatch();
    const dataConsult = useSelector(state => state.dataConsult)
    const dataDoctor = useSelector(state => state.dataDoctor);
    const [consultation, setConsultation] = useState({});
    const [dataArray, setDataArray] = useState([]);
    const [diagnose, setDiagnose] = useState({});
    const [prescription, setPrescription] = useState({})
    const [data, SetData] = useState({});


    const fetchConsultation = async () => {
        axios.get(`${localhostaddress}:8080/api/consult/${dataConsult.id}`, { 
            headers:{
                "Content-Type": "application/json",
                Authorization: await AsyncStorage.getItem('Authorization')
            }
        })
        .then(({ data }) => {
            console.log(data)
            setConsultation(data)
            let dataArr = [{  title: "Details", content: data.description }];
            setDataArray(dataArr);
            SetData({
                image: dataDoctor.doctorDetail.coverImage, 
                name: dataDoctor.doctorDetail.name,
                status: data.status,
                specialist: dataDoctor.doctorDetail.specialist,
                subject: data.subject,
                date: data.consultationDate
            })
        })
        .catch((error) => {
            console.log(error)
            Alert.alert('Something went wrong')
        });
        
    }

    const fetchDiagnose = async () => {
                axios.get(`${localhostaddress}:8080/api/diagnose/${dataConsult.id}`, { 
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

    const fetchPrescription = async () => {
            
           axios.get(`${localhostaddress}:8080/api/prescription/${consultation.id}`, { 
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: await AsyncStorage.getItem('Authorization')
                    }
                })
                .then(({ data }) => {
                console.log(data)
                setPrescription(data)
                dispatch({ type: 'SET_PRES', payload: data })
                })
                .catch((error) => {
                    console.log(error)
                    Alert.alert('Something went wrong')
                });
    }
    
    useEffect(() => {
        fetchConsultation();
        fetchDiagnose();
        // fetchPrescription();
    }, [])

    const convertDate = (date) => {
        const newDate = new Date(date);
        const parseDate = newDate.toDateString().split(' ').slice(1);
        const finalDate = `${parseDate[1]} ${parseDate[0]} ${parseDate[2]}`;
        return finalDate;
    }

    return (
        <Block center>
        <ScrollView
            style={styles.components}
            showsVerticalScrollIndicator={false}>
            <Block flex center>
            <Block flex style={styles.group}>
                <Text bold size={12} style={[styles.titleConsultation, styles.leftTitle]}>Consultation</Text>
                <Block row={true} card flex style={[styles.product, styles.shadow]}>
                    <Block flex style={[styles.imageContainer, styles.shadow]}>
                        <Image source={{ uri: data.image }} style={styles.horizontalImage} />
                    </Block>
                    <Block center flex space="between" style={styles.productDescription}>
                        <Text bold size={14} style={styles.productTitle}>Dr. {data.name}</Text>
                        <Text size={14} style={styles.productTitle} >Specialist {data.specialist}</Text>
                    </Block>
                </Block>
                <Block >
                    <Block center>
                        <Block row>
                        <Text size={12} style={styles.productTitle}>{data.subject}</Text>
                        <Text size={12} color={(data.status === "PROGRESS") ? theme.COLORS.PRIMARY : (data.status === "COMPLETED") ? "#45DF31" : theme.COLORS.TWITTER} 
                        style={styles.statusTitle}
                        >{data.status}</Text>
                        </Block>
                    </Block>
                </Block>
                <Block center  row>
                    <AntDesign name="calendar" size={24} color="black" />
                    <Text style={styles.comment}>{convertDate(data.date)}</Text>
                </Block >
                <Block style={{ height: 200 }}>
                    <Accordion dataArray={dataArray} />
                </Block>
                <Button disabled={prescription ? false : true} size="large" color={AppStyles.color.tint} onPress={() => {navigation.navigate("Prescription")}}>Go to Precription</Button>
            </Block>
        </Block>
    </ScrollView>
    </Block>
    );
}

const styles = StyleSheet.create({
    group: {
        paddingTop: theme.SIZES.BASE * 0.5,
      },
      product: {
        backgroundColor: theme.COLORS.WHITE,
        marginVertical: theme.SIZES.BASE,
        borderWidth: 0,
        minHeight: 114,
      },
      shadow: {
      shadowColor: theme.COLORS.BLACK,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      elevation: 2,
      },
      productTitle: {
        flex: 1,
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        paddingVertical: 10
      },
      statusTitle: {
        flex: 1,
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        paddingVertical: 10
      },
      imageContainer: {
        elevation: 1,
      },
      horizontalImage: {
        height: 122,
        width: 'auto',
        borderRadius: 10
      },
      components: {
        width: width
      },
      title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: 'bold',
        color: AppStyles.color.tint,
        marginTop: 20,
        marginBottom: 5,
      },
      titleConsultation: {
        fontSize: AppStyles.fontSize.content,
        fontWeight: 'bold',
        color: AppStyles.color.categoryTitle,
        marginTop: 20,
        marginBottom: 5,
      },
      leftTitle: {
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 20,
      },
      comment: {
        fontSize: AppStyles.fontSize.normal,
        fontWeight: 'normal',
        color: "black",
        marginTop: 5,
        marginBottom: 20,
        width: 300,
        flexWrap: 'wrap',
        alignSelf: 'stretch',
        textAlign: 'left',
        marginLeft: 20,
      },
})

export default ConsultationDetails;
