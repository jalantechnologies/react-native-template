import { Button } from 'boilerplate-react-native/src/components';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from 'boilerplate-react-native/src/components';
import { CardVariant } from 'boilerplate-react-native/src/components/card/card';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { ScrollView, Text, VStack } from 'native-base';
import React from 'react';

import TaskSection from './task-section';

export const ExampleCards: React.FC = () => {
  return (
    <ScrollView px={4} py={0}>
      <VStack space={2}>
        <Card variant={CardVariant.Elevated}>
          <CardHeader
            title="Elevated Card"
            subtitle="With Header, Media, Content & Actions"
            avatarSrc="https://picsum.photos/200"
          />
          <CardMedia imageSrc="https://picsum.photos/200/300" />
          <CardContent>
            <Text>
              This is an example of an elevated card. It has a header, an image, some content text,
              and action buttons at the bottom.
            </Text>
          </CardContent>
          <CardActions>
            <Button onClick={() => console.log('Like pressed')}>Like</Button>
            <Button onClick={() => console.log('Share pressed')}>Share</Button>
          </CardActions>
        </Card>

        <Card variant={CardVariant.Outlined}>
          <CardHeader title="Outlined Card" subtitle="Outlined Card Subtitle here" />
          <CardContent>
            <Text>This is an outlined card. No Media</Text>
          </CardContent>
        </Card>

        <Card variant={CardVariant.Elevated}>
          <CardActionArea onPress={() => console.log('Card tapped!')}>
            <CardMedia imageSrc="https://picsum.photos/200/300" />
            <CardContent>
              <Text>Tap anywhere on this card to trigger the action area handler.</Text>
            </CardContent>
          </CardActionArea>
        </Card>

        <Card variant={CardVariant.Outlined}>
          <CardHeader title="Outlined Header Card" subtitle="Subtitle goes here" />
          <CardActions>
            <Button onClick={() => console.log('Accept pressed')}>Accept</Button>
            <Button kind={ButtonKind.DANGER} onClick={() => console.log('Decline pressed')}>
              Decline
            </Button>
          </CardActions>
        </Card>
      </VStack>
    </ScrollView>
  );
};

const Dashboard = () => {
  return <ExampleCards />;
};

export default Dashboard;
