<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<title>Trippz - API Hackaton - Software AG</title>
     <meta http-equiv="X-UA-Compatible" content="IE=8"></meta> 
		<meta name="generator" content="Bootply" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
     
		<!--[if lt IE 9]>
			<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<link href="assets/css/styles.css" rel="stylesheet">
	</head>
	<body>

<nav class="navbar navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <a class="navbar-brand" href="#"><img src="./assets/img/logo.png"></a>                
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>


<div class="row">
  <div class="container" id="main">
    <div class="row">
    	<div class="col-xs-12">
      
        <h2 class="page-title">Find Buses, Train, Restaurants and Direction</h2>
        
        <!-- item list -->
        <div class="box-contianer col-xs-4 left-box-contianer">
         <form id='chennai_api_form'>
            <div class="form-group">
              <label for="email">Source:</label>
              <input type="text" class="form-control" id="source" value="Chennai">
            </div>
            <div class="form-group">
              <label for="pwd">Destination:</label>
              <input type="text" class="form-control" id="destination" value="Delhi">
            </div>
            <button type="submit" class="btn btn-success" id='chennai_api_route'>Search</button>
          </form>
        </div>

         <div class="display-info-right col-xs-8" style="display: none">
            <div class="loader-div" id="loader" style="display: none"><img src="./assets/img/loader.gif"/></div>
            <div class="info-div" id="loader" style="display: none">
              <div class="row-info">
                <div class="col-xs-3 nopadding left-label-form">Bus Route No.: </div>
                <div class="col-xs-9 nopadding" id="bus_route"></div>
              </div>

              <div class="row-info">
                <div class="col-xs-3 nopadding left-label-form">Local Train Time & Type: </div>
                <div class="col-xs-9 nopadding"><div id="train_time_route"></div></div>
              </div>

              <div class="row-info">
                    <div class="panel panel-default panel-restaurants">
                      <div class="panel-heading">Nearby Destination Restaurants</div>
                      <div class="panel-body restaurants-body">
                        
                      </div>
                  </div>
              </div>

               <div class="row-info">
                    <div class="panel panel-default panel-flights">
                      <div class="panel-heading">Map</div>
                      <iframe width="600" height="450" id="google-map" frameborder="0" style="border:0" allowfullscreen></iframe>
                      </div>
                  </div>
              <div class="row-info">
                    <div class="panel panel-default panel-flights">
                      <div class="panel-heading">Fights</div>
                      <div class="panel-body flights-body">                        
                      </div>
                  </div>
              </div>
              </div>

            </div>
          </div>
      </div>
    

	<!-- script references -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
		<script src="assets/js/bootstrap.min.js" type="text/javascript"></script>
		
		<script src="assets/js/scripts.js" type="text/javascript"></script>
	</body>
</html>
