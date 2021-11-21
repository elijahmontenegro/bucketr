
import React, { Component, useState, useEffect, useRef } from 'react';
import { 
  Div,
  Button,
  Input,
  Text,
  Row,
  Col,
  Container,
  Icon
 } from 'atomize';

let oneDay = 60 * 60 * 24 * 1000;
let todayTimestamp = Date.now() - (Date.now() % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);
let inputRef = React.createRef();
let containerRef = React.createRef();
let expandRef = React.createRef();

export default class MyDatePicker extends Component {

    constructor() {
        super();
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        this.state = {
            showDatePicker: false,
            year,
            month,
            selectedDay: todayTimestamp,
            monthDetails: this.getMonthDetails(year, month)
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.addBackDrop);
        this.setDateToInput(this.state.selectedDay);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.addBackDrop);
    }

    addBackDrop =e=> {
      if(this.state.showDatePicker && !containerRef.current.contains(e.target) && !expandRef.current.contains(e.target) && !inputRef.current.contains(e.target)) {
        this.showDatePicker(!this.state.showDatePicker);
      }
    }

    showDatePicker = (show) => {
        this.setState(prevState => ({ showDatePicker: show || !prevState.showDatePicker }))
    }

    /**
     *  Core
     */

    daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    getDayDetails =args=> {
        let date = args.index - args.firstDay; 
        let day = args.index%7;
        let prevMonth = args.month-1;
        let prevYear = args.year;
        if(prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        let prevMonthNumberOfDays = this.getNumberOfDays(prevYear, prevMonth);
        let _date = (date < 0 ? prevMonthNumberOfDays+date : date % args.numberOfDays) + 1;
        let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        let timestamp = new Date(args.year, args.month, _date).getTime();
        return {
            date: _date,
            day,
            month, 
            timestamp,
            dayString: this.daysMap[day]
        }
    }

    getNumberOfDays =(year, month)=> {
        return 40 - new Date(year, month, 40).getDate();
    }

    getMonthDetails =(year, month)=> {
        let firstDay = (new Date(year, month)).getDay();
        let numberOfDays = this.getNumberOfDays(year, month);
        let monthArray = [];
        let rows = 6;
        let currentDay = null;
        let index = 0; 
        let cols = 7;

        for(let row=0; row<rows; row++) {
            for(let col=0; col<cols; col++) { 
                currentDay = this.getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month
                });
                monthArray.push(currentDay);
                index++;
            }
        }
        return monthArray;
    }

    isCurrentDay =day=> {
        return day.timestamp === todayTimestamp;
    }

    isSelectedDay =day=> {
        return day.timestamp === this.state.selectedDay;
    }

    getDateFromDateString =dateValue=> {
        let dateData = dateValue.split('-').map(d=>parseInt(d, 10));
        if(dateData.length < 3) 
            return null;

        let year = dateData[0];
        let month = dateData[1];
        let date = dateData[2];
        return {year, month, date};
    }

    getMonthStr =month=> this.monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

    getDateStringFromTimestamp =timestamp=> {
        let dateObject = new Date(timestamp);
        let month = dateObject.getMonth()+1;
        let date = dateObject.getDate();
        return dateObject.getFullYear() + '-' + (month < 10 ? '0'+month : month) + '-' + (date < 10 ? '0'+date : date);
    }

    setDate =dateData=> {
        let selectedDay = new Date(dateData.year, dateData.month-1, dateData.date).getTime();
        this.setState({ selectedDay })
        if(this.props.onChange) {
            this.props.onChange(selectedDay);
        }
    }

    updateDateFromInput =()=> {
        let dateValue = inputRef.current.value;
        let dateData = this.getDateFromDateString(dateValue);
        if(dateData !== null) { 
            this.setDate(dateData);
            this.setState({ 
                year: dateData.year, 
                month: dateData.month-1, 
                monthDetails: this.getMonthDetails(dateData.year, dateData.month-1)
            })
        }
    }

    setDateToInput =(timestamp)=> {
        let dateString = this.getDateStringFromTimestamp(timestamp);
        inputRef.current.value = dateString;
    }

    onDateClick =day=> {
        this.setState({selectedDay: day.timestamp}, ()=>this.setDateToInput(day.timestamp));
        if(this.props.onChange) {
            this.props.onChange(day.timestamp);
        }
        setTimeout(() => this.showDatePicker(false), 0);
    }

    setYear =offset=> {
        let year = this.state.year + offset;
        let month = this.state.month;
        this.setState({ 
            year,
            monthDetails: this.getMonthDetails(year, month)
        })
    }

    setMonth =offset=> {
        let year = this.state.year;
        let month = this.state.month + offset;
        if(month === -1) {
            month = 11;
            year--;
        } else if(month === 12) {
            month = 0;
            year++;
        }
        this.setState({ 
            year, 
            month,
            monthDetails: this.getMonthDetails(year, month)
        })
    }

    /**
     *  Renderers
     */

    
  renderCalendar = () => {
    return (
      <Row 
        d="flex" 
        textAlign="center"
        p="none" 
        align="center"
        justify="center" 
        w="100%" 
        m="none" 
        bg="black600" 
        rounded="md" 
        p={{ y: "0.5rem" }}
      >
        {this.daysMap.map((dayString, index) => {
          return (
            <Col key={index} p="none" m="none"> 
              {this.state.monthDetails.filter(day => day.dayString == dayString).map((day, index) => (
                <div key={index}>
                  {index == 0 && 
                    <Text 
                      m={{ b: "0.5rem" }} 
                      textColor="white" 
                      textWeight="500" 
                      textTransform="uppercase"
                      textSize="caption"
                      h="1.75rem"
                      textAlign="center"
                      align="center" 
                      justify="center"
                    >
                      {day.dayString.substr(0,1)}
                    </Text>
                  }
                  <Button
                    transition="none"
                    textAlign="center"
                    align="center"
                    w="1.75rem" h="1.75rem" p="none"
                    // rounded="circle"
                    cursor={day.month !== 0 ? "default" : "pointer"}
                    onClick={day.month == 0 ? (() => this.onDateClick(day)) : undefined}
                    bg={this.isCurrentDay(day) && day.month == 0  ? "black100" : this.isSelectedDay(day) && day.month == 0 ? "white" : "transparent"}
                    textColor={day.month !== 0 ? "grey" : this.isCurrentDay(day) ? "white" : this.isSelectedDay(day) ? "black" : "grey200"}
                    m={{ x: "auto", t: index !== 0 ? "0.5rem" : "" }}
                    hoverBg={!this.isSelectedDay(day) && day.month == 0 && "black200"}
                    textSize="body"
                  >
                    {day.date}
                  </Button>
                </div>
              ))}
            </Col>
          );
        })}
      </Row>
    );
  };

  render() {
    return (
      <>
        <Div
          d="flex"
          flexDir="column"
          align="center"
          justify="start"
          style={{ alignItems: "stretch" }}
        >
          <Input
            onChange={this.updateDateFromInput} ref={inputRef}
            d="flex"
            id="datePicker"
            type="date"
            rounded="md"
            h="2rem"
            textColor="dark"
            p={{ l: "1rem", r: "1rem" }}
            border="none"
            onClick={() => this.showDatePicker(true)}
            textTransform="uppercase"
            suffix={
              <Button
                ref={expandRef}
                d="flex"
                pos="absolute"
                w="2rem"
                h="2rem"
                top="0"
                right="0"
                rounded={{ r: "md" }}
                align="center"
                justify="center"
                textAlign="center"
                p={{ x: "0.5rem", r: "1rem" }}
                onClick={() => this.showDatePicker()}
                bg="transparent"
              >
                <Icon
                  name={this.state.showDatePicker ? "UpArrow" : "DownArrow"}
                  size="16px"
                  color="dark"
                  cursor="pointer"
                />
              </Button>
            }
          />
          {this.state.showDatePicker && (
            <Div
              ref={containerRef}
              pos="absolute"
              d="flex"
              flexDir="column"
              right={{ xs: "-1rem", sm: "-1rem0", md: "-1rem", lg: "-1rem", xl: "2rem", }}
              m={{ t: "2.25rem", l: "auto" }}
              p={{ x: "1rem", y: "1.25rem"}}
              w="22rem"
              rounded={"calc(1.75rem / 2)"}
              rounded="md"
              bg="black800"
              shadow="3"
              border="1px solid"
              borderColor="black500"
              zIndex="10"
            >
              <Div d="flex" flexDir="row" align="center" justify="space-between" m={{ b: "0.5rem" }}>
                <Div d="flex" flexDir="row">
                  <Text textSize="title" textColor="white" textWeight="500" children={this.getMonthStr(this.state.month)} m={{ r: "0.5rem" }} />
                  <Text textSize="title" textWeight="500" textColor="grey200" children={this.state.year} />
                </Div>
                <Div d="flex" flexDir="row">
                  <Button bg="transparent" hoverBg="black300" rounded="circle" p="none" h="2rem" w="2rem" transition="none" m={{ x: "0.5rem" }} 
                    prefix={<Icon name="LeftArrow" size="24px" color="light" />}
                    onClick={() => this.setMonth(-1)}
                  />
                  <Button bg="transparent" hoverBg="black300" rounded="circle" p="none" h="2rem" w="2rem" transition="none" m={{ x: "0.5rem" }} 
                    prefix={<Icon name="RightArrow" size="24px" color="light"/>}
                    onClick={() => this.setMonth(1)}
                  />
                </Div>
              </Div>
              <Div d="flex" bg="">
                {this.renderCalendar()}
              </Div>
            </Div>
          )}
        </Div>
      </>
    );
  }
}