// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AdventureScreen, ExperienceDetail, ExperienceScreen} from '_screens';
import {defaultOptions} from './constants';
import {RoutesName} from '_routeName';
const Dashboard = createNativeStackNavigator();

function DashboardNavigator() {
  return (
    <Dashboard.Navigator
      initialRouteName={RoutesName.ADVENTURE_SCREEN}
      screenOptions={{...defaultOptions}}>
      <Dashboard.Screen
        name={RoutesName.ADVENTURE_SCREEN}
        component={AdventureScreen}
      />
      <Dashboard.Screen
        name={RoutesName.EXPERIENCES_SCREEN}
        component={ExperienceScreen}
      />
      <Dashboard.Screen
        name={RoutesName.EXPERIENCES_DETAILS_SCREEN}
        component={ExperienceDetail}
      />
    </Dashboard.Navigator>
  );
}

export default DashboardNavigator;
