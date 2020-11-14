// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Screen to update the user

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

const UpdateUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userDob, setUserDob] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [userGender, setUserGender] = useState('');
  let [userUsername, setUserUsername] = useState('');
  let [userPassword, setUserPassword] = useState('');

  let updateAllStates = (name, dob, address, gender, username, password) => {
    setUserName(name);
    setUserDob(dob);
    setUserAddress(address);
    setUserGender(gender)
    setUserUsername(username)
    setUserPassword(password)
    
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.user_name, res.user_dob, res.user_address, res.user_gender, res.user_username, res.user_password);
          } else {
            alert('No user found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  };
  let updateUser = () => {
    console.log(inputUserId, userName, userDob, userAddress, userGender, userUsername, userPassword);

    if (!inputUserId) {
      alert('Please fill User id');
      return;
    }
    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userDob) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    if (!userGender) {
      alert('Please fill Gender');
      return;
    }
    if (!userUsername) {
      alert('Please fill Username');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_dob=? , user_address=?, user_gender=?, user_username=?, user_password=? where user_id=?',
        [userName, userDob, userAddress, userGender, userUsername, userPassword, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Updation Failed');
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
                placeholder="Enter User Id"
                style={{padding: 10}}
                onChangeText={(inputUserId) => setInputUserId(inputUserId)}
              />
              <Mybutton title="Search User" customClick={searchUser} />
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
              <Mybutton title="Update User" customClick={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;
