(function (d) {
if(!/(linkbio\.co|instabio\.cc|fans\.link|fanlnk\.to|shoplinks\.to|instabio\.to|fotoee\.com|localhost)$/gi.test(location.hostname)){
    location.href="https://www.instabio.cc";
    return;
}
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
function isEmpty(v) {
    return (v===undefined||v===null||v==='');
}
var BIO_ALIAS_2_CSS = {
    'body': 'body', 'bodyCls': '.body',
    'bgImg': '.bg div,.bg',
    'pageBg': 'section .content',
    'avatar': '.center .avatar', 'avatarImg': '.center .avatar img',
    'brand': '.text h3', 'brandDesc': '.desc',
    'button': '.item:nth-child(n),a.item:nth-child(n),.button-item:nth-child(n) .item',
    'icon': '.item span,.item>img', 'link': '.item .btn .btn-text, .item .btn-text .link-text', "buttonFont": '.item .btn,.text',
    'background': 'background', 'backgroundColor': 'background-color', 'backgroundImage': 'background-image', 'fontSize': 'font-size', 'color': 'color',
    'borderRadius': 'border-radius', 'link-color': '.item .link-text,.item .btn-text .link-text',
};
var BIO_Theme_2_CSS_Text = {
    'font': 'body,.text,section,section .content{font-family:"{0}";}',
    'font-family': 'body,.text,section,section .content{font-family:"{0}";}',
    'color': `body{
    --link-text-color:{0};
    --link-text-title-color:{0};
    --link-text-desc-color:{0};
    --link-text-button-color:{0};
}
.container,.container section{color:{0}!important;}
.header h6,.text-ctm h3,.text-ctm .desc,.item-header,.text-ctm .title,.text-ctm .subtitle,.text-ctm .title-box,.text-ctm .desc-box,.text-ctm,.pro-detail_box .title_box,.pro-detail_box .desc_box{color:{0};}
.text-ctm{color:{0}!important;}`,
    font1:'body,body .center{font-family:{0};--link-font:{0};}',
    color1:`body{--link-title-color:{0};--link-desc-color:{0}}`,
    fontsAlias:{
        'Aleo-Light-5': 'Aleo-Light', 'Aleo-Regular-7': 'Aleo', 'Aleo-Regular': 'Aleo',
        'Akrobat-Regular': 'Akrobat', 'ProzaLibre-Regular': 'ProzaLibre',
        'Archive-Regular': 'Archive', 'Bavro-Regular': 'Bavro',
        'Prime-Regular': 'Prime', 'OpenSans': 'Open Sans',
        'Archivo-Regular': 'Archivo', 'Merriweather-Regular': 'Merriweather',
        'Montserrat-Regular': 'Montserrat', 'Pirou-Regular': 'Pirou',
        'Pacifico-1': 'Pacifico', 'Poppins-Regular': 'Poppins',
        'Nunito-Regular': 'Nunito', 'Raleway-Regular-2': 'Raleway', 
    },
    fonts:{
        // mavenpro: 'Maven Pro:wght@400;500;600',
        kanit: 'Kanit', prozalibre: 'Proza Libre',
        karla: 'Karla', opensans: 'Open Sans', archivo:'Archivo',
        lora: 'Lora', pacifico: 'Pacifico',
        merriweather: 'Merriweather', playfairdisplay: 'Playfair Display',
        play: 'Play', nunito: 'Nunito', raleway: 'Raleway', pressstart2p: 'Press Start 2P',
        racingsansone: 'Racing Sans One', tinos: 'Tinos', roboto: 'Roboto',
        vt323:'VT323', outfit: 'Outfit', mitr: 'Mitr', sriracha: 'Sriracha', niramit: 'Niramit',
        anuphan: 'Anuphan', 
        notosansjp: 'Noto Sans JP', notoserifjp: 'Noto Serif JP', kosugimaru: 'Kosugi Maru',
        yujisyuku: 'Yuji Syuku', newtegomin: 'New Tegomin', notosanskr: 'Noto Sans KR',
        bevietnampro: 'Be Vietnam Pro', notoserif: 'Noto Serif', sansitaswashed: 'Sansita Swashed',
        oswald: 'Oswald', lobster: 'Lobster', farsan: 'Farsan', notosanstc: 'Noto Sans TC',
        notoseriftc: 'Noto Serif TC', elmessiri: 'El Messiri', librebaskerville: 'Libre Baskerville',
        chonburi: 'Chonburi', kodchasan: 'Kodchasan', pattaya: 'Pattaya', taviraj: 'Taviraj',
        pridi: 'Pridi', zenoldmincho: 'Zen Old Mincho', kaiseitokumin: 'Kaisei Tokumin',
        otomanopeeone: 'Otomanopee One', notoserifkr: 'Noto Serif KR', songmyung: 'Song Myung',
        itim: 'Itim', vujahdayscript: 'Vujahday Script', yesavaone: 'Yeseva One', mirza: 'Mirza',
        mulish: 'Mulish'
    },
    themeFonts:{
        '20221212_0': 'Play', 
        '20231110_0': 'Tinos', '20231110_3': 'Racing Sans One',
        '20231218_0': 'Tinos', '20231218_1': 'Open Sans', '20231218_4': 'Tinos',
        '20241024_1': 'Raleway', '20241024_2': 'Tinos', 
        '20241029_1': 'Play',
        '20241217_0': 'Racing Sans One', '20241217_1': 'Tinos',
        'beauty_12': 'Nunito', 'beauty_13': 'Mulish',
        'busiess_2': 'Archivo', 
        'card_0': 'Raleway', 'card_1': 'PlayfairDisplay', 'card_4': 'PlayfairDisplay', 'card_5': 'PlayfairDisplay',
        'card_6': 'PlayfairDisplay', 'card_7': 'PlayfairDisplay', 'card_8': 'PlayfairDisplay',
        'color_1': 'Raleway', 'color_5': 'Raleway', 'color_10': 'Merriweather',
        'color_16': 'Archivo', 'color_17': 'Archivo',
        'color_20': 'Merriweather', 'color_21': 'Merriweather', 'color_22': 'Merriweather', 'color_23': 'Merriweather', 'color_25': 'Merriweather',
        'color_26': 'Merriweather', 'color_27': 'Raleway', 'color_28': 'Raleway', 'color_29': 'Raleway', 'color_30': 'Raleway',
        'color_31': 'Nunito', 'color_32': 'Raleway', 'color_33': 'Raleway', 'color_34': 'Raleway', 'color_35': 'Raleway',
        'color_36': 'Raleway', 'color_37': 'Raleway', 'color_38': 'Raleway', 'color_48': 'Merriweather', 'color_49': 'Archivo',
        'color_52': 'Raleway', 'color_54': 'Raleway', 
        'color_56': 'Merriweather', 'color_57': 'Merriweather', 'color_60': 'Merriweather', 'color_67': 'Open Sans',
        'creative_15': 'Play', 'creative_16': 'Tinos', 
        'fashion_15': 'Karla', 'fashion_16': 'Play', 'fashion_17': 'PlayfairDisplay',
        'food_17': 'Pridi', 
        'gadult_0': 'Mulish', 
        'health_4': 'Raleway', 'health_8': 'Pacifico', 'health_13': 'ProzaLibre',
        'music_6': 'Merriweather', 'music_11': 'Merriweather',  'music_14': 'Play',
        'music_18': 'Noto Sans KR', 'music_19': 'Pacifico', 'music_21': 'Mulish',
        'online_2': 'Raleway', 'online_6': 'ProzaLibre', 'online_9': 'Merriweather', 'online_10': 'Merriweather',
        'pixel_0': 'PressStart2P', 'pixel_1': 'PressStart2P', 'pixel_2': 'PressStart2P', 'pixel_3': 'PressStart2P', 'pixel_4': 'PressStart2P',
        'pixel_5': 'PressStart2P', 'pixel_6': 'PressStart2P', 'pixel_7': 'PressStart2P', 'pixel_8': 'PressStart2P',
        'store_0': 'Racing Sans One', 'store_1': 'OpenSans', 'store_2': 'Tinos', 'store_3': 'Racing Sans One',
        'travel_16': 'OpenSans', 'tsp_3': 'Merriweather',
        'litesite_1': 'Play', 'litesite_3': 'Play', 'litesite_k0': 'Play', 'litesite_k1': 'Play', 
        'scard_0': 'PlayfairDisplay',
        'landingpage_6': 'Play', 
        'portfolio_3': 'Merriweather', 'portfolio_6': 'Play', 'portfolio_7': 'Play', 'portfolio_8': 'Play', 
        'profile1_1': 'Pacifico', 'profile1_design0': 'Play', 'profile1_food0': 'Nunito',
        'profile_4': 'Play', 'profile_6': 'Play', 'profile_9': 'Play', 
        'profile_z13': 'Play',
    }   
},
BIO_Theme_2_CSS_Background = {
    'color': `.bg div{background-image:initial;background-color:{0};}
        .bg video{display:none}
        .cover--bg{--cover-bg-color:{0};}`,
    'gradient': {
        'gradient.style.flat': '--link-background-gradient-style:to right;',
        'gradient.style.up': '--link-background-gradient-style:to bottom;',
        'gradient.style.down': '--link-background-gradient-style:to top;',
        'flat': '--link-background-gradient-style:to right;',
        'up': '--link-background-gradient-style:to bottom;',
        'down': '--link-background-gradient-style:to top;',
        'gradient.color.color1': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #EF629F, #EECDA3)}.bg video{display:none}`,
        'gradient.color.color2': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #F64F59, #C471ED, #12C2E9)}.bg video{display:none}`,
        'gradient.color.color3': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #FDBB2D, #22C1C3)}.bg video{display:none}`,
        'gradient.color.color4': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #1D2671, #C33764)}.bg video{display:none}`,
        'gradient.color.color5': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #2C3E50, #BDC3C7)}.bg video{display:none}`,
        'gradient.color.color6': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #B91D73, #F953C6)}.bg video{display:none}`,
        'gradient.color.color7': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #C6FFDD, #FBD786, #F7797D)}.bg video{display:none}`,
        'gradient.color.color8': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #0083B0, #00B4DB)}.bg video{display:none}`,
        'gradient.color.color9': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #185A9D, #43CEA2)}.bg video{display:none}`,
        'gradient.color.color10': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #870000, #190A05 35%)}.bg video{display:none}`,
        'gradient.color.color11': `.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #EEF2F3, #8E9EAB)}.bg video{display:none}`,
    },
    'image': {
        'style': {
            'default': '.css-null{{0}}',
            'gallery': `body{background:rgba(0,0,0,0);}
.bg div{
    background-image: linear-gradient(rgba(0, 0, 0, var(--link-background-image-opacity)),rgba(0, 0, 0, var(--link-background-image-opacity))), url({0});
    -webkit-filter: blur(var(--link-background-image-blur));
    -moz-filter: blur(var(--link-background-image-blur));
    -ms-filter: blur(var(--link-background-image-blur));
    filter: blur(var(--link-background-image-blur));
    transform: scale(1.05);
    background-size: cover;
    background-position: center;
}.bg video{display:none}`,
            'upload': `body{background:rgba(0,0,0,0);}
.bg div{
    background-image: linear-gradient(rgba(0, 0, 0, var(--link-background-image-opacity)),rgba(0, 0, 0, var(--link-background-image-opacity))), url({0});
    -webkit-filter: blur(var(--link-background-image-blur));
    -moz-filter: blur(var(--link-background-image-blur));
    -ms-filter: blur(var(--link-background-image-blur));
    filter: blur(var(--link-background-image-blur));
    background-size: cover;
    background-position: center;
}.bg video{display:none}`,
        },
        'blur': '--link-background-image-blur:{0}px;',
        'opacity': '--link-background-image-opacity:{0};',
    },
    'video': {
        'coverr': `body{background:rgba(0,0,0,0)}
.bg div{background-image:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0)),url({0});-webkit-filter:blur(0);-moz-filter:blur(0);-ms-filter:blur(0);filter:blur(0);background-size:cover;background-position:center;transform:scale(1);width:100%;height:100%;top:0;left:0}
.bg video{display:inline-block}`,
    },
},
BIO_Theme_2_CSS_Button = {
    'buttonStyle': {'backgroundColor': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:transparent;margin:0;background:transparent;clip-path:none}
.button-item:nth-child(n) .item{background-color:var(--link-button-bg-color)!important;border:2px solid var(--link-button-bg-border-color)!important;border-radius:0!important;color:var(--link-button-font-color)!important;box-shadow:none}
.button-item:nth-child(n) .item .btn .btn-text,.button-item:nth-child(n) .item .btn-text .link-text{color:var(--link-button-font-color)!important;}
.button-item:nth-child(n) .item:hover{background-color:var(--link-button-border-bg-color)!important;border:2px solid var(--link-button-border-color)!important;color:var(--link-button-border-font-color)!important;box-shadow:none;transform:none}
.button-item:nth-child(n) .item:hover .btn .btn-text,.button-item:nth-child(n) .item:hover .btn-text .link-text{color:var(--link-button-border-font-color)!important;}
.button-item:nth-child(n) .item:hover .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color)!important;color:var(--link-button-border-thumbnail-color)!important;}`,
                    'backgroundColorRadius': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:transparent;margin:0;background:transparent;clip-path:none}
.button-item:nth-child(n) .item{border-radius:var(--link-button-radius12, 8px)!important;background-color:var(--link-button-bg-color)!important;border:2px solid var(--link-button-bg-border-color)!important;color:var(--link-button-font-color)!important;box-shadow:none}
.button-item:nth-child(n) .item .btn .btn-text,.button-item:nth-child(n) .item .btn-text .link-text{color:var(--link-button-font-color)!important;}
.button-item:nth-child(n) .item:hover{background-color:var(--link-button-border-bg-color)!important;border:2px solid var(--link-button-border-color)!important;color:var(--link-button-border-font-color)!important;box-shadow:none;transform:none}
.button-item:nth-child(n) .item:hover .btn .btn-text,.button-item:nth-child(n) .item:hover .btn-text .link-text{color:var(--link-button-border-font-color)!important;}
.button-item:nth-child(n) .item:hover .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color)!important;color:var(--link-button-border-thumbnail-color)!important;}`,
                    'backgroundColorRadius50': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:transparent;margin:0;background:transparent;clip-path:none}
.button-item:nth-child(n) .item{border-radius:50vh!important;background-color:var(--link-button-bg-color)!important;border:2px solid var(--link-button-bg-border-color)!important;color:var(--link-button-font-color)!important;box-shadow:none}
.button-item:nth-child(n) .item .btn .btn-text,.button-item:nth-child(n) .item .btn-text .link-text{color:var(--link-button-font-color)!important;}
.button-item:nth-child(n) .item:hover{background-color:var(--link-button-border-bg-color)!important;border:2px solid var(--link-button-border-color)!important;color:var(--link-button-border-font-color)!important;box-shadow:none;transform:none}
.button-item:nth-child(n) .item:hover .btn .btn-text,.button-item:nth-child(n) .item:hover .btn-text .link-text{color:var(--link-button-border-font-color)!important;}
.button-item:nth-child(n) .item:hover .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color)!important;color:var(--link-button-border-thumbnail-color)!important;}`,
                    'backgroundColorBorder': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:rgba(0,0,0,0)!important;}
.button-item:nth-child(n) .item{border-radius:0!important;background-color:var(--link-button-border-bg-color)!important;border:2px solid var(--link-button-border-color)!important;color:var(--link-button-border-font-color)!important;box-shadow:none;}
.button-item:nth-child(n) .item .btn .btn-text,.button-item:nth-child(n) .item .btn-text .link-text{color:var(--link-button-border-font-color)!important;}
.item .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color);color:var(--link-button-border-thumbnail-color);}
.button-item:nth-child(n) .item:hover{background-color:var(--link-button-bg-color)!important;border:2px solid var(--link-button-bg-border-color)!important;color:var(--link-button-font-color)!important;box-shadow:none;transform:none}
.button-item:nth-child(n) .item:hover .btn .btn-text,.button-item:nth-child(n) .item:hover .btn-text .link-text{color:var(--link-button-font-color)!important;}
.button-item:nth-child(n) .item:hover .btn-icon span{border:2px solid var(--link-button-bg-thumbnail-border-color)!important;color:var(--link-button-bg-thumbnail-color)!important;}`,
                    'backgroundColorBorderRadius': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:rgba(0,0,0,0)!important;}
.button-item:nth-child(n) .item{border-radius:var(--link-button-radius12, 8px)!important;background-color:var(--link-button-border-bg-color)!important;border:2px solid var(--link-button-border-color)!important;color:var(--link-button-border-font-color)!important;box-shadow:none;}
.button-item:nth-child(n) .item .btn .btn-text,.button-item:nth-child(n) .item .btn-text .link-text{color:var(--link-button-border-font-color)!important;}
.item .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color);color:var(--link-button-border-thumbnail-color);}
.button-item:nth-child(n) .item:hover{background-color:var(--link-button-bg-color)!important;border:2px solid var(--link-button-bg-border-color)!important;color:var(--link-button-font-color)!important;box-shadow:none;transform:none}
.button-item:nth-child(n) .item:hover .btn .btn-text,.button-item:nth-child(n) .item:hover .btn-text .link-text{color:var(--link-button-font-color)!important;}
.button-item:nth-child(n) .item:hover .btn-icon span{border:2px solid var(--link-button-bg-thumbnail-border-color)!important;color:var(--link-button-bg-thumbnail-color)!important;}`,
                    'backgroundColorBorderRadius50': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:rgba(0,0,0,0)!important;}
.button-item:nth-child(n) .item{border-radius:50vh!important;background-color:var(--link-button-border-bg-color)!important;border:2px solid var(--link-button-border-color)!important;color:var(--link-button-border-font-color)!important;}
.button-item:nth-child(n) .item .btn .btn-text,.button-item:nth-child(n) .item .btn-text .link-text{color:var(--link-button-border-font-color)!important;}
.item .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color);color:var(--link-button-border-thumbnail-color);}
.button-item:nth-child(n) .item:hover{background-color:var(--link-button-bg-color)!important;border:2px solid var(--link-button-bg-border-color)!important;color:var(--link-button-font-color)!important;}
.button-item:nth-child(n) .item:hover .btn .btn-text,.button-item:nth-child(n) .item:hover .btn-text .link-text{color:var(--link-button-font-color)!important;}
.button-item:nth-child(n) .item:hover .btn-icon span{border:2px solid var(--link-button-bg-thumbnail-border-color)!important;color:var(--link-button-bg-thumbnail-color)!important;}`,
                    'style1.border': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important;background-color:rgba(0,0,0,0)!important}
.button-item:nth-child(n) .item-style{background-color:rgba(0,0,0,0)!important;border-radius:0!important;border:2px solid var(--link-button-border-color)!important;box-shadow:none;}
.item-style:hover{box-shadow:none;transform:none}
.item-style .ctm-style{border-bottom:2px solid var(--link-button-border-color)!important}
.item .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color);color:var(--link-button-border-thumbnail-color)}`,
                    'style2.background': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important}
.button-item:nth-child(n) .item-style{background-color:rgba(0,0,0,0)!important;border-radius:0!important;border:2px solid var(--link-button-bg-color)!important;box-shadow:none;}
.item-style:hover{box-shadow:none;transform:none}
.item-style .ctm-style{margin:3px;border:0;background-color:var(--link-button-bg-color)!important}
.button-item:nth-child(n) .item .btn .btn-text,.button-item:nth-child(n) .item .btn-text .link-text{color:var(--link-button-font-color)!important}
.button-item:nth-child(n) .item-style .ctm-style:hover{background-color:rgba(0,0,0,0)!important}
.button-item:nth-child(n) .item-style .ctm-style:hover .btn-text,.button-item:nth-child(n) .item-style .ctm-style:hover .link-text{color:var(--link-button-border-font-color)!important}
.button-item:nth-child(n) .item-style .ctm-style:hover .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color);color:var(--link-button-border-thumbnail-color)}`,
                    'style3.border': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important}
.button-item:nth-child(n) .item-style{background-color:rgba(0,0,0,0)!important;border-radius:0!important;border:2px solid transparent!important;box-shadow:none;}
.item-style:hover{box-shadow:none;transform:none}
.item-style::before{position:absolute;top:0;left:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-button-border-color);border-bottom:0!important;border-right:0!important}
.item-style::after{position:absolute;bottom:0;right:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-button-border-color);border-top:0!important;border-left:0!important}
.item-style .ctm-style{margin:5px;background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-button-border-color)!important}
.item .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color);color:var(--link-button-border-thumbnail-color)}`,
                    'style4.border': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important;background-color:rgba(0,0,0,0)!important}
.button-item:nth-child(n) .item-style{background-color:var(--link-button-border-bg-color)!important;border-radius:0!important;border:2px dashed var(--link-button-border-color)!important;box-shadow:none}
.item-style:hover{box-shadow:none;transform:none}
.item-style .ctm-style{margin:0;border:0}
.item .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color);color:var(--link-button-border-thumbnail-color)}`,
                    'style5.border': `.cmpt-button-buttonLink .show-sortNum::before{left:-34px}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style .ctm-style{border:0!important}
.button-item:nth-child(n) .item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid transparent!important;box-shadow:none}
.item-style:hover{box-shadow:none;transform:none}
.item-style::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:8px;height:100%;background:var(--link-button-bg-color)}
.item-style::after{position:absolute;bottom:-8px;right:8px;content:"";display:block;width:100%;height:8px;background:var(--link-button-bg-color)}
.item-style .ctm-style{margin:0;background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-button-bg-border-color)!important}
.item-style .ctm-style:before{position:absolute;top:-2px;left:-10px;content:"";display:block;width:0;height:0;border-bottom:6px solid var(--link-button-bg-border-color);border-left:8px solid transparent}
.item-style .ctm-style:after{position:absolute;bottom:-10px;right:-2px;content:"";display:block;width:0;height:0;border-top:8px solid var(--link-button-bg-border-color);border-right:8px solid transparent}
.item-style:not(.button--expended):hover .ctm-style{margin:0;}
.item-no-hover:hover .ctm-style{margin:0!important}
.item .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color);color:var(--link-button-border-thumbnail-color)}`,
                    'style6.border': `.cmpt-button-buttonLink .show-sortNum::before{left:-34px}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.button-item:nth-child(n) .item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid transparent!important;box-shadow:none;}
.item-style:hover{box-shadow:none;transform:none}
.item-style::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:2px;height:100%;background:var(--link-button-border-color)}
.item-style::after{position:absolute;bottom:-7px;right:8px;content:"";display:block;width:100%;height:2px;background:var(--link-button-border-color)}
.item-style .ctm-style{margin:0;background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-button-border-color)!important}
.item-style .ctm-style:before{position:absolute;top:1px;left:-10px;content:"";display:block;width:10px;height:2px;background:var(--link-button-border-color);transform:rotate(-36deg)}
.item-style .ctm-style:after{position:absolute;bottom:-6px;right:-2px;content:"";display:block;width:10px;height:2px;background:var(--link-button-border-color);transform:rotate(-45deg)}
.item .btn-icon span{border:2px solid var(--link-button-border-thumbnail-border-color);color:var(--link-button-border-thumbnail-color)}`,
        'radius0.border.shadow': `.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:transparent;}
.item{border-radius:0!important;background-color:var(--link-button-bg-color)!important;border:2px solid var(--link-button-shadow-color)!important;box-shadow:var(--link-button-shadow-color) 12px 12px 0px 0px;margin-bottom:20px}
.item-style:hover{transform:translate(4px, 4px);box-shadow:var(--link-button-shadow-color) 8px 8px 0px 0px;}`,
        'radius12.border.shadow': `.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:transparent;}
.item{border-radius:12px!important;background-color:var(--link-button-bg-color)!important;border:2px solid var(--link-button-shadow-color)!important;box-shadow:var(--link-button-shadow-color) 12px 12px 0px 0px;margin-bottom:20px}
.item-style:hover{transform:translate(4px, 4px);box-shadow:var(--link-button-shadow-color) 8px 8px 0px 0px;}`,
        'radius50.border.shadow': `.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style .ctm-style{border:0!important;background-color:transparent;}
.item{border-radius:50vh!important;background-color:var(--link-button-bg-color)!important;border:2px solid var(--link-button-shadow-color)!important;box-shadow:var(--link-button-shadow-color) 12px 12px 0px 0px;margin-bottom:20px}
.item-style:hover{transform:translate(4px, 4px);box-shadow:var(--link-button-shadow-color) 8px 8px 0px 0px;}`,
                    },
    'iconStyle': {'radius0': '.item .btn-icon img, .item .btn-icon span,.button-item .left .item img,.button-item>.item>img{border-radius:0!important;}',
                  'radius': '.item .btn-icon img, .item .btn-icon span,.button-item .left .item img,.button-item>.item>img{border-radius:var(--link-button-radius12, 8px)!important;}',
                  'radius12': '.item .btn-icon img, .item .btn-icon span,.button-item .left .item img,.button-item>.item>img{border-radius:var(--link-button-radius12, 8px)!important;}',
                  'radius50': '.item .btn-icon img, .item .btn-icon span,.button-item .left .item img,.button-item>.item>img{border-radius:50%!important;}'},
    'text_color': `.button-item:nth-child(n) .item .btn .btn-text,.button-item:nth-child(n) .item .btn-text .link-text{color:{0}!important}
        body{--link-button-font-color:{0};--link-button-border-font-color:{0};}`,
    'color': `--link-button-bg-color:{0};--link-button-bg-border-color:{0};--link-button-border-color:{0};`,
    'color1': '--link-button-shadow-color:{0};',
    'opacity': '{}',
},BIO_Theme_2_CSS_Layout = {
        'block': {
            'background': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;background-color:transparent;margin:0;background:transparent;clip-path:none}
.item-style:not(.button--expended):hover .ctm-style{margin:0;}
.item-no-hover:hover .ctm-style{margin:0!important}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-style:not(.button--expended):hover{background-color:rgba(0,0,0,0)!important;box-shadow:none;transform:none}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.item-form::before,.item-form::after,.item-form .ctm-style::before,.item-form .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-form{padding:0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-form{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:var(--link-block-corner);}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner);}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0;}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.item-video .video-box iframe, .item-video .video-box img{border-radius:var(--link-block-corner)}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:var(--link-block-corner)}
.item-support::before,.item-support::after,.item-support .ctm-style::before,.item-support .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-support{padding:0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-support{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:var(--link-block-corner);}
.item-support .support-action button{border-radius:var(--link-block-corner)}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block::before,.item-block::after,.item-block .ctm-style::before,.item-block .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-block:hover .ctm-style{margin:0;}
.item-block{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
.biolink{
--link-block-padding:0px;
--link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.item-graphic{
    --link-block-ctm-height:initial;
 --link-block-padding:0px;
 --link-graphic-corner:calc(var(--link-block-corner) - var(--link-block-border) - var(--link-block-padding));
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'style1': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;border-radius:0;margin:0 0 -1px 0;background:transparent;clip-path:none}
.item-style:not(.button--expended):hover .ctm-style{margin:0 0 -1px 0;}
.item-no-hover:hover .ctm-style{margin:0!important}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.item-style .ctm-style{border-bottom:3px solid var(--link-block-border-color)!important}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form{padding:0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;margin:0;border-radius:0;margin-bottom:-1px;background:transparent;clip-path:none}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;}
.item-form .ctm-style{border-bottom:3px solid var(--link-block-border-color)!important}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.item-video .video-box iframe,.item-video .video-box img{border-radius:0}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:0}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{padding:0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;margin:0;border-radius:0;margin-bottom:-1px;background:transparent;clip-path:none}
.item-support{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;}
.item-support .ctm-style{border-bottom:3px solid var(--link-block-border-color)!important}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:0px;}
.item-support .support-action button{border-radius:0}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;background-color:transparent;border-radius:0;margin:0 0 -1px 0;background:transparent;clip-path:none}
.item-block{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;}
.item-block .ctm-style{border-bottom:3px solid var(--link-block-border-color)!important}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{--link-block-corner:0px;
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:100%;
 --link-block-padding:0px;
 --link-graphic-corner:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'style2': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;background:transparent;clip-path:none}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;}
