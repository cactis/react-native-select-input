import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { shallow } from 'enzyme';
import colors from '../../fixtures/colors';
import Picker from '../Picker';

describe('Picker', () => {
  beforeEach(() => {
    const options = [{
      value: 'first-value',
      label: 'First value',
    }, {
      value: 'second-value',
      label: 'Second value',
    }];

    this.props = {
      label: 'label',
      options,
      value: options[0].value,
      colors,
      done: 'Done',
      onChange: jest.fn(),
      toggleShowOptions: jest.fn(),
    };
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Picker {...this.props} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders correctly with a testProperty set', () => {
    const wrapper = shallow(
      <Picker
        {...this.props}
        testProperty="foo"
      />,
    );

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should show picker if modal is visible', () => {
    const wrapper = shallow(<Picker {...this.props} />, {
      lifecycleExperimental: true,
    });

    jest.useFakeTimers();

    expect(wrapper.state().showPicker).toBe(false);

    wrapper.setProps({
      visible: true,
    });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 150);
    setTimeout(() => expect(wrapper.state().showPicker).toBe(true), 0);
  });

  it('should close options if pressed', () => {
    const wrapper = shallow(
      <Picker
        {...this.props}
        visible
      />,
    );

    wrapper.find(TouchableWithoutFeedback).props().onPress();

    expect(this.props.toggleShowOptions).toHaveBeenCalled();
  });
});
