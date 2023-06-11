import React from 'react';
import {Text, View} from 'react-native';
import styles from './BreadBox.module.css';
import dayjs from 'dayjs';

const BreadBox = props => {
  const date = dayjs(props.updatedAt).format('d.MMM.YY');
  return (
    <View style={styles.breadContainer}>
      <Text style={styles.nameBold}>
        {props.name} ({props.age}/{props.sex})
      </Text>
      <Text>{props.medicine}</Text>
      <View style={styles.dateNumber}>
        <Text>{props.number}</Text>
        <Text>{date}</Text>
      </View>
    </View>
  );
};

export default BreadBox;
