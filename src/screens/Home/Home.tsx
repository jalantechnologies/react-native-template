import React, { useContext, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { AccountContext, AccountContextInterface } from '../../contexts';
import { Button } from '@rneui/base';

const Home: React.FC = () => {
  const { getCatFacts } = useContext<AccountContextInterface>(AccountContext);

  const [name, setName] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [catFact, setCatFact] = useState('');

  const handleBtnSubmit = async () => {
    setSubmitLoader(true);
    const data = await getCatFacts();
    setSubmitLoader(false);
    if (data) {
      setCatFact(data.fact);
    }
  };

  return (
    <View style={styles.home}>
      {catFact && name ? (
        <View style={styles.fact}>
          <Text style={styles.name}>Hi, {name}</Text>
          <Text style={styles.catFact}>Here is a cat fact:</Text>
          <Text style={styles.catFact}>{catFact}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.welcomeText}>Welcome to JTC</Text>
          <View style={styles.spacer} />
          <TextInput
            onChangeText={setName}
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
            loading={submitLoader}
            buttonStyle={styles.button}
          />
        </View>
      )}
    </View>
  );
};

export default Home;
