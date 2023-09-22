import React, { useState } from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';

const HomePage = ({ navigation }) => {
    const [rgpdAccepted, setRgpdAccepted] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAcceptRGPD = () => {
        setRgpdAccepted(!rgpdAccepted);
    };

    const handleSignalezPress = () => {
        if (rgpdAccepted) {
            navigation.navigate('PickerScreen');
        } else {
            alert("Veuillez accepter les RGPD pour continuer.");
        }
    };

    return (
        <>
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/logobrief-removebg-preview.png')} style={styles.logo} />

            <View style={styles.checkboxContainer}>
                <TouchableOpacity
                    style={styles.checkbox}
                    onPress={handleAcceptRGPD}
                >
                    {rgpdAccepted ? (
                        <View style={styles.checkboxInner} />
                    ) : null}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Accepter les RGPD</Text>
                <TouchableOpacity
                    style={styles.infoButton}
                    onPress={toggleModal}
                >
                    <Text style={styles.infoButtonText}>i</Text>
                </TouchableOpacity>
            </View>



            <TouchableOpacity
                style={styles.button}
                onPress={handleSignalezPress}
            >
                <Text style={styles.buttonText}>Signalez</Text>
            </TouchableOpacity>

            {/* affichage seulement au clqiue sur le i*/}
            <Modal isVisible={isModalVisible}>
                <ScrollView style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Conditions Générales de l'Application</Text>
                    <Text style={styles.modalText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam ex a est semper.
                        Fusce fringilla, mi ut aliquam luctus, lorem turpis mattis purus, vel feugiat nunc ipsum nec arcu.
                    </Text>
                    <Text style={styles.modalText}>
                        Nullam fringilla, quam in gravida commodo, leo erat convallis felis, eget congue felis justo nec odio.
                        Donec aliquet consectetur ipsum, nec convallis urna feugiat eu.
                    </Text>
                    <TouchableOpacity onPress={toggleModal}>
                        <Text style={styles.modalCloseButton}>Fermer</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        padding: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#007BFF',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxInner: {
        width: 14,
        height: 14,
        backgroundColor: '#007BFF',
        borderRadius: 2,
    },
    checkboxLabel: {
        fontSize: 16,
        color: 'white',
    },
    infoButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        marginLeft: 10,
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 15,
    },
    infoButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalCloseButton: {
        color: 'blue',
        fontSize: 16,
        marginTop: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default HomePage;