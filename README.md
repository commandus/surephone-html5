# HTML5 web component to sign up web push notifications

This project demonstrates how to add web push notification "Register" button with account number or phone number.

After your web users registers they can receive personal web push notifications to the web browser from mobile phone, tablet or desktop PC.

Please note Web Push notifications must enabled in the browser.

After user registers, then you can send them personal messages by account # or phone number using with this simple program:

https://gitlab.com/commandus/surephone-commander

or using direct web API (https://gitlab.com/commandus/surephone-php, coming soon).


## Setup

Copy firebase-messaging-sw.js to the root of your web site.

Register a new project ar https://firebase.com/, go to the FCM settings an copy-n-paste credentials into config structure in the firebase-messaging-sw.js file.

Copy javascript files from  tag/ directory to any place in the web site directory.

Then refer to webcomponent in web page file like this:

```
<script type="text/javascript" src="/tag/x-phone.js"></script>
```

Please note src attribute must link to place where you copied javascript files.

Add x-phone tag in HTML code like this:

```
<x-phone id="phone" label="Sign up to notification" pid="1"
                        prefix="+7" delimiter="-" blocks="2,3,3,4" numeric="true" 
                        ontoken="onToken"></x-phone>
```

## Test

Copy files from test/ to your web site.

## License

Copyright andrei.i.ivanov@gmail.com 
Apache License 2.0 

Copyright nosir https://github.com/nosir/cleave.js/
Apache License 2.0 
