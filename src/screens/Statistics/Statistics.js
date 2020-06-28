/**
 * This source code is the confidential, proprietary information of
 * GoDevelop, you may not disclose such information,
 * and may only use it in accordance with the terms of the license
 * agreement you entered into with GoDevelop.
 *
 * GoDevelop.
 * All Rights Reserved.
 */

//liraries
import React, { Component } from 'react';
import {
   View,
   StyleSheet,
   SafeAreaView,
   ScrollView,
   Dimensions,
} from 'react-native';
import { VictoryPie } from 'victory-native';

// Connect Redux
import { connect } from 'react-redux';

// Redux Actions
import { fetchData } from './actions';

//Components
import Loading from '../../components/Loading/Loading';

//Utilities
import { theme } from '../../core/theme';
import { cardStatistics } from '../../core/utils';

const { height } = Dimensions.get('window');

class Statistics extends Component {
   componentDidMount() {
      this.props.getStatistics();
   }

   render() {
      const { loading, data } = this.props;

      const datos = data
         ? data.map((items, index) => {
              const assets = [
                 {
                    icon: 'home-account',
                    color: 'orange',
                 },
                 {
                    icon: 'account-heart',
                    color: 'gold',
                 },
                 {
                    icon: 'home-plus',
                    color: '#FF4E02',
                 },
                 {
                    icon: 'account-remove',
                    color: '#7D4E9E',
                 },
                 {
                    icon: 'home-plus',
                    color: 'red',
                 },
              ];

              return {
                 key: index,
                 x: 3,
                 y: items.total,
                 label: items.type,
                 icon: assets[index].icon,
                 color: assets[index].color,
              };
           })
         : [];

      return (
         <SafeAreaView style={styles.container}>
            {loading ? (
               <Loading />
            ) : (
               <ScrollView>
                  <View>
                     <VictoryPie
                        height={height / 2.5}
                        padAngle={({ datum }) => datum.x}
                        innerRadius={150}
                        origin={{ y: 180 }}
                        padding={80}
                        data={datos}
                        colorScale={datos.map((item) => item.color)}
                        labelRadius={({ innerRadius }) => innerRadius - 115}
                     />
                     <View style={{ padding: 16 }}>
                        {datos.map((item, index) => cardStatistics(item, index))}
                     </View>
                  </View>
               </ScrollView>
            )}
         </SafeAreaView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.colors.grey,
      padding: 16,
   },
});

const mapStateToProps = (state) => {
   const { loading, data, error } = state.statistics;
   return { data, loading, error };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getStatistics: () => {
         return dispatch(fetchData());
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
