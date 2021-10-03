import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import db from './config'

export default class App extends Component {
constructor(){
  super()
  this.state={
    teamsRank:[],
  }      
}
showTeamRanks=()=>{
  var teams=[]
  var teamRef=db.ref('teams/');
  teamRef.on("value",(data)=>{
    var teamList=data.val()
    console.log(teamList)
    for(var team in teamList){
    if(teamList[team]['isButtonPressed']===true){
      teamList[team]['teamName']=team
teams.push(teamList[team])
    }
    }
    teams.sort(function(team1,team2){
      return team1.timestamp-team2.timestamp
    })
    this.setState({teamsRank:teams})
    teams = []
  })
}
componentDidMount(){
  this.showTeamRanks()
}
resetdb =()=> {
  var resetdatabase = db.ref("teams/").set({
    red:{
      isButtonPressed:false,
      timestamp:0,
      enabled:true,
    },
    green:{
      isButtonPressed:false,
      timestamp:0,
      enabled:true,
    },
    blue:{
      isButtonPressed:false,
      timestamp:0,
      enabled:true,
    },
    yellow:{
      isButtonPressed:false,
      timestamp:0,
      enabled:true,
    }
  })
  this.setState({
    teamsRank:[]
  })
}
  render() {
    return (
      <View style={{flex:1}}>
      <View
     
      >
      <Button title="Reset" style = {{width:100,height:100}} onPress={this.resetdb}></Button>
{this.state.teamsRank.map((team)=>(
  <View
    style={{
                width: 325,
                height: 55,
                borderWidth: 2,
                margin: 5,
                marginTop:50,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: team.teamName,
              }}>
  <Text style = {{fontSize:24, color:"white"}}>{team.teamName.toUpperCase()}</Text>
</View>
))}
      </View>
      </View>
    );
  }
}
