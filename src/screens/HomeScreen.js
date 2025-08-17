import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from '../styles/HomeScreen.styles';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Profile Image */}
        <Image
          source={require('../assets/rashidprofile.jpg')}
          style={styles.profileImage}
          resizeMode="cover"
        />

        <View style={styles.content}>
          
          {/* Name + Blue Tick */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>Rashid Bahattab</Text>
            <Image
              source={require('../assets/icons/bluetick.png')}
              style={styles.tickIcon}
              resizeMode="contain"
            />
          </View>

          {/* Stars Row */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Image
                key={i}
                source={require('../assets/icons/star.png')}
                style={styles.starIcon}
                resizeMode="contain"
              />
            ))}
            <Text style={styles.reviewText}> 5 reviews</Text>
          </View>

          {/* About Section */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            Rashid offers transformative services including 1:1 lifestyle
            coaching, story-sharing features on his platforms, motivational
            event speaking, and brand collaborations – all designed to empower
            his community through authentic connection.
          </Text>

          <Text style={styles.role}>Social Media Influencer</Text>

          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AuthLoading')}
          >
            <Text style={styles.buttonText}>Book a session</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
