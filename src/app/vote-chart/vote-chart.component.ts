import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

declare var Ably: any;
let vote_count: number[] = [0,0,0,0,0,0,0,0,0,0,0];
var hm=new Object({0: "Prabhas", 1: "Mahesh", 2: "PK", 3: "NTR",4:"AlluArjun",5:"Devarakonda",6:"Bellamkonda",7:"RamCharan",8:"Varuntej",9:"NagaChaitanya",10:"Nani"});
@Component({
  selector: 'app-vote-chart',
  templateUrl: './vote-chart.component.html',
  styleUrls: ['./vote-chart.component.css']
})
export class VoteChartComponent implements OnInit {

  // Attributes
  ably : any
  receiveChannel : any
  chart = []
	ngOnInit() {
        this.ably = new Ably.Realtime('9iS9Cg.Ikvm1w:qla3aRaBGevy2wx8');
        //Attach to channel
		    this.receiveChannel = this.ably.channels.get('vote-channel')
		    // Ably Subscription
		    this.receiveChannel.subscribe("update", function(message: any) {
            vote_count[message.data.vote]+=message.data.votes;
            const max = Math.max(...vote_count);
            const res = [];
            vote_count.forEach((item, index) => item === max ? res.push(index): null);
            console.log(res);
            const leadstar=[];
            res.forEach(element => {
                leadstar.push(hm[element]);
            });
            console.log(leadstar);
            this.chart= new Chart('canvas', {
                type: 'bar',
                data: {
                    labels: ["Prabhas", "Mahesh", "PK","NTR","AlluArjun","Deverakonda","Bellamkonda","Ramcharan","VarunTej","NagaChaitanya","Nani"],
                    datasets: [{
                        label: leadstar,
                        data: vote_count,
                        backgroundColor: [
                            'rgb(0, 0, 0)',
                            'rgb(0, 51, 102)',
                            'rgb(204, 41, 0)',
                            'rgb(255, 255, 0)',
                            'rgb(51, 204, 51)',
                            'rgb(102, 0, 51)',
                            'rgb(0, 0, 102)',
                            'rgb(255, 51, 0)',
                            'rgb(128, 0, 64)',
                            'rgb(0, 204, 255)',
                            'rgb(128, 0, 0)',
                            'rgb(230, 0, 230)',    
                                                
                        ],
                        borderColor: [
                            'rgb(0,0,0)',
                            'rgb(0,0,0)',
                            'rgb(0,0,0)',
                            'rgb(0,0,0)',
                            'rgb(0,0,0)',
                            'rgb(0,0,0)',
                            'rgb(0,0,0)',
                            'rgb(0,0,0)',
                            'rgb(0,0,0)',
                            'rgb(0,0,0)',
                            'rgb(0,0,0)'
                        ],
                        borderWidth: 1,
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: "red",
                            fontSize: 24,
                            fontStyle:"bold",
                            boxWidth:0,
                            fontFamily:"Times New Roman"
                        }
                    },
                    animation: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }.bind(this));
        Chart.defaults.global.defaultFontColor = 'black';
        Chart.defaults.global.defaultFontSize =12;
        Chart.defaults.global.defaultFontStyle="bold";
        Chart.defaults.global.defaultFontFamily='Arial Black';

    } 
}
