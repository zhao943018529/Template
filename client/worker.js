import fetchData from './fetch'; 

onmessage=function(e){
    fetchData('/api/v2/movie/in_theaters',[data=>postMessage({
        status:2,
        movies:data,
    }),err=>this.postMessage({status:3,message:err.response})]);
}




