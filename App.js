import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import react, { Component } from "react";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./components/auth/Redux/reducers";
import thunk from "redux-thunk";
import firebase from "firebase/compat/app";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import Register from "./components/auth/Register";
import Main from "./components/auth/Main";
import Add from "./components/main/Add";

const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyAAXaBC30vDueMS7u-jflJ79FFpC6vQkgE",
  authDomain: "instagramclone-768b8.firebaseapp.com",
  projectId: "instagramclone-768b8",
  storageBucket: "instagramclone-768b8.appspot.com",
  messagingSenderId: "643780956453",
  appId: "1:643780956453:web:1ca1d941abb237986b8acc",
  measurementId: "G-YRV966TE3K",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;

    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>LOADING</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add"
              component={Add}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="main">
            <Stack.Screen
              name="main"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Add" component={Add} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
