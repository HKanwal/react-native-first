import { StyleSheet, Text, TextInput, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface CardProps {
    name: String,
    style: any
}

export default function Card(props: CardProps) {
  return (
    <Text style={props.style}>Hello {props.name}</Text>
  );
}

const styles = StyleSheet.create({
});
