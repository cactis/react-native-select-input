import React, { PureComponent } from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

class SlideUpAnimation extends PureComponent {
  static propTypes = {
    ...Animated.View.propTypes,
    visible: PropTypes.bool.isRequired,
    onAnimationEnd: PropTypes.func,
  };

  static defaultProps = {
    style: null,
    visible: false,
    onAnimationEnd: () => {},
  };

  state = {
    animation: new Animated.Value(-height),
  };

  componentWillReceiveProps(nextProps) {
    const isAboutToShow = nextProps.visible && !this.props.visible;

    if (isAboutToShow) {
      this.startSlideInAnimation();
    }
  }

  startSlideInAnimation = () =>
    Animated.spring(this.state.animation, {
      toValue: 0,
      bounciness: 0,
      easing: Easing.linear,
    }).start();

  render() {
    const { visible, style, ...props } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <Animated.View
        {...props}
        style={[
          styles.container,
          {
            bottom: this.state.animation,
          },
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export default SlideUpAnimation;
