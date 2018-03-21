import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { shallow } from 'enzyme';
import PickerHeader from '../PickerHeader';

describe('PickerHeader', () => {
  beforeEach(() => {
    this.props = {
      done: 'Done',
      toggleShowOptions: jest.fn(),
    };
  });

  it('renders correctly', () => {
    const wrapper = shallow(<PickerHeader {...this.props} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should close options if pressed', () => {
    const wrapper = shallow(
      <PickerHeader
        {...this.props}
        visible
      />,
    );

    wrapper.find(TouchableWithoutFeedback).props().onPress();

    expect(this.props.toggleShowOptions).toHaveBeenCalled();
  });
});
