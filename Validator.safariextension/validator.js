var currentUrl = document.URL;

var htmlServer = "http://validator.w3.org/check?";
var cssServer = "http://jigsaw.w3.org/css-validator/validator?";

function validateHtml(doctype){
	
	var url = htmlServer;
		url += "uri="+currentUrl;
		url += "&charset=%28detect+automatically%29";
		url += "&doctype="+doctype+"&group=0&user-agent=W3C_Validator%2F1.1";
	
	safari.self.tab.dispatchMessage("openUrl", url);
}

function validateCss(params){
	
	var url = cssServer;
		url += "uri="+currentUrl;
		url += "&profile="+params[0];
		url += "&usermedium="+params[1];
		url += "&warning=1&lang=fr";
	
	safari.self.tab.dispatchMessage("openUrl", url);
}

function replyToMessage(msgEvent){	
	
	if (msgEvent.name === "validateHtml" && window === window.top)
		validateHtml(msgEvent.message);
	
	if (msgEvent.name === "validateCss" && window === window.top)
		validateCss(msgEvent.message);
	
}

safari.self.addEventListener("message", replyToMessage, false);