import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.footerContent}>
                <View style={styles.leftContent}>
                    <Image source={require('briefalert/assets/logo.png')} style={styles.image} />
                </View>
                <View style={styles.rightContent}>
                    <View style={styles.links}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.linkText}>Acceuil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('FormPage')}>
                            <Text style={styles.linkText}>Alertez-nous</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.address}>Adresse fictive : 123 Rue Fictive, Ville Fictive</Text>
                    <Text style={styles.contactEmail}>Contactez-nous : contact@example.com</Text>
                </View>
            </View>
            <Text style={styles.copyright}>© 2023 Votre Nom. Tous droits réservés.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        padding: 10,
    },
    footerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftContent: {
        flex: 1,
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
    },
    rightContent: {
        flex: 3,
    },
    links: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    linkText: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    address: {
        fontSize: 12,
        marginBottom: 5,
    },
    contactEmail: {
        fontSize: 12,
        marginBottom: 5,
    },
    copyright: {
        fontSize: 10,
    },
});

export default Footer;