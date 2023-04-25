import React from "react";
import { Text, View } from "../../components/Themed";
import { Alert, ScrollView, StyleSheet } from 'react-native';
import BioDataForm from "../../components/form/BioData";
import { CanSubmit, StepperForm$, initialState, onAddUserData, useUserData } from "../../hooks/form.state";
import NextOfKinForm from "../../components/form/NextOfKinDtata";
import SetUpPasswordForm from "../../components/form/SetUpPassword";
import { UserProps } from "../../types/user";
import { ActivityIndicator, Dialog, MD2Colors } from "react-native-paper";
import Layout from "../../constants/Layout";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../constants/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function RegisterScreen() {
    const router = useRouter();
    const [stepper, setStepper] = React.useState<number>(1);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<UserProps>(initialState);
    React.useEffect(() => {
        StepperForm$.subscribe(setStepper);
    }, []);
    React.useEffect(() => {
        CanSubmit.subscribe({
            next: ((isSubmit: boolean) => {
                if (isSubmit) {
                    onRegister();
                }
            }),
        })
        return () => {
            onAddUserData.next(initialState);
            StepperForm$.next(1);
        };
    }, [])
    const onRegister = async () => {
        setLoading(true);
        try {
            const sign = await SignUp(data?.email as string, data?.password as string, `${data?.lastName} ${data?.firstName} ${data?.middlename}`);
            if (!sign) {
                setLoading(false);
                Alert.alert('Error!', 'Email address already exists');
                return false;
            }
            else {
                const userRef = collection(db, "users");
                await setDoc(doc(userRef, data?.email as string), data);
                if (userRef && userRef.id) {
                    Alert.alert('Success!', 'Registration successful');
                    onAddUserData.next(initialState);
                    StepperForm$.next(1);
                    setLoading(false);
                    router.replace('/');
                } else {
                    Alert.alert('Error!', 'Registration failed');
                    setLoading(false);
                }
            }

        } catch (e) {
            Alert.alert('Error!', 'Registration failed');
            setLoading(false);
        }
    }
    const SignUp = (email: string, password: string, name: string) => {
        return new Promise<boolean>((r) => {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
                })
                    .then(() => {
                        r(true);
                    })
                    .catch((error) => {
                        console.log(error);
                        r(false);
                    })
            }).catch((error) => {
                console.log(error);
                r(false);
            })
        })
    }
    return (
        <React.Fragment>
            <View style={styles.container}>
                <Text style={{ fontSize: 25 }}>User Signup Form</Text>
                <ScrollView style={{ flex: 1 }}>
                    {stepper == 1 && <BioDataForm state={data as UserProps} />}
                    {stepper == 2 && <NextOfKinForm state={data as UserProps} />}
                    {stepper == 3 && <SetUpPasswordForm />}
                </ScrollView>
                <Dialog dismissable={false} visible={loading} style={{ width: 55, height: 55, marginHorizontal: (Layout.window.width - 55) / 2, justifyContent: 'center', alignItems: 'center', padding: 0, alignContent: 'center' }} theme={{
                    colors: {
                        outline: 'transparent',
                    },
                }}>
                    <Dialog.Content style={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0, alignContent: 'center', width: 55, height: 55 }}>
                        <ActivityIndicator style={{ margin: 0, marginTop: -5 }} animating={true} size={'large'} color={MD2Colors.green800} />
                    </Dialog.Content>
                </Dialog>
            </View>
            <StatusBar style={'light'} />
        </React.Fragment>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
})