import React, { PureComponent } from 'react';
import { View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  ChannelList,
  Thread,
  ChannelPreviewMessenger,
  CloseButton,
  TypingIndicator,
} from 'stream-chat-expo';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const server = {
  // API_KEY: 'qk4nn7rpcn75',
  // TOKEN:
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGhpZXJyeSJ9.EJ6poZ2UbnJJvbCi6ZiImeEPeIoXVEBSdZN_-2YC3t0',
  // USER: 'thierry',
  // SERVER_ENDPOINT: 'http://localhost:3030',
};

const apiKey = server.API_KEY || 'qk4nn7rpcn75';
const userToken =
  server.TOKEN ||
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYmlsbG93aW5nLWZpcmVmbHktOCJ9.CQTVyJ6INIM8u28BxkneY2gdYpamjLzSVUOTZKzfQlg';
const user = server.USER || 'billowing-firefly-8';

const chatClient = new StreamChat(apiKey);

const theme = {
  avatar: {
    image: {
      size: 32,
    },
  },
  colors: {
    primary: 'magenta',
  },
  spinner: {
    css: `
      width: 15px;
      height: 15px;
    `,
  },
};

if (server.SERVER_ENDPOINT) {
  chatClient.setBaseURL(server.SERVER_ENDPOINT);
}

chatClient.setUser(
  {
    id: user,
  },
  userToken,
);

const filters = { type: 'messaging' };
const sort = {
  last_message_at: -1,
  cid: 1,
};
const options = {
  member: true,
  watch: true,
};
// const channels = chatClient.queryChannels(filters, sort, {
//   watch: true,
// });

class ChannelListScreen extends PureComponent {
  static navigationOptions = () => ({
    headerTitle: <Text style={{ fontWeight: 'bold' }}>Channel List</Text>,
  });

  render() {
    return (
      <SafeAreaView>
        <Chat style={theme} client={chatClient}>
          <View style={{ display: 'flex', height: '100%', padding: 10 }}>
            <ChannelList
              Preview={ChannelPreviewMessenger}
              filters={filters}
              sort={sort}
              options={options}
              onSelect={(channel) => {
                this.props.navigation.navigate('Channel', {
                  channel,
                });
              }}
            />
          </View>
        </Chat>
      </SafeAreaView>
    );
  }
}

class ChannelScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const channel = navigation.getParam('channel');
    return {
      headerTitle: (
        <Text style={{ fontWeight: 'bold' }}>{channel.data.name}</Text>
      ),
    };
  };

  render() {
    const { navigation } = this.props;
    const channel = navigation.getParam('channel');

    return (
      <SafeAreaView>
        <Chat style={theme} client={chatClient}>
          <Channel client={chatClient} channel={channel}>
            <View style={{ display: 'flex', height: '100%' }}>
              <MessageList
                TypingIndicator={TypingIndicator}
                onThreadSelect={(thread) => {
                  this.props.navigation.navigate('Thread', {
                    thread,
                    channel: channel.id,
                  });
                }}
              />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

class ThreadScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ fontWeight: 'bold' }}>Thread</Text>,
    headerLeft: null,
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          backgroundColor: '#ebebeb',
          width: 30,
          height: 30,
          marginRight: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
        }}
      >
        <CloseButton />
      </TouchableOpacity>
    ),
  });

  render() {
    const { navigation } = this.props;
    const thread = navigation.getParam('thread');
    const channel = chatClient.channel(
      'messaging',
      navigation.getParam('channel'),
    );

    return (
      <SafeAreaView>
        <Chat style={theme} client={chatClient}>
          <Channel
            client={chatClient}
            channel={channel}
            thread={thread}
            dummyProp="DUMMY PROP"
          >
            <View
              style={{
                display: 'flex',
                height: '100%',
                justifyContent: 'flex-start',
              }}
            >
              <Thread thread={thread} />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

const RootStack = createStackNavigator(
  {
    ChannelList: {
      screen: ChannelListScreen,
    },
    Channel: {
      screen: ChannelScreen,
    },
    Thread: {
      screen: ThreadScreen,
    },
  },
  {
    initialRouteName: 'ChannelList',
  },
);

const AppContainer = createAppContainer(RootStack);

export default class Normal extends React.Component {
  render() {
    return <AppContainer />;
  }
}