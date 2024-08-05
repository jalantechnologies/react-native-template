import { Center, Heading } from 'native-base';
import React from 'react';

import { useAccountContext } from '../../contexts';

const Dashboard: React.FC = () => {
  const { accountDetails } = useAccountContext();

  return (
    <Center flex={1}>
      <Heading>Hi,</Heading>
      <Heading>{accountDetails?.displayName()}</Heading>
    </Center>
  );
};

export default Dashboard;
