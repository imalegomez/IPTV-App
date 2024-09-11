// Header.js
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const ChannelHeader = ({ title }) => {
    const router = useRouter();

    const handleBackPress = () => {
        router.push('/'); // Cambia a la ruta del índice
    };

    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={handleBackPress} style={styles.backButton}>
                <AntDesign name="close" size={24} color="white" />
            </Pressable>
            <Text style={styles.headerText}>Estás viendo: {title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
        backgroundColor:'rgba(192,192,192, 0.3)',
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        left: 10,
        zIndex: 1
    }
});

export default React.memo(ChannelHeader)
