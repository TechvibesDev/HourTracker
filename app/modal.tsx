import { StatusBar } from 'expo-status-bar';
import { Animated, Keyboard, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import Layout from '../constants/Layout';
import { Controller, useForm } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";
import { LinearGradient } from 'expo-linear-gradient';
type IFormData = {
  uuid: string;
  from: string;
  to: string;
  date: any;
  status: string;
  bus: string;
  busNo: string;
}
export default function ModalScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormData>();
  const [show, setShow] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<Date>(new Date());
  const onSubmit = (data: IFormData) => {

  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25 }}>Create Trip</Text>
      <View style={styles.action}>
        <Controller
          name="from"
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
                  <Picker.Item label="Departure" value="" />
                  <Picker.Item label="Jalingo" value="Jalingo" />
                  <Picker.Item label="Yola" value="Yola" />
                  <Picker.Item label="Makurdi" value="Makurdi" />
                  <Picker.Item label="Gembu" value="Gembu" />
                  <Picker.Item label="Kano" value="Kano" />
                  <Picker.Item label="Kaduna" value="Kaduna" />
                  <Picker.Item label="Borno" value="Borno" />
                  <Picker.Item label="Abuja" value="Abuja" />
                  <Picker.Item label="Lagos" value="Lagos" />
                  <Picker.Item label="Jos" value="Jos" />
                  <Picker.Item label="PH" value="PH" />
                  <Picker.Item label="Yobe" value="Yobe" />
                  <Picker.Item label="Sokoto" value="Sokoto" />
                  <Picker.Item label="Wukari" value="Wukari" />
                  <Picker.Item label="Kebbi" value="Kebbi" />
                </Picker>
              </View>
            </>
          )}
        />
      </View>
      {errors.from?.type === 'required' &&
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Animated.View>
            <Text style={styles.errorMsg}>Please select departure</Text>
          </Animated.View>
        </View>}
      <View style={styles.action}>
        <Controller
          name="to"
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
                  <Picker.Item label="Destination" value="" />
                  <Picker.Item label="Jalingo" value="Jalingo" />
                  <Picker.Item label="Yola" value="Yola" />
                  <Picker.Item label="Makurdi" value="Makurdi" />
                  <Picker.Item label="Gembu" value="Gembu" />
                  <Picker.Item label="Kano" value="Kano" />
                  <Picker.Item label="Kaduna" value="Kaduna" />
                  <Picker.Item label="Borno" value="Borno" />
                  <Picker.Item label="Abuja" value="Abuja" />
                  <Picker.Item label="Lagos" value="Lagos" />
                  <Picker.Item label="Jos" value="Jos" />
                  <Picker.Item label="PH" value="PH" />
                  <Picker.Item label="Yobe" value="Yobe" />
                  <Picker.Item label="Sokoto" value="Sokoto" />
                  <Picker.Item label="Wukari" value="Wukari" />
                  <Picker.Item label="Kebbi" value="Kebbi" />
                </Picker>
              </View>
            </>
          )}
        />
      </View>
      {errors.to?.type === 'required' &&
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Animated.View>
            <Text style={styles.errorMsg}>Please select destinations</Text>
          </Animated.View>
        </View>}
      <View style={styles.action}>
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Trip date"
                contentStyle={styles.input}
                placeholder="Choose Trip date"
                placeholderTextColor="#666666"
                value={value}
                clearButtonMode={'always'}
                autoCapitalize="none"
                activeOutlineColor={'#ccc'}
                outlineColor={'#ccc'}
                mode={'outlined'}
                error={errors.date ? true : false}
                onFocus={() => Keyboard.dismiss()}
                onTouchStart={() => setShow(true)}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  onChange={(e, selectDate) => {
                    onChange(format(selectDate as Date, 'yyyy-MM-dd') as any);
                    setDate(selectDate as Date);
                    setShow(false)
                  }
                  }
                />
              )}
            </>
          )}
        />
      </View>
      {errors.date?.type === 'required' &&
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Animated.View>
            <Text style={styles.errorMsg}>Please choose trip date</Text>
          </Animated.View>
        </View>}
      <View style={styles.action}>
        <Controller
          name="bus"
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
                  <Picker.Item label="Transport company" value="" />
                  <Picker.Item label="TSTC" value="TSTC" />
                  <Picker.Item label="Taraba Mass" value="Taraba Mass" />
                  <Picker.Item label="The people choice" value="The people choice" />
                  <Picker.Item label="Kakara Motors" value="Kakara Motors" />
                  <Picker.Item label="Dan pulo" value="Dan pulo" />
                  <Picker.Item label="Adamawa Sunshine" value="Adamawa Sunshine" />
                  <Picker.Item label="Kano line" value="Kano line" />
                  <Picker.Item label="Taraba Express" value="Taraba Express" />
                  <Picker.Item label="Benue Links" value="Benue Links" />
                  <Picker.Item label="GUO" value="GUO" />
                  <Picker.Item label="Borno Express" value="Borno Express" />
                </Picker>
              </View>
            </>
          )}
        />
      </View>
      {errors.bus?.type === 'required' &&
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Animated.View>
            <Text style={styles.errorMsg}>Please select transport company</Text>
          </Animated.View>
        </View>}
      <View style={styles.action}>
        <Controller
          name="busNo"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Bus No."
              contentStyle={styles.input}
              placeholder="Enter bus number"
              placeholderTextColor="#666666"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              clearButtonMode={'always'}
              autoCapitalize="none"
              activeOutlineColor={'#ccc'}
              outlineColor={'#ccc'}
              mode={'outlined'}
              error={errors.busNo ? true : false}
            />)}
        />
      </View>
      {errors.busNo && errors.busNo?.type == 'required' &&
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Animated.View>
            <Text style={styles.errorMsg}>Please enter bus number</Text>
          </Animated.View>
        </View>}
      <View style={[styles.action, { marginTop: 30 }]}>
        <LinearGradient end={{ x: 1, y: 0.5 }} start={{ x: 0, y: 0.5 }} colors={['#3B7A57', '#8DD1AB']}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
            <Text style={{ color: '#ffffff', fontSize: 20 }}>Save Trip</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <StatusBar style={'auto'} />
    </View>
  );
}
// onChangeText={onChange}
// onBlur={onBlur}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
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
