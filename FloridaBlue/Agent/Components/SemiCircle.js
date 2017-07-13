// @flow
'use strict'

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ART,
  LayoutAnimation,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'

const {
  Surface,
  Group,
  Rectangle,
  Shape
} = ART

import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import * as d3Array from 'd3-array'
import AnimShape from './AnimShape'

const d3 = {
  scale,
  shape
}

import {
    scaleBand,
    scaleLinear
} from 'd3-scale'

type Props = {
  height: number,
  width: number,
  pieWidth: number,
  pieHeight: number,
  barWidth: number,
  barBottomColor: any,
  barTopColor: any,
  percent: number
};

type State = {
  highlightedIndex: number,
};

class SemiCircle extends React.Component {
  state: State;

  constructor (props: Props) {
    super(props)
    this.state = { highlightedIndex: 0 }
    this._createSemiCircleChart = this._createSemiCircleChart.bind(this)
  }

  _createSemiCircleChart (barWidth, percent) {
    // percent *= .01

    if (percent === 1) {
      percent = 0
    } else if (isNaN(percent) || percent == null) {
      percent = 0
    } else {
      // take the reciprocal to show properly on the graph
      percent = 1 - percent
    }

    // var startAngle = (Math.PI / 2) * -1
   //  var endAngle = (Math.PI / 2) * (percent * .01)
    console.tron.log('percent', percent)
    var startAngle = 0
    var endAngle = Math.PI * 2 - (Math.PI * 2 * percent)

    var arc = d3.shape.arc()
      .innerRadius(this.props.height / 2 * 0.75)
      .outerRadius(this.props.width / 2)
      .startAngle(startAngle)
      .endAngle(endAngle)
    var path = arc()

    return {
      path
    }
  }

  render () {
   // const margin = styles.container.margin
    const x = this.props.width / 2
    const y = this.props.height / 2

    return (

      <Surface width={this.props.width} height={this.props.height} >
        <Group x={x} y={y}>
          <AnimShape
            color={this.props.barBottomColor}
            d={() => this._createSemiCircleChart(this.props.barWidth, 1)}
            />
          <AnimShape
            color={this.props.barTopColor}
            d={() => this._createSemiCircleChart(this.props.barWidth, this.props.percent)}
            />
        </Group>
      </Surface>

    )
  }
}

const styles = {
  container: {
    margin: 50,
    backgroundColor: 'red'
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'normal'
  }
}

export default SemiCircle
