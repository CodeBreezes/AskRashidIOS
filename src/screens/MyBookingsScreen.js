import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,   
} from 'react-native';
import MainLayout from '../components/MainLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceMap, setServiceMap] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchServices = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Session Expired', 'Please login again.', [
          { text: 'OK', onPress: () => navigation.replace('Login') },
        ]);
        return;
      }

      const response = await axios.get(
        'https://askrashid.grahak.online/api/Services/api/services/GetAllServices',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const services = response.data;
      const serviceMapObj = {};
      services.forEach((service) => {
        serviceMapObj[service.uniqueId] = service.name;
      });
      setServiceMap(serviceMapObj);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'https://askrashid.grahak.online/api/Bookings',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      debugger;
      const filtered = response.data.filter(
        (booking) => booking.userId.toString() === userId
      );
      // NOTE: You might want to sort bookings by date here.
      setBookings(filtered);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchServices();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hour), parseInt(minute));
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const renderBooking = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{serviceMap[item.serviceId] || 'N/A'}</Text>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>Confirmed</Text>
        </View>
      </View>
      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Image
            source={require('../assets/icons/calendar.png')} // Replace with your calendar PNG
            style={styles.icon}
          />
          <Text style={styles.detailText}>{formatDate(item.startedDate)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Image
            source={require('../assets/icons/wall-clock.png')} // Replace with your clock PNG
            style={styles.icon}
          />
          <Text style={styles.detailText}>{formatTime(item.startedTime)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <MainLayout title="My Bookings">
      {loading ? (
        <ActivityIndicator size="large" color="#FF6B6B" style={{ marginTop: 50 }} />
      ) : bookings.length > 0 ? (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.uniqueId.toString()}
          renderItem={renderBooking}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Image
            source={require('../assets/icons/book.png')} // Replace with your empty calendar PNG
            style={{ width: 50, height: 50, tintColor: '#bbb' }}
          />
          <Text style={styles.noDataText}>You have no bookings yet.</Text>
        </View>
      )}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedBooking && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      {serviceMap[selectedBooking.serviceId] || 'Booking Details'}
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Image
                        source={require('../assets/icons/cross.png')} // Close icon PNG
                        style={styles.closeIcon}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalInfoCard}>
                    <View style={styles.modalInfoItem}>
                      <Image
                        source={require('../assets/icons/calendar.png')}
                        style={styles.icon}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.modalInfoLabel}>Date</Text>
                        <Text style={styles.modalInfoValue}>{formatDate(selectedBooking.startedDate)}</Text>
                      </View>
                    </View>
                    <View style={styles.modalInfoItem}>
                      <Image
                        source={require('../assets/icons/wall-clock.png')}
                        style={styles.icon}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.modalInfoLabel}>Time</Text>
                        <Text style={styles.modalInfoValue}>{formatTime(selectedBooking.startedTime)}</Text>
                      </View>
                    </View>
                    <View style={styles.modalInfoItem}>
                      <Image
                        source={require('../assets/icons/circle.png')} // Status PNG
                        style={styles.icon}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.modalInfoLabel}>Status</Text>
                        <Text style={styles.modalInfoValue}>Paid</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Topic</Text>
                    <Text style={styles.sectionText}>
                      {selectedBooking.topic || 'No topic provided.'}
                    </Text>
                  </View>

                  <View style={styles.modalSection}>
                    <Text style={styles.sectionTitle}>Additional Note</Text>
                    <Text style={styles.sectionText}>
                      {selectedBooking.notes || 'No additional notes.'}
                    </Text>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#0D5EA6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#333',
  },
  statusPill: {
    backgroundColor: '#e6f7e6',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#388e3c',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#0D5EA6',
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
  noDataText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  closeIcon: {
    width: 15,
    height: 15,
    tintColor: 'red',
  },
  modalInfoCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalInfoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  modalInfoValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  modalSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#0D5EA6',
    paddingLeft: 8,
  },
  sectionText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 22,
  },
});

export default MyBookingsScreen;
