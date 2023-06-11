import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styles from './IconButton.module.css';

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
