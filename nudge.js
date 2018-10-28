var options = {
	type: "basic",
	title: "PriceRadar",
	message: "Item added successfully",
	iconUrl: "/images/1.png",
	buttons: [{
            title: "Yes, I'm diverted",
            iconUrl: "images/yes.png"
        }, {
            title: "No, I'm not",
            iconUrl: "images/no.png"
        }]
 };

var myNotificationID = null;

setInterval(function(){ 
                        const Http = new XMLHttpRequest();
                        const url='http://178.128.113.186:8000/get_nudge_status';
                        Http.open("GET", url);
                        Http.send();
                        Http.onreadystatechange=(e)=>{
                            console.log(Http.responseText)
                            if (Number(Http.responseText) >= 5) {
                                var opt = options;
                                chrome.notifications.create('itemAdd',
                                                            opt,
                                                            function(id){myNotificationID = id}
                                                            );
                            }
                        }},
            10000);

chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId === myNotificationID) {
        if (btnIdx === 0) {
            alert("Yes!!!");
            const Http = new XMLHttpRequest();
                        const url='http://178.128.113.186:8000/nudge_feedback_diverted';
                        Http.open("GET", url);
                        Http.send();
                        Http.onreadystatechange=(e)=>{
                            console.log(Http.responseText);
                        };
        } else if (btnIdx === 1) {
            alert("No!!!");
            const Http = new XMLHttpRequest();
                        const url='http://178.128.113.186:8000/nudge_feedback_not_diverted';
                        Http.open("GET", url);
                        Http.send();
                        Http.onreadystatechange=(e)=>{
                            console.log(Http.responseText);
                        };
        }
    }
});
