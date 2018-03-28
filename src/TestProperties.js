import { Platform } from 'react-native';

export function testProperties(prefix, testProperty) {
  if (testProperty) {
    const testLabel = `${prefix}-${testProperty}`;
    return Platform.OS === 'android' ? { accessibilityLabel: testLabel } : { testID: testLabel };
  }
  return null;
}
