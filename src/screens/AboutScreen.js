import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import styles from '../styles/HomeScreen.styles';
import MainLayout from '../components/MainLayout';

const AboutScreen = () => {
  return (
    <MainLayout title="About Rashid Bahattab">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Profile Image */}
        <View style={styles.profileImageWrapper}>
          <Image
            source={require('../assets/rashidprofile.jpg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          
          {/* Name and Verified Badge (PNG) */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>Rashid Bahattab</Text>
            <Image
              source={require('../assets/icons/verify.png')}
              style={styles.starIcon}
              resizeMode="contain"
            />
          </View>

          {/* Star Ratings (PNG) */}
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
            Rashid offers transformative services including 1:1 lifestyle coaching,
            story-sharing features on his platforms, motivational event speaking,
            and brand collaborations – all designed to empower his community
            through authentic connection.
          </Text>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default AboutScreen;
