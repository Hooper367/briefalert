import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.linkText}>Accueil</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.link}
                onPress={() => navigation.navigate('FormPage')}>
                <Text style={styles.linkText}>Alertez</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightgray',
    },
    link: {
        padding: 10,
    },
    linkText: {
        fontWeight: 'bold',
    },
});

export default Header;