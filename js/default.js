var webVisible = false;
var tileDescs = ["Google News"];

function setCategory() {
    var selected = document.getElementById("catSelect").value;
    showLoading(true);
    catSetter(selected);
}
function catSetter(cat) {
    if (cat == "Main") {
        document.getElementById("category").innerHTML = "Main";
        initialize("http://news.google.com/?output=rss&hl=en", false);
        return;
    }
    if (cat == "World") {
        document.getElementById("category").innerHTML = "World";
        initialize("http://news.google.com/?topic=w&output=rss&hl=en", false);
        return;
    }
    if (cat == "U.S.") {
        document.getElementById("category").innerHTML = "U.S.";
        initialize("http://news.google.com/?topic=n&output=rss&hl=en", false);
        return;
    }
    if (cat == "Business") {
        document.getElementById("category").innerHTML = "Business";
        initialize("http://news.google.com/?topic=b&output=rss&hl=en", false);
        return;
    }
    if (cat == "Technology") {
        document.getElementById("category").innerHTML = "Technology";
        initialize("http://news.google.com/?topic=tc&output=rss&hl=en", false);
        return;
    }
    if (cat == "Sports") {
        document.getElementById("category").innerHTML = "Sports";
        initialize("http://news.google.com/?topic=s&output=rss&hl=en", false);
        return;
    }
    else {
        document.getElementById("category").innerHTML = cat;
        initialize("http://news.google.com/news/section?pz=1&cf=all&q=" + cat + "&output=rss", false);
    }
}

function openURL(se) {
    pid = se.parentNode.id;
    webVisible = true;
    document.getElementById("web").setAttribute("style", "visibility:visible; z-index:1;");
    document.getElementById("webTit").setAttribute("style", "visibility:visible; position:absolute; left: 10%; top:10px;");
    document.getElementById("webImg").setAttribute("style", "visibility:visible; float:left; position:absolute; top:-20px; left:10px; transform:scale(0.2)");
    document.getElementById("main").setAttribute("style", "visibility:hidden; z-index:-1; display:none;");
    document.getElementById("webURL").setAttribute("style", "visibility:visible; z-index:1; color:darkblue; position:absolute; top:98%; left:47%;");
    document.getElementById("webTit").innerHTML = document.getElementById(pid + "_tit").innerHTML;
    document.getElementById("webBrowse").setAttribute("src", pid);
    document.getElementById("webURL").href = pid;
    showLoading(false);
}
function disableWeb() {
    showLoading(false);
    webVisible = false;
    document.getElementById("webBrowse").setAttribute("src", "blank.html");
    document.getElementById("webTit").setAttribute("style", "visibility:hidden; position:absolute; left: 10%; top:10px;");
    document.getElementById("webImg").setAttribute("style", "visibility:hidden; float:left; position:absolute; top:-20px; left:10px; transform:scale(0.2)");
    document.getElementById("web").setAttribute("style", "visibility:hidden; z-index:-1; display:none;");
    document.getElementById("webURL").setAttribute("style", "visibility:hidden; z-index:-1;");
    document.getElementById("main").setAttribute("style", "visibility:visible; z-index:1;");
    catSetter(document.getElementById("category").innerHTML);
}

function showLoading(state) {
    if (state == true) {
        document.getElementById("loading").setAttribute("style", "visibility:visible; position:absolute; float:left; top:45%; left:45%; z-index:3");
    }
    if (state == false) {
        document.getElementById("loading").setAttribute("style", "visibility:hidden; position:absolute; float:left; top:45%; left:45%; z-index:-1");
    }
}
function clearAll() {
        tileCycle = [];
        document.getElementById("row1").innerHTML = "";
        document.getElementById("row2").innerHTML = "";
        document.getElementById("row3").innerHTML = "";
        var ie = document.createElement("div");
        var at = document.createElement("h3");
        var desc = document.createElement("p");
        var sel = document.createElement("select");
        var refresh = document.createElement("button");
        ie.setAttribute("class", "item");
        at.innerHTML = "News Reader for Google News";
        desc.innerHTML = "Select a category below.";
        sel.id = "catSelect";
        refresh.id = "refreshBtn";
        refresh.innerHTML = "Refresh";
        refresh.setAttribute("onclick", 'showLoading(true); catSetter(document.getElementById("category").innerHTML);');
        refresh.setAttribute("style", "margin-left:40px;");
        sel.setAttribute("onchange", "setCategory()");
        var o_sel = document.createElement("option");
        o_sel.innerHTML = "Select";
        var o_all = document.createElement("option");
        o_all.innerHTML = "Main";
        var o_wld = document.createElement("option");
        o_wld.innerHTML = "World";
        var o_us = document.createElement("option");
        o_us.innerHTML = "U.S.";
        var o_bus = document.createElement("option");
        o_bus.innerHTML = "Business";
        var o_tch = document.createElement("option");
        o_tch.innerHTML = "Technology";
        var o_spr = document.createElement("option");
        o_spr.innerHTML = "Sports";
        sel.appendChild(o_sel);
        sel.appendChild(o_all);
        sel.appendChild(o_wld);
        sel.appendChild(o_us);
        sel.appendChild(o_bus);
        sel.appendChild(o_tch);
        sel.appendChild(o_spr);
        ie.appendChild(at);
        ie.appendChild(desc);
        ie.appendChild(sel);
        ie.appendChild(refresh);
        tileDescs = ["Google News"];
        document.getElementById("row1").appendChild(ie);
    }
function refresh() {
    showLoading(true);
    catSetter(document.getElementById("category").innerHTML);
}
function initialize(url, first) {
    var row = 1;
    clearAll()
    if (first == true) {
        var ctext = document.getElementById("category");
        ctext.innerHTML = "Main";
    }
    $.post("http://crossdomainxmlfetch.appspot.com/", { "fetch": url }, function (data) {
        imglist = [];
        $(data).find("item").each(function () {
            var el = $(this);
            var td = document.createElement("div");
            var tit = document.createElement("h3");
            var cat = document.createElement("p");
            var pub = document.createElement("p");
            var url = document.createElement("h3");
            var hut = document.createElement("div");
            var hur = document.createElement("div");
            var lnk = el.find("link").text();
            lnk = lnk.slice(lnk.indexOf("url=") + 4);
            tit.innerHTML = el.find("title").text();
            tileDescs.push(el.find("title").text());
            cat.innerHTML = "From " + lnk.slice(0, lnk.indexOf("/", 7));
            pub.innerHTML = "Published: " + el.find("pubDate").text();
            url.innerHTML = "Open Article";
            hur.innerHTML = lnk
            hut.innerHTML = el.find("title").text();
            hur.setAttribute("style", "display:none;");
            hut.setAttribute("style", "display:none;");
            hur.setAttribute("id", lnk + "_url")
            hut.setAttribute("id", lnk + "_tit")
            url.setAttribute("onclick", "openURL(this)");
            url.setAttribute("style", "color:darkblue;vertical-align:bottom;");
            td.setAttribute("class", "item");
            td.setAttribute("style", "display:table-cell;")
            td.appendChild(tit);
            td.appendChild(cat);
            td.appendChild(pub);
            td.appendChild(url);
            td.appendChild(hur);
            td.appendChild(hut);
            td.setAttribute("id", lnk);
            if (row == 0) {
                document.getElementById("row1").appendChild(td);
                row++;
            }
            else if (row == 1) {
                document.getElementById("row2").appendChild(td);
                row++;
            }
            else if (row == 2) {
                document.getElementById("row3").appendChild(td);
                row = 0;
            }
        });
        showLoading(false);
    });
    //registerTask();
}
(function () {
    
})();
