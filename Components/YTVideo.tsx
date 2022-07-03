import { StyleSheet, Text, TextInput, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface YTVideoProps {
}

export default function Card(props: YTVideoProps) {
  return (
    <WebView javaScriptEnabled={true} domStorageEnabled={true} source={{uri:'https://www.youtube-nocookie.com/embed/48k317kOxqg'}} allowsFullscreenVideo></WebView>
  );
}

const styles = StyleSheet.create({
});
