import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'root',
      screens: {
        Home: 'home',
        Links: 'links',
        Profile: 'profile'
      },
    },
    Auth: {
      path: 'auth',
      screens: {
        Login: 'login',
        Register: 'register',
      },
    },
  },
};
