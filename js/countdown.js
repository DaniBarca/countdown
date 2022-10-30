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

    var use_dots = vars["use-dots"] != undefined ? decodeURIComponent(vars["use-dots"]) === "true" : false;

    var day = vars["day"] != undefined ? decodeURIComponent(vars["day"]) : "day";
    var days = vars["days"] != undefined ? decodeURIComponent(vars["days"]) : "days";

    var hour = vars["hour"] != undefined ? decodeURIComponent(vars["hour"]) : "hour";
    var hours = vars["hours"] != undefined ? decodeURIComponent(vars["hours"]) : "hours";

    var minute = vars["minute"] != undefined ? decodeURIComponent(vars["minute"]) : "minute";
    var minutes = vars["minutes"] != undefined ? decodeURIComponent(vars["minutes"]) : "minutes";

    var second = vars["second"] != undefined ? decodeURIComponent(vars["second"]) : "second";
    var seconds_text = vars["seconds"] != undefined ? decodeURIComponent(vars["seconds"]) : "seconds";

    var title_font = vars["title-font"] != undefined ? decodeURIComponent(vars["title-font"]) : undefined;
    var days_font = vars["days-font"] != undefined ? decodeURIComponent(vars["days-font"]) : undefined;

    var title_scale = vars["title-scale"] != undefined ? parseInt(decodeURIComponent(vars["title-scale"])) : 100;
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
        $("#minutes-seconds").css("font-family", days_font)
        $("#hours-minutes").css("font-family", days_font)
        $("#post-seconds").css("font-family", days_font)
    }

    $("#countdown-container").css("transform", "scale(" + (scale / 100) + ")");
    $("#title").css("transform", "scale(" + (title_scale / 100) + ")");

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
        
        if(d==1){
            $("#day-s").html("&nbsp;" + day);
        } else {
            $("#day-s").html("&nbsp;" + days);
        }
        
        $("#days").html(d.toString());
        $("#hours").html(h.toString().padStart(2,"0"));
        $("#minutes").html(m.toString().padStart(2,"0"));
        $("#seconds").html(s.toString().padStart(2,"0"));

        if(!use_dots)
        {
            if(h == 1)
                $("#hours-minutes").html("&nbsp;" + hour);
            else
                $("#hours-minutes").html("&nbsp;" + hours);

            if(m == 1)
                $("#minutes-seconds").html("&nbsp;" + minute);
            else
                $("#minutes-seconds").html("&nbsp;" + minutes);

            if(s == 1)
                $("#post-seconds").html("&nbsp;" + second);
            else
                $("#post-seconds").html("&nbsp;" + seconds_text);
        }
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