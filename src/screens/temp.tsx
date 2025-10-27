import React, { useState } from 'react';
import { View, Text } from 'react-native';
import WebsiteUrlInput from '../components/inputs/website-url-input'; // update path based on your project

const TempWebsiteInputScreen = () => {
  const [url, setUrl] = useState('');
  const [validatedUrl, setValidatedUrl] = useState<string | null>(null);

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'flex-start' }}>

      <WebsiteUrlInput
        label="Website URL Validation:"
        url={url}
        onChangeText={setUrl}
        onValidatedUrl={setValidatedUrl}
      />

      {validatedUrl && (
        <Text style={{ marginTop: 20, color: 'green' }}>
            Valid URL ✅
        </Text>
      )}
    </View>
  );
};

export default TempWebsiteInputScreen;
