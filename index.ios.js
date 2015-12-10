/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict()';

var React = require('react-native');
var {AppRegistry, StyleSheet, Image, StyleSheet, Text, View, ListView} = React;

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

// var MOCKED_MOVIES_DATA = [
//   {
//     title: 'Title',
//     year: '2015',
//     posters : {
//       thumbnail: 'http://i.imgur.com/U'
//     }
//   }
// ];

var app = React.createClass({
  //checking if movie json is their.
  // getInitialState: function() {
  //   return {movies: null};
  // },

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        // !== a function checking if row1 and row2 are equal value or equal value type.
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },
  //fetchData to function to get data from REQUEST_URL
  fetchData: function() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        //data about what is being recived
        dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
        loaded: true
      });
    }).done();
  },

  render: function() {
    if (!this.state.loaded) {return this.renderLoadingView();}

    return (
      <ListView dataSource={this.state.dataSource} renderRow={this.renderMovie} style={styles.listView}/>
    );
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading Movies...
        </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image style={styles.thumbnail} source={{
        uri: movie. posters. thumbnail
        }}/>

        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
});
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  // learn more about flex box here: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  year: {
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('app', () => app);
