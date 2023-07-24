import React, { useContext, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { AccountContext, AccountContextInterface } from '../../contexts';

const Home = () => {
  const { getCatFacts } = useContext<AccountContextInterface>(AccountContext);

  const [name, setName] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [catFacts, setCatFacts] = useState('');

  const handleBtnSubmit = async () => {
    setSubmitLoader(true);
    const data = await getCatFacts(name);
    if (data) {
      setCatFacts(data.fact);
    }
  };

  return (
    <View style={styles.home}>
      {catFacts && name ? (
        <View style={styles.fact}>
          <Text style={styles.name}>Hi, {name}</Text>
          <Text style={styles.catFact}>Here is a cat fact:</Text>
          <Text style={styles.catFact}>{catFacts}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.welcomeText}>Welcome to JTC</Text>
          <View style={styles.spacer} />
          <TextInput
            onChangeText={text => setName(text)}
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor="#C3C3C3"
            keyboardType="default"
            value={name}
            textContentType="username"
            autoFocus
          />
          <Button
            onPress={handleBtnSubmit}
            disabled={submitLoader}
            title="Submit"
          />
        </View>
      )}
    </View>
  );
};

export default Home;
