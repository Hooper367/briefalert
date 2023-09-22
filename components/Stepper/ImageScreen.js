import React, { useState, useEffect } from 'react';
import {View, Text, Image, Button, TouchableOpacity, StyleSheet, TextInput, SafeAreaView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageScreen = ({ navigation, route }) => {
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');
    const currentStep = route.params.currentStep + 1;

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access media library is required');
            }
        })();
    }, []);

    const handleChoosePhoto = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,

            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0]);
        }
    };

    const handleTakePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0]);
        }
    };

    const handlePrevious = () => {
        navigation.goBack();
    };

    const handleNext = () => {
        navigation.navigate('InfosScreen', {
            address: route.params.address,
            description: description,
            alertType: route.params.alertType,
            alertDate: route.params.alertDate,
            alertTime: route.params.alertTime,
            currentStep: currentStep,
            photo,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.stepText}>Étape {currentStep}</Text>
                <Text style={styles.titleText}>Choisissez votre photo ou prenez une nouvelle photo</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.descriptionText}>Choisissez une photo :</Text>
                <TouchableOpacity onPress={handleChoosePhoto} style={styles.button}>
                    <Text style={styles.buttonText}>Choisir une photo depuis la galerie</Text>
                </TouchableOpacity>
                <Text style={styles.descriptionText}>Prendre une nouvelle photo :</Text>
                <TouchableOpacity onPress={handleTakePhoto} style={styles.button}>
                    <Text style={styles.buttonText}>Prendre une nouvelle photo</Text>
                </TouchableOpacity>
                {photo && (
                    <Image
                        source={{ uri: photo.uri }}
                        style={styles.image}
                    />
                )}
                <Text style={styles.descriptionText}>Description :</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Décrivez-nous le signalement"
                />
            </View>
            <View style={styles.footer}>
                <Button title="Étape suivante" onPress={handleNext} />
                <Button title="Étape précédente" onPress={handlePrevious} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        alignItems: 'center',
    },
    content: {
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stepText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textDecorationLine: "underline",
    },
    titleText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 10,
        justifyContent: "center"
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
});

export default ImageScreen;