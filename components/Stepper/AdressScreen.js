import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import getAddressSuggestions from "../GetAdress";

const AddressScreen = ({ navigation, route }) => {
    const currentStep = route.params.currentStep + 1;
    const [address, setAddress] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                setSelectedLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
            }
        })();
    }, []);

    const handleAddressChange = async (text) => {
        setAddress(text);

        const suggestions = await getAddressSuggestions(text);
        setSuggestions(suggestions);
    };

    const getAddressFromCoords = async (latitude, longitude) => {
        try {
            const location = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            if (location && location.length > 0) {
                const formattedAddress = `${location[0].streetNumber}, ${location[0].street}, ${location[0].postalCode}, ${location[0].city}, ${location[0].country}`;
                setAddress(formattedAddress);
            }
        } catch (error) {
            console.error('Error pour fetch address:', error);
        }
    };

    const handleMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
        getAddressFromCoords(latitude, longitude);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.stepText}>Étape {currentStep}</Text>
            <Text style={styles.titleText}>Choisir l'adresse du signalement</Text>

            <Text style={styles.labelText}>Saisissez une adresse :</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez une adresse"
                value={address}
                onChangeText={handleAddressChange}
            />

            <View style={styles.mapContainer}>
                <MapView style={styles.map} showsUserLocation onPress={handleMapPress}>
                    {selectedLocation && (
                        <Marker
                            coordinate={selectedLocation}
                            draggable
                            onDragEnd={(e) => {
                                const { latitude, longitude } = e.nativeEvent.coordinate;
                                setSelectedLocation({ latitude, longitude });
                                getAddressFromCoords(latitude, longitude);
                            }}
                        />
                    )}
                </MapView>

                {suggestions.length > 0 && (
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item, index) => `${item.displayName}_${index}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setAddress(item.displayName);
                                    setSelectedLocation({ latitude: item.lat, longitude: item.lon });
                                    setSuggestions([]);
                                }}
                                style={styles.suggestionItem}
                            >
                                <Text>{item.displayName}</Text>
                            </TouchableOpacity>
                        )}
                        style={styles.suggestionsList}
                    />
                )}
            </View>

            <Button
                title="Etape précédente"
                onPress={() => navigation.goBack()}
            />

            <Button
                title="Etape suivante"
                onPress={() => {
                    navigation.navigate('ImageScreen', {
                        alertType: route.params.alertType,
                        alertDate: route.params.alertDate,
                        alertTime: route.params.alertTime,
                        currentStep,
                        address,
                    });
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    stepText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textDecorationLine: "underline"
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginBottom: 10,
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
    },
    suggestionItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    suggestionsList: {
        marginTop: 10,
    },
});

export default AddressScreen;