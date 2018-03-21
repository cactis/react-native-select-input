
import React from 'react';
import { shallow } from 'enzyme';
import Icon, { ARROW_ICON_TYPES } from '../Icon';

describe('Icon', () => {
  beforeEach(() => {
    this.props = {
      type: ARROW_ICON_TYPES.UP,
      loading: false,
      disabled: false,
    };
  });

  it('renders arrow up correctly', () => {
    const wrapper = shallow(<Icon {...this.props} />);

    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('renders arrow down correctly', () => {
    const wrapper = shallow(
      <Icon
        {...this.props}
        type={ARROW_ICON_TYPES.DOWN}
      />,
    );

    expect(wrapper.dive()).toMatchSnapshot();
  });
});
