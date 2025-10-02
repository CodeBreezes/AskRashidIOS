import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainLayout from '../components/MainLayout';
import styles from '../styles/HomeScreen.styles';

// Social media links
const socialLinks = [
  { name: 'tiktok', type: 'image', url: 'https://tiktok.com/@rashid.bahattab', source: require('../assets/icons/tik-tok.png'),  },
  { name: 'instagram', type: 'image', url: 'https://instagr.am/rashid.bahattab',source: require('../assets/icons/instagram.png'), color: '#C13584' },
  { name: 'youtube', type: 'image', url: 'https://youtube.com/rashidbahattab',source: require('../assets/icons/youtube.png'), color: '#FF0000' },
  { name: 'linkedin', type: 'image', url: 'https://ae.linkedin.com/in/rashid-bahattab-84127a88',source: require('../assets/icons/linkedin.png'), color: '#0077B5' },
  { name: 'twitter', type: 'image', url: 'https://x.com/rashid.bahattab',source: require('../assets/icons/twitter.png'), color: '#1DA1F2' },
  { name: 'snapchat', type: 'image', url: 'https://snapchat.com/add/rashidbahattab',source: require('../assets/icons/snapchat.png')},
  { name: 'globe', type: 'image', url: 'https://rashidbahattab.com/who-is-rashid',source: require('../assets/icons/earth.png'), color: '#7442ff' },
  { name: 'facebook', type: 'image', url: 'https://facebook.com/rashid.ad.7587',source: require('../assets/icons/facebook.png'), color: '#3b5998' },
];

const openLink = (url) => {
  Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
};

const AboutScreen = () => {
  return (
    <MainLayout title="About Rashid Bahattab">
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            source={require('../assets/rashidprofile.jpg')}
            style={styles.profileImage}
            resizeMode="cover"
          />

           <View style={styles.content}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name}>Rashid Bahattab</Text>
                     <Image
                        
                        source={require('../assets/icons/verify.png')}
                        style={styles.starIcon}
                        resizeMode="contain"
                      />
                  </View>
        
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
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>
              Rashid, an Emirati public figure from Abu Dhabi, UAE, offers transformative services including 1:1 lifestyle coaching, story-sharing features on his platforms, motivational event speaking, and brand collaborations — all designed to empower his community through authentic connection.
            </Text>

            {/* Social Media Icons */}
            <View style={styles.socialIconsRow}>
              {socialLinks.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => openLink(item.url)}>
                  {item.type === 'font' ? (
                    <FontAwesome
                      name={item.name}
                      size={20}
                      color={item.color}
                      style={styles.iconSpacing}
                    />
                  ) : (
                    <Image
                      source={item.source}
                      style={{ width: 24, height: 24, marginHorizontal: 8 }}
                      resizeMode="contain"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default AboutScreen;
