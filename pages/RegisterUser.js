import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const RegisterUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userDob, setUserDob] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [userGender, setUserGender] = useState('');
  let [userUsername, setUserUsername] = useState('');
  let [userPassword, setUserPassword] = useState('');

  let register_user = () => {
    console.log(userName, userDob, userAddress, userGender, userUsername, userPassword);

    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userDob) {
      alert('Please fill date of birth');
      return;
    }
    if (!userAddress) {
      alert('Please fill address');
      return;
    }
    if (!userGender) {
      alert('Please fill gender');
      return;
    }
    if (!userUsername) {
      alert('Please fill username');
      return;
    }
    if (!userPassword) {
      alert('Please fill password');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (userName, userDob, userAddress, userGender, userUsername, userPassword) VALUES (?,?,?,?,?,?)',
        [userName, userDob, userAddress, userGender, userUsername, userPassword],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={(userName) => setUserName(userName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Date of Birth (DD/MM/YYYY)"
                onChangeText={(userDob) => {
                  var date = str.split("/"),
                  d = date[0],
                  m = date[1],
                  y = date[2],
                  temp = [];
                  temp.push(y,m,d);
                  var dobFormatted = new Date(temp.join("-")).toUTCString();
                  setUserDob(dobFormatted)}}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Address"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Gender"
                onChangeText={(userGender) => setUserGender(userGender)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Username"
                onChangeText={(userUsername) => setUserUsername(userUsername)}
                maxLength={15}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Password"
                onChangeText={(userPassword) => setUserPassword(userPassword)}
                maxLength={15}
                style={{padding: 10}}
                secureTextEntry={true}
              />
              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
