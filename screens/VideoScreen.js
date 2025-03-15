import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {extractVideoId} from './utils';

export default function VideoScreen() {
  // Example link
  const [link] = useState('https://youtu.be/rwxRoYzwkyM?si=TP7Gx2d76JNxUDXx');
  const [playing, setPlaying] = useState(false);

  // Extract the ID once
  const videoId = extractVideoId(link);
  console.log(videoId);

  // Handle video state changes
  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  if (!videoId) {
    // If the link doesn't match, show an error or fallback
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Could not extract a video ID from the link:
        </Text>
        <Text>{link}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Playing from link: {link}</Text>
      <YoutubePlayer
        height={220}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
      <Text style={styles.playLabel}>{playing ? 'Playing...' : 'Paused'}</Text>
      <Text style={styles.playButton} onPress={() => setPlaying(prev => !prev)}>
        {playing ? 'Pause' : 'Play'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f1f1f1', padding: 16},
  title: {fontSize: 16, fontWeight: 'bold', marginBottom: 10},
  error: {color: 'red', fontWeight: 'bold'},
  playLabel: {fontSize: 14, marginTop: 10, marginBottom: 10},
  playButton: {fontSize: 16, color: '#1568ed', textDecorationLine: 'underline'},
});
