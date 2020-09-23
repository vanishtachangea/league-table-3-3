import Service from '@ember/service';
import {inject} from '@ember/service';
import {later} from '@ember/runloop';
import {shuffle} from 'ember-composable-helpers/helpers/shuffle';

export default Service.extend({
    store: inject(),
    init(){
        this._super(...arguments);
        console.log('game simulator');
        this.seedTeams();
        later(this, this.simulateGame, 1000);
    }, 
    seedTeams(){
        let teams =[ 'Team 1', 'Team 2 ',' TEam 3'];
        for(let i=0;i<teams.length;i++){
            this.store.createRecord('team',{name: teams[i]});
        }
    }, 
    simulateGame(){
        let teams = this.store.peekAll('team');
        let shuffledTeams = shuffle(teams);
        let homeTeam = shuffledTeams[0];
        let awayTeam = shuffledTeams[1];

        let homeGoals = this.randomScore(4);
        let awayGoals = this.randomScore(3);
        console.log(homeGoals, awayGoals);

    }, 
    randomScore(maximumGoals){
        return Math.round(Math.randome())*maximumGoals;
    }
});
