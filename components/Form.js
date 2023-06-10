import React, {useState} from 'react';
import {StyleSheet, TextInput, Text, View} from 'react-native';
import IconButton from './IconButton';
import {faClose, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const Form = props => {
  //Initial Variables
  const formVars = {
    name: '',
    age: '',
    sex: '',
    address: '',
    number: '',
    medicine: '',
  };

  const [vars, setVars] = useState(formVars);

  //Changing value of the variable input accessed
  const changeHandler = (inValue, inName) => {
    setVars(prevValues => {
      return {...prevValues, [inName]: inValue};
    });
  };

  //Button Click Function
  const submitForm = () => {
    axios
      .post('http://10.0.2.2/record_library/postRecord.php', {
        name: vars.name,
        age: vars.age,
        sex: vars.sex,
        number: vars.number,
        medicine: vars.medicine,
        address: vars.address,
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error.message);
      });
    props.newHandler(); //Sending back to homepage
    setVars(formVars); //Resetting all the fields
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text />
          <Text>New Record</Text>
          <IconButton pressHandler={props.newHandler} icon={faClose} />
        </View>
        <TextInput
          name="name"
          value={vars.name}
          placeholder="Patient's Name"
          onChangeText={value => changeHandler(value, 'name')}
        />
        <TextInput
          name="age"
          value={vars.age}
          placeholder="Patient's Age"
          onChangeText={value => changeHandler(value, 'age')}
        />
        <TextInput
          name="sex"
          value={vars.sex}
          placeholder="Patient's Sex"
          onChangeText={value => changeHandler(value, 'sex')}
        />
        <TextInput
          name="number"
          value={vars.number}
          placeholder="Patient's Phone Number"
          onChangeText={value => changeHandler(value, 'number')}
        />
        <TextInput
          name="medicine"
          value={vars.medicine}
          placeholder="Medicine Prescribed"
          onChangeText={value => changeHandler(value, 'medicine')}
        />
        <TextInput
          name="address"
          value={vars.address}
          multiline
          numberOfLines={4}
          placeholder="Patient's Address"
          onChangeText={value => changeHandler(value, 'address')}
        />
        <IconButton
          text="Add Record"
          pressHandler={submitForm}
          icon={faRightToBracket}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Form;
