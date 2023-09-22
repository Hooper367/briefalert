import React, { useState } from 'react';
import {View, Text, Image, TextInput, Button, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import * as MailComposer from 'expo-mail-composer';


const InfosScreen = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const currentStep = route.params.currentStep + 1;

    const handlePrevious = () => {
        navigation.goBack();
    };

    const sendEmail = async (formData) => {
        const { address, description, photo, alertType, alertDate, alertTime, name, email, phone } = formData;

        const Subject = 'Nouveau Signalement !!';
        const Body = `
            Type de signalement: ${alertType}
            Heure et date:  le ${alertDate} a ${alertTime}
            Adresse: ${address}
            Description: ${description}
            Nom: ${name}
            Email: ${email}
            Téléphone: ${phone}
        `;


        const emailConfig = {
            subject: Subject,
            body: Body,
            recipients: ['testforopiom@gmail.com'],
            ccRecipients: ['testforopiom@gmail.com'],
            bccRecipients: ['testforopiom@gmail.com'],
            attachments: [photo.uri],
        };

        try {
            const isAvailable = await MailComposer.isAvailableAsync();
            if (isAvailable) {
                await MailComposer.composeAsync(emailConfig);
                console.log('Email envoyer');
            } else {
                console.error('Email composer ne fonctionne pas ');
            }
        } catch (error) {
            console.error('Erreur envoie email:', error);
        }
    };

    const handleSubmit = async () => {
        const photoData = {
            uri: route.params.photo.uri,
            type: 'image/jpg',
            name: 'test.jpg',
        };

        const formData = {
            address: route.params.address,
            description: route.params.description,
            photo: photoData,
            alertType: route.params.alertType,
            alertDate: route.params.alertDate,
            alertTime: route.params.alertTime,
            name,
            email,
            phone,
        };
        await sendEmail(formData);
    };

    return (

        <ScrollView style={styles.container}>
            <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.stepText}>Etape {currentStep}</Text>
                <Text style={styles.titleText}>Rentrez vos informations personnelles</Text>
            </View>

            <Text>Nom :</Text>
            <TextInput
                onChangeText={setName}
                value={name}
                placeholder="Entrez votre nom"
            />

            <Text>Email :</Text>
            <TextInput
                onChangeText={setEmail}
                value={email}
                placeholder="Entrez votre email"
                keyboardType="email-address"
            />

            <Text>Téléphone :</Text>
            <TextInput
                onChangeText={setPhone}
                value={phone}
                placeholder="Entrez votre numéro de téléphone"
                keyboardType="phone-pad"
            />
            <Text style={{fontWeight: "bold", textDecorationLine: "underline", fontSize: 18}}>Recapitulatif des informations rentrées :</Text>
            <Text style={styles.recapInfos}>Type de signalement : {route.params.alertType}</Text>
            <Text style={styles.recapInfos}>Heure et date : {route.params.alertDate.toLocaleString()}  {route.params.alertTime} </Text>
            <Text style={styles.recapInfos}>Adresse : {route.params.address}</Text>
            <Text style={styles.recapInfos}>Photo :</Text>
            {route.params.photo && (
                <Image
                    source={{ uri: route.params.photo.uri }}
                    style={{ width: 250, height: 250 }}
                />
            )}
            <Text style={styles.recapInfos}>Description : {route.params.description}</Text>
            <Text style={styles.recapInfos}>Nom : {name}</Text>
            <Text style={styles.recapInfos}>Email : {email}</Text>
            <Text style={styles.recapInfos}>Téléphone : {phone}</Text>

            <View style={styles.buttonContainer}>
                <Button title="Etape précédente" onPress={handlePrevious} />
                <Button title="Soumettre" onPress={handleSubmit} />
            </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 10,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    stepText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    recapInfos: {
        marginTop: 5,
        textDecorationLine: 'underline',
        fontSize: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 25,
        marginBottom:15
    },
});

export default InfosScreen;