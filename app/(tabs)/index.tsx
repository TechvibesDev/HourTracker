import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { StatusBar } from 'expo-status-bar';
import { MD2Colors } from 'react-native-paper';
import { Shadow } from 'react-native-shadow-2';
import Layout from '../../constants/Layout';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: Layout.window.width - 40 }}>
        <View style={{ paddingTop: 8, marginBottom: 8 }}>
          <Text style={{ fontSize: 18 }}>My Current Trip</Text>
        </View>
        <Shadow style={{ width: Layout.window.width - 40 }} startColor={'#E6F4EC'} endColor={'#F2EEEF'} distance={5} offset={[1, 1]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, backgroundColor: '#F2EEEF' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>From:</Text>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Jalingo</Text>
              <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>To:</Text>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Yola</Text>
            </View>
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>Date:</Text>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>16 June, 2023</Text>
              <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>Status:</Text>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Pending</Text>
            </View>
          </View>
        </Shadow>
        <View style={{ paddingTop: 8, marginVertical: 8 }}>
          <Text style={{ fontSize: 18 }}>Recents Trip</Text>
        </View>
        <Shadow style={{ width: Layout.window.width - 40 }} startColor={'#E6F4EC'} endColor={'#F2EEEF'} distance={5} offset={[1, 1]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, backgroundColor: '#F2EEEF' }}>
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>From:</Text>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Jalingo</Text>
              <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>To:</Text>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Yola</Text>
            </View>
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>Date:</Text>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>16 June, 2023</Text>
              <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>Status:</Text>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>Ended</Text>
            </View>
          </View>
        </Shadow>
      </ScrollView>
      <StatusBar style={'light'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
