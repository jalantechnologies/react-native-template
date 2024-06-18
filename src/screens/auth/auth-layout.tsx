import React from 'react';
import { View } from 'react-native';
import tw from '../../lib/tailwind';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <View style={tw`flex-1 justify-center p-5 bg-white gap-10`}>
      {children}
    </View>
  );
};

export default AuthLayout;
