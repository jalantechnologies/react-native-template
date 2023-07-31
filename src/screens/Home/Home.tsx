import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { CatContext, CatContextInterface } from '../../contexts';
import { Button, Input, Text, useTheme, useThemeMode } from '@rneui/themed';
import { CustomButton } from 'boilerplate-react-native/src/components';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const { getCatFacts } = useContext<CatContextInterface>(CatContext);
  const { t } = useTranslation();
  const styles = useStyles();
  const themeMode = useThemeMode();

  const [name, setName] = useState('');
  const [submitLoader, setSubmitLoader] = useState(false);
  const [catFact, setCatFact] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const theme = useTheme();

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
    if (theme.theme.mode === 'dark') {
      themeMode.setMode('light');
    } else {
      themeMode.setMode('dark');
    }
  };

  return (
    <View style={styles.home}>
      <Button
        buttonStyle={styles.switchModeBtn}
        containerStyle={styles.switchModeBtnContainer}
        title={
          theme.theme.mode === 'dark' ? t('home:lightMode') : t('home:darkMode')
        }
        onPress={toggleTheme}
      />
      {catFact && name ? (
        <View style={styles.fact}>
          <Text style={styles.name}>
            {t('home:hi')} {name}
          </Text>
          <Text style={styles.catFact}>{t('home:hereCatFact')}:</Text>
          <Text style={styles.catFact}>{catFact}</Text>
          <CustomButton onPress={resetData} title="Reset" />
        </View>
      ) : (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>{t('home:title')}</Text>
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
