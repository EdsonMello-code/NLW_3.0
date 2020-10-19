import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/Local.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function OrphangesMap() {
  const { navigate } = useNavigation()
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);
  
  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  }, []);

  function handleNavigateToOrphanageDetails(id: number) {
    navigate('OrphanagesDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -9.125888,
          longitude: -37.7257984,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
      {orphanages.map(orphanage => {
        return (
          <Marker
          key={orphanage.id}
          icon={mapMarker}
          coordinate={{
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
          }}

          calloutAnchor={{
            x: 2.8,
            y: 0.8
          }}
        >

          <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
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
        <RectButton style={styles.createOrphanagesButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color='#FFF' />
        </RectButton>
      </View>
    </View>

  )
}

export default OrphangesMap;


const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  footerText: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_700Bold',

  },

  createOrphanagesButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
