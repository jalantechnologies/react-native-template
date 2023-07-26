import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { AccountContext, AccountContextInterface } from '../../contexts';
import { Input, Text } from '@rneui/themed';
import { CustomButton } from 'boilerplate-react-native/src/components';
import { useStyles } from './styles';

const Home: React.FC = () => {
  const { getCatFacts } = useContext<AccountContextInterface>(AccountContext);
  const styles = useStyles();

  const [name, setName] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [catFact, setCatFact] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleBtnSubmit = async () => {
    if (!name) {
      setErrorMessage('Please enter name');
      return;
    }
    setSubmitLoader(true);
    const data = await getCatFacts();
    setSubmitLoader(false);
    if (data) {
      setCatFact(data.fact);
    }
  };

  const handleNameChange = async (text: string) => {
    setErrorMessage('');
    setName(text);
  };

  const resetData = () => {
    setCatFact('');
    setName('');
  };

  return (
    <View style={styles.home}>
      {catFact && name ? (
        <View style={styles.fact}>
          <Text style={styles.name}>Hi, {name}</Text>
          <Text style={styles.catFact}>Here is a cat fact:</Text>
          <Text style={styles.catFact}>{catFact}</Text>
          <CustomButton onPress={resetData} title="Reset" />
        </View>
      ) : (
        <View>
          <Text style={styles.welcomeText}>Welcome to JTC</Text>
          <View style={styles.spacer} />
          <Input
            placeholder="Enter Name"
            value={name}
            onChangeText={handleNameChange}
            errorMessage={errorMessage}
          />
          <CustomButton
            onPress={handleBtnSubmit}
            disabled={submitLoader}
            loading={submitLoader}
            title="Submit"
          />
        </View>
      )}
    </View>
  );
};

export default Home;
