import React from "react";
import { UserProps } from "../../types/user";
import { Controller, useForm } from "react-hook-form";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import Layout from "../../constants/Layout";
import { Text, View } from "../Themed";
import * as Crypto from 'expo-crypto';
import { TextInput } from "react-native-paper";
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from "expo-linear-gradient";
import { CanSubmit, StepperForm$, onAddUserData } from "../../hooks/form.state";
type IFormData = {
    uuid: string;
    email: string;
    firstName: string;
    lastName: string;
    middlename: string;
    gender: string;
    maritalsStatus: string;
    phoneNumber: string;
    address: string;
}
type Props = {
    state: UserProps
}
export default function BioDataForm(props: Props) {
    // const data = useUserData();
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<IFormData>();
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phonePattern = /^(080|091|090|070|081)+[0-9]{8}$/;
    React.useEffect(() => {
        setValue('address', props.state?.address ?? '');
        setValue('uuid', props.state?.uuid ?? Crypto.randomUUID())
        setValue('email', props.state?.email ?? '');
        setValue('firstName', props.state?.firstName ?? '');
        setValue('lastName', props.state?.lastName ?? '');
        setValue('middlename', props.state?.middlename ?? '');
        setValue('gender', props.state?.gender ?? '');
        setValue('maritalsStatus', props.state?.maritalsStatus ?? '');
        setValue('phoneNumber', props.state?.phoneNumber ?? '');
    }, [])
    const onSubmit = async (data: IFormData) => {
        onAddUserData.next({ ...data, ...{ nextOfKin: props.state?.nextOfKin, password: props.state?.password }})
        StepperForm$.next(2);
        CanSubmit.next(false);
    }
    //onAddBioData
    return (
        <React.Fragment>
            <View style={{ flex: 1 }}>
                <Text>Bio Data</Text>
                <View style={styles.action}>
                    <Controller
                        name="lastName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="Last Name"
                                contentStyle={styles.input}
                                placeholder="Enter Last Name"
                                placeholderTextColor="#666666"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                clearButtonMode={'always'}
                                autoCapitalize="none"
                                activeOutlineColor={'#ccc'}
                                outlineColor={'#ccc'}
                                mode={'outlined'}
                                error={errors.lastName ? true : false}
                            />)}
                    />
                </View>
                {errors.lastName?.type === 'required' && <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                    <Animated.View>
                        <Text style={styles.errorMsg}>Last name is not allowed to be empty</Text>
                    </Animated.View>
                </View>}
                <View style={styles.action}>
                    <Controller
                        name="firstName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="First Name"
                                contentStyle={styles.input}
                                placeholder="Enter Firstname"
                                placeholderTextColor="#666666"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                clearButtonMode={'always'}
                                autoCapitalize="none"
                                activeOutlineColor={'#ccc'}
                                outlineColor={'#ccc'}
                                mode={'outlined'}
                                error={errors.firstName ? true : false}
                            />)}
                    />
                </View>
                {errors.firstName?.type === 'required' &&
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Animated.View>
                            <Text style={styles.errorMsg}>First name is not allowed to be empty</Text>
                        </Animated.View>
                    </View>}
                <View style={styles.action}>
                    <Controller
                        name="middlename"
                        control={control}
                        // rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="Middlename"
                                contentStyle={styles.input}
                                placeholder="Enter Middlename"
                                placeholderTextColor="#666666"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                clearButtonMode={'always'}
                                autoCapitalize="none"
                                activeOutlineColor={'#ccc'}
                                outlineColor={'#ccc'}
                                mode={'outlined'}
                                error={errors.middlename ? true : false}
                            />)}
                    />
                </View>
                {errors.middlename?.type === 'required' &&
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Animated.View>
                            <Text style={styles.errorMsg}>First name is not allowed to be empty</Text>
                        </Animated.View>
                    </View>}
                <View style={styles.action}>
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <View style={{ borderColor: '#ccc', borderWidth: 1 }}>
                                    <Picker
                                        style={[styles.select]}
                                        selectedValue={value}
                                        onValueChange={(itemValue) =>
                                            onChange(itemValue)
                                        }
                                        mode="dialog">
                                        <Picker.Item label="Gender" value="" />
                                        <Picker.Item label="Male" value="Male" />
                                        <Picker.Item label="Female" value="Female" />
                                    </Picker>
                                </View>
                            </>
                        )}
                    />
                </View>
                {errors.gender?.type === 'required' &&
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Animated.View>
                            <Text style={styles.errorMsg}>Please select gender</Text>
                        </Animated.View>
                    </View>}
                <View style={styles.action}>
                    <Controller
                        name="maritalsStatus"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <View style={{ borderColor: '#ccc', borderWidth: 1 }}>
                                    <Picker
                                        style={[styles.select]}
                                        selectedValue={value}
                                        onValueChange={(itemValue) =>
                                            onChange(itemValue)
                                        }
                                        mode="dialog">
                                        <Picker.Item label="Maritals status" value="" />
                                        <Picker.Item label="Single" value="Single" />
                                        <Picker.Item label="Married" value="Married" />
                                        <Picker.Item label="Others" value="Others" />
                                    </Picker>
                                </View>
                            </>
                        )}
                    />
                </View>
                {errors.maritalsStatus?.type === 'required' &&
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Animated.View>
                            <Text style={styles.errorMsg}>Please select maritals status</Text>
                        </Animated.View>
                    </View>}
                <View style={styles.action}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ pattern: emailPattern }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="Email"
                                contentStyle={styles.input}
                                placeholder="Enter email"
                                placeholderTextColor="#666666"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                clearButtonMode={'always'}
                                autoCapitalize="none"
                                activeOutlineColor={'#ccc'}
                                outlineColor={'#ccc'}
                                mode={'outlined'}
                                inputMode="email"
                                error={errors.email ? true : false}
                            />)}
                    />
                </View>
                {errors.email && errors.email?.type !== 'required' &&
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Animated.View>
                            <Text style={styles.errorMsg}>Please ender a valid email</Text>
                        </Animated.View>
                    </View>}
                <View style={styles.action}>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{ pattern: phonePattern, required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="Phone No."
                                contentStyle={styles.input}
                                placeholder="Enter phone number"
                                placeholderTextColor="#666666"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                clearButtonMode={'always'}
                                autoCapitalize="none"
                                activeOutlineColor={'#ccc'}
                                outlineColor={'#ccc'}
                                mode={'outlined'}
                                inputMode="tel"
                                error={errors.phoneNumber ? true : false}
                            />)}
                    />
                </View>
                {errors.phoneNumber && errors.phoneNumber?.type == 'required' &&
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Animated.View>
                            <Text style={styles.errorMsg}>Please provide your phone number</Text>
                        </Animated.View>
                    </View>}
                {errors.phoneNumber && errors.phoneNumber?.type !== 'required' &&
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Animated.View>
                            <Text style={styles.errorMsg}>Please ender a valid phone number</Text>
                        </Animated.View>
                    </View>}
                <View style={styles.action}>
                    <Controller
                        name="address"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                label="address"
                                contentStyle={styles.input}
                                placeholder="Enter address"
                                placeholderTextColor="#666666"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                clearButtonMode={'always'}
                                autoCapitalize="none"
                                activeOutlineColor={'#ccc'}
                                outlineColor={'#ccc'}
                                mode={'outlined'}
                                error={errors.address ? true : false}
                                multiline
                            />)}
                    />
                </View>
                {errors.address?.type === 'required' &&
                    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                        <Animated.View>
                            <Text style={styles.errorMsg}>Address is not allowed to be empty</Text>
                        </Animated.View>
                    </View>}
                <View style={[styles.action, { marginTop: 30 }]}>
                    <LinearGradient end={{ x: 1, y: 0.5 }} start={{ x: 0, y: 0.5 }} colors={['#3B7A57', '#8DD1AB']}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                            <Text style={{ color: '#ffffff', fontSize: 20 }}>{'Next>>'}</Text>
                        </TouchableOpacity>
                    </LinearGradient>
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