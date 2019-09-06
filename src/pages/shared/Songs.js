import React, {Component} from 'react';
import {IconButton, withTheme, Title, Button} from 'react-native-paper';
import {StyleSheet, View, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {addToQueue} from '../../actions/playerState';
import SwipeListContainer from '../../containers/SwipeListContainer';

class Songs extends Component {
  static navigationOptions = ({navigation}) => {
    // header: null
    return {
      headerTitle: navigation.getParam('title'),
      headerRight: (
        <IconButton
          icon="play-circle-outline"
          onPress={navigation.getParam('addToQueue')}
        />
      ),
    };
  };

  addToQueue = () => {
    this.props.addToQueue(this.props.navigation.getParam('songs'));
  };

  componentDidMount() {
    this.props.navigation.setParams({addToQueue: this.addToQueue});
  }

  render() {
    const {navigation} = this.props;

    const songs = navigation.getParam('songs', []);
    const albumImage = navigation.getParam(
      'img',
      'https://source.unsplash.com/collection/4799534/120x120',
    );
    const title = navigation.getParam('title', 'No Title');

    const {colors} = this.props.theme;

    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <ScrollView>
          <View style={styles.scrollViewContent}>
            <View style={styles.coverContainer}>
              {/* <Card.Cover source={{ uri: albumImage }} style={{ width: 250, height: 250, borderRadius: 4 }} /> */}
              <FastImage source={{uri: albumImage}} style={styles.artCover} />
              {/* <Headline style={styles.title}>{title}</Headline> */}
            </View>
            <View style={styles.titleContainer}>
              <Title>{title}</Title>
            </View>
            {isEmpty(songs) ? (
              <Title>No songs</Title>
            ) : (
              <View style={styles.buttonContainer}>
                {/* <Button icon="get-app" mode="contained" onPress={() => console.log('Pressed')}>
                                Download
                            </Button> */}
                <Button mode="contained" onPress={this.props.addToQueue}>
                  Play All
                </Button>
              </View>
            )}

            <SwipeListContainer data={songs} />
            <View style={{height: 100}} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(
  null,
  {addToQueue},
)(withTheme(Songs));

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    marginTop: 10,
  },
  coverContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  artCover: {width: 200, height: 200, backgroundColor: '#f7b71d'},
  titleContainer: {alignItems: 'center', justifyContent: 'center', margin: 10},
});
