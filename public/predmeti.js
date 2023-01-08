function logout(){
    console.log("dosao");
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "http://localhost:3000/login", true);
}