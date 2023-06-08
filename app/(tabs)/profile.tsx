import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../../components/Themed';
import React from 'react';
import { UserProps } from '../../types/user';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../constants/firebase';
import { Shadow } from 'react-native-shadow-2';
import Layout from '../../constants/Layout';
import { List, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function ProfileTabTwoScreen() {
  const router = useRouter();
  const [data, setData] = React.useState<UserProps>();
  React.useEffect(() => {
    LoadData();
  }, []);
  const LoadData = async () => {
    const docRef = doc(db, "users", auth.currentUser?.email as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data: UserProps = docSnap.data() as UserProps;
      setData(data);
    } else {
      setData(undefined);
    }
  }
  const LogOut = async () => {
    await auth.signOut();
    router.replace('../(auth)/');
  }
  const RenderData = (x: { title: string | undefined, value: string | undefined }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <Shadow style={{ width: Layout.window.width - 40 }} startColor={'#E6F4EC'} endColor={'#F2EEEF'} distance={5} offset={[1, 1]}>
          <List.Item
            title={x.title}
            description={x.value}
            titleStyle={{ fontSize: 11 }}
            descriptionStyle={{ fontSize: 14 }}
          />
        </Shadow>
      </View>
    );
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 16 }}>Personal Information</Text>
        <View style={{ flexDirection: 'column', gap: 4, marginTop: 10 }}>
          <RenderData title={'First Name'} value={data?.firstName} />
          <RenderData title={'Last Name'} value={data?.lastName} />
          <RenderData title={'Middle Name'} value={data?.middlename} />
          <RenderData title={'Gender'} value={data?.gender} />
          <RenderData title={'Marital Status'} value={data?.maritalsStatus} />
        </View>
        <Text style={{ fontSize: 16 }}>Contact Information</Text>
        <View style={{ flexDirection: 'column', gap: 4, marginTop: 10 }}>
          <RenderData title={'Address'} value={data?.address} />
          <RenderData title={'Email'} value={data?.email} />
          <RenderData title={'Phone Number'} value={data?.phoneNumber} />
        </View>
        <Text style={{ fontSize: 16 }}>Next of Kin Information</Text>
        <View style={{ flexDirection: 'column', gap: 4, marginTop: 10 }}>
          <RenderData title={'First Name'} value={data?.nextOfKin?.firstName} />
          <RenderData title={'Last Name'} value={data?.nextOfKin?.lastName} />
          <RenderData title={'Middle Name'} value={data?.nextOfKin?.middlename} />
          <RenderData title={'Gender'} value={data?.nextOfKin?.gender} />
          <RenderData title={'Relationship'} value={data?.nextOfKin?.relationship} />
          <RenderData title={'Address'} value={data?.nextOfKin?.address} />
          <RenderData title={'Email'} value={data?.nextOfKin?.email} />
          <RenderData title={'Phone Number'} value={data?.nextOfKin?.phoneNumber} />
        </View>
        <View style={{ flex: 1, alignItems: 'center',paddingVertical:10 }}>
          <TouchableOpacity onPress={LogOut}><Text style={{ color:"red" }}>LogOut</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
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
