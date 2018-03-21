import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { shallow } from 'enzyme';
import SelectInput from '../';

describe('SelectInput', () => {
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
      onChange: jest.fn(),
    };
  });

  it('renders correctly', () => {
    const wrapper = shallow(<SelectInput {...this.props} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders correctly with disabled state', () => {
    const wrapper = shallow(
      <SelectInput
        {...this.props}
        disabled
      />,
    );

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders correctly with loading state', () => {
    const wrapper = shallow(
      <SelectInput
        {...this.props}
        loading
      />,
    );

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders correctly with different style', () => {
    const wrapper = shallow(
      <SelectInput
        {...this.props}
        style={{
          backgroundColor: '#0000FF',
        }}
      />,
    );

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should call onChange prop when the value changes', () => {
    const wrapper = shallow(<SelectInput {...this.props} />);

    const expectedValue = this.props.options[1].value;

    wrapper.instance().handleChangeValue(expectedValue);

    expect(this.props.onChange).toHaveBeenCalledWith(expectedValue);
    expect(wrapper.state().value).toBe(expectedValue);
  });

  it('should open modal with picker', () => {
    const wrapper = shallow(<SelectInput {...this.props} />);

    wrapper.find(TouchableWithoutFeedback).props().onPress();

    expect(wrapper.state().optionsVisible).toBe(true);
  });
});
