
import React,{useState} from 'react';
import { SafeAreaView, StyleSheet,Text,Image,View} from 'react-native';
import * as _ from 'lodash';
import HeaderComponent from './Header'
import * as Actions from '../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Header,Left,Body,Right} from 'native-base'


const Colors={white:'#ffffff',lighter:'#ffffff',black:'#000000',dark:'#000000'}

class cityWheaterDetails  extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            cityDetails:null,
            error:null
        }
    }

    componentDidMount(){
        console.log('cities',this.props.cities,this.props.navigation.state.params.cityName);
        if(this.props.cities.cityName!=this.props.navigation.state.params.cityName){
            this.props.actions.getCityDetails(this.props.navigation.state.params.cityName);
        }
    }
    goBack(){
       
        this.props.navigation.pop();
    }

    shouldComponentUpdate(nextProps, nextState){
       return true
    }
    static getDerivedStateFromProps(Props,state){
        if(Props.cities.error!=null){
            return {error:Props.cities.error}
        }else{
        if(state.cityDetails!==Props.cities.cityDetails){
            console.log(Props,state);
            return {cityDetails:Props.cities.cityDetails}
        }else{
            return false
        }
     }
    }

  render(){
      let data=this.props.cities.cityDetails
      let error= this.props.cities.error
    return (
    <SafeAreaView style={{justifyContent:'flex-start',height:'100%'}}>
         <HeaderComponent ComponentName='Details' back={true} goBackToPrevious={()=>{this.goBack()}} />
         
               
         {data&&error==null?
         <View style={{paddingHorizontal:10,paddingVertical:30}}>  
            <View style={{flex:1,flexDirection:'row',padding:20}}> 
                <Left style={styles.left}>
                    <Text>City Name:</Text>
                </Left >
                <Right style={styles.right}> 
                    <Text>{data.cityName}, {data.country}</Text>
                </Right>
            </View>
            <View style={styles.view}> 
                <Left style={styles.left}>
                    <Text>Sunrise:</Text>
                </Left >
                <Right style={styles.right}> 
                <Text>{ new Date(data.sunriseTime).toTimeString()}</Text>
                </Right>
            </View>
            <View style={styles.view}> 
                <Left style={styles.left}>
                    <Text>Sunset:</Text>
                </Left >
                <Right style={styles.right}> 
                <Text>{ new Date(data.sunsetTime).toTimeString()}</Text>
                </Right>
            </View>
            
            <Text style={styles.predictionText}>Wheather prediction</Text>
            <View style={styles.view}> 
                <Left style={styles.left}>
                    <Text>Description:</Text>
                </Left >
                <Right style={{ flex: 2,flexDirection:'row',alignItems:'center',padding:10,alignContent:'center'}}> 
                
                <Image  source={{uri: `http://openweathermap.org/img/w/${data.weatherIcon}.png`}} style={{width: 30, height: 30}}/>
               
                <Text >{data.weatherDes}</Text>
                </Right>
            </View>
            <View style={styles.view}> 
                <Left style={styles.left}>
                    <Text>Temprature:</Text>
                </Left >
                <Right style={{ flex: 2,flexDirection:'column',alignItems:'flex-start',top:20,padding:10,alignContent:'flex-end'}}> 
                <Text style={styles.tempPadding}> Normal:     {data.temp} &deg; C</Text>
                
                <Text style={styles.tempPadding}> Max temp: {data.temp_min} &deg; C</Text>
                <Text style={styles.tempPadding}> Min temp:  {data.temp_max} &deg; C</Text>
                </Right> 
            </View>
                {/* <Text>{data.weatherDes}</Text> */}
            </View> :error? <Text style={styles.DataNotFound}>{error.cod}   {error.message}</Text>:null}
            
        </SafeAreaView>
      )
    }
  
}

const styles = StyleSheet.create({
    left:{flex: 1,alignItems:'flex-start'},
    right:{ flex: 2,alignItems:'flex-start',padding:10},
    tempPadding:{paddingVertical:2},
    view:{flex:1,flexDirection:'row',padding:20},
    predictionText:{fontSize:18,padding:20,color:'#008080'},
    DataNotFound:{fontSize:18,padding:100,color:'red'}
 
});
const mapStateToProps = ({ cities }) => {
    return { cities:cities};
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(cityWheaterDetails);
