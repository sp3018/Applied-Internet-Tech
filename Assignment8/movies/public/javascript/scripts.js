document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById('filterBtn').addEventListener('click', function(event){
        event.preventDefault();
        document.getElementById('filterBtn').innerHTML="dongs";
        var filter = document.getElementById('director').value;
        if (filter!="") {
            if (filter.includes(' ')) {
                filter = filter.replace(" ", "%20");
            }
            var req=new XMLHttpRequest(), url='/api/movies?director='+filter;
        }
        else{
            var req=new XMLHttpRequest(), url='/api/movies'; 
        }
        req.open('GET', url, true);
        //req.addEventListener('load', handleFilterResponse());
        req.addEventListener('load', function(){
            var responseMovies = [];
            if (req.status >= 200 && req.status <400) {
                var movies=JSON.parse(req.responseText);
                movies.forEach(function(obj){
                    responseMovies.push(({'title':obj.title, 'director':obj.director, 'year':obj.year}));
                });
                var movieList = document.getElementById('movie-list');
                movieList.textContent="";
                responseMovies.forEach(function(mov){
                    movieList.innerHTML+="<tr><td>"+mov.title+"</td><td>"+mov.director+"</td><td>"+mov.year+"</td></tr>";
                })
            }
        });
        req.send();
    })
    
    
    document.getElementById('addBtn').addEventListener('click', function(event){
        event.preventDefault();
        var req=new XMLHttpRequest();
        req.open('POST', '/api/movies/create', true);
        req.addEventListener('load', function(){
            document.getElementById('director').value="";
            document.getElementById('filterBtn').click();
        })
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        var movieTitle=document.getElementById('movieTitle').value, movieDirector=document.getElementById('movieDirector').value, movieYear=document.getElementById('movieYear').value;
        req.send("movieTitle="+movieTitle+"&"+"movieDirector="+movieDirector+"&"+"movieYear="+movieYear);
    })
})

