import React from "react";
import { Text, View } from "../../components/Themed";
import { ActivityIndicator, Alert, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from "expo-status-bar";
import Layout from "../../constants/Layout";
import Svg, { Path, SvgProps } from 'react-native-svg';
import { LinearGradient } from "expo-linear-gradient";
import { Button, Dialog, MD2Colors, TextInput } from "react-native-paper";
import { Link, useRouter } from "expo-router";
function SvgComponent1(props: SvgProps) {
    return (
        <Svg height={200} width={Layout.window.width} viewBox={`0 0 1440 320`} {...props}>
            <Path fill="#3B7A57" d="M0,96L48,101.3C96,107,192,117,288,144C384,171,480,213,576,240C672,267,768,277,864,250.7C960,224,1056,160,1152,149.3C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></Path>
        </Svg>
    );
}
function SvgComponent2(props: SvgProps) {
    return (
        <Svg height={200} width={Layout.window.width} viewBox={`0 0 1440 320`} {...props}>
            <Path fill="rgba(59,122,87,0.2)" d="M0,256L40,256C80,256,160,256,240,234.7C320,213,400,171,480,170.7C560,171,640,213,720,192C800,171,880,85,960,58.7C1040,32,1120,64,1200,85.3C1280,107,1360,117,1400,122.7L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></Path>
        </Svg>
    );
}
export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const onSubmit = () => {
        if (!username || !password) {
            Alert.alert("Please enter username and password");
        } else {
            router.replace('../(tabs)/');
        }
    };
    return (
        <React.Fragment>
            <LinearGradient colors={['#3B7A57', '#FFFAF0']} style={styles.container}>
                <View style={styles.box}>
                    <SvgComponent1 />
                </View>
                <View style={{ backgroundColor: 'transparent', marginTop: -40 }}>
                    <SvgComponent2 />
                </View>
                <View>

                </View>
            </LinearGradient>
            <View style={{ top: 0, bottom: 0, left: 0, right: 0, zIndex: 1, position: 'absolute', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: Layout.window.width, paddingHorizontal: 20, backgroundColor: 'transparent' }}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput onChangeText={(val: string) => setUsername(val)} value={username} mode={'outlined'} style={{ marginBottom: 10 }} contentStyle={{ backgroundColor: 'transparent' }} placeholder={'Enter username'} activeOutlineColor={'#ccc'} outlineColor={'#ccc'} label="Username" />
                    <TextInput onChangeText={(val: string) => setPassword(val)} value={password} mode={'outlined'} style={{ marginBottom: 10, }} contentStyle={{ backgroundColor: 'transparent' }} placeholder={'Enter password'} secureTextEntry activeOutlineColor={'#ccc'} outlineColor={'#ccc'} label="Password" />
                    <Button buttonColor={'#3B7A57'} icon={'login'} mode="contained" onPress={onSubmit}>
                        Login
                    </Button>
                    <Link href="/register" asChild>
                        <Pressable>
                            {({ pressed }) => (
                                <View style={{ opacity: pressed ? 0.5 : 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', marginTop: 20 }}>
                                    <Text style={{ color: '#3B7A57' }}> Register</Text>
                                </View>
                            )}
                        </Pressable>
                    </Link>
                </View>
            </View>
            <Dialog dismissable={false} visible={loading} style={{ width: 55, height: 55, marginHorizontal: (Layout.window.width - 55) / 2, justifyContent: 'center', alignItems: 'center', padding: 0, alignContent: 'center' }} theme={{
                colors: {
                    outline: 'transparent',
                },
            }}>
                <Dialog.Content style={{ backgroundColor: 'transparent', borderWidth: 0, padding: 0, margin: 0, alignContent: 'center', width: 55, height: 55 }}>
                    <ActivityIndicator style={{ margin: 0, marginTop: -5 }} animating={true} size={'large'} color={MD2Colors.green800} />
                </Dialog.Content>
            </Dialog>
            <StatusBar style={'light'} />
        </React.Fragment>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFFAF0'
    },
    box: {
        backgroundColor: '#3B7A57',
        height: 70
    },
    title: {
        color: '#FFFFFF',
        fontSize: 20
    },
    label: {
        color: '#FFFFFF',
    }
});
// #3B7A57
// #FFFAF0