.item-style:not(.button--expended):hover .ctm-style{background-color:rgba(0,0,0,0)!important;}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.item-style .ctm-style{margin:3px;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)}
.item-style:not(.button--expended):hover .ctm-style{margin:3px;}
.item-no-hover:hover .ctm-style{margin:3px!important}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form{padding:0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-form .ctm-style{margin:3px;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:var(--link-block-corner);}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner);}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0;}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.item-video .video-box iframe, .item-video .video-box img{border-radius:var(--link-block-corner)}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:var(--link-block-corner)}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{padding:0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-support{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-support .ctm-style{margin:3px;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:var(--link-block-corner);}
.item-support .support-action button{border-radius:var(--link-block-corner)}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-block{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-block .ctm-style{margin:3px;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)}
.item-block:hover .ctm-style{margin:3px}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:calc(100% - 6px); 
 --link-block-padding:0px;
 --link-graphic-corner:calc(var(--link-block-corner) - var(--link-block-border) - var(--link-block-padding));
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'style3': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;background:transparent;clip-path:none}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:1px solid transparent!important;}
.item-style::before{position:absolute;top:0;left:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-bottom:0!important;border-right:0!important;mask-image:none;-webkit-mask-image:none;}
.item-style::after{position:absolute;bottom:0;right:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-top:0!important;border-left:0!important;left:initial;mask-image:none;-webkit-mask-image:none;}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.item-style .ctm-style{margin:5px;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .ctm-style{margin:5px;}
.item-no-hover:hover .ctm-style{margin:5px!important}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:1px solid transparent!important;}
.item-form::before{position:absolute;top:0;left:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-bottom:0!important;border-right:0!important;mask-image:none;-webkit-mask-image:none;}
.item-form::after{position:absolute;bottom:0;right:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-top:0!important;border-left:0!important;left:initial;mask-image:none;-webkit-mask-image:none;}
.item-form .ctm-style{margin:5px;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:0}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-support{background-color:rgba(0,0,0,0)!important;border-radius:0;border:1px solid transparent!important;}
.item-support::before{position:absolute;top:0;left:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-bottom:0!important;border-right:0!important;mask-image:none;-webkit-mask-image:none;}
.item-support::after{position:absolute;bottom:0;right:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-top:0!important;border-left:0!important;left:initial;mask-image:none;-webkit-mask-image:none;}
.item-support .ctm-style{margin:5px;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:0px;}
.item-support .support-action button{border-radius:0}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-block{background-color:rgba(0,0,0,0)!important;border-radius:0;border:1px solid transparent!important;}
.item-block::before{position:absolute;top:0;left:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-bottom:0!important;border-right:0!important;mask-image:none;-webkit-mask-image:none;}
.item-block::after{position:absolute;bottom:0;right:0;content:"";display:block;width:40px;height:32px;border:2px solid var(--link-block-border-color);border-top:0!important;border-left:0!important;left:initial;mask-image:none;-webkit-mask-image:none;}
.item-block .ctm-style{margin:5px;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-block:hover .ctm-style{margin:5px;}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{--link-block-corner:0px;
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:calc(100% - 10px);
 --link-block-padding:0px;
 --link-graphic-corner:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'style4': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;margin:0;background-color:transparent;background:transparent;clip-path:none}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) dashed var(--link-block-border-color)!important;}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.item-style .ctm-style{margin:0;border:0}
