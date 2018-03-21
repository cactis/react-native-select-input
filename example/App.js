import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import SelectInput from '@tele2/react-native-select-input';

const options = [{
  value: 'first-option',
  label: 'This is the first option',
}, {
  value: 'second-option',
  label: 'This is the second option',
}, {
  value: 'third-option',
  label: 'This is the third option',
}];

class App extends Component {
  handleChangeValue = value => alert(`Changed value to ${value}`);

  render() {
    return (
      <ScrollView style={styles.container}>
        <SelectInput
          label="What option are you going to select?"
          placeholder="Select an option"
          options={options}
        />

        <SelectInput
          label="Select with on change callback"
          placeholder="Select an option"
          options={options}
          onChange={this.handleChangeValue}
        />

        <SelectInput
          label="Loading select"
          loading={true}
          options={options}
        />

        <SelectInput
          label="Disabled select"
          disabled={true}
          options={options}
        />

        <SelectInput
          label="Select with different style"
          options={options}
          labelStyle={styles.differentSelectLabel}
          valueStyle={styles.differentSelectValue}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  innerContainer: {
    flex: 1,
  },
  text: {
    color: '#FFFFFF',
  },
  differentSelectLabel: {
    fontSize: 16,
    color: 'blue',
  },
  differentSelectValue: {
    fontSize: 18,
    color: '#000000',
  },
});

export default App;
