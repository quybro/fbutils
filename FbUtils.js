
var requestPermissions = { scope: 'public_profile, email, user_friends' };
var FbUtils = {

    // This is called with the results from from FB.getLoginStatus().
    statusChangeCallback: function (response) {
        console.log('statusChangeCallback');
        console.log(JSON.stringify(response));
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            console.log("Logged into your app and Facebook.");
            FbUtils.getUserInfo();
            FbUtils.getRandomTaggableFriendInfo();
        } else if (response.status === 'not_authorized') {
            console.log("The person is logged into Facebook, but not your app");
        } else {
            console.log("The person is not logged into Facebook, so we're not sure if they are logged into this app or not.");
        }
    },

    init: function () {
        console.log("This is init function");
        FB.getLoginStatus(function (response) {
            FbUtils.statusChangeCallback(response);
            /* format data of response look like this:
            {
                status: 'connected',
                authResponse: {
                    accessToken: '...',
                    expiresIn:'...',
                    signedRequest:'...',
                    userID:'...'
                }
            }
            */
        });
    },
    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    checkLoginState: function () {
        FB.getLoginStatus(function (response) {
            FbUtils.statusChangeCallback(response);
        });
    },

    // call this function to login
    login: function () {
        FB.login(function (response) {
            FbUtils.statusChangeCallback(response);
        }, requestPermissions);
    },

    // get user info when login successfully
    getUserInfo: function () {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me?fields=name,email,first_name,last_name,age_range,link,timezone,updated_time,verified,picture,locale', function (response) {
            console.log('Successful login for: ' + JSON.stringify(response));
            // console.log('Email: email ->' + response.email);
            // console.log('Public profile: id ->' + response.id);
            // console.log('Public profile: name ->' + response.name);
            // console.log('Public profile: first_name ->' + response.first_name);
            // console.log('Public profile: last_name ->' + response.last_name);
            // console.log('Public profile: age_range ->' + response.age_range);
            // console.log('Public profile: link ->' + response.link);
            // console.log('Public profile: gender ->' + response.gender);
            // console.log('Public profile: locale ->' + response.locale);
            // console.log('Public profile: picture ->' + response.picture);
            // console.log('Public profile: timezone ->' + response.timezone);
            // console.log('Public profile: updated_time ->' + response.updated_time);
            // console.log('Public profile: verified ->' + response.verified);
            document.getElementById('fb_user_info').innerHTML = JSON.stringify(response);
        });

        // FbUtils.getGrantedPermission();
        // FbUtils.post("https://www.youtube.com/watch?v=9cFDbtFC-JI&list=RD9cFDbtFC-JI", 
        //     "this is caption", 
        //     "this is description", 
        //     "http://img.f29.vnecdn.net/2016/10/16/xalu-1476599016_490x294.jpg", 
        //     "http://vnexpress.net/");
    },

    getRandomTaggableFriendInfo: function(){
        FB.api('/me/taggable_friends', { fields: 'id,email,name,picture.width(480).height(480)' }, function(response) {
            if(response.data != null && response.data.length > 0){
                var randomFriend = response.data[Math.floor(Math.random() * (response.data.length - 1))];
                document.getElementById('fb_friend_info').innerHTML = JSON.stringify(randomFriend);
                console.log("friends: " + randomFriend.picture.data.url);
            }
        });
    },

    // should use for debug
    getGrantedPermission: function () {
        FB.api('/me/permissions ', function (response) {
            console.log('Granted permissions: ' + JSON.stringify(response));
        });
    },

    // Share on facebook
    share: function (inHref, inHashTag, inQuote) {
        FB.ui({
            method: 'share',
            href: inHref,
            hashtag: inHashTag,
            quote: inQuote
        }, function (response) { 
            console.log('Share response: ' + JSON.stringify(response));
        });
    },

    // Post to facebook
    post: function (inLink, inCaption, inDescription, inPicture, inSource) {
        FB.ui({
            method: 'feed',
            link: inLink,
            caption: inCaption,
            description: inDescription,
            picture: inPicture,
            source:inSource
        }, function (response) {
            console.log('Post response: ' + JSON.stringify(response));
         });
    }

}