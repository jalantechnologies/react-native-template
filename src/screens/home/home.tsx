import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { CatContext, CatContextInterface } from '../../contexts';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'nativewind';
import CustomInput from 'boilerplate-react-native/src/components/custom-input/custom-input';
import TailwindButton from 'boilerplate-react-native/src/components/custom-button/tailwind-button';

const Home: React.FC = () => {
  const { getCatFacts } = useContext<CatContextInterface>(CatContext);
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [catFact, setCatFact] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { colorScheme, setColorScheme } = useColorScheme();

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

  const toggleTheme = () => {
    if (colorScheme === 'dark') {
      setColorScheme('light');
    } else {
      setColorScheme('dark');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray dark:bg-neutral-950">
      <View className="my-4">
        <TailwindButton
          title={
            colorScheme === 'dark' ? t('home:lightMode') : t('home:darkMode')
          }
          onPress={toggleTheme}
          variant="secondary"
        />
      </View>
      {catFact && name ? (
        <View className="flex flex-col p-6 items-center">
          <Text className="text-2xl mb-5 dark:text-white">
            {t('home:hi')} {name}
          </Text>
          <Text className="text-lg mb-2.5 dark:text-white">
            {t('home:hereCatFact')}:
          </Text>
          <Text className="text-lg mb-2.5 dark:text-white">{catFact}</Text>
          <TailwindButton onPress={resetData} title="Reset" />
        </View>
      ) : (
        <View className="flex items-center justify-center">
          <Text className="text-2xl dark:text-white">{t('home:title')}</Text>
          <View className="mb-5" />
          <View className="w-screen px-8">
            <CustomInput
              placeholder="Enter Name"
              value={name}
              onChangeText={handleNameChange}
              errorMessage={errorMessage}
            />
          </View>
          <View className="my-5">
            <TailwindButton
              onPress={handleBtnSubmit}
              disabled={submitLoader}
              loading={submitLoader}
              title="Submit"
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;
