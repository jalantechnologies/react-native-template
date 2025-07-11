import React from 'react';
import { Box, Text } from 'native-base';

interface InfoCardWithDotProps {
  title: string;
  subtitle: string;
  amount: string;
  dotColor?: string;
}

const InfoCardWithDot: React.FC<InfoCardWithDotProps> = ({
  title,
  subtitle,
  amount,
  dotColor = 'cyan.500',
}) => {
  return (
    <Box
      px={5}
      py={3}
      bg="white"
      borderRadius="md"
      shadow={1}
      alignItems="flex-start"
    >
      <Text fontSize="sm" color="gray.500">{subtitle}</Text>
      <Text fontSize="md" fontWeight="medium" color="gray.600">{title}</Text>
      <Box flexDirection="row" alignItems="center" mt={1}>
        <Box
          width={2}
          height={2}
          borderRadius={999}
          bg={dotColor}
          mr={2}
        />
        <Text fontSize="lg" fontWeight="bold" color="black">
          {amount}
        </Text>
      </Box>
    </Box>
  );
};

export default InfoCardWithDot;
