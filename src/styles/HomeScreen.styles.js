import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  // Add this new style for SafeAreaView
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  profileImage: {
    width,
    height: height * 0.5,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 25,
    backgroundColor: '#f7f4ff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    minHeight: height * 0.6,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginRight: 6,
    color: '#333',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  reviewText: {
    color: '#F9A825',
    marginLeft: 5,
    fontSize: width * 0.035,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 16,
    fontSize: width * 0.045,
    color: '#444',
  },
  description: {
    marginTop: 6,
    color: '#555',
    fontSize: width * 0.037,
    lineHeight: 22,
  },
  role: {
    marginTop: 12,
    color: '#7442ff',
    fontSize: width * 0.035,
  },
  button: {
    backgroundColor: '#0D5EA6',
    paddingVertical: 16,
    borderRadius: 25,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },

  socialIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  iconSpacing: {
    marginRight: 12,
  },
  profileImageWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  starIcon: {
  width: 18,
  height: 18,
  marginRight: 3,
},

});