import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TermsCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={toggleCheckbox} activeOpacity={0.8}>
      <View style={styles.checkbox}>
        {isChecked && <View style={styles.innerBox} />}
      </View>
        <Text style={styles.haveacc}>
            Accept{' '}
            <Text style={styles.haveaccHighlight}>Terms and conditions</Text>
        </Text>
    </TouchableOpacity>
  );
};

export default TermsCheckbox;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 33,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  innerBox: {
    width: 10, 
    height: 10,
    backgroundColor: '#2743FD',
    borderRadius: 2,
  },

  haveacc: {
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Noto Sans Georgian',
    textAlign: 'center',
    marginLeft: 13,

},
haveaccHighlight: {
  color: '#125BE4',
  fontSize: 14,
  fontWeight: '400',
  fontFamily: 'Noto Sans Georgian',
},
});
