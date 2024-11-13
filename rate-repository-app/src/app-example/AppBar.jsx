// AppBar.js

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const AppBar = ({ tabs, selectedTab, onTabPress, children }) => {
  return (
    <View style={styles.container}>
      {/* Render Tab Buttons */}
      {tabs.map((tab) => (
        <Pressable
          key={tab}
          style={[
            styles.tab,
            selectedTab === tab && styles.selectedTab, // Highlight selected tab
          ]}
          onPress={() => onTabPress(tab)} // Trigger the onTabPress function when tab is pressed
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab && styles.selectedTabText, // Change text color when selected
            ]}
          >
            {tab}
          </Text>
        </Pressable>
      ))}

      {/* Render the selected screen */}
      <View style={styles.screenContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab: {
    paddingHorizontal: 20, // Padding around the tab
    paddingVertical: 10, // Vertical padding for the tab
    marginHorizontal: 5, // Space between tabs
  },
  selectedTab: {
    borderBottomWidth: 2, // Add a bottom border to the selected tab
    borderColor: 'blue', // Color of the selected tab's indicator
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Default tab text color
  },
  selectedTabText: {
    color: 'blue', // Color of the tab text when selected
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default AppBar;