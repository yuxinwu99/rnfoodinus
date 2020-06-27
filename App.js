import React, { SafeAreaView, View} from 'react';
import DrawerNavigator from './dir/drawer';
import homeStack from './dir/homestack'
import Home from './screens/home'
import Stores from './screens/stores'
export default function App() {
     return (
              <DrawerNavigator/>
     )
}