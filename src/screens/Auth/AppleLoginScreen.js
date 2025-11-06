import React, { useEffect, useState } from 'react';
import { View, Alert, Modal, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkEmailExists, loginUser } from '../../api/loginApi';
import { registerUser } from '../../api/userApi';

export default function AppleLoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [appleEmail, setAppleEmail] = useState('');
  const [appleUserId, setAppleUserId] = useState('');
  const [applePhone, setApplePhone] = useState('');

  useEffect(() => {
    handleAppleLogin();
  }, []);

  const handleAppleLogin = async () => {
    try {
      setLoading(true);
      const response = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      console.log('Apple Response:', response);

      const { user, email } = response;
      const DEFAULT_APPLE_PASSWORD = '12345678';
      const syntheticEmail = `${user}@appleuser.com`;
      const finalEmail = email || syntheticEmail;

      setAppleEmail(finalEmail);
      setAppleUserId(user);

      const emailExists = await checkEmailExists(finalEmail);
      if (emailExists?.exists) {
        await loginExistingUser(finalEmail, DEFAULT_APPLE_PASSWORD, navigation);
      } else {
        setShowPhoneModal(true);
      }
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      Alert.alert('Apple Sign-In Failed', error.message || 'Something went wrong');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const loginExistingUser = async (email, password, navigation) => {
    try {
      const loginRes = await loginUser({
        loginName: email,
        password: password,
      });

      if (
        loginRes?.status === 200 &&
        loginRes?.data?.isLoginSuccess &&
        loginRes?.data?.token
      ) {
        const { token, fName, lName, email: userEmail, userId, mobile } =
          loginRes.data;

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', userId.toString());
        await AsyncStorage.setItem('customerFullName', `${fName} ${lName}`);
        await AsyncStorage.setItem('email', userEmail);
        await AsyncStorage.setItem('phone', String(mobile));

        Alert.alert('✅ Success', 'You are now logged in with Apple!', [
          { text: 'OK', onPress: () => navigation.replace('Dashboard')},
        ]);
      } else {
        Alert.alert('Login Failed', 'Unable to log in with Apple. Please try again.');
      }
    } catch (err) {
      console.error('Apple Login Error:', err);
      Alert.alert('Error', 'Something went wrong while logging in.');
    }
  };

  const handleAppleRegistration = async () => {
    if (!applePhone) {
      return Alert.alert('Validation Error', 'Please enter your phone number.');
    }
debugger;
    setLoading(true);

    const payload = {
      firstName: 'Guest',
      lastName: 'User',
      phoneNumber: applePhone,
      email: appleEmail,
      password: '12345678',
      confirmPassword: '12345678',
      roles: ['Customer'],
      googleSignIn: true,
      appleUserId: appleUserId, 
    };

    try {
      const regRes = await registerUser(payload);
debugger;
      if (regRes.status === 200 || regRes.status === 201) {
        await loginExistingUser(appleEmail, '12345678');
      } else {
        Alert.alert('Registration Failed', regRes?.data?.errorMessage || 'Unexpected registration error');
      }
    } catch (err) {
      console.error('Registration Error:', err);
      Alert.alert('Error', err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
      setShowPhoneModal(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      {/* Phone Number Modal */}
      <Modal visible={showPhoneModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Enter Your Phone Number</Text>

            <TextInput
              placeholder="📞 Phone Number"
              keyboardType="phone-pad"
              style={styles.input}
              value={applePhone}
              onChangeText={setApplePhone}
              placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleAppleRegistration}>
              <Text style={styles.submitText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
    padding: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    color: '#555',
    marginTop: 10,
  },
});
