import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../Loading';

describe('Loading', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper.dive()).toMatchSnapshot();
  });
});
