/**
 * Copyright (c) 2018 Andrei Ivanov. https://gitlab.com/commandus
 * @see http://materializecss.com/
 * @see https://raw.githubusercontent.com/nosir/cleave.js/master/src/Cleave.js
 * @see https://closure-compiler.appspot.com/home
 */

 /** Copyright nosir https://github.com/nosir/cleave.js/ Apache License 2.0 
  * https://raw.githubusercontent.com/nosir/cleave.js/master/src/Cleave.js has dependecies ;(
  */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Cleave=t():e.Cleave=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){(function(t){"use strict";var n=function(e,t){var r=this;if("string"==typeof e?r.element=document.querySelector(e):r.element="undefined"!=typeof e.length&&e.length>0?e[0]:e,!r.element)throw new Error("[cleave.js] Please check the element");t.initValue=r.element.value,r.properties=n.DefaultProperties.assign({},t),r.init()};n.prototype={init:function(){var e=this,t=e.properties;return t.numeral||t.phone||t.creditCard||t.date||0!==t.blocksLength||t.prefix?(t.maxLength=n.Util.getMaxLength(t.blocks),e.isAndroid=n.Util.isAndroid(),e.lastInputValue="",e.onChangeListener=e.onChange.bind(e),e.onKeyDownListener=e.onKeyDown.bind(e),e.onFocusListener=e.onFocus.bind(e),e.onCutListener=e.onCut.bind(e),e.onCopyListener=e.onCopy.bind(e),e.element.addEventListener("input",e.onChangeListener),e.element.addEventListener("keydown",e.onKeyDownListener),e.element.addEventListener("focus",e.onFocusListener),e.element.addEventListener("cut",e.onCutListener),e.element.addEventListener("copy",e.onCopyListener),e.initPhoneFormatter(),e.initDateFormatter(),e.initNumeralFormatter(),void((t.initValue||t.prefix&&!t.noImmediatePrefix)&&e.onInput(t.initValue))):void e.onInput(t.initValue)},initNumeralFormatter:function(){var e=this,t=e.properties;t.numeral&&(t.numeralFormatter=new n.NumeralFormatter(t.numeralDecimalMark,t.numeralIntegerScale,t.numeralDecimalScale,t.numeralThousandsGroupStyle,t.numeralPositiveOnly,t.stripLeadingZeroes,t.delimiter))},initDateFormatter:function(){var e=this,t=e.properties;t.date&&(t.dateFormatter=new n.DateFormatter(t.datePattern),t.blocks=t.dateFormatter.getBlocks(),t.blocksLength=t.blocks.length,t.maxLength=n.Util.getMaxLength(t.blocks))},initPhoneFormatter:function(){var e=this,t=e.properties;if(t.phone)try{t.phoneFormatter=new n.PhoneFormatter(new t.root.Cleave.AsYouTypeFormatter(t.phoneRegionCode),t.delimiter)}catch(r){throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib")}},onKeyDown:function(e){var t=this,r=t.properties,i=e.which||e.keyCode,a=n.Util,o=t.element.value;return a.isAndroidBackspaceKeydown(t.lastInputValue,o)&&(i=8),t.lastInputValue=o,8===i&&a.isDelimiter(o.slice(-r.delimiterLength),r.delimiter,r.delimiters)?void(r.backspace=!0):void(r.backspace=!1)},onChange:function(){this.onInput(this.element.value)},onFocus:function(){var e=this,t=e.properties;n.Util.fixPrefixCursor(e.element,t.prefix,t.delimiter,t.delimiters)},onCut:function(e){this.copyClipboardData(e),this.onInput("")},onCopy:function(e){this.copyClipboardData(e)},copyClipboardData:function(e){var t=this,r=t.properties,i=n.Util,a=t.element.value,o="";o=r.copyDelimiter?a:i.stripDelimiters(a,r.delimiter,r.delimiters);try{e.clipboardData?e.clipboardData.setData("Text",o):window.clipboardData.setData("Text",o),e.preventDefault()}catch(l){}},onInput:function(e){var t=this,r=t.properties,i=n.Util;return r.numeral||!r.backspace||i.isDelimiter(e.slice(-r.delimiterLength),r.delimiter,r.delimiters)||(e=i.headStr(e,e.length-r.delimiterLength)),r.phone?(!r.prefix||r.noImmediatePrefix&&!e.length?r.result=r.phoneFormatter.format(e):r.result=r.prefix+r.phoneFormatter.format(e).slice(r.prefix.length),void t.updateValueState()):r.numeral?(!r.prefix||r.noImmediatePrefix&&!e.length?r.result=r.numeralFormatter.format(e):r.result=r.prefix+r.numeralFormatter.format(e),void t.updateValueState()):(r.date&&(e=r.dateFormatter.getValidatedDate(e)),e=i.stripDelimiters(e,r.delimiter,r.delimiters),e=i.getPrefixStrippedValue(e,r.prefix,r.prefixLength),e=r.numericOnly?i.strip(e,/[^\d]/g):e,e=r.uppercase?e.toUpperCase():e,e=r.lowercase?e.toLowerCase():e,!r.prefix||r.noImmediatePrefix&&!e.length||(e=r.prefix+e,0!==r.blocksLength)?(r.creditCard&&t.updateCreditCardPropsByValue(e),e=i.headStr(e,r.maxLength),r.result=i.getFormattedValue(e,r.blocks,r.blocksLength,r.delimiter,r.delimiters,r.delimiterLazyShow),void t.updateValueState()):(r.result=e,void t.updateValueState()))},updateCreditCardPropsByValue:function(e){var t,r=this,i=r.properties,a=n.Util;a.headStr(i.result,4)!==a.headStr(e,4)&&(t=n.CreditCardDetector.getInfo(e,i.creditCardStrictMode),i.blocks=t.blocks,i.blocksLength=i.blocks.length,i.maxLength=a.getMaxLength(i.blocks),i.creditCardType!==t.type&&(i.creditCardType=t.type,i.onCreditCardTypeChanged.call(r,i.creditCardType)))},setCurrentSelection:function(e,t){var r=this.element;if(t.length!==e&&r===document.activeElement)if(r.createTextRange){var n=r.createTextRange();n.move("character",e),n.select()}else r.setSelectionRange(e,e)},updateValueState:function(){var e=this;if(e.element){var t=e.element.selectionEnd,r=e.element.value;if(e.isAndroid)return void window.setTimeout(function(){e.element.value=e.properties.result,e.setCurrentSelection(t,r)},1);e.element.value=e.properties.result,e.setCurrentSelection(t,r)}},setPhoneRegionCode:function(e){var t=this,r=t.properties;r.phoneRegionCode=e,t.initPhoneFormatter(),t.onChange()},setRawValue:function(e){var t=this,r=t.properties;e=void 0!==e&&null!==e?e.toString():"",r.numeral&&(e=e.replace(".",r.numeralDecimalMark)),r.backspace=!1,t.element.value=e,t.onInput(e)},getRawValue:function(){var e=this,t=e.properties,r=n.Util,i=e.element.value;return t.rawValueTrimPrefix&&(i=r.getPrefixStrippedValue(i,t.prefix,t.prefixLength)),i=t.numeral?t.numeralFormatter.getRawValue(i):r.stripDelimiters(i,t.delimiter,t.delimiters)},getISOFormatDate:function(){var e=this,t=e.properties;return t.date?t.dateFormatter.getISOFormatDate():""},getFormattedValue:function(){return this.element.value},destroy:function(){var e=this;e.element.removeEventListener("input",e.onChangeListener),e.element.removeEventListener("keydown",e.onKeyDownListener),e.element.removeEventListener("focus",e.onFocusListener),e.element.removeEventListener("cut",e.onCutListener),e.element.removeEventListener("copy",e.onCopyListener)},toString:function(){return"[Cleave Object]"}},n.NumeralFormatter=r(1),n.DateFormatter=r(2),n.PhoneFormatter=r(3),n.CreditCardDetector=r(4),n.Util=r(5),n.DefaultProperties=r(6),("object"==typeof t&&t?t:window).Cleave=n,e.exports=n}).call(t,function(){return this}())},function(e,t){"use strict";var r=function(e,t,n,i,a,o,l){var s=this;s.numeralDecimalMark=e||".",s.numeralIntegerScale=t>0?t:0,s.numeralDecimalScale=n>=0?n:2,s.numeralThousandsGroupStyle=i||r.groupStyle.thousand,s.numeralPositiveOnly=!!a,s.stripLeadingZeroes=o!==!1,s.delimiter=l||""===l?l:",",s.delimiterRE=l?new RegExp("\\"+l,"g"):""};r.groupStyle={thousand:"thousand",lakh:"lakh",wan:"wan",none:"none"},r.prototype={getRawValue:function(e){return e.replace(this.delimiterRE,"").replace(this.numeralDecimalMark,".")},format:function(e){var t,n,i=this,a="";switch(e=e.replace(/[A-Za-z]/g,"").replace(i.numeralDecimalMark,"M").replace(/[^\dM-]/g,"").replace(/^\-/,"N").replace(/\-/g,"").replace("N",i.numeralPositiveOnly?"":"-").replace("M",i.numeralDecimalMark),i.stripLeadingZeroes&&(e=e.replace(/^(-)?0+(?=\d)/,"$1")),n=e,e.indexOf(i.numeralDecimalMark)>=0&&(t=e.split(i.numeralDecimalMark),n=t[0],a=i.numeralDecimalMark+t[1].slice(0,i.numeralDecimalScale)),i.numeralIntegerScale>0&&(n=n.slice(0,i.numeralIntegerScale+("-"===e.slice(0,1)?1:0))),i.numeralThousandsGroupStyle){case r.groupStyle.lakh:n=n.replace(/(\d)(?=(\d\d)+\d$)/g,"$1"+i.delimiter);break;case r.groupStyle.wan:n=n.replace(/(\d)(?=(\d{4})+$)/g,"$1"+i.delimiter);break;case r.groupStyle.thousand:n=n.replace(/(\d)(?=(\d{3})+$)/g,"$1"+i.delimiter)}return n.toString()+(i.numeralDecimalScale>0?a.toString():"")}},e.exports=r},function(e,t){"use strict";var r=function(e){var t=this;t.date=[],t.blocks=[],t.datePattern=e,t.initBlocks()};r.prototype={initBlocks:function(){var e=this;e.datePattern.forEach(function(t){"Y"===t?e.blocks.push(4):e.blocks.push(2)})},getISOFormatDate:function(){var e=this,t=e.date;return t[2]?t[2]+"-"+e.addLeadingZero(t[1])+"-"+e.addLeadingZero(t[0]):""},getBlocks:function(){return this.blocks},getValidatedDate:function(e){var t=this,r="";return e=e.replace(/[^\d]/g,""),t.blocks.forEach(function(n,i){if(e.length>0){var a=e.slice(0,n),o=a.slice(0,1),l=e.slice(n);switch(t.datePattern[i]){case"d":"00"===a?a="01":parseInt(o,10)>3?a="0"+o:parseInt(a,10)>31&&(a="31");break;case"m":"00"===a?a="01":parseInt(o,10)>1?a="0"+o:parseInt(a,10)>12&&(a="12")}r+=a,e=l}}),this.getFixedDateString(r)},getFixedDateString:function(e){var t,r,n,i=this,a=i.datePattern,o=[],l=0,s=0,c=0,u=0,d=0,m=0;return 4===e.length&&"y"!==a[0].toLowerCase()&&"y"!==a[1].toLowerCase()&&(u="d"===a[0]?0:2,d=2-u,t=parseInt(e.slice(u,u+2),10),r=parseInt(e.slice(d,d+2),10),o=this.getFixedDate(t,r,0)),8===e.length&&(a.forEach(function(e,t){switch(e){case"d":l=t;break;case"m":s=t;break;default:c=t}}),m=2*c,u=l<=c?2*l:2*l+2,d=s<=c?2*s:2*s+2,t=parseInt(e.slice(u,u+2),10),r=parseInt(e.slice(d,d+2),10),n=parseInt(e.slice(m,m+4),10),o=this.getFixedDate(t,r,n)),i.date=o,0===o.length?e:a.reduce(function(e,t){switch(t){case"d":return e+i.addLeadingZero(o[0]);case"m":return e+i.addLeadingZero(o[1]);default:return e+""+(o[2]||"")}},"")},getFixedDate:function(e,t,r){return e=Math.min(e,31),t=Math.min(t,12),r=parseInt(r||0,10),(t<7&&t%2===0||t>8&&t%2===1)&&(e=Math.min(e,2===t?this.isLeapYear(r)?29:28:30)),[e,t,r]},isLeapYear:function(e){return e%4===0&&e%100!==0||e%400===0},addLeadingZero:function(e){return(e<10?"0":"")+e}},e.exports=r},function(e,t){"use strict";var r=function(e,t){var r=this;r.delimiter=t||""===t?t:" ",r.delimiterRE=t?new RegExp("\\"+t,"g"):"",r.formatter=e};r.prototype={setFormatter:function(e){this.formatter=e},format:function(e){var t=this;t.formatter.clear(),e=e.replace(/[^\d+]/g,""),e=e.replace(t.delimiterRE,"");for(var r,n="",i=!1,a=0,o=e.length;a<o;a++)r=t.formatter.inputDigit(e.charAt(a)),/[\s()-]/g.test(r)?(n=r,i=!0):i||(n=r);return n=n.replace(/[()]/g,""),n=n.replace(/[\s-]/g,t.delimiter)}},e.exports=r},function(e,t){"use strict";var r={blocks:{uatp:[4,5,6],amex:[4,6,5],diners:[4,6,4],discover:[4,4,4,4],mastercard:[4,4,4,4],dankort:[4,4,4,4],instapayment:[4,4,4,4],jcb:[4,4,4,4],maestro:[4,4,4,4],visa:[4,4,4,4],mir:[4,4,4,4],unionPay:[4,4,4,4],general:[4,4,4,4],generalStrict:[4,4,4,7]},re:{uatp:/^(?!1800)1\d{0,14}/,amex:/^3[47]\d{0,13}/,discover:/^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,diners:/^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,mastercard:/^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,dankort:/^(5019|4175|4571)\d{0,12}/,instapayment:/^63[7-9]\d{0,13}/,jcb:/^(?:2131|1800|35\d{0,2})\d{0,12}/,maestro:/^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,mir:/^220[0-4]\d{0,12}/,visa:/^4\d{0,15}/,unionPay:/^62\d{0,14}/},getInfo:function(e,t){var n=r.blocks,i=r.re;t=!!t;for(var a in i)if(i[a].test(e)){var o;return o=t?n.generalStrict:n[a],{type:a,blocks:o}}return{type:"unknown",blocks:t?n.generalStrict:n.general}}};e.exports=r},function(e,t){"use strict";var r={noop:function(){},strip:function(e,t){return e.replace(t,"")},isDelimiter:function(e,t,r){return 0===r.length?e===t:r.some(function(t){if(e===t)return!0})},getDelimiterREByDelimiter:function(e){return new RegExp(e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),"g")},stripDelimiters:function(e,t,r){var n=this;if(0===r.length){var i=t?n.getDelimiterREByDelimiter(t):"";return e.replace(i,"")}return r.forEach(function(t){e=e.replace(n.getDelimiterREByDelimiter(t),"")}),e},headStr:function(e,t){return e.slice(0,t)},getMaxLength:function(e){return e.reduce(function(e,t){return e+t},0)},getPrefixStrippedValue:function(e,t,r){if(e.slice(0,r)!==t){var n=this.getFirstDiffIndex(t,e.slice(0,r));e=t+e.slice(n,n+1)+e.slice(r+1)}return e.slice(r)},getFirstDiffIndex:function(e,t){for(var r=0;e.charAt(r)===t.charAt(r);)if(""===e.charAt(r++))return-1;return r},getFormattedValue:function(e,t,r,n,i,a){var o,l="",s=i.length>0;return 0===r?e:(t.forEach(function(t,c){if(e.length>0){var u=e.slice(0,t),d=e.slice(t);o=s?i[a?c-1:c]||o:n,a?(c>0&&(l+=o),l+=u):(l+=u,u.length===t&&c<r-1&&(l+=o)),e=d}}),l)},fixPrefixCursor:function(e,t,r,n){var i=e.value,a=r||n[0]||" ";if(e.setSelectionRange&&t&&!(t.length+a.length<i.length)){var o=2*i.length;setTimeout(function(){e.setSelectionRange(o,o)},1)}},isAndroid:function(){return navigator&&/android/i.test(navigator.userAgent)},isAndroidBackspaceKeydown:function(e,t){return!!(this.isAndroid()&&e&&t)&&t===e.slice(0,-1)}};e.exports=r},function(e,t){(function(t){"use strict";var r={assign:function(e,r){return e=e||{},r=r||{},e.creditCard=!!r.creditCard,e.creditCardStrictMode=!!r.creditCardStrictMode,e.creditCardType="",e.onCreditCardTypeChanged=r.onCreditCardTypeChanged||function(){},e.phone=!!r.phone,e.phoneRegionCode=r.phoneRegionCode||"AU",e.phoneFormatter={},e.date=!!r.date,e.datePattern=r.datePattern||["d","m","Y"],e.dateFormatter={},e.numeral=!!r.numeral,e.numeralIntegerScale=r.numeralIntegerScale>0?r.numeralIntegerScale:0,e.numeralDecimalScale=r.numeralDecimalScale>=0?r.numeralDecimalScale:2,e.numeralDecimalMark=r.numeralDecimalMark||".",e.numeralThousandsGroupStyle=r.numeralThousandsGroupStyle||"thousand",e.numeralPositiveOnly=!!r.numeralPositiveOnly,e.stripLeadingZeroes=r.stripLeadingZeroes!==!1,e.numericOnly=e.creditCard||e.date||!!r.numericOnly,e.uppercase=!!r.uppercase,e.lowercase=!!r.lowercase,e.prefix=e.creditCard||e.date?"":r.prefix||"",e.noImmediatePrefix=!!r.noImmediatePrefix,e.prefixLength=e.prefix.length,e.rawValueTrimPrefix=!!r.rawValueTrimPrefix,e.copyDelimiter=!!r.copyDelimiter,e.initValue=void 0!==r.initValue&&null!==r.initValue?r.initValue.toString():"",e.delimiter=r.delimiter||""===r.delimiter?r.delimiter:r.date?"/":r.numeral?",":(r.phone," "),e.delimiterLength=e.delimiter.length,e.delimiterLazyShow=!!r.delimiterLazyShow,e.delimiters=r.delimiters||[],e.blocks=r.blocks||[],e.blocksLength=e.blocks.length,e.root="object"==typeof t&&t?t:window,e.maxLength=0,e.backspace=!1,e.result="",e}};e.exports=r}).call(t,function(){return this}())}])});

function hasBrowserCapabitities()
{
    return (
        'Notification' in window &&
        'serviceWorker' in navigator &&
        'localStorage' in window &&
        'fetch' in window &&
        'postMessage' in window
    );
}

function missedBrowserCapabititiesString()
{
    var s = "";
	if (!('Notification' in window)) {
        s += 'Notification ';
    } else if (!('serviceWorker' in navigator)) {
        s += 'ServiceWorker ';
    } else if (!('localStorage' in window)) {
        s += 'LocalStorage ';
    } else if (!('fetch' in window)) {
        s += 'fetch  ';
    } else if (!('postMessage' in window)) {
        s += 'postMessage ';
    }
    return s;
}

function hasToken() {
	return window.localStorage.getItem('sentFirebaseMessagingToken') != null;
}

function getToken() {
	return window.localStorage.getItem('sentFirebaseMessagingToken');
}

function getUserid() {
	return window.localStorage.getItem('userid');
}

function getCreated() {
	return window.localStorage.getItem('created');
}

function getAccesskey() {
	return window.localStorage.getItem('accesskey');
}

function isTokenSaved(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

/**
  * id, userid, instance, state, created, updated, name, notes, send, recv
  * 0   1       2         3      4        5        6     7      8     9
  * [1,2,"asddf00",1,1517648163,1517648163,"","",1,0,
  * id, created, modified, state, rule, errors, devices, messages, keys, notes, accesskey, accessuntil, parent_id
  * 10  11       12        13     14    15      16       17        18    19     20         21           22
  */
function saveUser(apiUri, token, pid, name, number, phone) {
	window.localStorage.setItem('sentFirebaseMessagingToken', token);
	var config = {
		parent_id: pid,
		instance: token,
		name: name,
		keys: number,
		notes: phone
	};
	rpcPost(apiUri + '/addusrdev', config, function(v) {
		if (v.length > 20) {
			window.localStorage.setItem('userid', v[1]);
			window.localStorage.setItem('created', v[11]);
			window.localStorage.setItem('accesskey', v[20]);
		}
	} );
}

function removeUser(apiUri, userid, created, accesskey, token) {
	window.localStorage.removeItem('sentFirebaseMessagingToken');
	var config = {
		userid: window.localStorage.getItem('userid'),
		created: window.localStorage.getItem('created'),
		accesskey: window.localStorage.getItem('accesskey')
	};
	rpcPost(apiUri + '/rmusr', config, function(v) {
		window.localStorage.removeItem('userid');
		window.localStorage.removeItem('created');
		window.localStorage.removeItem('accesskey');
		} );
}

function getDevToken(self) {
    self.mMessaging.requestPermission()
        .then(function() {
            // Get Instance ID token. Initially this makes a network call, once retrieved
            // subsequent calls to getToken will return from cache.
            self.mMessaging.getToken()
                .then(function(currentToken) {
                    if (currentToken) {
                        if (!isTokenSaved(currentToken)) {
							saveUser(self.mAPI, currentToken, self.mPid, self.mLabel, self.mNumber, self.mValue);
						}
                        self.onTokenSuccess(currentToken);
                    } else {
                        self.onTokenError('No Instance ID token available. Request permission to generate one.');
                    }
                })
                .catch(function(error) {
					if (!error)
						error = "Unknown";
					self.onTokenError('Retrieving token error: ' + error);
                });
        })
        .catch(function(error) {
			if (!error)
				error = "Unknown";
			self.onTokenError('Unable to get permission to notify error: ' + error);            
        });
}

/**
 * Delete Instance ID token. 
 * Retrieve Instance ID token, and then delete it.
 */
function rmDevToken(self)
{
	self.mMessaging.getToken()
		.then(function(currentToken) {
			self.mMessaging.deleteToken(currentToken)
				.then(function() {
					removeUser(self.mAPI, getUserid(), getCreated(), getAccesskey(), currentToken);
					self.onTokenRemoved(currentToken);
				})
				.catch(function(error) {
					if (!error)
						error = "Unknown";
					self.onTokenRemoveError('Unable to delete token error: ' + error);
				});
		})
		.catch(function(error) {
			if (!error)
				error = "Unknown";
			self.onTokenRemoveError('Retrieving Instance ID token so can not delete it error: ' + error);
		});
}

function loadScriptPromise(self, src) {
	return new Promise(function(resolve, reject) {
		const script = document.createElement('script');
		script.async = true;
		script.rel = 'preload';
		script.src = src;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
}

function loadCSSs(self, uris) {
	for (var i = 0; i < uris.length; i++) {
		loadCSS(self, uris[i]);
	}
}

function loadCSS(self, uri) {
	fetch(uri)
	.then (function(response) {
		response.text().then(
			function (v)
			{
				var css = document.createElement('style');
				css.textContent = v;
				// document.head.appendChild(css);
				self.shadow.appendChild(css);
				self.mCSSs.push(css);
			}
	)});
}

function rpcPost(uri, pars = false, success = false) {
	var p = pars ? ("?" + Object.keys(pars).map(function(k) {
		return encodeURIComponent(k) + "=" + encodeURIComponent(pars[k]);
	}).join('&')) : "";
	fetch(uri + p)
	.then (function(response) {
		response.json().then(
			function (json)
			{
				if (success) {
					success(json)
				}
			}
	)});
}

class PhoneNumber extends HTMLElement {
	constructor() {
		super();

		// Create a shadow root
		this.shadow = this.attachShadow({mode: 'open'});
		this.mOntoken = null;

		this.mPid = 0;

		this.mScripts = new Array();
		this.mCSSs = new Array();
		this.mBlocks = new Array();
		this.mPrefix = "";
		this.mDelimiter = "";
		// default API address
		this.mAPI = "https://surephone.commandus.com/app";

		this.mNumeric = false;

		loadScriptPromise(this, 'https://code.jquery.com/jquery-2.1.1.min.js')
			.then(e => loadScriptPromise(this, 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-alpha.4/js/materialize.min.js')
			.then(e => loadScriptPromise(this, 'https://www.gstatic.com/firebasejs/4.9.0/firebase-app.js')
			.then(e => loadScriptPromise(this, 'https://www.gstatic.com/firebasejs/4.9.0/firebase-messaging.js')
			.then(() => {
				this.initFireBase(this);

				this.mCleave = new Cleave(this.mInput, {
					prefix: this.mPrefix,
					delimiter: this.mDelimiter,
					blocks: this.mBlocks,
					numericOnly: this.mNumeric
				});

				this.checkBrowser();
		
				loadCSSs(this, [
					"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-alpha.4/css/materialize.min.css"
				]);
				return true;
			}))));
		this.initDOM(this);
	}
	
	initFireBase(self) {
		var config = {
			apiKey: "AIzaSyAyFp0R0gOk6hM0nhkRgns7OHnZ7Bczehw",
			authDomain: "sure-phone.firebaseapp.com",
			databaseURL: "https://sure-phone.firebaseio.com",
			projectId: "sure-phone",
			storageBucket: "sure-phone.appspot.com",
			messagingSenderId: "518511566414"
		};
		firebase.initializeApp(config);
		self.mMessaging = firebase.messaging();
	}

	initDOM(t) {
		t.mLabel = "";

		t.mId = "x-phone";
		t.mDiv1 = document.createElement("div"); 
		t.mDiv1.setAttribute('class','row');

		t.mForm = document.createElement("form"); 
		t.mForm.setAttribute('class','col s12');
		t.mForm.setAttribute('action','javascript:void(0);');

		t.mForm.addEventListener('submit', e => {
			this.toggleSubsciption();
		});

		t.mFormRow1 = document.createElement("div"); 
		t.mFormRow1.setAttribute('class','row');

		t.mInfo = document.createElement("div"); 
		t.mInfo.setAttribute('id','info');

		t.mField1 = document.createElement("div"); 
		t.mField1.setAttribute('class','input-field col s7');

		t.mInput = document.createElement("input"); 
		t.mInput.setAttribute('id','acctno');
		t.mInput.setAttribute('name','acctno');
		t.mInput.setAttribute('type','text');
		t.mInput.setAttribute('class','validate');

		t.mInputLabel = document.createElement("label"); 
		t.mInputLabel.setAttribute('for','acctno');
		t.mInputLabel.textContent = "";

		t.mField2 = document.createElement("div"); 
		t.mField2.setAttribute('class','input-field col s5');

		t.mSubmit = document.createElement("button"); 
		t.mSubmit.setAttribute('class','btn waves-effect waves-light');
		t.mSubmit.setAttribute('type','submit');
		t.mSubmit.setAttribute('name','action');

		t.setButton();
		
		t.mDiv1.appendChild(t.mForm);
		t.mForm.appendChild(t.mInfo);
		t.mForm.appendChild(t.mFormRow1);
		t.mFormRow1.appendChild(t.mField1);
		t.mFormRow1.appendChild(t.mField2);
		t.mField1.appendChild(t.mInput);
		t.mField1.appendChild(t.mInputLabel);
		t.mField2.appendChild(t.mSubmit);

		if (this.lastNumber) {
			this.number = this.lastNumber;
		}

		t.shadow.appendChild(t.mDiv1);
	}

	progress(v) {
		this.mInput.disabled = v;
		this.mSubmit.disabled = v;
		if (v)
			this.mInfo.textContent = "Подождите";
		else
			this.mInfo.textContent = "";
	}

	parse(s) {
		return s.match(/\d+/g).join('');
	}

	format(s) {
		var r = '' + s;
		if (r.length == 11)
			r = '+' + r[0] + '-' 
			+ r[1] + r[2] + r[3] + '-'
			+ r[4] + r[5] + r[6] + '-'
			+ r[7] + r[8] + r[9] + r[10];
		return r;
	}

	setButton() 
	{
		var s;
		if (hasToken())
			s = "Отписаться";
		else
			s = "Подписаться";
		this.mSubmit.textContent = s;	
	
		this.fireEvent();
	}

	fireEvent() {
		if (this.mOntoken) {
			console.log(this.mOntoken);
			var f = window[this.mOntoken];
			console.log(f);
			f(
				getToken(),
				this.mValue,
				this.mNumber
			);
		} else {
			var changeEvent = new CustomEvent("ontoken", {
				bubbles: true,
				cancelable: false,
				detail: {
					token: getToken(),
					number: this.mValue,
					phone: this.mNumber
				}
			});
			this.dispatchEvent(changeEvent);
		}
	}

	changed() {
		this.mInput.value = this.mValue;
		this.mInfo.textContent = this.mLabel;
	}

	get number() {
		return this.mNumber;
	}

	get value() {
		return this.mValue;
	}
	
	get label() {
		return this.mLabel;
	}

	get id() {
		return this.mId;
	}

	get pid() {
		return this.mPid;
	}

	get ontoken() {
		return this.mOntoken;
	}

	get api() {
		return this.mAPI;
	}
	
	set number(val) {
		this.mNumber = parseInt(val, 10);
		this.mValue = this.format(val);
		this.changed();
	}

	set value(val) {
		this.mValue = val;
		this.mNumber = this.parse(val);
		this.changed();
	}

	set label(val) {
		this.mLabel = val ? val : "";
		this.changed();
	}

	set id(val) {
		this.mId = val;
	}

	set ontoken(val) {
		this.mOntoken = val;
	}

	set api(val) {
		this.mAPI = val;
	}

	set pid(val) {
		this.mPid = parseInt(val, 10);
	}

	static get observedAttributes() {
		return ["id", "number", "value", "label", "prefix", "delimiter", "numeric", "blocks", "ontoken", "api", "pid"]; 
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "id") {
			this.mId = newValue;
		}
		if (name === "number") {
			this.mNumber = newValue;
		}
		if (name === "value") {
			this.mValue = newValue;
		}
		if (name === "label") {
			this.mLabel = newValue;
		}
		if (name === "prefix") {
			this.mPrefix = newValue;
		}
		if (name === "delimiter") {
			this.mDelimiter = newValue;
		}
		if (name === "numeric") {
			this.mNumeric = newValue;
		}
		if (name === "blocks") {
			if (newValue != null)
			{
				this.mBlocks = newValue.split(",");
				for (var i = 0; i < this.mBlocks.length; i++) {
					this.mBlocks[i] = parseInt(this.mBlocks[i], 10);
				}
			}
		}
		if (name === "ontoken") {
			this.mOntoken = newValue;
		}
		if (name === "pid") {
			this.mPid = parseInt(newValue, 10);
		}
		if (name === "api") {
			this.mAPI = newValue;
		}
	}

	connectedCallback() {
		this.attributeChangedCallback();
	}

	get lastNumber() {
		var v = window.localStorage.getItem('number');
		return v ? v : false; 
	}

	get token() {
		var v = window.localStorage.getItem('token');
		return v ? v : false; 
	}

	get blocks() {
		return this.mBlocks;
	}

	get prefix() {
		return this.mPrefix;
	}

	get delimiter() {
		return this.mDelimiter;
	}

	get numeric() {
		return this.mNumeric;
	}

	set token(val) {
		if (val)
			window.localStorage.setItem('token', val);
			
		else
			window.localStorage.removeItem('token');
	}

	set prefix(val) {
		this.mPrefix = val;
		this.setAttribute('prefix', val);
	}

	set delimiter(val) {
		this.mDelimiter = val;
		this.setAttribute('delimiter', val);
	}

	set numeric(val) {
		this.mNumeric = (val || val === "true" || val === "numeric");
		this.setAttribute('numeric', val);
	}

	set blocks(val) {
		var s = "";
		if (typeof val === 'array') {
			this.mBlocks = val;
			for (var i = 0; i < val.length; i++) {
				s = s + ",";
			}
			if (s.length > 0)
				s = s.substring(0, s.length - 1);
		}
		if (s.length == 0)
			this.removeAttribute('blocks');
		else
			this.setAttribute('blocks', s);		
	}

	onTokenRemoved(token)
	{
		this.progress(false);
		window.console && console.log('Token deleted.');
		this.setButton();
	}

	onTokenRemoveError(error)
	{
		this.progress(false);
		this.showError(error);
	}

	onTokenSuccess(token)
	{
		this.progress(false);
		window.console && console.log('Token received ' + token);
		this.setButton();
	}

	onTokenError(error)
	{
		this.progress(false);
		this.showError(error);
	}

	showError(error) {
		this.mInfo.innerHTML = '<span color="red">' + error + '</span>';
	}

	showMessage(msg) {
		this.mInfo.innerHTML = msg;
	}

	checkBrowser() {
		if (!hasBrowserCapabitities()) {
			var s = 'Браузер не поддеживает: ' + missedBrowserCapabititiesString();
			window.console && console.warn(s);
			this.showError(s);
		}
	}
	
	toggleSubsciption() {
		this.progress(true);
		this.value = this.mInput.value;
		window.localStorage.setItem('number', this.number);

		if (!hasToken())
		{
			getDevToken(this);
		}
		else
		{
			rmDevToken(this);
		}
		return false;
	}
}

customElements.define('x-phone', PhoneNumber);