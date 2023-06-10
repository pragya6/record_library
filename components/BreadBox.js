import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  breadContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    backgroundColor: 'white',
    borderRightColor: '#888888',
    borderBottomColor: '#88888',
  },
  dateNumber: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameBold: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
});

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
