import React from "react";
import { View, Text, StyleSheet } from "react-native";


const MainHeader = () =>{
    return(
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>D'sol TV</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'rgba(51, 51, 51, 0.8)', // Color de fondo con transparencia
        padding: 20,
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',
        height: 80,
      },
      headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        left: 10
      },
})

export default React.memo(MainHeader)