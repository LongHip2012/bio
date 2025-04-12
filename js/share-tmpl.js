function reminderEmail(that){
    var _ep = ep(that, '.popup-container');
    var _id=_ep.dataset.id,_email=_ep.querySelector('.input--email').value;
    var item = __data.content.cmpts.find(function (c) { return c.id == _id; }) ;
    if(_id&&isEmail(_email)&&item){
        var _data = {id:_id, to:_email,title:item.title,link:item.link},timeObj=JSON.parse(item.text);
        _data.ts=timeObj.startTimestamp/1000.0 - 5*60;
        if(_data.ts > (Date.now() / 1000.0)){
            var _embedLink=checkLink(item.link);
            if(_embedLink.indexOf('?')>0) _embedLink+='&';
            else _embedLink+='?';
            _embedLink+='utm_medium=social&utm_source=instabio&utm_campaign='+(item.title||'');
            _data.embedLink=_embedLink;
            ibjax('POST','/share/lnk/{0}/itgr/mg/op/em.st/'.Format(__data.bio.id),
                {data:_data,fn:function (resp) {}});
        }
        _ep.classList.add('popup-reminder-ok');
        _ep.innerHTML=`<div class="popup-ctx"><div><p><span><i class="iconfont icon-selected"></i></span></p><h3>Reminder Set Successfully</h3></div></div>`;
        setLSBlock('visitorHasReminded', item.id);
        setTimeout(function () {
            closePopup();
        },1500);
        var _eBlock=document.querySelector('section #'+item.id);
        if(_eBlock){
            _eBlock.querySelector('.embed-event--reminder button').setAttribute('disabled','disabled');
        }
    }
}
function copyAction(that, action){
    action = (action || 'copy').split('/');
    var target = ep(that, action[1]);
    var _value;
    if(action.length>2){
        _value = target.querySelector(action[2]).value||target.querySelector(action[2]).innerText
    }else{
        _value = target.value||target.innerText;
    }
    if(action[0]=='copyLink'&&_value.indexOf('http')!=0) _value='https://'+_value;
    if(navigator.clipboard){
        navigator.clipboard.writeText(_value).then();
    }else{
        var oInput = document.createElement('input');
        oInput.value = _value;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand("Copy");
        oInput.className = 'oInput';
        oInput.parentNode.removeChild(oInput);
    }
    target.querySelector('.copy__btn-text').innerHTML = 'Copied!';
    setTimeout(function(){
        target.querySelector('.copy__btn-text').innerHTML = 'Copy';
    },500)
}

