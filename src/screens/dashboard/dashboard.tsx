import { View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import tw from '../../lib/tailwind';
import { useAccountContext } from '../../contexts';

const Dashboard: React.FC = () => {
  const { accountDetails, isAccountLoading, getAccountDetails } =
    useAccountContext();

  useEffect(() => {
    getAccountDetails();
  }, []);

  if (isAccountLoading) {
    return <ActivityIndicator size="large" style={tw`bg-blue-500`} />;
  }

  return (
    <View style={tw`flex-1 bg-white justify-center items-center`}>
      <Text>Hi</Text>
      <Text>{accountDetails.firstName + ' ' + accountDetails.lastName}</Text>
    </View>
  );
};

export default Dashboard;
