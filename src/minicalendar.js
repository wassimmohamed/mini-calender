import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    View, 
    ScrollView, 
    Text, 
    Dimensions, 
    TouchableOpacity 
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default class MiniCalendar extends Component {
    state = {
        selectedDateIndex: 0
    }

    static defaultProps = {
        numberOfDays: 10,
        selectedDateStyle: {
            backgroundColor: "#437F82"
        },
        backgroundStyle: { backgroundColor: "#2d266c" }
    }    
    onPressDate = (index, date) => {
        if (index != this.state.selectedDateIndex) {
            this.setState({ selectedDateIndex: index });
        }
        this.props.onDateSelection(date);
    }
    renderDateBlock = (datesArray) => {
        return datesArray.map((date, index) => {
            const _date = date.getDate();
            const _month = date.getMonth() + 1;
            const _dayIndex = date.getDay();
            
            const today = new Date();
            let _day;
            if (_date == today.getDate() && _month == today.getMonth() + 1 && date.getFullYear() == today.getFullYear()) {
                _day = "TODAY";
            }
            else {
                _day = DAYS[_dayIndex];
            }
            if (this.state.selectedDateIndex == index) {
                return (
                    <TouchableOpacity key={index} style={[styles.dateBlock, this.props.selectedDateStyle]} onPress={() => { this.onPressDate(index, date) }}>
                        <Text style={[styles.textElem, styles.textDate]}>{`${_date}/${_month}`}</Text>
                        <Text style={[styles.textElem, styles.textDay]}>{_day}</Text>
                    </TouchableOpacity>
                );
            }
            else {
                return (
                    <TouchableOpacity key={index} style={[styles.dateBlock, this.props.backgroundStyle]} onPress={() => { this.onPressDate(index, date) }}>
                        <Text style={[styles.textElem, styles.textDate]}>{`${_date}/${_month}`}</Text>
                        <Text style={[styles.textElem, styles.textDay]}>{_day}</Text>
                    </TouchableOpacity>
                );
            }
        });
    }
    renderDates = () => {
        let dates = [new Date()];
        for (var index = 1; index < this.props.numberOfDays; index++) {
            let date = new Date();
            date.setDate(date.getDate() + index);
            dates.push(date);
        }
        return this.renderDateBlock(dates);
    }
    render() {
        return (
            <View style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {this.renderDates()}
                </ScrollView>
            </View>
        );
    }
}

MiniCalendar.PropTypes = {
    onDateSelection: PropTypes.func.isRequired

}
const styles = {
    dateBlock: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 8,
        paddingBottom: 8,
        width: 50
    },
    textElem: {
        color: 'white',
        fontWeight: 'bold'
    },
    textDay: {
        fontSize: 10
    },
    textDate: {        
        paddingBottom: 4
    }
}