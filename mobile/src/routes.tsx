import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator()

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanagesDetails from './pages/OrphanagesDetails';

import OrphanageData from './pages/createOrphanage/OrphanageData';
import SelectMapPosition from './pages/createOrphanage/SelectMapPosition';
import Header from './components/Header';

export default function Routes() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'} }}> 
                <Screen name="OrphanagesMap" component={OrphanagesMap}/>
                <Screen name="OrphanagesDetails" component={OrphanagesDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato"/>
                    }}/>

                <Screen name="SelectMapPosition" component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no Mapa"/>
                    }}/>
                <Screen name="OrphanageData" component={OrphanageData}
                options={{
                    headerShown: true,
                    header: () => <Header title="Informe os dados"/>
                }}/>
            </Navigator>
        </NavigationContainer>
    )
}