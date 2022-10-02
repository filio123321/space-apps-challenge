import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image, FlatList, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import Document from './components/Document';



export default function App() {

  const [current, setCurrent] = useState('Home');
  const [search, setSearch] = useState('');
  const [requests, setRequests] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [iconShow, setIconShow] = useState(true);
  const factful = require('factful.js')
  const facts = factful.fact()



  const HomePage = (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}/>

      <View style={styles.titleWrapper}>
        <Text style={styles.title}>MARS-O</Text>
      </View>

      <View style={styles.searchWrapper}>
        <TouchableOpacity onPress={ () => setCurrent('Search')}>
          <Image source={require('./assets/searchIcon.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.QuizWrapper}>
        <TouchableOpacity onPress={ () => setCurrent('Quiz')}>
          <Image source={require('./assets/DailyQuizIcon.png')}/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.FactWrapper}>
        <TouchableOpacity onPress={ () => setCurrent('Fact')}>
          <Image source={require('./assets/DailyFactIcon.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.aboutWrapper}>
        <Text style={styles.about}>About MARS-O</Text>
      </View>

    </View>
  );

  

  function loadDocumenst(event) {
    // get onSubmitEditing value from search bar
    setSearch(event.nativeEvent.text);
  }

  useEffect(() => {
    if (search.length > 0) {
      setIconShow(false);
      setLoading(true);
      fetch(`http://192.168.1.10:5000/?search=${encodeURIComponent(search)}`)
        .then((response) => response.json())
        .then((json) => setRequests(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
    if (search.length == 0 || search == null || search == undefined || search == '' || search == ' ') {
      setIconShow(true);
      setRequests([]);
    }else{
      setIconShow(false);
    }
    
      
  }, [search]);
  
  // console.log('dasdas');


  const SearchPage = (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}/>

      <View style={styles.textSearchWrapper}>

        <TouchableOpacity style={styles.backIcon} onPress={ () => setCurrent('Home')}>
          <Image source={require('./assets/BackIcon.png')}/>
        </TouchableOpacity>


        <View style={{flex: 1, alignItems: 'center', bottom: 20}}>
          <TextInput onSubmitEditing={loadDocumenst} style={styles.textSearch} placeholder="Search"/>
        </View>
        

      </View>

      <View style={styles.searchSection}>

          {iconShow ? <Image style={styles.nothingHere} source={require('./assets/NothingHereIcon.png')}/> : null}
          {isLoading ? <Image style={styles.nothingHere} source={require('./assets/NothingHereIcon.png')}/> : (
          (
            <FlatList
              data={requests}
              keyExtractor={({ id }, index) => index.toString()}  
              renderItem={({ item }) => (
                <Document similarity={item.ratio} link={item.link} front={item.badFront} back={item.badBack}/>
              )}
            />))}
          
      </View>

    </View>
  );

  const QuizPage = (
    <View style={styles.container}>
    </View>
  );

  function getRandomSpaceFact() {
    console.log(facts).space;
  }

  const FactPage = (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}/>
      <View style={styles.titleWrapperFact}>
        <Text style={styles.title}>Daily Fact</Text>
      </View>
      
      <View style={styles.factWrapper}>
        <Image style={styles.factImage} source={{uri: factful.nasa()}}/>

        
        <Text style={styles.factText}>{facts.space}</Text>
        

        <TouchableOpacity style={styles.backIconFact} onPress={ () => setCurrent('Home')}>
          <Image source={require('./assets/BackIcon.png')}/>
        </TouchableOpacity>
      </View>
    </View>
  );

  return current === 'Home' ? HomePage : current === 'Search' ? SearchPage : current === 'Quiz' ? QuizPage : FactPage;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242038',
  },
  safeArea: {
    flex: 0,
    backgroundColor: '#242038',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  titleWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 60,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  searchWrapper: {
    left:"18%",
    top:"5%"
  },
  QuizWrapper: {
    left:"50%",
    top:"4%"
  },
  FactWrapper: {
    left:"25%",
    top:"5%"
  },
  aboutWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
    
  },
  about: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    borderColor: '#8B8092',
    borderRadius: 20,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 20,
    backgroundColor: '#8B8092',
    overflow: 'hidden'
  },
  backIcon: {
    position: 'absolute',
    paddingTop: 10,
    paddingLeft: 25,
  },
  textSearchWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,

  },
  textSearch: {

    height: 40,
    borderColor: '#8B8092',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 90,
    backgroundColor: '#8B8092',
    overflow: 'hidden',
    maxWidth: '70%',
  },
  searchSection: {
    paddingTop: 20,
    width: '100%',
  },
  nothingHere: {
    
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom : 200,
  },
  factText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    borderColor: '#8B8092',
    borderRadius: 20,
    borderWidth: 1,
    padding: 8,
    paddingHorizontal: 20,
    backgroundColor: '#8B8092',
    overflow: 'hidden',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    marginHorizontal: 20,
    width: '95%',
  },
  factImage: {
    width: '50%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    borderRadius: 20,
  },
  backIconFact: {},
  factWrapper: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  titleWrapperFact: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  factTextWrapper: {
    
  },
  




});
