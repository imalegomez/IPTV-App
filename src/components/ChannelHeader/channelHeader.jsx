// ChannelHeader.js
import React, {useCallback} from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './styles';

const ChannelHeader = ({ title, onExit }) => {
    const router = useRouter();

    const handleBackPress = useCallback(() => {
        if (onExit) {
            onExit(); // Llama a la función de salida
        } else {
            router.back(); // Cambia a la ruta del índice si no se proporciona onExit
        }
    }, []);

    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={handleBackPress} style={styles.backButton}>
                <AntDesign name="close" size={24} color="white" />
            </Pressable>
            <Text style={styles.headerText}>Estás viendo: {title}</Text>
        </View>
    );
};

export default React.memo(ChannelHeader);
