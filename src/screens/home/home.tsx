import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { CatContext, CatContextInterface } from '../../contexts';
import { Button, Input, Text } from '@rneui/themed';
import { CustomButton } from '../../components';
import { useTranslation } from 'react-i18next';
import tw from '../../lib/tailwind';
import { useAppColorScheme } from 'twrnc';

const Home: React.FC = () => {
  const { getCatFacts } = useContext<CatContextInterface>(CatContext);
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [catFact, setCatFact] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [colorScheme, toggleColorScheme] = useAppColorScheme(tw);

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
    <View style={tw`flex-1 items-center justify-center bg-gray dark:bg-black`}>
      <Button
        buttonStyle={tw`rounded-md bg-tertiary-light dark:bg-tertiary-dark`}
        containerStyle={tw`mb-5`}
        title={
          colorScheme === 'dark' ? t('home:lightMode') : t('home:darkMode')
        }
        onPress={toggleColorScheme}
      />
      {catFact && name ? (
        <View style={tw`flex-col p-6 items-center`}>
          <Text style={tw`text-2xl mb-5 dark:text-white`}>
            {t('home:hi')} {name}
          </Text>
          <Text style={tw`text-lg mb-2.5 dark:text-white`}>
            {t('home:hereCatFact')}:
          </Text>
          <Text style={tw`text-lg mb-2.5 dark:text-white`}>{catFact}</Text>
          <CustomButton onPress={resetData} title="Reset" />
        </View>
      ) : (
        <View style={tw`items-center justify-center`}>
          <Text style={tw`text-2xl dark:text-white`}>{t('home:title')}</Text>
          <View style={tw`mb-5`} />
          <Input
            placeholder="Enter Name"
            value={name}
            onChangeText={handleNameChange}
            errorMessage={errorMessage}
            inputContainerStyle={tw`android:w-full`}
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
