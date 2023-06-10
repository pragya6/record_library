import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ScrollView,
} from 'react-native';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import LinearGradient from 'react-native-linear-gradient';
import BreadBox from './components/BreadBox';
import IconButton from './components/IconButton';
import Form from './components/Form';
import axios from 'axios';

const cstmTextProps = {
  style: {
    padding: 5,
    fontSize: 18,
    color: 'black',
    textAlign: 'justify',
    fontFamily: 'RobotoMono-Regular',
  },
};
setCustomText(cstmTextProps);

const cstmTextInputProps = {
  style: {
    width: '100%',
    color: 'black',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    fontSize: 18,
    fontFamily: 'RobotoMono-Regular',
  },
};
setCustomTextInput(cstmTextInputProps);

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  appBg: {
    padding: 15,
    position: 'relative',
    alignSelf: 'flex-start',
    flexDirection: 'column',
    gap: 25,
    height: '100%',
    width: '100%',
  },
  appHeading: {
    padding: 20,
    textAlign: 'center',
    color: 'black',
    fontSize: 28,
    fontFamily: 'RobotoMono-Bold',
  },
  dataView: {
    gap: 15,
    display: 'flex',
    height: 'auto',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scrollView: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  contentContainer: {
    gap: 15,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  IconButton: {
    position: 'absolute',
    right: 10,
    bottom: 15,
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newRecord, setNewRecord] = useState();
  const [srchName, setSrchName] = useState();
  const [allData, setAllData] = useState([]);

  const newHandler = () => {
    setNewRecord(prevRecord => !prevRecord);
  };

  useEffect(() => {
    const axiosData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'http://10.0.2.2/record_library/getRecord.php',
          {
            patientName: srchName,
          },
        );

        if (response.status === 200) {
          console.log('Data Fetched Successfully!!');
          setIsLoading(false);
          setAllData(response.data);
        } else {
          throw new Error('An error has occured.');
        }
      } catch (error) {
        console.log('An error has occured:', error);
        setIsLoading(false);
      }
    };
    axiosData();
  }, [srchName]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.appContainer}>
        <LinearGradient
          style={styles.appBg}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#edefed', '#c3edc2', '#99e994', '#6be361', '#1fdc12']}>
          <Text style={styles.appHeading}>Record Library</Text>
          {!newRecord && (
            <View style={styles.dataView}>
              <TextInput
                value={srchName}
                onChangeText={findName => setSrchName(findName)}
                placeholder={'Enter patient name here'}
              />
              {isLoading && <Text>Loading.....</Text>}
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}>
                {allData ? (
                  allData.map(pd => (
                    <BreadBox
                      key={pd.id}
                      name={pd.name}
                      age={pd.age}
                      sex={pd.sex}
                      number={pd.number}
                      medicine={pd.medicine}
                      updatedAt={pd.updated_at}
                    />
                  ))
                ) : (
                  <Text>No Results Found</Text>
                )}
              </ScrollView>
            </View>
          )}
          {!newRecord && (
            <IconButton
              styles={styles.IconButton}
              icon={faPlus}
              pressHandler={newHandler}
            />
          )}
          {newRecord && <Form newHandler={newHandler} />}
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default App;
