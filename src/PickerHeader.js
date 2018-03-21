import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';

const PickerHeader = ({ done, doneStyle, toggleShowOptions }) => (
  <View style={styles.pickerModalHeader}>
    <TouchableWithoutFeedback onPress={toggleShowOptions}>
      <View>
        <Text style={[styles.doneText, doneStyle]}>
          {done}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

PickerHeader.propTypes = {
  done: PropTypes.string.isRequired,
  toggleShowOptions: PropTypes.func.isRequired,
  doneStyle: Text.propTypes.style,
};

PickerHeader.defaultProps = {
  doneStyle: null,
};

const styles = StyleSheet.create({
  pickerModalHeader: {
    alignItems: 'flex-end',
    backgroundColor: '#F8F8F8',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  doneText: {
    fontSize: 14,
    color: '#000',
  },
});

export default PickerHeader;
