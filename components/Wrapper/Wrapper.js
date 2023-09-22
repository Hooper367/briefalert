// Wrapper.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const Wrapper = ({ children }) => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.content}>{children}</View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        padding: 20,
    },
});

export default Wrapper;