.item-style:not(.button--expended):hover .ctm-style{margin:0;}
.item-no-hover:hover .ctm-style{margin:0!important}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;margin:0;background-color:transparent;background:transparent;clip-path:none}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) dashed var(--link-block-border-color)!important;}
.item-form .ctm-style{margin:0;border:0}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:var(--link-block-corner);}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner);}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0;}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.item-video .video-box iframe, .item-video .video-box img{border-radius:var(--link-block-corner)}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:var(--link-block-corner)}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;margin:0;background-color:transparent;background:transparent;clip-path:none}
.item-support{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) dashed var(--link-block-border-color)!important;}
.item-support .ctm-style{margin:0;border:0}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:var(--link-block-corner);}
.item-support .support-action button{border-radius:var(--link-block-corner)}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;margin:0;background-color:transparent;background:transparent;clip-path:none}
.item-block{background-color:rgba(0,0,0,0)!important;border-radius:var(--link-block-corner);border:var(--link-block-border) dashed var(--link-block-border-color)!important;}
.item-block:hover{box-shadow:none;transform:none;}
.item-block .ctm-style{margin:0;border:0}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:initial;
 --link-block-padding:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'style5': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0!important;}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.item-style::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:8px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-style::after{position:absolute;bottom:-8px;right:8px;left:initial;content:"";display:block;width:100%;height:8px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-style .ctm-style{margin:0;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .ctm-style{margin:0;}
.item-no-hover:hover .ctm-style{margin:0!important}
.item-style .ctm-style::before{position:absolute;top:-2px;left:-10px;content:"";display:block;width:0;height:0;border-bottom:6px solid var(--link-block-border-color);border-left:8px solid transparent}
.item-style .ctm-style::after{position:absolute;bottom:-10px;right:-2px;content:"";display:block;width:0;height:0;border-top:8px solid var(--link-block-border-color);border-right:8px solid transparent}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0!important;}
.item-form::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:8px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-form::after{position:absolute;bottom:-8px;right:8px;left:initial;content:"";display:block;width:100%;height:8px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-form .ctm-style{margin:0;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-form .ctm-style:before{position:absolute;top:0px;left:-8px;content:"";display:block;width:0;height:0;border-bottom:6px solid var(--link-block-border-color);border-left:8px solid transparent}
.item-form .ctm-style:after{position:absolute;bottom:-8px;right:0px;content:"";display:block;width:0;height:0;border-top:8px solid var(--link-block-border-color);border-right:8px solid transparent}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:0}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-support{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0!important;}
.item-support::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:8px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-support::after{position:absolute;bottom:-8px;right:8px;left:initial;content:"";display:block;width:100%;height:8px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-support .ctm-style{margin:0;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-support .ctm-style:before{position:absolute;top:0px;left:-8px;content:"";display:block;width:0;height:0;border-bottom:6px solid var(--link-block-border-color);border-left:8px solid transparent}
.item-support .ctm-style:after{position:absolute;bottom:-8px;right:0px;content:"";display:block;width:0;height:0;border-top:8px solid var(--link-block-border-color);border-right:8px solid transparent}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:0px;}
.item-support .support-action button{border-radius:0}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-block{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0!important;}
.item-block::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:8px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-block::after{position:absolute;bottom:-8px;right:8px;left:initial;content:"";display:block;width:100%;height:8px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-block .ctm-style{margin:0;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-block .ctm-style::before{position:absolute;top:-2px;left:-10px;content:"";display:block;width:0;height:0;border-bottom:6px solid var(--link-block-border-color);border-left:8px solid transparent}
.item-block .ctm-style::after{position:absolute;bottom:-10px;right:-2px;content:"";display:block;width:0;height:0;border-top:8px solid var(--link-block-border-color);border-right:8px solid transparent}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{--link-block-corner:0px;
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:100%;
 --link-block-padding:0px;
 --link-graphic-corner:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'style6': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0px solid transparent!important;}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.item-style::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:2px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-style::after{position:absolute;bottom:-7px;right:8px;left:initial;content:"";display:block;width:100%;height:2px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-style .ctm-style{background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .ctm-style{margin:0;}
.item-no-hover:hover .ctm-style{margin:0!important}
.item-style .ctm-style:before{position:absolute;top:1px;left:-10px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-36deg)}
.item-style .ctm-style:after{position:absolute;bottom:-6px;right:-2px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-45deg)}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form {padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0px solid transparent!important;}
.item-form::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:2px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-form::after{position:absolute;bottom:-7px;right:8px;left:initial;content:"";display:block;width:100%;height:2px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-form .ctm-style{background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-form .ctm-style:before{position:absolute;top:3px;left:-8px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-36deg)}
.item-form .ctm-style:after{position:absolute;bottom:-4px;right:0px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-45deg)}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:0}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-support{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0px solid transparent!important;}
.item-support::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:2px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-support::after{position:absolute;bottom:-7px;right:8px;left:initial;content:"";display:block;width:100%;height:2px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-support .ctm-style{background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-support .ctm-style:before{position:absolute;top:3px;left:-8px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-36deg)}
.item-support .ctm-style:after{position:absolute;bottom:-4px;right:0px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-45deg)}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:0px;}
.item-support .support-action button{border-radius:0}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-block{background-color:rgba(0,0,0,0)!important;border-radius:0;border:0px solid transparent!important;}
.item-block::before{position:absolute;top:6px;left:-8px;content:"";display:block;width:2px;height:100%;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-block::after{position:absolute;bottom:-7px;right:8px;left:initial;content:"";display:block;width:100%;height:2px;background:var(--link-block-border-color);mask-image:none;-webkit-mask-image:none;}
.item-block .ctm-style{margin:0;background-color:rgba(0,0,0,0);border-radius:0;border:2px solid var(--link-block-border-color)!important}
.item-block .ctm-style:before{position:absolute;top:1px;left:-10px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-36deg)}
.item-block .ctm-style:after{position:absolute;bottom:-6px;right:-2px;content:"";display:block;width:10px;height:2px;background:var(--link-block-border-color);transform:rotate(-45deg)}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{--link-block-corner:0px;
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:100%;
 --link-block-padding:0px;
 --link-graphic-corner:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'border.shadow': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style{padding:0;margin:var(--link-block-button-margin-shadow) 0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-style:not(.button--expended):hover .ctm-style{margin:0;}
.item-no-hover:hover .ctm-style{margin:0!important}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-border-shadow);margin-bottom:32px}
.item-style:not(.button--expended):hover{transform:translate(4px, 4px);box-shadow:var(--link-block-border-shadow-hover);background-color:var(--link-block-bg-color)!important;}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-font-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-form::before,.item-form::after,.item-form .ctm-style::before,.item-form .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-form{padding:0;margin:var(--link-block-margin) 0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;margin:0;background-color:transparent;background:transparent;clip-path:none}
.item-form{background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-border-shadow);margin-bottom:32px}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:var(--link-block-corner);}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner);}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0;}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.item-video .video-box iframe, .item-video .video-box img{border-radius:var(--link-block-corner)}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:var(--link-block-corner)}
.item-support::before,.item-support::after,.item-support .ctm-style::before,.item-support .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-support{padding:0;margin:var(--link-block-margin) 0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-support{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-border-shadow);margin-bottom:20px}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:var(--link-block-corner);}
.item-support .support-action button{border-radius:var(--link-block-corner)}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0 12px 0 0;}
.item-block::before,.item-block::after,.item-block .ctm-style::before,.item-block .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-block{padding:0;margin:var(--link-block-button-margin-shadow) 0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;margin:0;;background:transparent;clip-path:none}
.item-block:hover .ctm-style{margin:0;}
.item-block{padding:0;margin:var(--link-block-button-margin-shadow) 0;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-border-shadow);margin-bottom:32px}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{--link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:initial;
 --link-block-padding:0px;
 --link-graphic-corner:calc(var(--link-block-corner) - var(--link-block-border) - var(--link-block-padding));
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'border.double': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;background:transparent;clip-path:none}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;background-color:rgba(0,0,0,0)!important;}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-font-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style .ctm-style{margin:4px -8px;border:2px solid var(--link-block-border-color)!important;border-radius:0;background-color:rgba(0,0,0,0);transition:all 600ms ease}
.item-style:not(.button--expended):hover .ctm-style{margin:4px;}
.item-no-hover:hover .ctm-style{margin:4px -8px!important;}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;}
.item-form .ctm-style{margin:4px -8px;border:2px solid var(--link-block-border-color)!important;border-radius:0;background-color:rgba(0,0,0,0);transition:all 600ms ease}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:0}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-support{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;}
.item-support .ctm-style{margin:4px -8px;border:2px solid var(--link-block-border-color)!important;border-radius:0;background-color:rgba(0,0,0,0);transition:all 600ms ease}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:0px;}
.item-support .support-action button{border-radius:0}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-block{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;}
.item-block .ctm-style{margin:4px -8px;border:2px solid var(--link-block-border-color)!important;border-radius:0;background-color:rgba(0,0,0,0);transition:all 600ms ease}
.item-block:hover .ctm-style{margin:4px -8px;}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{--link-block-corner:0px;
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:8px;
}
.item-graphic{
    --link-block-ctm-height:calc(100% - 8px);
 --link-block-padding:8px;
 --link-graphic-corner:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'border.wave': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style .ctm-style::after,.item-style .ctm-style::before{display:none;background:initial;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-style:not(.button--expended):hover .ctm-style{margin:0;}
.item-no-hover:hover .ctm-style{margin:0!important}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{border-radius:0;background-color:var(--link-block-bg-color)!important;border:2px solid transparent!important;}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;background-color:var(--link-block-bg-color)!important}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-font-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style::after,.item-style::before{content:"";display:block;position:absolute;left:-2px;right:-2px;height:3px;width:initial;overflow:hidden;mask-position:0 top;mask-size:640px 3px;-webkit-mask-position:0 top;-webkit-mask-size:640px 3px;background-color:inherit;animation:12s linear 0s infinite normal none paused buttonWave;-webkit-animation:12s linear 0s infinite normal none paused buttonWave}
.item-style:before{top:-5px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+)}
.item-style:after{bottom:-5px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==)}
.item-style:not(.button--expended):hover:before{animation-play-state:running;-webkit-animation-play-state:running}
.item-style:not(.button--expended):hover:after{animation-name:buttonWaveBottom;-webkit-animation-name:buttonWaveBottom;animation-play-state:running;-webkit-animation-play-state:running}
.item-form .ctm-style::after,.item-form .ctm-style::before{display:none;background:initial;transform:none;border:0}
.item-form{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-form{border-radius:0;background-color:var(--link-block-bg-color)!important;border:2px solid transparent!important;}
.item-form::after,.item-form::before{content:"";display:block;position:absolute;left:-2px;right:-2px;height:3px;width:initial;overflow:hidden;mask-position:0 top;mask-size:640px 3px;-webkit-mask-position:0 top;-webkit-mask-size:640px 3px;background-color:inherit;animation:12s linear 0s infinite normal none paused buttonWave;-webkit-animation:12s linear 0s infinite normal none paused buttonWave}
.item-form:before{top:-5px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+)}
.item-form:after{bottom:-5px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==)}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0px;}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0px;}
.item-form .form-button button{border-radius:0}
.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.item-ytbsub,.item-twitter,.item-pins{border-radius:0}
.item-support .ctm-style::after,.item-support .ctm-style::before{display:none;background:initial;transform:none;border:0}
.item-support{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-support{border-radius:0;background-color:var(--link-block-bg-color)!important;border:2px solid transparent!important;}
.item-support::after,.item-support::before{content:"";display:block;position:absolute;left:-2px;right:-2px;height:3px;width:initial;overflow:hidden;mask-position:0 top;mask-size:640px 3px;-webkit-mask-position:0 top;-webkit-mask-size:640px 3px;background-color:inherit;animation:12s linear 0s infinite normal none paused buttonWave;-webkit-animation:12s linear 0s infinite normal none paused buttonWave}
.item-support:before{top:-4px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+)}
.item-support:after{bottom:-4px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==)}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:0px;}
.item-support .support-action button{border-radius:0}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before{display:none;background:initial;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-block:hover .ctm-style{margin:0;}
.item-block{margin:var(--link-block-margin) 0;border-radius:0;background-color:var(--link-block-bg-color)!important;border:2px solid transparent!important;}
.item-block::after,.item-block::before{content:"";display:block;position:absolute;left:-2px;right:-2px;height:3px;width:initial;overflow:hidden;mask-position:0 top;mask-size:640px 3px;-webkit-mask-position:0 top;-webkit-mask-size:640px 3px;background-color:inherit;animation:12s linear 0s infinite normal none paused buttonWave;-webkit-animation:12s linear 0s infinite normal none paused buttonWave}
.item-block:before{top:-5px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTAgM1YwYzUgMCA1IDIgMTAgMnM1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMmM1LjEgMCA1LjEgMiAxMCAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyIDUgMCA1LTIgMTAtMmguMWM1IDAgNSAyIDkuOSAyaC4xYzUgMCA1LTIgMTAtMnM1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMiA1IDIgMTAgMiA1LTIgMTAtMnYzSDB6Ii8+PC9zdmc+)}
.item-block:after{bottom:-5px;mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==);-webkit-mask-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgMyI+PHBhdGggZD0iTTY0MCAwdjNjLTUgMC01LTItMTAtMnMtNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDItNS0yLTEwLTItNSAyLTEwIDJjLTUuMSAwLTUuMS0yLTEwLTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yLTUgMC01IDItMTAgMmgtLjFjLTUgMC01LTItOS45LTItNSAwLTUgMi0xMCAyaC0uMWMtNSAwLTUtMi05LjktMi01IDAtNSAyLTEwIDJoLS4xYy01IDAtNS0yLTkuOS0yaC0uMWMtNSAwLTUgMi0xMCAycy01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMi01IDItMTAgMi01LTItMTAtMlM1IDMgMCAzVjBoNjQweiIvPjwvc3ZnPg==)}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{--link-block-corner:0px;
    --link-block-border-color:var(--link-block-bg-color);
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:initial;
 --link-block-padding:8px;
 --link-graphic-corner:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'border.pixel1':`.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style{padding:0;margin:var(--link-block-button-margin-pixel1) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{background-color:var(--link-block-bg-color)!important;border:0 solid transparent!important;border-right:10px solid var(--link-block-border-color)!important;border-left:5px solid var(--link-block-border-color)!important;border-radius:0;}
.item-style::after,.item-style::before{content:"";display:block;position:absolute;left:-4px;overflow:hidden;mask-position:0 top;mask-size:13px 8px;-webkit-mask-position:0 top;-webkit-mask-size:10px 8px;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat;background-color:var(--link-block-border-color);width:10px;-webkit-mask-image:var(--pixel-svg-left-top);height:100%;top:-8px;z-index:2;animation:none;-webkit-animation:none;}
.item-style:before{left:-5px;overflow:hidden;mask-position:0 top;mask-size:13px 8px;mask-repeat:no-repeat;background-color:var(--link-block-border-color);width:11px;mask-image:none;-webkit-mask-image:none;top:-5px;height:6px}
.item-style:after{-webkit-mask-image:var(--pixel-svg-left-bottom);height:100%;-webkit-mask-size:10px 13px;left:-5px;top:unset;bottom:-11px;width:13px;-webkit-mask-position:0 bottom}
.item-style .ctm-style::after,.item-style .ctm-style::before{content:"";display:block;position:absolute;background-color:var(--link-block-border-color)!important}
.item-style .ctm-style:before{width:9px;background-color:var(--link-block-border-color)!important;right:-5px;left:initial;top:-5px;height:5px;-webkit-mask-image:none}
.item-style .ctm-style:after{right:-10px;bottom:-7px;width:14px;height:10px}
.item-style:not(.button--expended):hover,.item-style:not(.button--expended):hover .item--bg{background-color:rgba(0,0,0,0)!important;box-shadow:none;transform:none}
.item-style:not(.button--expended):hover .ctm-style{margin:0;}
.item-no-hover:hover .ctm-style{margin:0!important}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.item-form::before,.item-form::after,.item-form .ctm-style::before,.item-form .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-form{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-form{border-radius:0;background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0;}
.item-form .form-field-phone .dial-code{border-radius:0;}
.item-form .form-field-phone input.data-field{border-radius:0;}
.item-form .form-button button{border-radius:0}
.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:0}
.item-support::before,.item-support::after,.item-support .ctm-style::before,.item-support .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-support{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-support{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:0;}
.item-support .support-action button{border-radius:0}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block::before,.item-block::after,.item-block .ctm-style::before,.item-block .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-block{padding:0;margin:var(--link-block-button-margin-pixel1) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-block:hover{box-shadow:none;transform:none;}
.item-block{background-color:var(--link-block-bg-color)!important;border:0 solid transparent!important;border-right:10px solid var(--link-block-border-color)!important;border-left:5px solid var(--link-block-border-color)!important;border-radius:0;}
.item-block::after,.item-block::before{content:"";display:block;position:absolute;left:-4px;overflow:hidden;mask-position:0 top;mask-size:13px 8px;-webkit-mask-position:0 top;-webkit-mask-size:10px 8px;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat;background-color:var(--link-block-border-color);width:10px;-webkit-mask-image:var(--pixel-svg-left-top);height:100%;top:-8px;z-index:2;animation:none;-webkit-animation:none;}
.item-block:before{left:-5px;overflow:hidden;mask-position:0 top;mask-size:13px 8px;mask-repeat:no-repeat;background-color:var(--link-block-border-color);width:11px;mask-image:none;-webkit-mask-image:none;top:-5px;height:6px}
.item-block:after{-webkit-mask-image:var(--pixel-svg-left-bottom);height:100%;-webkit-mask-size:10px 13px;left:-5px;top:unset;bottom:-11px;width:13px;-webkit-mask-position:0 bottom}
.item-block .ctm-style::after,.item-block .ctm-style::before{content:"";display:block;position:absolute;background-color:var(--link-block-border-color)!important}
.item-block .ctm-style:before{width:9px;background-color:var(--link-block-border-color)!important;right:-5px;top:-5px;height:5px;-webkit-mask-image:none}
.item-block .ctm-style:after{right:-10px;bottom:-7px;width:14px;height:10px}
.item .item--bg,.item-block .item--bg{display:block;background-color:var(--link-block-bg-color)!important;position:absolute;bottom:-11px;left:4px;right:0;z-index:-1;top:-9px;border-top:5px solid var(--link-block-border-color)!important;border-bottom:10px solid var(--link-block-border-color)!important}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:block;position:absolute;width:5px;height:6px;background-color:var(--link-block-border-color);top:-5px;left:-4px}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:block;position:absolute;width:6px;height:6px;background-color:var(--link-block-border-color);bottom:-10px;right:-6px}
body{--link-block-corner:0px;
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:8px;
}
.item-graphic{
    --link-block-ctm-height:100%;
 --link-block-padding:8px;
 --link-graphic-corner:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'border.pixel2':`.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style{padding:0;margin:var(--link-block-button-margin-pixel2) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
item-style .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{background-color:rgba(0,0,0,0)!important;border:0 solid transparent!important;border-right:4px solid var(--link-block-border-color)!important;border-left:4px solid var(--link-block-border-color)!important;border-radius:0;}
.item-style::after,.item-style::before{content:"";display:block;position:absolute;left:0;overflow:hidden;background-color:var(--link-block-border-color);width:4px;height:4px;top:4px;z-index:2;mask-image:none;-webkit-mask-image:none}
.item-style:before{left:0;width:4px;top:-4px;height:4px}
.item-style:after{height:4px;left:0;top:unset;bottom:-4px;width:4px;}
.item-style .ctm-style{margin:0;border:0!important;background-color:rgba(0,0,0,0)}
.item-style .ctm-style::after,.item-style .ctm-style::before{content:"";display:block;position:absolute;background-color:var(--link-block-border-color)!important;left:unset}
.item-style .ctm-style:before{width:4px;right:0;top:-4px;height:4px}
.item-style .ctm-style:after{right:0;bottom:-4px;width:4px;height:4px}
.item-no-hover:hover .ctm-style{margin:0!important}
.item-form::before,.item-form::after,.item-form .ctm-style::before,.item-form .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-form{padding:0;margin:var(--link-block-button-margin-pixel2) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;margin:0;background-color:transparent;background:transparent;clip-path:none}
.item-form{border-radius:0;background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:0;}
.item-form .form-field-phone .dial-code{border-radius:0;}
.item-form .form-field-phone input.data-field{border-radius:0;}
.item-form .form-button button{border-radius:0}
.item-video .video-box iframe, .item-video .video-box img{border-radius:0}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:0}
.item-support::before,.item-support::after,.item-support .ctm-style::before,.item-support .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-support{padding:0;margin:var(--link-block-button-margin-pixel2) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-support{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:0;}
.item-support .support-action button{border-radius:0}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block::before,.item-block::after,.item-block .ctm-style::before,.item-block .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-block{padding:0;margin:var(--link-block-button-margin-pixel2) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-block{background-color:rgba(0,0,0,0)!important;border:0 solid transparent!important;border-right:4px solid var(--link-block-border-color)!important;border-left:4px solid var(--link-block-border-color)!important;border-radius:0;}
.item-block::after,.item-block::before{content:"";display:block;position:absolute;left:0;overflow:hidden;background-color:var(--link-block-border-color);width:4px;height:4px;top:4px;z-index:2;mask-image:none;-webkit-mask-image:none}
.item-block:before{left:0;width:4px;top:-4px;height:4px}
.item-block:after{height:4px;left:0;top:unset;bottom:-4px;width:4px;}
.item-block .ctm-style{margin:0;border:0!important;background-color:rgba(0,0,0,0)}
.item-block .ctm-style::after,.item-block .ctm-style::before{content:"";display:block;position:absolute;background-color:var(--link-block-border-color)!important;left:unset}
.item-block .ctm-style:before{width:4px;right:0;top:-4px;height:4px}
.item-block .ctm-style:after{right:0;bottom:-4px;width:4px;height:4px}
.item .item--bg,.item-block .item--bg{display:block;background-color:rgba(0,0,0,0)!important;position:absolute;bottom:-8px;left:4px;right:4px;z-index:-1;top:-8px;border-top:4px solid var(--link-block-border-color)!important;border-bottom:4px solid var(--link-block-border-color)!important}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{--link-block-corner:0px;
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:8px;
}
.item-graphic{
    --link-block-ctm-height:100%;
 --link-block-padding:8px;
 --link-graphic-corner:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'border.pixel3':`.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{margin:0;border:0!important;background:transparent;clip-path:none}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{border:3px solid var(--link-block-bg-color)!important;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;}
.item-style .ctm-style{border-radius:calc(var(--link-block-corner) - 3px);border:2px solid var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover{background-color:rgba(0,0,0,0)!important;box-shadow:none;transform:none}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-bg-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-bg-color)!important;border-color:var(--link-block-bg-color)!important}
.item-no-hover:hover .ctm-style{margin:0!important}
.item-form::before,.item-form::after,.item-form .ctm-style::before,.item-form .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-form{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{margin:0;border:0!important;background-color:transparent;background:transparent;clip-path:none}
.item-form{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:var(--link-block-corner);}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner);}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0;}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.item-video .video-box iframe, .item-video .video-box img{border-radius:var(--link-block-corner)}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:var(--link-block-corner)}
.item-support::before,.item-support::after,.item-support .ctm-style::before,.item-support .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-support{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-support{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:var(--link-block-border) solid var(--link-block-border-color)!important;}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:var(--link-block-corner);}
.item-support .support-action button{border-radius:var(--link-block-corner)}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0}
.item-block::before,.item-block::after,.item-block .ctm-style::before,.item-block .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{margin:0;border:0!important;background:transparent;clip-path:none}
.item-block:hover{box-shadow:none;transform:none;}
.item-block{border:3px solid var(--link-block-bg-color)!important;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;}
.item-block .ctm-style{border-radius:calc(var(--link-block-corner) - 3px);border:2px solid var(--link-block-border-color)!important}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{
    --link-block-ctm-pad:5px;
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:100%;
 --link-block-padding:0px;
 --link-graphic-corner:calc(var(--link-block-corner) - 3px - var(--link-block-border) - var(--link-block-padding));
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'shadow.down': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px;}
.item-style::before,.item-style::after,.item-style .ctm-style::before,.item-style .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-style{padding:0;margin:var(--link-block-button-margin-shadow) 0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-style:not(.button--expended):hover .ctm-style{margin:0;}
.item-no-hover:hover .ctm-style{margin:0!important}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{padding:0;margin:var(--link-block-button-margin-shadow) 0;border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-shadow-down);margin-bottom:32px}
.item-style:not(.button--expended):hover{transform:translate(0px, 4px);box-shadow:var(--link-block-shadow-down-hover);background-color:var(--link-block-bg-color)!important;}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn-status,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text{color:var(--link-block-font-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-form::before,.item-form::after,.item-form .ctm-style::before,.item-form .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-form{padding:0;margin:var(--link-block-button-margin-shadow) 0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-form{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-shadow-down);margin-bottom:32px}
.item-form .form-control input, .item-form .form-control select, .item-form .form-control textarea{border-radius:var(--link-block-corner);}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner);}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0;}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.item-video .video-box iframe, .item-video .video-box img{border-radius:var(--link-block-corner)}
.item-ytbsub,.item-twitter,.item-pins,.item-pins .embed-pins{border-radius:var(--link-block-corner)}
.item-support::before,.item-support::after,.item-support .ctm-style::before,.item-support .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-support{padding:0;margin:var(--link-block-button-margin-shadow) 0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-support{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-shadow-down);margin-bottom:20px}
.item-support .form-control input, .item-support .form-control select, .item-support .form-control textarea{border-radius:var(--link-block-corner);}
.item-support .support-action button{border-radius:var(--link-block-corner)}
.biolink,.link-form,.edit-form,.bio-support,.bio-form,.bio-graphic,.bio-carousel,.bio-block{padding:0;}
.item-block::before,.item-block::after,.item-block .ctm-style::before,.item-block .ctm-style::after{display:none;background:transparent;transform:none;border:0;}
.item-block{padding:0;margin:var(--link-block-button-margin-shadow) 0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-block:hover .ctm-style{margin:0;}
.item-block{border-radius:var(--link-block-corner);background-color:var(--link-block-bg-color)!important;border:2px solid var(--link-block-border-color)!important;box-shadow:var(--link-block-shadow-down);margin-bottom:32px}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none;}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none;}
body{
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:initial;
 --link-block-padding:0px;
 --link-graphic-corner:calc(var(--link-block-corner) - var(--link-block-border) - var(--link-block-padding));
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'neon.glass': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;background:transparent;clip-path:none}
.item-style .ctm-style{border:2px solid var(--link-block-border-color)!important;margin:0;background:transparent;clip-path:none}
.item-style:not(.button--expended):hover .ctm-style{margin:0}
.item-no-hover:hover .ctm-style{margin:0!important}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{border-radius:var(--link-block-corner);background-color:rgba(0,0,0,0)!important;border:0!important;-webkit-backdrop-filter:blur(.333em);backdrop-filter:blur(.333em);box-shadow:var(--link-block-shadow-neon)}
.item-style:not(.button--expended):hover{transform:none;box-shadow:var(--link-block-shadow-neon);background-color:rgba(0,0,0,0)!important}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text,.item-style:not(.button--expended):hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form{padding:0;margin:var(--link-block-margin) 0;background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-form{border-radius:var(--link-block-corner);background-color:rgba(0,0,0,0)!important;border:0!important;-webkit-backdrop-filter:blur(.333em);backdrop-filter:blur(.333em);box-shadow:var(--link-block-shadow-neon)}
.item-form .form-control input,.item-form .form-control select,.item-form .form-control textarea{border-radius:var(--link-block-corner)}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner)}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.item-video .video-box iframe,.item-video .video-box img{border-radius:var(--link-block-corner)}
.item-pins,.item-pins .embed-pins,.item-twitter,.item-ytbsub{border-radius:var(--link-block-corner)}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{padding:0;margin:var(--link-block-margin) 0;background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-support{border-radius:var(--link-block-corner);background-color:rgba(0,0,0,0)!important;border:0!important;-webkit-backdrop-filter:blur(.333em);backdrop-filter:blur(.333em);box-shadow:var(--link-block-shadow-neon)}
.item-support .form-control input,.item-support .form-control select,.item-support .form-control textarea{border-radius:var(--link-block-corner)}
.item-support .support-action button{border-radius:var(--link-block-corner)}
.bio-block,.bio-carousel,.bio-form,.bio-graphic,.bio-support,.biolink,.edit-form,.link-form{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 0;background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-block:hover .ctm-style{margin:0}
.item-block{border-radius:var(--link-block-corner);background-color:rgba(0,0,0,0)!important;border:0!important;-webkit-backdrop-filter:blur(.333em);backdrop-filter:blur(.333em);box-shadow:var(--link-block-shadow-neon)}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none}
body{--link-block-border-color:rgba(0,0,0,0);
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:initial;
 --link-block-padding:0px;
 --link-graphic-corner:calc(var(--link-block-corner) - var(--link-block-border) - var(--link-block-padding));
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'double.line': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;background:transparent;clip-path:none}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:var(--link-block-border) solid var(--link-block-border-color)!important;border-right:0!important;border-left:0!important}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;background-color:rgba(0,0,0,0)!important}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text,.item-style:not(.button--expended):hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style .ctm-style{border:0!important;border-radius:0;background-color:rgba(0,0,0,0)}
.item-no-hover:hover .ctm-style{margin:0!important}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:var(--link-block-border) solid var(--link-block-border-color)!important;border-right:0!important;border-left:0!important}
.item-form .ctm-style{border-radius:0;background-color:rgba(0,0,0,0)}
.item-form .form-control input,.item-form .form-control select,.item-form .form-control textarea{border-radius:0}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0}
.item-form .form-button button{border-radius:0}
.item-video .video-box iframe,.item-video .video-box img{border-radius:0}
.item-pins,.item-pins .embed-pins,.item-twitter,.item-ytbsub{border-radius:0}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-support{background-color:rgba(0,0,0,0)!important;border-radius:0;border:var(--link-block-border) solid var(--link-block-border-color)!important;border-right:0!important;border-left:0!important}
.item-support .ctm-style{margin:0;border:0!important;border-radius:0;background-color:rgba(0,0,0,0)}
.item-support .form-control input,.item-support .form-control select,.item-support .form-control textarea{border-radius:0}
.item-support .support-action button{border-radius:0}
.bio-block,.bio-carousel,.bio-form,.bio-graphic,.bio-support,.biolink,.edit-form,.link-form{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 0;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-block{background-color:rgba(0,0,0,0)!important;border-radius:0;border:var(--link-block-border) solid var(--link-block-border-color)!important;border-right:0!important;border-left:0!important}
.item-block .ctm-style{margin:0;border:0!important;border-radius:0;background-color:rgba(0,0,0,0)}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none}
body{--link-block-corner:0px;
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
--link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:initial;
 --link-block-padding:8px;
 --link-graphic-corner:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'border.well': `.cmpt-button-buttonLink .show-sortNum::before{left:-30px}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{padding:0;margin:var(--link-block-button-margin) 12px;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;background:transparent;clip-path:none}
.button--expended.item-style .ctm-style{clip-path:none;}
.button--expended .carousel-box.embed-carousel{border-top:none;}
.button--expended .carousel-box .ctm-style{clip-path:none;}
.item-style{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;border-top:1px solid transparent!important;border-bottom:1px solid transparent!important}
.item-style:not(.button--expended):hover{box-shadow:none;transform:none;background-color:rgba(0,0,0,0)!important}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text,.item-style:not(.button--expended):hover .btn-status{color:var(--link-block-font-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-font-color)!important;border-color:var(--link-block-font-color)!important}
.item-style .ctm-style{margin:8px -12px;border:2px solid var(--link-block-border-color)!important;border-left:0!important;border-right:0!important;border-radius:0;background-color:rgba(0,0,0,0)}
.item-style:not(.button--expended):hover .ctm-style{margin:8px -12px}
.item-no-hover:hover .ctm-style{margin:8px -12px!important}
.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form{padding:0;margin:var(--link-block-margin) 12px;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-form{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;border-top:1px solid transparent!important;border-bottom:1px solid transparent!important;}
.item-form .ctm-style{margin:8px -12px;border:2px solid var(--link-block-border-color)!important;border-left:0!important;border-right:0!important;border-radius:0;background-color:rgba(0,0,0,0);transition:all .6s ease}
.item-form .form-control input,.item-form .form-control select,.item-form .form-control textarea{border-radius:0}
.item-form .form-field-phone .dial-code,.item-form .form-field-phone input.data-field{border-radius:0}
.item-form .form-button button{border-radius:0}
.item-video .video-box iframe,.item-video .video-box img{border-radius:0}
.item-pins,.item-pins .embed-pins,.item-twitter,.item-ytbsub{border-radius:0}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{padding:0;margin:var(--link-block-margin) 12px;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-support{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;border-top:1px solid transparent!important;border-bottom:1px solid transparent!important;}
.item-support .ctm-style{margin:8px -12px;border:2px solid var(--link-block-border-color)!important;border-left:0!important;border-right:0!important;border-radius:0;background-color:rgba(0,0,0,0);transition:all .6s ease}
.item-support .form-control input,.item-support .form-control select,.item-support .form-control textarea{border-radius:0}
.item-support .support-action button{border-radius:0}
.bio-block,.bio-carousel,.bio-form,.bio-graphic,.bio-support,.biolink,.edit-form,.link-form{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{padding:0;margin:var(--link-block-margin) 12px;box-shadow:none;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;background:transparent;clip-path:none}
.item-block{background-color:rgba(0,0,0,0)!important;border-radius:0;border:2px solid var(--link-block-border-color)!important;border-top:1px solid transparent!important;border-bottom:1px solid transparent!important;}
.item-block .ctm-style{margin:8px -12px;border:2px solid var(--link-block-border-color)!important;border-left:0!important;border-right:0!important;border-radius:0;background-color:rgba(0,0,0,0);transition:all .6s ease}
.item-block:hover .ctm-style{margin:8px -12px;}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none}
body{--link-block-corner:0px;
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
    --link-block-padding:12px;
}
.item-graphic{
    --link-block-ctm-height:calc(100% - 16px);
 --link-block-padding:12px;
 --link-graphic-corner:0px;
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
         'corner.cut':`.cmpt-button-buttonLink .show-sortNum::before{left:-30px}
.item-style .ctm-style::after,.item-style .ctm-style::before,.item-style::after,.item-style::before{display:none;background:0 0;transform:none;border:0}
.item-style{margin:var(--link-block-button-margin) 0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-style .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-style:not(.button--expended):hover .ctm-style{margin:0}
.item-no-hover:hover .ctm-style{margin:0!important}
.item-style{border-radius:0;background-color:transparent!important;border:0 solid transparent!important;padding:2px;background:var(--link-block-cut-corner-bg);
 background-size:100% 100%;background-size: calc(var(--link-block-slant) + 1.3 * var(--link-block-border)) calc(var(--link-block-slant) + 1.3 * var(--link-block-border));
 background-repeat:no-repeat;box-shadow:0 0 0 2px inset var(--link-block-border-color);clip-path:var(--link-block-cut-corner-clip);transition:color .2s .1s,background-size .3s}
.item-style .ctm-style{background:var(--link-block-cut-corner-bg-inner);background-size:100% 100%;background-repeat:no-repeat;clip-path:var(--link-block-cut-corner-inner-clip);transition:color .2s .1s,background-size .3s}
.item-style:not(.button--expended):hover{background-color:rgba(0,0,0,0)!important;transform:none;box-shadow:0 0 0 2px inset var(--link-block-border-color)}
.item-style:not(.button--expended):hover .ctm-style{background-size:0 0}
.item-style:not(.button--expended):hover .btn,.item-style:not(.button--expended):hover .btn .btn-text,.item-style:not(.button--expended):hover .btn .link-text,.item-style:not(.button--expended):hover .btn-status{color:var(--link-block-border-color)!important}
.item-style:not(.button--expended):hover .btn-icon span{color:var(--link-block-border-color)!important;border-color:var(--link-block-border-color)!important}
.button--expended.item-style .ctm-style{clip-path:var(--link-block-cut-corner-expended);}
.button--expended .carousel-box.embed-carousel{border-top:2px solid var(--link-block-border-color);}
.button--expended .carousel-box .ctm-style{clip-path:var(--link-block-cut-corner-expended-inner);}

.item-form .ctm-style::after,.item-form .ctm-style::before,.item-form::after,.item-form::before{display:none;background:0 0;transform:none;border:0}
.item-form{margin:var(--link-block-margin) 0;-webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-form .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-form{border-radius:var(--link-block-corner);background-color:transparent!important;border:0 solid transparent!important;padding:2px;background:var(--link-block-cut-corner-bg);
background-size: calc(var(--link-block-slant) + 1.3 * var(--link-block-border)) calc(var(--link-block-slant) + 1.3 * var(--link-block-border));background-repeat:no-repeat;box-shadow:0 0 0 2px inset var(--link-block-border-color);clip-path:var(--link-block-cut-corner-clip);transition:color .2s .1s,background-size .3s}
.item-form .ctm-style{background:var(--link-block-cut-corner-bg-inner);background-size:100% 100%;background-repeat:no-repeat;clip-path:var(--link-block-cut-corner-inner-clip)}
.item-form .form-control input,.item-form .form-control select,.item-form .form-control textarea{border-radius:var(--link-block-corner)}
.item-form .form-field-phone .dial-code{border-radius:var(--link-block-corner) 0 0 var(--link-block-corner)}
.item-form .form-field-phone input.data-field{border-radius:0 var(--link-block-corner) var(--link-block-corner) 0}
.item-form .form-button button{border-radius:var(--form-tmpl-radius)}
.item-video .video-box iframe,.item-video .video-box img{border-radius:var(--link-block-corner)}
.item-pins,.item-pins .embed-pins,.item-twitter,.item-ytbsub{border-radius:var(--link-block-corner)}
.item-support .ctm-style::after,.item-support .ctm-style::before,.item-support::after,.item-support::before{display:none;background:0 0;transform:none;border:0}
.item-support{margin:var(--link-block-margin) 0;webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-support .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-support{border-radius:var(--link-block-corner);background-color:transparent!important;border:0 solid transparent!important;padding:2px;background:var(--link-block-cut-corner-bg);background-size: calc(var(--link-block-slant) + 1.3 * var(--link-block-border)) calc(var(--link-block-slant) + 1.3 * var(--link-block-border));background-repeat:no-repeat;box-shadow:0 0 0 2px inset var(--link-block-border-color);clip-path:var(--link-block-cut-corner-clip);transition:color .2s .1s,background-size .3s}
.item-support .ctm-style{background:var(--link-block-cut-corner-bg-inner);background-size:100% 100%;background-repeat:no-repeat;clip-path:var(--link-block-cut-corner-inner-clip)}
.item-support .form-control input,.item-support .form-control select,.item-support .form-control textarea{border-radius:var(--link-block-corner)}
.item-support .support-action button{border-radius:var(--link-block-corner)}
.bio-block,.bio-carousel,.bio-form,.bio-graphic,.bio-support,.biolink,.edit-form,.link-form{padding:0}
.item-block .ctm-style::after,.item-block .ctm-style::before,.item-block::after,.item-block::before{display:none;background:0 0;transform:none;border:0}
.item-block{margin:var(--link-block-margin) 0;webkit-backdrop-filter:blur(0);backdrop-filter:blur(0);background:transparent;clip-path:none}
.item-block .ctm-style{border:0!important;margin:0;background:transparent;clip-path:none}
.item-block:hover .ctm-style{margin:0}
.item-block{border-radius:var(--link-block-corner);background-color:transparent!important;border:0 solid transparent!important;padding:2px;background:var(--link-block-cut-corner-bg);background-size: calc(var(--link-block-slant) + 1.3 * var(--link-block-border)) calc(var(--link-block-slant) + 1.3 * var(--link-block-border));background-repeat:no-repeat;box-shadow:0 0 0 2px inset var(--link-block-border-color);clip-path:var(--link-block-cut-corner-clip);transition:color .2s .1s,background-size .3s}
.item-block .ctm-style{background:var(--link-block-cut-corner-bg-inner);background-size:100% 100%;background-repeat:no-repeat;clip-path:var(--link-block-cut-corner-inner-clip)}
.item .item--bg,.item-block .item--bg{display:none}
.item .item--bg::before,.item-block .item--bg::before{content:"";display:none}
.item .item--bg::after,.item-block .item--bg::after{content:"";display:none}
body{--link-block-corner:0px;
    --link-block-ctm-pad:calc(var(--link-block-border) + var(--link-block-ctm-border));
}
.biolink{
    --link-block-padding:0px;
}
.item-graphic{
    --link-block-ctm-height:100%;
 --link-block-padding:0px;
 --link-graphic-corner:calc(var(--link-block-corner) - var(--link-block-border) - var(--link-block-padding));
 --link-block-radius: var(--link-graphic-corner);
 --link-block-radius-link:var(--link-graphic-corner) 0 0 var(--link-graphic-corner);
 --link-block-radius-link-2n:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-link1:var(--link-block-radius-link);
 --link-block-radius-link2:0 var(--link-graphic-corner) var(--link-graphic-corner) 0;
 --link-block-radius-image2:var(--link-graphic-corner) var(--link-graphic-corner) 0 0;
}
`,
            'corner': '--link-block-corner:{0}px;',
            'border': '--link-block-border:{0}px;',
        },
        'colors':{
            background:`--link-block-bg-color:{0};`,
            text:`--link-block-font-color:{0};`,
            shadow:`--link-block-shadow-color:{0};`,
            border:`--link-block-border-color:{0};`,
        },
        'thumbnail': {
            'style': {
                'origin': `.item .btn-icon img{display:block;}.item .btn-icon span{display:none;}`,
                'borderColor': `.item .btn-icon img{display:none;}.item .btn-icon span{display:block;}`
            },
            'corner':`--link-thumbnail-radius:{0}%;`,
            'radius': {
                'radius0': '--link-thumbnail-radius:0%;',
                'radius': '--link-thumbnail-radius:8px;',
                'radius12': '--link-thumbnail-radius:8px;',
                'radius50': '--link-thumbnail-radius:50%;'
            },
            'color':`--link-thumbnail-color:{0};`,
        },
        'button':{
            backgroundColor:`--link-action-bg-color:{0};`,
            textColor:`--link-action-font-color:{0};`,
        },
    },
BIO_Theme_2_CSS_PageBg = {
    'color': 'section .section-bg{background-image:initial;background-color:{0};}',
    'gradient': {
        'gradient.style.flat': '--link-page-bg-gradient-style:to right;',
        'gradient.style.up': '--link-page-bg-gradient-style:to bottom;',
        'gradient.style.down': '--link-page-bg-gradient-style:to top;',
        'gradient.color.default': `section .section-bg{}`,
        'gradient.color.color1': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #EF629F, #EECDA3)}`,
        'gradient.color.color2': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #F64F59, #C471ED, #12C2E9)}`,
        'gradient.color.color3': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #FDBB2D, #22C1C3)}`,
        'gradient.color.color4': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #1D2671, #C33764)}`,
        'gradient.color.color5': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #2C3E50, #BDC3C7)}`,
        'gradient.color.color6': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #B91D73, #F953C6)}`,
        'gradient.color.color7': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #C6FFDD, #FBD786, #F7797D)}`,
        'gradient.color.color8': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #0083B0, #00B4DB)}`,
        'gradient.color.color9': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #185A9D, #43CEA2)}`,
        'gradient.color.color10': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #870000, #190A05 35%)}`,
        'gradient.color.color11': `section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), #EEF2F3, #8E9EAB)}`,
    },
    'common': 'section .section-bg{border-radius:{0}px;opacity:{1};}'
},
BIO_Theme_2_CSS_Thumbnail = {
    'style': {'origin': `.item .btn-icon img{display:block;}
    .item .btn-icon span{display:none;}`,
              'borderColor': `.item .btn-icon img{display:none;}
              .item .btn-icon span{display:block;}`},
    'radius': {'radius0': '.item .btn-icon img,.item .btn-icon span{border-radius:0!important;}',
               'radius': '.item .btn-icon img,.item .btn-icon span{border-radius:var(--link-button-radius12, 8px)!important;}',
               'radius12': '.item .btn-icon img,.item .btn-icon span{border-radius:var(--link-button-radius12, 8px)!important;}',
               'radius50': '.item .btn-icon img,.item .btn-icon span{border-radius:50%!important;}'},
    'color': `--link-button-bg-thumbnail-color:{0};
    --link-button-bg-thumbnail-border-color:{0};
    --link-button-border-thumbnail-color:{0};
    --link-button-border-thumbnail-border-color:{0};
`,
},
Theme_2_CSS_Social = {
    'style': {'default': '',
              'origin': '[class^=cmpt-social] li a img{display:block;}\n[class^=cmpt-social] li a span{display:none;}',
              'borderColor': '[class^=cmpt-social] li a img{display:none;}\n[class^=cmpt-social] li a span{display:block;}'},
    'radius': {'radius0': '[class^=cmpt-social] li a img,[class^=cmpt-social] li a span{border-radius:0!important;}',
               'radius': '[class^=cmpt-social] li a img,[class^=cmpt-social] li a span{border-radius:var(--link-social-radius, 8px)!important;}',
               'radius12': '[class^=cmpt-social] li a img,[class^=cmpt-social] li a span{border-radius:var(--link-social-radius, 8px)!important;}',
               'radius50': '[class^=cmpt-social] li a img,[class^=cmpt-social] li a span{border-radius:50%!important;}'},
    'color': '--link-social-color:{0};\n--link-social-border-color:{0};',
},
Theme_2_CSS_Style={
    align: 'section [class^=cmpt-]{text-align:{0}}\nsection [class^=cmpt-] [class*=ctm-style-],section [class*=ctm-style-] .image-bg{text-align:{0};margin-left:auto;margin-right:auto;margin-{0}:0;}\n[class^=cmpt-] ul.social_list{justify-content:{0}}',
    spacing: 'section .content [class^=cmpt-]{margin-top:{0}px;}',
},BIO_Theme_2_CSS_Other = {
    profile: {
        style: {
            default: `.banner-cover .center{margin-top:calc(0px - var(--link-profile-size) / 2);}
                .layout-basic{display:block;text-align:center;}
                .banner-cover .layout-basic .text{padding-top:0}
                .layout-basic .avatar{margin-left:auto;margin-right:auto}`,
            verticalLeft: `.banner-cover .center{margin-top:calc(0px - var(--link-profile-size) / 2);}
                .layout-basic{display:block;text-align:left;}
                .banner-cover .layout-basic .text{padding-top:0}
                .layout-basic .avatar{margin-left:0;margin-right:auto}`,
            horizontalLeft: `.banner-cover .center{margin-top:calc(0px - var(--link-profile-size) / 4);}
                .banner-cover .layout-basic .text{padding-top:calc(var(--link-profile-size) / 4)}
                .layout-basic{display:flex;flex-direction:row;text-align:left;}
                .layout-basic .avatar{margin:0 0 16px 0;}
                .layout-basic .text{padding-left:16px;}`,
            horizontalRight: `.banner-cover .center{margin-top:calc(0px - var(--link-profile-size) / 4);}
                .banner-cover .layout-basic .text{padding-top:calc(var(--link-profile-size) / 4)}
                .layout-basic{display:flex;flex-direction:row-reverse;text-align:right;}
                .layout-basic .avatar{margin:0 0 16px 0;}
                .layout-basic .text{padding-right:16px;}`,
        },
        size: `body{--link-profile-size:{0}px}.center .avatar{width:{0}px;height:{0}px;min-width:{0}px;}`,
        corner: `.center .avatar,.center .avatar img{border-radius:{0}%;}body{--link-profile-corner:{0}%}`,
        border: `.center .avatar img{border-width:{0}px}`,
        borderColor:`.center .avatar img{border-color:{0}}`
    },
    social: {
        style: {
            'origin': `.social_list li a img{display:block;}.social_list li a span.borderColor,.social_list li a span.line,.social_list li a span.solid{display:none;}`,
            'borderColor':`.social_list li a img,.social_list li a span.borderColor,.social_list li a span.line,.social_list li a span.solid{display:none;}.social_list li a span.borderColor{display:block}`,
            'line':`.social_list li a img,.social_list li a span.borderColor,.social_list li a span.line,.social_list li a span.solid{display:none;}.social_list li a span.line{display:block;}`,
            'solid':`.social_list li a img,.social_list li a span.borderColor,.social_list li a span.line,.social_list li a span.solid{display:none;}.social_list li a span.solid{display:block;}`,
        },
        radius: {'radius0': '.social_list li a img,.social_list li a span{border-radius:0;}',
           'radius': '.social_list li a img,.social_list li a span{border-radius:var(--link-social-radius);}',
           'radius12': '.social_list li a img,.social_list li a span{border-radius:var(--link-social-radius);}',
           'radius50': '.social_list li a img,.social_list li a span{border-radius:50%;}'},
        align: {
            'center': `.social_list ul{justify-content:center;}.social_list ul a{margin:auto}`,
            'left': `.social_list ul{justify-content:start;justify-content:flex-start;}.social_list ul a{margin:auto auto auto 0;}`,
            'right': `.social_list ul{justify-content:end;justify-content:flex-end;}.social_list ul a{margin:auto 0 auto auto;}`,
        },
        color: `--link-social-color:{0};`,
    },
    divider:{
        style:{
            solid:`.item-divider .cmpt-divider-solid,.item-divider .cmpt-divider-lineBlank,.item-divider .cmpt-divider-lineDashed,.item-divider .cmpt-divider-dashed,.item-divider .cmpt-divider-lineCircle,.item-divider .cmpt-divider-linePentagram{display:none}
            .item-divider .cmpt-divider-solid{display:block}`,
            lineBlank:`.item-divider .cmpt-divider-solid,.item-divider .cmpt-divider-lineBlank,.item-divider .cmpt-divider-lineDashed,.item-divider .cmpt-divider-dashed,.item-divider .cmpt-divider-lineCircle,.item-divider .cmpt-divider-linePentagram{display:none}
            .item-divider .cmpt-divider-lineBlank{display:block}`,
            lineDashed:`.item-divider .cmpt-divider-solid,.item-divider .cmpt-divider-lineBlank,.item-divider .cmpt-divider-lineDashed,.item-divider .cmpt-divider-dashed,.item-divider .cmpt-divider-lineCircle,.item-divider .cmpt-divider-linePentagram{display:none}
            .item-divider .cmpt-divider-lineDashed{display:block}`,
            dashed:`.item-divider .cmpt-divider-solid,.item-divider .cmpt-divider-lineBlank,.item-divider .cmpt-divider-lineDashed,.item-divider .cmpt-divider-dashed,.item-divider .cmpt-divider-lineCircle,.item-divider .cmpt-divider-linePentagram{display:none}
            .item-divider .cmpt-divider-dashed{display:block}`,
            linePentagram:`.item-divider .cmpt-divider-solid,.item-divider .cmpt-divider-lineBlank,.item-divider .cmpt-divider-lineDashed,.item-divider .cmpt-divider-dashed,.item-divider .cmpt-divider-lineCircle,.item-divider .cmpt-divider-linePentagram{display:none}
            .item-divider .cmpt-divider-linePentagram{display:flex}`,
            lineCircle:`.item-divider .cmpt-divider-solid,.item-divider .cmpt-divider-lineBlank,.item-divider .cmpt-divider-lineDashed,.item-divider .cmpt-divider-dashed,.item-divider .cmpt-divider-lineCircle,.item-divider .cmpt-divider-linePentagram{display:none}
            .item-divider .cmpt-divider-lineCircle{display:flex}`,
        },
        width:`.item-divider [class^=cmpt-divider-]{width:{0}%}`,
        thickness:`--link-divider-height:{0}px;`,
        align:{
            left:`.item-divider [class^=cmpt-divider-]{margin:auto auto auto 0}`,
            center:`.item-divider [class^=cmpt-divider-]{margin:auto;}`,
            right:`.item-divider [class^=cmpt-divider-]{margin:auto 0 auto auto}`,
        },
    },
    headline:{
        style:{
            normal:`.item-header h3 p{padding:0;border-width:0;}`,
            border:`.item-header h3 p{padding:8px 16px;border-width:2px;}`,
            doubleLine:`.item-header h3 p{padding:8px 16px;border-width:2px;border-left-width:0;border-right-width: 0;}`
        }
    }
};
var _IMAGE_DOMAIN='https://bio.linkcdn.cc/';

function _int(num){
    num = parseInt(num, 10);
    if(isNaN(num)) return 0;
    return num;
}

function _parse_style(style,m){
    var _HIDE_RE_COMPILE=/\.hide(-(\w+))+/ig,_HIDE_RE_COMPILE_MATCH=/-(\w+)/ig;
    style = (typeof style !== 'undefined')?style:'';
    m = (typeof m !== 'undefined')?m:'hide';
    if(m=='hide'&&style.indexOf('.hide-')!= -1){
        if(_HIDE_RE_COMPILE.test(style)) return _HIDE_RE_COMPILE_MATCH.exec(style);
    }
    return [];
}

function _hex2rgb(color,opacity,style){
    opacity = (typeof opacity !== 'undefined')?opacity:null;
    style = (typeof style !== 'undefined')?style:'';
    if(!isEmpty(color)){
        color=(color?color:'000000')+'';
        color = color.replace('#', '');
        opacity=isEmpty(opacity)?1:_int(opacity)/100;

        if(opacity<= 0) return 'rgba(0,0,0,0)';

        if(color.length == 3){
            return 'rgba({r},{g},{b},{a})'.Compile({r:color[0],g:color[1],b:color[2],a:opacity.toFixed(3)})
        }
        if(color.length == 4) {
            return 'rgba({r},{g},{b},{a})'.Compile({r:color[0],g:color[1],b:color[2],a:(parseInt(color[3]+color[3], 16) / 255).toFixed(3)}
        )
        }
        if(color.length == 6){
            return 'rgba({r},{g},{b},{a})'.Compile({r:parseInt(color.substr(0,2),16),g:parseInt(color.substr(2,2),16),b:parseInt(color.substr(4,2),16),a:opacity.toFixed(3)})
        }
        if(color.length == 8){
            return 'rgba({r},{g},{b},{a})'.Compile({r:parseInt(color.substr(0,2),16),g:parseInt(color.substr(2,2),16),b:parseInt(color.substr(4,2),16),a:(parseInt(color.substr(4,2),16)/255).toFixed(3)})
        }
    }
    return 'rgba(0,0,0,0)';
}

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
        if(color.startsWith('#')) return color;
        if(isNaN(parseInt(color, 16))) return color;
        if(!color.startsWith('#')) return '#'+color;

        return color
    }
    return ''
}

function _check_image(link, w, h){
    if(link){
        if(link.indexOf('.fotoee.com') != -1) link=link.replace(/(upload\.statics|instabio\.cdn)\.fotoee\.com/, 'bio.linkcdn.cc');
        if(link.indexOf('bio.linkcdn.to') != -1) link=link.replace(/bio\.linkcdn\.cc/, 'bio.linkcdn.cc');
        if(link.indexOf('bio.linkcdn.cc') != -1) link = link.split('?')[0];
        if(!link.startsWith('http')) link = _IMAGE_DOMAIN + link;

        if(link.indexOf('bio.linkcdn.cc') != -1&&(w||h)){
            return link + '?imageView2/2'+(w?'/w/'+w:'')+(h?'/h/'+'h':'');
        }
    }
    return (link||'');
}
var ThemeConfigLayout = function (data) {
    var _value = data || {};
    this.block = _value.block||{};
    this.colors = _value.colors||{};
    this.thumbnail = _value.thumbnail||{};
    this.button = _value.button||{};

    this._fields = ['block', 'colors', 'thumbnail','button'];
};
ThemeConfigLayout.prototype = {

    as_css: function () {
        var _layout = BIO_Theme_2_CSS_Layout, _this = this;
        var _css_list = [], _css_var_list = [];
        try {
            var x = 'block',_x_dict,btnStyle=false,btnColor=false,tbmCss=false;
            if (_this.block && _layout[x]) {
                _x_dict = _layout[x];
                btnStyle=true;
                if(!isEmpty(_this.block.style)) _css_list.push(_x_dict[_this.block.style]);
                if(!isEmpty(_this.block.corner)) _css_var_list.push(_x_dict.corner.Format(_this.block.corner));
                if(!isEmpty(_this.block.border)) _css_var_list.push(_x_dict.border.Format(_this.block.border));
            }
            x='colors';
            if(_this.colors&&_layout[x]){
                _x_dict = _layout[x];
                btnColor=true;
                if(!isEmpty(_this.colors.background)) _css_var_list.push(_x_dict.background.Format(_hex2rgb(_this.colors.background,_this.colors.opacity)));
                if(!isEmpty(_this.colors.text)){
                    _css_var_list.push(_x_dict.text.Format(_format_color(_this.colors.text)));
                    _css_list.push('.item .btn,.item .btn .btn-text, .item .btn-text .link-text{color:var(--link-block-font-color)!important;}');
                }
                if(!isEmpty(_this.colors.shadow)) _css_var_list.push(_x_dict.shadow.Format(_format_color(_this.colors.shadow)));
                if(!isEmpty(_this.colors.border)) _css_var_list.push(_x_dict.border.Format(_format_color(_this.colors.border)));
            }
            x='thumbnail';
            if (_this.thumbnail && _layout[x]) {
                _x_dict = _layout[x];
                tbmCss=true;
                if(!isEmpty(_this.thumbnail.style)) _css_list.push(_x_dict.style[_this.thumbnail.style]);
                if(!isEmpty(_this.thumbnail.radius)) _css_var_list.push(_x_dict.radius[_this.thumbnail.radius]);
                if(!isEmpty(_this.thumbnail.color)) _css_var_list.push(_x_dict.color.Format(_format_color(_this.thumbnail.color)));
            }
            x='button';
            if(_this.button&&_layout[x]){
                _x_dict = _layout[x];
                if(!isEmpty(_this.button.backgroundColor)) _css_var_list.push(_x_dict.backgroundColor.Format(_format_color(_this.button.backgroundColor)));
                if(!isEmpty(_this.button.textColor)) _css_var_list.push(_x_dict.textColor.Format(_format_color(_this.button.textColor)));
            }
        } catch (e) {
        }
        return [_css_list, _css_var_list,btnStyle,btnColor,tbmCss];
    },
};
var ThemeConfigOther=function (data) {
    var _value = data || {};
    this.profile = _value.profile||{};
    this.social = _value.social||{};
    this.divider = _value.divider||{};
    this.headline = _value.headline||{};
    this.pcLayout = _value.pcLayout||{};

    this._fields = ['profile','social','divider','headline'];
};
ThemeConfigOther.prototype = {

    as_css: function () {
        var _other = BIO_Theme_2_CSS_Other, _this = this;
        var _css_list = [], _css_var_list = [];
        try {
            var x='profile',_x_dict;
            if (_this.profile && _other[x]) {
                _x_dict = _other[x];
                if(!isEmpty(_this.profile.style)) _css_list.push(_x_dict.style[_this.profile.style]);
                if(!isEmpty(_this.profile.size)) _css_list.push(_x_dict.size.Format(_this.profile.size));
                if(!isEmpty(_this.profile.border)) _css_list.push(_x_dict.border.Format(_this.profile.border));
                if(!isEmpty(_this.profile.corner)) _css_list.push(_x_dict.corner.Format(_this.profile.corner));
                if(!isEmpty(_this.profile.borderColor)) _css_list.push(_x_dict.borderColor.Format(_format_color(_this.profile.borderColor)));
            }
            x='social';
            if (_this.social && _other[x]) {
                _x_dict = _other[x];
                if(!isEmpty(_this.social.style)) _css_list.push(_x_dict.style[_this.social.style]);
                if(!isEmpty(_this.social.align)) _css_list.push(_x_dict.align[_this.social.align]);
                if(!isEmpty(_this.social.color)) _css_var_list.push(_x_dict.color.Format(_format_color(_this.social.color)));
            }
            x='divider';
            if (_this.divider && _other[x]) {
                _x_dict = _other[x];
                if(!isEmpty(_this.divider.style)) _css_list.push(_x_dict.style[_this.divider.style]);
                if(!isEmpty(_this.divider.align)) _css_list.push(_x_dict.align[_this.divider.align]);
                if(!isEmpty(_this.divider.width)) _css_list.push(_x_dict.width.Format(_this.divider.width));
                if(!isEmpty(_this.divider.thickness)) _css_var_list.push(_x_dict.thickness.Format(_this.divider.thickness));
            }
            x='headline';
            if (_this.headline && _other[x]) {
                _x_dict = _other[x];
                if(!isEmpty(_this.headline.style)) _css_list.push(_x_dict.style[_this.headline.style]);
            }
            if (_this.pcLayout&&_this.pcLayout.style=='horizontal'){
                d.querySelector('body').classList.add('pc-layout', 'layout--horizontal');
            }
        } catch (e) {
        }
        return [_css_list, _css_var_list];
    },
};
var ThemeConfigTheme = function (data) {

    var val = (data || {}).value||{};
    this.font = val.font;
    this.textColor = val.textColor;

    this._fields = ['font', 'textColor'];
};
ThemeConfigTheme.prototype = {

    as_css: function (textConf) {
        var _text = BIO_Theme_2_CSS_Text, _this = this;
        var _css_list = [];
        try {
            textConf=textConf||{};
            var x = 'font',xVal=_this.font;
            if(textConf.value&&(textConf.value[x]||textConf.value['font-family'])){
                if(isEmpty(xVal)) xVal=textConf.value[x]||textConf.value['font-family'];
            }
            let _font=_text.fontsAlias[xVal]||xVal;
            if (!isEmpty(xVal)){
                xVal = _text.fontsAlias[xVal]||xVal;
                _font=_font.replace(/ /g,'').toLowerCase();
                _font = _text.fonts[_font];
                _css_list.push(_text[x].Format(_font||xVal));
                _css_list.push(_text['font1'].Format(_font||xVal));
            }else if(mediapath){
                _font=_text.themeFonts[mediapath]||'';
                _font=_font.replace(/ /g,'').toLowerCase();
                _font = _text.fonts[_font];
            }
            if(_font){
                let scd=d.getElementById('scssc');
                let _link=d.createElement('link');
                _link.rel='stylesheet';
                _link.type='text/css';
                _link.href='https://fonts.googleapis.com/css2?family={0}&display=swap'.Format(_font);
                scd.parentNode.insertBefore(_link, scd);
            }

            x = 'textColor';xVal=_this.textColor;

            if(isEmpty(xVal)&&textConf.value) xVal=textConf.value.color;

            if(!isEmpty(xVal)) _css_list.push(_text['color1'].Format(_format_color(xVal)));
        } catch (e) {
        }
        return [_css_list, []]
    },
};

var ThemeConfig=function(data, image){
    this.modules = [];
    this.text=null;
    this.button=null;
    this.thumbnail=null;
    this.theme=null;
    this.layout=null;
    this.other=null;
    var _this=this;
    image = (typeof image !== 'undefined')?image:'';
    (data||[]).forEach(function(x,idx) {
        if(x.template){
            if(x.module == 'bgImg') _this.modules.push(new ThemeConfigBackground(x.template, image));

            else if(x.module == 'pageBg') _this.modules.push(new ThemeConfigPageBg(x.template));

            else if(x.module == 'theme'&&x.template.value) _this.theme = new ThemeConfigTheme(x.template);

            else if(x.module == 'layout') _this.layout = new ThemeConfigLayout(x.template);

            else if(x.module == 'other') _this.other = new ThemeConfigOther(x.template);

            else if(x.module == 'button'&&(x.template||{}).key=='buttonIcon'){

                if(__data.bio.part==1){
                    _this.button = new ThemeConfigButton(x.template);
                }else{
                    _this.modules.push(new ThemeConfigButton(x.template));
                }

            }else if(x.module == 'thumbnail') {

                if(__data.bio.part==1){
                    _this.thumbnail=new ThemeConfigThumbnail(x.template);
                }else{
                    _this.modules.push(new ThemeConfigThumbnail(x.template));
                }
            }else if(x.module == 'social') _this.modules.push(new ThemeConfigMedia(x.template));

            else if(x.module == 'textFont'||x.module == 'buttonFont') {

                if(__data.bio.part==1) _this.text = new ThemeConfigText(x.template);
                else _this.modules.push(new ThemeConfigText(x.template));

            }else if(x.module == 'style') _this.modules.push(new ThemeConfigStyle(x.template));

            else _this.modules.push(new ThemeConfigBasic(x.template, x.module));
        }
    });

    this._fields = ['text', 'button', 'background', 'page'];

};
ThemeConfig.prototype={

    as_css:function () {
        var _css_list = [], _css_var_list=['body{'];

        this.modules.forEach(function (x,idx) {
            var x_ret = x.as_css();
            _css_list=_css_list.concat(x_ret[0]);
            _css_var_list=_css_var_list.concat(x_ret[1]);
        });
        var x_ret=[];
        if(this.theme){
            x_ret = this.theme.as_css(this.text);
            _css_list=_css_list.concat(x_ret[0]);
            _css_var_list=_css_var_list.concat(x_ret[1]);
        }else if(this.text){
            x_ret = this.text.as_css();
            _css_list=_css_list.concat(x_ret[0]);
            _css_var_list=_css_var_list.concat(x_ret[1]);
        }
        if(this.layout){
            x_ret = this.layout.as_css();
            _css_list=_css_list.concat(x_ret[0]);
            _css_var_list=_css_var_list.concat(x_ret[1]);
            var btnStyle=x_ret[2],btnColor=x_ret[3],tbmCss=x_ret[4];
            if(!btnStyle||!btnColor){
                if(this.button){
                    x_ret = this.button.as_css(btnStyle,btnColor);
                    _css_list=_css_list.concat(x_ret[0]);
                    _css_var_list=_css_var_list.concat(x_ret[1]);
                }
            }
            if(!tbmCss&&this.thumbnail){
                x_ret = this.thumbnail.as_css();
                _css_list=_css_list.concat(x_ret[0]);
                _css_var_list=_css_var_list.concat(x_ret[1]);
            }
        }else{
             if(this.button){
                 x_ret = this.button.as_css();
                 _css_list=_css_list.concat(x_ret[0]);
                 _css_var_list=_css_var_list.concat(x_ret[1]);
             }
             if(this.thumbnail){
                 x_ret = this.thumbnail.as_css();
                 _css_list=_css_list.concat(x_ret[0]);
                 _css_var_list=_css_var_list.concat(x_ret[1]);
             }
        }
        if(this.other){
            x_ret = this.other.as_css();
            _css_list=_css_list.concat(x_ret[0]);
            _css_var_list=_css_var_list.concat(x_ret[1]);
        }
        _css_var_list.push('}');
        return _css_var_list.join('\n') + _css_list.join('\n');
    },
};
var ThemeConfigBasic=function (data, m){
    this.module = m;
    this.key = data.key;
    this.value = data.value||{};

    this._fields=['key', 'opacity', 'blur', 'image'];

};
ThemeConfigBasic.prototype={

    as_css:function () {
        var _css_list=[],_css_var_list=[],_this=this;
        try{
            _css_list.push('{0}{'.Format(BIO_ALIAS_2_CSS[_this.module]));
            var _tem_css = [];
            Object.keys(_this.value).forEach(function (k,idx) {
                var v=_this.value[k];
                if(!isEmpty(v)&&!_this._fields.includes(k)){

                    if(k=='color'&&_this.module=='button'){
                        _tem_css.push('{0}{'.Format(BIO_ALIAS_2_CSS.link));
                        _tem_css.push("{0}:{1};".Format(k, v));
                        _tem_css.push('}');
                    }
                    if(k == 'link-color' && _this.module == 'button'){
                        _tem_css.push('{0}{'.Format(BIO_ALIAS_2_CSS[k]));
                        _tem_css.push("{0}: {1};".Format('color', v));
                        _tem_css.push('}')
                    }
                    if(k == 'border-radius' && _this.module == 'button'){
                        v = v||'';
                        if(v.indexOf('!important') < 0) v=v+'!important';
                    }
                    if(k.indexOf('Font') != -1 || k.indexOf('font-family') != -1){
                        _css_list.push("{0}: '{1}';".Format(k, v))
                    }else{
                        _css_list.push("{0}: {1};".Format(k, v))
                    }
                }
            });
            if(_tem_css.length==0&&_css_list.length==1){
                _css_list=[];
            }else{
                _css_list.push('}');
                _css_list=_css_list.concat(_tem_css);
            }
        }catch(e){
        }
        return [_css_list, _css_var_list];
    },
};
var ThemeConfigBackground=function (data, image){
    this._keys = ['bgImgColor', 'bgImgGradient', 'bgImgCtm', 'bgImgDefault', 'bgImgVideo'];
    this.image = image||'';
    this.key = data.key;

    if(this.key && this._keys.includes(this.key)) this.module=data.value||{};

    this._fields=['key', 'module'];
};
ThemeConfigBackground.prototype={

    as_css:function (){

        if(this.key=='bgImgColor'){
            return this.color_css();
        }else if(this.key=='bgImgGradient'){
            return this.gradient_css();
        }else if(this.key=='bgImgCtm'){
            return this.image_css();
        }else if(this.key=='bgImgDefault'){
            return this.image_css();
        }else if(this.key=='bgImgVideo'){
            return this.video_css();
        }

        return [[],[]];
    },
    color_css:function () {
        var _background = BIO_Theme_2_CSS_Background,_this=this;
        var _css_list = [], _css_var_list=[];
        try{
            if(_this.module.color) _css_list.push(_background.color.Format(_format_color(_this.module.color)));
        }catch (e) {
        }
        return [_css_list, _css_var_list];
    },
    gradient_css:function () {
        var _background = BIO_Theme_2_CSS_Background,_this=this.module;
        var _css_list = [], _css_var_list=[];
        try{
            if (!isEmpty(_this.direction) && !isEmpty(_this.color1) && !isEmpty(_this.color2)) {
                //.bg div{background-image:linear-gradient(var(--link-background-gradient-style), #EF629F, #EECDA3)}.bg video{display:none}
                //.bg div{background-image:radial-gradient(#EF629F, #EECDA3 80%)}.bg video{display:none}
                var _css = '.bg div{background-image:linear-gradient(var(--link-background-gradient-style), {0}, {1}{2})}.bg video{display:none}';
                if (isNaN(_this.direction)) {
                    if (_background.gradient[_this.direction]) {
                        _css_var_list.push(_background.gradient[_this.direction] || '');
                        _css_list.push(_css.Format(_format_color(_this.color1), _format_color(_this.color2), _this.color3 ? ',' + _format_color(_this.color3) : ''))
                    } else {
                        if (_this.direction == 'outIn') {
                            _css = '.bg div{background-image:radial-gradient({3}{2}{1}, {0})}.bg video{display:none}';
                            _css_list.push(_css.Format(_format_color(_this.color1)+(_this.color3?'':' 80%'), _format_color(_this.color2), _this.color3 ? _format_color(_this.color3)+',' : '',_this.color3?'circle,':''))
                        } else {
                            _css = '.bg div{background-image:radial-gradient({3}{0}, {1}{2})}.bg video{display:none}';
                            _css_list.push(_css.Format(_format_color(_this.color1), _format_color(_this.color2), _this.color3 ? ',' + _format_color(_this.color3) : ' 80%',_this.color3?'circle,':''))
                        }
                    }
                } else {
                    _css_var_list.push('--link-background-gradient-style:{0}deg;'.Format(_this.direction));
                    _css_list.push(_css.Format(_format_color(_this.color1), _format_color(_this.color2), _this.color3 ? ',' + _format_color(_this.color3) : ''))
                }

            }else{
                if(_this.style) _css_var_list.push(_background.gradient[_this.style]||'');
                if(_this.gradient) _css_list.push(_background.gradient[_this.gradient] || '')
            }

        }catch (e) {
        }
        return [_css_list, _css_var_list];
    },
    image_css:function () {
        var _background = BIO_Theme_2_CSS_Background,_this=this;
        var _css_list = [], _css_var_list=[];
        try {
            if(_this.module.image) _css_list.push(_background.image.style[_this.module.style||'default'].Format(_check_image(_this.module.image)));
            if(!isEmpty(_this.module.blur)) _css_var_list.push(_background.image.blur.Format(_int(_this.module.blur)))
            if(!isEmpty(_this.module.opacity)) _css_var_list.push(_background.image.opacity.Format(_int(_this.module.opacity)/100))
        }catch (e) {
        }
        return [_css_list, _css_var_list];
    },
    video_css:function () {
        var _background = BIO_Theme_2_CSS_Background,_this=this;
        var _css_list = [], _css_var_list=[];
        try {
            if(_this.module.videoImage||_this.module.link) _css_list.push(_background.video.coverr.Format(_check_image(_this.module.videoImage)));
            if(_this.module.link){
                d.querySelector('.bg-container .bg div').innerHTML='<video autoplay="" playsinline="" loop="" muted="" poster="{0}" src="{1}"><source src="{1}" type="video/mp4"></video>'.Format(_check_image(_this.module.videoImage||_this.module.image),_check_image(_this.module.link))
            }
        }catch (e) {
        }
        return [_css_list, _css_var_list];
    }
};
var ThemeConfigPageBg=function (data){

    this._keys = ['pageBgColor', 'pageBgGradient'];

    this.key = data.key;

    if(this.key && this._keys.includes(this.key)) this.module = data.value||{};
};
ThemeConfigPageBg.prototype={

    as_css:function () {
        if(this.key=='pageBgColor'){
            return this.color_css();
        }else if(this.key=='pageBgGradient'){
            return this.gradient_css();
        }

        return [[],[]];
    },
    _common_css:function (css_list,css_var_list) {
        var _background = BIO_Theme_2_CSS_PageBg,_this=this;
        css_list=css_list||[];
        css_var_list=css_var_list||[];
        try{
            var corner=parseInt(_this.module.corner,10),opacity=parseFloat(_this.module.opacity)/100;
            if(!(isNaN(corner)&&isNaN(opacity))) css_list.push(_background.common.Format(isNaN(corner)?'':corner,isNaN(opacity)?'':opacity));
        }catch (e) {
        }
        return [css_list, css_var_list];
    },
    color_css:function () {
        var _background = BIO_Theme_2_CSS_PageBg,_this=this;
        var _css_list = [], _css_var_list=[];
        try{
            if(_this.module.color) _css_list.push(_background.color.Format(_format_color(_this.module.color)));
            return _this._common_css(_css_list,_css_var_list);
        }catch (e) {
        }
        return [_css_list, _css_var_list];
    },
    gradient_css:function () {
        var _background = BIO_Theme_2_CSS_PageBg,_this=this.module;
        var _css_list = [], _css_var_list=[];
        try{
            if (!isEmpty(_this.direction) && !isEmpty(_this.color1) && !isEmpty(_this.color2)) {
                var _css = 'section .section-bg{background-image:linear-gradient(var(--link-page-bg-gradient-style), {0}, {1}{2})}.bg video{display:none}';
                if (isNaN(_this.direction)) {
                    if (_background.gradient[_this.direction]) {
                        _css_var_list.push(_background.gradient[_this.direction] || '');
                        _css_list.push(_css.Format(_format_color(_this.color1), _format_color(_this.color2), _this.color3 ? ',' + _format_color(_this.color3) : ''))
                    } else {
                        if (_this.direction == 'outIn') {
                            _css = 'section .section-bg{background-image:radial-gradient({3}{2}{1}, {0})}.bg video{display:none}';
                            _css_list.push(_css.Format(_format_color(_this.color1)+(_this.color3?'':' 80%'), _format_color(_this.color2), _this.color3 ? _format_color(_this.color3)+',' : '',_this.color3?'circle,':''))
                        } else {
                            _css = 'section .section-bg{background-image:radial-gradient({3}{0}, {1}{2})}.bg video{display:none}';
                            _css_list.push(_css.Format(_format_color(_this.color1), _format_color(_this.color2), _this.color3 ? ',' + _format_color(_this.color3) : ' 80%',_this.color3?'circle,':''))
                        }
                    }
                } else {
                    _css_var_list.push('--link-page-bg-gradient-style:{0}deg;'.Format(_this.direction));
                    _css_list.push(_css.Format(_format_color(_this.color1), _format_color(_this.color2), _this.color3 ? ',' + _format_color(_this.color3) : ''))
                }
            }else{
                if(_this.style) _css_var_list.push(_background.gradient[_this.style]||'');
                if(_this.gradient) _css_list.push(_background.gradient[_this.gradient] || '');
            }
            // var corner=parseInt(_this.corner,10),opacity=parseFloat(_this.opacity)/100;
            // if(!(isNaN(corner)&&isNaN(opacity))) _css_list.push(_background.common.Format(isNaN(corner)?'':corner,isNaN(opacity)?'':opacity));
            return this._common_css(_css_list,_css_var_list);
        }catch (e) {
        }
        return [_css_list, _css_var_list];
    }
};
var ThemeConfigButton=function (data){
    this.key = data.key;
    this.value = data.value || {};

    this._fields=['key', 'buttonStyle', 'iconStyle', 'text_color', 'color', 'opacity'];
};
ThemeConfigButton.prototype={

    as_css:function () {
        var _button = BIO_Theme_2_CSS_Button,_this=this;
        var _css_list = [], _css_var_list=[];
        try{
            ['buttonStyle', 'iconStyle'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _button[x];
                    _css_list.push(_x_dict[_this.value[x]])
                }
            });
            var _ver=(__data.ui.version||'3.0.0').replace(/v/i, '');
            ['color'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _button[x];
                    if(parseFloat(_ver)>=3.3){
                        _css_var_list.push(_x_dict.Format(_hex2rgb(_this.value[x], _this.value.opacity)))
                    }else{
                        _css_var_list.push(_x_dict.Format(_hex2rgb(_this.value[x])))
                    }
                }
            });
            ['text_color'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _button[x];
                    _css_list.push(_x_dict.Format(_format_color(_this.value[x])))
                }
            });
            ['color1'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _button[x];
                    _css_var_list.push(_x_dict.Format(_format_color(_this.value[x])))
                }
            });

        }catch (e) {
        }

        return [_css_list, _css_var_list];
    },
};
var ThemeConfigThumbnail=function (data){
    this.key = data.key;
    var _value = data.value || {};
    this.style = _value.style;
    this.radius = _value.radius;
    this.color = _format_color(_value.color);

    this._fields=['key', 'style', 'radius', 'color'];
};
ThemeConfigThumbnail.prototype={

    as_css:function () {
        var _thumbnail = BIO_Theme_2_CSS_Thumbnail,_this=this;
        var _css_list = [], _css_var_list=[];
        try{
            ['style', 'radius'].forEach(function (x,idx) {
                if(_this[x] && _thumbnail[x]){
                    var _x_dict = _thumbnail[x];
                    _css_list.push(_x_dict[_this[x]])
                }
            });
            var _x = 'color';
            if(_this[_x] && _thumbnail[_x]){
                var _x_dict = _thumbnail[_x];
                _css_var_list.push(_x_dict.Format(_this[_x]));
            }
        }catch (e) {
        }
        return [_css_list, _css_var_list];
    },
};
var ThemeConfigMedia=function (data){

    this.key = data.key;
    var _value = data.value || {};
    this.style = _value.style;
    this.radius = _value.radius;
    this.color = _format_color(_value.color);

    this._fields=['key', 'style', 'radius', 'color'];
};
ThemeConfigMedia.prototype={

    as_css:function () {
        var _social = Theme_2_CSS_Social,_this=this;
        var _css_list = [], _css_var_list=[];
        try{
            ['style', 'radius'].forEach(function (x,idx) {
                if(_this[x] && _social[x]){
                    var _x_dict = _social[x];
                    _css_list.push(_x_dict[_this[x]])
                }
            });
            var _x = 'color';
            if(_this[_x] && _social[_x]){
                var _x_dict = _social[_x];
                _css_var_list.push(_x_dict.Format(_this[_x]));
            }
        }catch (e) {
        }
        return [_css_list, _css_var_list];
    },
};
var ThemeConfigText=function (data){

    this.key = data.key;
    var _val = data.value || {};
    this.value = data.value || {};
    this.font = _val.font;
    Object.defineProperty(this, 'font-family', {
        value : _val['font-family'],
        writable : true,
        enumerable : true,
        configurable : true
    });
    this.color = _format_color(_val.color);

    this._fields=['key', 'value'];
};
ThemeConfigText.prototype={

    as_css:function () {
        var _text = BIO_Theme_2_CSS_Text,_this=this;
        var _css_list = [];
        try{
            ['font', 'font-family', "color"].forEach(function (x, idx) {
                if(_this.hasOwnProperty(x)&&_this[x]){
                    _css_list.push(_text[x].Format(_this[x]))
                }
            });
        }catch(e){
        }
        return [_css_list, []]
    },
};
var ThemeConfigStyle=function (data){

    this.key = data.key;
    var _val = data.value || {};
    this.value = _val;
    this.align = _val.align;
    this.spacing = _val.spacing;

    this._fields=['align', 'spacing'];
};
ThemeConfigStyle.prototype={

    as_css:function () {
        var _style = Theme_2_CSS_Style,_this=this;
        var _css_list = [];
        try{
            ['align', "spacing"].forEach(function (x, idx) {
                if(_this.hasOwnProperty(x)&&!isEmpty(_this[x])){
                    _css_list.push(_style[x].Format(_this[x]))
                }
            });
        }catch(e){
        }
        return [_css_list, []]
    },
};
(function () {
    var _pathLink=document.querySelector('link[data-path]');
    var _path=_pathLink?_pathLink.dataset.path:'';
    if(_path.startsWith('animate_')){
        var js, fjs = d.getElementsByTagName('script')[0];
        js = d.createElement('script');
        js.async=!0;
        js.src = 'https://bio.linkcdn.cc/instabio.cc/static/js/'+_path+'.js?t=1687229039583';
        fjs.parentNode.insertBefore(js, fjs);
    }
    try{
        var _theme_config=new ThemeConfig(__theme||[]);
        var _style=d.createElement('style');
        _style.type='text/css';
        d.querySelector('head').appendChild(_style);
        _style.innerHTML=_theme_config.as_css();
    }catch(e){
    }
    _pathLink.media='all';
})();
var Lfy_Form_Theme_Style={
style:{border:`{cssid} .form-cust .form-control input,{cssid} .form-cust .form-control select,{cssid} .form-cust .form-control textarea,{cssid} .form-cust .form-field-phone .dial-code,{cssid} .form-cust .form-control .form-field-file-upload{border:2px solid var(--form-style-color);background:transparent;}`,
    background:`{cssid} .form-cust .form-control input,{cssid} .form-cust .form-control select,{cssid} .form-cust .form-control textarea,{cssid} .form-cust .form-field-phone .dial-code,{cssid} .form-cust .form-control .form-field-file-upload{border:2px solid transparent;background:var(--form-style-color);}`,
    underline:`{cssid} .form-cust .form-control input,{cssid} .form-cust .form-control select,{cssid} .form-cust .form-control textarea,{cssid} .form-cust .form-field-phone .dial-code,{cssid} .form-cust .form-control .form-field-file-upload{border:2px solid transparent;background:transparent;border-bottom:2px solid var(--form-style-color);border-right:0;border-left:0;border-radius:0;}
        {cssid} .form-cust .form-field-phone .dial-code{border-left:0;border-radius:0;}`,
},
color:`--form-style-color:{0};`,
corner:`{1} .form-cust .form-control input,{1} .form-cust .form-control select,{1} .form-cust .form-control textarea,{1} .form-cust .form-button button,{1} .form-cust .form-control .form-field-file-upload{border-radius:{0}px}
    {1} .form-cust .form-field-phone .dial-code{border-top-left-radius:{0}px;border-bottom-left-radius:{0}px;}`,
},Lfy_Form_Theme_Background={
    color:'--form-bg-color:{0};',
    corner:'{1} .form-cust{border-radius:{0}px}',
},Lfy_Form_Theme_Text={
    font:'--form-tmpl-font:{0};',
    color:`--form-text-color:{0};`,
    color1:`--form-title-color:{0};`,
},Lfy_Form_Theme_Submit={
    style:{border:`{cssid} .form-cust .form-button button{background:transparent;border:2px solid var(--form-submit-color);}`,
        background:`{cssid} .form-cust .form-button button{background:var(--form-submit-color);border:2px solid transparent;}`,
    },
    color:`--form-submit-color:{0};`,
    color1:`--form-submit-font-color:{0};`,
    corner:`{0} .form-cust .form-button button{border-radius:{1}px}`,
};
window.FormThemeConfig=function(data,eleId) {
    this.configs=[];
    this.eleId=eleId?('#'+eleId):'';
    var _this=this;
    if(data){
        if(!Array.isArray(data)){
            data=[data];
        }
        data.forEach(function (item,idx) {
            if(item.module) item = item.template;
            if(item.key=='style') _this.configs.push(new FormThemeConfigStyle(item.value));
            if(item.key=='background') _this.configs.push(new FormThemeConfigBackground(item.value));
            if(item.key=='text') _this.configs.push(new FormThemeConfigText(item.value));
            if(item.key=='submit') _this.configs.push(new FormThemeConfigSubmit(item.value));
        });
    }
    this._fields = ['style', 'background', 'text', 'submit'];
    this._cssDom=d.querySelector('#style-form-tmpl');
    if(!this._cssDom){
        this._cssDom=document.createElement('style');
        this._cssDom.id='style-form-tmpl';
        document.head.appendChild(this._cssDom);
    }
};
FormThemeConfig.prototype={

    as_css:function () {
        var _css_list = [], _css_var_list=['body {0}{'.Format(this.eleId)],_this=this;

        _this.configs.forEach(function (x,idx) {
            var x_ret = x.as_css(_this.eleId);
            _css_list=_css_list.concat(x_ret[0]);
            _css_var_list=_css_var_list.concat(x_ret[1]);
        });
        _css_var_list.push('}');
        _this._cssDom.innerHTML+=_css_list.join('\n');
        _this._cssDom.innerHTML+=_css_var_list.join('\n');
    },
};
var FormThemeConfigStyle=function (data){
    this.value = data || {};
    this._fields=['style', 'color', 'corner'];
};
FormThemeConfigStyle.prototype={

    as_css:function (eleId) {
        var _style = Lfy_Form_Theme_Style,_this=this;
        var _css_list = [], _css_var_list=[];
        try{
            ['corner'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _style[x];
                    _css_list.push(_x_dict.Format(_this.value[x],eleId));
                }
            });
            ['style'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _style[x];
                    _css_list.push(_x_dict[_this.value[x]].Compile({cssid:eleId}))
                }
            });
            ['color'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _style[x];
                    _css_var_list.push(_x_dict.Format(_format_color(_this.value[x])))
                }
            });
        }catch (e) {
        }
        return [_css_list, _css_var_list];
    },
};
var FormThemeConfigBackground=function (data){
    this.value = data || {};
    this._fields=['color', 'opacity', 'corner'];
};
FormThemeConfigBackground.prototype={

    as_css:function (eleId){
        var _bg = Lfy_Form_Theme_Background,_this=this;
        var _css_list = [], _css_var_list=[];
        ['corner'].forEach(function (x,idx) {
            if(!isEmpty(_this.value[x])){
                var _x_dict = _bg[x];
                _css_list.push(_x_dict.Format(_this.value[x],eleId));
            }
        });
        var x = 'color';
        if(!isEmpty(_this.value[x])){
            var _x_dict = _bg[x];
            _css_var_list.push(_x_dict.Format(_hex2rgb(_this.value[x], _this.value.opacity)))
        }
        return [_css_list, _css_var_list];
    }
};
var FormThemeConfigText=function (data) {
    this.value = data || {};
    this._fields=['font', 'color', 'color1'];
};
FormThemeConfigText.prototype={
    as_css:function (eleId) {
        var _text = Lfy_Form_Theme_Text,_this=this;
        var _css_list = [], _css_var_list=[];
        try{
            ['font'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _text[x];
                    _css_var_list.push(_x_dict.Format(_this.value[x]))
                }
            });
            ['color', 'color1'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _text[x];
                    _css_var_list.push(_x_dict.Format(_format_color(_this.value[x])))
                }
            });
        }catch (e) {
        }

        return [_css_list, _css_var_list];
    },
};
var FormThemeConfigSubmit=function (data){

    this.value = data || {};
    this._fields=['style', 'color', 'color1'];
};
FormThemeConfigSubmit.prototype={

    as_css:function (eleId) {
        var _button = Lfy_Form_Theme_Submit,_this=this;
        var _css_list = [], _css_var_list=[];
        try{
            ['style'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _button[x];
                    _css_list.push(_x_dict[_this.value[x]].Compile({cssid:eleId}))
                }
            });
            ['color', 'color1'].forEach(function (x,idx) {
                if(!isEmpty(_this.value[x])){
                    var _x_dict = _button[x];
                    _css_var_list.push(_x_dict.Format(_format_color(_this.value[x])))
                }
            });
            var _v='corner';
            if(!isEmpty(_this.value[_v])){
                _css_list.push(_button[_v].Format(eleId,_this.value[_v]));
            }
        }catch (e) {
        }
        return [_css_list, _css_var_list];
    },
};
}(document));
var _podcast_links=[{platform:'googlePodcasts',title:'Google Podcasts'},{platform:'shopify', title: 'Shopify'},{platform:'applePodcasts',title:'Apple Podcasts'},
{platform: 'stitcher', title: 'Stitcher'},{platform: 'castbox', title: 'Castbox'},{platform: 'rss', title: 'RSS'},{platform: 'pocketCasts', title: 'Pocket Casts'},
{platform: 'overcast', title: 'Overcast'},{platform: 'bullhorn', title: 'Bullhorn'},{platform: 'castro', title: 'Castro'},{platform: 'playerFm', title: 'Player FM'},
{platform: 'spotify', title: 'Spotify'},
];
(function(d, s) {
    var v = function(a, b, t) {
        t=t||d;
        t.addEventListener ? t.addEventListener(a, b, !1) : t.attachEvent && t.attachEvent("on" + a, b)
    };
    function lbasejs(e){
        return new Promise((function(t) {
            (function n(){
                var r = e.checkLink;
                "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
            }())
        }))
    }
    function lglrpjs(e) {
        return new Promise((function(t) {
            (function n(){
                var r = (e.grecaptcha||{}).render;
                "undefined" === typeof r ? e.requestAnimationFrame(n) : (t(e))
            }())
        }))
    }
    function onloadCallback(eleId) {
        var html_element='html_element';
        if(eleId) html_element+= '_'+eleId;
        var opt_widget_id = grecaptcha.render(html_element, {
            'sitekey' : '6LcifCQfAAAAAAmVOIvuKi4OZxl3EnYlH-4XMT73',
            'callback' : onSubmit,
        });
        d.querySelector('#'+html_element).dataset.opt_widget_id=opt_widget_id;
    }
    function _extend(dst, src){
        if (dst && src) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    dst[key] = src[key];
                }
            }
        }
        return dst;
    }
    function autoPage(num){
		var pg=1,limit=10,limitMin=7,limitMax=10,rem=0,ret=[];
		if(num > 14){
			rem=num%limit;
			pg=Math.ceil(num/limit);
			if(rem==0){
				for (var i = 0; i < pg; i++) {
				    ret.push(limit);
				}
			}else{
				for (var i = limitMax; i >= limitMin; i--) {
					rem=num%i;
					pg=Math.ceil(num/i);
					if(rem==0){
						for (var j = 0; j < pg; j++) {
							ret.push(i);
						}
						break;
					}
					if(pg+rem>i){
						for (var j = 0; j < pg ; j++) {
							ret.push(i-((pg-j)<=(i-rem)?1:0))
						}
						break;
					}else if(i==limitMin){
						rem=num%i;
						pg=Math.ceil(num/i);
						for (var j = 0; j < pg; j++) {
							ret.push(i+(j<rem&&rem!=0?1:0));
						}
						break;
					}
				}

			}
		}else{
			ret.push(num);
		}
		return ret;
	}
    function isBtnAction(l,t,st,l2) {
        st=isNaN(parseInt(st,10))?0:parseInt(st,10);
        t=t||1;
        l=(l||'').trim();
        if(t>=10&&t!=20) return true;
        // if(!l) return 'javascript:;';
        if(t==1&&((0<st&&st<4)||(4<st&&st<=19))) return true;
        if(st&&l2) return true;
        return false;
    }
    function CounterEvent(ele,startTimestamp,opts){
        this.ele=ele;
        this.startTimestamp=startTimestamp;
        this.opts=opts||{};
        if(opts.subtype.indexOf('cmpt-live-')>-1){
            this.opts._endMessage=gettext('The live stream has ended!')
        }else{ //event
            this.opts._endMessage=gettext('The event is over!')
        }
        this._interval=null;
        this._init();
    }
    CounterEvent.prototype={
        _init:function(){
            var _this=this;
            var _now=new Date().getTime();
            if(_this.opts.subtype=='cmpt-live-foreshow'&&_this.opts.schedule=='regular'){
                //scheduleDays, scheduleTime
                _this._scheduleState(_now, _this.opts.scheduleDays, _this.opts.scheduleTime);
            }else{
                if(_this.opts.subtype.startsWith('cmpt-event-')){
                    if(_this.opts.subtype=='cmpt-event-promote') return;
                    if(_this.opts.subtype=='cmpt-event-promoteCountdown'){
                        if(_now<_this.startTimestamp) {//coming
                            _this.ele.querySelector('.embed-event-box').classList.add('embed-event-state--coming');
                        }else if(_now<_this.opts.endTimestamp){//happening
                            _this.ele.querySelector('.embed-event-box').classList.add('embed-event-state--going');
                            _this.start();
                        }else{
                            _this.end();
                        }
                    }else{
                        if(_now<_this.startTimestamp) {//coming
                            if(_this.opts.subtype=='cmpt-event-countdown') _this.start();
                            _this.ele.querySelector('.embed-event-box').classList.add('embed-event-state--coming');
                        }else{ // end
                            _this.end();
                        }
                    }
                }else{
                    if(_now<_this.startTimestamp){//coming
                        // _this._update();
                        if(_this.opts.subtype=='cmpt-live-countdown') _this.start();

                    }else if(_now<_this.opts.endTimestamp){//live
                        _this.live();
                    }else{//end
                        _this.end();
                    }
                }
            }
        },
        _scheduleState:function (now,days,times){
            var _this=this;
            days=days.split(', ');
            times=times.replace('-', '~').split(' ~ ');
            function _checkState(n){
                var _scheduleDate=new Date(n);
                var _w=_scheduleDate.Format('W');
                var _idx=days.indexOf(_w);
                if(_idx>-1){
                    var _start=new Date(_scheduleDate.Format('yyyy/MM/dd')+' '+times[0] + ':00').getTime();
                    var _end=new Date(_scheduleDate.Format('yyyy/MM/dd')+' '+times[1] + ':00').getTime();
                    if(times[0] > times[1]) _end+=24*60*60*1000;
                    if(now<_start){
                    }else if(now<_end){
                        _this.live();
                    }else{
                        _this.end();
                    }
                }
                return _idx;
            }
            var _idx = _checkState(now);
            if(_idx>-1){
            }else if(times[0] > times[1]){
                // var _yesterday=new Date(now-24*60*60*1000).getTime();
                _checkState(now-24*60*60*1000);
            }
        },
        _update:function(){
            var _this=this;
            var _now=new Date().getTime();
            var days, hours, minutes, seconds,timeDiff;

            var calcTime=function (startTimestamp){
                timeDiff=parseInt((startTimestamp-_now)/1000);
                days = parseInt(timeDiff / 86400);
                hours = parseInt((timeDiff % 86400) / 3600);
                minutes = parseInt(((timeDiff % 86400) % 3600) / 60);
                seconds = parseInt(((timeDiff % 86400) % 3600) % 60);
                if(days>0){
                    _this.ele.querySelector('.embed-event-counter').classList.add('embed-event-counter--days');
                }else{
                    _this.ele.querySelector('.embed-event-counter').classList.remove('embed-event-counter--days');
                    _this.ele.querySelector('.embed-event-counter').classList.add('embed-event-counter--hours');
                }
                if(days<10) days='0'+days;
                if(hours<10) hours='0'+hours;
                if(minutes<10) minutes='0'+minutes;
                if(seconds<10) seconds='0'+seconds;
            }
            if(_now<_this.startTimestamp){
                calcTime(_this.startTimestamp);
            }else if(_this.opts.endTimestamp&&_now<_this.opts.endTimestamp){
                calcTime(_this.opts.endTimestamp);
            }else{
                days='00';
                hours='00';
                minutes='00';
                seconds='00';
                _this.live();
            }
            days=days.toString().split('');
            hours=hours.toString().split('');
            minutes=minutes.toString().split('');
            seconds=seconds.toString().split('');
            // days='<span>{0}</span><span>{1}</span>'.Format(days[0],days[1]);
            days = '<span>{0}</span><span>{1}</span>{2}{3}'.Format(days[0], days[1], days[2]!==undefined?'<span>{0}</span>'.Format(days[2]):'', days[3]!==undefined?'<span>{0}</span>'.Format(days[3]):'');
            hours='<span>{0}</span><span>{1}</span>'.Format(hours[0],hours[1]);
            minutes='<span>{0}</span><span>{1}</span>'.Format(minutes[0],minutes[1]);
            seconds='<span>{0}</span><span>{1}</span>'.Format(seconds[0],seconds[1]);

            _this.ele.querySelector('.embed-event-counter').innerHTML=getTmplInnerHtml('#cmpt-event-counter').Compile({days:days,hours:hours,minutes:minutes,seconds:seconds});
        },
        start:function (){
            var _this=this;
            _this._update();
            _this._interval=setInterval(function(){
                _this._update();
            },1000);
        },
        _counterReset0:function(){
            var hours='<span>0</span><span>0</span>',
            minutes='<span>0</span><span>0</span>',
            seconds='<span>0</span><span>0</span>';
            if(this.ele.querySelector('.embed-event-counter')){
                this.ele.querySelector('.embed-event-counter').innerHTML=getTmplInnerHtml('#cmpt-event-counter').Compile({hours:hours,minutes:minutes,seconds:seconds});
            }
        },
        live:function (){
            var _this=this;
            if(_this.opts.subtype.startsWith('cmpt-live-')){
                _this.ele.querySelector('.embed-event-box').classList.add('embed-live-state--live');
                if(_this.opts.subtype=='cmpt-live-foreshow'){
                    // _this.ele.querySelector('.embed-live-state').innerHTML=getTmplInnerHtml('#live-svg')+'<span>LIVE</span>';
                    _this.ele.querySelector('.embed-event-state').innerText=gettext('Happening now');
                }else{
                    _this._counterReset0();
                    _this.ele.querySelector('.embed-link-a-button').innerHTML=getTmplInnerHtml('#live-svg')+'<span>LIVE</span>';
                }
            }else{
                _this.end();
            }
            _this.stop();
        },
        end:function (){
            this.ele.querySelector('.embed-event-box').classList.remove('embed-event-state--coming');
            this.ele.querySelector('.embed-event-box').classList.remove('embed-event-state--going');
            this.ele.querySelector('.embed-event-box').classList.add('embed-event-state--end');
            this._counterReset0();
            if(this.opts.subtype=='cmpt-live-foreshow'){
                this.ele.querySelector('.embed-event-state').innerText=gettext('Live ended');
                return;
            }
            if(!this.opts.endAction||this.opts.endAction=='message'){
                var endDiv=d.createElement('div');
                endDiv.innerHTML='<h3 class="txt-ellipsis">{0}</h3>'.Format(this.opts.endMessage||this.opts._endMessage);
                endDiv.className='embed-event--tips';
                this.ele.querySelector('.embed-event-box').classList.add('embed-event-state--end-message');
                if(this.opts.subtype=='cmpt-event-promoteCountdown'){
                    this.ele.querySelector('.embed-event-body--ended').appendChild(endDiv);
                }else{
                    this.ele.querySelector('.embed-event-box').appendChild(endDiv);
                }
            }else if(this.opts.subtype=='cmpt-event-promoteCountdown'){
                this.ele.querySelector('.embed-event-box').classList.add('embed-event-state--end-nothing');
            }
        },
        stop:function (){
            var _this=this;
            if(this._interval) clearInterval(_this._interval);
        }
    };
    function scheduleLink(schedule,state) {
        schedule=JSON.parse(schedule||'{}');
        if(schedule.scheduled){
            var _n = new Date();
            let start = new Date(schedule.startTS||0), end = new Date(schedule.endTS||0);
            if(start&&start>_n) return false;
            if(schedule.endTS&&end<_n) return false;
            if(state==1) return true;
            return false;
        }else if(state==1){
            return true;
        }
        return false;
    }
    window.RenderBioCmpt=function(cmpts,orders,container,options) {
        this.cmpts=cmpts||{};
        this.orders=orders||[];
        if(container instanceof Node || container instanceof HTMLElement){
            this._content=container;
        }else{
            this._content=d.querySelector(container);
        }
        this.options=options||{};
        // this.imageWH=window.innerWidth>700?[600,600,800,800]:[320,320,600,600]; // pc mobile
        this.observer=null;
        this.mySwiper=null;
        this.observerSupport=!!window.IntersectionObserver;
        this._linkprev='//linkfly.to/check/';
        this.autoplay=true;
        this.reg = new RegExp("("+__sexywords.join('|')+")", 'gi');
        this._prods={ids:[],goods:null,goodsList:[]};
        var defaults={loadFlag:true,h_idx:0,from:''};
        // Set default options
        for (var name in defaults) {
            !(name in this.options) && (this.options[name] = defaults[name]);
        }
    };
    RenderBioCmpt.prototype={
        renderUI:function(){
            var _this=this;
            _this._content.innerHTML = '';
            Array.from(_this.orders).forEach(function (id,idx) {
                try {
                    var item = _this.cmpts.find(function (ele) {
                        return ele.id == id;
                    });
                    if(item) _this._renderBiolinkItem(item,idx)
                }catch (e) {console.error(e);}
            });
            _this._loadGoods(_this._prods.ids);
            _this._loadImages();
        },
        _loadImages:function (){
            if(!this.observer&&window.lozad) this.observer=lozad();
            if(!!this.observer) this.observer.observe();
        },
        _renderBiolinkItem:function (item,idx){
            var _this=this,_div=d.createElement('div');
            item.subtype=item.subtype||'';
            _this._content.appendChild(_div);
            _div.id = item.id;
            _div.dataset.idx = idx + '';
            _div.dataset.type = item.type;
            _div.dataset.subtype = item.subtype;
            switch (item.type) {
                case 10:
                    _div.className='biolink ' + item.subtype;
                    _this.linksUI(item.links,item,_div);
                    break;
                case 2:
                    _div.className='bio-social '+item.subtype;
                    _div.innerHTML=getTmplInnerHtml('#socialListTmpl');
                    _this.socialUI(item,_div);
                    break;
                case 3:
                    _div.className='bio-block bio-video';
                    _this.bioVideoUI(item,_div);
                    break;
                case 4:
                    _div.className='bio-block bio-gallery';
                    _this.bioGallery(item,_div);
                    break;
                case 9:
                    _div.className='bio-form';
                    _div.innerHTML=getTmplInnerHtml('#formItemTmpl').Format(location.pathname.substring(1),item.id);
                    _this.bioFormUI(item,_div);
                    break;
                case 11:
                    _div.className='bio-divider';
                    _this.bioDivider(item,_div);
                    break;
                case 13:
                    _div.className='bio-header';
                    _div.innerHTML='<div class="item-header"><h3><p>{0}</p></h3></div>'.Format(item.title);
                    break;
                case 14:
                    _div.className='bio-twitter';
                    _this.bioTweet(item,_div);
                    break;
                case 15:
                    _div.className='bio-pins';
                    _this.bioPin(item,_div);
                    break;
                case 16:
                    _div.className='bio-support';
                    _this.bioSupport(item,_div);
                    break;
                case 17:
                    _div.className='bio-ytb';
                    _this.bioYtbsub(item,_div);
                    break;
                case 18:
                    _div.className='bio-block bio-music';
                    _this.bioMusic(item,_div);
                    break;
                case 19:
                    _div.className='bio-graphic';
                    _this.bioGraphic(item,_div);
                    break;
                case 20:
                    _div.className='bio-carousel bio-carousel-service';
                    _this.bioCarousel(item,_div);
                    break;
                case 21:
                    _div.className='bio-carousel bio-carousel-video';
                    _this.bioCarouselVideo(item,_div);
                    break;
                case 22:
                    _div.className='bio-carousel bio-carousel-portfolio';
                    _this.bioCarousel(item,_div);
                    break;
                case 23:
                    _div.className='bio-tiktok';
                    _this.bioTikTok(item,_div);
                    break;
                case 24:
                    _div.className='bio-block bio-live';
                    _this.bioLive(item,_div);
                    break;
                case 25:
                    _div.className='bio-block bio-opensea';
                    _this.bioOpensea(item,_div);
                    break;
                case 26:
                    _div.className='bio-block bio-fbpage';
                    _this.bioFBPage(item,_div);
                    break;
                case 27:
                    _div.className='bio-block bio-event';
                    _this.bioEvent(item,_div);
                    break;
                case 28:
                    _div.className='bio-block bio-sfollower';
                    _this.bioSFollower(item,_div);
                    break;
                case 29:
                    _div.className='bio-block bio-wishlist';
                    _this.bioWishlist(item,_div);
                    break;
                case 30:
                    _div.className='bio-block bio-graphext';
                    _this.bioGraphext(item,_div);
                    break;
                case 31:
                    _div.className='bio-block bio-threads';
                    _this.bioThreads(item,_div);
                    break;
                case 32:
                    _div.className='bio-block bio-shop';
                    _this.bioShopTikTok(item,_div);
                    break;
                case 33:
                    _div.className='bio-block bio-goods';
                    _this.bioGoods(item,_div);
                    break;
                case 34:
                    _div.className='bio-block bio-spring';
                    _this.bioSpring(item,_div);
                    break;
                case 35:
                    _div.className='bio-block bio-txt';
                    _this.bioText(item,_div);
                    break;
                case 36:
                    _div.className='bio-block bio-ig';
                    _this.bioInstagram(item,_div);
                    break;
                case 37:
                    _div.className='bio-block bio-digital';
                    _this.bioDigital(item,_div);
                    break;
                case 38:
                    _div.className='bio-block bio-request';
                    _this.bioRequest(item,_div);
                    break;
                case 39:
                    _div.className='bio-block bio-podcast';
                    _this.bioPodcast(item,_div);
                    break;
                case 40:
                    _div.className='bio-block bio-provecho';
                    _this.bioProvecho(item,_div);
                    break;
                case 41:
                    _div.className='bio-block bio-bonfire';
                    _this.bioBonfire(item,_div);
                    break;
                case 42:
                    _div.className='bio-block bio-gofundme';
                    _this.bioGofundme(item,_div);
                    break;
                case 43:
                    _div.className='bio-block bio-qas';
                    _this.bioQAs(item,_div);
                    break;
                case 44:
                    _div.className='bio-block bio-ctmprod';
                    _this.bioCtmProd(item,_div);
                    break;
                case 45:
                    _div.className='bio-block bio-form bio-subs';
                    _div.innerHTML=getTmplInnerHtml('#subsItemTmpl').Format(item.id);
                    _this.bioSubsUI(item,_div);
                    break;
                case 46:
                    _div.className='bio-block bio-contact';
                    _this.bioContact(item,_div);
                    break;
                case 47:
                    _div.className='bio-block bio-faqs';
                    _this.bioFAQs(item,_div);
                    break;
                case 48:
                    _div.className='bio-block bio-menu';
                    _this.bioMenu(item,_div);
                    break;
                case 49:
                    _div.className='bio-block bio-team';
                    _this.bioTeam(item,_div);
                    break;
                default:
                    break;
            }
        },
        socialUI:function(val,socialDiv){
            var _this=this;
            if(val.state==1&&(val.socials||val.subs)){
                var _tmpl='',socials=socialDiv.querySelector('.social_list');
                if(val.subtype){ // cmpt-social
                    socials.classList.add(val.subtype);
                    _tmpl=getTmplInnerHtml('#cmpt-social-social-li');
                    (val.subs||[]).forEach(function (ele,idx) {
                        ele.lid=_this.options.lid;
                        ele.link1=checkLink(ele.link,1);
                        ele.link=encodeURI(ele.link);
                        ele.image = (ele.type==0)?clearImage(ele.image,120,120,75):'https://bio.linkcdn.cc/bio/links/icons/0123/'+ele.type+'_'+'1.png';
                        ele.image1=ele.image;
                        ele.iconfont = ele.type==0?'':'icon-social-'+ele.type;
                        ele.iconfont1 = ele.type==0?'':'icon-social-6-'+ele.type;
                        ele.iconfont2 = ele.type==0?'':'icon-social-'+ele.type;
                        ele.displayImg = ele.type==0?'block':'';
                        ele.displayIcon = ele.type==0?'hidden':'';
                        ele.target=ele.link1.startsWith('javascript')?'_self':'_blank';
                        var _li=d.createElement('li');
                        _li.innerHTML=_tmpl.Compile(ele);
                        socials.querySelector('ul').appendChild(_li);
                    });
                }else{
                    _tmpl = '<a href="{link1}" target="{target}" data-title="{title}" data-html="{link}" data-id="{lid}" data-kid="{id}" data-type="4"><img src="{image}" alt=""></a>';
                    (val.subs||[]).forEach(function (ele,idx) {
                        ele.lid=_this.options.lid;
                        ele.link1=checkLink(ele.link,1);
                        ele.link=encodeURI(ele.link);
                        ele.target=ele.link1.startsWith('javascript')?'_self':'_blank';
                        ele.image = (ele.type==0&&ele.image)?clearImage(ele.image):'https://bio.linkcdn.cc/bio/links/icons/456/'+ele.type+'_1.png';
                        var _span=d.createElement('span');
                        _span.innerHTML=_tmpl.Compile(ele);
                        socials.appendChild(_span);
                    });
                }
            }
        },
        linksUI:function(links,info,linkDiv,expended){
            var _this=this,pgs=[];
            info=info||{};
            if(info.sort_num) linkDiv.classList.add('sortNum');
            let _path = (info.path||'').split('-');
            if(_path.length>=1){
                linkDiv.classList.add('size-'+_path[0], 'txt-'+_path[1]);
            }
            if(info.subtype=='cmpt-button-buttonLinkColl'&&!expended){
                var _div=d.createElement('div');
                _div.className='button-item button-item-action block-collapse';
                info.displayImg='hidden';
                info.displayIcon='hidden';
                info.linktext=info.desc;
                _div.innerHTML=getTmplInnerHtml('#btnLinkTmplButton').Compile(info);
                linkDiv.append(_div);
            }else{
                if(!expended){
                    linkDiv.innerHTML=`<div class="embed-block-box">
                    <div class="embed-event-header">
                        <div class="embed-event-title {titleDisplay}">{title}</div>
                        <div class="embed-event-subtitle {descDisplay}">{desc}</div>
                    </div></div>`.Compile({title:info.title,desc:(info.desc||'').replace(/(\r\n)|\n/g, '<br>'),
                        titleDisplay:isEmpty(info.title)?'hidden':'',descDisplay:isEmpty(info.desc)?'hidden':'',});
                }
                if(info.auto_paging==1) pgs=autoPage(links.length||0);
                if(pgs.length<2){
                    _this._linksUI(links,info,linkDiv,expended);
                }else{
                    _this._linksUISwiper(links,info,pgs,linkDiv,expended);
                }
            }
        },
        _blockSearch:function (div, info) {
            var _this=this;
            if(info.auto_paging==2&&(info.links||info.subs||[]).length>=15){// enable search
                var _searchDiv=d.createElement('div');
                _searchDiv.className='button-item button-item-action block-search';
                _searchDiv.innerHTML=getTmplInnerHtml('#bioBlockSearchBtn').Compile({placeholder:info.type==10?gettext('Search button'):gettext('Search graphic link')});
                setTimeout(function (){
                    var _bgColor=getComputedStyle(div).getPropertyValue('--link-block-bg-color'),_borderColor=getComputedStyle(div).getPropertyValue('--link-block-border-color'),_borderPx=getComputedStyle(div).getPropertyValue('--link-block-border');
                    _bgColor=ParseColor(_bgColor);
                    _borderColor=ParseColor(_borderColor);
                    if(_bgColor.opacity!=0||_borderColor.opacity!=0){
                        _searchDiv.style.setProperty('--link-block-search-color',_bgColor.opacity==0?_borderColor.rgb:_bgColor.rgb);
                    }
                },200)
                div.appendChild(_searchDiv);
            }
        },
        _linksUI:function(links,info,linkDiv,expended){
            var _this=this,_tmpl=getTmplInnerHtml('#btnLinkTmpl'),_tmpl1=getTmplInnerHtml('#btnLinkTmplButton'),linkPg=0;
            var observer=null,_pathLink=document.querySelector('link[data-path]'),_path=_pathLink?_pathLink.dataset.path:'';
            if(info.sort_num) linkDiv.classList.add('sortNum');
            _this._blockSearch(linkDiv, info);
            linksRender(expended);
            function linksRender(expended){
                links.forEach(function (ele,idx) {
                    var _div=d.createElement('div');
                    if(scheduleLink(ele.other,ele.state)){
                        if(ele.type==11){
                            _div.className="button-item";
                            _div.innerHTML='<div class="item-header"><h3><p>{0}</p></h3></div>'.Format(ele.title);
                        }else{
                            ele.lid=_this.options.lid;
                            ele.animation=__animate[ele.featured];
                            ele.animation+= isBtnAction(ele.link,ele.type,ele.subtype,ele.link2)?' ':' no-action';
                            ele.title1 = encodeURIComponent(ele.title||'');
                            ele.textEmbed = encodeURIComponent(ele.text||'');
                            var linkText=d.createElement('div');
                            linkText.innerHTML=(ele.link||'').replace(/^https?:?\/?\/?/i, '');
                            ele.linktext = linkText.innerText;
                            linkText.remove();
                            ele.link1=checkLink(ele.link,ele.type,ele.subtype,ele.link2,ele.title,ele.text);
                            // ele.link=encodeURI(ele.link);
                            let _link=ele.link;
                            try{
                                _link=decodeURI(ele.link);
                            }catch(e){}
                            ele.link=encodeURI(_link);
                            ele.linkEmbed=encodeURIComponent(ele.link2=='undefined'?'':(ele.link2||''));
                            ele.target=ele.link1.startsWith('javascript:')?'':'_blank';
                            if(ele.icon&&ele.icon.indexOf('bio/links/icons/')!=-1){
                                var _k=getImageKey(ele.icon);
                                if(_k){
                                    ele.iconfont='icon-'+_k;
                                }else{
                                    ele.displayImg='block';
                                    ele.displayIcon='hidden';
                                }
                            }else{
                                ele.displayImg='block';
                                ele.displayIcon='hidden';
                            }
                            ele.icon=clearImage(ele.icon,120,120,75);
                            _div.className="button-item "+(info.sort_num?'show-sortNum':'');
                            if(_path!='default') ele.tcolor='';
                            if(ele.link1.startsWith('javascript:')&&(!ele.link1.startsWith('javascript:waringLeave'))){
                                _div.innerHTML=_tmpl1.Compile(ele);
                            }else{
                                _div.innerHTML=_tmpl.Compile(ele);
                            }
                            if(ele.type==10&&!!ele.path){
                                var _preload=d.createElement('link');
                                _preload.rel='preload';
                                _preload.as='style';
                                _preload.href='https://bio.linkcdn.cc/instabio.cc/static/tmpl/form/'+ele.path+'.css?t=1641779804599';
                                d.head.insertBefore(_preload, d.head.getElementsByTagName('meta')[0]);
                            }
                        }
                        linkDiv.appendChild(_div);
                    }
                });
                if(!_this.observer&&window.lozad) _this.observer=lozad();
                if(!!_this.observer) _this.observer.observe();
            }
        },
        _linksUISwiper:function(links,info,pgs,linkDiv){
            var _this=this,_tmpl=getTmplInnerHtml('#btnLinkTmpl'),_tmpl1=getTmplInnerHtml('#btnLinkTmplButton');
            if(info.sort_num) linkDiv.classList.add('sortNum');
            linkDiv.innerHTML=getTmplInnerHtml('#bioLinkSwiperTmpl');
            var lgth=pgs[0],pgIdx=0,_li=d.createElement('li');
            _li.className='swiper-slide';
            links.forEach(function (ele,idx) {
                var _div=d.createElement('div');
                if(ele.type==11){
                    _div.className="button-item";
                    _div.innerHTML='<div class="item-header"><h3><p>{0}</p></h3></div>'.Format(ele.title);
                }else{
                    ele.lid=_this.options.lid;
                    ele.animation=__animate[ele.featured];
                    ele.animation+= isBtnAction(ele.link,ele.type,ele.subtype,ele.link2)?' ':' no-action';
                    ele.title1 = encodeURIComponent(ele.title||'');
                    ele.textEmbed = encodeURIComponent(ele.text||'');
                    var linkText=d.createElement('div');
                    linkText.innerHTML=(ele.link||'').replace(/^https?:?\/?\/?/i, '');
                    ele.linktext = linkText.innerText;
                    linkText.remove();
                    ele.link1=checkLink(ele.link,ele.type,ele.subtype,ele.link2,ele.title,ele.text);      
                    let _link=ele.link;
                    try{
                    _link=decodeURI(ele.link);
                    }catch(e){}
                    ele.link=encodeURI(_link);
                    // ele.link=encodeURI(decodeURI(ele.link));
                    ele.linkEmbed=encodeURIComponent(ele.link2=='undefined'?'':(ele.link2||''));
                    ele.target=ele.link1.startsWith('javascript:')?'':'_blank';
                    if(ele.icon&&ele.icon.indexOf('bio/links/icons/')!=-1){
                        var _k=getImageKey(ele.icon);
                        if(_k){
                            ele.iconfont='icon-'+_k;
                        }else{
                            ele.displayImg='block';
                            ele.displayIcon='hidden';
                        }
                    }else{
                        ele.displayImg='block';
                        ele.displayIcon='hidden';
                    }
                    ele.icon=clearImage(ele.icon,120,120,75);
                    _div.className="button-item "+(info.sort_num?'show-sortNum':'');
                    if(ele.link1.startsWith('javascript:')&&(!ele.link1.startsWith('javascript:waringLeave'))){
                        _div.innerHTML=_tmpl1.Compile(ele);
                    }else{
                        _div.innerHTML=_tmpl.Compile(ele);
                    }
                    if(ele.type==10&&!!ele.path){
                        var _preload=d.createElement('link');
                        _preload.rel='preload';
                        _preload.as='style';
                        _preload.href='https://bio.linkcdn.cc/instabio.cc/static/tmpl/form/'+ele.path+'.css?t=1641779804599';
                        d.head.insertBefore(_preload, d.head.getElementsByTagName('meta')[0]);
                    }
                }
                _li.appendChild(_div);
                if(idx+1<lgth){
                }else{
                    lgth+=pgs[++pgIdx];
                    linkDiv.querySelector('ul').appendChild(_li);
                    _li=d.createElement('li');
                    _li.className='swiper-slide';
                }
            });
            new Swiper('#'+info.id, {
                loop: false,
                autoplay:false,
                speed:1000,
                slidesPerView: 1,
                pagination: {
                    el: '#'+info.id+' .swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '#'+info.id+' .swiper-button-next',
                    prevEl: '#'+info.id+' .swiper-button-prev',
                },
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            });
        },
        bioVideoUI:function(item,videoDiv){
            if(item.link.indexOf('twitch.tv') !=-1) item.path+=('&autoplay=false&parent='+location.host);
            if(item.link.indexOf('bilibili.com')!=-1) item.path+='&autoplay=false';
            if(item.link.indexOf('youtube.com') !=-1||item.link.indexOf('youtu.be') !=-1){
                item.referrerpolicy='referrerpolicy="strict-origin-when-cross-origin"';
            }else{
                item.referrerpolicy='';
            }
            videoDiv.innerHTML=getTmplInnerHtml('#videoItemTmpl').Compile({link:(item.path||'').replace('embed/v2','embed'),referrerpolicy:item.referrerpolicy});
            if(item.link.indexOf('youtube.com') !=-1||item.link.indexOf('youtu.be') !=-1){
                videoDiv.querySelector('.video-box').classList.add('embed-iframe-youtube');
            }
            if(item.link.indexOf('tiktok.com') !=-1){
                if(item.link.indexOf('/video/')!=-1){
                    videoDiv.querySelector('.video-box').classList.add('embed-iframe-tiktok');
                }else{
                    videoDiv.querySelector('.video-box').classList.add('embed-iframe-tiktokProfile');
                }
            }
            if(item.link.indexOf('vimeo.com') !=-1) videoDiv.querySelector('.video-box').classList.add('embed-iframe-vimeo');
            if(item.link.indexOf('bilibili.com')!=-1) videoDiv.querySelector('.video-box').classList.add('embed-iframe-bilibili');
        },
        bioGallery:function(item,galleryDiv){
            var images=document.createElement('div');
            item.subtype=item.subtype||'cmpt-image-list';
            images.className='item-gallery ' + item.subtype;
            if(item.subtype=='cmpt-image-listRow'){
            }
            if(item.subs&&item.subs.length>0){
                images.innerHTML=`<div class="embed-block-box">
                <div class="embed-event-header">
                    <div class="embed-event-title {titleDisplay}">{title}</div>
                    <div class="embed-event-subtitle {descDisplay}">{desc}</div>
                </div></div><div class="ctm-style"><div class="box-cmpt"><ul></ul><div class="embed--scroll">
                <button class="scroll left" disabled toggle="scroll" action="left/.box-cmpt/ul"><div style="transform: rotate(180deg);"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 115.46"><path d="M61.25,52c1.6,1.6,3.06,3.8,2.69,5.9.37,2.09-1.22,4.07-2.69,5.66L11.16,113.51a6.42,6.42,0,0,1-9.22,0,6.45,6.45,0,0,1,0-9.22l47.74-46.5L1.94,11.16a6.45,6.45,0,0,1,0-9.22,6.45,6.45,0,0,1,9.22,0Z"/></svg></div></button>
                <button class="scroll right" toggle="scroll" action="right/.box-cmpt/ul"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 115.46"><path d="M61.25,52c1.6,1.6,3.06,3.8,2.69,5.9.37,2.09-1.22,4.07-2.69,5.66L11.16,113.51a6.42,6.42,0,0,1-9.22,0,6.45,6.45,0,0,1,0-9.22l47.74-46.5L1.94,11.16a6.45,6.45,0,0,1,0-9.22,6.45,6.45,0,0,1,9.22,0Z"/></svg></div></button>
            </div></div></div><div class="item--bg"></div>`.Compile({title:item.title,desc:item.desc,
                titleDisplay:item.title?'':'hidden',descDisplay:item.desc?'':'hidden'});
                var _tmpl=getTmplInnerHtml('#bioGalleryTmpl');
                (item.subs||[]).forEach(function (eleSub,i) {
                    var imgLi=document.createElement('li');
                    imgLi.innerHTML=_tmpl.Compile({title:eleSub.title,desc:(eleSub.desc||'').replace(/(\r\n)|\n/g, '<br>'),
                        image:clearImage(eleSub.image)});
                    if(i==3&&item.subs.length>4&&item.subtype=='cmpt-image-list'){
                        var showMoreButton=document.createElement('button');
                        showMoreButton.className='show-more--button';
                        showMoreButton.innerHTML='<span>+{0}</span>'.Format(item.subs.length-4);
                        showMoreButton.setAttribute('toggle','more');
                        showMoreButton.setAttribute('action','showImagesMore/.item-gallery/images');
                        imgLi.querySelector('.image-box').appendChild(showMoreButton);
                    }
                    images.querySelector('ul').appendChild(imgLi);
                });
                galleryDiv.appendChild(images);
            }else{
                galleryDiv.remove();
            }
        },
        bioFormUI:function(item,formDiv){
            var _this=this,__form=JSON.parse(item.text||'{}'),eleId=item.id;
            formDiv.querySelector('.form-title .data-field').innerHTML=__form.title||'';
            formDiv.querySelector('.form-button .data-field').innerHTML=__form.submit.btn_text||'';
            formDiv.querySelector('.form-thanks span').innerHTML=__form.submit.thanks_text||'';
            var _fieldsGroup=formDiv.querySelector('.form-fields-group');
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
            Array.from(formDiv.querySelectorAll('.form-field-phone')).forEach(function (ele,i){
                v('click',function (e) {
                    var _select=ep(e.target,'.form-field-phone').querySelector('.dial-code-select');
                    if(_select.style.display=='block'){
                        _select.style.display='none';
                    }else{
                        _select.style.display='block';
                    }
                },ele.querySelector('.dial-code'));
                v('click',function (e) {
                    if(ep(e.target, 'ul').querySelector('.selected')) ep(e.target, 'ul').querySelector('.selected').classList.remove('selected');
                    var _li=ep(e.target, 'li');
                    _li.classList.add('selected');
                    ep(e.target,'.form-field-phone').querySelector('.dial-code span').innerText=_li.dataset.dial;
                    ep(e.target, '.dial-code-select').style.display='none';
                },ele.querySelector('.dial-code-select ul'))
            });
            if(!d.querySelector('#grecaptcha-js')){
                var js1=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
                js1.id='grecaptcha-js';
                js1.async=!0;
                js1.src='https://www.recaptcha.net/recaptcha/api.js?render=explicit';
                fjs.parentNode.insertBefore(js1, fjs);
            }
            lglrpjs(window).then(function () {
                onloadCallback(eleId);
            });
            if(formDiv.querySelector('.form-field-date')||formDiv.querySelector('.form-field-time')){
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
                    Array.from(formDiv.querySelectorAll('.form-field-date')).forEach(function (ele,idx) {
                        jeDate(ele.querySelector('input'),{
                            isinitVal:false,
                            initDate:[{DD:"0"},true],
                            festival: false,
                            format: 'YYYY-MM-DD',
                        });
                        ele.dataset.dateval=jeDate.nowDate();
                    });
                    Array.from(formDiv.querySelectorAll('.form-field-time')).forEach(function (ele,idx) {
                        jeDate(ele.querySelector('input'),{
                            isinitVal:false,
                            festival: false,
                            format: 'hh:mm:ss',
                        });
                    });
                });
            }
        },
        bioDivider:function(item,dividerDiv){
            var _div=d.createElement('div');
            _div.className='item-divider';
            _div.innerHTML=getTmplInnerHtml('#bioDividerTmpl');
            dividerDiv.append(_div);
        },
        bioTweet:function(item,twDiv){
            var _this=this,_div=d.createElement('div');
            var twCls='twitter-tweet',twStyle='',link=item.link;
            if(item.subtype=='cmpt-tw-latest'){link=link.replace(/(\/status\/.*)|(\/?\?.*)/i,'');twCls='twitter-timeline';twStyle='data-chrome="noheader nofooter noborders"'}
            if(link.indexOf('?')==-1){
                link+='?utm_medium=social&utm_source=instabio';
            }else{
                link+='&utm_medium=social&utm_source=instabio';
            }
            _div.innerHTML='<div class="embed-twitter ctm-style">{3}<div class="{1}"><blockquote class="{1}" align="center" data-height="500" {2}></blockquote></div><div class="embed-twitter-link"><a href="{0}" {2} target="_blank"><span>View Tweet</span></a></div></div>'.Format(link,twCls,twStyle,getTmplInnerHtml('#embedLoading'));
            _div.className='item-twitter';
            twDiv.append(_div);
            var loadTweetTimeline=function (st,lnk) {
                lnk = lnk.split('?')[0];
                if(link.indexOf('status')<0) st='cmpt-tw-latest';
                if(st=='cmpt-tw-tweet'){
                    if(/\/status\/.+/i.test(lnk)){
                        twttr.widgets.createTweet(lnk.split('/').pop(),_div.querySelector('blockquote'),{align:'center'}).then(function () {
                            _div.querySelector('.embed-twitter-link').style.display='block';
                            _div.querySelector('.embed-loading').remove();
                        });
                    }else{//tweet-limit
                        lnk=lnk.replace(/(\/status\/.*)|(\/?\?.*)/i,'');
                        twttr.widgets.createTimeline({sourceType:"profile",screenName:lnk.split('/').pop()},_div.querySelector('blockquote'),{height:500,align:'center',chrome:"noheader nofooter noborders",tweetLimit:1}).then(function () {
                            _div.querySelector('.embed-twitter-link').style.display='block';
                            _div.querySelector('.embed-loading').remove();
                        });
                    }
                }else{
                    var _lnk=lnk.split('/').pop();
                    if(_lnk.startsWith('@')) _lnk=_lnk.substring(1);
                    twttr.widgets.createTimeline({sourceType:"profile",screenName:_lnk},_div.querySelector('blockquote'),{height:520,align:'center',chrome:"noheader nofooter noborders"}).then(function () {
                        _div.querySelector('.embed-twitter-link').style.display='block';
                        _div.querySelector('.embed-loading').remove();
                    });
                }
            };
            if(d.querySelector('#twitter-wjs')){
            }else{
                var fjs=d.getElementsByTagName('script')[0];
                var js=d.createElement('script');
                js.id='twitter-wjs';
                js.async=!0;
                js.src='https://platform.twitter.com/widgets.js';
                fjs.parentNode.insertBefore(js, fjs);
            }
            ltwwjs(window).then(function () {
                loadTweetTimeline(item.subtype,link)
            });
        },
        bioPin:function(item,pinDiv){
            var _div=d.createElement('div'),_this=this;
            _div.className='item-pins';
            _div.innerHTML='<div class="ctm-style embed-pins"></div>';
            pinDiv.append(_div);
            var link=item.link.split('?')[0];
            var regPin=/^https?:\/\/(([a-z]{1,6})\.)?pinterest\.([a-z]{0,2}\.)?([a-z]{1,3})/;
            if(link&&regPin.test(link)){
                var _tmpl='<div class="embed-pins-pin"><a href="{0}" data-pin-do="{1}" {2}></a></div><div class="embed-twitter-link"><a href="{0}?utm_medium=social&utm_source=instabio" target="_blank"><span>View on Pinterest</span></a></div>';
                var links=link.replace(/^https?:\/\//,'').split('?')[0].split('/');
                if(link.indexOf('embed')!=-1){
                    link = 'https://www.pinterest.com/pin/{0}/'.Format(GetQueryString('id',item.link));
                    _div.querySelector('.embed-pins').innerHTML=_tmpl.Format(link,'embedPin','','');
                }else{
                    if(links.length>2){
                        if(links[1]=='pin'){
                            _div.querySelector('.embed-pins').innerHTML=_tmpl.Format(link,'embedPin','','');
                        }else if(links[2]=='pins'||links[2]=='_saved'||links[2]=='_shop'||links[2]=='_created'||links[2]==''){
                            _div.querySelector('.embed-pins').innerHTML=_tmpl.Format(link,'embedUser','data-pin-board-width="480" data-pin-scale-height="320" data-pin-scale-width="160"');
                        }else{
                            _div.querySelector('.embed-pins').innerHTML=_tmpl.Format(link,'embedBoard','data-pin-board-width="480" data-pin-scale-height="320" data-pin-scale-width="160"');
                        }
                    }
                    if(links.length==2){
                        _div.querySelector('.embed-pins').innerHTML=_tmpl.Format(link,'embedUser','data-pin-board-width="480" data-pin-scale-height="320" data-pin-scale-width="160"');
                    }
                }
                
                if(d.querySelector('#pin-utils-js')||window.PinUtils){
                    lpinjs(window).then(function () {
                        PinUtils.build(pinDiv.querySelector('.embed-pins-pin'));
                        // _div.querySelector('.embed-twitter-link').style.display='block';
                    });
                }else{
                    var fjs=d.getElementsByTagName('script')[0];
                    var js=d.createElement('script');
                    js.id='pin-utils-js';
                    js.async=!0;
                    js.src='https://assets.pinterest.com/js/pinit.js';
                    fjs.parentNode.insertBefore(js, fjs);
                    lpinjs(window).then(function () {
                        // _div.querySelector('.embed-twitter-link').style.display='block';
                    });
                }
            }
        },
        _payset:function (text, state){
            var payset=__data.ppset||{};
            var _set=JSON.parse(text||'{}');
            if(payset.pp_id && payset.state==1) return {state:1, error:''};
            if(_set.provider&&(_set.provider.key||_set.provider.merchantId)){
                return {state:1, error:''};
            }
            if(state==3){
                return {state:3, error:'payset'};
            }
            return {state:3, error:'payset'};
        },
        bioSupport:function(item,supDiv){
            var _div=d.createElement('div'),_this=this;
            _div.className='item-support';
            var _pset=_this._payset(item.text||'',item.state);
            if(_pset.state!=1){
                supDiv.remove();
                return;
            }
            item.textEmbed=encodeURIComponent(item.text||'');
            if(item.subtype=='cmpt-support-button'){
                _div.className='button-item';
                item.displayImg='block';
                item.displayIcon='hidden';
                item.title=item.subtitle;
                _div.innerHTML=getTmplInnerHtml('#btnLinkTmplButton').Compile(item);
            }else{
                var _supObj=JSON.parse(item.text||'{}');
                item.giftType=_supObj.giftType||'1px';
                if(_supObj.customQuantity) item.customCls='custom-quantity';
                _div.innerHTML=getTmplInnerHtml('#bioSupTmpl').Compile(item);
                if(item.subtype=='cmpt-support-gifts'){
                    _div.querySelector('.support-gifts--count input').onkeyup=function () {
                        if(this.value && this.value>500){ this.value=500;}
                        if(this.value && this.value>0){
                            this.parentElement.classList.add('support-gifts--number-val');
                            if(_div.querySelector('.support-gifts--count .selected')) _div.querySelector('.support-gifts--count .selected').classList.remove('selected');
                            var amount=parseInt(parseInt(this.value,10) * parseInt(_supObj.price,10) / 100.0, 10);
                            _div.querySelector('.support-action button span').innerHTML='<img src="https://bio.linkcdn.cc/bio/links/icons/{0}.png" > {2} {1}'.Format(_supObj.giftType,amount,(__data.ppset||{}).cy_sym||'$');
                        }else{
                            this.parentElement.classList.remove('support-gifts--number-val');
                        }
                    }
                    _div.querySelector('.support-action button span').innerHTML='<img src="https://bio.linkcdn.cc/bio/links/icons/{0}.png" >'.Format(_supObj.giftType||'1px');
                }
            }
            supDiv.append(_div);
        },
        bioYtbsub:function(item,ytbDiv){
            var _div=d.createElement('div'),_this=this;
            _div.className='item-ytbsub';
            item.link=(item.link||'').trim();
            item.link = (item.link||'').indexOf('?')>0?item.link+'&sub_confirmation=1':item.link+'?sub_confirmation=1';
            item.image=clearImage(item.image);
            _div.innerHTML=getTmplInnerHtml('#bioYtbTmpl').Compile(item);
            ytbDiv.append(_div);
        },
        bioMusic:function (item,musicDiv){
            if(item.path.indexOf('https://bandcamp.com/EmbeddedPlayer')!=-1){
                var bgcol='ffffff',linkcol='0687f5',album='',track='';
                if(item.title=='bandcamp-track'){
                    album=GetPathString('album',item.path);
                    track=GetPathString('track',item.path);
                    bgcol=GetPathString('bgcol',item.path)||'ffffff';
                    linkcol=GetPathString('linkcol',item.path)||'0687f5';
                    item.path='https://bandcamp.com/EmbeddedPlayer/album={0}/size=large/bgcol={1}/linkcol={2}/tracklist=false/artwork=small/track={3}/transparent=true/'.Format(album,bgcol,linkcol,track);
                }else if(item.title=='bandcamp-album'){
                    album=GetPathString('album',item.path);
                    bgcol=GetPathString('bgcol',item.path)||'ffffff';
                    linkcol=GetPathString('linkcol',item.path)||'0687f5';
                    item.path='https://bandcamp.com/EmbeddedPlayer/album={0}/size=large/bgcol={1}/linkcol={2}/artwork=small/transparent=true/'.Format(album,bgcol,linkcol);
                }
            }
            musicDiv.innerHTML=getTmplInnerHtml('#bioMusicItemTmpl').Compile({embed:item.path});
            musicDiv.querySelector('.music-box').classList.add('embed-'+item.title);
            if(item.title=='boomplay-album'||item.title=='boomplay-playlist') musicDiv.querySelector('.music-box iframe').scrolling='yes';
        },
        bioGraphic:function(item,graphicDiv){
            var _div=d.createElement('div'),_this=this,_subtype=item.subtype||'',_txtCls='';
            // _subtype+='Right';
            if(/(left|center|right)$/i.test(_subtype)){
                _txtCls = ('txt-' + RegExp.$1).toLowerCase();
                _subtype=_subtype.replace(/(left|center|right)$/i,'');
            }
            _div.className='item-graphic {0} {1}'.Format(_subtype,_txtCls);
            _div.innerHTML=getTmplInnerHtml('#bioGraphicTmpl').Compile({title:item.title,desc:(item.desc||'').replace(/(\r\n)|\n/g, '<br>'),
                titleDisplay:isEmpty(item.title)?'hidden':'',descDisplay:isEmpty(item.desc)?'hidden':'',});
            if(item.subs.length>0&&item.subtype){
                _this._blockSearch(graphicDiv, item);
                var _noHover = (item.subtype=='cmpt-graphic-image' || item.subtype=='cmpt-graphic-image1')?'item-no-hover':'';
                item.subs.forEach(function (sub) {
                    if(sub.image){
                        var _li=d.createElement('li'),_link=checkLink(sub.link);
                        _li.className='item item-style '+_noHover;
                        // _li.className=_noHover;
                        _li.innerHTML=getTmplInnerHtml('#bioGraphicItemTmpl').Compile({image:clearImage(sub.image),title:sub.title,link:_link,target:_link.startsWith('javascript:')?'':'_blank',
                            oLink:sub.link,id:sub.id,lid:_this.options.lid,noHover:_noHover});
                        _div.querySelector('ul').append(_li);
                    }
                });
            }
            graphicDiv.append(_div);
        },
        bioCarousel:function(item,carouselDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-carousel ' + (item.subtype||'');
            _divBox.className='carousel-box embed-carousel';
            _div.appendChild(_divBox);
            _divDetail.className='item-form';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#bioCarouselTmpl');
            var _embedLink=checkLink(item.link),nodeName='a';
            if(_embedLink.startsWith('javascript:')) nodeName='button';
            else{
                if(_embedLink.indexOf('?')>0) _embedLink+='&';
                else _embedLink+='?';
                _embedLink+='utm_medium=carousel&utm_source=instabio&utm_campaign='+item.title;
            }
            _divDetail.innerHTML=tmpl.Compile({title:item.title,desc:item.desc||'',items:'',display:item.link?'flex':'none',btntext:item.path||'',embedLink:_embedLink,nodeName:nodeName,emptyCls:item.subs.length>0?'':'empty'});
            if(item.subs.length>0&&item.subtype){
                var itemTmpl=getTmplInnerHtml('#bioCarouselItemTmpl');nodeName='a';
                item.subs.forEach(function (sub) {
                    var _subDiv=d.createElement('div');
                    _subDiv.className='carousel-item-box';
                    var _subLink=checkLink(sub.link);
                    if(_subLink.startsWith('javascript:')) nodeName='p';
                    _subDiv.innerHTML=itemTmpl.Compile({image:clearImage(sub.image),title:sub.title,subtitle:sub.subtitle,link:_subLink,btntext:sub.btntext,display:sub.btntext&&sub.link?'':'hidden',nodeName:nodeName});
                    _divDetail.querySelector('.carousel-items').append(_subDiv);
                });
            }
            carouselDiv.append(_div);
        },
        bioCarouselVideo:function(item,carouselDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-carousel ' + (item.subtype||'');
            _divBox.className='carousel-box embed-carousel';
            _div.appendChild(_divBox);
            _divDetail.className='item-form';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#bioCarouselTmpl');
            var _embedLink=checkLink(item.link),nodeName='a';
            if(_embedLink.startsWith('javascript:')) nodeName='button';
            else{
                if(_embedLink.indexOf('?')>0) _embedLink+='&';
                else _embedLink+='?';
                _embedLink+='utm_medium=carousel_video&utm_source=instabio&utm_campaign='+item.title;
            }
            _divDetail.innerHTML=tmpl.Compile({title:item.title,desc:item.desc||'',items:'',display:item.link?'flex':'none',btntext:item.path||'',embedLink:_embedLink,nodeName:nodeName,emptyCls:item.subs.length>0?'':'empty'});
            if(item.subs.length>0&&item.subtype){
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
                        _divDetail.querySelector('.carousel-items').append(_subDiv);
                    }
                });
            }
            carouselDiv.append(_div);
        },
        bioTikTok:function(item,tiktokDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div');
            _div.className='item-tiktok ' + item.subtype;
            _divBox.className='tiktok-box embed-tiktok';
            _div.appendChild(_divBox)
            if(item.state!=1||!item.text){
            }else{
                _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
                var _tiktokProvider=JSON.parse(item.text||'{}');
                if(item.subtype=='cmpt-tiktok-video'){
                    var _url='';
                    if(_tiktokProvider.video.type=='list'){
                        _url='/share/{0}/link/{1}/itgr/tiktok/op/video.query/?id={2}&video_ids={3}'.Format(__data.ui.uid,__data.bio.id,_tiktokProvider.provider.id,_tiktokProvider.video.ids.join(','));
                    }else{
                        _url='/share/{0}/link/{1}/itgr/tiktok/op/video.latest/?id={2}'.Format(__data.ui.uid,__data.bio.id,_tiktokProvider.provider.id);
                    }
                    ibjax('GET', _url,{fn:function (resp){
                            resp = JSON.parse(resp);
                            if(resp.code==0){
                                var _user = resp.data.user;
                                if(_user.is_verified) _user.verified_svg='<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#20D5EC"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z" fill="white"></path></svg>'
                                _divBox.innerHTML=getTmplInnerHtml('#bioTikTokVideoTmpl').Compile(_user);
                                var _videoHTML='';
                                resp.data.videos.forEach(function (video) {
                                    video.embed='https://www.tiktok.com/embed/v2/'+video.id;
                                    _videoHTML+=getTmplInnerHtml('#bioTikTokVideoItemTmpl').Compile(video);
                                });
                                _divBox.querySelector('.embed-tiktok-videos').innerHTML=_videoHTML;
                            }
                        }});
                }else{
                    ibjax('GET', '/share/{0}/link/{1}/itgr/tiktok/op/profile/?id={2}'.Format(__data.ui.uid,__data.bio.id,_tiktokProvider.provider.id),{fn:function (resp){
                            resp = JSON.parse(resp);
                            if(resp.code==0){
                                var _user = resp.data.user;
                                if(_user.is_verified) _user.verified_svg='<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="24" fill="#20D5EC"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z" fill="white"></path></svg>'
                                _divBox.innerHTML=getTmplInnerHtml('#bioTikTokProfileTmpl').Compile(_user);
                            }
                        }});
                }
                tiktokDiv.append(_div);
            }
        },
        _reminderState:function (item,timeObj){
            var _state='',_html='',status='',remindTxt=gettext('Remind me');
            if(timeObj.enableReminder&&timeObj.startTimestamp){
                var _now=Date.now();
                //out of 3days or less than 5min
                if((timeObj.startTimestamp-_now)/1000/3600/24/3>1 || (timeObj.startTimestamp-_now)/1000/60<5){
                    _state='disabled';
                    status='disabled';
                }else{
                    //visitorHasReminded
                    var visitorHasReminded=JSON.parse(localStorage.getItem('visitorHasReminded')||'{}');
                    if(visitorHasReminded.block&&visitorHasReminded.block[item.id]){
                        _state='disabled';
                        status='reminded';
                        remindTxt=gettext('Reminded');
                        _html=getTmplInnerHtml('#reminderSVG1');
                    }else{
                        _html=getTmplInnerHtml('#reminderSVG');
                    }
                }

            }else {
                _state='disabled';
                status='disabled';
            }
            return {state:_state,html:_html,status:status,text:remindTxt};
        },
        bioLive:function(item,liveDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-live ' + item.subtype;
            _divBox.className='event-box live-box embed-live';
            _div.appendChild(_divBox);
            _divDetail.className= (item.subtype=='cmpt-live-countdown'?'item-block':'') + ' embed-live-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#'+item.subtype);
            var _embedLink=checkLink(item.link),nodeName='a',buttonAction='',actionState='';
            if(_embedLink.startsWith('javascript:')){
                // nodeName=item.subtype=='cmpt-live-countdown'?'button':'button';
                nodeName='button';
                actionState='hidden';
            }else{
                if(_embedLink.indexOf('?')>0) _embedLink+='&';
                else _embedLink+='?';
                _embedLink+='utm_medium=social&utm_source=instabio&utm_campaign='+(item.title||'');
            }
            var timeObj=JSON.parse(item.text||'{}'),_now=new Date().getTime();
            if(item.link&&timeObj.linkOption=='embed'){
                nodeName='button';
                buttonAction='toggle="popup" action="embed/iframe/event-live"';
            }
            var _startDate=timeObj.startDate,_endDate=timeObj.endDate,timeSep='~',reminderHTML='',reminderState='';
            if(_startDate&&_endDate){
                var _sdArr=_startDate.split(' '),_edArr=_endDate.split(' ');
                if(_sdArr.length==2&&_edArr.length==2 && _sdArr[0]==_edArr[0]) _endDate=_edArr[1];
            }
            if(item.subtype=='cmpt-live-foreshow' && timeObj.schedule=='regular'){
                _startDate=timeObj.scheduleDays||'';
                _endDate=timeObj.scheduleTime||'';
                timeSep='';
            }
            var reminder=_this._reminderState(item,timeObj);
            _divDetail.innerHTML=tmpl.Compile({title:item.title,desc:item.desc||'',btntext:item.path||'',display:(item.link||item.path)?'block':'none',embedLink:_embedLink,nodeName:nodeName,image:clearImage(item.image),actionState:actionState,
                start:_startDate,end:_endDate,pImage:clearImage(timeObj.image),pTitle:timeObj.platformName||'',timeSep:timeSep,reminderHTML:reminder.html,reminderState:reminder.state,reminderStatus:reminder.status,buttonAction:buttonAction});
            new CounterEvent(_divBox,timeObj.startTimestamp,{subtype:item.subtype,endTimestamp:timeObj.endTimestamp,endAction:timeObj.endAction,endMessage:timeObj.endMessage,
                schedule:timeObj.schedule,scheduleDays:timeObj.scheduleDays,scheduleTime:timeObj.scheduleTime});
            liveDiv.append(_div);
        },
        bioEvent:function(item,eventDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-event ' + item.subtype;
            _divBox.className='event-box embed-event';
            _div.appendChild(_divBox);
            _divDetail.className='item-block embed-event-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#'+item.subtype);
            var _embedLink=checkLink(item.link),nodeName='a';
            if(_embedLink.startsWith('javascript:')) nodeName='button';
            else{
                if(_embedLink.indexOf('?')>0) _embedLink+='&';
                else _embedLink+='?';
                _embedLink+='utm_medium=event&utm_source=instabio&utm_campaign='+(item.title||'');
            }
            var timeObj=JSON.parse(item.text||'{}'),_now=new Date().getTime();
            var _startDate=timeObj.startDate,_endDate=timeObj.endDate,timeSep='~',periodDisplay='';
            if(_startDate&&_endDate){
                var _sdArr=_startDate.split(' '),_edArr=_endDate.split(' ');
                if(_sdArr.length==2&&_edArr.length==2 && _sdArr[0]==_edArr[0]) _endDate=_edArr[1];
            }
            if(!_endDate) timeSep= '';
            if(!_startDate) timeSep= '';
            if(!(_startDate||_endDate)) periodDisplay= 'hidden';
            var reminder=_this._reminderState(item,timeObj);
            _divDetail.innerHTML=tmpl.Compile({title:item.title,desc:item.desc||'',btntext:item.path||'',display:(item.link||item.path)?'':'hidden',embedLink:_embedLink,nodeName:nodeName,image:clearImage(item.image),
                start:_startDate,startDate:_startDate,end:_endDate,pImage:clearImage(timeObj.image),pImgShow:timeObj.image?'':'hidden',pTitle:timeObj.title,timeSep:timeSep,
                reminderHTML:reminder.html,reminderState:reminder.state,reminderStatus:reminder.status,remindTxt:reminder.text,periodDisplay:periodDisplay,
                startIn:gettext('Start in'),endIn:gettext('End in')});
            new CounterEvent(_divBox,timeObj.startTimestamp,{subtype:item.subtype,endAction:timeObj.endAction,endMessage:timeObj.endMessage,endTimestamp:timeObj.endTimestamp});
            eventDiv.append(_div);
        },
        bioOpensea:function(item,openseaDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div');
            _div.className='item-opensea ' + item.subtype;
            _divBox.className='opensea-box embed-opensea';
            _div.appendChild(_divBox)
            _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
            var _osObj=CheckPlatformURL(item.link);
            if(_osObj.platform=='opensea'){
                var _url='';
                if(_osObj.type=='collection'){
                    // _url='/share/lnk/{0}/itgr/opensea/op/coll/?slug={1}'.Format(__data.bio.id,_osObj.fields[2]);
                    _url='https://wapi.instabio.cc/opensea/coll/{0}'.Format(_osObj.fields[2]);
                }else{
                    // _url='/share/lnk/{0}/itgr/opensea/op/asset/?contractAddress={1}&tokenId={2}&chain={3}'.Format(__data.bio.id,_osObj.fields[3],_osObj.fields[4],_osObj.fields[2]);
                    _url='https://wapi.instabio.cc/opensea/asset/{0}/{1}/{2}'.Format(_osObj.fields[2],_osObj.fields[3],_osObj.fields[4]);
                }
                ibjax('GET', _url,{fn:function (resp){
                    resp = JSON.parse(resp);
                    if(resp.code==0){
                        var _coll = {collectionImage:'',collectionName:''},_un='';
                        if(resp.data.collection){
                            _coll.collectionImage=resp.data.collection.image;
                            _coll.collectionName=resp.data.collection.name;
                            _un=(resp.data.creator||{}).username||(resp.data.owner||{}).username||'';
                            _coll.collectionOwner=_un?('@'+_un):'';
                        }else{
                            var _collAsset = (resp.data.assets&&resp.data.assets.length>0)?resp.data.assets[0]:{collection:{}};
                            _coll.collectionImage=_collAsset.collection.image;
                            _coll.collectionName=_collAsset.collection.name;
                            _un=(_collAsset.creator||{}).username||(_collAsset.owner||{}).username||'';
                            _coll.collectionOwner=_un?('@'+_un):'';
                        }
                        _coll.deep_link=item.link+(item.link.indexOf('?')>-1?'&':'?');
                        _coll.deep_link+='utm_medium=opensea&utm_source=instabio&utm_campaign=block+show';
                        _divBox.innerHTML=getTmplInnerHtml('#bioOpenseaTmpl').Compile(_coll);
                        var _assetHTML='';
                        if(resp.data.assets){
                            resp.data.assets.forEach(function (asset) {
                                var _asset={nodeName:'a', link:asset.permalink, title:asset.name, image:asset.image,subtitle:asset.description||''};
                                _assetHTML+=getTmplInnerHtml('#bioCarouselItemTmpl').Compile(_asset);
                            });
                        }else{
                            var asset={nodeName:'a', link:resp.data.permalink, title:resp.data.name, image:resp.data.image,subtitle:resp.data.description||''};
                            _assetHTML+=getTmplInnerHtml('#bioCarouselItemTmpl').Compile(asset);
                        }
                        _divBox.querySelector('.carousel-items').innerHTML=_assetHTML;
                        _this._loadImages();
                    }
                }});
            }
            openseaDiv.append(_div);
        },
        bioFBPage:function(item,fbDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div');
            _div.className='item-fbpage  embed--iframe ' + item.subtype;
            _divBox.className='fbpage-box iframe--box';
            _div.appendChild(_divBox);
            var tmpl=getTmplInnerHtml('#bioFBPageTmpl');
            var _embedLink;
            if(item.subtype=='cmpt-fbp-profile'){
                _embedLink='https://www.facebook.com/v16.0/plugins/page.php?app_id=797683330612487&href='+item.link;
            }else{
                _embedLink='https://www.facebook.com/v16.0/plugins/page.php?app_id=797683330612487&adapt_container_width=true&hide_cover=false&href='+item.link+'&show_facepile=false&tabs=timeline';
            }
            _divBox.innerHTML=getTmplInnerHtml('#embedLoading')+tmpl.Compile({embedLink:_embedLink});
            fbDiv.append(_div);
            _divBox.querySelector('iframe').onload=function(){
                _divBox.querySelector('.embed-loading').remove();
            }
        },
        _sfollowerLens:function(l){
            var lArr=[],_lP=3,_lC=4,i=0;
            if(l<=_lC) return [l];
            if(l%_lC==0){
                for(i=0;i<l/_lC;i++) lArr.push(_lC);
            }else if(l%_lC==_lP){
                for(i=0;i<Math.floor(l/_lC);i++) lArr.push(_lC);
                lArr.push(_lP);
            }else if(l%_lC==2){
                for(i=0;i<Math.floor(l/_lC)-1;i++) lArr.push(_lC);
                lArr.push(3,3);
            }else{
                for(i=0;i<Math.floor(l/_lC)-1;i++) lArr.push(_lC);
                lArr.push(3,2);
            }
            return lArr;
        },
        bioSFollower:function(item,socialDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-sfollower ' + item.subtype;
            _divBox.className='sfollower-box embed-sfollower';
            _div.appendChild(_divBox);
            _divDetail.className='embed-sfollower-bg';
            _divBox.appendChild(_divDetail);
            var _subsLens=_this._sfollowerLens(item.subs.length);
            if(item.subs.length>0){
                var tmpl=getTmplInnerHtml('#bioSFollowerTmpl'),_iN=0,n=0,ele=null;
                for(var i=0;i<_subsLens.length;i++){
                    _iN=_subsLens[i];
                    var sfDiv=d.createElement('div');
                    sfDiv.className='embed-sfollower-g';
                    for(var j=0;j<_iN;j++){
                        ele=item.subs[n];
                        n++;
                        if(ele.image&&ele.image.indexOf('bio/links/icons/')!=-1){
                            var _k=getImageKey(ele.image);
                            if(_k){
                                ele.iconfont='icon-'+_k;
                                ele.displayImg='hidden';
                                ele.displayIcon='block';
                            }else{
                                ele.displayImg='block';
                                ele.displayIcon='hidden';
                            }
                        }else{
                            ele.displayImg='block';
                            ele.displayIcon='hidden';
                        }
                        ele.lid=_this.options.lid;
                        ele.link1=checkLink(ele.link,1);
                        ele.link=encodeURI(ele.link);
                        ele.target='_blank';
                        ele.image = clearImage(ele.image);
                        ele.fCount=num4read(ele.subtitle||0,1);
                        sfDiv.innerHTML+=tmpl.Compile(ele);
                    }
                    _divDetail.appendChild(sfDiv);
                }
                socialDiv.append(_div);
            }
        },
        bioWishlist:function(item,wishlistDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            var _pset=_this._payset(item.text||'',item.state);
            if(_pset.state!=1){
                wishlistDiv.remove();
                return;
            }
            _div.className='item-wishlist ' + item.subtype;
            _divBox.className='carousel-box embed-carousel';
            _div.appendChild(_divBox);
            _divDetail.className='item-block embed-wishlist-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#bioWishlistTmpl');
            _divDetail.innerHTML=tmpl.Compile({title:item.title,desc:item.desc||'',items:'',emptyCls:item.subs.length>0?'':'empty'});
            if(item.subs.length>0&&item.subtype){
                var itemTmpl=getTmplInnerHtml('#bioWishlistItemTmpl');nodeName='p';
                item.subs.forEach(function (sub) {
                    var _subDiv=d.createElement('div');
                    _subDiv.className='carousel-item-box';
                    _subDiv.innerHTML=itemTmpl.Compile({image:clearImage(sub.image),title:sub.title,cy_sym:_getCySym('',(__data.ppset||{}).currency),price:sub.price,btntext:gettext('Fund this'),nodeName:nodeName});
                    _divDetail.querySelector('.carousel-items').append(_subDiv);
                });
            }
            wishlistDiv.append(_div);
        },
        bioGraphext:function(item,graphextDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-graphext item-graphic ' + item.subtype;
            _divBox.className='graphext-box embed-graphext';
            _div.appendChild(_divBox);
            _divDetail.className='item-block embed-graphext-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#'+item.subtype);
            var _embedLink=checkLink(item.link),nodeName='a',ndNP='a',lnkDisplay='';
            var _desc=item.desc||'',_title=item.title||'',_descDisplay=(!_desc)?'hidden':'',_txtDisplay=(_desc||_title)?'':'hidden';
            if(_embedLink.startsWith('javascript:')){
                nodeName='button';ndNP='div';
                lnkDisplay='hidden';
            }else{
                if(_embedLink.indexOf('?')>0) _embedLink+='&';
                else _embedLink+='?';
                _embedLink+='utm_medium=graphext&utm_source=instabio&utm_campaign='+encodeURI(_title);
            }
            
            _divDetail.innerHTML=tmpl.Compile({title:_title,desc:_desc,btntext:item.subtitle||'',display:(item.link||item.subtitle)?'':'hidden',embedLink:_embedLink,nodeName:nodeName,image:clearImage(item.image),path:item.path||'',
                descDisplay:_descDisplay,txtDisplay:_txtDisplay,ndNP:ndNP,lnkDisplay:lnkDisplay});
            graphextDiv.append(_div);
        },
        bioThreads:function (item,threadsDiv){
            if(item.link.indexOf('?') > 0) item.path = item.link.split('?')[0];
            else item.path=item.link;
            item.path+=(item.path.endsWith('/')?'':'/')+'embed';
            var _path='https://bio.linkcdn.cc/instabio.cc/embed/cmpt.html?t=1727339263762';
            // threadsDiv.innerHTML=getTmplInnerHtml('#bioThreadsTmpl').Compile({embed:item.path});
            threadsDiv.innerHTML=getTmplInnerHtml('#embedLoading')+getTmplInnerHtml('#bioThreadsTmpl').Compile({embed:_path});
            threadsDiv.querySelector('iframe').onload=function () {
                this.contentWindow.postMessage({fn:'renderContent',cmpt:item,type:'embedIframe','platform':'threads'}, '*');
            }
        },
        bioShopTikTok:function(item,shopDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-carousel ' + (item.subtype||'');
            _divBox.className='carousel-box embed-carousel';
            _div.appendChild(_divBox);
            _divDetail.className='item-block';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#bioCarouselTmpl');
            var nodeName='button';
            _divDetail.innerHTML=tmpl.Compile({nodeName:nodeName,emptyCls:item.subs.length>0?'':'empty'});
            if(item.subs.length>0&&item.subtype){
                var itemTmpl=getTmplInnerHtml('#bioTSPItemTmpl'),_prodIds=[];
                item.subs.forEach(function (sub) {
                    var _pObj = JSON.parse(sub.text||'{}'),_p=[],_pid=[];
                    _p=_pObj.products||[];
                    _p.forEach(function (p,idx) {
                        if(p.id) _pid.push(p.id);
                        if(p.id&&!_prodIds.includes(p.id)) _prodIds.push(p.id);
                    });
                    var _subDiv=d.createElement('div'),video={subData:encodeURIComponent(JSON.stringify(sub))};
                    _subDiv.className='carousel-item-box';
                    video.title=sub.title;
                    video.image=clearImage(sub.image);
                    var _embed = GetEmbedURL(sub.link);
                    video.embed=_embed.url;
                    video.prodId=_pid.join(',');
                    video.tspProdCls=_p.length>1?'mutiple':'one';
                    if(_p.length>1||_p.length==0){
                        video.actionHTML='<button toggle="view" action="tsp/products/.carousel-item--info">Buy</button>';
                    }else if (_p.length==1){
                        // video.actionHTML='<a href="{0}" target="_blank">Buy</a>';
                        video.actionHTML='<button toggle="view" action="tsp/prodinfo/.carousel-item--info">Buy</button>';
                    }
                    _subDiv.innerHTML=itemTmpl.Compile(video);
                    _divDetail.querySelector('.carousel-items').append(_subDiv);
                });
                ibjax('GET', '/share/{0}/link/{1}/itgr/tsp/op/products/?ids={2}'.Format(__data.ui.uid,__data.bio.id,_prodIds.join(',')),{fn:function (resp){
                        resp = JSON.parse(resp);
                        if(resp.code==0){
                            var _products = resp.data.products,_itemsDiv=_divDetail.querySelectorAll('.carousel-items .carousel-item-box');
                            _divDetail.dataset.prods=encodeURIComponent(JSON.stringify(_products));
                            _itemsDiv.forEach(function (itemDiv) {
                                var _prodDiv=itemDiv.querySelector('.item-embed--product'),
                                _pid=(_prodDiv.getAttribute('data-prod')||'').split(','),__pid=_pid.find(function (p) {
                                    return _products.find(function (p1) {return p1.id==p});
                                }),_pInfo=_products.find(function (p) {return p.id==__pid});
                                if(_pInfo){
                                    _prodDiv.querySelector('.embed--product-item-image img').src=clearImage(_pInfo.image);
                                    _prodDiv.querySelector('.embed--product-item-title').innerHTML=_pInfo.title;
                                    var _pCySym=_getCySym(_pInfo.platform);
                                    if(_pInfo.sale_price){
                                        var _priceHTML= '<span>{0}{1}</span><span>{0}{2}</span>'.Format(_pCySym,_pInfo.sale_price,_pInfo.price);
                                        _prodDiv.querySelector('.embed--product-item-price').innerHTML=_priceHTML;
                                    }else{
                                        _prodDiv.querySelector('.embed--product-item-price').innerHTML=_pCySym + _pInfo.price;
                                    }
                                    var _prodA =_prodDiv.querySelector('.embed--product-button a');
                                    if(_prodA){
                                        var _al='';
                                        if(_pInfo.channels && _pInfo.channels.length>0){
                                            _al=_pInfo.channels[0].link;
                                        }else{
                                            _al='https://shop.tiktok.com/view/product/'+_pInfo.mid;
                                        }
                                        _prodA.setAttribute('href',_al);
                                    }
                                }else{
                                    var _pTar=itemDiv.querySelector('.carousel-item--embed'),_pTarItem=itemDiv.querySelector('.carousel-item--info');
                                    var sub=JSON.parse(decodeURIComponent(_pTarItem.dataset.sub)||'{}');
                                    _pTar.classList.add('embed-tsp--closed');
                                    _pTar.querySelector('.item-embed--bg').innerHTML=`<div class="embed-tsp--products">
                                    <div class="embed-tsp--title txt-ellipsis">{0}</div></div>`.Format(sub.title);
                                }
                            });
                        }
                    }});
                shopDiv.append(_div);
            }else{
                shopDiv.remove();
            }
        },
        bioGoods:function(item,goodsDiv){
            var _div=d.createElement('div'),_this=this;
            _div.className='item-graphic item-goods ' + (item.subtype||'');
            _div.innerHTML=getTmplInnerHtml('#embedLoading');
            if(item.subs.length>0&&item.subtype){
                var _prodIds=[];
                item.subs.forEach(function (sub) {
                    if(sub.path) _prodIds.push(sub.path);
                });
                ibjax('GET', '/share/{0}/link/{1}/itgr/tsp/op/products/?ids={2}'.Format(__data.ui.uid,__data.bio.id,_prodIds.join(',')),{fn:function (resp){
                    resp = JSON.parse(resp);
                    if(resp.code==0){
                        _div.innerHTML+=getTmplInnerHtml('#bioGoodsTmpl').Compile({title:item.title,desc:(item.desc||'').replace(/(\r\n)|\n/g, '<br>'),
                            titleDisplay:isEmpty(item.title)?'hidden':'',descDisplay:isEmpty(item.desc)?'hidden':'',});
                        var _products = resp.data.products,_tmpl=getTmplInnerHtml('#cmpt-goods-list');
                        item.subs.forEach(function (sub) {
                            var _li=d.createElement('li'),nodeName='div',buttonDisplay='';
                            _li.className='item-block item-no-hover';
                            var _pInfo=_products.find(function (p) {return p.id==sub.path});
                            if(_pInfo){
                                _li.dataset.prod=encodeURIComponent(JSON.stringify(_pInfo));
                                var _pCySym=_getCySym(_pInfo.platform),_priceHTML='',buyHTML='',labelHtml='';
                                if(_pInfo.sale_price){
                                    _priceHTML= '<span>{sym}{sale_price}</span><span>{sym}{price}</span>'.Compile({sym:_pCySym,sale_price:_pInfo.sale_price,price:_pInfo.price});
                                }else{
                                    _priceHTML=_pCySym + _pInfo.price;
                                }
                                if(_pInfo.label&&_pInfo.label.name){
                                    labelHtml='<span class="ctm-label" style="background-color:{color}"><span>{name}</span></span>'.Compile(_pInfo.label);
                                }
                                (_pInfo.channels||[]).forEach(function (c) {
                                    if(isEmpty(c.defaultChannel)||c.defaultChannel){
                                        if(isEmpty(c.defaultChannelShow)||c.defaultChannelShow) buyHTML+=`<div class="item-icon"> <img src="{0}"></div>`.Format(clearImage(c.icon||'bio/links/icons/social/{0}.png'.Format(_pInfo.platform)));
                                    }else{
                                        if(c.icon) buyHTML+=`<div class="item-icon"> <img src="{0}"></div>`.Format(clearImage(c.icon));
                                    }
                                });
                                _li.innerHTML=_tmpl.Compile({image:clearImage(_pInfo.image),title:_pInfo.title,price:_priceHTML,
                                    buyHTML:buyHTML,btntext:_pInfo.btntext||'Buy now',labelHtml:labelHtml,lid:__data.bio.id,id:sub.id,
                                    nodeName:nodeName,buttonDisplay:buttonDisplay});
                                _div.querySelector('ul').append(_li);
                            }
                        });
                        _this._loadImages();
                        _div.querySelector('.embed-loading').remove();
                    }
                }});
                goodsDiv.append(_div);
            }else{
                _div.querySelector('.embed-loading').remove();
            }
        },
        bioSpring:function(item,springDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div');
            _div.className='item-spring ' + item.subtype;
            _divBox.className='spring-box embed-spring';
            _div.appendChild(_divBox)
            _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
            var _osObj=CheckPlatformURL(item.link);
            if(_osObj.platform=='spring'){
                var _url='';
                function renderSpringStore(url){
                    ibjax('GET', url,{fn:function (resp){
                        resp = JSON.parse(resp);
                        if(resp.products){
                            var _coll = {collectionImage:'',collectionName:''},_un='';
                            _coll.deep_link=item.link+(item.link.indexOf('?')>-1?'&':'?');
                            _coll.deep_link+='utm_medium=spring&utm_source=instabio&utm_campaign=block+show';
                            _divBox.innerHTML=getTmplInnerHtml('#bioSpringTmpl').Compile(_coll);
                            var _assetHTML='';
                            resp.products.forEach(function (prod) {
                                var _prod={nodeName:'a', link:'https://{0}.creator-spring.com/listing{1}'.Format(_osObj.fields[0],prod.url),image:prod.imageUrl,subtitle:prod.price||'',
                                title:'{0}<br><span>{1}</span>'.Format(prod.name,prod.productName)};
                                _assetHTML+=getTmplInnerHtml('#bioCarouselItemTmpl').Compile(_prod);
                            });
                            _divBox.querySelector('.carousel-items').innerHTML=_assetHTML;
                            _this._loadImages();
                        }
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
                        _spStoreRegion=JSON.parse(resp);
                        _url='https://commerce.teespring.com/v1/stores/products?currency={0}&page=1&per=6&region={1}&slug={2}'.Format(_spStoreRegion.buyer_currency,_spStoreRegion.buyer_region,_osObj.fields[0]);
                        renderSpringStore(_url);
                    }});
                }
            }
            springDiv.append(_div);
        },
        bioText:function(item,textDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-text ' + item.subtype;
            _divBox.className='text-box embed-text';
            _div.appendChild(_divBox);
            _divDetail.className='item-block';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#'+item.subtype);
            _divDetail.innerHTML=tmpl.Compile({text:item.desc});
            textDiv.append(_div);
        },
        bioInstagram:function (item,igDiv){
            if(item.link.indexOf('?') > 0) item.path = item.link.split('?')[0];
            else item.path=item.link;
            if(item.path.indexOf('profilecard/')>0) item.path=item.path.replace('profilecard/','');
            item.path+=(item.path.endsWith('/')?'':'/')+'embed/';
            if(item.subtype=='cmpt-ig-postCaption'){
                item.path+='captioned/';
            }else{
                item.scroll='no';
            }
            var _path='https://bio.linkcdn.cc/instabio.cc/embed/cmpt.html?t=1727339263762';
            igDiv.innerHTML=getTmplInnerHtml('#embedLoading')+getTmplInnerHtml('#bioIGTmpl').Compile({embed:_path,subtype:item.subtype,scroll:item.scroll});
            igDiv.querySelector('iframe').onload=function () {
                this.contentWindow.postMessage({fn:'renderContent',cmpt:item,type:'embedIframe','platform':'instagram'}, '*');
            }
        },
        bioDigital:function (item,digitalDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-digital ' + item.subtype;
            _divBox.className='graphext-box embed-graphext';
            _div.appendChild(_divBox);
            _divDetail.className='item-block embed-graphext-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#'+item.subtype);
            _this._prods.ids.push(item.path);
            _divDetail.innerHTML=tmpl.Compile({btntext:item.title||'',display:isEmpty(item.title)?'hidden':'',image:clearImage(item.image),subtitle:item.subtitle||'',path:item.path||'',id:item.id||'',
                lnkid:__data.bio.id,nodeName:isEmpty(item.title)?'button':'div'});
            digitalDiv.append(_div);
            _this._loadGoodsEnd().then(function () {
                var _prod=_this._filterGoods(item.path,_this._prods.goods);
                if(_prod){
                    _divDetail.dataset.prod=encodeURIComponent(JSON.stringify(_prod));
                    _divDetail.querySelector('.embed-event-title').innerHTML=_prod.title;
                    if(_prod.description){
                        _divDetail.querySelector('.event-desc').innerHTML=_prod.description;
                    }else{
                        _divDetail.querySelector('.embed-event-detail--left').classList.add('hidden');
                    }
                    var _pCySym=_getCySym(),_priceHTML='';
                    if(_prod.sale_price){
                        _priceHTML= '<span>{sym}{sale_price}</span><span>{sym}{price}</span>'.Compile({sym:_pCySym,sale_price:_prod.sale_price,price:_prod.price});
                    }else{
                        _priceHTML=_pCySym + _prod.price;
                    }
                    _divDetail.querySelector('.embed-price--show').innerHTML=_priceHTML;
                }else{
                    digitalDiv.remove();
                }
            });
        },
        bioRequest:function (item,rqtDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-request ' + item.subtype;
            _divBox.className=' ';
            _div.appendChild(_divBox);
            _divDetail.className='item-block ';
            _divBox.appendChild(_divDetail);
            _divDetail.innerHTML=getTmplInnerHtml('#embedLoading');
            _this._prods.ids.push(item.path);
            rqtDiv.append(_div);
            _this._loadGoodsEnd().then(function () {
                var _prod=_this._filterGoods(item.path,_this._prods.goods);
                if(_prod){
                    var _provideId='pp-linkbio-stripe',_pCySym=_getCySym(),
                        _item={id:item.id,title:_prod.title,desc:_prod.description||'',btntext:_prod.btntext,path:item.path,lnkid:__data.bio.id,
                            txt:encodeURIComponent(JSON.stringify(_prod))};
                    if(_prod.request_form.options&&_prod.request_form.options.length>0){
                        _item.selectedOption='('+_pCySym+(_prod.request_form.options[0].value/100.0)+')';
                        _divDetail.innerHTML=getTmplInnerHtml('#lnkRqtTmpl').Compile(_item);
                        var _options='',_name='radio'+parseInt((Math.random() * 10000000), 10);
                        _prod.request_form.options.forEach(function (opt,idx) {
                            _options+=`<div class="form-field-radio-option"><input type="radio" id="radio{0}" name="{1}" {5} value="{2}"><label for="radio{0}">{3}</label><span>{6}{4}</span></div>`.Format(
                                parseInt((Math.random() * 10000000), 10),_name,opt.value, opt.detail||opt.title||'&nbsp;&nbsp;', opt.value/100.0,(idx==0?'checked':''),_pCySym);
                        })
                        var _optDiv=d.createElement('div');
                        _optDiv.className='request-option form-field';
                        _optDiv.innerHTML=`<div class="form-control"><div class="form-field-radio data-field">{options}</div></div>`.Compile({options:_options});
                        _divDetail.querySelector('.support-options').append(_optDiv);
                    }
                }else{
                    rqtDiv.remove();
                }
            });
        },
        _loadGoods:function(prodIds){
            var _this=this;
            if(prodIds.length>0){
                if(prodIds.length>150){
                    let pl=Math.ceil(prodIds.length/150);
                    for(let i=0;i<pl;i++){
                        ibjax('GET', '/share/{0}/link/{1}/itgr/lb/op/goods/?ids={2}'.Format(__data.ui.uid,__data.bio.id,prodIds.slice(i*150,(i+1)*150).join(',')),
                        {fn:function (resp){
                            resp = JSON.parse(resp);
                            if(resp.code==0){
                                _this._prods.goodsList.push(resp.data.products || []);
                            }
                        }});
                    }
                    _this._loadGoodsPGEnd(pl).then(function () {
                        _this._prods.goods=_this._prods.goodsList.flat();
                    });
                }else{
                    ibjax('GET', '/share/{0}/link/{1}/itgr/lb/op/goods/?ids={2}'.Format(__data.ui.uid,__data.bio.id,prodIds.join(',')),{fn:function (resp){
                        resp = JSON.parse(resp);
                        if(resp.code==0){
                            var _products = resp.data.products;
                            _this._prods.goods=_products;
                        }
                    }});
                }
            }
        },
        _loadGoodsPGEnd:function (pl){
            var _this=this;
            return new Promise((function(t) {
                (function n(){
                    var r = _this._prods.goodsList;
                    r.length!=pl ? window.requestAnimationFrame(n) : (t())
                }())
            }))
        },
        _loadGoodsEnd:function (){
            var _this=this;
            return new Promise((function(t) {
                (function n(){
                    var r = _this._prods.goods;
                    !r ? window.requestAnimationFrame(n) : (t())
                }())
            }))
        },
        _filterGoods:function (gId,goods){
            return (goods||[]).find(function (g) {
                return g.id==gId;
            });
        },
        bioPodcast:function (item,podcastDiv){
            // if(item.title.startsWith('google-')||item.link.indexOf('podcasts.google.com') !=-1){
            if(item.link.indexOf('podcasts.google.com') !=-1){
                // google podcast
                var _podcast = JSON.parse(item.text||'{}');
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
                podcastDiv.innerHTML=getTmplInnerHtml('#podcastGoogleItemTmpl').Compile(__podcast);
                podcastDiv.querySelector('.podcast-box').classList.add('embed-'+item.title);
                // podcast recent episodes
                var url='/share/bl/link/{0}/itgr/google/op/podcast.recent/?link={1}'.Format(__data.bio.id,encodeURIComponent(item.link));
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
                            podcastDiv.querySelector('.podcast-recent--list').innerHTML=_recentHtml;
                        }
                    }
                })
            }else{
                podcastDiv.innerHTML=getTmplInnerHtml('#embedLoading')+getTmplInnerHtml('#bioPodcastTmpl').Compile({embed:item.path,title:item.title});
                podcastDiv.querySelector('iframe').onload=function () {
                    podcastDiv.querySelector('.embed-loading').remove();
                }
            }
        },
        bioProvecho:function (item,provechoDiv){
            var _path=item.link;
            if(_path.indexOf('provecho.bio') > 0){
                _path=_path.split('provecho.bio/')[1];
                _path='https://www.provecho.bio/beacons/'+_path.split('/')[0];
            }else{
                _path='https://www.provecho.bio/beacons/'+_path.split('/')[0];
            }
            provechoDiv.innerHTML=getTmplInnerHtml('#embedLoading')+getTmplInnerHtml('#bioProvechoTmpl').Compile({embed:_path,title:item.title});
            provechoDiv.querySelector('iframe').onload=function () {
                provechoDiv.querySelector('.embed-loading').remove();
            }
        },
        bioBonfire:function (item, bonfireDive) {  
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div');
            _div.className='item-bonfire ' + item.subtype;
            _divBox.className='bonfire-box embed-bonfire';
            _div.appendChild(_divBox)
            _divBox.innerHTML=getTmplInnerHtml('#embedLoading');
            var _osObj=CheckPlatformURL(item.link);
            if(_osObj.platform=='bonfire'){
                // var _url='https://www.bonfire.com/rest/stores/{0}/linktree/linktree-store-products/'.Format(_osObj.fields[2]);
                // var _url='https://www.bonfire.com/rest/stores/{0}/'.Format(_osObj.fields[2]);
                var _url='https://wapi.instabio.cc/bonfire/{0}'.Format(_osObj.fields[2]);
                ibjax('GET', _url,{fn:function (resp){
                    resp = JSON.parse(resp);
                    var _coll = {collectionImage:'',collectionName:resp.storeTitle||item.title||_osObj.fields[2]};
                    _coll.deep_link=item.link+(item.link.indexOf('?')>-1?'&':'?');
                    _coll.deep_link+='utm_medium=bonfire&utm_source=instabio&utm_campaign=block+show';
                    _divBox.innerHTML=getTmplInnerHtml('#bioBonfireTmpl').Compile(_coll);
                    var _assetHTML='';
                    if(resp.storeLinkTreeCampaignModels){
                        resp.storeLinkTreeCampaignModels.forEach(function (asset) {
                            var _asset={nodeName:'a',link:asset.campaignUrl, title:asset.campaignName,image:asset.featuredProductImageUrl,
                                subtitle:asset.featuredProductPrice||'',btntext:'Buy now'};
                            _assetHTML+=getTmplInnerHtml('#bioCarouselItemTmpl').Compile(_asset);
                        });
                    }
                    _divBox.querySelector('.carousel-items').innerHTML=_assetHTML;
                    _this._loadImages();
                }});
                bonfireDive.append(_div);
            }else{
                bonfireDive.remove();
            }
        },
        bioGofundme:function (item,gofundmeDiv){
            item.path=item.link;
            //https://www.gofundme.com/f/craig-robert-roh/widget/medium
            if(item.path.indexOf('gofundme.com') > 0){
                item.path=item.path.split('?')[0].replace(/https?:\/\//i, '');
                var _pathArr=item.path.split('/');
                item.path='https://www.gofundme.com/f/{0}/widget/large'.Format(_pathArr[2]);
                gofundmeDiv.innerHTML=getTmplInnerHtml('#embedLoading')+getTmplInnerHtml('#bioGofundmeTmpl').Compile({embed:item.path,title:item.title});
                gofundmeDiv.querySelector('iframe').onload=function () {
                    gofundmeDiv.querySelector('.embed-loading').remove();
                }
            }else{
                gofundmeDiv.remove();
            }
        },
        bioQAs:function (item,qasDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-digital item-qas ' + item.subtype;
            _divBox.className='graphext-box embed-graphext';
            _div.appendChild(_divBox);
            _divDetail.className='item-block embed-graphext-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#'+item.subtype);
            _this._prods.ids.push(item.path);
            _divDetail.innerHTML=tmpl.Compile({btntext:item.title||'',display:isEmpty(item.title)?'hidden':'',image:clearImage(item.image),subtitle:item.subtitle||'',path:item.path||'',id:item.id||'',
                lnkid:__data.bio.id,nodeName:isEmpty(item.title)?'button':'div'});
            qasDiv.append(_div);
            _this._loadGoodsEnd().then(function () {
                var _prod=_this._filterGoods(item.path,_this._prods.goods);
                if(_prod){
                    _divDetail.dataset.prod=encodeURIComponent(JSON.stringify(_prod));
                    _divDetail.querySelector('.embed-event-title').innerHTML=_prod.title;
                    if(_prod.description){
                        _divDetail.querySelector('.event-desc').innerHTML=_prod.description;
                    }else{
                        _divDetail.querySelector('.embed-event-detail--left').classList.add('hidden');
                    }
                    var _pCySym=_getCySym(),_priceHTML='';
                    if(_prod.sale_price){
                        _priceHTML= '<span>{sym}{sale_price}</span><span>{sym}{price}</span>'.Compile({sym:_pCySym,sale_price:_prod.sale_price,price:_prod.price});
                    }else{
                        _priceHTML=_pCySym + _prod.price;
                    }
                    _divDetail.querySelector('.embed-price--show').innerHTML=_priceHTML;
                }else{
                    qasDiv.remove();
                }
            });
        },
        bioCtmProd:function (item,prodDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-digital item-ctmprod ' + item.subtype;
            _divBox.className='graphext-box embed-graphext';
            _div.appendChild(_divBox);
            _divDetail.className='item-block embed-graphext-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#'+item.subtype);
            _this._prods.ids.push(item.path);
            _divDetail.innerHTML=tmpl.Compile({btntext:item.title||'',display:isEmpty(item.title)?'hidden':'',image:clearImage(item.image),subtitle:item.subtitle||'',path:item.path||'',id:item.id||'',
                lnkid:__data.bio.id,nodeName:isEmpty(item.title)?'button':'div'});
            prodDiv.append(_div);
            _this._loadGoodsEnd().then(function () {
                var _prod=_this._filterGoods(item.path,_this._prods.goods);
                if(_prod){
                    _divDetail.dataset.prod=encodeURIComponent(JSON.stringify(_prod));
                    _divDetail.querySelector('.embed-event-title').innerHTML=_prod.title;
                    if(_prod.description){
                        _divDetail.querySelector('.event-desc').innerHTML=_prod.description;
                    }else{
                        _divDetail.querySelector('.embed-event-detail--left').classList.add('hidden');
                    }
                    var _pCySym=_getCySym(),_priceHTML='';
                    if(_prod.sale_price){
                        _priceHTML= '<span>{sym}{sale_price}</span><span>{sym}{price}</span>'.Compile({sym:_pCySym,sale_price:_prod.sale_price,price:_prod.price});
                    }else{
                        _priceHTML=_pCySym + _prod.price;
                    }
                    _divDetail.querySelector('.embed-price--show').innerHTML=_priceHTML;
                }else{
                    prodDiv.remove();
                }
            });
        },
        bioSubsUI:function(item,subsDiv){
            var _this=this,__form=JSON.parse(item.text||'{}'),eleId=item.id;
            subsDiv.querySelector('.form-title .data-field').innerHTML=__form.title||'';
            subsDiv.querySelector('.form-button .data-field').innerHTML=__form.submit.btn_text||'';
            let thanksTxt=__form.submit.thanks_text,thanksTxt0=gettext('Thanks for subscribing!');
            subsDiv.querySelector('.form-thanks span').innerHTML=thanksTxt||thanksTxt0;
            var _fieldsGroup=subsDiv.querySelector('.form-fields-group');
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
            Array.from(subsDiv.querySelectorAll('.form-field-phone')).forEach(function (ele,i){
                v('click',function (e) {
                    var _select=ep(e.target,'.form-field-phone').querySelector('.dial-code-select');
                    if(_select.style.display=='block'){
                        _select.style.display='none';
                    }else{
                        _select.style.display='block';
                    }
                },ele.querySelector('.dial-code'));
                v('click',function (e) {
                    if(ep(e.target, 'ul').querySelector('.selected')) ep(e.target, 'ul').querySelector('.selected').classList.remove('selected');
                    var _li=ep(e.target, 'li');
                    _li.classList.add('selected');
                    ep(e.target,'.form-field-phone').querySelector('.dial-code span').innerText=_li.dataset.dial;
                    ep(e.target, '.dial-code-select').style.display='none';
                },ele.querySelector('.dial-code-select ul'))
            });
        },
        bioContact:function (item,contactDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-contact ' + item.subtype;
            _divBox.className='graphext-box contact-box embed-graphext';
            _div.appendChild(_divBox);
            _divDetail.className='item-block embed-graphext-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#'+item.subtype),_ctVard=JSON.parse(item.text||'{}'),subtitle='';
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
                            tag='Address'
                            lnk.link='https://www.google.com/maps/search/' + lnk.link;
                        }else{
                            lnk.link=checkLink(lnk.link,1);
                            lnkTxt=lnk.title||lnkTxt;
                        }
                        lnksHtml+=_lnkTmpl.Compile({link:lnk.link,tag:tag,linkTxt:lnkTxt});
                    }
                });
            }
            _divDetail.innerHTML=tmpl.Compile({btntext:gettext("Save contact"),coverDisplay:isEmpty(_ctVard.cover)?'hidden':'',companyLogo:clearImage(_ctVard.companyLogo),
                cover:clearImage(_ctVard.cover),username:_ctVard.username||'',clDisplay:_ctVard.clDisplay,note:_ctVard.note||'',subtitle:subtitle,linkHtml:lnksHtml,id:item.id||'',cType:'block',
                });
            contactDiv.append(_div);
            if(_ctVard.username){
            }else{
                contactDiv.remove();
            }
        },
        bioFAQs:function (item,faqsDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-faqs ' + item.subtype;
            _divBox.className='graphext-box faqs-box embed-graphext';
            _div.appendChild(_divBox);
            _divDetail.className='item-block embed-graphext-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#cmpt-faqs');
            let itemsHtml='',_itemTmpl=getTmplInnerHtml('#faqsItemTmpl');
            if(item.subs&&item.subs.length>0){
                item.subs.forEach(function (aq) {
                    itemsHtml+=_itemTmpl.Compile({question:aq.title,answer:(aq.desc||'').replace(/(\r\n)|\n/g, '<br>')});
                });
                _divDetail.innerHTML=tmpl.Compile({title:item.title,desc:item.desc,titleDisplay:isEmpty(item.title)?'hidden':'',descDisplay:isEmpty(item.desc)?'hidden':'',
                    itemsHtml:itemsHtml});
                faqsDiv.append(_div);
            }else{
                faqsDiv.remove();
            }
        },
        bioMenu:function (item,menuDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-menu ' + item.subtype;
            _divBox.className='graphext-box menu-box';
            _div.appendChild(_divBox);
            _divDetail.className='embed-graphext-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#cmpt-menu');
            let secHtml='',itemsHtml='',_itemTmpl=getTmplInnerHtml('#menuItemTmpl'),_secTmpl=getTmplInnerHtml('#menuSectionTmpl'),
                itemCnt=0,_pCySym=_getCySym();
            if(item.subs&&item.subs.length>0){
                item.subs.forEach(function (section) {
                    if(section.state==1){
                        itemCnt++;
                        itemsHtml='';
                        if(section.items&&section.items.length>0){
                            section.items.forEach(function (menu) {
                                itemCnt++;
                                let _vMenu=JSON.parse(menu.text||'{}'),variantsHtml='';
                                if(!isEmpty(_vMenu.title)&&_vMenu.price){
                                    if(_vMenu.price.mVariants){
                                        _vMenu.price.variants.forEach(function (v) {
                                            variantsHtml+='<li><span>{0}</span><span>{1}{2}</span></li>'.Format(v.name,_pCySym,(v.amount/100.0).toFixed(2));
                                        });
                                    }else{
                                        variantsHtml=`<li><span>{0}{1}</span></li>`.Format(_pCySym,(_vMenu.price.amount/100.0).toFixed(2));
                                    }
                                    itemsHtml+=_itemTmpl.Compile({title:_vMenu.title,note:(_vMenu.desc||'').replace(/(\r\n)|\n/g, '<br>'),image:clearImage(_vMenu.image),variantsHtml:variantsHtml});
                                }
                            });
                        }
                        secHtml+=_secTmpl.Compile({title:section.title,desc:(section.desc||'').replace(/(\r\n)|\n/g, '<br>'),titleDisplay:isEmpty(section.title)?'hidden':'',descDisplay:isEmpty(section.desc)?'hidden':'',
                            itemsHtml:itemsHtml});
                    }
                });
                _divDetail.innerHTML=tmpl.Compile({title:item.title,desc:item.desc,titleDisplay:isEmpty(item.title)?'hidden':'',descDisplay:isEmpty(item.desc)?'hidden':'',
                secHtml:secHtml,moreDisplay:itemCnt>=5?'':'hidden',hasMore:itemCnt>=5?'hasMore':''});
                menuDiv.append(_div);
            }else{
                menuDiv.remove();
            }
        },
        bioTeam:function (item,teamDiv){
            var _div=d.createElement('div'),_this=this,_divBox=d.createElement('div'),_divDetail=d.createElement('div');
            _div.className='item-team ' + item.subtype;
            _divBox.className='graphext-box team-box';
            _div.appendChild(_divBox);
            _divDetail.className='embed-graphext-bg';
            _divBox.appendChild(_divDetail);
            var tmpl=getTmplInnerHtml('#cmpt-team');
            let itemsHtml='',_itemTmpl=getTmplInnerHtml('#teamItemTmpl'),_tmpl=getTmplInnerHtml('#teamItemSocialTmpl');
            if(item.subs&&item.subs.length>0){
                item.subs.forEach(function (aq) {
                    let _vCard=JSON.parse(aq.text||'{}'),linksHtml='';
                    (_vCard.links||[]).forEach(function (ele,idx) {
                        ele.lid=_this.options.lid;
                        ele.link1=checkLink(ele.link,1);
                        ele.link=encodeURI(ele.link);
                        ele.image = (ele.type==0)?clearImage(ele.image):('https://bio.linkcdn.cc/bio/links/icons/0123/{0}_1.png'.Format(ele.type));
                        ele.iconfont = ele.type==0?'':'icon-social-'+ele.type;
                        ele.iconfont1 = ele.type==0?'':'icon-social-6-'+ele.type;
                        ele.iconfont2 = ele.type==0?'':'icon-social-'+ele.type;
                        ele.displayImg = ele.type==0?'block':'';
                        ele.displayIcon = ele.type==0?'hidden':'';
                        ele.target=ele.link1.startsWith('javascript')?'_self':'_blank';
                        linksHtml+=_tmpl.Compile(ele);
                    });
                    if(_vCard.verified){
                        if(_vCard.verified.indexOf('_username')>-1){
                            _vCard.decoVerified='';
                            _vCard.decoUnVerified='deco-verified verified-'+_vCard.verified.replace('_username', '');
                        }else{
                            _vCard.decoVerified='deco-verified verified-'+_vCard.verified;
                            _vCard.decoUnVerified='';
                        }
                    }
                    itemsHtml+=_itemTmpl.Compile({username:_vCard.username,note:(_vCard.desc||'').replace(/(\r\n)|\n/g, '<br>'),jobTitle:_vCard.jobTitle,positionDisplay:isEmpty(_vCard.jobTitle)?'hidden':'',
                        profile:clearImage(_vCard.profile),linksHtml:linksHtml,decoVerified:_vCard.decoVerified,decoUnVerified:_vCard.decoUnVerified});
                });
                _divDetail.innerHTML=tmpl.Compile({title:item.title,desc:item.desc,titleDisplay:isEmpty(item.title)?'hidden':'',descDisplay:isEmpty(item.desc)?'hidden':'',
                    itemsHtml:itemsHtml});
                teamDiv.append(_div);
            }else{
                teamDiv.remove();
            }
        },
    };
    (function(){
        var _renderBioCmpt=function(){
            __data.ppset=__data.ppset||{};
            __data.bio.other=__data.bio.other||{};
            if(typeof __data.bio.other == 'string') __data.bio.other=JSON.parse(__data.bio.other);
            
            var _cmpt=new RenderBioCmpt(__data.content.cmpts,__data.content.orders,'section .center .content-list',{part:__data.bio.part,lid:__data.bio.id,from:'home',state:__data.state});
            _cmpt.renderUI();
            __loaded=true;
        }
        function _renderBasicProfile(profile, coverCls) {
            if(coverCls=='bannerCover'){
                d.querySelector('.page-cover').classList.add('banner-cover');
            }
            if(profile){
                var avatar=d.querySelector('.avatar img');
                avatar.src=clearImage(profile);
                if(__data.ui.fee==1&&__data.ui.verified.indexOf('_username')==-1){
                    d.querySelector('.avatar').classList.add('verified', 'verified-'+__data.ui.verified.split('.')[0]);
                }
            }else{
                // d.querySelector('.avatar').style.display='none';
                d.querySelector('.avatar').classList.add('hidden');
            }
        }
        function _renderBasicCover(cover){
            if(cover){
                let pageApp=d.querySelector('.page-app'),pageAppBg=d.querySelector('.page-app-bg');
                if(pageApp) pageApp.classList.add('bg-color');
                if(pageAppBg){
                    pageAppBg.classList.add('bg-color');
                    pageAppBg.style='--cover-bg-image:url({0})'.Format(clearImage(cover));
                }
                let coverBg=d.querySelector('.cover--bg');
                coverBg.classList.remove('hidden');
                coverBg.style='--cover-bg-image:url({0})'.Format(clearImage(cover));
                d.querySelector('.cover--bg img').src=clearImage(cover);
            }
        }
        var renderBioLink=function(){
            if(__data.bio.part==1){
                __data.ui.verified=__data.ui.verified||'';
                __data.ui.extra=__data.ui.extra||{};
                let {logo, profile, cover} = __data.ui.extra;
                logo=__data.ui.logo;
                if(!profile&&!cover){
                    profile=logo;cover=logo;
                }
                let verified=__data.ui.verified.split('.');
                if(verified.length==0) verified.push('');
                if(verified.length==1) verified.push('');
                if(verified[1]=='banner'){
                    d.querySelector('.avatar').style.display='none';
                    _renderBasicCover(cover);
                }else if(verified[1]=='bannerCover'){
                    _renderBasicCover(cover);
                    _renderBasicProfile(profile, verified[1]);
                }else{
                    _renderBasicProfile(profile);
                }
                d.querySelector('.text h3').innerHTML=`<span>{0}</span>`.Format((__data.ui.title||'').replace(/(\r\n)|\n/g, '<br>'));
                if(__data.ui.title&&__data.ui.fee==1&&(__data.ui.verified.indexOf('_username')>0||
                    verified[1]=='banner')){
                    d.querySelector('.text h3').innerHTML+='<span class="verified verified-'+verified[0].replace('_username', '')+'"></span>';
                }
                d.querySelector('.text .desc span').innerHTML=(__data.ui.desc||'').replace(/(\r\n)|\n/g, '<br>');

                if(__data.gstag.linkShare==1){
                    var _shareTmpl=`<div class="link-share--cover"><img src="{0}"></div> <div class="link-share--title txt-ellipsis-one"><p class="txt-ellipsis-one">{1}</p></div><div class="link-share--button">
                <button toggle="share" action="share">{2}</button>
            </div>`;
                    d.querySelector('.link-share-box').innerHTML=_shareTmpl.Format(clearImage(__data.ui.logo),__data.ui.title||'',getTmplInnerHtml('#shareSVG'));
                    var ticking=false;
                    window.addEventListener('scroll', function (e) {
                        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                        if(scrollTop>=40&&!ticking){
                            ticking=true;
                            document.querySelector('.link-share-box').classList.add('active');
                        }else if(scrollTop < 30){
                            if(ticking){
                                ticking=false;
                                document.querySelector('.link-share-box').classList.remove('active');
                            }
                        }
                    })
                }
            }
            if(__data.vt){
                var _urlJSON='https://bio.linkcdn.cc/upload/lnkcmpts/{0}.json?lnkcmpt={1}'.Format(__data.bio.id,__data.vt);
                ibjax('GET', _urlJSON,{fn:function (resp){
                    resp = JSON.parse(resp);
                    __data.content={
                        cmpts:JSON.parse(resp.cmpts||'[]'),
                        orders:JSON.parse(resp.orders||'[]')
                    };
                    __data.ppset=JSON.parse(resp.ppset||'{}');
                    _renderBioCmpt();
                },errfn:function(){__loaded=true;console.log('error')}});
            }else{
                _renderBioCmpt();
            }
        },oldWinLoad=null;
        if(window.onload&&(typeof window.onload=='function')){
            oldWinLoad=window.onload;
            window.onload=function () {
                oldWinLoad();
            }
        }
        function renderContentWarning(warn){
            if(warn){
                var _warn=d.createElement('div');
                _warn.className='content-warning';
                var _ctxWarnHTML=`<div class="cw-bg">
        <div class="cw-bg-inner"></div>
    </div>
    <div class="content-warning-inner">
                    <div class="content-warning-icon"><svg version="1.1" width="48" height="48" viewBox="0 0 48 48"><g><g style="opacity:0;"><rect x="0" y="0" width="48" height="48" rx="0" fill="#FFFFFF" fill-opacity="1"/></g><g><path d="M9.4123096875,6.56248779296875C8.6248096875,5.77498779296875,7.3498096875000005,5.77498779296875,6.5623046875,6.56248779296875C5.7748046875,7.3499927929687505,5.7748046875,8.62499279296875,6.5623046875,9.41249279296875L17.812279687500002,20.66246279296875C15.9747796875,24.07496279296875,17.249779687500002,28.31246279296875,20.6622796875,30.14996279296875C22.7247796875,31.27496279296875,25.2372796875,31.27496279296875,27.2997796875,30.14996279296875L38.5497796875,41.39996279296875C39.3372796875,42.18746279296875,40.6122796875,42.18746279296875,41.3622796875,41.39996279296875C42.1497796875,40.61246279296875,42.1497796875,39.33746279296875,41.3622796875,38.58746279296875L9.4123096875,6.56248779296875ZM23.9997796875,26.99996279296875C22.3497796875,26.99996279296875,20.999779687500002,25.64996279296875,20.999779687500002,23.99996279296875L20.999779687500002,23.84996279296875L24.1122796875,26.96246279296875L23.9997796875,26.99996279296875Z" fill="#FFFFFF" fill-opacity="1"/></g><g><path d="M24.44985234375,34.012529296875C15.86235234375,34.200029296875,10.19990234375,26.850029296875,8.43740234375,24.000029296875C9.67490234375,22.012529296875,11.21240234375,20.175029296875,12.89990234375,18.562539296875002L10.01240234375,15.750039296875C7.76240234375,17.887539296875,5.81240234375,20.325029296875,4.27490234375,23.025029296874997C3.89990234375,23.662529296875,3.89990234375,24.412529296875,4.27490234375,25.012529296875C5.54990234375,27.187529296875,12.26240234375,38.025029296875005,24.03745234375,38.025029296875005L24.52485234375,38.025029296875005C26.73745234375,37.950029296875,28.91245234375,37.500029296875,30.97495234375,36.675029296874996L27.82495234375,33.525029296875005C26.73745234375,33.787529296875,25.57485234375,33.975029296875,24.44985234375,34.012529296875ZM43.72495234375,22.987529296875C42.44995234375,20.775029296874997,35.39985234375,9.637539296875,23.43745234375,9.975038046875C21.22485234375,10.050038296875,19.04985234375,10.500038296875,16.98735234375,11.325039296875L20.13735234375,14.475039296875C21.26235234375,14.175039296875,22.38735234375,14.025039296875,23.54985234375,13.987539296875C32.137352343749995,13.762539296875,37.76235234375,21.150029296874997,39.56235234375,24.000029296875C38.28745234375,25.987529296875,36.74985234375,27.825029296875,34.98745234375,29.437529296875L38.02485234375,32.250029296875C40.31235234375,30.112529296875,42.26245234375,27.675029296875,43.83745234375,24.975029296875C44.13745234375,24.375029296875,44.13745234375,23.587529296874997,43.72495234375,22.987529296875Z" fill="#FFFFFF" fill-opacity="1"/></g></g></svg></div>
                    <div class="content-warning-title"> Sensitive Content</div>
                    <div class="content-warning-desc">Please acknowledge your consent to access potentially sensitive content on this profile</div>
                    <div class="content-warning-btn">
                        <button toggle="close" action="cw/mask/.content-warning" class="btn btn-primary btn-accept">{cwTip0}</button>
                        <a href="https://www.instabio.cc/en?utm_source=cw&utm_medium={warn}" class="btn btn-primary btn-decline">{cwTip1}</a>
                    </div>
    </div>`;
                var _cwTip0 = 'I Know',_cwTip1 = 'Go Back';
                if(warn.indexOf('plus') != -1){
                    _cwTip0="I'm over "+warn.replace('plus','');
                    _cwTip1="I'm under "+warn.replace('plus','');
                }
                _warn.innerHTML=_ctxWarnHTML.Compile({cwTip0:_cwTip0,cwTip1:_cwTip1,warn:warn});
                d.querySelector('.container').appendChild(_warn);
            }
        }
        lbasejs(window).then(function () {
            if(__data.other && __data.other.contentWarning){
                renderContentWarning(__data.other.contentWarning);
            }else{
                renderBioLink();
            }
        });
        window.onmessage=function(event){
            if(event.data.fn=='resizeFrame'&&event.data.type=='embedIframe'){//resizeFrame
                if(event.data.options.id){
                    d.querySelector('#{0} .iframe--box'.Format(event.data.options.id)).style.height=event.data.rect.height+'px';
                    var _loadingDom=d.querySelector('#{0} .embed-loading'.Format(event.data.options.id));
                    if(_loadingDom) _loadingDom.remove();
                }
            }
        }
        window.globalFN={
            pageInit:renderBioLink,
        };
    })();
}(document, 'script'));
