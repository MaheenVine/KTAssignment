
var artist_name;
function getInputValue(){
    return document.getElementById("Input").value;
}

function search(){  //on button press, get user entered artist name and passed it to API
    artist_name=getInputValue();
    console.log(artist_name);
    document.getElementById("search").innerHTML="Your request has been recieved!";
    apiData(artist_name);// using the artist name to request the api
    }

function apiData(aname){// for getting artist profile data
    //having a variable for the repeatitive url makes it easy to deal with later
    var url='https://rest.bandsintown.com/artists/'+aname+'?app_id=17dc089b406235d98ae552702846df49';
    /*fetch is a new powerful web API that lets you make asynchronous requests.
     In fact, fetch is one of the smarter ways to make an HTTP request.*/
      fetch(url)
      .then(response => {
        return response.json()
      })
      // showing the data on browser console to ensure correct result is being fetched
      .then(data => {
        console.log(data);
        var name=data.name, picture=data.image_url, fb_url=data.facebook_page_url,
        event_count=data.upcoming_event_count;
        artist_Details(name,picture,fb_url,event_count);
      })
  }

  function deleteChild(){ 
    var e = document.getElementById("showEvents"); 
    var child = e.lastElementChild;  
    while (child) { 
        e.removeChild(child); 
        child = e.lastElementChild; 
    } }

  function apiEvents(aname,string){//getting the events data
    if (string=='upcoming'){// getting the upcoming events
    console.log("upcoming events button clicked");
    deleteChild();
    // document.getElementById('showEvents').style.innerHTML="";
    var url='https://rest.bandsintown.com/artists/'+aname+'/events?app_id=17dc089b406235d98ae552702846df49&date=upcoming';
      fetch(url)
      .then(response => {
        return response.json()
      })
      .then(upcomingData => {
        console.log(upcomingData);
        console.log(upcomingData[0].venue.name); // array of objects
        console.log(upcomingData[0].venue.country);console.log(upcomingData[0].venue.city);console.log(upcomingData[0].datetime);
        artist_Events(upcomingData);
    })}

    else if (string=='past'){ //getting past events data
        console.log("past events button clicked");
    deleteChild();
        // document.getElementById('showEvents').style.innerHTML="";
        var url='https://rest.bandsintown.com/artists/'+aname+'/events?app_id=17dc089b406235d98ae552702846df49&date=past';
          fetch(url)
          .then(response => {
            return response.json()
          })
          .then(pastData => {
            console.log(pastData);
            console.log(pastData[0].venue.name); // array of objects
            console.log(pastData[0].venue.country);
            console.log(pastData[0].venue.city);console.log(pastData[0].datetime);
            artist_Events(pastData);
            
        })}
  }

  
  function artist_Details(name, pic,fb,ec){//for displaying the artist details in the DOM
      console.log(name)
      var card=document.getElementById("card");
      card.style.display="inline-block";
      //title
      var name1=document.getElementById('artistName');
      name1.innerText=name;
      //image
        var im=document.getElementById('profilePic');
        im.src=pic;
      // facebook url
        var f=document.getElementById('facebookUrl');
        f.href=fb;
      // upcoming event count
        var e=document.getElementById('upcomingEvents');
        e.innerHTML="Upcoming Events: "+ ec;  
      // upcoming event button
      if(ec>0){
      var uebutton=document.getElementById('upcomingeventButton');
      uebutton.style.display="inline-block";}
      //past event count
      var url='https://rest.bandsintown.com/artists/'+name+'/events?app_id=17dc089b406235d98ae552702846df49&date=past';
      fetch(url)
      .then(response => {
       return response.json()
     })
     .then(response => {
        var pe=document.getElementById('pastEvents');
        pe.innerHTML="Past Events: "+ response.length;  
    })
    // past event button
     var pebutton=document.getElementById('pasteventButton');
     pebutton.style.display="inline-block";

  }

  function artist_Events(data){///display the events
    console.log('in artist events');
    var venueName, countryName,cityName, d;
    for(i=0;i<data.length;i++){
        venueName=data[i].venue.name;
        countryName=data[i].venue.country;
        cityName=data[i].venue.city;
        d=data[i].datetime;

        document.getElementById('showEvents').style.display="inline-grid";
        var e=document.createElement('div');
        e.id="eventList";
        document.getElementById('showEvents').appendChild(e);
        e.innerHTML="Venue: "+ venueName+'| Country: '+countryName+' | City: '+cityName+' | Date: '+d;

  }}

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
