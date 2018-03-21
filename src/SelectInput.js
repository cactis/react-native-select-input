import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ViewPropTypes,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import Icon, { ARROW_ICON_TYPES } from './Icon';
import Picker from './Picker';
import Loading from './Loading';

class SelectInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    done: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        label: PropTypes.string,
      }),
    ).isRequired,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    colors: PropTypes.shape({
      normal: PropTypes.string,
      light: PropTypes.string,
      dark: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func,
    renderLabel: PropTypes.func,
    renderArrowIcon: PropTypes.func,
    labelStyle: Text.propTypes.style,
    valueStyle: Text.propTypes.style,
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    label: null,
    placeholder: 'Select a value',
    done: 'Done',
    value: null,
    arrowIcon: null,
    disabled: false,
    loading: false,
    colors: {
      normal: '#9C9C9C',
      light: '#D9D9D9',
      dark: '#545454',
    },
    onChange: () => {},
    renderLabel: null,
    renderArrowIcon: null,
    labelStyle: null,
    valueStyle: null,
    style: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      optionsVisible: false,
    };
    this.styles = styles(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  getValue = () => {
    const { options, placeholder } = this.props;

    const selectedOption = options.find(({ value }) => value === this.state.value);

    if (selectedOption) {
      return selectedOption.label;
    }

    return placeholder;
  };

  handleChangeValue = (value) => {
    this.setState({
      value,
    }, () => this.props.onChange(value));
  }

  handleToggleShowOptions = () => {
    if (this.props.disabled || this.props.loading) {
      return;
    }

    Keyboard.dismiss();

    this.setState(prevState => ({
      optionsVisible: !prevState.optionsVisible,
    }));
  };

  renderValue = () => {
    const { loading, disabled, valueStyle } = this.props;

    if (loading) {
      return (
        <View style={this.styles.loadingContainer}>
          <Loading />
        </View>
      );
    }

    return (
      <Text
        style={[
          this.styles.value,
          disabled && this.styles.valueDisabled,
          valueStyle,
        ]}
      >
        {this.getValue()}
      </Text>
    );
  }

  renderLabel = () => {
    const {
      label,
      renderLabel,
      disabled,
      loading,
      labelStyle,
    } = this.props;

    if (renderLabel) {
      return renderLabel();
    }

    if (!label) {
      return;
    }

    return (
      <Text
        style={[
          this.styles.label,
          (disabled || loading) && this.styles.labelDisabled,
          labelStyle,
        ]}
      >
        {label}
      </Text>
    );
  }

  render() {
    const { value, optionsVisible } = this.state;
    const {
      label,
      disabled,
      loading,
      colors,
      style,
      renderArrowIcon,
      ...props
    } = this.props;

    return (
      <View style={[this.styles.container, style]}>
        <TouchableWithoutFeedback onPress={this.handleToggleShowOptions}>
          <View
            style={[
              this.styles.innerContainer,
              this.state.optionsVisible && this.styles.activeInnerContainer,
            ]}
          >
            {this.renderLabel()}

            <View style={this.styles.valueContainer}>
              {this.renderValue()}

              <Icon
                disabled={disabled}
                loading={loading}
                type={optionsVisible ? ARROW_ICON_TYPES.UP : ARROW_ICON_TYPES.DOWN}
                tintColor={(disabled || loading) ? colors.normal : colors.dark}
                renderArrowIcon={renderArrowIcon}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        {(!disabled && !loading) && (
          <Picker
            {...props}
            colors={colors}
            value={value}
            onChange={this.handleChangeValue}
            visible={optionsVisible}
            toggleShowOptions={this.handleToggleShowOptions}
          />
        )}
      </View>
    );
  }
}

const styles = ({ colors }) => StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    paddingVertical: 10,
  },
  activeInnerContainer: {
    borderBottomWidth: 2,
    borderBottomColor: colors.dark,
  },
  label: {
    color: colors.normal,
    fontSize: 14,
  },
  labelDisabled: {
    color: colors.normal,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    paddingTop: Platform.OS === 'ios' ? 9 : 15,
  },
  value: {
    fontSize: 14,
    color: colors.dark,
    paddingTop: Platform.OS === 'ios' ? 9 : 15,
    marginRight: 15,
  },
  valueDisabled: {
    color: colors.normal,
  },
});

export default SelectInput;
