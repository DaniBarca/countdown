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

    var day = vars["day"] != undefined ? decodeURIComponent(vars["day"]) : "day";
    var days = vars["days"] != undefined ? decodeURIComponent(vars["days"]) : "days";

    var title_font = vars["title-font"] != undefined ? decodeURIComponent(vars["title-font"]) : undefined;
    var days_font = vars["days-font"] != undefined ? decodeURIComponent(vars["days-font"]) : undefined;

    var title_scale = vars["title-scale"] != undefined ? parseInt(decodeURIComponent(vars["title-scale"])) : 100;
    var days_scale = vars["days-scale"] != undefined ? parseInt(decodeURIComponent(vars["days-scale"])) : 100;
    var scale = vars["scale"] != undefined ? parseInt(decodeURIComponent(vars["scale"])) : 100;

    if(title_font != undefined)
    {
        WebFont.load({
            google: {
                families: [title_font]
            }
        });

        $("#title").css("font-family", title_font);
    }

    if(days_font != undefined)
    {
        WebFont.load({
            google: {
                families:[days_font]
            }
        });

        $("#day-s").css("font-family", days_font)
        $("#days").css("font-family", days_font)
        $("#hours").css("font-family", days_font)
        $("#minutes").css("font-family", days_font)
        $("#seconds").css("font-family", days_font)
    }

    $("#countdown-container").css("transform", "scale(" + (scale / 100) + ")");
    $("#title").css("transform", "scale(" + (title_scale / 100) + ")");
    $("#day-s").css("transform", "scale(" + (days_scale / 100) + ")");
    $("#days").css("transform", "scale(" + (days_scale / 100) + ")");
    $("#hours").css("transform", "scale(" + (days_scale / 100) + ")");
    $("#minutes").css("transform", "scale(" + (days_scale / 100) + ")");
    $("#seconds").css("transform", "scale(" + (days_scale / 100) + ")");

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
        
        if(d<2){
            $("#day-s").html("&nbsp;" + day);
        } else {
            $("#day-s").html("&nbsp;" + days);
        }
        
        $("#days").html(d.toString());
        $("#hours").html(h.toString().padStart(2,"0"));
        $("#minutes").html(m.toString().padStart(2,"0"));
        $("#seconds").html(s.toString().padStart(2,"0"));
    })();

    if(!vars["title"])
        $("#title").remove();
    else{
        vars["title"] = decodeURIComponent(vars["title"])
        vars["title"] = vars["title"].replace(" ", "&nbsp;")
        vars["title"] = vars["title"].replace("+", "&nbsp;")
    }
    
    $("#title").html(vars["title"] || "Title");
    $("head>title").html(vars["title"] || "Title");

    window.setInterval(updateTime, 500);
})(jQuery); // end of jQuery name space