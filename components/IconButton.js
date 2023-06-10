import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const styles = StyleSheet.create({
  iconButton: {
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
});

const IconButton = props => {
  return (
    <TouchableOpacity
      style={[styles.iconButton, props.styles]}
      onPress={props.pressHandler}>
      {props.text && <Text>{props.text}</Text>}
      <FontAwesomeIcon size={24} color="black" icon={props.icon} />
    </TouchableOpacity>
  );
};

export default IconButton;
