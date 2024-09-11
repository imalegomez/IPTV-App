import {View, Text} from 'react-native';
import { Slot } from 'expo-router';

export default function Layout(){
    return(
        <View style={{flex:1, backgroundColor: '#000'}}>
            <Slot/>
        </View>
    )
}