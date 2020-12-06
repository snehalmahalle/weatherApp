
import React from 'react';
import citiesList from './src/components/citiesList';
import cityWheaterDetails from './src/components/cityWheaterDetails'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const Stack = createStackNavigator({
  citiesList: { screen: citiesList },
  cityWheaterDetails: { screen: cityWheaterDetails },
}, {
  initialRouteName: 'citiesList',
  headerMode: 'none',
  mode: 'modal',
});
const AppNavigator = createAppContainer(Stack);
const App = () => {
  return (
    <>
    <AppNavigator/>
    </>
  );
};



export default App;
