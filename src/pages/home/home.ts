import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
declare var google:any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapRef: ElementRef;
  map:any;

  constructor(public navCtrl: NavController,public geolocation:Geolocation,private platform:Platform) {}

  ionViewDidLoad(){
    this.getLocation();
  }
  getLocation(){
    this.platform.ready().then(()=>{

      //set options.. 
      var options = {
                 timeout: 20000 //sorry I use this much milliseconds
             }
      //use the geolocation 
      this.geolocation.getCurrentPosition(options).then(data=>{
      var location = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
        this.showMap(location);
       }).catch((err)=>{
      
        console.log(err.code+" "+err.message)
        alert(err.code+" "+err.message)      
         });
      });
      }
        
showMap(location:number){
  const options={
    center:location,
    disableDefaultUI:true,
    zoom:15
  }

  this.map = new google.maps.Map(this.mapRef.nativeElement,options);
  var marker = new google.maps.Marker({position: location});

  marker.setMap(this.map);
}
}
