import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MiniCalendar from './src/minicalendar';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MiniCalendar                    
          onDateSelection ={(date)=>{console.log(date.toDateString())}}/>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
    marginTop:50,
  },
});
