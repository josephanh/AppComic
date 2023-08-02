import { LogBox, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { AppContextProvider } from './sources/Utils/AppContext'
import Navigation from './sources/Navigation/Navigation'
import { store } from './sources/Redux/store'
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
      <StatusBar translucent backgroundColor={'transparent'} barStyle={'dark-content'} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    backgroundColor: 'red'
  }
})


