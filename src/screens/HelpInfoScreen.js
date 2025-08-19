import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import MainLayout from '../components/MainLayout';
import { useNavigation } from '@react-navigation/native';

const HelpInfoScreen = () => {
  const navigation = useNavigation();

  
  return (
    <MainLayout title="Help & Info">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* How to Book */}
          <View style={styles.section}>
            <View style={styles.titleRow}>
              <Text style={styles.sectionTitle}> How to Book an Appointment?</Text>
            </View>
            {[
              'Choose a Service\nBrowse through our list and pick the service you need.',
              'Type Your Topic & Description\nTell us what the appointment is about and briefly describe your concern or request — this helps us prepare better.',
              'Choose a Date & Time\nPick your preferred appointment slot based on availability.',
              'Confirm & Pay\nConfirm your details and pay securely via Stripe using your debit or credit card.',
              'Booking Confirmation\nOnce payment is done, your appointment is confirmed.',
            ].map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <Text style={styles.stepNumber}>{index + 1}.</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>

          {/* After Booking */}
          <View style={styles.section}>
            <View style={styles.titleRow}>
              <Text style={styles.sectionTitle}> What Happens After Booking?</Text>
            </View>
            <Text style={styles.paragraph}>
              Once your booking is confirmed, our team will reach out to you via call or WhatsApp to finalize the service details.
            </Text>
          </View>

          {/* Payment Info */}
          <View style={styles.section}>
            <View style={styles.titleRow}>
              <Image source={require('../assets/icons/credit.png')} style={styles.icon} />
              <Text style={styles.sectionTitle}> Payment Information</Text>
            </View>
            <Text style={styles.paragraph}>
              All payments are processed securely through Stripe, one of the world's most trusted payment gateways. You can pay using your debit/credit card directly within the app.
              {'\n\n'}Once the payment is successful, you'll receive an on-screen confirmation and an optional email receipt.
            </Text>
          </View>

          {/* Rescheduling */}
          <View style={styles.section}>
            <View style={styles.titleRow}>
              <Image source={require('../assets/icons/calendar.png')} style={styles.icon} />
              <Text style={styles.sectionTitle}> Rescheduling or Cancelling?</Text>
            </View>
            <Text style={styles.paragraph}>
              If you need to change your appointment, please use our Contact Us form as soon as possible and provide your booking details so we can assist you accordingly. Rescheduling options may depend on service availability.
            </Text>
          </View>

          {/* Contact */}
          <View style={styles.section}>
            <View style={styles.titleRow}>
              <Image source={require('../assets/icons/support.png')} style={styles.icon} />
              <Text style={styles.sectionTitle}> Contact Support</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ContactUsScreen')}>
              <Text style={styles.paragraph}>
                For any support-related questions or concerns, feel free to reach out to us through our Contact Us page or email us directly.
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ContactUsScreen')}>
              <Text style={styles.link}>💬 Contact Us</Text>
            </TouchableOpacity>
          </View>

          {/* Privacy */}
          <View style={styles.section}>
            <View style={styles.titleRow}>
              <Image source={require('../assets/icons/padlock.png')} style={styles.icon} />
              <Text style={styles.sectionTitle}> Privacy & Data Security</Text>
            </View>
            <Text style={styles.paragraph}>
              We value your privacy. All your personal and payment details are stored securely and are not shared with any third parties.
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </MainLayout>
  );
};

export default HelpInfoScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#0D5EA6',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stepNumber: {
    fontWeight: 'bold',
    color: '#0D5EA6',
    width: 20,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
  },
  paragraph: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  link: {
    fontSize: 15,
    color: '#0D5EA6',
    marginTop: 6,
    textDecorationLine: 'underline',
  },
});
