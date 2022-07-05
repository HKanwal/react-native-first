import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, AppRegistry } from 'react-native';
import Card from './src/app/card/card';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

/////// Add this boilerplater

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql', // change this to match your endpoint
  cache: new InMemoryCache()
});

AppRegistry.registerComponent('MyApplication', () => App);

///////////////////////////////

// This is the type of code graphql-codegen autogenerates.
interface GqlResponse {
  data?: {
    company?: {
      ceo?: string
    }
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [ceo, setCeo] = useState('');

  const query = async () => {
    try {
      const response = await fetch('https://api.spacex.land/graphql', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: 'query { company { ceo } }'
        })
      });
      const json: GqlResponse = await response.json();
      if (json.data?.company?.ceo) {
        setCeo(json.data.company.ceo);
      }
      else {
        setCeo('No ceo :(');
      }
    } catch (error) {
      console.log(error);
      setCeo('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    query();
  }, []);

  return ( // Wrap root with ApolloProvider
    <ApolloProvider client={client}>
      <View style={styles.container}>
          <TextInput style={styles.textInput} placeholder="Enter some notes about the video..." multiline textAlignVertical="top"></TextInput>
          <Card name="Paul" style={styles.card}></Card>
          <Text style={{flex: 1}}>{isLoading ? 'Still loading...' : ceo}</Text>
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: 5
  },
  textInput: {
    flex: 1,
  },
  card: {
    flex: 1,
  }
});
