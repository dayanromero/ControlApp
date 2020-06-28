/**
 * This source code is the confidential, proprietary information of
 * GoDevelop, you may not disclose such information,
 * and may only use it in accordance with the terms of the license
 * agreement you entered into with GoDevelop.
 *
 * GoDevelop.
 * All Rights Reserved.
 */

// Dependencies
import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   SafeAreaView,
   FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Connect Redux
import { connect } from 'react-redux';

//Actions Redux
import { fetchDataLocations } from '../../store/actions/index';

//Components
import BottomButtons from '../../components/Button/BottomButtons';
import { Card } from 'react-native-paper';
import Loading from '../../components/Loading/Loading';

//Utilities
import { theme } from '../../core/theme';

class ZoneScreen extends Component {
   componentDidMount() {
      this.props.getLocations();
   }

   Cards = (item) => {
      return (
         <Card style={styles.card}>
            <Card.Content>
               <View>
                  <Text style={styles.textL}>{item.name}</Text>
                  <Text style={styles.texts}>{item.address}</Text>
                  <Text style={{ fontWeight: 'bold' }}>{item.city}</Text>
               </View>
            </Card.Content>
         </Card>
      );
   };

   render() {
      const { data, loading } = this.props;
      return (
         <SafeAreaView style={styles.container}>
            <View style={styles.view}>
               <Icon name="map-marker" style={styles.icon} />
               <Text style={styles.text}>Puestos de control registrados.</Text>
            </View>
            {loading ? (
               <Loading />
            ) : (
               <FlatList
                  style={styles.view}
                  data={data}
                  renderItem={({ item }) => this.Cards(item)}
                  keyExtractor={(item, index) => index.toString()}
               />
            )}
         </SafeAreaView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.colors.grey,
   },
   view: {
      padding: 16,
   },
   textsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   icon: {
      textAlign: 'center',
      fontSize: 60,
      color: theme.colors.secondary,
      margin: 5,
   },
   iconEdit: {
      textAlign: 'center',
      fontSize: 30,
      color: theme.colors.secondary,
      margin: 5,
   },
   text: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 10,
   },
   texts: {
      paddingTop: 5,
      paddingBottom: 8,
      fontSize: 14,
   },
   textL: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
      paddingTop: 5,
      paddingBottom: 8,
   },
   card: {
      marginBottom: 8,
   },
});

const mapStateToProps = (state) => {
   const { data, loading } = state.location;
   return { data, loading };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getLocations: () => {
         return dispatch(fetchDataLocations());
      },
   };
};
export default connect(mapStateToProps, mapDispatchToProps)(ZoneScreen);
