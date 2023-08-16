import { ActivityIndicator, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import { StatusBar } from 'expo-status-bar';
import { Dialog, MD2Colors } from 'react-native-paper';
import { Shadow } from 'react-native-shadow-2';
import Layout from '../../constants/Layout';
import React from 'react';
import { TripsProps } from '../../types/trips';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../constants/firebase';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useRouter } from 'expo-router';
import { keepUpdate } from '../../hooks/updates';

export default function TabOneScreen() {
  const [list, setList] = React.useState<Array<TripsProps>>([]);
  const { showActionSheetWithOptions } = useActionSheet();
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    LoadData();
    keepUpdate.subscribe(LoadData);
  }, []);
  const onPress = (x: TripsProps) => {
    const options = ['Start Trip', 'End Trip', 'Suspend Trip', "Delete", 'Cancel'];
    const destructiveButtonIndex = 3;
    const cancelButtonIndex = 4;
    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex: any) => {

      switch (selectedIndex) {
        case 0: startTrips(x.uuid, x);
          break;
        case 1:
          endTrips(x.uuid);
          break;
        case 2:
          suspendTrips(x.uuid);
          break;
        case destructiveButtonIndex:
          deletTrip(x.uuid);
          break;
        case cancelButtonIndex:
          console.log("Cancelled")
      }
    });
  }
  const onPressEndStatus = (x: TripsProps) => {
    const options = ["Delete", 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex: any) => {

      switch (selectedIndex) {
        case destructiveButtonIndex:
          deletTrip(x.uuid);
          break;
        case cancelButtonIndex:
          console.log("Cancelled")
      }
    });
  }
  const onPressStartStatus = (x: TripsProps) => {
    const options = ['Check trip progress', 'End Trip', 'Suspend Trip', 'Cancel'];
    const cancelButtonIndex = 3;
    showActionSheetWithOptions({
      options,
      cancelButtonIndex
    }, (selectedIndex: any) => {

      switch (selectedIndex) {
        case 0: startTrips(x.uuid, x, false);
          break;
        case 1:
          endTrips(x.uuid);
          break;
        case 2:
          suspendTrips(x.uuid);
          break;
        case cancelButtonIndex:
          console.log("Cancelled")
      }
    });
  }
  const LoadData = async () => {
    const docRef = doc(db, "trips", auth.currentUser?.email as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data: Array<TripsProps> = docSnap.data()?.trip as Array<TripsProps>;
      setList(data);
    } else {
      setList([]);
    }
  }
  const endTrips = (uuid: string) => {
    Alert.alert(
      'Conirm',
      'Are you sure you want to end this trip?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'End trip',
          onPress: async () => {
            try {
              const docRef = doc(db, "trips", auth.currentUser?.email as string);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                const oldData: Array<any> = docSnap.data()?.trip as Array<any>;
                const newData = oldData.map((x: TripsProps) => {
                  if (x.uuid === uuid) {
                    return {
                      ...x,
                      status: 3
                    }
                  }
                  return x;
                });
                Update(auth.currentUser?.email as string, newData, "Trip ended");
              }
            }
            catch (err: any) {
              Alert.alert('Error!', err?.message);
            }
          },
          style: 'default',
        },
      ]
    );
  }
  const suspendTrips = (uuid: string) => {
    Alert.alert(
      'Conirm',
      'Are you sure you want to suspend this trip?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Suspend trip',
          onPress: async () => {
            try {
              const docRef = doc(db, "trips", auth.currentUser?.email as string);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                const oldData: Array<any> = docSnap.data()?.trip as Array<any>;
                const newData = oldData.map((x: TripsProps) => {
                  if (x.uuid === uuid) {
                    return {
                      ...x,
                      status: 4
                    }
                  }
                  return x;
                });
                Update(auth.currentUser?.email as string, newData, "Trip suspened");
              }
            }
            catch (err: any) {
              Alert.alert('Error!', err?.message);
            }
          },
          style: 'default',
        },
      ]
    );
  }
  const startTrips = (uuid: string, trip: TripsProps, showMsg = true) => {
    if (!showMsg) {
      router.push({ pathname: '/tracker', params: { trip: `${trip.from} to ${trip.to}`, uuid: trip.uuid } });
      return;
    }
    Alert.alert(
      'Conirm',
      'Are you sure you want to start this trip?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Start trip',
          onPress: async () => {
            try {
              const docRef = doc(db, "trips", auth.currentUser?.email as string);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                const oldData: Array<any> = docSnap.data()?.trip as Array<any>;
                const newData = oldData.map((x: TripsProps) => {
                  if (x.uuid === uuid) {
                    return {
                      ...x,
                      status: 1
                    }
                  }
                  return x;
                });
                Update(auth.currentUser?.email as string, newData, "Trip started", showMsg);
                router.push({ pathname: '/tracker', params: { trip: `${trip.from} to ${trip.to}`, uuid: trip.uuid } });
              }
            }
            catch (err: any) {
              Alert.alert('Error!', err?.message);
            }
          },
          style: 'default',
        },
      ]
    );
  }
  const deletTrip = (uuid: string) => {
    Alert.alert(
      'Conirm',
      'Are you sure you want to delete this trip?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const docRef = doc(db, "trips", auth.currentUser?.email as string);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                const oldData: Array<any> = docSnap.data()?.trip as Array<any>;
                const newData = oldData.filter((x: TripsProps) => x.uuid !== uuid);
                Deleted(auth.currentUser?.email as string, newData);
              }
            }
            catch (err: any) {
              Alert.alert('Error!', err?.message);
            }
          },
          style: 'default',
        },
      ]
    );

  }
  const Deleted = async (id: string, data: Array<any>) => {
    setLoading(true);
    const tripRef = collection(db, "trips");
    await setDoc(doc(tripRef, id as string), { trip: data });
    if (tripRef && tripRef.id) {
      Alert.alert('Success!', 'Trip deleted');
      keepUpdate.next(tripRef.id);
      setLoading(false);
    } else {
      Alert.alert('Error!', 'Trip deleting failed');
      setLoading(false);
    }
  }
  const Update = async (id: string, data: Array<any>, title: string, showMsg = true) => {
    setLoading(true);
    const tripRef = collection(db, "trips");
    await setDoc(doc(tripRef, id as string), { trip: data });
    if (tripRef && tripRef.id) {
      if (showMsg) {
        Alert.alert('Success!', title);
      }
      keepUpdate.next(tripRef.id);
      setLoading(false);
    } else {
      Alert.alert('Error!', 'Trip updating failed');
      setLoading(false);
    }
  }
  const statusName = (status: any) => ["Pending", "On-trip", "Stop", "Ended", "Suspened"][status];
  return (
    <View style={styles.container}>
      <ScrollView style={{ width: Layout.window.width - 40 }}>
        <View style={{ paddingTop: 8, marginVertical: 8 }}>
          <Text style={{ fontSize: 18 }}>My Trips</Text>
        </View>
        {
          list.map((x: TripsProps, i: number) => (
            <TouchableOpacity onPress={() => +x.status === 3 ? onPressEndStatus(x) : (+x.status === 1 ? onPressStartStatus(x) : onPress(x))} key={i} style={{ marginBottom: 20 }}>
              <Shadow style={{ width: Layout.window.width - 40 }} startColor={'#E6F4EC'} endColor={'#F2EEEF'} distance={5} offset={[1, 1]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, backgroundColor: '#F2EEEF' }}>
                  <View style={{ backgroundColor: 'transparent' }}>
                    <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>From:</Text>
                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{x.from}</Text>
                    <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>To:</Text>
                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{x.to}</Text>
                  </View>
                  <View style={{ backgroundColor: 'transparent' }}>
                    <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>Date:</Text>
                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{x.date}</Text>
                    <Text style={{ fontSize: 12, color: MD2Colors.grey500 }}>Status:</Text>
                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{statusName(x.status)}</Text>
                  </View>
                </View>
              </Shadow>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      <StatusBar style={'light'} />
      <Dialog dismissable={false} visible={loading} style={{ width: 55, height: 55, marginHorizontal: (Layout.window.width - 55) / 2, justifyContent: 'center', alignItems: 'center', padding: 0, alignContent: 'center', zIndex: 9 }} theme={{
        colors: {
          outline: 'transparent',
        },
      }}>
        <Dialog.Content style={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0, alignContent: 'center', width: 55, height: 55 }}>
          <ActivityIndicator style={{ margin: 0, marginTop: -5 }} animating={true} size={'large'} color={MD2Colors.green800} />
        </Dialog.Content>
      </Dialog>
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
