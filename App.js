// App.js
import React from 'react';
import HomePage from "./components/Page/HomePage";
import FormPage from "./components/Page/FormPage";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AdressScreen from "./components/Stepper/AdressScreen";
import ImageScreen from "./components/Stepper/ImageScreen";
import InfosScreen from "./components/Stepper/InfosScreen";
import PickerScreen from "./components/Stepper/PickerScreen";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomePage} options={{headerShown: false }} />
                    <Stack.Screen name="FormPage" component={FormPage}  options={{headerShown: false }} />
                    <Stack.Screen name="AdressScreen" component={AdressScreen}  options={{headerShown: false }} />
                    <Stack.Screen name="ImageScreen" component={ImageScreen}  options={{headerShown: false }} />
                    <Stack.Screen name="InfosScreen" component={InfosScreen}  options={{headerShown: false }} />
                    <Stack.Screen name="PickerScreen" component={PickerScreen}  options={{headerShown: false }} />
                </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
