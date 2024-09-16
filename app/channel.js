import {useLocalSearchParams } from 'expo-router'

import VideoPlayer from '../src/components/VideoPlayer/videoPlayer'
//import Header from '../components/channelHeader';

const ChannelScreen = () =>{
    const {url, title} = useLocalSearchParams();
    
    return(
        <>
            <VideoPlayer selectedChannel={{url, title}}/>
        </>
    )
}

export default ChannelScreen;

