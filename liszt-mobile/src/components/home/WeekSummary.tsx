import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LineChart, YAxis, AreaChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import Colors from '../../styles/Colors';
import {useNavigation} from '@react-navigation/native';

const weekSummary: React.FC<{
  accuracy: number;
}> = ({accuracy}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#FFF',
        paddingHorizontal: 24,
      }}>
      <View>
        <Text style={{fontSize: 15, fontWeight: '500', marginBottom: 8}}>
          This week...
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <MCIcon name="fire" size={20} color={Colors.red} />
              <Text style={{paddingTop: 4, paddingLeft: 5}}>5 day streak!</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MCIcon name="trophy-variant" size={20} color={Colors.blue} />
              <Text style={{paddingTop: 4, paddingLeft: 5}}>10 completed!</Text>
            </View>
          </View>
          <View>
            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <MCIcon name="book-open" size={20} color={Colors.green} />
              <Text style={{paddingTop: 4, paddingLeft: 5}}>
                130 questions!
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MCIcon
                name="crosshairs-question"
                size={20}
                color={Colors.orange}
              />
              <Text style={{paddingTop: 4, paddingLeft: 5}}>100 accuracy!</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={{fontSize: 24, fontWeight: '500', marginTop: 10}}>
          Categories
        </Text>
      </View>
      <View style={{}}>
        <View style={layout.statBox}>
          <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20}}>Single Notes</Text>
              <Animated.View>
                <MCIcon name="chevron-right" size={20} color={Colors.black} />
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={layout.statBox}>
          <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20}}>Intervals</Text>
              <Animated.View>
                <MCIcon name="chevron-right" size={20} color={Colors.black} />
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={layout.statBox}>
          <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20}}>Chords</Text>
              <Animated.View>
                <MCIcon name="chevron-right" size={20} color={Colors.black} />
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
        {/*
        <View style={layout.statBox}>
          <LineChart
            bezier
            height={256}
            width={Dimensions.get('screen').width - 24 * 2 - 16}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June'],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                  strokeWidth: 2, // optional
                },
              ],
            }}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#08130D',
              backgroundGradientToOpacity: 0.0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5,
              useShadowColorFromDataset: false, // optional
            }}
          />
        </View>
        */}
        {/*
        <View style={{flexDirection: 'row'}}>
          <YAxis
            data={[90, 75, 83, 96, 84, 87, 90, 98]}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            contentInset={{top: 20, bottom: 20}}
            numberOfTicks={5}
          />
          <AreaChart
            style={{
              height: 200,
              marginLeft: 5,
              flex: 1,
            }}
            numberOfTicks={5}
            data={[90, 75, 83, 96, 84, 87, 90, 98]}
            curve={shape.curveNatural}
            contentInset={{top: 20, bottom: 20}}
            svg={{
              stroke: Colors.green,
              strokeWidth: 2,
              fill: 'rgba(100, 200, 100, 0.2)',
            }}>
            <Grid />
          </AreaChart>
        </View>
        */}
      </View>
    </View>
  );
};

const layout = StyleSheet.create({
  statBox: {
    padding: 8,
    borderRadius: 9,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    marginVertical: 10,
    // flexDirection: 'row',
  },
});

export default weekSummary;
