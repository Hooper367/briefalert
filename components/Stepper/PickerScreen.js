import React, { useState } from 'react';
import {View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';

const PickerScreen = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirmDate = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisible(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisible(false);
    };

    const handleConfirmTime = (time) => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        setSelectedTime(`${hours}:${minutes}`);
        hideTimePicker();
    };

    const handleNext = () => {
        navigation.navigate('AdressScreen', {
            currentStep: currentStep,
            alertType: selectedType,
            alertDate: selectedDate.toISOString(),
            alertTime: selectedTime,
        });
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    const typeOptions = ["Accident", "Travaux", "Problème de voirie", "Chien perdu"];

    return (
        <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.stepText}>Étape {currentStep}</Text>
            <Text style={styles.descriptionText}>Choisir quel type de signalement et à quelle heure :</Text>

            <View>
                <Text style={styles.labelText}>Sélectionnez un type d'alerte :</Text>
                <SelectDropdown
                    data={typeOptions}
                    onSelect={(selectedItem) => handleTypeChange(selectedItem)}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdownButton}
                    buttonTextStyle={styles.dropdownButtonText}
                />
            </View>

            <View>
                <Text style={styles.labelText}>Sélectionner la date :</Text>
                <TouchableOpacity
                    onPress={showDatePicker}
                    style={styles.buttonContainer}
                >
                    <Text style={styles.buttonText}>
                        {selectedDate ? selectedDate.toLocaleDateString() : 'Choisir la date'}
                    </Text>
                </TouchableOpacity>

                {isDatePickerVisible && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => handleConfirmDate(selectedDate)}
                        onCancel={hideDatePicker}
                    />
                )}
            </View>

            <View>
                <Text style={styles.labelText}>Sélectionner l'heure :</Text>
                <TouchableOpacity
                    onPress={showTimePicker}
                    style={styles.buttonContainer}
                >
                    <Text style={styles.buttonText}>
                        {selectedTime ? selectedTime : 'Choisir l\'heure'}
                    </Text>
                </TouchableOpacity>

                {isTimePickerVisible && (
                    <DateTimePicker
                        value={selectedTime ? new Date(`2000-01-01T${selectedTime}:00`) :new Date()}
                        mode="time"
                        display="default"
                        onChange={(event, selectedTime) => handleConfirmTime(selectedTime)}
                        onCancel={hideTimePicker}
                    />
                )}
            </View>

            <View style={styles.buttonRow}>
                <Button title="Étape suivante" onPress={handleNext} />
            </View>
        </ScrollView>
            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    stepText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    descriptionText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    dropdownButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    dropdownButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});


export default PickerScreen;