(function () {
    var accessKeyId = '', secretAccessKey = '', sessionToken = '', objectKey = '';
    function getUpToken() {
        var TK=document.querySelector('meta[property="s:tk"]')?document.querySelector('meta[property="s:tk"]').content+'':'';
        ibjax('GET', '/app/s3/upt/token/{0}/shr/?tk={1}'.Format(__data.bio.id,TK), {
            fn: function (resp) {
                resp = JSON.parse(resp || '{}');
                if (resp.code == 0) {
                    accessKeyId = resp.data.credentials.AccessKeyId;
                    secretAccessKey = resp.data.credentials.SecretAccessKey;
                    sessionToken = resp.data.credentials.SessionToken;
                    objectKey = resp.data.key;
                }π
            }
        });
    }
    var URL = window.URL || window.webkitURL;
    this.AWSUPFile = function (options) {
        this.cdnhost = 'https://bio.linkcdn.cc/';
        this.config(options);
        // size = 0, or null, upload without crop
        this.maxSize=800;
        this._tk=null;
        this.inputUpload = options.inputUpload || 'input[name=awsupload]';
        this.s3 = null;
        this.init();
    };
    AWSUPFile.prototype = {
        _config:function () {
            var _this = this;
            if(!_this._tk){
                getUpToken();
                _this._tk=true;
            }
            if(document.querySelector('#awssdkjs')){
            }else{
                var fjs=document.getElementsByTagName('script')[0];
                var js=document.createElement('script');
                js.id='awssdkjs';
                js.async=!0;
                js.src='https://sdk.amazonaws.com/js/aws-sdk-2.684.0.min.js';
                fjs.parentNode.insertBefore(js, fjs);
            }
        },
        init: function () {
            var _this = this;
            _this._config();
            if (!document.querySelector(_this.inputUpload)) {
                // <input type="file" multiple="" name="awsupload" style="display:none" accept="*/*">
                var input = document.createElement('input');
                input.style.display = 'none';
                // input.accept = '*/*';
                input.accept = 'image/*,.pdf';
                input.type = 'file';
                var attr = _this.inputUpload.replace('input[', '').replace(']', '').split('=');
                input.setAttribute(attr[0], attr[1]);
                document.body.appendChild(input);
            }
            document.querySelector(_this.inputUpload).onchange = function (evt) {
                var that = evt.target;
                if (that.files.length == 0) return;
                var file=that.files[0];
                if (!(/image\/\w+/.test(file.type) || /\w+\/pdf/.test(file.type))) {
                    alert("Unsupported format, only support PDF, Image");
                    return;
                }
                if(file.size && file.size > 1024*1024*10){
                    alert("File size should be less than 10MB");
                    return;
                }
                _this._showLoading();
                lsdkjs(window,'AWS').then(function () {
                    _this.uploadSngl(that.files[0]);
                    that.value = '';
                });
            };
        },
        config:function(options){
            options = options||{};
            options.observer = options.observer || {
                next: function (res) {
                },
                error: function (err) {
                }
            };
            options.observer.complete = options.complete || options.observer.complete || function (res) {
            };
            this._options = options;
            this.observer = options.observer;
        },
        trigger: function () {
            if(this._options.target&&this._options.target.parentNode.querySelectorAll('.file-item').length<6){
                document.querySelector(this.inputUpload).click();
            }
        },
        uploadSngl: function (file, format) {
            var _this = this;
            if (_this.s3 == null) {
                _this.s3 = new AWS.S3({
                    apiVersion: '2006-03-01', region: 'us-east-2',
                    useAccelerateEndpoint:true, // enable TransferAcceleration
                    credentials: new AWS.Credentials(accessKeyId, secretAccessKey, sessionToken)
                });
            }
            format=file.type.indexOf('image')>-1?'image':'pdf';
            var params = {
                Bucket: 'instabio', /* required */
                Key: objectKey + '/' + new Date().getTime() + '.' + (file.type).replace(/(image|application)\//, ''), /* required */
                Body: file,
                ContentType: file.type
            };
            _this.s3.putObject(params, function (err, data) {
                if (err) {
                    // console.log(err, err.stack) // an error occurred
                } else {
                    if(_this._options.target){
                        var _upDivP=_this._options.target.parentNode,_fDiv=document.createElement('div');
                        _fDiv.className='file-item file-item--' + format;
                        _fDiv.dataset.key=params.Key;
                        _fDiv.dataset.size=file.size;
                        _fDiv.dataset.type=format;
                        if(format==='image'){
                            _fDiv.innerHTML='<div class="file-item--bg"></div><div class="file-item__icon"><img alt="" src="{0}"></div><div class="file-item__name txt-ellipsis">{1}</div><div class="file-item__remove"><i class="iconfont icon-delete"></i></div>'.Format(clearImage(params.Key),file.name);
                        }else{
                            _fDiv.innerHTML='<div class="file-item--bg"></div><div class="file-item__icon"><img alt="" src="https://bio.linkcdn.cc/bio/links/icons/pdf.png"></div><div class="file-item__name txt-ellipsis">{0}</div><div class="file-item__remove"><i class="iconfont icon-delete"></i></div>'.Format(file.name);
                        }
                        _upDivP.appendChild(_fDiv);
                        _upDivP.querySelector('.form-field--loading').remove();
                        _upDivP.querySelector('.form-field-checkbox-title span').innerHTML='({0}/6)'.Format(_upDivP.querySelectorAll('.file-item').length);
                    }
                }
            });
        },
        _showLoading:function(){
            var _this=this;
            if(_this._options.target){
                var _upDivP=_this._options.target.parentNode,_fDiv=document.createElement('div');
                _fDiv.className='form-field--loading';
                _fDiv.innerHTML=getTmplInnerHtml('#embedLoading');
                _upDivP.appendChild(_fDiv);
            }
        },
    }
})(window);
(function(d, s) {
    var PlatformMaps={'7digital':'7digital','8tracks':'8tracks','amazon':'Amazon','amazonmusic':'Amazon Music','anghami':'Anghami','applemusic':'Apple Music',
        'audiomack':'Audiomack','awa':'AWA','bandcamp':'Bandcamp','beatport':'Beatport','bleep':'Bleep','boomplay':'Boomplay','boomkat':'Boomkat',bugs:'Bugs!',deezer:'Deezer',emusic:'eMusic',flo:'Flo',gaana:'Gaana',
        genie:'Genie',googleplay:'Google Play',groove:'Groove Music',hardwax:'Hard Wax',hdtracks:'HDtracks',iheartradio:'iHeartRadio',itunes:'iTunes',jiosaavn:'JioSaavn',joox:'JOOX',
        junodownload:'Juno Download',kkbox:'KKBOX',linemusic:'Line Music',melon:'Melon',mixcloud:'Mixcloud',mixerbox:'MixerBox',moov:'MOOV',napster:'Napster',pandora:'Pandora',patari:'PATARI',
        pulselocker:'Pulselocker',qobuz:'Qobuz',simfyafrica:'Simfy Africa',soundcloud:'SoundCloud',spotify:'Spotify',suamusica:'SuaMúsica',tidal:'Tidal',traxsource:'Traxsource',vevo:'Vevo',
        vibe:'Vibe',wasabeat:'Wasabeat',whatpeopleplay:'Whatpeopleplay',wimp:'Wimp',yandex:'Yandex Music',youseemusik:'youSee MUSIK',youtube:'YouTube',youtubemusic:'YouTube Music',zingmp3:'Zing MP3'};
    var APIHOST =  (function () {
        var apiVer='/v/3.5';
        var apihost=(document.querySelector('meta[property="api:host"]')?document.querySelector('meta[property="api:host"]').content:'https://api.instabio.cc')+apiVer;
        return apihost;
    }());
    if(!String.prototype.Format){
        String.prototype.Format = function() {
            var result = this;
            if (arguments.length > 0) {
                for (var i = 0; i < arguments.length; i++) {
                    if(arguments[i] == null) arguments[i]='';
                    var reg = new RegExp("(\\{" + i + "\\})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
            return result;
        };
    }
    if(!String.prototype.Compile){
        String.prototype.Compile = function(obj) {
            return this.replace(/\{([\w ]+)\}/g, function($1, $2) {
                return (obj != null ? obj[$2] : void 0) == undefined ? "" : obj[$2];
            });
        };
    }
    if(!String.prototype.CompileHash){
        String.prototype.CompileHash = function(obj) {
            return this.replace(/#([\w ]+)#/g, function($1, $2) {
                return (obj != null ? obj[$2] : void 0) == undefined ? "" : obj[$2];
            });
        };
    }
    var v = function(a, b, t) {
        t=t||d;
        t.addEventListener ? t.addEventListener(a, b, !1) : t.attachEvent && t.attachEvent("on" + a, b)
    };
    var eleParents=function(tar, selector) {
        if (selector && tar && tar.nodeName != 'HTML') {
            var _sel;
            if (selector.indexOf('.') != -1) {
                _sel = selector.split('.');
                if ((!_sel[0] || tar.nodeName == _sel[0].toUpperCase()) && tar.classList.contains(_sel[1])) {
                    return tar;
                } else {
                    return eleParents(tar.parentNode, selector);
                }
            } else if (selector.indexOf('#') != -1) {
                _sel = selector.split('#');
                if ((!_sel[0] || tar.nodeName == _sel[0].toUpperCase()) && tar.id == _sel[1]) {
                    return tar;
                } else {
                    return eleParents(tar.parentNode, selector);
                }
            } else {
                _sel = [selector];
                if (tar.nodeName.toUpperCase() == _sel[0].toUpperCase()) {
                    return tar;
                } else {
                    return eleParents(tar.parentNode, selector);
                }
            }
        } else {
            return null;
        }
    };
    function _format_color(color){
        if(!isEmpty(color)){
            if(typeof color == 'number') color = (color?color:'000000')+'';

            if(color.startsWith('rgba(')){
                var _color_val = color.replace('rgba(', '');

                if(_color_val.endsWith(')')) _color_val=_color_val.slice(0,-1);
                _color_val = _color_val.split(',');

                if(_color_val.length == 3) return 'rgba({0}, {1}, {2}, 1)'.Format(_color_val[0],_color_val[1],_color_val[2]);

                if(_color_val.length == 4) return 'rgba({0}, {1}, {2}, {3})'.Format(_color_val[0],_color_val[1],_color_val[2],_color_val[3]);

                return color;
            }

            if(color.startsWith('rgb(')){
                _color_val = color.replace('rgb(', '');

                if(_color_val.endsWith(')')) _color_val=_color_val.slice(0,-1);
                _color_val = _color_val.split(',');

                if(_color_val.length == 3) return 'rgb({0}, {1}, {2})'.Format(_color_val[0],_color_val[1],_color_val[2]);

                if(_color_val.length == 4) return 'rgba({0}, {1}, {2}, {3})'.Format(_color_val[0],_color_val[1],_color_val[2],_color_val[3]);

                return color
            }

            if(!color.startsWith('#')) return '#'+color;

            return color
        }
        return ''
    }
    function handlerFileUpload(evt, fUPDiv){
        if(!window.awsup){
            window.awsup=new AWSUPFile({target: fUPDiv});
        }else{
            awsup.config({target: fUPDiv});
        }
        awsup.trigger();
    }
    function handleSubmit(evt) {
        // subscribe, contact ..., subs email/sms
        if(evt.target.nodeName=="BUTTON"&&evt.target.parentElement.classList.contains('form-button')){
            var pTar=eleParents(evt.target,'.form-cust'),pSubs=eleParents(evt.target,'.bio-subs');
            var email='',_email='',_phone='';
            if(pTar){
                var data=[],error,field,sync=0,fullname='';
                Array.from(pTar.querySelectorAll('.error')).forEach(function (ele) {
                    ele.remove();
                });
                Array.from(pTar.querySelectorAll('.form-field')).forEach(function (ele) {
                    var _field=ele.querySelector('.data-field'),val={key:ele.dataset.param,required:parseInt(_field.dataset.required,10)};
                    switch (val.key) {
                        case 'email':
                            if(!sync) sync=parseInt(_field.dataset.sync,10);
                            email=_field.value;
                            val.value=_field.value;
                            val.title=_field.placeholder;
                            if(!isEmpty(val.value) && !isEmail(val.value)){
                                error='Please enter a valid email address';
                                ele.innerHTML+='<span class="error iconfont icon-warn">{0}</span>'.Format(error);
                            }else{
                                if(isEmpty(_email)) _email=_field.value;
                            }
                            break;
                        case 'input':
                            val.value=_field.value;
                            val.title=_field.placeholder;
                            if(isEmpty(fullname)) fullname=val.value;
                            break;
                        case 'phone':
                            val.value=_field.value;
                            val.title=_field.placeholder;
                            var _li=ele.querySelector('.dial-code-select li.selected');
                            if(!isEmpty(val.value) && !isPhone(val.value)){
                                error='Please enter a valid phone number';
                                ele.innerHTML+='<span class="error iconfont icon-warn">{0}</span>'.Format(error);
                            }else{
                                if(isEmpty(_phone)) _phone=_field.value;
                            }
                            if(_li){
                                val.dial=_li.dataset.dial;
                                val.country=_li.dataset.country;
                                val.countryCode=_li.dataset.code;
                                _phone=val.dial+' '+_phone;
                            }
                            break;
                        case 'dropdown':
                            val.value=_field.value;
                            val.title=_field.querySelector('option').innerText;
                            break;
                        case 'text':
                            val.value=_field.value;
                            val.title=_field.placeholder;
                            break;
                        case 'number':
                            val.value=_field.value;
                            val.title=_field.placeholder;
                            break;
                        case 'radio':
                            val.value=_field.querySelector('input:checked')?_field.querySelector('input:checked').value:'';
                            val.title=_field.querySelector('.form-field-radio-title').innerText;
                            break;
                        case 'checkbox':
                            val.title=_field.querySelector('.form-field-checkbox-title').innerText;
                            val.value=(function () {
                                var ret=[];
                                Array.from(_field.querySelectorAll('input:checked')).forEach(function (e) {
                                    ret.push(e.value);
                                });
                                return ret.join('lf:;');
                            })();
                            break;
                        case 'regions':
                            val.value=_field.value;
                            val.title=_field.querySelector('option').innerText;
                            break;
                        case 'date':
                            val.value=_field.value;
                            val.title=_field.placeholder;
                            break;
                        case 'time':
                            val.value=_field.value;
                            val.title=_field.placeholder;
                            break;
                        case 'file':
                            val.title=_field.querySelector('.form-field-checkbox-title').innerHTML.replace(/ <span>\(\d+\/\d+\)<\/span>/,'');
                            val.files=(function () {
                                var ret=[];
                                Array.from(_field.querySelectorAll('.file-item')).forEach(function (e) {
                                    ret.push({type:e.dataset.type,link:e.dataset.key,size:e.dataset.size,title:e.querySelector('.file-item__name').innerText});
                                });
                                return ret;
                            })();
                            break;
                    }
                    var errorSpan=null;
                    if(val.key=='file'){
                        if(val.required==1&&val.files.length==0){
                            error = 'This field can not be blank';
                            errorSpan=d.createElement('span');
                            errorSpan.className='error iconfont icon-warn';
                            errorSpan.innerText=error;
                            ele.appendChild(errorSpan);
                        }
                    }else if(val.required==1&&isEmpty(val.value)){
                        error = 'This field can not be blank';
                        errorSpan=d.createElement('span');
                        errorSpan.className='error iconfont icon-warn';
                        errorSpan.innerText=error;
                        ele.appendChild(errorSpan);
                    }
                    data.push(val);
                });
                if(error) return;
                var gRecaptcha,_invisible;
                if(pSubs){
                    gRecaptcha=pSubs.dataset.subtype;
                    _invisible='.subs';
                }else{
                    gRecaptcha=pTar.querySelector('textarea[name=g-recaptcha-response]').value;
                    _invisible=(pTar.querySelector('.g-recaptcha')||{dataset:{}}).dataset.size;
                    // _invisible=(_invisible&&_invisible=='invisible')?'.invisible':'';
                }
                var _submit=function() {
                    // _invisible=(pTar.querySelector('.g-recaptcha')||{dataset:{}}).dataset.size;
                    if(gRecaptcha&&gRecaptcha.indexOf('cmpt-sub-')>=0){
                    }else{
                        gRecaptcha=pTar.querySelector('textarea[name=g-recaptcha-response]').value;
                        _invisible=(_invisible&&_invisible=='invisible')?'.invisible':'';
                    }
                    if(_invisible=='.subs'){
                        let subsHas = JSON.parse(localStorage.getItem('visitorHasSubscribed')||'{}');
                        if(subsHas){
                            let _lnkSubs = subsHas[__data.bio.id] || {email:{},phone:{}};
                            let _emailSubs = _lnkSubs.email||{},_phoneSubs = _lnkSubs.phone||{};
                            if(_email){
                                if(_emailSubs[_email.toLowerCase()]){
                                    swal('','This email has already been subscribed. Please use a different one to subscribe again.','error');
                                    return;
                                }
                            }else if(_phone){
                                if(_phoneSubs[_phone.toLowerCase()]){
                                    swal('','This phone number has already been subscribed. Please use a different one to subscribe again.','error');
                                    return;
                                }
                            }
                        }
                    }
                    pTar.querySelector('.form-submit button').style.display='none';
                    pTar.querySelector('.form-submit').innerHTML+=getTmplInnerHtml('#embedLoading');
                    // var _invisible=(pTar.querySelector('.g-recaptcha')||{dataset:{}}).dataset.size;
                    // _invisible=(_invisible&&_invisible=='invisible')?'.invisible':''};
                    ibjax('POST','/share/link/{linkid}/submit/form{invisible}/'.Compile({linkid:__data.bio.id,invisible: _invisible}),
                        {data:{'fields':JSON.stringify(data),'sync':sync,'fullname':fullname,'email':_email,'g-recaptcha-response':gRecaptcha,'phone':_phone,
                        'title':pTar.querySelector('.form-title .data-field').innerText},
                            fn:function (resp) {
                                resp=JSON.parse(resp||'{}');
                                if(_invisible=='.subs'){
                                    let subsHas = JSON.parse(localStorage.getItem('visitorHasSubscribed')||'{}');
                                    if(subsHas){
                                        let _lnkSubs = subsHas[__data.bio.id] || {email:{},phone:{}};
                                        if(_email){
                                            _lnkSubs.email[_email.toLowerCase()] = {'email': _email.toLowerCase(),'username': fullname,'ts': Date.now()};
                                        }else if(_phone){
                                            _lnkSubs.phone[_phone.toLowerCase()] = {'phone': _phone.toLowerCase(),'username': fullname,'ts': Date.now()};
                                        }
                                        subsHas[__data.bio.id] = _lnkSubs;
                                        localStorage.setItem('visitorHasSubscribed',JSON.stringify(subsHas));
                                    }
                                }
                                if(resp.code==0){
                                    pTar.querySelector('.form-success').style.display='flex';
                                    pTar.querySelector('.form-title').remove();
                                    pTar.querySelector('.form-fields-group').remove();
                                    pTar.querySelector('.form-fields-actions').remove();
                                }
                            }});
                };
                if(!gRecaptcha){
                    grecaptcha.execute(pTar.querySelector('.g-recaptcha').dataset.opt_widget_id).then(function () {
                        lglrpval(pTar).then(function () {
                            _submit();
                        });
                    }).catch(function () {
                        pTar.querySelector('.g-recaptcha').style.opacity=1;
                    });
                }else{
                    _submit();
                }
                return;
            }
            pTar=evt.target.parentElement.parentElement.parentElement;
            email = pTar.querySelector('input[name=email]').value.trim();
            var regEmail = /\w+([\w.-])*@[\w-]+\.\w+[.|\w]*/;
            if (regEmail.test(email) == false) {
                swal('','Invalid email address','error');
                return false;
            }
            var _thanks_html=`<div class="form-success"><div class="form-success-tips"><span class="iconfont icon-selected"></span>
    </div><div class="form-thanks" data-param="thanks_text"><span>{0}</span></div></div>`;
            if(pTar.classList.contains('form-subscribe')){
                pTar.querySelector('.form-submit button').style.display='none';
                pTar.querySelector('.form-submit').innerHTML+=getTmplInnerHtml('#embedLoading');
                ibjax('POST','/share/link/{linkid}/submit/subscribe/'.Compile({linkid:__data.bio.id}),
                    {data:['email='+email,'name='+pTar.querySelector('input[name=fullname]').value,'title='+pTar.querySelector('.form-title span').innerHTML],
                        fn:function (resp) {
                            resp=JSON.parse(resp||'{}');
                            if(resp.code==0){
                                var _thanks_text=pTar.querySelector('.form-thanks span').innerText;
                                pTar.innerHTML=_thanks_html.Format(_thanks_text);
                            }
                        }})
            }
            if(pTar.classList.contains('form-contact')){
                pTar.querySelector('.form-submit button').style.display='none';
                pTar.querySelector('.form-submit').innerHTML+=getTmplInnerHtml('#embedLoading');
                ibjax('POST','/share/link/{linkid}/submit/contact/'.Compile({linkid:__data.bio.id}),
                    {data:['email='+email,'name='+pTar.querySelector('input[name=fullname]').value,
                            'message='+pTar.querySelector('textarea[name=message]').value,'title='+pTar.querySelector('.form-title span').innerHTML],
                        fn:function (resp) {
                            resp=JSON.parse(resp||'{}');
                            // if(resp.code==0) pTar.querySelector('.form-thanks').style.display='block';
                            if(resp.code==0){
                                var _thanks_text=pTar.querySelector('.form-thanks span').innerText;
                                pTar.innerHTML=_thanks_html.Format(_thanks_text);
                            }
                        }})
            }
            if(pTar.classList.contains('form-feedback')){
                var _services=pTar.querySelector('.form-service .service-options li.selected');
                if (!_services){
                    swal('',decodeURIComponent(pTar.querySelector('.form-service span').dataset.service),'error');
                    return false;
                }
                pTar.querySelector('.form-submit button').style.display='none';
                pTar.querySelector('.form-submit').innerHTML+=getTmplInnerHtml('#embedLoading');
                ibjax('POST','/share/link/{linkid}/submit/feedback/'.Compile({linkid:__data.bio.id}),
                    {data:['email='+email,'name='+pTar.querySelector('input[name=fullname]').value,'service='+decodeURIComponent(pTar.querySelector('.form-service span').dataset.service),
                            'phone='+pTar.querySelector('input[name=phone]').value,'message='+pTar.querySelector('textarea[name=message]').value,
                            'subject='+_services.querySelector('span').innerHTML,'title='+pTar.querySelector('.form-title span').innerHTML],
                        fn:function (resp) {
                            resp=JSON.parse(resp||'{}');
                            if(resp.code==0){
                                var _thanks_text=pTar.querySelector('.form-thanks span').innerText;
                                pTar.innerHTML=_thanks_html.Format(_thanks_text);
                            }
                        }})
            }
            if(pTar.classList.contains('form-appl')){
                var _services=pTar.querySelector('.form-service .service-options li.selected');
                if (!_services){
                    swal('',decodeURIComponent(pTar.querySelector('.form-service span').dataset.service),'error');
                    return false;
                }
                pTar.querySelector('.form-submit button').style.display='none';
                pTar.querySelector('.form-submit').innerHTML+=getTmplInnerHtml('#embedLoading');
                ibjax('POST','/share/link/{linkid}/submit/appl/'.Compile({linkid:__data.bio.id}),
                    {data:['email='+email,'name='+pTar.querySelector('input[name=fullname]').value,'service='+decodeURIComponent(pTar.querySelector('.form-service span').dataset.service),
                            'phone='+pTar.querySelector('input[name=phone]').value,'message='+pTar.querySelector('textarea[name=message]').value,
                            'subject='+_services.querySelector('span').innerHTML,'title='+pTar.querySelector('.form-title span').innerHTML],
                        fn:function (resp) {
                            resp=JSON.parse(resp||'{}');
                            if(resp.code==0){
                                var _thanks_text=pTar.querySelector('.form-thanks span').innerText;
                                pTar.innerHTML=_thanks_html.Format(_thanks_text);
                            }
                        }})
            }
            if(pTar.classList.contains('form-quote')){
                var _services=pTar.querySelector('.form-service .service-options li.selected');
                if (!_services){
                    swal('',decodeURIComponent(pTar.querySelector('.form-service span').dataset.service),'error');
                    return false;
                }
                pTar.querySelector('.form-submit button').style.display='none';
                pTar.querySelector('.form-submit').innerHTML+=getTmplInnerHtml('#embedLoading');
                ibjax('POST','/share/link/{linkid}/submit/quote/'.Compile({linkid:__data.bio.id}),
                    {data:['email='+email,'name='+pTar.querySelector('input[name=fullname]').value,'service='+decodeURIComponent(pTar.querySelector('.form-service span').dataset.service),
                            'phone='+pTar.querySelector('input[name=phone]').value,'message='+pTar.querySelector('textarea[name=message]').value,
                            'subject='+_services.querySelector('span').innerHTML,'title='+pTar.querySelector('.form-title span').innerHTML],
                        fn:function (resp) {
                            resp=JSON.parse(resp||'{}');
                            if(resp.code==0){
                                var _thanks_text=pTar.querySelector('.form-thanks span').innerText;
                                pTar.innerHTML=_thanks_html.Format(_thanks_text);
                            }
                        }})
            }
            if(pTar.classList.contains('form-appt')){
                var _preferredDate=pTar.querySelector('#tmpl-form-date'),_preferredTime=pTar.querySelector('#tmpl-form-time');
                if(!(parseInt(_preferredDate.innerHTML)&&parseInt(_preferredDate.innerHTML))){
                    swal('', 'Please Select Preferred Datetime','error');
                    return false;
                }
                pTar.querySelector('.form-submit button').style.display='none';
                pTar.querySelector('.form-submit').innerHTML+=getTmplInnerHtml('#embedLoading');
                ibjax('POST','/share/link/{linkid}/submit/appt/'.Compile({linkid:__data.bio.id}),
                    {data:['email='+email,'name='+pTar.querySelector('input[name=fullname]').value,
                            'phone='+pTar.querySelector('input[name=phone]').value,'message='+pTar.querySelector('textarea[name=message]').value,
                            'preferred='+_preferredDate.innerHTML+' '+_preferredTime.innerHTML,'title='+pTar.querySelector('.form-title span').innerHTML],
                        fn:function (resp) {
                            resp=JSON.parse(resp||'{}');
                            if(resp.code==0){
                                var _thanks_text=pTar.querySelector('.form-thanks span').innerText;
                                pTar.innerHTML=_thanks_html.Format(_thanks_text);
                            }
                        }})
            }
            if(pTar.classList.contains('form-rsvp')){
                var _services=pTar.querySelector('.form-option .option-cycle.selected');
                if (!_services){
                    swal('',pTar.querySelector('.form-service span').innerText,'error');
                    return false;
                }
                pTar.querySelector('.form-submit button').style.display='none';
                pTar.querySelector('.form-submit').innerHTML+=getTmplInnerHtml('#embedLoading');
                ibjax('POST','/share/link/{linkid}/submit/rsvp/'.Compile({linkid:__data.bio.id}),
                    {data:['email='+email,'name='+pTar.querySelector('input[name=fullname]').value,'subject='+_services.innerHTML,
                            'service='+pTar.querySelector('.form-service span').innerText,'title='+pTar.querySelector('.form-title span').innerHTML],
                        fn:function (resp) {
                            resp=JSON.parse(resp||'{}');
                            if(resp.code==0){
                                var _thanks_text=pTar.querySelector('.form-thanks span').innerText;
                                pTar.innerHTML=_thanks_html.Format(_thanks_text);
                            }
                        }})
            }
        }
    }
    function handlerBlockSearch(fte){
        var _input=eleParents(fte,'.block-search--button').querySelector('input'),_boxP,items=null;
        if(fte.nodeName=='I'||fte.classList.contains('btn-icons--remove')||_input.value==''){
            // _input=eleParents(fte,'.btn-search').querySelector('input');
            _input.value='';
            _boxP = eleParents(fte, '.block-search').parentElement;
            if(_boxP.dataset.type==10){
                items=_boxP.querySelectorAll('.button-item ')
            }else if(_boxP.dataset.type==19){
                items=_boxP.querySelectorAll('li.item')
            }
            (items||[]).forEach(function (ele) {
                ele.classList.remove('hidden');
            })
            if(_boxP.querySelector('.no-result')) _boxP.querySelector('.no-result').remove();
            return;
        }
        var _fbe=eleParents(fte,'svg')||fte;
        if(_fbe&&_fbe.nodeName.toUpperCase()=='SVG'||_fbe.nodeName.toUpperCase()=='INPUT'){
            // _input=eleParents(fte,'.block-search--button').querySelector('input');
            var _iVal=(_input.value||'').trim();
            if(_iVal.length==0) return;
            _boxP = eleParents(fte, '.block-search').parentElement;
            var _noresult=true,_noNode='div',_noEle=null;
            if(_boxP.dataset.type==10){
                items=_boxP.querySelectorAll('.button-item ');
            }else if(_boxP.dataset.type==19){
                items=_boxP.querySelectorAll('li.item');
                _noNode='li';
            }
            (items||[]).forEach(function (ele) {
                let txt = ele.querySelector('.btn-text')||ele.querySelector('.cmpt-graphic--txt');
                if(txt) txt = txt.innerText;
                if((txt||'').toLowerCase().indexOf(_iVal.toLowerCase())!=-1){
                    ele.classList.remove('hidden');
                    _noresult=false;
                }else{
                    ele.classList.add('hidden');
                }
            })
            if(_noresult){
                _noEle=d.createElement(_noNode);
                var _noresultSVG=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 136 136.00030517578125"><g><g><g><path d="M21.57867624206543,63.9383339881897C21.26117624206543,41.6539339881897,39.20637624206543,23.336133988189697,61.66137624206543,23.0185339881897C62.04387624206543,23.013333988189697,62.42647624206543,23.013333988189697,62.81157624206543,23.0185339881897C72.60647624206543,23.0185339881897,81.55307624206543,26.4971339881897,88.56357624206542,32.2303339881897C88.56357624206542,32.2303339881897,100.13067624206543,20.753633988189698,100.13067624206543,20.753633988189698C99.09237624206543,19.849833988189697,98.02547624206542,18.964033988189698,96.90127624206544,18.129833988189695C71.72167624206543,-0.554596011810303,36.04987624206543,4.553603988189698,17.22247624206543,29.539333988189696C9.86324624206543,39.306433988189696,5.88697624206543,51.175633988189695,5.88697624206543,63.370233988189696C5.88697624206543,77.5481339881897,11.19820624206543,90.4632339881897,19.89497624206543,100.3775339881897C19.89497624206543,100.3775339881897,31.12377624206543,89.2340339881897,31.12377624206543,89.2340339881897C25.31027624206543,82.3774339881897,21.71657624206543,73.59953398818969,21.57867624206543,63.9383339881897C21.57867624206543,63.9383339881897,21.57867624206543,63.9383339881897,21.57867624206543,63.9383339881897Z" fill-opacity="1"/></g><g><path d="M133.62448588256837,122.22816554565429C133.62448588256837,122.22816554565429,110.04268588256836,98.8305655456543,110.04268588256836,98.8305655456543C109.09288588256835,97.8879655456543,108.99398588256835,96.4211655456543,109.75388588256835,95.3235655456543C121.27148588256836,78.67926554565429,122.55958588256836,57.9004655456543,114.80228588256836,40.5046855456543C114.01118588256836,38.7279205456543,111.67948588256836,38.2682295456543,110.29768588256836,39.6421245456543C110.29768588256836,39.6421245456543,102.73818588256836,47.1443055456543,102.73818588256836,47.1443055456543C101.26268588256836,48.60858554565429,101.04148588256837,49.6932655456543,101.37718588256837,50.6900655456543C102.71728588256836,54.6800655456543,103.47198588256836,58.9334655456543,103.47198588256836,63.370165545654295C103.47198588256836,85.6572655456543,85.26648588256836,103.7218655456543,62.81158588256836,103.7218655456543C62.81158588256836,103.7218655456543,62.81158588256836,103.7141655456543,62.81158588256836,103.7141655456543C58.28878588256836,103.77606554565429,53.94308588256836,103.0736655456543,49.86268588256836,101.7720655456543C48.86598588256836,101.4518655456543,47.78087588256836,101.6842655456543,47.03922588256836,102.4202655456543C47.03922588256836,102.4202655456543,38.86030288256836,110.5370655456543,38.86030288256836,110.5370655456543C37.48370488256836,111.90326554565429,37.92609188256836,114.2197655456543,39.70603588256836,115.0048655456543C46.76598588256836,118.12456554565429,54.58318588256836,119.86256554565429,62.81158588256836,119.86256554565429C74.32138588256836,119.86256554565429,85.54238588256837,116.39936554565429,95.00678588256835,109.9586655456543C96.11538588256836,109.20456554565429,97.59608588256836,109.30266554565429,98.54588588256836,110.24526554565429C98.54588588256836,110.24526554565429,122.10938588256836,133.6298655456543,122.10938588256836,133.6298655456543C125.28158588256836,136.7856655456543,130.43148588256835,136.7908655456543,133.61138588256836,133.6427655456543C136.79138588256836,130.4921655456543,136.79658588256837,125.38136554565429,133.62448588256837,122.22816554565429C133.62448588256837,122.22816554565429,133.62448588256837,122.22816554565429,133.62448588256837,122.22816554565429Z" fill-opacity="1"/></g><g><path d="M127.592,4.3625C127.592,4.3625,123.96,0.757319,123.96,0.757319C122.942,-0.25244,121.295,-0.25244,120.28,0.757319C120.28,0.757319,100.131,20.7537,100.131,20.7537C100.131,20.7537,88.5636,32.2303,88.5636,32.2303C88.5636,32.2303,31.1238,89.234,31.1238,89.234C31.1238,89.234,19.895,100.378,19.895,100.378C19.895,100.378,0.763115,119.367,0.763115,119.367C-0.254372,120.374,-0.254372,122.009,0.763115,123.018C0.763115,123.018,4.39588,126.624,4.39588,126.624C5.41337,127.633,7.0606,127.633,8.07808,126.624C8.07808,126.624,127.592,8.01675,127.592,8.01675C128.61,7.00699,128.61,5.37226,127.592,4.3625C127.592,4.3625,127.592,4.3625,127.592,4.3625Z" fill-opacity="1"/></g></g></g></svg>`;
                if(_boxP.dataset.type==10){
                    _noEle.className='button-item no-result';
                    _noEle.innerHTML='<div class="item item-style"><div class="ctm-style"><div class="no-result--show btn"><div class="no-result--icon">{0}</div><div class="no-result--text">No results found</div></div></div></div>'.Format(_noresultSVG);
                    _boxP.appendChild(_noEle);
                }else{
                    _noEle.className='item item-style no-result';
                    _noEle.innerHTML=`<div class="ctm-style"><div class="no-result--show btn cmpt-graphic--txt"><div class="no-result--icon">{0}</div><div class="no-result--text">No results found</div></div></div>`.Format(_noresultSVG);
                    _boxP.querySelector('ul').appendChild(_noEle);
                }
            }
            return;
        }
    }
    function lglrpjs(e) {
        return new Promise((function(t) {
            (function n(){
                var r = (e.grecaptcha||{}).execute;
                "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
            }())
        }))
    }
    function lglrpval(ele) {
        return new Promise((function(t) {
            (function n(){
                var r = ele.querySelector('[name=g-recaptcha-response]')?ele.querySelector('[name=g-recaptcha-response]').value:'';
                '' === r ? window.requestAnimationFrame(n) : (t(ele))
            }())
        }))
    }
    function lstripejs(e){
        return new Promise((function(t) {
            (function n(){
                var r = e.Stripe;
                "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
            }())
        }))
    }
    function lpaypaljs(e){
        return new Promise((function(t) {
            (function n(){
                var r = e.paypal;
                "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
            }())
        }))
    }
    function lfbvideo(ele) {
        return new Promise((function(t) {
            (function n(){
                var r = ele.querySelector('iframe');
                !r ? window.requestAnimationFrame(n) : (t(ele))
            }())
        }))
    }
    function endLoaded(loadEle,endfn) {
        if (loadEle instanceof Node || loadEle instanceof HTMLElement) {
            loadEle.remove();
        }else if(typeof loadEle == 'string'){
            if(d.querySelector(loadEle)) d.querySelector(loadEle).remove();
        }
        if(endfn&&typeof endfn == 'function'){
            endfn();
        }
    }
    function onloadCallback(eleId) {
        var html_element='html_element';
        if(eleId) html_element+=eleId;
        var opt_widget_id = grecaptcha.render(html_element, {
            'sitekey' : '6LcifCQfAAAAAAmVOIvuKi4OZxl3EnYlH-4XMT73',
            'callback' : onSubmit,
        });
        d.querySelector('#'+html_element).dataset.opt_widget_id=opt_widget_id;
    }
    function formUITmpl(_fbe,_fc) {
        var _cssDom=d.querySelector('#lnk-form-tmpl'),_tmpl=null;
        if(_fbe.dataset.path){
            if(!_cssDom){
                _cssDom=d.createElement('link');
                _cssDom.id='lnk-form-tmpl';
                _cssDom.rel='stylesheet';
                _cssDom.type='text/css';
                d.head.appendChild(_cssDom);
            }
            _cssDom.href='https://bio.linkcdn.cc/instabio.cc/static/tmpl/form/'+_fbe.dataset.path+'.css?t=1641779804599';
        }else{
            if(_cssDom) _cssDom.remove();
        }
        var _style=d.querySelector('#style-form-tmpl'),_css='';
        if(_style) _style.remove();
        _style=d.createElement('style');
        _style.id='style-form-tmpl';
        _style.type='text/css';
        d.querySelector('head').appendChild(_style);
        var __form=JSON.parse(decodeURIComponent(_fbe.dataset.txt||'')||'{}');
        if(__form.color) _css+='--form-tmpl-color:'+_format_color(__form.color)+';';
        if(__form.radius) _css+='--form-tmpl-radius:calc(var(--form-tmpl-height-default) * '+__form.radius+' / 100);';
        if(__form.font) _css+='--form-tmpl-font:"'+__form.font+'";';
        _style.innerHTML=getTmplInnerHtml('#form-tmpl-css').Compile({css:_css});
        var tmpl=d.querySelector('#tmplHTML').content.querySelector('#form-tmpl-'+_fbe.dataset.st);
        if(tmpl){
            _tmpl=_fc.querySelector('.form-tmpl');
            if(_fbe.dataset.kid==(_tmpl ? _tmpl.dataset.kid : '')){
                _fc.style.display='block';
                _tmpl.classList.remove('animate__fadeOutDown');
                _tmpl.classList.add('animate__fadeInUp');
                return true;
            }
            _fc.innerHTML=getTmplInnerHtml('#form-tmpl-ct');
            _tmpl=_fc.querySelector('.form-tmpl');
            if(_fbe.dataset.st==7){
                var tmplOption=getTmplInnerHtml('#form-tmpl-7-option');
                __form.options='';
                (__form.services||[]).forEach(function(val,idx){
                    __form.options+=tmplOption.Compile({text:val,idx:idx});
                });
                _tmpl.innerHTML+=tmpl.innerHTML.Compile(__form);
            }else{
                if(__form.services&&__form.services.length>0){
                    __form.lis='';
                    var tmplOption=getTmplInnerHtml('#form-tmpl-service-option');
                    (__form.services||[]).forEach(function(val,idx){
                        __form.lis+=tmplOption.Compile({text:val});
                    });
                    __form.serviceEncode=encodeURIComponent(__form.service||'');
                }
                _fc.querySelector('.form-tmpl').innerHTML+=tmpl.innerHTML.Compile(__form);
            }
            _fc.style.display='block';
            if(d.querySelector('.tmpl-bg')) d.querySelector('.tmpl-bg').style.display='block';
            if(_fbe.dataset.st==6){
                var start={},end={};
                if(!d.querySelector('#jedate-js')){
                    var fjs=d.getElementsByTagName(s)[0];
                    var _link=d.createElement('link');
                    _link.rel='stylesheet';
                    _link.type='text/css';
                    _link.href='https://bio.linkcdn.cc/instabio.cc/static/vendor/jedate/jedate.css';
                    fjs.parentNode.insertBefore(_link, fjs);
                    var js=d.createElement(s);
                    js.id='jedate-js';
                    js.async=!0;
                    js.src='https://bio.linkcdn.cc/instabio.cc/static/vendor/jedate/jedate.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }
                lsdkjs(window, 'jeDate').then(function () {
                    jeDate("#tmpl-form-date",{
                        isinitVal:false,
                        initDate:[{DD:"0"},true],
                        festival: false,
                        format: 'YYYY-MM-DD',
                        clearfun:function () {
                            var _span = d.querySelector('#tmpl-form-date');
                            _span.innerHTML=_span.dataset.placeholder;
                        },
                    });
                    d.querySelector('#tmpl-form-date').dataset.dateval=jeDate.nowDate();
                    jeDate("#tmpl-form-time",{
                        isinitVal:false,
                        festival: false,
                        format: 'hh:mm:ss',
                        clearfun:function () {
                            var _span = d.querySelector('#tmpl-form-time');
                            _span.innerHTML=_span.dataset.placeholder;
                        },
                    });
                });
            }
        }
    }
    function formUICust(_fbe,_fc,eleId) {
        var _divDetail=d.createElement('div');
        _divDetail.className='embed-form-box';
        _fc.innerHTML=getTmplInnerHtml('#form-tmpl-ct');
        _fc.querySelector('.form-tmpl').classList.add('form-cust');
        _fc.querySelector('.form-cust').appendChild(_divDetail);
        _divDetail.innerHTML=getTmplInnerHtml('#form-detail').Format(location.pathname.substring(1),eleId);
        var __form=JSON.parse(decodeURIComponent(_fbe.dataset.txt||'')||'{}');
        var _config = new FormThemeConfig(__form.themes,'form-tmpl-container');
        _config.as_css();
        _divDetail.querySelector('.form-title .data-field').innerHTML=__form.title||'';
        _divDetail.querySelector('.form-button .data-field').innerHTML=__form.submit.btn_text||'';
        _divDetail.querySelector('.form-thanks span').innerHTML=__form.submit.thanks_text||'';
        var _fieldsGroup=_divDetail.querySelector('.form-fields-group');
        __form.fields.forEach(function (item,idx) {
            if(['email', 'input', 'phone', 'text', 'regions', 'date', 'time', 'number','file'].includes(item.key)){
                _fieldsGroup.innerHTML+=getTmplInnerHtml('#form-field-'+item.key).Compile({idx:idx,title:item.title+(item.required==1?' *':''),required:item.required||0,sync:item.sync||0})
            }
            if(item.key=='dropdown'){
                _fieldsGroup.innerHTML+=getTmplInnerHtml('#form-field-'+item.key).Compile({idx:idx,title:item.title+(item.required==1?' *':''),required:item.required||0,
                    options:(function () {
                        var ret='',tmpl='<option value="{0}">{0}</option>';
                        (item.services||[]).forEach(function (v,i) {
                            ret+=tmpl.Format(v);
                        });
                        return ret;
                    })()})
            }
            if(['radio', 'checkbox'].includes(item.key)){
                _fieldsGroup.innerHTML+=getTmplInnerHtml('#form-field-'+item.key).Compile({idx:idx,title:item.title+(item.required==1?' *':''),required:item.required||0,
                options:(function () {
                    var ret='',name=item.key+parseInt((Math.random()*1000000),10),tmpl=getTmplInnerHtml('#form-field-'+item.key+'-option');
                    (item.services||[]).forEach(function (v,i) {
                        ret+=tmpl.Compile({id:item.key+parseInt((Math.random()*1000000000),10),name:name,option:v});
                    });
                    return ret;
                })()})
            }
        });
        _fc.style.display='block';
        if(d.querySelector('.tmpl-bg')) d.querySelector('.tmpl-bg').style.display='block';
        Array.from(_fc.querySelectorAll('.form-field-phone')).forEach(function (ele,i) {
            v('click',function (e) {
                var _select=eleParents(e.target,'.form-field-phone').querySelector('.dial-code-select');
                if(_select.style.display=='block'){
                    _select.style.display='none';
                }else{
                    _select.style.display='block';
                }
            },ele.querySelector('.dial-code'));
            v('click',function (e) {
                if(eleParents(e.target, 'ul').querySelector('.selected')) eleParents(e.target, 'ul').querySelector('.selected').classList.remove('selected');
                var _li=eleParents(e.target, 'li');
                _li.classList.add('selected');
                eleParents(e.target,'.form-field-phone').querySelector('.dial-code span').innerText=_li.dataset.dial;
                eleParents(e.target, '.dial-code-select').style.display='none';
            },ele.querySelector('.dial-code-select ul'))
        });
        if(_fc.querySelector('.form-field-date')||_fc.querySelector('.form-field-time')){
            if(!d.querySelector('#jedate-js')){
                var fjs=d.getElementsByTagName(s)[0];
                var _link=d.createElement('link');
                _link.rel='stylesheet';
                _link.type='text/css';
                _link.href='https://bio.linkcdn.cc/instabio.cc/static/vendor/jedate/jedate.css';
                fjs.parentNode.insertBefore(_link, fjs);
                var js=d.createElement(s);
                js.id='jedate-js';
                js.async=!0;
                js.src='https://bio.linkcdn.cc/instabio.cc/static/vendor/jedate/jedate.js';
                fjs.parentNode.insertBefore(js, fjs);
            }
            lsdkjs(window, 'jeDate').then(function () {
                Array.from(_fc.querySelectorAll('.form-field-date')).forEach(function (ele,idx) {
                    jeDate(ele.querySelector('input'),{
                        isinitVal:false,
                        initDate:[{DD:"0"},true],
                        festival: false,
                        format: 'YYYY-MM-DD',
                    });
                    ele.dataset.dateval=jeDate.nowDate();
                });
                Array.from(_fc.querySelectorAll('.form-field-time')).forEach(function (ele,idx) {
                    jeDate(ele.querySelector('input'),{
                        isinitVal:false,
                        festival: false,
                        format: 'hh:mm:ss',
                    });
                });
            });
        }
        if(!d.querySelector('#grecaptcha-js')){
            var js1=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
            js1.id='grecaptcha-js';
            js1.async=!0;
            js1.src='https://www.recaptcha.net/recaptcha/api.js?render=explicit';
            fjs.parentNode.insertBefore(js1, fjs);
        }
        lglrpjs(window).then(function () {
            onloadCallback(eleId);
        })
    }
    window.saveContacts = function (that) {
        var elementA = document.createElement('a');
        elementA.download =  location.pathname.substring(1)+".vcf";
        // elementA.style.display = 'none';
        elementA.targent = "_blank";
        var bP=eleParents(that,'.embed-contact');
        var txt=JSON.parse(decodeURIComponent(bP.dataset.txt)||'{}'),vCard=`BEGIN:VCARD\nVERSION:3.0`;
        if(txt.firstName||txt.lastName){
            vCard+='\nN:{0}{1};'.Format(txt.lastName?txt.lastName+';':'',txt.firstName);
        }
        if(txt.organization) vCard+='\nORG:'+txt.organization;
        if(txt.position) vCard+='\nTITLE:'+txt.position;
        if(txt.emailPrimary) vCard+='\nEMAIL;TYPE={0}:{1}'.Format(txt.emailPrimaryType.toLowerCase(),txt.emailPrimary);
        if(txt.emailSecondary) vCard+='\nEMAIL;TYPE={0}:{1}'.Format(txt.emailSecondaryType.toLowerCase(),txt.emailSecondary);
        if(txt.phonePrimary) vCard+='\nTEL;TYPE={0}:{1}'.Format(txt.phonePrimaryType.toLowerCase(),txt.phonePrimary);
        if(txt.phoneSecondary) vCard+='\nTEL;TYPE={0}:{1}'.Format(txt.phoneSecondaryType.toLowerCase(),txt.phoneSecondary);
        if(txt.address1||txt.address2||txt.city||txt.state||txt.country||txt.postcode){
            var _tmpl0='';
            if(txt.address1) _tmpl0+=txt.address1+';';
            if(txt.address2) _tmpl0+=txt.address2+';';
            if(txt.city) _tmpl0+=txt.city+';';
            if(txt.state) _tmpl0+=txt.state+';';
            if(txt.country) _tmpl0+=txt.country+';';
            if(txt.postcode) _tmpl0+=txt.postcode+';';
            _tmpl0.replace(/;$/, '');
            vCard+='\nADR;:;;'+_tmpl0;
        }
        vCard+='\nURL;TYPE=Linkbio:'+location.href;
        if(txt.note) vCard+='\nNOTE:'+txt.note;
        vCard+='\nEND:VCARD';
        var blob = new Blob([vCard],{type: "text/vcard"});
        var _url=URL.createObjectURL(blob);
        elementA.href = _url;
        document.body.appendChild(elementA);
        elementA.dispatchEvent(new MouseEvent("click",{bubbles: !0,cancelable: !0,view: window}));
        document.body.removeChild(elementA);
        URL.revokeObjectURL(_url);
    };
    var selectSupportAmount=function(e){
        var _fbe=e.target||e.srcElement||{};
        if(_fbe.nodeName=='INPUT'){
            var _fbeP=null,_value;
            if(_fbe.type=='radio'){
                _fbeP=eleParents(_fbe,'.amount-select');
                if(_fbeP.querySelector('div .selected')) _fbeP.querySelector('div .selected').classList.remove('selected');
                _fbe.parentElement.parentElement.querySelector('.amount-select-label').classList.add('selected');
                _value=parseInt(_fbe.value||'0', 10)/100.0;
            }else if(_fbe.type=='number'){
                _fbeP=eleParents(_fbe,'.support-amount');
                if(_fbeP.querySelector('div .selected')){
                    _fbeP.querySelector('div .selected').classList.remove('selected');
                    _fbeP.querySelector('input[type=radio]:checked').removeAttribute('checked');
                }
                _value=parseFloat(_fbe.value||'0');
            }
            if(_value<1000.0){
                _fbeP = eleParents(_fbe,'.embed-support');
                if(_fbe.value>0){_fbeP.querySelector('.support-continue button').removeAttribute('disabled');}
                else{eleParents(_fbe,'.embed-support').querySelector('.support-continue button').setAttribute('disabled',true);}
                if(_fbeP.querySelector('.embed-support-error')) _fbeP.querySelector('.embed-support-error').remove();
            }else{
                if(!_fbeP.querySelector('.embed-support-error')){
                    var errP=d.createElement('p');
                    errP.innerHTML='This amount is too high, please set a lower amount';
                    errP.className='embed-support-error';
                    _fbeP.querySelector('.support-amount-custom').appendChild(errP);
                }
                eleParents(_fbe,'.embed-support').querySelector('.support-continue button').setAttribute('disabled',true);
            }
        }
    };
    var payContinue=function(e){
        var _fbe=e.target||e.srcElement||{};
        var _embedBox=eleParents(_fbe, '.embed-support');
        if(_embedBox){
            _embedBox.querySelector('.embed-box').style.display='none';
            _embedBox.querySelector('.embed-support-detail').style.display='block';
            var amount=0;
            if(_embedBox.querySelector('.embed-box .selected')){
                amount=parseInt(_embedBox.querySelector('.embed-box input[name=amount]:checked').value)/100.0;
            }else{
                amount=parseInt(parseFloat(_embedBox.querySelector('.amount-custom-input').value)*100,10)/100.0;
            }
            _embedBox.querySelector('.embed-support-detail .support-detail-amount').innerHTML=amount;
        }
    },payContinueGifts=function (fbe,amount){
        var _embedBox=eleParents(fbe, '.embed-support');
        if(_embedBox){
            _embedBox.querySelector('.embed-box').style.display='none';
            _embedBox.querySelector('.embed-support-detail').style.display='block';
            _embedBox.querySelector('.embed-support-detail .support-detail-amount').innerHTML=amount;
        }
    };
    var payBack=function(e){
        var _fbe=e.target||e.srcElement||{};
        var _embedBox=eleParents(_fbe, '.embed-support');
        if(_embedBox){
            _embedBox.querySelector('.embed-box').style.display='block';
            _embedBox.querySelector('.embed-support-detail').style.display='none';
        }
    };
    var paySupportCheckEmail=function(e){
        var _fbe=e.target||e.srcElement||{};
        var email = _fbe.value.trim();
        var regEmail = /\w+([\w.-])*@[\w-]+\.\w+[.|\w]*/;
        if (regEmail.test(email) == false) {
            eleParents(_fbe, '.embed-support-detail').querySelector('.support-continue button').setAttribute('disabled',true);
        }else{
            eleParents(_fbe, '.embed-support-detail').querySelector('.support-continue button').removeAttribute('disabled');
        }
    };
    function _initStripeConf(fbe){
        var stripe = Stripe(fbe.dataset.key);
        // Create an instance of Elements.
        var elements = stripe.elements({locale: (navigator.language||navigator.userLanguage).substring(0,2)||'en'});
        // Custom styling can be passed to options when creating an Element.
        // (Note that this demo uses a wider set of styles than the guide below.)
        var style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#c2c2c2'
                }
            },
            invalid: {
                color: '#f15e48',
                iconColor: '#f15e48'
            }
        };
        var card = elements.create('card', {style: style});
        card.addEventListener('change', function (event) {
            var displayError = eleParents(fbe,'.pay-element').querySelector('.pay-stripe #card-errors');
            // var button = document.getElementById('payment-button');
            // button.disabled = (!event.complete || event.error);
            if (event.error) {
                displayError.textContent = event.error.message;
                fbe.setAttribute('disabled', true);
            } else {
                displayError.textContent = '';
            }
            if(event.complete){
                eleParents(fbe,'.pay-element').querySelector('.pay-stripe .support-continue button').removeAttribute('disabled');
            }else{
                eleParents(fbe,'.pay-element').querySelector('.pay-stripe .support-continue button').setAttribute('disabled', true);
            }
        });
        // id, class, element
        card.mount(eleParents(fbe,'.pay-element').querySelector('.pay-stripe #card-element'));
        // Handle form submission.
        var form = eleParents(fbe,'.pay-element').querySelector('.pay-stripe #payment-form');

        return {stripe:stripe,card:card,form:form};
    }
    var paySupportStripe=function (fbe) {
        var _stripeConf=_initStripeConf(fbe);
        _stripeConf.form.addEventListener('submit', function (event) {
            event.preventDefault();
            function showError(message) {
                var errorElement = eleParents(fbe,'.pay-element').querySelector('.pay-stripe #card-errors');
                errorElement.textContent = message;
                _stripeConf.card.update({disabled: false});
                eleParents(fbe,'.pay-stripe').querySelector('.support-continue').style.display='block';
                eleParents(fbe,'.pay-stripe').querySelector('.embed-loading').style.display='none';
            }
            // pay-stripe
            eleParents(fbe,'.pay-element').querySelector('.pay-stripe .support-continue').style.display='none';
            eleParents(fbe,'.pay-element').querySelector('.pay-stripe .embed-loading').style.display='block';
            _stripeConf.stripe.createPaymentMethod({
                type: 'card',
                card: _stripeConf.card
            }).then(function (result) {
                var email=eleParents(fbe, '.embed-support-detail').querySelector('input[name=email]').value,note=eleParents(fbe, '.embed-support-detail').querySelector('textarea').value,
                amount=0,supType='support';
                var _EP=eleParents(fbe, '.embed-support');
                if(_EP.dataset.subtype=='support-wishlist'){
                    supType='support-wishlist';
                    amount=_EP.querySelector('.carousel-item--info .carousel-item--title').dataset.price * 100
                }else if(_EP.dataset.subtype=='support-gifts'){
                    supType='support-gifts';
                    amount = handlerSupportGifts(d.querySelector('#'+_EP.dataset.kid + ' .support-action button'),'amount')*100;
                }else if(eleParents(fbe,'.embed-support').querySelector('.embed-box .selected')){
                    amount=eleParents(fbe,'.embed-support').querySelector('.embed-box input[name=amount]:checked').value;
                }else{
                    amount=parseInt(parseFloat(eleParents(fbe,'.embed-support').querySelector('.amount-custom-input').value)*100,10);
                }
                if (result.error) {
                    showError(result.error.message);
                } else {
                    ibjax('POST', '/share/support/{uid}/link/{lnkid}/pm/stripe/'.Compile({lnkid:__data.bio.id,uid:__data.ui.uid}),
                        {data: {'email':email,'note':note,'amount':amount,currency:__data.ppset.currency||'USD','pmid':result.paymentMethod.id,'pk':fbe.dataset.id,'kid':_EP.dataset.kid,supType:supType},
                            fn: function (resp) {
                                var _thx= supType=='support-wishlist'?'Grateful to you for fulfilling my wishlist dreams.':'Thanks for your support!';
                                swal('',eleParents(fbe,'.embed-support').querySelector('.support-detail').dataset.success||_thx,'success');
                                eleParents(fbe,'.embed-support').remove();
                                if(d.querySelector('.tmpl-bg')) d.querySelector('.tmpl-bg').style.display='none';
                            }
                        });
                    return;
                }
            });
        });
    };
    function paySupportPaypal(fbe) {
        var amount=0,email=eleParents(fbe, '.embed-support-detail').querySelector('input[name=email]').value,note=eleParents(fbe, '.embed-support-detail').querySelector('textarea').value,supType='support';
        var _EP=eleParents(fbe, '.embed-support');
        if(_EP.dataset.subtype=='support-wishlist'){
            supType='support-wishlist';
            amount=_EP.querySelector('.carousel-item--info .carousel-item--title').dataset.price;
        }else if(_EP.dataset.subtype=='support-gifts'){
            supType='support-gifts';
            amount = handlerSupportGifts(d.querySelector('#'+_EP.dataset.kid + ' .support-action button'),'amount');
        }else if(eleParents(fbe,'.embed-support').querySelector('.embed-box .selected')){
            amount=parseInt(eleParents(fbe,'.embed-support').querySelector('.embed-box input[name=amount]:checked').value)/100.0;
        }else{
            amount=parseInt(parseFloat(eleParents(fbe,'.embed-support').querySelector('.amount-custom-input').value)*100,10)/100.0;
        }
        try{
        paypal.Buttons({
            // Sets up the transaction when a payment button is clicked
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: amount+'',
                            breakdown:{item_total: {value: amount+'',currency_code:__data.ppset.currency||'USD'}},
                        },
                        description:note,
                        items:[{name:'Instabio: Support Me',quantity: '1',unit_amount:{currency_code:__data.ppset.currency||'USD',value: amount+''}}]
                    }],
                    payer:{email_address:email},
                });
            },
            // Finalize the transaction after payer approval
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (orderData) {
                    ibjax('POST', '/share/support/{uid}/link/{lnkid}/pm/paypal/'.Compile({lnkid:__data.bio.id,uid:__data.ui.uid}),
                        {
                            data:{'email':email, 'note':note,'amount':(parseInt(amount*100)),currency:__data.ppset.currency||'USD','order':orderData.id,'pk':fbe.dataset.id,'kid':eleParents(fbe, '.embed-support').dataset.kid,supType:supType},
                            fn: function (resp) {
                                var _thx= supType=='support-wishlist'?'Grateful to you for fulfilling my wishlist dreams.':'Thanks for your support!';
                                swal('',eleParents(fbe,'.embed-support').querySelector('.support-detail').dataset.success||_thx,'success');
                                eleParents(fbe,'.embed-support').remove();
                                d.querySelector('.tmpl-bg').style.display='none';
                            }
                        });
                });
            }, onCancel: function (data) {
            }, onError: function (err) {
            }
        }).render(eleParents(fbe,'.pay-element').querySelector('.pay-paypal #paypal-button-container'));
        }catch (e) {
        }
    }
    var paySupportAction=function(e){
        var _fbe=e.target||e.srcElement||{},fjs,js;
        var payELe = eleParents(_fbe, '.pay-element');
        payELe.querySelector('.pay-action').style.display='none';
        if(parseInt(_fbe.dataset.type,10)==3){// stripe
            payELe.querySelector('.pay-stripe').style.display='block';
            if(d.querySelector('#stripe-js')){
                paySupportStripe(_fbe);
            }else{
                fjs=d.getElementsByTagName(s)[0];
                js=d.createElement(s);
                js.id='stripe-js';
                js.async=!0;
                js.src='https://js.stripe.com/v3/';
                fjs.parentNode.insertBefore(js, fjs);
                lstripejs(window).then(function () {
                    paySupportStripe(_fbe);
                });
            }
        }else if(parseInt(_fbe.dataset.type,10)==1||parseInt(_fbe.dataset.type,10)==2||parseInt(_fbe.dataset.type,10)==4){// paypal
            payELe.querySelector('.pay-paypal').style.display='block';
            if(!__data.ppset.pp_id){
                if(d.querySelector('#paypal-js')){
                    d.querySelector('#paypal-js').remove();
                }
            }
            if(!d.querySelector('#paypal-js')){
                fjs=d.getElementsByTagName(s)[0];
                js=d.createElement(s);
                js.id='paypal-js';
                js.async=!0;
                if(parseInt(_fbe.dataset.type,10)==4||parseInt(_fbe.dataset.type,10)==1){
                    js.src='https://www.paypal.com/sdk/js?client-id=AVXA7k3ch2iKIUIdVD4opxU8paESOY_iZbz_cCJJFkHSneslYza_WG_NqDh0OInJgN0Afi4B0rJyZSDe&merchant-id={0}&vault=true&currency={1}'.Format(_fbe.dataset.merchantid,__data.ppset.currency||'USD');
                }else{
                    js.src='https://www.paypal.com/sdk/js?client-id={0}&vault=true&currency={1}'.Format(_fbe.dataset.key,__data.ppset.currency||'USD');
                }
                fjs.parentNode.insertBefore(js, fjs);
            }
            // if(d.querySelector('#paypal-js')) d.querySelector('#paypal-js').remove();
            lpaypaljs(window).then(function () {
                paySupportPaypal(_fbe);
            });
        }
    };
    function handlerSupport(fbe){
        var _fc=d.querySelector('#form-tmpl-container');
        if(!_fc){_fc=d.createElement('div');_fc.id='form-tmpl-container';_fc.className='form-tmpl-container';d.body.appendChild(_fc);}
        var _divBox=d.createElement('div'),_divDetail=d.createElement('div');
        _divBox.className='embed-box';
        _divDetail.className='embed-support-detail';
        _fc.innerHTML=`<div class="embed-support form-tmpl animate__animated animate__fadeInUp"><p class="form-tmpl-close"><i class="iconfont icon-close"></i></p></div>`;
        _fc.querySelector('.embed-support').dataset.kid=fbe.dataset.kid;
        _fc.querySelector('.embed-support').appendChild(_divBox);
        _fc.querySelector('.embed-support').appendChild(_divDetail);
        var txt=JSON.parse(decodeURIComponent(fbe.dataset.txt)||'{}'), _provider=txt.provider||{};
        _provider.type=_provider.type||(__data.ppset||{}).pp_type;
        _provider.id=_provider.id||(__data.ppset||{}).pp_id;
        _provider.key=_provider.key||(__data.ppset||{}).key;
        _provider.merchantId=_provider.merchantId||(__data.ppset||{}).provider;
        var amountHTML='',_EP=eleParents(fbe, '.bio-support');
        if(_EP&&_EP.dataset.subtype=='cmpt-support-gifts'){//support gifts
            // _divDetail.className+=' embed-support-gifts';
             _fc.querySelector('.embed-support').classList.add('embed-support-gifts');
             _fc.querySelector('.embed-support').dataset.subtype='support-gifts';
            // check amount
            var amount=handlerSupportGifts(fbe,'amount');
            // if(_EP.querySelector('.support-gifts--number.selected')||parseInt(_EP.querySelector('.support-gifts--count input').value, 10)){
            if(amount){
                _divBox.innerHTML=getTmplInnerHtml('#embed-support').Compile({amount:amountHTML,desc:txt.desc,success:decodeURIComponent(txt.success),customDisplay:txt.customAmount?'block':'none',
                    payType:_provider.type,key:_provider.key,cy_sym:__data.ppset.cy_sym||'$',currency:__data.ppset.currency||'USD'});
                // detail
                _divDetail.innerHTML=getTmplInnerHtml('#embed-support-detail').Compile({success:decodeURIComponent(txt.success),noteDisplay:txt.noteMessage?'block':'none',link:location.pathname.slice(1),
                    payType:_provider.type,key:_provider.key,id:_provider.id,merchantid:_provider.merchantId,cy_sym:__data.ppset.cy_sym||'$',currency:__data.ppset.currency||'USD'});
                _fc.style.display='block';
                payContinueGifts(_divBox.querySelector('.support-continue button'),amount);
                d.querySelector('.tmpl-bg').style.display='block';

                v("keyup", paySupportCheckEmail, _divDetail.querySelector('.support-detail-email input'));
                v("click", paySupportAction, _divDetail.querySelector('.support-continue button'));
            }
        }else{
            var amountTMPL=getTmplInnerHtml('#embed-support-amount');
            txt.amount.forEach(function (val,idx) {
                amountHTML+=amountTMPL.Format(parseInt(Math.random()*10000000000,10),(val/100.00),val,__data.ppset.cy_sym||'$');
            });
            _divBox.innerHTML=getTmplInnerHtml('#embed-support').Compile({amount:amountHTML,desc:txt.desc,success:decodeURIComponent(txt.success),customDisplay:txt.customAmount?'block':'none',
                payType:_provider.type,key:_provider.key,cy_sym: __data.ppset.cy_sym||'$',currency:__data.ppset.currency||'USD'});
            // detail
            _divDetail.innerHTML=getTmplInnerHtml('#embed-support-detail').Compile({success:decodeURIComponent(txt.success),noteDisplay:txt.noteMessage?'block':'none',link:location.pathname.slice(1),
                payType:_provider.type,key:_provider.key,id:_provider.id,merchantid:_provider.merchantId,cy_sym:__data.ppset.cy_sym||'$',currency:__data.ppset.currency||'USD'});
            _fc.style.display='block';
            d.querySelector('.tmpl-bg').style.display='block';
            v("click", selectSupportAmount, _divBox.querySelector('.support-amount'));
            v("keyup", selectSupportAmount, _divBox.querySelector('.support-amount'));
            v("click", payContinue, _divBox.querySelector('.support-continue button'));
            v("click", payBack, _divDetail.querySelector('.support-back button'));
            v("keyup", paySupportCheckEmail, _divDetail.querySelector('.support-detail-email input'));
            v("click", paySupportAction, _divDetail.querySelector('.support-continue button'));
        }
    }
    function handlerSupportGifts(node,action){
        var _EP=eleParents(node, '.support-box');
        var txt=JSON.parse(decodeURIComponent(_EP.dataset.txt)||'{}');
        var amount=0;
        if(action=='select'){
            amount=parseInt(parseInt(node.dataset.count,10) * parseInt(txt.price,10) / 100.0, 10);
            if(node.parentElement.querySelector('.selected')) node.parentElement.querySelector('.selected').classList.remove('selected');
            node.classList.add('selected');
            _EP.querySelector('.support-action button span').innerHTML='<img src="https://bio.linkcdn.cc/bio/links/icons/{0}.png" > {2} {1}'.Format(txt.giftType,amount,(__data.ppset||{}).cy_sym||'$');
        }
        if(action=='amount'){
            var _cDiv=_EP.querySelector('.support-gifts--number.selected');
            if(_cDiv){
                amount = parseInt(parseInt(_cDiv.dataset.count,10) * parseInt(txt.price,10) / 100.0, 10)
            }else{
                amount = parseInt(parseInt(_EP.querySelector('.support-gifts--count input').value, 10) * parseInt(txt.price,10) / 100.0, 10)
            }
        }
        return amount;
    }
    function removeEle(idCls){
        idCls=idCls||'.embed-boxBG';
        if(d.querySelector(idCls)){
            var _EP=eleParents(d.querySelector(idCls), '.button-item')
            if(_EP&&_EP.querySelector('.button--expended')) _EP.querySelector('.button--expended').classList.remove('button--expended');
            d.querySelector(idCls).remove();
        }
    }
    function removeEmbedBox(){
        removeEle('.button-item .embed-twitter');
        removeEle('.button-item .embed-pins');
        removeEle();
    }
    function scrollAction(pTar,actions,that){
        var _pTar=pTar.querySelector(actions[2]);
        if(actions[0]=='left'){
            // _pTar.scrollBy(-parseInt(_pTar.getBoundingClientRect().width/2,10),0);
            _pTar.scrollBy({top:0,left:-parseInt(_pTar.getBoundingClientRect().width/2,10),behavior:'smooth'});
            if(_pTar.scrollLeft<=parseInt(_pTar.getBoundingClientRect().width/2,10)) that.disabled=true;
        }
        if(actions[0]=='right'){
            // _pTar.scrollBy(parseInt(_pTar.getBoundingClientRect().width/2,10), 0);
            _pTar.scrollBy({top:0,left:parseInt(_pTar.getBoundingClientRect().width/2,10),behavior:'smooth'});
            if(pTar.querySelector('.left')) pTar.querySelector('.left').disabled=false;
        }
    }
    function transformAction(pTar,actions,that){
        var _pTar=pTar.querySelector(actions[2]);
        var _rect=_pTar.getBoundingClientRect();
        if(actions[0]=='left'){
            var _transform=_pTar.style.transform,_x=0;
            if(_transform){
                var _reg_ret = /X\(([\-0-9\.]+px)\)/g.exec(_transform);
                if(_reg_ret) _x=parseFloat(_reg_ret[1]);
            }
            _pTar.style.transform='translateX({0}px)'.Format(_x+_rect.width);
            if((_x+_rect.width)>(0-_rect.width)) that.style.display='none';
            that.nextElementSibling.style.display='inline-block';
        }
        if(actions[0]=='right'){
            var _transform=_pTar.style.transform,_x=0;
            if(_transform){
                var _reg_ret = /X\(([\-0-9\.]+px)\)/g.exec(_transform);
                if(_reg_ret) _x=parseFloat(_reg_ret[1]);
            }
            var __tar=_pTar.querySelectorAll(actions[3]);
            if(__tar.length>0){
                __tar=__tar[__tar.length-1];
                var __rect=__tar.getBoundingClientRect();
                if(__rect.x-_rect.width<_rect.width) that.style.display='none';
            }
            _pTar.style.transform='translateX({0}px)'.Format(_x-_rect.width);
            that.previousElementSibling.style.display='inline-block';
        }
    }
    function playAction(pTar,actions,that){
        if(actions[2]=='video'){
            var _pTar=pTar.querySelector(actions[2]);
            if (_pTar.paused) {
                _pTar.play();
                _pTar.parentElement.classList.add('playing');
                that.innerHTML='<div><svg viewBox="0 0 1024 1024" width="128" height="128"><path d="M444.096982 129.646755c0-36.365232-29.441543-65.806775-65.780169-65.806775L238.269174 63.83998c-36.338626 0-65.780169 29.441543-65.780169 65.806775l0 764.67886c0 36.391838 29.441543 65.833381 65.780169 65.833381l140.04764 0c36.338626 0 65.780169-29.441543 65.780169-65.833381L444.096982 129.646755zM389.775796 894.325615c0 6.365988-5.146207 11.512195-11.485589 11.512195L238.295779 905.83781c-6.339382 0-11.484565-5.146207-11.484565-11.512195L226.811214 129.646755c0-6.339382 5.145184-11.485589 11.484565-11.485589l139.995451 0c6.338359 0 11.485589 5.146207 11.485589 11.485589L389.776819 894.325615zM851.508949 129.646755c0-36.365232-29.441543-65.806775-65.779146-65.806775L645.682163 63.83998c-36.338626 0-65.780169 29.441543-65.780169 65.806775l0 764.67886c0 36.391838 29.441543 65.833381 65.780169 65.833381l140.04764 0c36.337603 0 65.779146-29.441543 65.779146-65.833381L851.508949 129.646755zM797.187763 894.325615c0 6.365988-5.145184 11.512195-11.485589 11.512195L645.707746 905.83781c-6.338359 0-11.485589-5.146207-11.485589-11.512195L634.222157 129.646755c0-6.339382 5.146207-11.485589 11.485589-11.485589l139.995451 0c6.339382 0 11.485589 5.146207 11.485589 11.485589L797.188786 894.325615z"></path></svg></div>';
            }else{
                _pTar.pause();
                _pTar.parentElement.classList.remove('playing');
                that.innerHTML='<div><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="128" height="128"><path d="M257 214l539.6 298L257 810V214m-15.9-75.2c-25.1 0-48.1 20.1-48.1 48.1v650.2c0 28 22.9 48.1 48.1 48.1 7.7 0 15.6-1.9 23.1-6.1L852.9 554c33.1-18.3 33.1-65.8 0-84L264.2 144.9c-7.5-4.2-15.4-6.1-23.1-6.1z"></path></svg></div>';
            }
        }
        if(actions[2]=='iframe'){
            pTar.innerHTML='<iframe src="{0}" width="100%" height="100%" frameborder="0" allowfullscreen="true" scrolling="no" allow="accelerometer;fullscreen;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>'.Format(pTar.dataset.embed);
        }
    }
    function shareAction(){
        var shareURL=location.href.split('?')[0]+'?utm_source=instabio&utm_medium=profile_share',
        linkPromote='//linkfly.to/madewithl?us=instabio&um=profile_share&uc='+location.pathname.substring(1);
        ////www.instabio.cc/en?utm_source=instabio&utm_medium=profile_share
        if(navigator.share&&GetBrowserOS().os!='browser'){
            navigator.share({
                title: document.title,
                text: document.querySelector('meta[name=description]').content,
                url: shareURL,
            }).then(() => {
            }).catch((error) => {
            });
        }else{
            var _pModal=popupModal({cls:'share-link-pop'});
            _pModal.container.innerHTML=getTmplInnerHtml('#popup-link-share').Compile({link:shareURL,linkShow:shareURL.replace(/https?:\/\//,''),lnkP:linkPromote});
        }
    }
    function closeBlockButton(that,epCls){
        var _pTar=ep(that,epCls);
        if(_pTar){
            var _epItem=_pTar.querySelector('.button--expended'),_h1=_epItem.getBoundingClientRect().height;
            // var _epItem=_pTar.querySelector('.embed-block-box'),_h1=_epItem.getBoundingClientRect().height;
            _pTar.style.height=_pTar.getBoundingClientRect().height+'px';
            setTimeout(function () {
                _pTar.style.height=_h1+'px';
            },20);
            setTimeout(function () {
                var _buttons = _pTar.querySelectorAll('.button-item');
                (_buttons||[]).forEach(function (b,i) {
                    if(i>0) b.remove();
                });
                _epItem.classList.remove('button--expended');
                _pTar.style.overflow='visible';
            },320)
            setTimeout(function () {
                _pTar.style.height='auto';
            },400);
        }
    }
    function closeTSPProduct(that,epCls){
        var _pTar=ep(that,epCls),_pTarItem=ep(that,'.carousel-item--info');
        if(_pTar){
            var sub=JSON.parse(decodeURIComponent(_pTarItem.dataset.sub)||'{}');
            _pTar.classList.add('embed-tsp--closed');
            _pTar.querySelector('.item-embed--bg').innerHTML=`<div class="embed-tsp--products">
                <div class="embed-tsp--view">
                    <button toggle="view" action="tsp/products/.carousel-item--info">
                    <div class="embed-tsp--view-icon"><img src="//bio.linkcdn.cc/instabio.cc/icons/tsp-cart.png" alt=""></div><div class="embed-tsp--view-tips">Click to view products</div>
                    </button>
                </div>
                <div class="embed-tsp--title txt-ellipsis">{0}</div>
                </div>`.Format(sub.title);
        }
    }
    function viewTSPProducts(that,epCls){
        var _pTar=ep(that,epCls),_pTarBlock=ep(that,'.item-block');
        if(_pTar){
            var _pModal=popupModal({cls:'popup-embed-tsp-products'});
            _pModal.popup.classList.add('popup-embed-tsp-products-v1')
            _pModal.container.innerHTML=getTmplInnerHtml('#popup-embed-tsp-products').Compile({});
            var _sub=JSON.parse(decodeURIComponent(_pTar.dataset.sub)||'{}'),
            _subProds=JSON.parse(_sub.text||'{}'),
            _prods=JSON.parse(decodeURIComponent(_pTarBlock.dataset.prods)||'{}'),
            _pTmpl=getTmplInnerHtml('#popup-embed-tsp-prodItemV1');
            var _other=__data.bio.other||{};
            (_subProds.products||[]).forEach(function (p) {
                var _pLi=d.createElement('li'),_pInfo=_prods.find(function (pr) {return pr.id==p.id;});
                if(_pInfo){
                    _pLi.className='embed-tsp__item';
                    _pLi.dataset.prod=encodeURIComponent(JSON.stringify(_pInfo));
                    var _pC=_pInfo.channels,_pL=_pC.length>0?_pC[0].link||'javascript:;':'javascript:;';
                    var priceHTML,channelHTML='',cy_sym=_getCySym(_pInfo.platform);
                    if(_pInfo.sale_price){
                        priceHTML='<span>{sym}{sale_price}</span><span>{sym}{price}</span>'.Compile({sym:cy_sym,sale_price:_pInfo.sale_price,price:_pInfo.price});
                    }else{
                        priceHTML='<span>{sym}{price}</span>'.Compile({sym:cy_sym,price:_pInfo.price});
                    }
                    (_pInfo.channels||[]).forEach(function (c) {
                        if(isEmpty(c.defaultChannel)||c.defaultChannel){
                            if(isEmpty(c.defaultChannelShow)||c.defaultChannelShow) channelHTML+=`<div class="item-icon"> <img src="{0}"></div>`.Format(clearImage(c.icon||'bio/links/icons/social/{0}.png'.Format(_pInfo.platform)));
                        }else{
                            if(c.icon) channelHTML+=`<div class="item-icon"> <img src="{0}"></div>`.Format(clearImage(c.icon));
                        }
                    });
                    _pLi.innerHTML=_pTmpl.Compile({image:clearImage(_pInfo.image),title:_pInfo.title,price:_pInfo.price,
                        link:_pL,priceHTML:priceHTML,channelHTML:channelHTML});
                    _pModal.container.querySelector('.embed-tsp__list').appendChild(_pLi);
                }
            });
        }
    }
    function _showProdInfo(prod,pType,that){ 
        var _pModal=popupModal({cls:'popup-embed-tsp-prodinfo', level:'second'});
        _pModal.popup.classList.add('popup-embed-tsp-prodinfo');
        var _other=__data.bio.other||{};
        prod.images=prod.images||[];
        var swiperHtml='',chHtml='',autoplay=prod.images.length>1,choiceDisplay='hidden',choicesHtml='';
        if(prod.images.length==0){
            autoplay=false;
            swiperHtml='<li class="swiper-slide"><img src="'+clearImage(prod.image)+'" alt=""></li>';
        }else{
            for(var i=0;i<prod.images.length;i++){
                swiperHtml+='<li class="swiper-slide"><img src="'+clearImage(prod.images[i].url)+'" alt=""></li>';
            }
        }
        
        var priceHTML='',labelHtml='',cy_sym=_getCySym(prod.platform),_tips='';
        if(prod.label&&prod.label.name){
            labelHtml='<span class="ctm-label" style="background-color:{color}";><span>{name}</span></span>'.Compile(prod.label);
        }
        if(prod.sale_price){
            priceHTML='<span>{sym}{sale_price}</span> <span>{sym}{price}</span>'.Compile({sym:cy_sym,sale_price:prod.sale_price,price:prod.price});
        }else{
            priceHTML='<span>{sym}{price}</span>'.Compile({sym:cy_sym,price:prod.price});
        }
        if(pType=='qas'||pType=='ctmprod'){
            // _tips=gettext('Delivery within a maximum of {0} days.').Format(prod.max_fulfillment_day);
            _tips=gettext('Delivery within a maximum of {0} days.').Format(10);
        }else{
            _tips=gettext('Digital download products are automatically delivered.');
        }
        if(pType=='ctmprod'&&prod.choices&&prod.choices.length>0){
            choiceDisplay='block';
            prod.choices.forEach(function (c) {
                c.priceDisplay=cy_sym+(c.price/100.0).toFixed(2);
                choicesHtml+=`<div class="tsp_prodinfo__choice__item" data-amount="{price}">
                    <button toggle="select" action="checkbox/ctmprodchoice/.tsp_prodinfo__choice__item">
                        <div class="tsp_prodinfo__choice-title">{title}</div>
                        <div class="tsp_prodinfo__choice-amount">{priceDisplay}</div>
                    </button>
                </div>`.Compile(c);
            });
        }
        if(pType=='prodinfo'){
            (prod.channels||[]).forEach(function (c) {
                var _platOrder={'tiktokshop': 'Order via TikTok Shop', 'shopee': 'Order via Shopee'}
                if(c.icon&&c.icon.indexOf('bio/links/icons/')!=-1){
                    var _k=getImageKey(c.icon);
                    if(_k){
                        c.iconfont='icon-'+_k;
                    }else{
                        c.displayImg='block';
                        c.displayIcon='hidden';
                    }
                }else{
                    c.displayImg='block';
                    c.displayIcon='hidden';
                }
                if(isEmpty(c.defaultChannel)||c.defaultChannel){
                    c.title=c.title||_platOrder[prod.platform]||'Buy Now';
                    if(isEmpty(c.defaultChannelShow)||c.defaultChannelShow){
                        c.icon=clearImage(c.icon||'bio/links/icons/social/{0}.png'.Format(prod.platform));
                        chHtml+=`<li class="tsp_prodinfo__channels__item"><a class="btn-link" href="{link}" target="_blank">
                    <div class="tsp_prodinfo__channels__icon"><img src="{icon}" alt=""></div>
                    <div class="tsp_prodinfo__channels__title">{title}</div> 
                </a></li>`.Compile(c);
                    }
                }else{
                    if(c.icon){
                        c.icon=clearImage(c.icon)
                    }else{
                        c.icon='https://bio.linkcdn.cc/static/scene/blank.png';
                    }
                    chHtml+=`<li class="tsp_prodinfo__channels__item prodinfo__channels__item"><a class="btn-link btn" href="{link}" target="_blank">
                    <div class="tsp_prodinfo__channels__icon prodinfo__channels__icon btn-icon"><img src="{icon}" alt="" class="{displayImg}">
                        <span class="iconfont {iconfont} {displayIcon}"></span>
                    </div>
                    <div class="tsp_prodinfo__channels__title prodinfo__channels__title  btn-text">{title}</div> 
                </a></li>`.Compile(c);
                }
            });
        }
        _pModal.container.innerHTML=getTmplInnerHtml('#popup-embed-tsp-prodinfo').Compile({swiperHtml:swiperHtml,
            priceHTML:priceHTML,title:prod.title,chHtml:chHtml,labelHTML:labelHtml,descDisplay:!isEmpty(prod.description)?'':'hidden',
            description:(prod.description||'').replace(/\n|\r/g, '<br>'),path:prod.id,kid:that.dataset.kid,
            tips:_tips,pType:pType,choiceDisplay:choiceDisplay,choicesHtml:choicesHtml,
        });
        return {pModal:_pModal,autoplay:autoplay};
    }
    function viewTSPProdInfo(that,epCls){
        var _pTar=ep(that,epCls);
        if(_pTar){
            var _prod;
            if(_pTar.dataset.prod){
                _prod=JSON.parse(decodeURIComponent(_pTar.dataset.prod)||'{}');
            }else{
                var _sub=JSON.parse(decodeURIComponent(_pTar.dataset.sub)||'{}'),_pTarBlock=ep(that,'.item-block'),
                _subProds=JSON.parse(_sub.text||'{}').products||[],
                _prods=JSON.parse(decodeURIComponent(_pTarBlock.dataset.prods)||'{}');
                _prod=_prods.find(function (pr) {return pr.id==_subProds[0].id;});
            }
            var _pM = _showProdInfo(_prod,'prodinfo',that);
            if(__data.bio.part>=3){
                var _cmptId= ep(_pTar,'.box-cmpt').parentElement.id;
                showProductV2(_pM.pModal,_cmptId);
            }
            new Swiper('#embed-tsp_prodinfo__images', {
                loop: _pM.autoplay,
                autoplay: _pM.autoplay,
                speed:2000,
                slidesPerView: 1,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            });
        }
    }
    function viewDigitalProdInfo(that,epCls,pType){
        pType=pType||'digital';
        var _pTar=ep(that,epCls);
        if(_pTar){
            var _prod;
            if(_pTar.dataset.prod){
                _prod=JSON.parse(decodeURIComponent(_pTar.dataset.prod)||'{}');
            }
            if(_prod){
                var _pM = _showProdInfo(_prod,pType,that);
                _pM.pModal.popup.classList.add('popup-embed-digital-prodinfo');
                if(pType!='digital'){
                    _pM.pModal.popup.classList.add('popup-embed-digital-'+pType);
                }
                new Swiper('#embed-tsp_prodinfo__images', {
                    loop: _pM.autoplay,
                    autoplay: _pM.autoplay,
                    speed:2000,
                    slidesPerView: 1,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    },
                });
            }
        }
    }
    function popupAction(that,actions){
        var _pModal,_embedOp;
        if(actions[0] == 'embed' && actions[1] == 'iframe'){
            _pModal=popupModal({cls:'popup-embed-iframe'});
            _embedOp=GetEmbedURL(that.getAttribute('href'));
            if(actions[2]=='event-live'){
                var _title=eleParents(that,'.bio-live').querySelector('.embed-event-title').innerText;
                _pModal.container.innerHTML=getTmplInnerHtml('#popup-embed-iframe').Compile({title:_title,
                    embedCls:'embed-{0}-{1}'.Format(_embedOp.platform,_embedOp.type),embedLink:_embedOp.url,referrerpolicy:_embedOp.referrerpolicy||''});
            }
        }
        if(actions[0] == 'reminder'){
            _pModal=popupModal({cls:'popup-reminder-'+actions[1],htmlId:'popup-event-reminder'});
            // _embedOp=GetEmbedURL(that.getAttribute('href'));
            if(actions[1]=='event'||actions[1]=='live'){
                var _id=eleParents(that,'.bio-block').id;
                _pModal.container.dataset.id=_id;
            }
        }
    }
    function fundAction(that,actions){
        var _fc=d.querySelector('#form-tmpl-container'),_EP=eleParents(that,'.bio-wishlist');
        window._EP=_EP;
        var cmpt=__data.content.cmpts.find(function (c) {
            return c.id==_EP.id;
        });
        if(cmpt&&cmpt.text&&actions[0]=='wishlist'){
            if(!_fc){_fc=d.createElement('div');_fc.id='form-tmpl-container';_fc.className='form-tmpl-container';d.body.appendChild(_fc);}
            var _divDetail=d.createElement('div'),_divBox=d.createElement('div');
            // _divBox.className='embed-box';
            _divDetail.className='embed-support-detail embed-support-wishlist';
            _fc.innerHTML=`<div class="embed-support form-tmpl animate__animated animate__fadeInUp"><p class="form-tmpl-close"><i class="iconfont icon-close"></i></p></div>`;
            _fc.querySelector('.embed-support').dataset.kid=cmpt.id;
            // _fc.querySelector('.embed-support').appendChild(_divBox);
            _fc.querySelector('.embed-support').appendChild(_divDetail);
            var txt=JSON.parse(decodeURIComponent(cmpt.text)||'{}'),_provider=txt.provider||{};
            _provider.type=_provider.type||(__data.ppset||{}).pp_type;
            _provider.id=_provider.id||(__data.ppset||{}).pp_id;
            _provider.key=_provider.key||(__data.ppset||{}).key;
            _provider.merchantId=_provider.merchantId||(__data.ppset||{}).provider;
            var amountHTML='';
            var _EPW=eleParents(that,'.carousel-item');
            _fc.querySelector('.embed-support').dataset.subtype = 'support-wishlist';
            // check amount
            var amount = _EPW.querySelector('.carousel-item--info .carousel-item--title').dataset.price;
            if (amount) {
                // detail
                _divDetail.innerHTML = getTmplInnerHtml('#embed-support-detail').Compile({
                    success: decodeURIComponent(txt.success), noteDisplay: txt.noteMessage ? 'block' : 'none', link: location.pathname.slice(1),
                    payType: _provider.type, key: _provider.key, id: _provider.id, merchantid: _provider.merchantId
                });
                _divDetail.prepend(_EPW.querySelector('.carousel-item--info').cloneNode(true));
                var _titleDiv=d.createElement('div');
                _titleDiv.className='embed-support--title';
                _titleDiv.innerText='Fund This Wish';
                _divDetail.prepend(_titleDiv);
                _fc.style.display = 'block';
                d.querySelector('.tmpl-bg').style.display = 'block';

                v("keyup", paySupportCheckEmail, _divDetail.querySelector('.support-detail-email input'));
                v("click", paySupportAction, _divDetail.querySelector('.support-continue button'));
            }
        }
    }
    function closeMaskCW(that,epCls){
        var _pTar=ep(that,epCls);
        if(_pTar) _pTar.remove();
        globalFN.pageInit();
    }
    function closeEmbedPopup(that,epCls){
        var _pTar=ep(that,epCls);
        if(_pTar) _pTar.remove();
    }
    function requestOptionCheck(fte){
        var reqOp=eleParents(fte,'.form-field-radio-option'),boxDiv=eleParents(fte,'.support-box');
        if(reqOp&&boxDiv){
            boxDiv.querySelector('.support-action button span:last-child').innerHTML='('+reqOp.querySelector('span').innerHTML+')';
        }
    }
    var payRequestCheck=function(e){
        var _fbe=e.target||e.srcElement||{};
        var pTar=eleParents(_fbe, '.checkout-fields'),pField=eleParents(_fbe, '.checkout-field'),value;
        var _fiedls=[],_error=false;
        pTar.querySelectorAll('.checkout-field').forEach(function (f) {
            var _value,valEle;
            if(f.dataset.type=='email'){
                _value=f.querySelector('input').value.trim();
                if(!isEmail(_value)||!_value){
                    _error=true;
                }
            }else if(f.dataset.type=='username'){
                _value=f.querySelector('input').value.trim();
                if(f.dataset.required==1&&!_value){
                    _error=true;
                }
            }else if(f.dataset.type=='phone'){
                _value=f.querySelector('input').value.trim();
                if(f.dataset.required==1&&!_value){
                    _error=true;
                }
                if(_value&&!isPhone(_value)){
                    _error=true;
                }
            }else if(f.dataset.type=='location'){
                if(f.dataset.required==1){
                    Array.from(f.querySelectorAll('input')).concat(Array.from(f.querySelectorAll('select'))).forEach(function (i) {
                        _value=i.value.trim();
                        if(!_value){
                            _error=true;
                        }
                    });
                }
                if(f.querySelector('input[name=postal]')){
                    _value=f.querySelector('input[name=postal]').value.trim();
                    if(_value&&!isPostalCode(_value)){
                        _error=true;
                    }
                }
            }else if(f.dataset.type=='custom'){
                _value=f.querySelector('textarea').value.trim();
                if(f.dataset.required==1&&!_value){
                    _error=true;
                }
            }else if(f.dataset.type=='question'){
                valEle=f.querySelector('input')||f.querySelector('textarea');
                _value=valEle.value.trim();
                if(f.dataset.required==1&&!_value){
                    _error=true;
                }
            }
        });
        if(_error){
            eleParents(_fbe, '.embed-request__cont').querySelector('.support-continue button').setAttribute('disabled',true);
        }else{
            eleParents(_fbe, '.embed-request__cont').querySelector('.support-continue button').removeAttribute('disabled');
        }
    };
    var payRequestResult=function (fbe,result){
        var _EP=eleParents(fbe, '.embed-request__cont');
        var email=_EP.querySelector('input[name=email]').value,username=_EP.querySelector('input[name=username]').value;
        var amount=0,reqType='request',_prod,service='',_service='',customer={email:email,username:username,fields:(function () {
            var _fields=[];
            _EP.querySelectorAll('.checkout-field').forEach(function (f) {
                if(f.dataset.type=='email'){
                    _fields.push({type:'email',value:f.querySelector('input').value.trim(), required: f.dataset.required});
                }
                if(f.dataset.type=='username'){
                    _fields.push({type:'username',value:f.querySelector('input').value.trim(), required: f.dataset.required});
                }
                if(f.dataset.type=='phone'){
                    _fields.push({type:'phone',value:f.querySelector('.dial-code span').innerHTML+' '+f.querySelector('input').value.trim(), required: f.dataset.required});
                }
                if(f.dataset.type=='location'){
                    var _location=[];
                    Array.from(f.querySelectorAll('input')).concat(Array.from(f.querySelectorAll('select'))).forEach(function (i) {
                        _location.push(i.value.trim());
                    });
                    _fields.push({type:'location',value:_location.join(', '), required: f.dataset.required,format:f.dataset.format});
                }
                if(f.dataset.type=='custom'){
                    _fields.push({type:'custom',value:f.querySelector('textarea').value.trim(), required: f.dataset.required,
                    title:(f.querySelector('textarea').placeholder||'').replace(/ \*$/, '')});
                }
                // if(f.dataset.type=='question'){
                //     var valEle=f.querySelector('input')||f.querySelector('textarea');
                //     _fields.push({type:'question',value:valEle.value.trim(), required: f.dataset.required,
                //     title:(f.querySelector('.checkout-fields--title').innerHTML||'').replace(/ \*$/, '')});
                // }
            });
            return _fields;
        }())};
        
        if(_EP.dataset.subtype=='digital'){
            reqType=_EP.dataset.subtype;
            amount=parseInt(_EP.querySelector('.checkout-summary').dataset.amount,10);
            _prod=JSON.parse(decodeURIComponent(document.querySelector('#'+fbe.dataset.kid).querySelector('.item-block').dataset.prod));
            if(isEmpty(_prod.sale_price)){
                _prod.price=amount;
                delete _prod.sale_price;
            }else{
                _prod.price=parseInt(parseFloat(_prod.price, 10) * 100, 10)
                _prod.sale_price=amount;
            }
        }else if(_EP.dataset.subtype=='qas'){
            reqType=_EP.dataset.subtype;
            amount=parseInt(_EP.querySelector('.checkout-summary').dataset.amount,10);
            _prod=JSON.parse(decodeURIComponent(document.querySelector('#'+fbe.dataset.kid).querySelector('.item-block').dataset.prod));
            _service=_EP.querySelector('.checkout-digital--title').innerText;
            service='';
            if(isEmpty(_prod.sale_price)){
                _prod.price=amount;
                delete _prod.sale_price;
            }else{
                _prod.price=parseInt(parseFloat(_prod.price, 10) * 100, 10)
                _prod.sale_price=amount;
            }
            customer.questions=(function () {
                var _questions=[];
                _EP.querySelectorAll('.checkout-field').forEach(function (f) {
                    if(f.dataset.type=='question'){
                        var valEle=f.querySelector('input')||f.querySelector('textarea');
                        _questions.push({title:(f.querySelector('.checkout-fields--title').innerHTML||'').replace(/ \*$/, ''),
                        value:valEle.value.trim(), required: f.dataset.required});
                    }
                });
                return _questions;
            }());
        }else if(_EP.dataset.subtype=='ctmprod'){
            reqType=_EP.dataset.subtype;
            amount=parseInt(_EP.querySelector('.checkout-summary').dataset.amount,10);
            _prod=JSON.parse(decodeURIComponent(document.querySelector('#'+fbe.dataset.kid).querySelector('.item-block').dataset.prod));
            _service=_EP.querySelector('.checkout-digital--title').innerText;
            service='';
            if(isEmpty(_prod.sale_price)){
                _prod.price=parseInt(parseFloat(_prod.price, 10) * 100, 10);
                delete _prod.sale_price;
            }else{
                _prod.price=parseInt(parseFloat(_prod.price, 10) * 100, 10);
                _prod.sale_price=parseInt(parseFloat(_prod.sale_price, 10) * 100, 10);
            }
            customer.choices=(function () {
                var _choices=[];
                _EP.querySelectorAll('.checkout-summary .checkout-summary--choice-item').forEach(function (f) {
                    _choices.push({title:(f.querySelector('p').innerHTML||''), price: parseInt(f.dataset.cAmount||f.dataset.camount,10),count:1});
                });
                return _choices;
            }());
        }else{
            amount=parseInt(_EP.querySelector('.checkout-summary').dataset.amount,10);
            _prod=JSON.parse(decodeURIComponent(document.querySelector('#'+fbe.dataset.kid).querySelector('.support-box').dataset.txt));
            service=_EP.querySelector('.checkout-service--title').innerText;
            _prod.price=amount;
        }
        result=result||{paymentMethod:{}};
        if (result&&result.error) {
            showError(result.error.message);
        } else {
            ibjax('POST', '/share/request/{uid}/link/{lnkid}/pm/stripe/'.Compile({lnkid:__data.bio.id,uid:__data.ui.uid}),
                {data: {'email':email,'username':username,'amount':amount,currency:__data.bio.other.currency||'USD','pmid':result.paymentMethod.id||'',
                    'kid':fbe.dataset.kid,reqType:reqType,title:_prod.title,image:_prod.image||'',prodid:_prod.id,product:JSON.stringify(_prod),
                    'service':service,customer:JSON.stringify(customer), link:location.href.replace(/https?:\/\//, ''),
                    ipgeo:encodeURIComponent(JSON.stringify(__ipgeo)),referer:document.referrer||'',
                },
                    fn: function (resp) {
                        resp=JSON.parse(resp||'{}');
                        if(resp.code==0&&resp.data.orderId){
                            var _thx=_prod.checkout_form.thanks_text||(reqType=='digital'?'Thank you for your purchase!':'Thank you for your purchase!');
                            var _pModal=popupModal({cls:'popup-embed-request-thanks'});
                            _pModal.container.innerHTML=getTmplInnerHtml('#embed-request-thanks-loading').Compile({title:_thx,email:email,reqType:reqType,orderId:resp.data.orderId});
                            if(reqType=='digital'){
                                setTimeout(function () {
                                    payRefreshOrder(['refresh','request',reqType], 1);
                                },2000);
                            }else{
                                setTimeout(function () {
                                    _pModal.container.querySelector('.embed-request__cont').classList.add('request-thanks__ok');
                                    _pModal.container.querySelector('.embed-request__cont').innerHTML=getTmplInnerHtml('#embed-request-thanks-ok-'+reqType).Compile({
                                        title:_thx,service:service||_service, email:email});
                                },1000);
                            }
                        }else{
                            swal('','Something wrong','error');
                        }
                    }
                });
            return;
        }
    }
    var payRequestStripe=function (fbe) {
        var _stripeConf = _initStripeConf(fbe);
        _stripeConf.form.addEventListener('submit', function (event) {
            event.preventDefault();
            function showError(message) {
                var errorElement = eleParents(fbe,'.pay-element').querySelector('.pay-stripe #card-errors');
                errorElement.textContent = message;
                _stripeConf.card.update({disabled: false});
                eleParents(fbe,'.pay-stripe').querySelector('.support-continue').style.display='block';
                eleParents(fbe,'.pay-stripe').querySelector('.embed-loading').style.display='none';
            }
            // pay-stripe
            eleParents(fbe,'.pay-element').querySelector('.pay-stripe .support-continue').style.display='none';
            eleParents(fbe,'.pay-element').querySelector('.pay-stripe .embed-loading').style.display='block';
            _stripeConf.stripe.createPaymentMethod({
                type: 'card',
                card: _stripeConf.card
            }).then(function (result) {
                payRequestResult(fbe,result);
            });
        });
    };
    var payRequestAction=function(e){
        var _fbe=e.target||e.srcElement||{},fjs,js;
        var payELe = eleParents(_fbe, '.pay-element');
        payELe.querySelector('.pay-action').style.display='none';
        var _EP=eleParents(_fbe, '.embed-request__cont');
        var _amount = 0;
        if(_EP.dataset.subtype=='digital'){
            amount=parseInt(_EP.querySelector('.checkout-summary').dataset.amount,10);
        }else{
            amount=parseInt(_EP.querySelector('.checkout-summary').dataset.amount,10);
        }
        if(amount == 0){
            payRequestResult(_fbe)
            return;
        }
        // only support stripe
        payELe.querySelector('.pay-stripe').style.display='block';
        // can't input
        var pTar = eleParents(_fbe, '.embed-request__cont');
        pTar.querySelectorAll('.checkout-field').forEach(function (f) {
            if(f.dataset.type=='location'){
                Array.from(f.querySelectorAll('input')).concat(Array.from(f.querySelectorAll('select'))).forEach(function (i) {
                    i.setAttribute('disabled',true);
                });
            }else if(f.dataset.type=='custom'){
                f.querySelector('textarea').setAttribute('disabled',true);
            }else if(f.dataset.type=='question'){
                (f.querySelector('textarea')||f.querySelector('input')).setAttribute('disabled',true);
            }else{
                f.querySelector('input').setAttribute('disabled',true);
            }
        });
        if(d.querySelector('#stripe-js')){
            payRequestStripe(_fbe);
        }else{
            fjs=d.getElementsByTagName(s)[0];
            js=d.createElement(s);
            js.id='stripe-js';
            js.async=!0;
            js.src='https://js.stripe.com/v3/';
            fjs.parentNode.insertBefore(js, fjs);
            lstripejs(window).then(function () {
                payRequestStripe(_fbe);
            });
        }
    }
    function renderReqestCheckoutForm(prod,pType){
        var ckfHTML='',cfkTmpl='',locHTML='',format='';
        prod.checkout_form.fields.forEach(function (f) {
            cfkTmpl=getTmplInnerHtml('#checkout-field-'+f.type);
            if(f.type=='email') f.title=gettext('Email *');
            if(f.type=='username') f.title=gettext('Name *');
            if(f.type=='phone'){
                f.title=f.required?gettext('Phone *'):gettext('Phone');
            }
            if(f.type=='location'){
                // f.title=f.required?gettext('Location *'):gettext('Location');
                f.options=f.options||{value:'full'};
                f.options.value=f.options.value||'full';
                format=f.options.value;
                if(f.options.value=='full'){
                    locHTML+=getTmplInnerHtml('#checkout-field-location-address').Compile({title:gettext('Address' + (f.required?' *':''))});
                    locHTML+=getTmplInnerHtml('#checkout-field-location-city').Compile({title:gettext('City' + (f.required?' *':''))});
                    locHTML+=getTmplInnerHtml('#checkout-field-location-state').Compile({title:gettext('State / Province' + (f.required?' *':''))});
                    locHTML+=getTmplInnerHtml('#checkout-field-location-postal').Compile({title:gettext('ZIP / Postal code' + (f.required?' *':''))});
                    locHTML+=getTmplInnerHtml('#checkout-field-location-regions').Compile({title:gettext('Country / Region' + (f.required?' *':''))});
                }else if(f.options.value=='general'){
                    locHTML+=getTmplInnerHtml('#checkout-field-location-city').Compile({title:gettext('City' + (f.required?' *':''))});
                    locHTML+=getTmplInnerHtml('#checkout-field-location-state').Compile({title:gettext('State / Province' + (f.required?' *':''))});
                    locHTML+=getTmplInnerHtml('#checkout-field-location-postal').Compile({title:gettext('ZIP / Postal code' + (f.required?' *':''))});
                    locHTML+=getTmplInnerHtml('#checkout-field-location-regions').Compile({title:gettext('Country / Region' + (f.required?' *':''))});
                }else if(f.options.value=='postal'){
                    locHTML+=getTmplInnerHtml('#checkout-field-location-postal').Compile({title:gettext('ZIP / Postal code' + (f.required?' *':''))});
                }else if(f.options.value=='country'){
                    locHTML+=getTmplInnerHtml('#checkout-field-location-regions').Compile({title:gettext('Country / Region' + (f.required?' *':''))});
                }
            }
            if(f.type=='custom') f.title+= (f.required?' *':'');
            ckfHTML+=cfkTmpl.Compile({title:f.title,required:f.required?'1':'0',locHTML:locHTML,format:format});
        });
        if(pType=='qas'){
            (prod.questions||[]).forEach(function (q) {
                let inHtml='';
                if(q.type=='input') inHtml=`<input type="text" placeholder="{0}">`.Format(gettext('Write your answer here...'));
                if(q.type=='textarea') inHtml=`<textarea placeholder="{0}"></textarea>`.Format(gettext('Write your answer here...'));
                ckfHTML+=getTmplInnerHtml('#checkout-field-question').Compile({title:q.title+(q.required?' *':''),
                    required:q.required?'1':'0',inHtml:inHtml,type:q.type});
            });
        }
        return ckfHTML;
    }
    function bindReyquestAction(pModal){
        Array.from(pModal.container.querySelectorAll('.form-field-phone')).forEach(function (ele,i) {
            v('click',function (e) {
                var _select=eleParents(e.target,'.form-field-phone').querySelector('.dial-code-select');
                if(_select.style.display=='block'){
                    _select.style.display='none';
                }else{
                    _select.style.display='block';
                }
            },ele.querySelector('.dial-code'));
            v('click',function (e) {
                if(eleParents(e.target, 'ul').querySelector('.selected')) eleParents(e.target, 'ul').querySelector('.selected').classList.remove('selected');
                var _li=eleParents(e.target, 'li');
                _li.classList.add('selected');
                eleParents(e.target,'.form-field-phone').querySelector('.dial-code span').innerText=_li.dataset.dial;
                eleParents(e.target, '.dial-code-select').style.display='none';
            },ele.querySelector('.dial-code-select ul'))
        });
        if(pModal.container.querySelector('.form-field-regions select')){//form-field-regions
            v('change',function(e) { 
                if(e.target.value){
                    e.target.classList.add('selected');
                }else{
                    e.target.classList.remove('selected');
                }
            },pModal.container.querySelector('.form-field-regions select'));
        }
        v("keyup", payRequestCheck, pModal.container.querySelector('.checkout-fields'));
        v("click", payRequestAction, pModal.container.querySelector('.support-continue button'));
    }
    function payRequestContinue(fbe){
        var pTar=eleParents(fbe, '.support-box');
        var opAmount=pTar.querySelector('.form-field-radio-option input:checked'),opService=pTar.querySelector('.form-field-radio-option input:checked+label').innerText,
            opField=opAmount.parentElement;
        if(!opAmount||!opAmount.value) return;
        var _prod=JSON.parse(decodeURIComponent(pTar.dataset.txt));
        var _pModal=popupModal({cls:'popup-embed-request'}),price=opField.querySelector('span').innerText;
        _pModal.popup.classList.add('popup-embed-tsp-products-v1');
        var ckfHTML=renderReqestCheckoutForm(_prod);
        _pModal.container.innerHTML=getTmplInnerHtml('#embed-request-detail').Compile({
            success:encodeURIComponent(_prod.checkout_form.thanks_text||''),link:opAmount.nextElementSibling.innerText,
            service:opService,price:price,amount:price,ppid:'pp-linkbio-stripe',key:isTestEnv()?'pk_test_a58SUgfujyDKzKwAnrVPJQYM00UZgqfkkY':'pk_live_NpGxLWQTNrwUvJBRGIhgMrnD00icrImpe3',
            amountInt:parseInt(opAmount.value,10),kid:fbe.dataset.kid,ckfHTML:ckfHTML,reqType:'request',
        });
        bindReyquestAction(_pModal);
    }
    function payDigitalContinue(fbe,pType){
        // var pTar=eleParents(fbe, '.support-box');
        var prodCmpt=document.querySelector('#'+fbe.dataset.kid + ' .item-block');
        var _prod=JSON.parse(decodeURIComponent(prodCmpt.dataset.prod));
        var opAmount=parseInt((_prod.sale_price?_prod.sale_price:_prod.price) * 100, 10),amoutTotal=0;
        // if(!opAmount) return;
        // var _other=__data.bio.other||{};
        var _pModal=popupModal({cls:'popup-embed-request'}),priceHTML='',price='',dPrice='',cy_sym=_getCySym(),choiceHtml='';
        if(_prod.sale_price){
            priceHTML='<span>{sym}{sale_price}</span> <span>{sym}{price}</span>'.Compile({sym:cy_sym,sale_price:_prod.sale_price,price:_prod.price});
            dPrice=cy_sym+_prod.sale_price;
            amoutTotal=parseInt(_prod.sale_price,10)*100;
        }else{
            priceHTML='<span>{sym}{price}</span>'.Compile({sym:cy_sym,price:_prod.price});
            amoutTotal=parseInt(_prod.price,10)*100;
        }
        price=cy_sym+_prod.price;
        if(pType=='ctmprod'){
            var pTar=eleParents(fbe, '.embed-tsp-prodinfo__cont'),_choicesDom=pTar.querySelectorAll('.tsp_prodinfo__choices .selected');
            if(_choicesDom.length>0){
                _choicesDom.forEach(function (c) {
                    choiceHtml+=`<div class="checkout-summary--price checkout-summary--choice-item" data-cAmount="{amount}"><p class="">{title}</p><p>{price}</p></div>`.Compile({
                        title:c.querySelector('.tsp_prodinfo__choice-title').innerText,price:c.querySelector('.tsp_prodinfo__choice-amount').innerText,amount:c.dataset.amount
                    });
                    opAmount+=parseInt(c.dataset.amount,10);
                    amoutTotal+=parseInt(c.dataset.amount,10);
                });
            }
        }
        amoutTotal= cy_sym+(amoutTotal/100.0);
        _pModal.popup.classList.add('popup-embed-tsp-products-v1', 'popup-embed-digital');
        var ckfHTML=renderReqestCheckoutForm(_prod,pType);
        _pModal.container.innerHTML=getTmplInnerHtml('#embed-request-detail').Compile({
            success:encodeURIComponent(_prod.checkout_form.thanks_text||''),
            priceHTML:priceHTML,amount:amoutTotal,ppid:'pp-linkbio-stripe',key:isTestEnv()?'pk_test_a58SUgfujyDKzKwAnrVPJQYM00UZgqfkkY':'pk_live_NpGxLWQTNrwUvJBRGIhgMrnD00icrImpe3',
            amountInt:opAmount,kid:fbe.dataset.kid,ckfHTML:ckfHTML,image:clearImage(_prod.image),prodTitle:_prod.title,
            price:price,dp:dPrice,reqType:pType||'digital',choiceHtml:choiceHtml,
        });
        if(dPrice) _pModal.container.querySelector('.checkout-summary--dp').style.display='flex';
        var _pMProd=document.querySelector('.popup-embed-digital-prodinfo');
        if(_pMProd) _pMProd.remove();
        bindReyquestAction(_pModal);
    }
    function payRefreshOrder(actions,autoRefresh){
        if(actions.length==3){
            if(actions[0]=='refresh'&&(actions[2]=='digital')){
                ibjax('POST', '/share/request/{uid}/link/{lnkid}/pm/refresh/'.Compile({lnkid:__data.bio.id,uid:__data.ui.uid}),
                    {data: {orderId:document.querySelector('.popup-embed-request-thanks .embed-request__cont').dataset.oid,reqType:'digital',},
                        fn: function (resp) {
                            resp=JSON.parse(resp||'{}');
                            if(resp.code==0){
                                if(resp.data&&resp.data.files){
                                    var _pModal=document.querySelector('.popup-embed-request-thanks'),
                                    _thx=_pModal.querySelector('.request-thanks__title').innerHTML,
                                    email=_pModal.querySelector('.request-thanks__tips strong').innerHTML,filesHTML='';
                                    // _pModal.container.innerHTML=getTmplInnerHtml('#embed-request-thanks-loading').Compile({title:_thx, email:email,reqType:reqType,orderId:resp.data.orderId});
                                    var _fileTmpl=`<div class="request-thanks__files-item">
                                    <p class="request-thanks__files-icon">
                                        <img src="https://bio.linkcdn.cc/instabio.cc/embed/{fileType}.png" alt="{fileType}"/>
                                    </p>
                                    <div class="request-thanks__files-txt">
                                        <p class="txt-ellipsis">{fileName}</p>
                                        <p class="request-thanks__files-txt-size txt-ellipsis">{fileSize}</p>
                                    </div>
                                    <p class="request-thanks__files-share">
                                        <a download="{fileName}" href="{fileUrl}" target="_blank">
                                            <img src="https://bio.linkcdn.cc/instabio.cc/embed/{fileIcon}.png" alt="{fileIcon}"/></a>
                                    </p>
                                </div>`;
                                    resp.data.files.forEach(function (f) {
                                        filesHTML+=_fileTmpl.Compile({fileType:f.fileType,fileName:f.fileName,fileSize:f.fileSize,fileUrl:f.fileUrl,fileIcon:f.fileIcon});
                                    });
                                    autoRefresh = false;
                                    _pModal.querySelector('.embed-request__cont').classList.add('request-thanks__ok');
                                    _pModal.querySelector('.embed-request__cont').innerHTML=getTmplInnerHtml('#embed-request-thanks-ok-digital').Compile({
                                        title:_thx,filesHTML:filesHTML, email:email});
                                }
                            }else{
                                swal('','Something wrong','error');
                            }
                            if(autoRefresh){
                                setTimeout(function(){payRefreshOrder(actions, payRefreshOrder);},2000);
                            }
                        }
                    });
            }
        }
    }
    function selectCheckbox(that, actions){
        if(actions.length==3){
            if(actions[1] == 'ctmprodchoice'){
                var pTar=eleParents(that, actions[2]);
                if(pTar){
                    pTar.classList.toggle('selected');
                }
            }
        }
    }
    function showTextMore(pTar){
        var val={title:pTar.querySelector('.podcast-text--title').innerHTML,artist:pTar.querySelector('.podcast-text--artist').innerHTML,
            desc:pTar.querySelector('.podcast-text--desc p').innerHTML};
        var _pModal=popupModal({cls:'popup-podcast--box'});
        _pModal.container.classList.add('popup-podcast', 'animate__animated', 'animate__fadeInPopup');
        _pModal.container.innerHTML=getTmplInnerHtml('#popupPodcastText').Compile(val);
    }
    function showPodcastAll(pTar){
        var _cmpt=__data.content.cmpts.find(c => c.id==pTar.id);
        if(_cmpt&&_cmpt.link){
            var _pModal=popupModal({cls:'popup-podcast--box'});
            var _podcast=JSON.parse(_cmpt.text);
            var _podcast_linksHtml='',_podcastItemHTML=`<div class="podcast-platforms--item">
                    <a href="{url}" target="_blank">
                        <img class="podcast-platforms--logo" src="https://bio.linkcdn.cc/bio/links/podcast/{logo}.png" alt="{logo}">
                        <p class="podcast-platforms--title">{title}</p>
                        <svg viewBox="0 0 16 16" enable-background="new 0 0 24 24"><path d="M16 10V13.5C16 14.9 14.9 16 13.5 16H2.5C1.1 16 0 14.9 0 13.5V2.5C0 1.1 1.1 0 2.5 0H6C6.3 0 6.5 0.2 6.5 0.5C6.5 0.8 6.3 1 6 1H2.5C1.7 1 1 1.7 1 2.5V13.5C1 14.3 1.7 15 2.5 15H13.5C14.3 15 15 14.3 15 13.5V10C15 9.7 15.2 9.5 15.5 9.5C15.8 9.5 16 9.7 16 10ZM16 0.3C15.9 0.1 15.7 0 15.5 0H10C9.7 0 9.5 0.2 9.5 0.5C9.5 0.8 9.7 1 10 1H14.3L7.6 7.6C7.4 7.8 7.4 8.1 7.6 8.3C7.8 8.5 8.1 8.5 8.3 8.3L15 1.7V6C15 6.3 15.2 6.5 15.5 6.5C15.8 6.5 16 6.3 16 6V0.5C16 0.4 16 0.4 16 0.3Z" fill="#96A1AD"></path></svg>
                    </a>
                </div>`;
            _podcast_links.forEach(function (val) {
                if(_podcast.links[val.platform]){
                    _podcast_linksHtml+=_podcastItemHTML.Compile({logo:val.platform,title:val.title,url:_podcast.links[val.platform].url||'javascript:;'});
                }
            });

            // var _popupContainer=d.createElement('div');
            _pModal.container.classList.add('popup-podcast', 'animate__animated', 'animate__fadeInPopup');
            _pModal.container.innerHTML=getTmplInnerHtml('#popupPodcastListenOn').Compile({html:_podcast_linksHtml});
        }
    }
    function showImagesMore(pTar,actions){
        pTar.classList.add('gallery--showall');
    }
    function showCardContactMore(pTar,actions){
        // pTar.classList.add('gallery--showall');
        if(pTar.querySelector('.embed-action--more').classList.contains('up')){
            pTar.querySelector('.embed-event-detail').classList.add('hidden');
            pTar.querySelector('.embed-action--more').classList.remove('up');
        }else{
            pTar.querySelector('.embed-event-detail').classList.remove('hidden');
            pTar.querySelector('.embed-action--more').classList.add('up');
        }
    }
    function showMenuMore(pTar,actions){
        if(pTar.querySelector('.embed-menu__box').classList.contains('hasMore')){
            pTar.querySelector('.embed-menu__box').classList.remove('hasMore');
            pTar.querySelector('.embed-menu__box').classList.add('showall');
        }else{
            pTar.querySelector('.embed-menu__box').classList.add('hasMore');
            pTar.querySelector('.embed-menu__box').classList.remove('showall');
        }
    }
    function showFaqsOpen(pTar,actions){
        if(pTar.classList.contains('open')){
            pTar.classList.remove('open');
        }else{
            pTar.classList.add('open');
        }
    }
    function getImageBase64(img,imgType) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        var dataURL = canvas.toDataURL("image/"+imgType.toLowerCase());
        return dataURL;
    }
    function cutVCardLine(txt){
        // VCARD 75 characters per line
        var _tmpl='',_tmpl0='';
        if(txt.length>75){
            _tmpl0=txt.substring(0,75);
            // _tmpl0.replace(/;$/, '');
            _tmpl+= '\n' + _tmpl0;
            _tmpl+=cutVCardLine(' '+txt.substring(75));
        }else{
            _tmpl= '\n'+txt;
        }
        return _tmpl;
    }
    function saveCardContacts(bid,resave){
        resave=resave||false;
        var elementA = document.createElement('a');
        elementA.download =(location.pathname.substring(1)?location.pathname.substring(1):location.host)+".vcf";
        // elementA.style.display = 'none';
        elementA.targent = "_blank";
        let item,bEle;
        if(bid=='button'){
            bEle=document.querySelector('.button-item .embed--box');
            let pTar=ep(bEle,'.button-item'),btnItem=pTar.querySelector('button');
            item={text:decodeURIComponent(btnItem.dataset.txt)};
        }else{
            item=__data.content.cmpts.find(c => c.id==bid);
            bEle=document.querySelector('#'+bid);
        }
        let txt=JSON.parse(item.text||'{}'),vCard=`BEGIN:VCARD\nVERSION:3.0`,
            _val='',_vcAddress='',_vcUrl='';
        if(txt.username){
            vCard+='\nN:;{0};'.Format(txt.username);
        }
        if(txt.organization) vCard+='\nORG:'+txt.organization;
        if(txt.jobTitle) vCard+='\nTITLE:'+txt.jobTitle;
        // if(txt.pronouns) vCard+='\nPRONOUN:'+txt.pronouns;
        txt.links.forEach(function (c) {
            switch (c.type) {
                case 'email':
                    // _vc='EMAIL;type=INTERNET;TYPE={0};type=pref:{1}'.Format(item.link2.toUpperCase(),item.link);
                    _vcUrl+='\nEMAIL;type=INTERNET;TYPE={0};type=pref:{1}'.Format((c.tag||'Email').toUpperCase(),c.link);
                    break;
                case 'phone':
                    // 'TEL;TYPE={0};type=VOICE;type=pref:{1}'.Format(item.link2.toUpperCase(),item.link);
                    _vcUrl+= '\nTEL;TYPE={0};type=VOICE;type=pref:{1}'.Format((c.tag||'MOBILE').toUpperCase(),c.link);
                    break;
                case 'address':  // link - emebed video
                    if(c.link){
                        _vcUrl+='\nURL;TYPE=Address:{0}'.Format('https://www.google.com/maps/search/'+c.link);
                    }
                    break;
                case 'link':  // link - emebed music
                    if(c.link){ 
                        _vcUrl+='\nURL;TYPE=Link:{0}'.Format(c.link);
                    }
                    break;
                default:
                    break;
            }
        });
        vCard+=_vcUrl;
        vCard+='\nURL;TYPE=Linkbio:'+location.href;
        if(txt.note) vCard+='\nNOTE:'+(txt.note||'').replace(/\n/g,'\\n');
        if(txt.cover||txt.companyLogo){
            //PHOTO;TYPE=jpeg;VALUE=uri:
            //PHOTO;TYPE=JPEG;ENCODING=b:
            let _img=txt.cover||txt.companyLogo,_imgType='JPEG',_imgeEle;
            if(_img.indexOf('.png')!=-1) _imgType='PNG';
            if(_img.indexOf('.gif')!=-1) _imgType='GIF';
            if(txt.cover) _imgeEle=bEle.querySelector('.image-box .cover-image');
            else _imgeEle=bEle.querySelector('.image-box .com-logo');
            _val='PHOTO;TYPE={0};ENCODING=b:{1}'.Format(_imgType,getImageBase64(_imgeEle,_imgType).replace(/data:image\/[a-z]{2,8};base64,/i,''));
            vCard+=cutVCardLine(_val);
            // vCard+='\nPHOTO;TYPE={0};VALUE=uri:{1}'.Format(_imgType,clearImage(txt.cover||txt.companyLogo));
            // vCard+='\nPHOTO;TYPE={0};ENCODING=b:{1}'.Format(_imgType,clearImage(txt.cover||txt.companyLogo));
            // vCard+='\nPHOTO:{0}'.Format(clearImage(txt.cover||txt.companyLogo));
        }
        vCard+='\nEND:VCARD';
        var blob = new Blob([vCard],{type: "text/vcard"});
        var _url=URL.createObjectURL(blob);
        elementA.href = _url;
        document.body.appendChild(elementA);
        elementA.dispatchEvent(new MouseEvent("click",{bubbles: !0,cancelable: !0,view: window}));
        document.body.removeChild(elementA);
        URL.revokeObjectURL(_url);
        var os=function( ua ) {
            var ret = {},android = ua.match(/(?:Android);?[\s\/]+([\d.]+)?/),ios = ua.match(/(?:iPad|iPod|iPhone).*OS\s([\d_]+)/);
            //android && (ret.android = parseFloat(android[1]));
            //ios && (ret.ios = parseFloat(ios[1].replace( /_/g, '.' )));
            if(android) return 'android';
            if(ios) return 'ios';
            return 'browser';
        }(navigator.userAgent||navigator.appVersion);
        if(os=='ios'&&!resave){//tips for ios, creat new contact
            setTimeout(function(){
                showEmbedTips4iOSContact(bid);
            },1000);
        }
    }
    function showEmbedTips4iOSContact(bid){
        var _div=d.createElement('div'),_divBox=d.createElement('div'),_divBg=d.createElement('div');
        _divBg.className='embed-bg embed-bg--fixed';
        _divBox.className='embed-box embed--tips';
        _divBox.innerHTML='<button toggle="close" action="embed/popup/.embed-bg" class="embed-close"><i class="iconfont icon-close"></i></button><div class="embed-box-title">{0}</div>'.Format(gettext("Did you connect?"));
        _divBox.id=bid;
        _div.className='embed-tips-4ioscontact';
        _divBox.appendChild(_div);
        _divBg.appendChild(_divBox);
        d.querySelector('body .container').append(_divBg);
        var servicesHTML=`
        <div class="tips-title--lines">
            {0}
        </div>
        <div class="tips-image"><image src="https://bio.linkcdn.cc/instabio.cc/images/tips/savevc.png" alt=""></div>
        <div class="tips-actons">
            <button toggle="save" action="contact/tips" ><span>{1}</span></button>
        </div>
        `.Format(gettext("Scroll down and tap 'Create New Contact' to save! Tapping 'Done' does not save the way you expect."),
        gettext("Try Saving Again"));

        _div.innerHTML+='<div class="tips--box">{0}</div>'.Format(servicesHTML);
    }
    function toggleAction(toggle,action,that){
        var _action=action.split('/'),pTar=null;
        if(toggle=='more'&&_action[0]=='showDescMore'){
            pTar=ep(that,_action[1]);
            if(pTar) showTextMore(pTar);
        }
        if(toggle=='more'&&_action[0]=='showImagesMore'){
            pTar=ep(that,_action[1]);
            if(pTar) showImagesMore(pTar, _action);
        }
        //more/contact/block/.item-contact
        if(toggle=='show'&&_action[0]=='more'){
            if(_action[1]=='contact'){
                if(_action[2]=='block'){
                    pTar=ep(that,_action[3]);
                    if(pTar) showCardContactMore(pTar, _action);
                }else{
                    pTar=ep(that,'.item');
                    if(pTar) showCardContactMore(pTar, _action);
                }
            }
            if(_action[1]=='menu'){
                pTar=ep(that,_action[2]);
                if(pTar) showMenuMore(pTar, _action);
            }
        }
        if(toggle=='show'&&_action[0]=='open'){
            if(_action[1]=='faqs'){
                pTar=ep(that,_action[2]);
                if(pTar) showFaqsOpen(pTar, _action);
            }
        }
        if(toggle=='scroll'&&that.disabled==false){
            pTar=ep(that,_action[1]);
            if(pTar&&pTar.querySelector(_action[2])) scrollAction(pTar,_action,that)
        }
        if(toggle=='showall'&&_action[0]=='podcast'){
            if(_action[1]=='google'){
                pTar=ep(that,_action[2]);
                if(pTar&&pTar.id) showPodcastAll(pTar);
            }
        }
        if(toggle=='transform'){
            pTar=ep(that,_action[1]);
            if(pTar&&pTar.querySelector(_action[2])) transformAction(pTar,_action,that)
        }
        if(toggle=='play'){
            pTar=ep(that,_action[1]);
            if(pTar) playAction(pTar,_action,that)
        }
        if(toggle=='share'){
            shareAction();
        }
        if(toggle=='close'){
            if(_action.length==3){
                if(_action[0]=='block'&&_action[1]=='button'){
                    closeBlockButton(that,_action[2]);
                }else if(_action[0]=='tsp'&&_action[1]=='product'){
                    closeTSPProduct(that,_action[2]);
                }else if(_action[0]=='cw'&&_action[1]=='mask'){
                    closeMaskCW(that,_action[2]);
                }else if(_action[0]=='embed'&&_action[1]=='popup'){
                    closeEmbedPopup(that,_action[2]);
                }
            }
        }
        if(toggle=='presave'&&action=='presave'){
            var _url =that.getAttribute('href');
            window.open(_url);
        }
        if(toggle=='popup'){
            popupAction(that, _action);
        }
        if(toggle=='fund'){
            fundAction(that, _action);
        }
        if(toggle=='view'){
            if(_action.length==3){
                if(_action[0]=='tsp'&&_action[1]=='products'){
                    viewTSPProducts(that,_action[2]);
                }
                if(_action[0]=='tsp'&&_action[1]=='prodinfo'){
                    viewTSPProdInfo(that,_action[2]);
                }
                // [].includes()
                if(_action[0]=='linkbio'&&(['digital','qas','ctmprod'].includes(_action[1]))){
                    viewDigitalProdInfo(that,_action[2],_action[1]);
                }
            }
        }
        if(toggle=='request'){
            var _currency=(__data.bio.other||{}).currency||'';
            if(!_currency) return;
            if(_currency.toLowerCase()=='hkd') return;
            if(action=='request'){
                payRequestContinue(that);
            }else if(action=='digital'||action=='qas'||action=='ctmprod'){
                payDigitalContinue(that,action);
            }else if(_action[0]=='refresh'){
                payRefreshOrder(_action)
            }
            return;
        }
        if(toggle=='select'){
            if(_action[0]=='checkbox'){
                selectCheckbox(that,_action);
            }
            return;
        }
        if(toggle=='save'){
            if(_action[0]=='contact'&&_action[1]=='block'){
                saveCardContacts(_action[2]);
            }
            if(_action[0]=='contact'&&_action[1]=='button'){
                saveCardContacts('button');
            }
            if(_action[0]=='contact'&&_action[1]=='tips'){
                let bid=ep(that,'.embed-box').id;
                saveCardContacts(bid,true);
            }
            return;
        }
    }
    function _embedIframeUitl(link,fbe,embedCls,loadFn){
        var _div=d.createElement('div'),_ep = eleParents(fbe,'.button-item'),_divBox;
        _div.className='embed-iframe ' + embedCls;
        if(!_ep) return;
        if(_ep.querySelector('.embed-boxBG')){
            setTimeout(function (){
                _ep.querySelector('.item').classList.remove('button--expended');
            },100);
            _ep.querySelector('.embed-boxBG').remove();
            return;
        }
        removeEmbedBox();

        _divBox=d.createElement('div');
        _divBox.className='embed-boxBG embed--box';
        _ep.appendChild(_divBox);
        _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
        _divBox.appendChild(_div);
        let referrerpolicy='';
        if(link.indexOf('youtube.com') !=-1) referrerpolicy='referrerpolicy="strict-origin-when-cross-origin"';
        _div.innerHTML='<iframe src="{link}" width="100%" height="100%" frameborder="0" allowfullscreen="true" scrolling="no" allow="accelerometer; autoplay;fullscreen;encrypted-media; gyroscope; picture-in-picture" {referrerpolicy} allowfullscreen></iframe>'.Compile({link:link,referrerpolicy:referrerpolicy});
        if(loadFn){
            _div.querySelector('iframe').onload=loadFn;
        }
        return {div:_div,divBox:_divBox,ep:_ep};
    }
    function _embedPlatformUtil(fbe,embedCls,loadFn,embedStyle){
        var _div=d.createElement('div'),_ep = eleParents(fbe,'.button-item'),_divBox;
        _div.className=' ' + embedCls;
        if(!_ep) return;
        if(_ep.querySelector('.embed-boxBG')){
            setTimeout(function (){
                _ep.querySelector('.item').classList.remove('button--expended');
            },100);
            _ep.querySelector('.embed-boxBG').remove();
            return;
        }
        removeEmbedBox();

        _divBox=d.createElement('div');
        _divBox.className='embed-boxBG embed--box';
        if(embedStyle&&embedStyle=='innerBtn'){
            _ep.querySelector('.item').appendChild(_divBox);
        }else{
            _ep.appendChild(_divBox);
        }
        _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
        _divBox.appendChild(_div);

        if(loadFn){
            _div.querySelector('iframe').onload=loadFn;
        }
        return {div:_div,divBox:_divBox,ep:_ep};
    }
    function embedVideo(fbe){
        var link=decodeURIComponent(fbe.dataset.embed||fbe.dataset.html||''),embedCls='',iframeH='',iframeW='';
        if(link.indexOf('twitch.tv') !=-1) link+=('&parent='+location.host);
        // if(link.indexOf('tiktok.com') !=-1) _div.className+=' embed-iframe-tiktok';
        // if(link.indexOf('vimeo.com') !=-1) _div.className+=' embed-iframe-vimeo';
        // if(link.indexOf('bilibili.com') !=-1) _div.className+=' embed-iframe-bilibili';
        if(link.indexOf('tiktok.com') !=-1) embedCls = 'embed-iframe-tiktok';
        if(link.indexOf('vimeo.com') !=-1) embedCls = 'embed-iframe-vimeo';
        if(link.indexOf('bilibili.com') !=-1) embedCls = 'embed-iframe-bilibili';
        //https://www.facebook.com/plugins/video.php?height=476&href=https://www.facebook.com/100078429421944/videos/427553943006343/&show_text=false&width=267&t=0
        if(link.indexOf('facebook.com/plugins/video.php')!=-1){
            iframeH=GetQueryString('height',link);
            iframeW=GetQueryString('width',link);
            embedCls='embed-iframe-facebookEmbed';
        }else if(link.indexOf('facebook.com')!=-1||link.indexOf('fb.watch')!=-1||link.indexOf('fb.gg')!=-1){
            let ombedObj=_embedPlatformUtil(fbe,'embed-iframe embed-iframe-facebook');
            ombedObj.divBox.style.height='auto';
            ombedObj.div.innerHTML='<div class="fb-video" data-href="{0}" data-width="{1}" data-allowfullscreen="true"></div>'.Format(decodeURIComponent(link),ombedObj.ep.getBoundingClientRect().width);
            if(d.querySelector('#fb-sdk-js')){
                FB.XFBML.parse(ombedObj.div);
            }else{
            var fjs=d.getElementsByTagName(s)[0];
            var js=d.createElement(s);
            js.id='fb-sdk-js';
            js.async=!0;
            js.src='https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0';
            fjs.parentNode.insertBefore(js, fjs);}
            lfbvideo(ombedObj.ep).then(function (){
                ombedObj.ep.querySelector('.item').classList.add('button--expended');
                ombedObj.ep.querySelector('iframe').onload=function (){
                    endLoaded(ombedObj.ep.querySelector('.embed-loading'));
                };
            })
            return;
        }
        var embedObj=_embedIframeUitl(link,fbe,embedCls);
        if(link.indexOf('facebook.com/plugins/video.php')!=-1){
            embedObj.div.querySelector('iframe').style.height=iframeH+'px';
            embedObj.div.querySelector('iframe').style.width=iframeW+'px';
        }
        embedObj.div.querySelector('iframe').onload=function(){
            if(link.indexOf('facebook.com/plugins/video.php')!=-1){
                embedObj.divBox.style.minHeight=iframeH+'px';
            }else{
                embedObj.divBox.style.height='320px';
            }
            endLoaded(embedObj.ep.querySelector('.embed-loading'));
            setTimeout(function () {
                embedObj.ep.querySelector('.item').classList.add('button--expended', 'embed--alone');
                embedObj.divBox.style.height='auto';
            },410);
            if(embedObj.div.classList.contains('embed-iframe-tiktok')){
                embedObj.div.style.height='737px';
            }else if(embedObj.div.classList.contains('embed-iframe-vimeo')){
                embedObj.div.style.paddingBottom='56%';
            }else if(embedObj.div.classList.contains('embed-iframe-bilibili')){
                embedObj.div.style.paddingBottom='68%';
            }else if(embedObj.div.classList.contains('embed-iframe-facebookEmbed')){
                // embedObj.div.style.height=iframeH+'px';
            }else{
                embedObj.div.style.height='auto';
            }
        };
    }
    function embedTwitch(fbe){
        var link=decodeURIComponent(fbe.dataset.embed||fbe.dataset.html||'');
        if(link.indexOf('twitch.tv') !=-1){
            link+= (link.indexOf('?')!=-1?'&':'?') + 'parent='+location.host;
        }
        var embedObj=_embedIframeUitl(link,fbe,'embed-iframe-twitch'+fbe.dataset.st);
        embedObj.div.querySelector('iframe').onload=function(){
            embedObj.divBox.style.height='320px';
            endLoaded(embedObj.ep.querySelector('.embed-loading'));
            setTimeout(function () {
                embedObj.ep.querySelector('.item').classList.add('button--expended', 'embed--alone');
                embedObj.divBox.style.height='auto';
            },410);
            embedObj.div.style.height='auto';
        };
    }
    function embedInstagram(fbe){
        var link=decodeURIComponent(fbe.dataset.embed||fbe.dataset.html||''),
        item={id:ep(fbe,'.biolink').id};
        if(link.indexOf('?') > 0) item.path = link.split('?')[0];
        else item.path=link;
        if(item.path.indexOf('profilecard/')>0) item.path=item.path.replace('profilecard/','');
        item.path+=(item.path.endsWith('/')?'':'/')+'embed/';
        if(fbe.dataset.st==14) item.path+='captioned/';
        var _path='https://bio.linkcdn.cc/instabio.cc/embed/cmpt.html?t=1727339263762';
        var embedObj=_embedIframeUitl(_path,fbe,'iframe--box embed-iframe-instagram');
        embedObj.div.querySelector('iframe').onload=function(){
            embedObj.divBox.style.height='300px';
            // endLoaded(_ep.querySelector('.embed-loading'));
            this.contentWindow.postMessage({fn:'renderContent',cmpt:item,type:'embedIframe',platform:'instagram'}, '*');
            setTimeout(function () {
                embedObj.ep.querySelector('.item').classList.add('button--expended', 'embed--alone');
                embedObj.divBox.style.height='auto';
            },410);
            embedObj.div.style.height='auto';
        };
    }
    function embedPodcast(fbe){
        var _path=decodeURIComponent(fbe.dataset.embed||fbe.dataset.html||''),_embed=fbe.dataset.path||'';
        if(_path.indexOf('podcasts.google.com') !=-1){
            let ombedObj=_embedPlatformUtil(fbe,'embed-iframe-podcast');
            ombedObj.div.classList.add('embed-'+_embed);
            // google podcast
            var _podcast = JSON.parse(decodeURIComponent(fbe.dataset.txt||'{}'));
            var _podcastItemHTML = `<div class="podcast-platforms--item">
                                <a href="{url}" target="_blank"><img class="podcast-platforms--logo" src="https://bio.linkcdn.cc/bio/links/podcast/{logo}.png" alt="{logo}"><p class="podcast-platforms--title">{title}</p></a>
                            </div>`;
            var _podcast_linksHtml='',_podcastCnt=0;
            _podcast_links.forEach(function (val) {
                if(_podcast.links[val.platform]){
                    if(_podcastCnt<6){
                        _podcast_linksHtml+=_podcastItemHTML.Compile({logo:val.platform,title:val.title,url:_podcast.links[val.platform].url||'javascript:;'});
                    }
                    _podcastCnt++;
                }
            });
            var __podcast={thumbnailUrl:_podcast.image,title:_podcast.title,artistName:_podcast.artistName,description:_podcast.description,linksHtml:_podcast_linksHtml};
            if(_podcastCnt<=6) __podcast.display='hidden';
            ombedObj.div.innerHTML=getTmplInnerHtml('#podcastGoogleItemTmplEmbed').Compile(__podcast);
            // podcast recent episodes
            var url='/share/bl/link/{0}/itgr/google/op/podcast.recent/?link={1}'.Format(__data.bio.id,encodeURIComponent(_path));
            ibjax('GET',url,{
                fn:function (resp) {
                    resp = JSON.parse(resp);
                    if(resp.code==0){
                        var _recentItemHtml=getTmplInnerHtml('#podcastGoogleItemTmpl2'),_recentHtml='';
                        resp.data.episodes.forEach(function (val) {
                            var _val={url:(val.links.googlePodcasts||{}).url,thumbnailUrl:val.thumbnailUrl,title:val.title,};
                            var _date=new Date();
                            _date.setFullYear(val.releaseDate.year);
                            _date.setMonth(val.releaseDate.month+1);
                            _date.setDate(val.releaseDate.day+1);
                            _val.date=_date.toLocaleDateString();
                            _val.duration=formatDuration(val.duration);
                            _recentHtml+=_recentItemHtml.Compile(_val);
                        });
                        ombedObj.div.querySelector('.podcast-recent--list').innerHTML=_recentHtml;
                    }
                    endLoaded(ombedObj.ep.querySelector('.embed-loading'));
                    ombedObj.ep.querySelector('.item').classList.add('button--expended');
                    ombedObj.divBox.style.height='auto';
                }
            });
        }else{
            var ombedObj=_embedIframeUitl(_path,fbe,'embed-iframe-podcast');
            // _div.innerHTML='<iframe src="{link}" width="100%" height="100%" frameborder="0" allowfullscreen="true" scrolling="no" allow="accelerometer; autoplay;fullscreen;encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'.Compile({link:_path});
            ombedObj.div.classList.add('embed-'+_embed);
            ombedObj.div.querySelector('iframe').onload=function(){
                ombedObj.divBox.style.height='152px';
                endLoaded(ombedObj.ep.querySelector('.embed-loading'));
                setTimeout(function () {
                    ombedObj.ep.querySelector('.item').classList.add('button--expended');
                    ombedObj.divBox.style.height='auto';
                },410);
                ombedObj.div.style.height='auto';
            };
        }
    }
    function embedProvecho(fbe){
        var _path=decodeURIComponent(fbe.dataset.embed||fbe.dataset.html||'');
        if(_path.indexOf('provecho.bio') > 0){
            _path=_path.split('provecho.bio/')[1];
            _path='https://www.provecho.bio/beacons/'+_path.split('/')[0];
        }else{
            _path='https://www.provecho.bio/beacons/'+_path.split('/')[0];
        }
        let ombedObj=_embedIframeUitl(_path,fbe,'embed-iframe-provecho');
        ombedObj.div.querySelector('iframe').onload=function(){
            ombedObj.divBox.style.height='320px';
            endLoaded(ombedObj.ep.querySelector('.embed-loading'));
            setTimeout(function () {
                ombedObj.ep.querySelector('.item').classList.add('button--expended', 'embed--alone');
                ombedObj.divBox.style.height='auto';
            },410);
            ombedObj.div.style.height='auto';
        };
    }
    function embedBonfire(fbe){
        var _link=decodeURIComponent(fbe.dataset.html||''),_resp=fbe.dataset.resp;
        var _osObj=CheckPlatformURL(_link);
        let ombedObj=_embedPlatformUtil(fbe,'bonfire-box embed-bonfire');
        var _embedAction=function (resp){
            if(resp){
                fbe.dataset.resp=encodeURIComponent(resp);
                resp = JSON.parse(resp);
                var _coll = {collectionImage:'',collectionName:resp.storeTitle||item.title||_osObj.fields[2]},_un='';
                _coll.deep_link=_link+(_link.indexOf('?')>-1?'&':'?');
                _coll.deep_link+='utm_medium=bonfire&utm_source=instabio&utm_campaign=button+embed';
                ombedObj.div.innerHTML=getTmplInnerHtml('#bioBonfireTmpl').Compile(_coll);
                var _assetHTML='';
                if(resp.storeLinkTreeCampaignModels){
                    resp.storeLinkTreeCampaignModels.forEach(function (asset) {
                        var _asset={nodeName:'a',link:asset.campaignUrl, title:asset.campaignName,image:asset.featuredProductImageUrl,
                            subtitle:asset.featuredProductPrice||'',btntext:'Buy now'};
                        _assetHTML+=getTmplInnerHtml('#bioCarouselItemTmpl').Compile(_asset);
                    });
                }
                ombedObj.divBox.querySelector('.carousel-items').innerHTML=_assetHTML;
                if(window.lozad){
                    var observer=lozad('.lozad', {root: ombedObj.divBox});
                    observer.observe();
                }
                endLoaded(ombedObj.divBox.querySelector('.embed-loading'));
                setTimeout(function () {
                    ombedObj.ep.querySelector('.item').classList.add('button--expended');
                    ombedObj.divBox.style.height='auto';
                },300);
            }
        }
        if(_resp){
            _resp = decodeURIComponent(_resp);
            _embedAction(_resp);
        }else if(_link){
            if(_osObj.platform=='bonfire'){
                var _url='https://wapi.instabio.cc/bonfire/{0}'.Format(_osObj.fields[2]);
                ibjax('GET', _url,{fn:function (resp){
                    _embedAction(resp);
                }});
            }
        }
    }
    function embedGofundme(fbe){
        var _path=decodeURIComponent(fbe.dataset.embed||fbe.dataset.html||'');
        _path=_path.split('?')[0].replace(/https?:\/\//i, '');
        var _pathArr=_path.split('/');
        _path='https://www.gofundme.com/f/{0}/widget/large'.Format(_pathArr[2]);
        var ombedObj=_embedIframeUitl(_path,fbe,'embed-iframe-gofundme');
        ombedObj.div.querySelector('iframe').onload=function(){
            ombedObj.divBox.style.height='320px';
            endLoaded(ombedObj.ep.querySelector('.embed-loading'));
            setTimeout(function () {
                ombedObj.ep.querySelector('.item').classList.add('button--expended', 'embed--alone');
                ombedObj.divBox.style.height='auto';
            },410);
            ombedObj.div.style.height='auto';
        };
    }
    function embedTwitter(fbe){
        var _div=d.createElement('div'),_ep = eleParents(fbe,'.button-item');
        _div.className='embed-twitter embed--box';
        if(!_ep) return;
        if(_ep.querySelector('.embed-twitter')){
            setTimeout(function (){
                _ep.querySelector('.item').classList.remove('button--expended');
            },100);
            _ep.querySelector('.embed-twitter').remove();
            return;
        }
        removeEmbedBox();
        var link=decodeURIComponent(fbe.dataset.embed||fbe.dataset.html||'').split('?')[0];
        var twCls='twitter-tweet',_st=fbe.dataset.st;
        if(_st==5){
            if(!/(twitter|x)\.com\/([a-zA-Z0-9_@]+?)\/status\/(.+)(\?.*)?$/.test(link)){
                _st=6;
            }
        }
        if(_st==6){link=link.replace(/(\/status\/.*)|(\/?\?.*)/i,'');twCls='twitter-timeline'}
        _div.innerHTML='<blockquote class="{2}" align="center" data-height="500"></blockquote>{1}<div class="embed-twitter-link"><a href="{0}" target="_blank"><span>View Tweet</span></a></div>'.Format(link,getTmplInnerHtml('#embedLoading'),twCls);
        _ep.append(_div);
        var loadTweetTimeline=function (st,lnk) {
            lnk=lnk.split('?')[0];
            if(st==5){
                twttr.widgets.createTweet(lnk.split('/').pop(),_div.querySelector('blockquote'),{align:'center'}).then(function () {
                    endLoaded(_div.querySelector('.embed-loading'),function () {
                        _ep.querySelector('.item').classList.add('button--expended');
                        _div.querySelector('.embed-twitter-link').style.display='block';
                    })
                });
            }else{
                twttr.widgets.createTimeline({sourceType:"profile",screenName:lnk.split('/').pop()},_div.querySelector('blockquote'),{height:500,align:'center'}).then(function () {
                    endLoaded(_div.querySelector('.embed-loading'),function () {
                        _ep.querySelector('.item').classList.add('button--expended');
                        _div.querySelector('.embed-twitter-link').style.display='block';
                    })
                });
            }
        };
        if(d.querySelector('#twitter-wjs')){
            loadTweetTimeline(_st,link)
        }else{
            var fjs=d.getElementsByTagName(s)[0];
            var js=d.createElement(s);
            js.id='twitter-wjs';
            js.async=!0;
            js.src='https://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);
            ltwwjs(window).then(function () {
                loadTweetTimeline(_st,link)
            });
        }
    }
    function embedPinterest(fbe){
        var _div=d.createElement('div'),_ep = eleParents(fbe,'.button-item'),_tmpl;
        _div.className='embed-pins';
        if(!_ep) return;
        if(_ep.querySelector('.embed-pins')){
            setTimeout(function (){
                _ep.querySelector('.item').classList.remove('button--expended');
            },100);
            _ep.querySelector('.embed-pins').remove();
            return;
        }
        removeEmbedBox();
        _div.innerHTML=getTmplInnerHtml('#embedLoading');
        _ep.append(_div);
        var link=decodeURIComponent(fbe.dataset.embed||fbe.dataset.html||'').split('?')[0];
        var regPin=/^https?:\/\/(([a-z]{1,6})\.)?pinterest\.([a-z]{0,2}\.)?([a-z]{1,3})/;
        if(link&&regPin.test(link)){
            _tmpl='<div class="embed-pins-pin"><a href="{0}" data-pin-do="{1}" {2}></a></div><div class="embed-twitter-link"><a href="{0}?utm_medium=social&utm_source=instabio&utm_campaign={3}" target="_blank"><span>View on Pinterest</span></a></div>';
            var links=link.replace(/^https?:\/\//,'').split('?')[0].split('/');
            if(link.indexOf('embed')!=-1){
                link = 'https://www.pinterest.com/pin/{0}/'.Format(GetQueryString('id',decodeURIComponent(fbe.dataset.embed||fbe.dataset.html||'')));
                _div.innerHTML=_tmpl.Format(link,'embedPin','','');
            }else{
                if(links.length>2){
                    if(links[1]=='pin'){
                        _div.innerHTML=_tmpl.Format(link,'embedPin','',fbe.dataset.title);
                    }else if(links[2]=='pins'||links[2]=='_saved'||links[2]=='_shop'||links[2]=='_created'||links[2]==''){
                        _div.innerHTML=_tmpl.Format(link,'embedUser','data-pin-board-width="480" data-pin-scale-height="240" data-pin-scale-width="160"',fbe.dataset.title);
                    }else{
                        _div.innerHTML=_tmpl.Format(link,'embedBoard','data-pin-board-width="480" data-pin-scale-height="240" data-pin-scale-width="160"',fbe.dataset.title);
                    }
                }else if(links.length==2){
                    _div.innerHTML=_tmpl.Format(link,'embedUser','data-pin-board-width="480" data-pin-scale-height="240" data-pin-scale-width="160"',fbe.dataset.title);
                }
            }
            if(d.querySelector('#pin-utils-js')||window.PinUtils){
                lpinjs(window).then(function () {
                    PinUtils.build(d.querySelector('.embed-pins-pin'));
                    setTimeout(function () {
                        _div.style.height='320px';
                        setTimeout(function () {
                            _div.style.height='auto';
                            _ep.querySelector('.item').classList.add('button--expended');
                            _div.querySelector('.embed-twitter-link').style.display='block';
                        },390);
                        endLoaded(_div.querySelector('.embed-loading'));
                    },300);
                });
            }else{
                var fjs=d.getElementsByTagName(s)[0];
                var js=d.createElement(s);
                js.id='pin-utils-js';
                js.async=!0;
                js.src='https://assets.pinterest.com/js/pinit.js';
                fjs.parentNode.insertBefore(js, fjs);
                lpinjs(window).then(function () {
                    setTimeout(function () {
                        _div.style.height='320px';
                        setTimeout(function () {
                            _div.style.height='auto';
                            _ep.querySelector('.item').classList.add('button--expended', 'embed--alone');
                            _div.querySelector('.embed-twitter-link').style.display='block';
                        },390);
                        endLoaded(_div.querySelector('.embed-loading'));
                    },300);
                });
            }
        }
    }
    function embedFeed(fbe){
        var _fc=d.querySelector('#form-tmpl-container');
        if(!_fc){_fc=d.createElement('div');_fc.id='form-tmpl-container';_fc.className='form-tmpl-container';d.body.appendChild(_fc);}
        var _divDetail=d.createElement('div');
        _divDetail.className='embed-box';
        _fc.innerHTML=`<div class="embed-rssfeed form-tmpl animate__animated animate__fadeInUp"><p class="form-tmpl-close"><i class="iconfont icon-close"></i></p></div>`;
        _fc.querySelector('.embed-rssfeed').appendChild(_divDetail);
        _divDetail.innerHTML=getTmplInnerHtml('#embedLoading');
        var txt=JSON.parse(decodeURIComponent(fbe.dataset.txt)||'{}');
        if(txt.link&&txt.feed){
            ibjax('GET','/share/{0}/link/{1}/itgr/{2}/op/rss.feed/?feed={3}&limit={4}'.Format(__data.ui.uid,__data.bio.id,txt.platform,txt.feed,txt.max),{
                fn:function (resp) {
                    resp=JSON.parse(resp||'{}');
                    if(resp.code==0){
                        var servicesHTML='';
                        (resp.data.items||[]).forEach(function (val,idx) {
                            servicesHTML+=getTmplInnerHtml('#rss-feed').Compile({logo:val.image?clearImage(val.image):'',
                                platform:txt.platform,link:val.link+(val.link.indexOf('?')>0?'&':'?')+'utm_medium=social&utm_source=instabio',title:val.title});
                        });
                        _divDetail.innerHTML+='<div class="form-control form-title" data-param="title"><span>{0}</span></div><div class="rss-feed">{1}</div>'.Format(fbe.querySelector('.btn-text p').innerText,servicesHTML);
                        var pl=(resp.data.items||[]).length;
                        _divDetail.style.height=(75+(pl?parseInt(pl/2,10)*50:0))+'px';
                        endLoaded(_divDetail.querySelector('.embed-loading'));
                        setTimeout(function () {
                            _divDetail.style.height='auto'
                        },400);
                    }
                }
            });
            _fc.style.display='block';
            d.querySelector('.tmpl-bg').style.display='block';
        }
    }
    function embedThread(fbe){
        var link=decodeURIComponent(fbe.dataset.embed||fbe.dataset.html||'');
        if(link.indexOf('?') > 0) link = link.split('?')[0];
        link+=(link.endsWith('/')?'':'/')+'embed';
        var ombedObj=_embedIframeUitl(link,fbe,'embed-iframe-thread');
        ombedObj.div.querySelector('iframe').onload=function(){
            ombedObj.divBox.style.height='320px';
            endLoaded(ombedObj.ep.querySelector('.embed-loading'));
            setTimeout(function () {
                ombedObj.ep.querySelector('.item').classList.add('button--expended', 'embed--alone');
                ombedObj.divBox.style.height='auto';
            },410);
        };
    }
    function embedContact(fbe){
        var _fc=d.querySelector('#form-tmpl-container');
        if(!_fc){_fc=d.createElement('div');_fc.id='form-tmpl-container';_fc.className='form-tmpl-container';d.body.appendChild(_fc);}
        var _divDetail=d.createElement('div');
        _divDetail.className='embed-box';
        _fc.innerHTML=`<div class="embed-contact form-tmpl animate__animated animate__fadeInUp"><p class="form-tmpl-close"><i class="iconfont icon-close"></i></p></div>`;
        _fc.querySelector('.embed-contact').appendChild(_divDetail);
        var txt=JSON.parse(decodeURIComponent(fbe.dataset.txt)||'{}');
        _fc.querySelector('.embed-contact').dataset.txt=fbe.dataset.txt;
        if(!d.querySelector('#grecaptcha-js')){
            var js1=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
            js1.id='grecaptcha-js';
            js1.async=!0;
            js1.src='https://www.recaptcha.net/recaptcha/api.js?render=explicit';
            fjs.parentNode.insertBefore(js1, fjs);
        }
        _divDetail.innerHTML=getTmplInnerHtml('#embed-verify').Format(txt.firstName+' '+txt.lastName)+getTmplInnerHtml('#embedLoading')+'<p class="embed-verify-tips">Verifying your identity...</p>';
        setTimeout(function () {
            _divDetail.style.height='220px';
            setTimeout(function () {
                _divDetail.style.height='auto';
            },300);
            _fc.style.display='block';
            d.querySelector('.tmpl-bg').style.display='block';
        },100);
        var renderContact=function(){
            var contactHTML='',_tmpl0='',_tmpl1='';
            if(txt.emailPrimary||txt.emailSecondary){
                if(txt.emailPrimary){
                    _tmpl0=`<div class="contact-item-body-item"><p>{0}</p><a href="mailto:{1}" target="_blank">{1}</a></div>`.Format(txt.emailPrimaryType.toLowerCase(),txt.emailPrimary);
                }
                if(txt.emailSecondary){
                    _tmpl1=`<div class="contact-item-body-item"><p>{0}</p><a href="mailto:{1}" target="_blank">{1}</a></div>`.Format(txt.emailSecondaryType.toLowerCase(),txt.emailSecondary);
                }
                contactHTML=`<div class="contact-email contact-item"><div class="contact-item-logo"><svg viewBox="0 0 48 48"><path class="cls-1" d="M40.27,7.73H7.73A5.48,5.48,0,0,0,2.3,13.27V34.73a5.48,5.48,0,0,0,5.43,5.54H40.27a5.48,5.48,0,0,0,5.43-5.54V13.26A5.48,5.48,0,0,0,40.27,7.73ZM40.06,20.2,24.78,30.28a1.42,1.42,0,0,1-1.56,0L7.93,20.2a1.49,1.49,0,0,1-.43-2,1.42,1.42,0,0,1,2-.46l0,0L24,27.27l14.5-9.55a1.43,1.43,0,0,1,2,.41l0,0A1.49,1.49,0,0,1,40.06,20.2Z"/></svg></div><div class="contact-item-body">{0}{1}</div></div>`.Format(_tmpl0,_tmpl1);
            }
            if(txt.phonePrimary||txt.phoneSecondary){
                _tmpl0='';_tmpl1='';
                if(txt.phonePrimary){
                    _tmpl0=`<div class="contact-item-body-item"><p>{0}</p><a href="tel://{1}" target="_blank">{1}</a></div>`.Format(txt.phonePrimaryType.toLowerCase(),txt.phonePrimary);
                }
                if(txt.phoneSecondary){
                    _tmpl1=`<div class="contact-item-body-item"><p>{0}</p><a href="tel://{1}" target="_blank">{1}</a></div>`.Format(txt.phoneSecondaryType.toLowerCase(),txt.phoneSecondary);
                }
                contactHTML+='<div class="contact-phone contact-item"><div class="contact-item-logo"><svg viewBox="0 0 48 48"><path class="cls-1" d="M41.78,33.29c-3.57-2.7-7.07-4.52-9.58-1.61,0,0-2.67,3.18-10.52-4.25-9.12-8.71-5.29-11.79-5.29-11.79,3.17-3.19,1.15-5.57-1.51-9.18S9.53,1.71,5.67,4.82c-7.44,6,3.05,20,8.35,25.46h0s8.07,8.34,13.14,11.12l2.72,1.52c3.89,2,8.27,2.91,11.35,1a7.94,7.94,0,0,0,2.83-3.1C45.78,37.88,44.83,35.59,41.78,33.29Z"/></svg></div><div class="contact-item-body">{0}{1}</div></div>'.Format(_tmpl0,_tmpl1)
            }
            if(txt.address1||txt.address2||txt.city||txt.state||txt.country||txt.postcode){
                _tmpl0='';
                if(txt.address1) _tmpl0+=txt.address1+', ';
                if(txt.address2) _tmpl0+=txt.address2+', ';
                if(txt.city) _tmpl0+=txt.city+', ';
                if(txt.state) _tmpl0+=txt.state+', ';
                if(txt.country) _tmpl0+=txt.country+', ';
                if(txt.postcode) _tmpl0+=txt.postcode+', ';
                _tmpl0.replace(/, $/, '');
                contactHTML+='<div class="contact-address contact-item"><div class="contact-item-logo"><svg viewBox="0 0 48 48"><path d="M24,2.89A16.32,16.32,0,0,0,7.69,19.17a16.08,16.08,0,0,0,2.88,9.24,3.76,3.76,0,0,0,.3.47L22.78,44.55a1.61,1.61,0,0,0,1.22.56,1.68,1.68,0,0,0,1.28-.63l11.85-15.6c.11-.15.21-.32.27-.42a16.15,16.15,0,0,0,2.91-9.29A16.32,16.32,0,0,0,24,2.89ZM24,25h0a5.75,5.75,0,1,1,.16-11.49A5.74,5.74,0,1,1,24,25Z"/></svg></div><div class="contact-item-body"><p>{0}</p></div></div>'.Format(_tmpl0)
            }
            if(txt.note){
                contactHTML+='<div class="contact-note contact-item"><div class="contact-item-logo"><svg viewBox="0 0 48 48"><path d="M38,3H10A3,3,0,0,0,7,6V42a3,3,0,0,0,3,3H38a3,3,0,0,0,3-3V6A3,3,0,0,0,38,3ZM32,19.51,27.72,15a1,1,0,0,0-1.44,0L22,19.51V5H32Z"/></svg></div><div class="contact-item-body"><p>{0}</p></div></div>'.Format(txt.note);
            }
            contactHTML+='<div class="contact-link contact-item"><div class="contact-item-logo"><svg viewBox="0 0 48 48"><path d="M24,2.67A21.33,21.33,0,1,0,45.33,24,21.33,21.33,0,0,0,24,2.67ZM19.51,27.08a1.25,1.25,0,0,1-.85.34,1.18,1.18,0,0,1-.84-.35L13,22.22A7,7,0,0,1,12,21a6.39,6.39,0,0,1-.85-2.59,6.31,6.31,0,0,1,1.55-4.89,9,9,0,0,1,1.44-1.31,6.07,6.07,0,0,1,2.38-1,6.33,6.33,0,0,1,2.75.12,6.27,6.27,0,0,1,2.44,1.32c.31.28.61.58.9.87.12.13.25.25.37.37l3.86,3.82a1.21,1.21,0,0,1,.35.89,1.1,1.1,0,0,1-.36.83,1.23,1.23,0,0,1-1.69,0l-4.89-4.84a2.92,2.92,0,0,0-.32-.28h0v0l-.17-.12a3.87,3.87,0,0,0-1.62-.62,4.18,4.18,0,0,0-1,0,4.46,4.46,0,0,0-.95.26,4.78,4.78,0,0,0-.45.23l-.22.13-.12.09,0,0c-.18.15-.36.33-.57.53l-.21.21-.21.23-.06.07h0a5.67,5.67,0,0,0-.5.86,5.68,5.68,0,0,0-.27,1,5,5,0,0,0,0,1.09,5.23,5.23,0,0,0,.28,1,4,4,0,0,0,.31.58l.16.24.07.09.1.11.27.28,4.8,4.8a1.21,1.21,0,0,1,.35.89A1.14,1.14,0,0,1,19.51,27.08Zm8.93-.47c.23.22.47.45.7.7a1.27,1.27,0,0,1,.37,1,1.17,1.17,0,0,1-.39.89,1.33,1.33,0,0,1-.91.36,1.27,1.27,0,0,1-.9-.38l-7.75-7.74-.7-.7a1.34,1.34,0,0,1-.37-1,1.22,1.22,0,0,1,.39-.89,1.31,1.31,0,0,1,1.81,0ZM35,34.78a7.41,7.41,0,0,1-1.67,1.33,6.49,6.49,0,0,1-2.6.76l-.5,0a6.27,6.27,0,0,1-4.35-1.76l-.72-.72-4.25-4.24a1.23,1.23,0,0,1-.35-.9,1.13,1.13,0,0,1,.36-.82,1.22,1.22,0,0,1,1.69,0l4.95,4.94.29.27,0,0,0,0h0l.16.11a4.94,4.94,0,0,0,.64.35,5.56,5.56,0,0,0,1,.27,5,5,0,0,0,1.09,0,5.45,5.45,0,0,0,1-.27,5.51,5.51,0,0,0,.85-.49l.09-.08.22-.2.2-.2c.21-.21.38-.39.53-.57l0,0,.08-.12a1.64,1.64,0,0,0,.14-.22,4.78,4.78,0,0,0,.23-.45,4.37,4.37,0,0,0,.26-.94,3.74,3.74,0,0,0-.26-2,5.12,5.12,0,0,0-.3-.57c0-.06-.09-.12-.13-.19l0,0h0a.35.35,0,0,0-.08-.1c0-.06-.08-.1-.12-.15l-.28-.29-4.69-4.74a1.25,1.25,0,0,1-.35-.89,1.17,1.17,0,0,1,.36-.82,1.22,1.22,0,0,1,1.69,0L35.06,26a6.14,6.14,0,0,1,0,8.8Z"/></svg></div><div class="contact-item-body txt-ellipsis-one"><a href="{0}" target="_blank">{1}</a></div></div>'.Format(location.pathname,location.host+location.pathname);
            _divDetail.innerHTML=`<div class="embed-contact-detail"><div class="contact-name">{0}</div><div class="contact-position">{1}</div>{2}<div class="embed-button"><button onclick="saveContacts(this)">Save to Contacts</button></div></div>`.Format(txt.firstName+' '+txt.lastName,txt.position+' · '+txt.organization,contactHTML);
            if(/iPhone OS.*CriOS/.test(navigator.userAgent)) _divDetail.querySelector('.embed-button').style.display='none';
        };
        lglrpjs(window).then(function () {
            onloadCallback('embed-contact');
            grecaptcha.execute(_divDetail.querySelector('.g-recaptcha').dataset.opt_widget_id).then(function () {
                lglrpval(_divDetail).then(function (){
                    renderContact();
                });
            }).catch(function () {
            });
        });
    }
    function embedTikTok(fbe){
        var _div=d.createElement('div'),_ep = eleParents(fbe,'.button-item'),_divBox;
        _div.className='tiktok-box embed-tiktok';
        if(!_ep) return;
        if(_ep.querySelector('.embed-boxBG')){
            setTimeout(function (){
                _ep.querySelector('.item').classList.remove('button--expended');
            },100);
            _ep.querySelector('.embed-boxBG').remove();
            return;
        }
        removeEmbedBox();
        var tiktokConf=decodeURIComponent(fbe.dataset.txt||''),_resp=fbe.dataset.resp;
        var _embedAction=function (resp){
            if(resp.code==0){
                var _user=resp.data.user;
                if(resp.data.videos){
                    if(_user.is_verified) _user.verified_svg='<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#20D5EC"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z" fill="white"></path></svg>'
                    _div.innerHTML=getTmplInnerHtml('#bioTikTokVideoTmpl').Compile(_user);
                    var _videoHTML='';
                    resp.data.videos.forEach(function (video) {
                        video.embed='https://www.tiktok.com/embed/v2/'+video.id;
                        _videoHTML+=getTmplInnerHtml('#bioTikTokVideoItemTmpl').Compile(video);
                    });
                    _div.querySelector('.embed-tiktok-videos').innerHTML=_videoHTML;
                }else{
                    if(_user.is_verified) _user.verified_svg='<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#20D5EC"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z" fill="white"></path></svg>'
                    _div.innerHTML=getTmplInnerHtml('#bioTikTokProfileTmpl').Compile(_user);
                }
                endLoaded(_divBox.querySelector('.embed-loading'));
                setTimeout(function () {
                    _ep.querySelector('.item').classList.add('button--expended', 'embed--alone');
                    _divBox.style.height='auto';
                },300);
            }
        }
        if(_resp){
            _resp = JSON.parse(decodeURIComponent(_resp));
            _divBox=d.createElement('div');
            _divBox.className='embed-boxBG embed--box ';
            _ep.appendChild(_divBox);
            _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
            _divBox.appendChild(_div);
            _embedAction(_resp);
        }else if(tiktokConf){
            var _tiktokProvider=JSON.parse(tiktokConf);
            _divBox=d.createElement('div');
            _divBox.className='embed-boxBG embed--box ';
            _ep.appendChild(_divBox);
            _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
            _divBox.appendChild(_div);
            if(_tiktokProvider.video&&_tiktokProvider.video.type){
                _divBox.classList.add('cmpt-tiktok-video');
                var _url='';
                if(_tiktokProvider.video.type=='list'){
                    _url='/share/{0}/link/{1}/itgr/tiktok/op/video.query/?id={2}&video_ids={3}'.Format(__data.ui.uid,__data.bio.id,_tiktokProvider.provider.id,_tiktokProvider.video.ids.join(','));
                }else{
                    _url='/share/{0}/link/{1}/itgr/tiktok/op/video.latest/?id={2}'.Format(__data.ui.uid,__data.bio.id,_tiktokProvider.provider.id);
                }
                ibjax('GET', _url,{fn:function (resp){
                    fbe.dataset.resp=encodeURIComponent(resp);
                    _embedAction(JSON.parse(resp));
                }});
            }else{
                _divBox.classList.add('cmpt-tiktok-profile');
                ibjax('GET', '/share/{0}/link/{1}/itgr/tiktok/op/profile/?id={2}'.Format(__data.ui.uid,__data.bio.id,_tiktokProvider.provider.id),{fn:function (resp){
                    fbe.dataset.resp=encodeURIComponent(resp);
                    _embedAction(JSON.parse(resp));
                }});
            }
        }
    }
    function embedCarousel(fbe){
        var _div=d.createElement('div'),_ep = eleParents(fbe,'.button-item'),_divBox;
        _div.className='carousel-box embed-carousel';
        if(!_ep) return;
        if(_ep.querySelector('.embed-boxBG')){
            setTimeout(function (){
                _ep.querySelector('.item').classList.remove('button--expended');
            },100);
            _ep.querySelector('.embed-boxBG').remove();
            return;
        }
        removeEmbedBox();
        var item=decodeURIComponent(fbe.dataset.txt||'');
        if(item){
            item = JSON.parse(decodeURIComponent(item));
            _divBox=d.createElement('div');
            _divBox.className='embed-boxBG embed--box ';
            _ep.querySelector('.item').appendChild(_divBox);
            _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
            _divBox.appendChild(_div);

            var tmpl=getTmplInnerHtml('#bioCarouselTmpl');
            var _embedLink=checkLink(item.link),nodeName='a';
            if(_embedLink.startsWith('javascript:')) nodeName='button';
            else{
                if(_embedLink.indexOf('?')>0) _embedLink+='&';
                else _embedLink+='?';
                _embedLink+='utm_medium=social&amp;utm_source=instabio&amp;utm_campaign='+item.title;
            }
            _div.innerHTML=tmpl.Compile({title:item.title,desc:item.desc||'',items:'',display:item.link?'flex':'none',btntext:item.path||'',embedLink:_embedLink,nodeName:nodeName});
            if(item.subs.length>0){
                var itemTmpl=getTmplInnerHtml('#bioCarouselItemTmpl');nodeName='a';
                item.subs.forEach(function (sub) {
                    var _subDiv=d.createElement('div');
                    _subDiv.className='carousel-item-box';
                    var _subLink=checkLink(sub.link);
                    if(_subLink.startsWith('javascript:')) nodeName='p';
                    _subDiv.innerHTML=itemTmpl.Compile({image:clearImage(sub.image),title:sub.title,subtitle:sub.subtitle,link:_subLink,btntext:sub.btntext,display:sub.btntext&&sub.link?'':'hidden',nodeName:nodeName});
                    _div.querySelector('.carousel-items').append(_subDiv);
                });
            }
            endLoaded(_divBox.querySelector('.embed-loading'),
                function(){
                    if(window.lozad){
                        var observer=lozad('.lozad', {root: _divBox});
                        observer.observe();
                    }
                }
            );
            setTimeout(function () {
                _divBox.style.height='400px';
                _ep.querySelector('.item').classList.add('button--expended');
            },100);
            setTimeout(function () {
                _divBox.style.height='auto';
            },420);
        }
    }
    function embedCarouselVideo(fbe){
        var _div=d.createElement('div'),_ep = eleParents(fbe,'.button-item'),_divBox;
        _div.className='carousel-box embed-carousel';
        if(!_ep) return;
        if(_ep.querySelector('.embed-boxBG')){
            setTimeout(function (){
                _ep.querySelector('.item').classList.remove('button--expended');
            },100);
            _ep.querySelector('.embed-boxBG').remove();
            return;
        }
        removeEmbedBox();
        var item=decodeURIComponent(fbe.dataset.txt||'');
        if(item){
            item = JSON.parse(decodeURIComponent(item));
            _divBox=d.createElement('div');
            _divBox.className='embed-boxBG embed--box ';
            _ep.querySelector('.item').appendChild(_divBox);
            _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
            _divBox.appendChild(_div);

            var tmpl=getTmplInnerHtml('#bioCarouselTmpl');
            var _embedLink=checkLink(item.link),nodeName='a';
            if(_embedLink.startsWith('javascript:')) nodeName='button';
            else{
                if(_embedLink.indexOf('?')>0) _embedLink+='&';
                else _embedLink+='?';
                _embedLink+='utm_medium=social&amp;utm_source=instabio&amp;utm_campaign='+item.title;
            }
            _div.innerHTML=tmpl.Compile({title:item.title,desc:item.desc||'',items:'',display:item.link?'flex':'none',btntext:item.path||'',embedLink:_embedLink,nodeName:nodeName});
            if(item.subs&&item.subs.length>0){
                var itemTmpl=getTmplInnerHtml('#bioCarouselVideoItemTmpl');
                item.subs.forEach(function (sub) {
                    if(sub.link&&sub.platform!='tiktok'){
                        var _subDiv=d.createElement('div'),embedHTML='<iframe src="{embedLink}" width="100%" height="100%" frameborder="0" scrolling="no" allow="accelerometer;fullscreen;encrypted-media;gyroscope;picture-in-picture" {referrerpolicy} allowfullscreen></iframe>';
                        _subDiv.className='carousel-item-box';
                        if(sub.platform=='manual'){
                            embedHTML='<video playsinline="" loop="" muted="" poster="" src="{0}"><source src="{0}" type="video"></video><div class="embed-button--play"><button toggle="play" action="play/.carousel-item--video/video"><div><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#3D3D3D"></path></svg></div></button></div>'.Format(sub.link);
                        }else{
                            if(sub.platform=='twitch') sub.link1+=('&autoplay=false&parent='+location.host);
                            if(sub.platform=='youtube') sub.referrerpolicy='referrerpolicy="strict-origin-when-cross-origin"';
                            embedHTML=embedHTML.Compile({embedLink:sub.link1,referrerpolicy:sub.referrerpolicy});
                        }
                        _subDiv.innerHTML=itemTmpl.Compile({title:sub.title,platform:sub.platform,embedHTML:embedHTML});
                        _div.querySelector('.carousel-items').append(_subDiv);
                    }
                });
            }
            endLoaded(_divBox.querySelector('.embed-loading'));
            setTimeout(function () {
                _divBox.style.height='400px';
                _ep.querySelector('.item').classList.add('button--expended');
            },100);
            setTimeout(function () {
                _divBox.style.height='auto';
            },420);
        }
    }
    function embedButtons(fbe){
        var _epItem=eleParents(fbe,'.item'),_ep=eleParents(fbe,'.cmpt-button-buttonLinkColl');
        var _h0=70,_h1=_epItem.getBoundingClientRect().height;
        if(_epItem.classList.contains('button--expended')){
            _ep.style.height=eleParents(fbe,'.cmpt-button-buttonLinkColl').getBoundingClientRect().height+'px';
            setTimeout(function () {
                _ep.style.height=_h1+'px';
            },20);
            setTimeout(function () {
                var _buttons = eleParents(fbe,'.cmpt-button-buttonLinkColl').querySelectorAll('.button-item');
                (_buttons||[]).forEach(function (b,i) {
                    if(i>0) b.remove();
                });
                _epItem.classList.remove('button--expended');
                _ep.style.overflow='visible';
            },320)
            setTimeout(function () {
                _ep.style.height='auto';
            },400);
        }else{
            _ep.style.overflow='hidden';
            _epItem.classList.add('button--expended');
            var _id = fbe.dataset.kid, _cmpt = __data.content.cmpts.find(function (c) { return c.id == _id; }) ;
            if(_cmpt&&_cmpt.links){
                _ep.style.height=_h1+'px';
                setTimeout(function () {
                    var _bioCmpt=new RenderBioCmpt([],null,'body',{part:__data.bio.part,lid:__data.bio.id,from:'home',state:__data.state}),_len=_cmpt.links.length;
                    _bioCmpt.linksUI(_cmpt.links,_cmpt,_ep,1);
                    var _h=(_h1+20)*(_len+1);
                    if(_len>6){
                        _h+= 32 + 20;
                        var _div=d.createElement('div');
                        _div.className='button-item';
                        _div.innerHTML=`<div class="block-close--box"><button toggle="close" action="block/button/.cmpt-button-buttonLinkColl"><i class="iconfont icon-fa-close"></i></button></div>`;
                        _ep.appendChild(_div);
                    }
                    _ep.style.height=_h+'px';
                },20);
                setTimeout(function () {
                    _ep.style.height='auto';
                    _ep.style.overflow='initial';
                },400);
            }
        }
    }
    function embedPreSave(fbe){
        var _div=d.createElement('div'),_ep = eleParents(fbe,'.button-item'),_divBox;
        _div.className='presave-box embed-music';
        if(!_ep) return;
        if(_ep.querySelector('.embed-boxBG')){
            setTimeout(function (){
                _ep.querySelector('.item').classList.remove('button--expended');
            },100);
            _ep.querySelector('.embed-boxBG').remove();
            return;
        }
        removeEmbedBox();
        var item=decodeURIComponent(fbe.dataset.txt||''),embedCls='';
        if(item){
            item = JSON.parse(decodeURIComponent(item));
            _divBox=d.createElement('div');
            _divBox.className='embed-boxBG embed--box ';
            _ep.appendChild(_divBox);
            _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
            _divBox.appendChild(_div);

            var tmpl=getTmplInnerHtml('#bioPreSaveTmpl');
            var action='presave',actionTxt='Pre-save',visitorHasPresaved=JSON.parse(localStorage.getItem('visitorHasPresaved')||'{}');
            if(visitorHasPresaved.spotify&&visitorHasPresaved.spotify[fbe.dataset.kid]){
                action='presaved';
                actionTxt='<i class="iconfont icon-selected"></i>Pre-saved';
            }
            var _embedLink=APIHOST+'/share/auth/spotify/lnk/biolink/redirect/?id='+fbe.dataset.kid;
            var gmt=item.gmt,rlsDate='Available: ' + (item.releaseDate||'');
            if(gmt&&gmt.substring(gmt.length-2)=='00'){
                rlsDate+=' '+gmt.substring(0,gmt.length-3);
            }else{
                rlsDate+=' '+gmt;
            }
            var itemsHTML=getTmplInnerHtml('#bioButtonPRSItemTmpl');
            _div.innerHTML=tmpl.Compile({title:item.title,desc:item.desc||'',artist:item.artist,embedCls:!item.cover?'embed-cover-no':'',cover:clearImage(item.cover),rlsDate:rlsDate,
                itemsHTML:itemsHTML.Compile({platform:'spotify',platformName:'Spotify',embedLink:_embedLink,actionTxt:actionTxt,
                    action:action})});
            endLoaded(_divBox.querySelector('.embed-loading'));
            setTimeout(function () {
                _divBox.style.height='400px';
                _ep.querySelector('.item').classList.add('button--expended', 'embed--alone');
            },100);
            setTimeout(function () {
                _divBox.style.height='auto';
            },420);
        }
    }
    function embedButtonMusic(fbe){
        var _div=d.createElement('div'),_ep = eleParents(fbe,'.button-item'),_divBox;
        _div.className='music-box embed-music';
        if(!_ep) return;
        if(_ep.querySelector('.embed-boxBG')){
            _ep.querySelector('.item').classList.remove('button--expended');
            _ep.querySelector('.embed-boxBG').remove();
            return;
        }
        removeEmbedBox();
        var item=decodeURIComponent(fbe.dataset.txt||'');
        if(item){
            item = JSON.parse(decodeURIComponent(item));
            _divBox=d.createElement('div');
            _divBox.className='embed-boxBG embed--box ';
            _ep.appendChild(_divBox);
            _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
            _divBox.appendChild(_div);
            var tmpl=getTmplInnerHtml('#bioPreSaveTmpl'),embedLink='',embedCls='',_subEmbed;
            if(item.displayPreview){
                _subEmbed = (item.subs||[]).find(function (s) {
                    return (s.url) && (/spotify\.com\/(track|album|artist)\/[a-z0-9]+/i).test(s.url);
                });
                if(_subEmbed){
                    embedLink=(_subEmbed.url).replace('spotify.com/','spotify.com/embed/');
                }else if(item.source&&(/(spotify\.com\/(track|album|artist)\/[a-z0-9]+)|(spotify:(track|album|artist):[a-z0-9]+)/i).test(item.source)){
                    if(item.source.indexOf('spotify:')>-1){
                        var _fields = item.source.split(':');
                        embedLink='https://open.spotify.com/embed/'+_fields[1]+'/'+_fields[2];
                    }else{
                        embedLink=item.source.replace('spotify.com/','spotify.com/embed/');
                    }
                }
                if(embedLink.indexOf('track')>-1){
                    embedCls='embed-iframe embed-spotify-track';
                }else if(embedLink.indexOf('album')>-1){
                    embedCls='embed-iframe embed-spotify-album';
                }else if(embedLink.indexOf('artist')>-1){
                    embedCls='embed-iframe embed-spotify-artist';
                }
            }else{
                if(!item.cover){
                    _subEmbed = (item.subs||[]).find(function (s) {
                        return !!s.cover;
                    });
                    if(_subEmbed) item.cover=_subEmbed.cover;
                }
                embedCls += !item.cover?' embed-cover-no':'';
            }
            var itemsHTML='',_itemTpl=getTmplInnerHtml('#bioButtonMusicItemTmpl'),shareSVG=getTmplInnerHtml('#shareSVG');
            (item.subs||[]).forEach(function (s) {
                if(s.state==1&&s.url){
                    var nodeName='a';
                    if(!s.url) nodeName='button';
                    itemsHTML+=_itemTpl.Compile({platform:s.platform,platformName:PlatformMaps[s.platform],embedLink:s.url,nodeName:nodeName,shareSVG:shareSVG});
                }
            });
            _div.innerHTML=tmpl.Compile({title:item.title,desc:item.desc||'',artist:item.artist,cover:clearImage(item.cover),itemsHTML:itemsHTML,
                embedLink:embedLink,embedCls:embedCls});
            endLoaded(_divBox.querySelector('.embed-loading'));
            setTimeout(function () {
                _divBox.style.height='400px';
                // _ep.querySelector('.item').classList.add('button--expended');
            },100);
            setTimeout(function () {
                _divBox.style.height='auto';
            },420);
        }
    }
    function embedSpring(fbe){
        var _link=decodeURIComponent(fbe.dataset.html||''),_resp=fbe.dataset.resp;
        var _osObj=CheckPlatformURL(_link);
        let ombedObj=_embedPlatformUtil(fbe,'spring-box embed-spring');
        var _embedAction=function (resp){
            if(resp){
                fbe.dataset.resp=encodeURIComponent(resp);
                resp = JSON.parse(resp);
                if(resp.products){
                    var _coll = {collectionImage:'',collectionName:''},_un='';
                    _coll.deep_link=_link+(_link.indexOf('?')>-1?'&':'?');
                    _coll.deep_link+='utm_medium=spring&utm_source=instabio&utm_campaign=button+embed';
                    ombedObj.div.innerHTML=getTmplInnerHtml('#bioSpringTmpl').Compile(_coll);
                    var _assetHTML='';
                    resp.products.forEach(function (prod) {
                        var _prod={nodeName:'a', link:'https://{0}.creator-spring.com/listing{1}'.Format(_osObj.fields[0],prod.url),image:prod.imageUrl,subtitle:prod.price||'',
                            title:'{0}<br><span>{1}</span>'.Format(prod.name,prod.productName)};
                        _assetHTML+=getTmplInnerHtml('#bioCarouselItemTmpl').Compile(_prod);
                    });
                    ombedObj.div.querySelector('.carousel-items').innerHTML=_assetHTML;
                    if(window.lozad){
                        var observer=lozad('.lozad', {root: ombedObj.divBox});
                        observer.observe();
                    }
                }  
                endLoaded(ombedObj.divBox.querySelector('.embed-loading'));
                setTimeout(function () {
                    ombedObj.ep.querySelector('.item').classList.add('button--expended');
                    ombedObj.divBox.style.height='auto';
                },300);
            }
        }
        if(_resp){
            _resp = decodeURIComponent(_resp);
            _embedAction(_resp);
        }else if(_link){
            if(_osObj.platform=='spring'){
                var _url='';
                function renderSpringStore(url){
                    ibjax('GET', url,{fn:function (resp){
                        _embedAction(resp);
                    }});
                }
                if(localStorage.getItem('spStoreRegion')){
                    var _spStoreRegion=localStorage.getItem('spStoreRegion');
                    _spStoreRegion=JSON.parse(_spStoreRegion);
                    _url='https://commerce.teespring.com/v1/stores/products?currency={0}&page=1&per=6&region={1}&slug={2}'.Format(_spStoreRegion.buyer_currency,_spStoreRegion.buyer_region,_osObj.fields[0]);
                    renderSpringStore(_url);
                }else{
                    _url='https://teespring.com/api/v1/localization_details?storeId='+_osObj.fields[0];
                    ibjax('GET', _url,{fn:function (resp){
                        localStorage.setItem('spStoreRegion', resp);
                        _spStoreRegion=JSON.parse(_spStoreRegion);
                        _url='https://commerce.teespring.com/v1/stores/products?currency={0}&page=1&per=6&region={1}&slug={2}'.Format(_spStoreRegion.buyer_currency,_spStoreRegion.buyer_region,_osObj.fields[0]);
                        renderSpringStore(_url);
                    }});
                }
            }
        }
    }
    function embedContactV2(fbe){
        let ombedObj=_embedPlatformUtil(fbe,'carousel-box contact-box ',null,'innerBtn');
        if(!ombedObj) return;
        let _ctVard=JSON.parse(decodeURIComponent(fbe.dataset.txt||'{}'));
        if(_ctVard.username){
            var tmpl=getTmplInnerHtml('#cmpt-contact-detail'),subtitle='';
            _ctVard.clDisplay=(isEmpty(_ctVard.cover)||isEmpty(_ctVard.companyLogo))?'hidden':'';
            _ctVard.cover=_ctVard.cover||_ctVard.companyLogo||'';
            if(_ctVard.jobTitle) subtitle=_ctVard.jobTitle;
            if(_ctVard.organization) subtitle+=isEmpty(subtitle)?_ctVard.organization:'<span></span>'+_ctVard.organization;
            let lnksHtml='',_lnkTmpl=getTmplInnerHtml('#contactLinkTmpl');
            if(_ctVard.links){
                _ctVard.links.forEach(function (lnk) {
                    if(lnk.link&&lnk.link.length>0){
                        let tag='',lnkTxt=(lnk.link||'').replace(/^(https?|ftp|file|tel|mail|mailto):?\/?\/?/i, '');
                        if(lnk.type=='email'){
                            if(isEmpty(lnk.tag)){
                                tag='Email<span></span>';
                            }else{
                                tag='Email<span>({0})</span>'.Format(lnk.tag.toLowerCase());
                            }
                            if(lnk.link.indexOf('mailto:')==-1) lnk.link='mailto:'+lnk.link;
                        }else if(lnk.type=='phone'){
                            if(isEmpty(lnk.tag)){
                                tag='Phone<span></span>';
                            }else{
                                tag='Phone<span>({0})</span>'.Format(lnk.tag.toLowerCase());
                            }
                            if(lnk.link.indexOf('tel:')==-1) lnk.link='tel://'+lnk.link;
                        }else if(lnk.type=='address'){
                            tag='Address';
                            lnk.link='https://www.google.com/maps/search/' + lnk.link;
                        }else{
                            lnk.link=checkLink(lnk.link,1);
                            lnkTxt=lnk.title||lnkTxt;
                        }
                        lnksHtml+=_lnkTmpl.Compile({link:checkLink(lnk.link,1),tag:tag,linkTxt:lnkTxt});
                    }
                });
            }
            ombedObj.div.innerHTML=tmpl.Compile({btntext:gettext("Save contact"),coverDisplay:isEmpty(_ctVard.cover)?'hidden':'',companyLogo:clearImage(_ctVard.companyLogo),
                cover:clearImage(_ctVard.cover),username:_ctVard.username||'',clDisplay:_ctVard.clDisplay,note:_ctVard.note||'',subtitle:subtitle,linkHtml:lnksHtml,cType:'button'
            });
        }  
        endLoaded(ombedObj.divBox.querySelector('.embed-loading'));
        setTimeout(function () {
            ombedObj.divBox.style.height='400px';
            ombedObj.ep.querySelector('.item').classList.add('button--expended');
        },100);
        setTimeout(function () {
            ombedObj.divBox.style.height='auto';
        },420);
    }
    var c = function(e) {
        //window.event? window.event.cancelBubble = true : e.stopPropagation();
        var _fbe=e.target||e.srcElement||{},_fte=e.target||e.srcElement||{};
        if(_fbe.href && _fbe.nodeName=='A'){
        }else{
            _fbe=eleParents(_fbe,'a')||eleParents(_fbe,'button');
        }
        if(!_fbe){
            if(_fte.nodeName=='DIV'&&_fte.classList.contains('support-gifts--number')){// support gifts
                handlerSupportGifts(_fte,'select');
            }
            if(_fte.nodeName='LABEL'&&eleParents(_fte,'.form-field-radio')&&eleParents(_fte,'.item-request')){
                requestOptionCheck(_fte);
                return;
            }
            var _fTDiv = eleParents(_fte,'.file-item__remove');
            if(_fTDiv){// remove file
                var _upDivP=eleParents(_fTDiv,'.form-field-file');
                _fTDiv.parentNode.remove();
                if(_upDivP){
                    _upDivP.querySelector('.form-field-checkbox-title span').innerHTML='({0}/6)'.Format(_upDivP.querySelectorAll('.file-item').length);
                }
                return;
            }
            _fTDiv = eleParents(_fte, '.form-field-file-upload');
            if(_fTDiv&&_fTDiv.nodeName=='DIV'){
                handlerFileUpload(e, _fTDiv);
            }
            return;
        }
        if(_fbe&&_fbe.classList.contains('block-search--button')){ // block search
            handlerBlockSearch(_fte);
            return;
        }
        if (_fbe.dataset&&_fbe.dataset.type!=10&&_fbe.dataset.html&&window.fbq) {
            fbq('track', 'linkClick');
        }
        if(_fbe.dataset.type==10&&_fbe.dataset.st=='cmpt-button-buttonLinkColl'){//show buttons
            embedButtons(_fbe);
            return;
        }
        if(_fbe.dataset.type==10&&_fbe.dataset.st){//show form
            if(window.fbq) fbq('track', 'formClick');
            var _fc=d.querySelector('#form-tmpl-container');
            if(!_fc){_fc=d.createElement('div');_fc.id='form-tmpl-container';_fc.className='form-tmpl-container';d.body.appendChild(_fc);}
            if(_fbe.dataset.st<8){
                formUITmpl(_fbe,_fc);
            }else{
                formUICust(_fbe,_fc,_fbe.dataset.kid);
            }
            return;
        }
        if(_fbe.dataset.type<10&&_fbe.dataset.st==1){//embed video
            embedVideo(_fbe);
            return;
        }
        if(_fbe.dataset.type==1&&(_fbe.dataset.st==5||_fbe.dataset.st==6)) {//embed tweets, timeline
            embedTwitter(_fbe);
            return;
        }
        if(_fbe.dataset.type==1&&_fbe.dataset.st==7) {///embed pins
            embedPinterest(_fbe);
            return;
        }
        if(_fbe.dataset.type==1&&_fbe.dataset.st==8){//embed feeds
            embedFeed(_fbe);
            return;
        }
        if(_fbe.dataset.type<10&&_fbe.dataset.st==9){//embed thread
            embedThread(_fbe);
            return;
        }
        if(_fbe.dataset.type<10&&[10,11,12].includes(parseInt(_fbe.dataset.st))){//embed twitch channel chat
            embedTwitch(_fbe);
            return;
        }
        if(_fbe.dataset.type<10&&_fbe.dataset.st==13){//embed spring
            embedSpring(_fbe);
            return;
        }
        if(_fbe.dataset.type<10&&[14,15].includes(parseInt(_fbe.dataset.st))){//embed Instagram
            embedInstagram(_fbe);
            return;
        }
        if(_fbe.dataset.type<10&&_fbe.dataset.st==16){//embed Podcast
            embedPodcast(_fbe);
            return;
        }
        if(_fbe.dataset.type<10&&_fbe.dataset.st==17){//embed Provecho
            embedProvecho(_fbe);
            return;
        }
        if(_fbe.dataset.type<10&&_fbe.dataset.st==18){//embed Bonfire
            embedBonfire(_fbe);
            return;
        }
        if(_fbe.dataset.type<10&&_fbe.dataset.st==19){//embed GoFundMe
            embedGofundme(_fbe);
            return;
        }
        if(_fbe.dataset.type==12){//Contact
            embedContact(_fbe);
            return;
        }
        if(_fbe.dataset.type==21){//Contact V2
            embedContactV2(_fbe);
            return;
        }
        if(_fbe.dataset.type==17){// tiktok
            embedTikTok(_fbe);
            return;
        }
        if(_fbe.dataset.type==13&&_fbe.dataset.txt){//support
            handlerSupport(_fbe);
            return;
        }
        if(_fte.nodeName=='BUTTON'&&_fbe.classList.contains('form-event')){//form click - submit
            handleSubmit(e);
            return;
        }
        if(_fbe.dataset.type==16&&_fbe.dataset.st=='cmpt-support-button'){//support
            handlerSupport(_fbe);
            return;
        }
        if(_fbe.dataset.type==14||_fbe.dataset.type==16){// carousel service/portfolio
            embedCarousel(_fbe);
            return;
        }
        if(_fbe.dataset.type==15){// carousel video
            embedCarouselVideo(_fbe);
            return;
        }
        if(_fbe.dataset.type==18){// Music Release
            embedButtonMusic(_fbe);
            return;
        }
        if(_fbe.dataset.type==19){// Pre-Save
            embedPreSave(_fbe);
            return;
        }
        if(_fte.nodeName=='BUTTON'&&_fbe.classList.contains('support-button')){//support
            handlerSupport(eleParents(_fte,'.support-box'));
            return;
        }
        if(_fbe.nodeName=='BUTTON'&&_fbe.classList.contains('support-button')){//support
            handlerSupport(eleParents(_fbe,'.support-box'));
            return;
        }
        if(_fbe.nodeName=='BUTTON'&&_fbe.getAttribute('toggle')&&_fbe.getAttribute('action')){
            if(_fbe.getAttribute('disabled')!=null) return;
            toggleAction(_fbe.getAttribute('toggle'),_fbe.getAttribute('action'),_fbe);
            return;
        }
    };
    var c2=function (e){
        var _fbe=e.target||e.srcElement||{},_fte=e.target||e.srcElement||{};
        _fbe=eleParents(_fbe,'button');
        if(_fbe&&_fbe.classList.contains('block-search--button')){ // block search
            if(e.type=='keyup'&&(e.keyCode==13||e.keyCode==8||e.keyCode==46)){ // enter or delete
                handlerBlockSearch(_fte);
            }
            if(e.type=='blur'){
                handlerBlockSearch(_fte);
            }
            return;
        }
    }
    var c1=function (e) {
        // window.event? window.event.cancelBubble = true : e.stopPropagation();
        var _fbe=e.target||e.srcElement||{},_fte=e.target||e.srcElement||{},_tmpl=null;
        _fbe=_fbe.parentElement;
        if(_fte.nodeName=='I'&&_fte.classList.contains('icon-close')){//form click - close
            _tmpl=eleParents(_fbe, '.form-tmpl');
            if(_tmpl) {
                _tmpl.classList.remove('animate__fadeInUp');_tmpl.classList.add('animate__fadeOutDown');
                setTimeout(function () {
                    d.querySelector('#form-tmpl-container').style.display='none';
                    if(d.querySelector('.tmpl-bg')) d.querySelector('.tmpl-bg').style.display='none';
                }, 400);
                if(_tmpl.querySelector('.service-options')) _tmpl.querySelector('.service-options').style.display='none';
            }
            return true;
        }
        if(_fte.classList.contains('tmpl-bg')){
            _tmpl=_fte.querySelector('.form-tmpl');
            if(_tmpl){
                _tmpl.classList.remove('animate__fadeInUp');_tmpl.classList.add('animate__fadeOutDown');
                setTimeout(function () {
                    d.querySelector('#form-tmpl-container').style.display='none';
                    d.querySelector('.tmpl-bg').style.display='none';
                }, 400);
                if(_tmpl.querySelector('.service-options')) _tmpl.querySelector('.service-options').style.display='none';
            }else{
                d.querySelector('.tmpl-bg').style.display='none';
            }
            return;
        }
        if(_fte.nodeName=='I'&&_fte.classList.contains('icon-zhankai')){//form click - service - select
            _tmpl=eleParents(_fbe, '.form-tmpl').querySelector('.service-options');
            if(_tmpl){
                if(getComputedStyle(_tmpl).display=='none'){
                    _tmpl.style.display='block';
                }else{
                    _tmpl.style.display='none';
                }
            }
            return true;
        }
        if(_fte.nodeName=='SPAN'&&_fte.hasAttribute('data-service')){//form click - service - select
            _tmpl=eleParents(_fbe, '.form-tmpl').querySelector('.service-options');
            if(_tmpl){
                if(getComputedStyle(_tmpl).display=='none'){
                    _tmpl.style.display='block';
                }else{
                    _tmpl.style.display='none';
                }
            }
            return true;
        }
        if((_fte.nodeName=='LI'&&_fte.classList.contains('service-option'))||(_fbe&&_fbe.nodeName=='LI'&&_fbe.classList.contains('service-option'))){//form click - service - option
            if(_fte.classList.contains('service-option')){
                _fte.parentElement.querySelectorAll('li').forEach(function (ele,idx) {
                    ele.classList.remove('selected');
                });
                _fte.classList.add('selected');
                eleParents(_fbe, '.form-tmpl').querySelector('.form-select span').innerHTML=_fte.querySelector('span').innerHTML+'<i class="iconfont icon-zhankai"></i>';
            }
            if(_fbe.classList.contains('service-option')){
                _fbe.parentElement.querySelectorAll('li').forEach(function (ele,idx) {
                    ele.classList.remove('selected');
                });
                _fbe.classList.add('selected');
                eleParents(_fbe, '.form-tmpl').querySelector('.form-select span').innerHTML=_fbe.querySelector('span').innerHTML+'<i class="iconfont icon-zhankai"></i>';
            }
            _tmpl=eleParents(_fbe, '.form-tmpl').querySelector('.service-options');
            if(_tmpl) _tmpl.style.display='none';
            return true;
        }
        if(_fte.nodeName=='SPAN'&&_fte.classList.contains('option-cycle')){//form click - service - option
            _fte.parentElement.parentElement.querySelectorAll('.option-cycle').forEach(function (ele,idx) {
                ele.classList.remove('selected');
            });
            _fte.classList.add('selected');
            return;
        }
        if(_fte.nodeName=='BUTTON'&&_fbe&&_fbe.classList.contains('form-button')){//form click - submit
            handleSubmit(e);
            return;
        }
        var _fTDiv = eleParents(_fte,'.file-item__remove');
        if(_fTDiv){// remove file
            _fTDiv.parentNode.remove();
            return;
        }
        _fTDiv = eleParents(_fte, '.form-field-file-upload');
        if(_fTDiv&&_fTDiv.nodeName=='DIV'){
            handlerFileUpload(e, _fTDiv);
            return;
        }
    };
    v("click", c, d.querySelector('.container'));
    v("keyup", c2, d.querySelector('.container'));
    v("blur", c2, d.querySelector('.container'));
    if(d.querySelector('.tmpl-bg')) v("click", c1, d.querySelector('.tmpl-bg'));
    else if(d.querySelector('.form-tmpl-container'))  v("click", c1, d.querySelector('.form-tmpl-container'));
    window.onmessage=function(event){
        if(event.data.fn=='authCallback'){
            var a=JSON.parse(localStorage.getItem('visitorHasPresaved')||"{}");
            if(!a.spotify) a.spotify = {};
            var _id = decodeURIComponent(event.data.state).split(':');
            _id = _id[1].split('-')[1];
            a.spotify[_id]=true;
            localStorage.setItem('visitorHasPresaved',JSON.stringify(a));
            var btnEle=d.querySelector('button[data-kid="{0}"]'.Format(_id));
            if(btnEle){
                var bP=eleParents(btnEle,'.button-item');
                var that=bP.querySelector('.music-item--button button')
                that.innerHTML='<i class="iconfont icon-selected"></i>Pre-saved';
                that.setAttribute('action', 'presaved');
            }
            try{
                var fbe=d.querySelector('button[data-kid="{0}"]'.Format(_id)),_thx='';
                var item=JSON.parse(decodeURIComponent(fbe.dataset.txt||'')||'{}');
                popupModal({cls:'popup-presaved-ok', html:getTmplInnerHtml('#popup-tips').Compile({title:item.thanksText||_thx,
                    content:`<p><strong>{0}</strong> will be added to your music library on <strong>{1}</strong></p>`.Format(item.title,item.releaseDate)})
                });
            }catch(e){}
        }
    }
    // footer UI - Logo
    function _renderFooterCP() { 
        if(__data.ui.fee==0||__data.bio.biologoshow==1){
            var _footer=d.createElement('div');
            _footer.className='footer';
            var _randInt = parseInt(Math.random() * 4000, 10),_l='https://linkfly.to/madewithl',_ld='linkbio.co',_os=GetBrowserOS();
            if((location.hostname||location.host).indexOf('instabio.cc')!=-1) _ld='instabio.cc';
            // var _utm='us=instabio&um=footer&uc='+location.pathname.substring(1);
            var lang=GetQueryString('lang')||(navigator.language || navigator.browserLanguage);
            lang = judge_lang_util(lang);
            if(['vi','id','es','pt']){
                lang=lang.toUpperCase();
            }else{
                lang='';
            }
            if(_os.os=='ios'){
                _l='https://apps.apple.com/app/apple-store/id1455604586?pt=118696762&ct={0}&mt=8';
            }else if(_os.os=='android'){
                _l='https://play.google.com/store/apps/details?id=com.qumai.instabio&referrer=utm_source%3D{0}';
            }else{
                _l='https://www.instabio.cc/en?utm_source={0}&utm_medium=madewith';
            }
            window.dataLayer = window.dataLayer || [];
            var _gtag=function(){dataLayer.push(arguments)}
            if(_randInt<1000){
                _footer.className='footer footer-white';
                // _l='https://linkfly.to/madewithw?'+_utm;
                _footer.innerHTML=`<div class="intro"><a href="{0}" target="_blank">
                    <span>{1}/</span><strong>yourname</strong></a><button onclick="closeFooter();"><i class="iconfont icon-fa-close"></i></button>
                    </div><div class="signup"><a href="{0}" target="_blank">
                    <span>Sign up now!</span></a></div>`.Format(_l.Format('madewithw'),_ld);
                _gtag('event', 'madewithw');
            }else if(_randInt<2000){// v572
                _footer.className='footer footer-v572';
                _footer.innerHTML=`<div><a target="_blank" href="{0}">
                <p>
                <span><img src="https://bio.linkcdn.cc/instabio.cc/favicon160.png" alt=""> </span>
                <span>linkbio.co/<strong>yourname</strong></span>
                <span>Join</span>
                </p>
                </a></div>`.Format(_l.Format('madewithwJoin'));
                _gtag('event', 'madewithwJoin');
            }else if(_randInt<3000){// v573
                _footer.className='footer footer-v573';
                _footer.innerHTML=`<div><a target="_blank" href="{0}">
                <p>
                <span><img src="https://bio.linkcdn.cc/instabio.cc/favicon160.png" alt=""></span>
                <span>linkbio.co/<strong>yourname</strong></span>
                <span>{1}</span>
                </p>
                </a></div>`.Format(_l.Format('madewithwCreate'+lang),gettext('Create'));
                _gtag('event', 'madewithwCreate'+lang);
            }else if(_randInt<4000){// v573
                _footer.className='footer footer-v573';
                _footer.innerHTML=`<div><a target="_blank" href="{0}">
                <p>
                <span><img src="https://bio.linkcdn.cc/instabio.cc/favicon160.png" alt=""></span>
                <span>linkbio.co/<strong>yourname</strong></span>
                <span>{1}</span>
                </p>
                </a></div>`.Format(_l.Format('madewithwStart'+lang),gettext('Start'));
                _gtag('event', 'madewithwStart'+lang);
            }
            /**else if(_randInt<4000){// v574
                _footer.className='footer footer-v574';
                _footer.innerHTML=`<div><a target="_blank" href="{0}">
                <p>
                <span><img src="https://bio.linkcdn.cc/instabio.cc/favicon160.png" alt=""> </span>
                <span>Try Linkbio <strong>For Free!</strong></span>
                <span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="17" height="17" viewBox="0 0 17 17"><defs><clipPath id="master_svg0_49_9928"><rect x="0" y="0" width="17" height="17" rx="0"/></clipPath></defs><g clip-path="url(#master_svg0_49_9928)"><g><rect x="-4" y="-4" width="24" height="24" rx="0" fill="#FFFFFF" fill-opacity="0.009999999776482582" style="mix-blend-mode:passthrough"/></g><g><path d="M6,1L15,1Q15.09849,1,15.19509,1.019215Q15.29169,1.03843,15.38268,1.076121Q15.47368,1.113812,15.55557,1.16853Q15.63746,1.223249,15.70711,1.2928929999999998Q15.77675,1.362537,15.83147,1.44443Q15.88619,1.526322,15.92388,1.617317Q15.96157,1.7083110000000001,15.98078,1.80491Q16,1.9015086,16,2L16,11Q16,11.09849,15.98078,11.19509Q15.96157,11.29169,15.92388,11.38268Q15.88619,11.47368,15.83147,11.55557Q15.77675,11.63746,15.70711,11.70711Q15.63746,11.77675,15.55557,11.83147Q15.47368,11.88619,15.38268,11.92388Q15.29169,11.96157,15.19509,11.98078Q15.09849,12,15,12Q14.90151,12,14.80491,11.98078Q14.70831,11.96157,14.61732,11.92388Q14.52632,11.88619,14.44443,11.83147Q14.36254,11.77675,14.29289,11.70711Q14.22325,11.63746,14.16853,11.55557Q14.11381,11.47368,14.07612,11.38268Q14.03843,11.29169,14.01921,11.19509Q14,11.09849,14,11L14,3L6,3Q5.9015086,3,5.80491,2.980785Q5.708311,2.96157,5.617317,2.923879Q5.526322,2.8861879999999998,5.44443,2.83147Q5.362537,2.776751,5.292893,2.707107Q5.223249,2.637463,5.16853,2.55557Q5.113812,2.473678,5.076121,2.382683Q5.03843,2.291689,5.019215,2.19509Q5,2.0984914,5,2Q5,1.9015086,5.019215,1.80491Q5.03843,1.7083110000000001,5.076121,1.617317Q5.113812,1.526322,5.16853,1.44443Q5.223249,1.362537,5.292893,1.2928929999999998Q5.362537,1.223249,5.44443,1.16853Q5.526322,1.113812,5.617317,1.076121Q5.708311,1.03843,5.80491,1.019215Q5.9015086,1,6,1Z" fill-rule="evenodd" fill="#333333" fill-opacity="1" style="mix-blend-mode:passthrough"/></g><g><path d="M15.7071,2.707106Q15.8478,2.5664540000000002,15.9239,2.382683Q16,2.198912,16,2Q16,1.9015086,15.9808,1.80491Q15.9616,1.7083110000000001,15.9239,1.617317Q15.8862,1.526322,15.8315,1.44443Q15.7767,1.362537,15.7071,1.2928929999999998Q15.6375,1.223249,15.5556,1.16853Q15.4737,1.113812,15.3827,1.076121Q15.2917,1.03843,15.1951,1.019215Q15.0985,1,15,1Q14.8011,1,14.6173,1.07612Q14.4335,1.152241,14.2929,1.2928929999999998L14.2925,1.2932679999999999L1.293207,14.2926L1.2928929999999998,14.2929Q1.152241,14.4335,1.076121,14.6173Q1,14.8011,1,15Q1,15.0985,1.019215,15.1951Q1.03843,15.2917,1.076121,15.3827Q1.113812,15.4737,1.16853,15.5556Q1.223249,15.6375,1.2928929999999998,15.7071Q1.362537,15.7767,1.44443,15.8315Q1.526322,15.8862,1.617317,15.9239Q1.7083110000000001,15.9616,1.80491,15.9808Q1.9015086,16,2,16Q2.198912,16,2.382683,15.9239Q2.566455,15.8478,2.707107,15.7071L2.707421,15.7068L15.7071,2.707107L15.7071,2.707106Z" fill-rule="evenodd" fill="#333333" fill-opacity="1" style="mix-blend-mode:passthrough"/></g></g></svg></span>    
                </p>
                </a></div>`.Format(_l.Format('madewithwFree'));
            }else{
                // _footer.className='footer footer-black';
                // _l='https://linkfly.to/madewithb?'+_utm;
                // _footer.innerHTML='<div class="intro"><a href="{0}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><circle fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="50" cx="512" cy="512" r="390"/><path d="M735,351.08h0l-8.16-4.72-.09,0-91.3-52.72-3.78-2.18a71.28,71.28,0,0,0-92.84,23.24l-.19.3-7.94,13.76c-.17.26-.34.49-.49.76l-21.24,36.78a21.1,21.1,0,0,0,7.73,28.83h0a21.11,21.11,0,0,0,28.83-7.72l2.12-3.68c.27-.39.54-.8.82-1.29l9.75-16.88,10.52-18.22a.38.38,0,0,1,.08-.13,40.34,40.34,0,0,1,50.57-14l0,0,5.75,3.32s0,0,0,0L636.22,343l.12.07,16.87,9.76.11.05.14.08,11,6.36.55.32,3.8,2.21.27.14L687.4,372.5l10,5.79.07,0,5,2.88h0a40.36,40.36,0,0,1,14.4,49.56s0,0,0,0l-4.48,7.74a.11.11,0,0,1,0,.05l-2.48,4.26-.07.11-11.5,19.9-2.61,4.5-8,13.74-.06.12-32.43,56-8.88,15.35-1.18,2-13.37,23.08h0L630,581a.19.19,0,0,0,0,.09l-3,5.19h0a40.32,40.32,0,0,1-52.25,12.93l0,0-2.24-1.29s-.06,0-.1-.07l-10.94-6.3-18.81-10.87-.83-.48-6.23-3.59-5.91-3.43h0l-1.46-.83-1.35-.78-17.17-9.91-.15-.09L497,554.34c-.58-.31-1.15-.63-1.7-1a40.34,40.34,0,0,1-14.87-53.08l0,0s0,0,0,0l1.52-2.63a.1.1,0,0,1,.05-.09l4.5-7.8.17-.28h0l.43-.74a21.11,21.11,0,0,0-36.56-21.11l-.86,1.5,0,0-13.27,23a71.29,71.29,0,0,0,32.37,94.83l48.66,28.09,4.14,2.4,33.59,19.37a2.09,2.09,0,0,0,.28.17c1.2.79,2.43,1.55,3.71,2.23a.53.53,0,0,1,.1.06c.41.27.84.53,1.27.79l.14.08,2.85,1.64a71.39,71.39,0,0,0,34,8.66,71.19,71.19,0,0,0,59.27-31.68l.19-.3,4.3-7.43,92.74-160.26,0,0,.51-.87a.25.25,0,0,0,0-.07l4.44-7.68c.16-.33.34-.65.5-1l0,0A71.35,71.35,0,0,0,735,351.08Z"/><path d="M289,672.92h0l8.16,4.72.09,0,91.3,52.72,3.78,2.18a71.28,71.28,0,0,0,92.84-23.24l.19-.3,7.94-13.76c.17-.26.34-.49.49-.76l21.24-36.78a21.1,21.1,0,0,0-7.73-28.83h0a21.11,21.11,0,0,0-28.83,7.72l-2.12,3.68c-.27.39-.54.8-.82,1.29l-9.75,16.88L455.3,676.71a.38.38,0,0,1-.08.13,40.34,40.34,0,0,1-50.57,13.95l0,0-5.75-3.32s0,0,0,0l-11.05-6.38-.12-.07-16.87-9.76-.1-.05-.15-.08-11-6.36-.55-.32-3.8-2.21-.27-.14L336.6,651.5l-10-5.79-.07,0-5-2.88h0a40.36,40.36,0,0,1-14.4-49.56s0,0,0,0l4.48-7.74a.11.11,0,0,1,0-.05l2.48-4.26.07-.11,11.5-19.9,2.61-4.5,8-13.74.06-.12,32.43-56,8.88-15.35,1.18-2,13.37-23.08h0L394,443a.19.19,0,0,0,0-.09l3-5.19h0a40.32,40.32,0,0,1,52.25-12.93l0,0,2.24,1.29s.06,0,.1.07l10.94,6.3,18.81,10.87.83.48,6.23,3.59,5.91,3.43h0l1.46.83,1.35.78,17.17,9.91.15.09L527,469.66c.58.31,1.15.63,1.7,1a40.34,40.34,0,0,1,14.87,53.08l0,0s0,0,0,0L542,526.44a.1.1,0,0,1,0,.09l-4.5,7.8-.17.28h0l-.43.74a21.11,21.11,0,0,0,36.56,21.11l.86-1.5,0,0,13.27-23a71.29,71.29,0,0,0-32.37-94.83l-48.66-28.09-4.14-2.4L468.81,387.3a2.09,2.09,0,0,0-.28-.17c-1.2-.79-2.43-1.55-3.71-2.23a.53.53,0,0,1-.1-.06c-.41-.27-.84-.53-1.27-.79l-.14-.08-2.85-1.64a71.39,71.39,0,0,0-34-8.66,71.18,71.18,0,0,0-59.26,31.68l-.19.3-4.3,7.43L269.92,573.34s0,0,0,0l-.51.87a.25.25,0,0,0,0,.07L264.91,582c-.16.33-.34.65-.5,1l0,0A71.35,71.35,0,0,0,289,672.92Z"/></svg> <span>{1}/</span><strong>yourname</strong></a><button onclick="closeFooter();"><i class="iconfont icon-fa-close"></i></button></div><div class="signup"><a href="{0}" target="_blank"><span>Sign up now!</span></a></div>'.Format(_l,_ld);
            }**/
            if(__data.bio.part==1&&window.innerWidth>767){
                d.body.appendChild(_footer);
                if(d.body.querySelector('.page-cover')){
                    let coverFooter = _footer.cloneNode(true);
                    coverFooter.classList.add('page-cover--footer');
                    d.body.querySelector('.page-cover').appendChild(coverFooter);
                }
            }else{
                d.body.appendChild(_footer);
            }
        }
    _renderFooterCP();
    
}(document, 'script'));
