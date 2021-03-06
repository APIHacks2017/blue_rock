$chennai_api_bus_routenumbers = "http://52.36.211.72:5555/gateway/Chennai/v1/bus/routenumbers";
$chennai_api_train_routes = "http://52.36.211.72:5555/gateway/Chennai/v1/train/time";
$zomato_locations = "http://52.36.211.72:5555/gateway/Zomato/1.0/locations";
$zomato_geo_code = "http://52.36.211.72:5555/gateway/Zomato/1.0/geocode";
$flights = "http://52.36.211.72:5555/gateway/Flights%20API/1.0/data/routes.json";
$airlines = "http://52.36.211.72:5555/gateway/Flights%20API/1.0/data/airlines.json";

$cities = {
"ahmedabad" : "AMD",
"bengaluru" : "BLR",
"chandigarh" : "IXC",
"chennai" : "MAA",
"coimbatore" : "CJB",
"delhi" : "DEL",
"hyderabad" : "HYD",
"jaipur" : "JAI",
"kochi" : "COK",
"kolkata" : "CCU",
"mumbai" : "BOM",
"patna" : "PAT",
"pune" : "PNQ",
"port Blair" : "IXZ",
"surat" : "STV",
"srinagar" : "SXR",
"thiruvananthapuram" : "TRV",
"tirupathi" : "TIR",
"varanasi" : "VNS",
"vishakapatnam" : "VTZ"
};

$("document").ready(function(){
    
  $("#chennai_api_route").click(function(e){
    e.preventDefault();
     $(".flights-body").html("");
     $(".restaurants-body").html("");
    $("#loader").show();
    $(".display-info-right").show();
    $(".info-div").hide();
    var planes = [];
    var fmap = {};

    $src= "https://www.google.com/maps/embed/v1/directions?origin="+$("#source").val()+"&destination="+$("#destination").val()+"&key=AIzaSyCNUQ6YZcl0SvWS0_j1vE94_s5MXwhHY3o";
    $("#google-map").attr("src", $src);

    setInterval(function(){                        
      $("#loader").hide();  
       $(".display-info-right").show();
       $(".info-div").show(); }, 3000);

    //Bus
    $.ajax({ 
      type: 'GET',
      headers: {"x-Gateway-APIKey": "5f01d036-32c5-4e14-adbd-ac140a6be03f", "Access-Control-Allow-Origin": 'http://localhost'},
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      url: $chennai_api_bus_routenumbers + "?source="+$("#source").val()+"&destination="+$("#destination").val(),          
      success: function (data) {
      
          if(data == ''){
            $("#bus_route").html("No bus available");
          } else {
              $(data).each(function(i, item){ 
                  $("#bus_route").html(item.route_Num);
              })
          }
        },
      error: function (data) {  
          $("#loader").hide(); 
          $(".info-div").show(); 
          $(".display-info-right").show();
          $("#bus_route").html("No bus available");
        },
      });

    //Train
    $.ajax({ 
      type: 'GET',
      headers: {"x-Gateway-APIKey": "5f01d036-32c5-4e14-adbd-ac140a6be03f", "Access-Control-Allow-Origin": 'http://localhost'},
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      url: $chennai_api_train_routes + "?source="+$("#source").val()+"&destination="+$("#destination").val(),          
      success: function (data) {
          if(data == ''){
            $("#train_time_route").html("No train available");            
          } else {
              $(data).each(function(i, item){     
                  $train = item.time +", "+item.type;                  
                  $("#train_time_route").html( $train);
              })
          }
        },
      error: function (data) {  
          $("#train_route").html("No train available");
        },
      });

    //Zomato location
    $.ajax({ 
      type: 'GET',
      headers: {"x-Gateway-APIKey": "e127e49c-ef9d-48ba-a8bc-7e815bdc5e3b", "Access-Control-Allow-Origin": 'http://localhost'},
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      url: $zomato_locations + "?&query="+$("#destination").val(),          
      success: function (data) {       
          $(data.location_suggestions).each(function(i, item){              
              $latitude = item.latitude;
              $longitude = item.longitude;
          });

              //Zomato zeo code
                $.ajax({ 
                  type: 'GET',
                  headers: {"x-Gateway-APIKey": "e127e49c-ef9d-48ba-a8bc-7e815bdc5e3b", "Access-Control-Allow-Origin": 'http://localhost'},
                  'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                  url: $zomato_geo_code + "?&lat="+$latitude+"&lon="+$longitude,          
                  success: function (data) { 
                    $content = "";      
                      $(data.nearby_restaurants).each(function(i, item){              
                         if(item.restaurant.featured_image != ''){
                            $content += "<div class='row-info-panel row'><div class='col-xs-2 nopadding'><img src="+item.restaurant.featured_image+" style='width:100px;height:100px'></div>";
                            $content += "<div class='col-xs-10 nopadding'><a target='_blank' href="+item.restaurant.events_url+">"+item.restaurant.name+"</a></br>";
                            $content += "<div>"+item.restaurant.location.address+"</div></div></div>";
                         }  
                      });
                      $(".restaurants-body").html($content);

                    },
                  error: function (data) {            
                      $("#train_route").html("No restaurant");
                    },
                });

        },
      error: function (data) {            
          $("#train_route").html("No train available");
        },
    });    


    //Flights location
    $.ajax({ 
      type: 'GET',
      headers: {"x-Gateway-APIKey": "d0536187-7ac8-4a2e-a3d2-52033ceaa077", "Access-Control-Allow-Origin": 'http://localhost'},
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
      url: $flights,          
      success: function (data) {  
        $fightSource = "";
        $fightDes = "";
          $(data).each(function(i, item){              
              $depart = item.departure_airport_iata;
              $arrival = item.arrival_airport_iata;
                var $fightSource = $cities[$("#source").val().toLowerCase().trim()];
                var $fightDes = $cities[$("#destination").val().toLowerCase().trim()];
                
                if($fightSource !="" &&  $fightDes != "")
                {
                  //console.log($fightSource + ""+$fightDes + "" +$depart + "" +$arrival);
                    if($depart ==  $fightSource && $arrival == $fightDes){

                    var fl = item.airline_iata;
                    var fno = [];
                     planes.push(fl);
                    $(item.planes).each(function(i, plane){                    
                      //planes.push(fl+'-'+plane);
                        fno.push(plane);
                    });
                    fmap[fl] = fno;
                  }
                }
          });
          //console.log(planes);
          if(planes != "")
          {
              $.ajax({ 
                  type: 'GET',
                  headers: {"x-Gateway-APIKey": "d0536187-7ac8-4a2e-a3d2-52033ceaa077", "Access-Control-Allow-Origin": 'http://localhost'},
                  'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
                  url: $airlines,          
                  success: function (data) {  
                      $content = "";     
                      $(data).each(function(i, item){   
                        if ($.inArray(item.iata, planes) != -1)
                        {
                            $content += "<div class='row-info-panel row'>";
                            $content += "<div class='col-xs-12 nopadding'><a target='_blank' href="+item.name+">"+item.name+"</a></br>";
                            $content += "<div>"+"Flights: " +fmap[item.iata] +"</br>";
                            $content += "</div></div></div>";
                         } 
                                  
                      });
                      $(".flights-body").html($content);
                    },
                });
           }
           
          }
    });  

  });
});