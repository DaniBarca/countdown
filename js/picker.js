(function($){
    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    var vars = getUrlVars();
    var target_time = new Date(JSON.parse("\""+vars["timestamp"]+"\""));
    (updateTime = function(){
        var now = new Date();
        var seconds = 0;
        if(target_time > now)
            seconds = Math.floor((target_time - now) / 1000);

        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        if(d<=0)
            $("#days-container").remove();
        
        if(d<2)
            $("#day-s").html("day");
        
        $("#days").html(d.toString());
        $("#hours").html(h.toString().padStart(2,"0"));
        $("#minutes").html(m.toString().padStart(2,"0"));
        $("#seconds").html(s.toString().padStart(2,"0"));
    })();

    if(!vars["title"])
        $("#title").remove();

    vars["title"] = vars["title"].replace("+", "&nbsp;");
    vars["title"] = vars["title"].replace("%20", "&nbsp;");
    
    $("#title").html(vars["title"] || "Title");

    window.setInterval(updateTime, 500);
})(jQuery); // end of jQuery name space