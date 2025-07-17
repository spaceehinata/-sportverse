'use client';

import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const avatars = [
  { name: 'Niki', img: require('../../assets/images/stadium.png') },
  { name: 'Roger', img: require('../../assets/images/stadium.png') },
  { name: 'Sherry', img: require('../../assets/images/stadium.png') },
  { name: 'Allan', img: require('../../assets/images/stadium.png') },
];

const posts = [
  {
    id: 1,
    user: 'Vakhtang Vakhtangadze',
    username: 'Mamarda',
    text: 'The best keeper in the universe ',
    image: require('../../assets/images/stadium.png'),
  },
  {
    id: 2,
    user: 'Vakhtang Vakhtangadze',
    username: 'Mamarda',
    text: 'The best keeper in the universe ',
    image: require('../../assets/images/stadium.png'),
  },
];

export default function HomePage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileWrapper}>
            <View style={styles.profileCircle} />
          </View>
          <Image
            source={require('../../assets/images/header.png')}
            style={styles.headerBackground}
          />

          <View style={styles.headerContent}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <View style={styles.avatarRow}>
              {avatars.map((avatar, idx) => (
                <View key={idx} style={styles.avatarItem}>
                  <Image source={avatar.img} style={styles.avatarImage} />
                  <Text style={styles.avatarName}>{avatar.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Posts */}
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <Image
                    source={require('../../assets/images/stadium.png')}
                    style={styles.postAvatar}
                  />
                  <View>
                    <Text style={styles.postUser}>{post.user}</Text>
                    <Text style={styles.postUsername}>@{post.username}</Text>
                  </View>
                </View>
                <Image
                  source={require('../../assets/images/more.png')}
                  style={styles.moreIcon}
                />
              </View>

              <Text style={styles.postText}>
                <Text style={styles.usernameHighlight}>@{post.username}</Text> {post.text}
              </Text>

              <Image source={post.image} style={styles.postImage} />
              <View style={styles.postActions}>
                <View style={styles.actionGroup}>
                  <Image
                    source={require('../../assets/images/love.png')}
                    style={styles.icons}
                  />
                  <Image
                    source={require('../../assets/images/comment.png')}
                    style={styles.icons}
                  />
                  <Image
                    source={require('../../assets/images/share.png')}
                    style={styles.icons}
                  />
                </View>
                <Image
                  source={require('../../assets/images/bookmark.png')}
                  style={styles.icons}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#263238',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileWrapper: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 45,
    marginBottom: 148,
    zIndex: 2,
    position: 'absolute',
  },
  profileCircle: {
    width: 30,
    height: 30,
    backgroundColor: '#ddd',
    borderRadius: 15,
  },
  header: {
    width: '100%',
    height: 180,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  headerBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 23,
  },
  logo: {
    width: 90,
    height: 85.56,
    resizeMode: 'contain',
    marginBottom: 39,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 50,
  },
  avatarItem: {
    alignItems: 'center',
    gap: 6,
  },
  avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 11,
    backgroundColor: '#aaa',
  },
  avatarName: {
    fontSize: 12,
    color: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  postCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 22,
    paddingHorizontal: 20.36,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 17,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  postAvatar: {
    width: 21,
    height: 21,
    borderRadius: 7,
  },
  moreIcon: { 
    width: 19,
    height: 3,
    resizeMode: 'contain',
  },
  postUser: {
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 6,
  },
  postUsername: {
    color: '#000',
    fontSize: 9,
    fontWeight: '400',
  },
  usernameHighlight: {
    color: '#263238',
    fontWeight: '600',
  },
  postText: {
    marginBottom: 16,
    color: '#AAAAAA',
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  actionGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  icons: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
});
