import React, { useState} from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import mapMarker from '../images/map-marker.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface OrphanageItem{
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}


export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);
    const navigation = useNavigation()


    useFocusEffect(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data);
      })
    })

    function handleNavigateToOrphanagesDetails(id: number) {
        navigation.navigate('OrphanagesDetails', {id})
    }
    function handleNavigateToCreateOrphanage() {
      navigation.navigate('SelectMapPosition')
    }
    
    return (
        <View style={styles.container}>
      <MapView style={styles.map}
       provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: -3.8385787,
        longitude:  -38.457136,
        latitudeDelta:  0.008,
        longitudeDelta: 0.008, 
      }}>

        {orphanages.map(orphanage => {
          return (
            <Marker 
            key={orphanage.id}
          icon={mapMarker}
          calloutAnchor={{
            x: 2.2,
            y: 0.6,
          }}
          coordinate={{
            latitude: orphanage.latitude,
            longitude:  orphanage.longitude,
          }}>
        <Callout tooltip onPress={() => handleNavigateToOrphanagesDetails(orphanage.id)}>
          <View style={styles.calloutContainer}>
        <Text style={styles.calloutText}>{orphanage.name}</Text>
          </View>
        </Callout>
        </Marker>
          )
        })}
      </MapView>

      <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

          <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
            <Feather name="plus" size={20} color="#fff"/>
          </RectButton>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: 16,
      justifyContent: 'center',
  
    },
    calloutText:{
      color: '#0089a5',
      fontSize: 14,
    },
    footer: {
      position: "absolute",
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
  
      elevation: 3,
    },
  
    footerText:{
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3'
    },
  
    createOrphanageButton:{
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
  