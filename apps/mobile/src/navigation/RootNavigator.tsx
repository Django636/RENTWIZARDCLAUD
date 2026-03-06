import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '../screens/DashboardScreen';
import { TicketListScreen } from '../screens/TicketListScreen';
import { TicketDetailScreen } from '../screens/TicketDetailScreen';
import { CreateTicketScreen } from '../screens/CreateTicketScreen';
import { DocumentsScreen } from '../screens/DocumentsScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { useAtomValue } from 'jotai';
import { authTokenAtom } from '../store/atoms';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TicketsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TicketList" component={TicketListScreen} options={{ title: 'Vorgänge' }} />
      <Stack.Screen name="TicketDetail" component={TicketDetailScreen} options={{ title: 'Vorgang' }} />
      <Stack.Screen name="CreateTicket" component={CreateTicketScreen} options={{ title: 'Neuer Vorgang' }} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={DashboardScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Tickets" component={TicketsStack} options={{ tabBarLabel: 'Vorgänge' }} />
      <Tab.Screen name="Documents" component={DocumentsScreen} options={{ tabBarLabel: 'Dokumente' }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const authToken = useAtomValue(authTokenAtom);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authToken ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
