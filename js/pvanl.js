(function (u,s) {
    function loaded(e){
        return new Promise((function(t) {
            (function n(){
                var r = e.__loaded&&__ipgeo.status;
                !r ? e.requestAnimationFrame(n) : (t(e))
            }())
        }))
    }
    setTimeout(function (){
        if(!__ipgeo.status) __ipgeo.status='fail';
    },10000);
    var js, fjs = u.getElementsByTagName(s)[0];
    if(__data.glua){
        js = u.createElement(s);
        js.src = 'https://www.googletagmanager.com/gtag/js?id='+__data.glua;
        js.async=!0;
        fjs.parentNode.insertBefore(js, fjs);
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', __data.glua);
        if(__data.gstag&&__data.gstag.gstag) gtag('config', __data.gstag.gstag);
        if(__data.glaw) gtag('config', __data.glaw);
    }
    if(__data.gstag&&__data.gstag.gtagm){
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',__data.gstag.gtagm);
    }
    if(__data.gstag&&__data.gstag.pixel){
        var noscript=u.createElement('noscript');
        noscript.innerHTML='<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id='+__data.gstag.pixel+'&ev=PageView&noscript=1"/>';
        fjs.parentNode.insertBefore(noscript, fjs);
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', __data.gstag.pixel);
        fbq('track', 'PageView');
    }
    if(__data.gstag&&__data.gstag.tikpixel){
        !function (w, d, t) {w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)}; ttq.load(__data.gstag.tikpixel);ttq.page();}(window, document, 'ttq');
    }
    if(__data.gstag&&__data.gstag.vkpixel){
        var noscript=u.createElement('noscript');
        noscript.innerHTML='<img src="https://vk.com/rtrg?p='+__data.gstag.vkpixel+'" style="position:fixed;left:-999px;" alt=""/>';
        fjs.parentNode.insertBefore(noscript, fjs);
        !function(){var t=u.createElement("script");t.type="text/javascript",t.async=!0,t.src="https://vk.com/js/api/openapi.js?168",
            t.onload=function(){VK.Retargeting.Init(__data.gstag.vkpixel),VK.Retargeting.Hit()},u.head.appendChild(t)}();
    }
    if(__data.gstag&&__data.gstag.snappixel){
        (function (e, t, n) {
            if (e.snaptr) return;
            var a = e.snaptr = function () {
                a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments)
            };
            a.queue = [];
            var s = 'script';
            var r = t.createElement(s);
            r.async = !0;
            r.src = n;
            var u = t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r, u);
        })(window, document,'https://sc-static.net/scevent.min.js');
        snaptr('init', __data.gstag.snappixel, {
            'user_hashed_email': __data.ui.hashed_email||'',
        });
        snaptr('track', 'PAGE_VIEW');
    }
    if(__data.other&&__data.other.pintag){
        var noscript=u.createElement('noscript');
        noscript.innerHTML='<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/v3/?tid='+__data.other.pintag+'&noscript=1" />';
        fjs.parentNode.insertBefore(noscript, fjs);
        (function(e){
            if(!window.pintrk){
                window.pintrk=function(){
                    window.pintrk.queue.push(Array.prototype.slice.call(arguments));
                };
                var n=window.pintrk;
                n.queue=[],n.version="3.0";
                var t=document.createElement("script");
                t.async=!0,t.src=e;
                var r=document.getElementsByTagName("script")[0];
                r.parentNode.insertBefore(t,r);
            }
        }("https://s.pinimg.com/ct/core.js"));
        pintrk('load', __data.other.pintag);
        pintrk('page');
    }
    var pv = 1,uv =1;
    var apiVer='/v/2.3';
    var anlhost=(document.querySelector('meta[property="api:anlhost"]')?document.querySelector('meta[property="api:anlhost"]').content:'https://sapi.instabio.cc')+apiVer;
    var v = function(a, b, t) {
        t=t||u;
        t.addEventListener ? t.addEventListener(a, b, !1) : t.attachEvent && t.attachEvent("on" + a, b)
    },k=function(name) {
        var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2])
        } else {
            return null
        }
    },ep=function(tar,selector){
        selector=selector||"div";
        if (selector && tar && tar.nodeName != 'HTML') {
            if (selector.indexOf('.')!=-1) {
                var _sel = selector.split('.');
                if((!_sel[0]||tar.nodeName==_sel[0].toUpperCase())&&tar.classList.contains(_sel[1])){
                    return tar;
                }else {
                    return ep(tar.parentNode,selector);
                }
            }else if (selector.indexOf('#')!=-1) {
                var _sel = selector.split('#');
                if((!_sel[0]||tar.nodeName==_sel[0].toUpperCase())&&tar.id==_sel[1]){
                    return tar;
                }else {
                    return ep(tar.parentNode,selector);
                }
            }else{
                var _sel = [selector];
                if(tar.nodeName==_sel[0].toUpperCase()){
                    return tar;
                }else {
                    return ep(tar.parentNode,selector);
                }
            }
        }else{
            return null;
        }
    },q=function(name, search) {
        var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");
        var r = (search||window.location.search.substr(1)).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    };
    function pk() {
        var exp = new Date();
        var exp_time = exp.getTime();
        var d1 = new Date(exp.getFullYear(), exp.getMonth(), exp.getDate());
        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000 - (exp - d1));
        document.cookie = '_k_puv = ' + exp_time + ';expires=' + exp.toUTCString()+';path=/;'
    }
    if(k('_k_puv')){
        pv = 1;uv = 0;
    }else{pk();}
    if(!k('_u_K_id')){
        var exp = new Date();
        var exp_time = exp.getTime()/1000.0;
        var d1 = new Date(exp.getFullYear(), exp.getMonth(), exp.getDate());
        exp.setTime(exp.getTime() + 24 * 60 * 60 * 1000 - (exp - d1));
        var _uid = exp_time + Math.random().toString(36).substring(2,9);
        document.cookie = '_u_K_id = ' + _uid + ';expires=' + exp.toUTCString()+';path=/;'
    }
    var f = function (m,d) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        d.push('_uid='+k('_u_K_id'),'ipgeo='+encodeURIComponent(JSON.stringify(__ipgeo)),'uid='+__data.ui.uid);
        xhr.open('POST', anlhost+'/anl/adata/link/'+__data.bio.id+'/'+(location.pathname.split('/')[1]||location.host.split('.')[0])+'/1/?'.replace('1',m), true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
        };
        xhr.onerror = function() {
        };
        try {
            xhr.send(encodeURI(d.join('&')));
        } catch (e) {
        }
    };
    var a = function (b) {
        var _epBox=ep(b,'.button-item');
        b=ep(b,'a')||ep(b,'button');
        if(_epBox&&_epBox.querySelector('.button--expended')) return;
        if(!b) return;
        var _ds=b.dataset||{};
        if(_ds.st=='cmpt-button-buttonLinkColl') return;
        var _type=_ds.atype||_ds.type,_atype=_ds.type;
        if(b.dataset&&((_ds.html&&_ds.html!='null')||_type==10||_ds.type==10||_type==11||_ds.st=='cmpt-support-button'||_type==12||
            (_ds.st==8&&_type==1)||_type==16||_type==17||(_atype>=12))||_type==6||_type==33||_type==37||_type==38||_type==43||_type==44){
            if(_ds.atype==6){
                var prod=JSON.parse(decodeURIComponent(_ds.pi));
                var _link = checkLink(prod.link,1);
                if(prod.state>=2){
                }else if(_link!='javascript:;'&&prod.state==1){
                }else{return;}
            }
            var n=_ds.title,l=_ds.html;
            if(l=='null') l='';
            if(_ds.type==17||_ds.type==16) n=n||b.innerText;
            if(_type==33) n=ep(b, '.ctm-style').querySelector('.info-box .title').innerText;
            if(_type==37||_type==43||_type==44){
                n=ep(b, '.ctm-style').querySelector('.embed-event-title').innerText;
            }
            if(_type==38){
                n=ep(b, '.ctm-style').querySelector('.support-title').innerText;
            }
            f('service', ['referer='+u.referrer,'t='+(_ds.atype||1),'l='+l,'n='+n,'u='+_ds.id,'i='+_ds.kid,'rp='+_ds.path])
        }
    };
    var c = function(e) {
        a(e.target || e.srcElement || {})
    };
    loaded(window).then(function () {
        f('link',['referer=' +u.referrer,'pv='+pv,'uv='+uv,'_k_sid='+k('_k_puv'),'us='+q('utm_source'),'um='+q('utm_medium'),'uc='+q('utm_campaign')]);
    });
    v("click", c, u.querySelector('.container'));
})(document,'script');
