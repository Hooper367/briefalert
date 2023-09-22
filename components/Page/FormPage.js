import React, { useState } from 'react';
import { View, Text } from 'react-native';
import AdresseDescriptionScreen from '../Stepper/AdressScreen';
import ChoixPhotoScreen from '../Stepper/ImageScreen';
import InfosScreen from '../Stepper/InfosScreen';
import PickerScreen from "../Stepper/PickerScreen";

const FormPage = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <View>
            {currentStep === 1 && <PickerScreen  navigation={navigation}/>}
            {currentStep === 2 && <AdresseDescriptionScreen  navigation={navigation}/>}
            {currentStep === 3 && <ChoixPhotoScreen navigation={navigation} />}
            {currentStep === 4 && <InfosScreen navigation={navigation} />}
        </View>
    );
};

export default FormPage;