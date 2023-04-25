import React from "react";
import { CanSubmit, StepperForm$, onAddUserData, useUserData } from "../../hooks/form.state";
import { UserProps } from "../../types/user";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "../Themed";
import Layout from "../../constants/Layout";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
type IFormData = {
    npassword: string;
    cpassword: string;
}
export default function SetUpPasswordForm() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm<IFormData>();
    const onSubmit = async (data: IFormData) => {
        onAddUserData.next({ password: data.npassword });
        CanSubmit.next(true);
    }
    return (
        <React.Fragment>
            <View style={{ flex: 1 }}>
                <Text>Set your password</Text>
                <View style={styles.action}>
                    <Controller
                        name="npassword"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="New Password"
                                contentStyle={styles.input}
                                placeholder="Enter Password"
                                placeholderTextColor="#666666"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                clearButtonMode={'always'}
                                autoCapitalize="none"
                                activeOutlineColor={'#ccc'}
                                outlineColor={'#ccc'}
                                mode={'outlined'}
                                error={errors.npassword ? true : false}
                                secureTextEntry={true}
                            />)}
                    />
                </View>
                {errors.npassword?.type === 'required' && <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Animated.View>
                        <Text style={styles.errorMsg}>Password is required</Text>
                    </Animated.View>
                </View>}
                <View style={styles.action}>
                    <Controller
                        name="cpassword"
                        control={control}
                        rules={{
                            required: true,
                            validate: (val: string) => {
                                if (watch('npassword') != val) {
                                    return 'Your passwords do no match';
                                }
                            }
                        }}

                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="confirm Password"
                                contentStyle={styles.input}
                                placeholder="confirm Password"
                                placeholderTextColor="#666666"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                clearButtonMode={'always'}
                                autoCapitalize="none"
                                activeOutlineColor={'#ccc'}
                                outlineColor={'#ccc'}
                                mode={'outlined'}
                                error={errors.cpassword ? true : false}
                                secureTextEntry={true}
                            />)}
                    />
                </View>
                {errors.cpassword?.type === 'required' && <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Animated.View>
                        <Text style={styles.errorMsg}>You must confirm Password</Text>
                    </Animated.View>
                </View>}
                {(errors.cpassword && errors.cpassword?.type !== 'required') && <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Animated.View>
                        <Text style={styles.errorMsg}>{errors.cpassword.message}</Text>
                    </Animated.View>
                </View>}
                <View style={[styles.action, { marginTop: 30 }]}>
                    <LinearGradient end={{ x: 1, y: 0.5 }} start={{ x: 0, y: 0.5 }} colors={['#3B7A57', '#8DD1AB']}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                            <Text style={{ color: '#ffffff', fontSize: 20 }}>Submit</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                <View style={[styles.action, { marginTop: 30 }]}>
                    <TouchableOpacity onPress={() => StepperForm$.next(2)} style={styles.button}>
                        <Text style={{ fontSize: 20 }}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </React.Fragment>
    )

}
const styles = StyleSheet.create({
    action: {
        flexDirection: 'row',
        marginTop: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#f2f2f2',
        // paddingBottom: 5,
        alignItems: 'center',
        width: Layout.window.width - 40
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: Layout.isSmallDevice ? 12 : 14
    },
    input: {
        width: Layout.window.width - 40,
        borderColor: '#f2f2f2'
    },
    select: {
        width: Layout.window.width - 42
    },
    button: {
        width: Layout.window.width - 40,
        alignItems: 'center',
        padding: 15
    }
});