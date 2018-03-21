import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loading = ({ ...props }) => (
  <ActivityIndicator {...props} />
);

Loading.propTypes = ActivityIndicator.propTypes;

Loading.defaultProps = {
  size: 'small',
  color: '#000',
};

export default Loading;
