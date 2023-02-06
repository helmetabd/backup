import React, {useState} from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, View, Platform } from 'react-native';
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import {Block, Button, Input} from "galio-framework"
import { AppStyles } from '../AppStyles';

const CustomDatePicker = ({ defaultDate, onDateChange }) => {
    const [date, setDate] = useState(moment());
    const [show, setShow] = useState(false);

    const onChange = (e, selectedDate) => {
        setDate(moment(selectedDate));
    }

    const onAndroidChange = (e, selectedDate) => {
        setShow(false);
        if(selectedDate){
            setDate(moment(selectedDate));
            onDateChange(selectedDate);
        }
    }

    const onDonePress = () => {
        onDateChange(date);
        setShow(false);
    }

    const onCancelPress = () => {
        setDate(moment(defaultDate));
        setShow(false);
    }

    const renderDatePicker = () => {
        return(
            <DateTimePicker
                timeZoneOffsetInMinutes={0}
                style={styles.InputContainer}
                value={new Date(date)}
                mode="date"
                minimumDate={new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))}
                maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
            />
        )
    }

    return (
        // <Block>
        //     <Button 
        //         round
        //         size='large'
        //         icon={AntDesign.Button("calendar")}
        //         family={AntDesign}
        //         iconSize={14}
        //         iconColor="black"
        //         onPress={() => setShow(true)}
        //     >{date.format('Do MMMM, YYYY')}</Button>
        //     {Platform.OS !== 'ios' && show && renderDatePicker()}
        // </Block>
        <TouchableHighlight
            activeOpacity={0}
            onPress={() => setShow(true)}
            style={styles.InputContainer}>
            <Block fluid>
                <Text>{date.format('Do MMMM, YYYY')}</Text>
                
                {Platform.OS !== 'ios' && show && renderDatePicker()}
                
                {Platform.OS === 'ios' && (
                    <Modal 
                    transparent={true}
                    animationType="slide"
                    visible={show}
                    supportedOrientations={['portrait']}
                    onRequestClose={() => setShow(false)}>
                        <View>
                            <TouchableHighlight
                                style={{
                                    flex:1,
                                    alignItems:'flex-end',
                                    flexDirection:'row'
                                }}
                                activeOpacity={1}
                                visible={show}
                                onPress={() => setShow(false)}>
                                <TouchableHighlight 
                                underlayColor={'#ffffff'}
                                style={{
                                    flex:1,
                                    borderTopColor: "#E9E9E9",
                                    borderTopWidth: 1,
                                }}
                                onPress={() => console.log("datepicker click")}>
                                <View style={{
                                    backgroundColor: "#ffffff",
                                    height: 256,
                                    overflow: 'hidden',
                                }}>
                                    <View style={{marginTop: 20}}>
                                        {renderDatePicker()}
                                    </View>
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={onCancelPress}
                                        style={styles.btnCancel}>
                                        <Text>Cancel</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={onDonePress}
                                        style={styles.btnDone}>
                                        <Text>Done</Text>
                                    </TouchableHighlight>
                                </View>    
                                    
                                </TouchableHighlight> 

                            </TouchableHighlight>
                        </View>

                    </Modal>
                )}
            </Block>
        </TouchableHighlight>
    );
};


CustomDatePicker.defaultProps = {
    textStyle: {},
    defaultDate: "2000-05-03",
    onDateChange: () => {}
};

const styles = StyleSheet.create({
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnCancel: {
        left: 0
    },
    btnDone: {
        right: 0
    },
    InputContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor:"transparent",
        width: "80%"
    },
})


export default CustomDatePicker;
