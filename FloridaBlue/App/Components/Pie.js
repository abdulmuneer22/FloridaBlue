import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ART,
  LayoutAnimation,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

const {
  Surface,
  Group,
  Rectangle,
  Shape,
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import AnimShape from './AnimShape';
import { Colors, Metrics, Fonts, Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import Flb from '../Themes/FlbIcon'

const d3 = {
  scale,
  shape,
};

import {
    scaleBand,
    scaleLinear
} from 'd3-scale';

type Props = {
  height: number,
  width: number,
  pieWidth: number,
  pieHeight: number,
  colors: any,
  onItemSelected: any
};

type State = {
  highlightedIndex: number,
};

class Pie extends React.Component {

  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { highlightedIndex: 0 };
    this._createPieChart = this._createPieChart.bind(this);
    this._value = this._value.bind(this);
    this._label = this._label.bind(this);
    this._color = this._color.bind(this);
  }

  // methods used to tranform data into piechart:
  // TODO: Expose them as part of the interface
  _value(item) { return item.number; }

  _label(item) { return item.name; }

  _color(index) { return this.props.colors[index]; }

  _createPieChart(index) {

    var arcs = d3.shape.pie()
        .value(this._value)
        (this.props.data);

    var hightlightedArc = d3.shape.arc()
      .outerRadius(this.props.pieWidth/2 + 10)
      .padAngle(.05)
      .innerRadius(1);

    var arc = d3.shape.arc()
      .outerRadius(this.props.pieWidth/2)
      .padAngle(.02)
      .innerRadius(1);

    var arcData = arcs[index];
    //var path = (this.state.highlightedIndex == index) ? hightlightedArc(arcData) : arc(arcData);
    var path =  arc(arcData);

     return {
       path,
       color: this._color(index),
     };
  }

  render() {
    const x = this.props.pieWidth / 2 ;
    const y = this.props.pieHeight / 2 ;
    return (
      <View style={{flex:1}}>
        <View style={{flex:3, alignItems:'center', marginBottom:10}}> 
        <Surface width={this.props.width} height={this.props.height}>
           <Group x={x} y={y}>
           {
             this.props.data ?
              this.props.data.map( (item, index) =>
              (<AnimShape
                 key={'pie_shape_' + index}
                 color={this._color(index)} 
                 d={ () => this._createPieChart(index)}
              />)
              ) : null
            }
           </Group>
        </Surface>
        </View>
        <View style={{flex:3}}>
          {
            this.props.data ?
            this.props.data.map( (item, index) =>
            {
              return (
                  <View style={{flex: 1, flexDirection:'row', width :  Metrics.screenWidth * 0.80, alignItems:'center'}}>
                        <View style={{flex: 0.1}} >
                            <Icon name="stop" size={Metrics.icons.medium * Metrics.screenWidth * 0.0017} color={this._color(index)} backgroundColor={this._color(index)}/>
                        </View>
                        <View style={{flex: 0.6}} >
                            <Text style={[{color: 'grey', fontWeight: 'normal'}]}>{this._label(item)}: </Text>
                        </View>
                        <View style={{flex: 0.3,flexDirection:'row' }} >
                            <Text style={{color: 'grey', fontWeight: 'normal'}}> ${this._value(item).toFixed(2)} </Text>
                        </View>
                  </View>
              );
            }) : null
          }
          <View style={{flex:1.5, marginTop:Metrics.smallMargin*Metrics.screenHeight*0.0015}}>
            <View style={{flex:0.75,flexDirection:'row'}}>
                  <Icon name="stop" size={Metrics.icons.medium * Metrics.screenWidth * 0.0017}/>
                  <Text style={[{color: 'grey', fontWeight: 'normal', marginLeft:5}]}>Your Savings:  </Text>
            </View>
            <View style={{flex:0.75, marginLeft:20,marginTop:Metrics.smallMargin*Metrics.screenHeight*0.001, marginBottom:Metrics.smallMargin*Metrics.screenHeight*0.002}}>
               <Text style={[{color: 'grey', fontWeight: 'normal'}]}> Total Billed:  </Text>
            </View>
          </View>
        </View>
      </View> 
    );
  }
}

export default Pie;