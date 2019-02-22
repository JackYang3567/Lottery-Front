<template>
  <div id="app">
            <article class="kd-container article promotion-article">
                <div class="kd-list two-cols earnings">
                    <dl class="item" v-for="item in get">
                        <dt class="kd-col">{{item.text}}</dt>
                        <dd class="kd-col">￥{{item.money}}</dd>
                    </dl>
                </div>

                <p><a href="#/My/promotion/details" class="kd-button go-to-referrals" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }"><span class="text">我的推广用户</span></a></p>
                <a  class="kd-badge js-promotion-link" align="center">{{url?'专属推广链接':'页面出错'}}</a>：
                    <br>
                    <template v-if="url">
                    <span class="copy" :data-clipboard-text="list" @click="copy">
                      <a href="javascript:;" class="js-promotion-link">
                        <!-- <i style="display:inline;">{{list}}</i> -->
                      </a><button class="kd-button kd-button-copy" :style="{ background: $store.state.basic.main_color,border: '1px solid ' + $store.state.basic.main_color }">点击复制链接</button>
                    </span>

                    <div id="qrcode" style="height:128px;width:128px;margin:0 auto;"></div>
                    </template>
                <p>&nbsp;</p>




                <div class="kd-sections">
                    <h5 style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-style: normal; font-variant: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
    推荐分成介绍</h5>
                    <p style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        “{{$store.state.basic.web_name}}”高分成三级金字塔代理模式介绍：</p>
                        <p>
                            <svg version="1.1" id="promotion" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 640 388" enable-background="new 0 0 640 388" xml:space="preserve">
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#EE4444" d="M379.592,42.374c-1.314,0-2.515-0.441-3.441-1.167L352.56,69.778
                v0.059h-0.048L352.377,70c-0.141-0.059-0.279-0.106-0.42-0.164h-63.051c-0.225,0.105-0.342,0.164-0.342,0.164l-0.135-0.164h-0.217
                v-0.262l-23.986-28.979c-0.967,0.917-2.317,1.489-3.815,1.489c-2.938,0-5.318-2.19-5.318-4.892s2.381-4.892,5.318-4.892
                c2.936,0,5.317,2.19,5.317,4.892c0,0.292-0.033,0.575-0.086,0.853l26.049,3.176l3.546-19.635c-2.54-0.369-4.483-2.386-4.483-4.826
                c0-2.702,2.381-4.892,5.318-4.892c2.937,0,5.317,2.19,5.317,4.892c0,1.281-0.539,2.442-1.415,3.315l20.497,17.405l20.496-17.405
                c-0.875-0.873-1.414-2.034-1.414-3.315c0-2.702,2.381-4.892,5.317-4.892s5.317,2.19,5.317,4.892c0,2.44-1.943,4.457-4.483,4.826
                l3.545,19.635l25.085-3.05c-0.035-0.227-0.06-0.456-0.06-0.691c0-2.702,2.381-4.892,5.318-4.892c2.936,0,5.316,2.19,5.316,4.892
                S382.527,42.374,379.592,42.374z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#EF7133" d="M379.592,119.706c-1.314,0-2.515-0.441-3.441-1.167L352.56,147.11
            v0.059h-0.048l-0.135,0.164c-0.141-0.059-0.279-0.106-0.42-0.164h-63.051c-0.225,0.105-0.342,0.164-0.342,0.164l-0.135-0.164h-0.217
            v-0.262l-23.986-28.979c-0.967,0.917-2.317,1.489-3.815,1.489c-2.938,0-5.318-2.19-5.318-4.892s2.381-4.892,5.318-4.892
            c2.936,0,5.317,2.19,5.317,4.892c0,0.292-0.033,0.575-0.086,0.853l26.049,3.176l3.546-19.635c-2.54-0.369-4.483-2.386-4.483-4.826
            c0-2.702,2.381-4.892,5.318-4.892c2.937,0,5.317,2.19,5.317,4.892c0,1.281-0.539,2.442-1.415,3.315l20.497,17.405l20.496-17.405
            c-0.875-0.873-1.414-2.034-1.414-3.315c0-2.702,2.381-4.892,5.317-4.892s5.317,2.19,5.317,4.892c0,2.44-1.943,4.457-4.483,4.826
            l3.545,19.635l25.085-3.05c-0.035-0.227-0.06-0.456-0.06-0.691c0-2.702,2.381-4.892,5.318-4.892c2.936,0,5.316,2.19,5.316,4.892
            S382.527,119.706,379.592,119.706z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#D0AD0B" d="M380.194,197.009c-1.314,0-2.514-0.439-3.441-1.166l-23.591,28.571
            v0.06h-0.048l-0.135,0.162c-0.141-0.058-0.279-0.105-0.42-0.162h-63.051c-0.225,0.104-0.342,0.162-0.342,0.162l-0.135-0.162h-0.217
            v-0.264l-23.986-28.978c-0.967,0.917-2.317,1.489-3.815,1.489c-2.938,0-5.318-2.19-5.318-4.893c0-2.702,2.381-4.892,5.318-4.892
            c2.936,0,5.317,2.19,5.317,4.892c0,0.291-0.033,0.575-0.086,0.853l26.049,3.176l3.546-19.635c-2.54-0.369-4.483-2.386-4.483-4.826
            c0-2.702,2.381-4.892,5.318-4.892c2.936,0,5.317,2.19,5.317,4.892c0,1.281-0.539,2.442-1.415,3.315l20.497,17.405l20.496-17.405
            c-0.875-0.873-1.414-2.034-1.414-3.315c0-2.702,2.381-4.892,5.317-4.892s5.317,2.19,5.317,4.892c0,2.44-1.943,4.457-4.483,4.826
            l3.545,19.635l25.085-3.05c-0.035-0.226-0.06-0.455-0.06-0.69c0-2.702,2.381-4.892,5.318-4.892c2.936,0,5.316,2.19,5.316,4.892
            C385.511,194.818,383.13,197.009,380.194,197.009z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#0EAB0E" d="M379.944,271.593c-1.314,0-2.515-0.44-3.441-1.166l-23.591,28.571
            v0.059h-0.048l-0.135,0.163c-0.141-0.059-0.279-0.106-0.42-0.163h-63.051c-0.225,0.104-0.342,0.163-0.342,0.163l-0.135-0.163h-0.217
            v-0.263l-23.986-28.979c-0.967,0.917-2.317,1.489-3.815,1.489c-2.938,0-5.318-2.19-5.318-4.893c0-2.701,2.381-4.892,5.318-4.892
            c2.936,0,5.317,2.19,5.317,4.892c0,0.292-0.033,0.575-0.086,0.853l26.049,3.177l3.546-19.635c-2.54-0.37-4.483-2.387-4.483-4.826
            c0-2.702,2.381-4.893,5.318-4.893c2.937,0,5.317,2.19,5.317,4.893c0,1.28-0.539,2.442-1.415,3.314l20.497,17.405l20.496-17.405
            c-0.875-0.872-1.414-2.034-1.414-3.314c0-2.702,2.381-4.893,5.317-4.893s5.317,2.19,5.317,4.893c0,2.439-1.943,4.456-4.483,4.826
            l3.545,19.635l25.085-3.05c-0.035-0.227-0.06-0.456-0.06-0.691c0-2.701,2.381-4.892,5.318-4.892c2.936,0,5.316,2.19,5.316,4.892
            C385.261,269.402,382.88,271.593,379.944,271.593z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#0EAB0E" d="M361.373,276.668c-0.93-0.799-2.151-1.197-3.666-1.197h-1.918v9.79
            h1.845c1.612,0,2.871-0.44,3.775-1.32c0.905-0.88,1.357-2.112,1.357-3.698C362.767,278.657,362.302,277.466,361.373,276.668z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#0EAB0E" d="M284.293,281.21c0.519-0.585,0.946-1.099,1.279-1.541l0.869,0.722
            c-0.383,0.459-0.864,0.979-1.443,1.558c0.426,0.454,0.798,0.863,1.115,1.229l-0.82,0.854c-0.454-0.602-0.995-1.255-1.624-1.96v6.731
            h-1.148v-7.24c-0.585,0.646-1.208,1.276-1.87,1.895c-0.12-0.427-0.273-0.902-0.459-1.427c1.782-1.487,3.127-3.11,4.035-4.871h-3.936
            v-1.196h5.379v1.229c-0.585,1.033-1.252,2.033-2,3.001v0.386C283.889,280.798,284.097,281.008,284.293,281.21z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#0EAB0E" d="M281.899,273.224l1.115-0.558c0.492,0.755,0.924,1.515,1.296,2.279
            l-1.181,0.591C282.812,274.848,282.402,274.076,281.899,273.224z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#1675BE" d="M380.144,347.459c-1.313,0-2.514-0.44-3.44-1.166l-23.591,28.571
            v0.059h-0.049l-0.134,0.163c-0.141-0.058-0.279-0.105-0.42-0.163h-63.052c-0.225,0.104-0.342,0.163-0.342,0.163l-0.135-0.163h-0.218
            v-0.263l-23.985-28.978c-0.967,0.917-2.318,1.488-3.815,1.488c-2.937,0-5.318-2.19-5.318-4.892c0-2.702,2.381-4.893,5.318-4.893
            c2.937,0,5.317,2.19,5.317,4.893c0,0.291-0.033,0.575-0.086,0.853l26.048,3.176l3.546-19.635c-2.54-0.369-4.483-2.386-4.483-4.826
            c0-2.701,2.381-4.892,5.318-4.892c2.936,0,5.317,2.19,5.317,4.892c0,1.281-0.539,2.442-1.415,3.315l20.498,17.405l20.494-17.405
            c-0.874-0.873-1.414-2.034-1.414-3.315c0-2.701,2.381-4.892,5.318-4.892c2.937,0,5.317,2.19,5.317,4.892
            c0,2.44-1.944,4.457-4.483,4.826l3.545,19.635l25.085-3.05c-0.035-0.227-0.06-0.455-0.06-0.69c0-2.702,2.381-4.893,5.317-4.893
            s5.317,2.19,5.317,4.893C385.461,345.269,383.08,347.459,380.144,347.459z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#1675BE" d="M283.465,356.241c0.532-0.599,0.968-1.124,1.31-1.578l0.89,0.739
            c-0.392,0.47-0.884,1.002-1.478,1.595c0.437,0.465,0.817,0.885,1.142,1.259l-0.839,0.874c-0.464-0.616-1.019-1.285-1.662-2.007
            v6.892h-1.175v-7.412c-0.599,0.66-1.237,1.307-1.914,1.939c-0.124-0.437-0.28-0.924-0.47-1.461c1.824-1.522,3.201-3.185,4.13-4.986
            h-4.029v-1.226h5.507v1.259c-0.599,1.058-1.282,2.082-2.048,3.073v0.395C283.05,355.819,283.263,356.035,283.465,356.241z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#1675BE" d="M281.014,348.065l1.142-0.571c0.503,0.772,0.946,1.551,1.326,2.334
            l-1.209,0.604C281.948,349.728,281.528,348.938,281.014,348.065z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#878E93" d="M124.868,89.538c-1.138,0-2.177-0.382-2.979-1.01L101.46,113.27
            v0.051h-0.042l-0.117,0.141c-0.121-0.05-0.241-0.091-0.363-0.141h-54.6c-0.195,0.091-0.297,0.141-0.297,0.141l-0.116-0.141h-0.188
            v-0.228L24.966,87.999c-0.837,0.793-2.007,1.289-3.304,1.289c-2.544,0-4.605-1.896-4.605-4.236s2.062-4.236,4.605-4.236
            c2.543,0,4.604,1.896,4.604,4.236c0,0.252-0.028,0.498-0.075,0.738l22.558,2.75l3.071-17.003c-2.199-0.32-3.883-2.066-3.883-4.179
            c0-2.34,2.062-4.237,4.605-4.237c2.543,0,4.604,1.897,4.604,4.237c0,1.109-0.467,2.115-1.225,2.87l17.75,15.072L91.42,70.229
            c-0.758-0.755-1.225-1.761-1.225-2.87c0-2.34,2.062-4.237,4.605-4.237c2.542,0,4.604,1.897,4.604,4.237
            c0,2.113-1.683,3.859-3.882,4.179l3.069,17.003l21.723-2.641c-0.03-0.196-0.051-0.395-0.051-0.599c0-2.339,2.061-4.236,4.604-4.236
            c2.543,0,4.604,1.897,4.604,4.236C129.473,87.641,127.411,89.538,124.868,89.538z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#878E93" d="M617.646,88.527c-1.128,0-2.158-0.379-2.955-1.002l-20.261,24.539
            v0.051h-0.042l-0.115,0.139c-0.121-0.049-0.24-0.09-0.36-0.139h-54.152c-0.193,0.09-0.294,0.139-0.294,0.139l-0.116-0.139h-0.187
            v-0.227l-20.601-24.888c-0.83,0.788-1.99,1.278-3.276,1.278c-2.522,0-4.567-1.881-4.567-4.201s2.045-4.202,4.567-4.202
            c2.521,0,4.566,1.881,4.566,4.202c0,0.25-0.028,0.494-0.073,0.732l22.372,2.728l3.045-16.864c-2.181-0.317-3.851-2.049-3.851-4.145
            c0-2.32,2.045-4.202,4.568-4.202c2.521,0,4.566,1.881,4.566,4.202c0,1.1-0.463,2.098-1.216,2.847l17.604,14.949l17.603-14.949
            c-0.751-0.749-1.215-1.747-1.215-2.847c0-2.32,2.045-4.202,4.568-4.202c2.521,0,4.566,1.881,4.566,4.202
            c0,2.096-1.67,3.828-3.851,4.145l3.044,16.864l21.545-2.619c-0.03-0.194-0.052-0.392-0.052-0.594c0-2.32,2.045-4.201,4.567-4.201
            s4.567,1.881,4.567,4.201C622.214,86.646,620.169,88.527,617.646,88.527z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#778187" d="M313.558,78.046h12.776v4.667h-12.776V78.046z M313.558,72.842
            h12.776v2.875h-12.776V72.842z M313.675,84.63h12.649v12.315h2.727l-8.723,13.135l-9.378-13.135h2.726V84.63z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#778187" d="M314.559,154.537h12.775v4.667h-12.775V154.537z M314.559,149.333
            h12.775v2.875h-12.775V149.333z M314.676,161.121h12.648v12.315h2.727l-8.723,13.135l-9.379-13.135h2.727V161.121z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#778187" d="M313.559,231.84h12.775v4.666h-12.775V231.84z M313.559,226.636
            h12.775v2.874h-12.775V226.636z M313.676,238.424h12.648v12.314h2.727l-8.723,13.135l-9.379-13.135h2.727V238.424z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#778187" d="M314.559,305.84h12.775v4.666h-12.775V305.84z M314.559,300.636
            h12.775v2.874h-12.775V300.636z M314.676,312.424h12.648v12.314h2.727l-8.723,13.135l-9.379-13.135h2.727V312.424z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#778187" d="M92.688,53.166L76.895,70.314C77.579,71.068,78,72.067,78,73.166
            c0,2.348-1.903,4.25-4.25,4.25s-4.25-1.902-4.25-4.25c0-2.347,1.903-4.25,4.25-4.25c0.517,0,1.01,0.097,1.468,0.266l16.296-17.693
            l0.585,0.539v-0.861h181.65v2H92.688z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#778187" d="M547.562,53.5l15.794,17.148c-0.685,0.754-1.105,1.753-1.105,2.852
                c0,2.348,1.902,4.25,4.25,4.25s4.25-1.902,4.25-4.25c0-2.347-1.902-4.25-4.25-4.25c-0.517,0-1.01,0.097-1.468,0.266l-16.297-17.693
                l-0.585,0.539V51.5H366.5v2H547.562z"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" fill="#778187" d="M207.832,216.931h-1.142v21.855h-71.842v27.657h71.842v21.805 h2.108v-0.037h68.599v-2.024h-68.599v-19.743h31.978v-27.657h-31.978v-19.914h73.342v-2.024h-74.309V216.931z M238.612,240.985 v23.628H137.023v-23.628H238.612z M207.832,61.099h-1.142v21.854h-71.842v27.659h71.842v21.805h2.108v-0.037h64.382v-2.024 h-64.382v-19.744h31.978V82.953h-31.978V63.04h73.342v-2.024h-74.309V61.099z M238.612,85.154v23.626H137.023V85.154H238.612z M207.832,139.015h-1.142v21.855h-71.842v27.658h71.842v21.804h2.108v-0.038h64.382v-2.023h-64.382v-19.743h31.978V160.87h-31.978 v-19.914h73.342v-2.024h-74.309V139.015z M238.612,163.07v23.626H137.023V163.07H238.612z M207.832,294.51h-1.142v21.854h-71.842 v27.659h71.842v21.805h2.108v-0.037h68.599v-2.024h-68.599v-19.743h31.978v-27.659h-31.978v-19.912h73.342v-2.023h-74.309V294.51z M238.612,318.565v23.626H137.023v-23.626H238.612z M371.358,203.284v2.023h59.3v-0.035h1.142v-46.849h57.196v-27.659H431.8 v-66.18h-2.109v0.069H356.35v2.023h73.341v64.087h-57.515v27.659h57.515v44.86H371.358z M373.788,157.083v-25.13h113.635v25.13 H373.788z M502.858,208.006V57.839h-2.107v0.069H362.06v2.024h138.691v148.074h-57.517v27.659h57.517v43.85H371.798v2.023h129.92 v-0.035h1.141v-45.838h57.196v-27.659H502.858z M558.481,234.323H444.848v-25.13h113.634V234.323z"></path>
                                <text transform="matrix(1 0 0 1 284.0034 59.6328)" fill="#FFFFFF" font-family="&#39;MicrosoftYaHei&#39;" font-size="20">推荐人A</text>
                                <text transform="matrix(1 0 0 1 280.1924 134.8335)" fill="#FFFFFF" font-family="&#39;MicrosoftYaHei&#39;" font-size="18">被推荐人B</text>
                                <text transform="matrix(1 0 0 1 280.1924 211.834)" fill="#FFFFFF" font-family="&#39;MicrosoftYaHei&#39;" font-size="18">被推荐人C</text>
                                <text transform="matrix(1 0 0 1 279.1934 287.332)" fill="#FFFFFF" font-family="&#39;MicrosoftYaHei&#39;" font-size="18">被推荐人D</text>
                                <text transform="matrix(1 0 0 1 280.1934 362.666)" fill="#FFFFFF" font-family="&#39;MicrosoftYaHei&#39;" font-size="18">被推荐人E</text>
                                <text transform="matrix(1 0 0 1 42.1489 105.8066)" fill="#FFFFFF" font-family="&#39;MicrosoftYaHei&#39;" font-size="18.5102">推荐人F</text>
                                <text transform="matrix(1 0 0 1 534.1484 102.8066)" fill="#FFFFFF" font-family="&#39;MicrosoftYaHei&#39;" font-size="18.5102">推荐人G</text>
                                <text transform="matrix(1 0 0 1 382.3369 149.333)" font-family="&#39;MicrosoftYaHei&#39;" font-size="15.0426">打码抽成{{backwater[1]}}%</text>
                                <text transform="matrix(1 0 0 1 450.3369 226.6357)" font-family="&#39;MicrosoftYaHei&#39;" font-size="15.0426">打码抽成{{backwater[2]}}%</text>
                                <text transform="matrix(1 0 0 1 139.4307 101.8066)" font-family="&#39;MicrosoftYaHei&#39;" font-size="14">打码抽成{{backwater[0]}}%</text>
                                <text transform="matrix(1 0 0 1 139.4307 179.8066)" font-family="&#39;MicrosoftYaHei&#39;" font-size="14">打码抽成{{backwater[0]}}%</text>
                                <text transform="matrix(1 0 0 1 138.9307 257.3066)" font-family="&#39;MicrosoftYaHei&#39;" font-size="14">打码抽成{{backwater[0]}}%</text>
                                <text transform="matrix(1 0 0 1 139.6865 335.625)" font-family="&#39;MicrosoftYaHei&#39;" font-size="14">打码抽成{{backwater[0]}}%</text>
                            </svg>
                        </p>


                    <!-- <p style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        <img src="../../../../assets/images/20171112154822.png"></p> -->
                    <p style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        如何推广？</p>
                    <ol style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        <li>
                            注册成为公司会员</li>
                        <li>
                            会员中心</li>
                        <li>
                            代理推广</li>
                        <li>
                            复制专属推广链接，然后分享给你的朋友。</li>
                    </ol>
                    <p style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        &nbsp;</p>
                    <p style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        推广比例分成：</p>
                    <ol style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        <li>
                            如A推荐B成为公司有效会员后A可获得B产生有效打码量的{{backwater[0]}}%提成。</li>
                        <li>
                            B推荐C成为公司有效会员后B可获得C产生有效打码量的{{backwater[0]}}%提成,，A可获得C产生有效打码量的{{backwater[1]}}%提成。</li>
                        <li>
                            C推荐D成为公司有效会员后C可获得D产生有效打码量的{{backwater[0]}}%提成,，A可获得D产生有效打码量的{{backwater[2]}}%提成，B可获得D产生有效打码量的{{backwater[1]}}%提成。</li>
                        <li>
                            D推荐E成为公司有效会员后D可获得E产生有效打码量的{{backwater[0]}}%提成,，B可获得E产生有效打码量的{{backwater[2]}}%提成。C可获得E产生有效打码量的{{backwater[1]}}%提成。</li>
                        <li>
                            此代理模式为三层关系,即A推荐B、B推荐C、C推荐D、A到D三者之间有存在推广分红，D推荐E，则E跟A不存在推广分红关系，但E跟B仍存在推广分红关系!</li>
                    </ol>
                    <p style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        &nbsp;</p>
                    <p style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        举个例子，如：B、C、D三个有效会员当天产生有效打码各100万, A即可获得B、C、D打码分红如下:</p>
                    <ul style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        <li>
                            B会员打码100万*{{backwater[0]}}%={{ (1000000/100*backwater[0]).toFixed(2) }}</li>
                        <li>
                            C会员打码100万*{{backwater[1]}}%={{ (1000000/100*backwater[1]).toFixed(2) }}</li>
                        <li>
                            D会员打码100万*{{backwater[2]}}%={{ (1000000/100*backwater[2]).toFixed(2) }}</li>
                    </ul>
                    <p style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        既 A 总获得分红<strong>{{ ((1000000/100*backwater[0])+(1000000/100*backwater[1])+(1000000/100*backwater[2])).toFixed(2) }}</strong>,以此类推!</p>
                    <p style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        &nbsp;</p>
                    <p style="color: rgb(0, 0, 0); font-family: &#39;Times New Roman&#39;; font-size: medium; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
                        <span style="color: rgb(255, 0, 0);"><strong class="important">注：</strong></span>如发现会员与多个账号,或者与其他平台进行对打，产生非法打码，将取消推广分红资格并且没收一切彩金包含本金!</p>
                </div>

                <div class="kd-sections"></div>
            </article>

      </div>
</template>

<script>
import Clipboard from 'clipboard';
import QRCode from 'qrcodejs2';
  export default{
    mounted(){

      this.$store.state.title = '代理推广';    //标题
      this.getUrl();

    },
    data () {
      return {
        url:'',
        user:'u',
        list:'正式会员才能推广',
        get:{
          today:{text:'今日收益',money:0},//今日收益
          yesterday:{text:'昨日收益',money:0},//昨日收益
          past:{text:'30天总收益',money:0},//过往收益
        },
        backwater:['...','...','...'],
      }
    },
    methods:{
      getUrl(){
        let _this = this;
        _this.$getData({
          loading:true,
          url:'/api/home/in/setUp',
          type:'post',
          data:{type:'promote_url_Or_backwater'},
          callback:function(res){
            if(res){
              _this.url = res.url;
              _this.$set(_this,'backwater',res.backwater);
              _this.getData();
            }
          }
          });
      },
      getData(){
        var _this = this;
        _this.$getData({
          loading:true,
          url:'/api/home/my/extension',
          type:'post',
          data:{type:1},
          callback:function(res){
            if(res.user){
              _this.user = res.user;
              let ishttps = ('https:' == document.location.protocol) ? 'https:': 'http:';
              _this.list = ishttps +"//"+_this.url+"/#/in/register/"+res.user;
              _this.makeCode(_this.list);
            }
            // console.log(123);
            if(res.code < 0){
              _this.$total({ message: res.msg,type: 2 });
              _this.$router.back();
            }else{
              for(let i in res.data){
                _this.get[i]['money'] = res.data[i];
              }

            }
          }
        });
      },
      makeCode (val) {
          new QRCode('qrcode', {
              text: val,
              width: 128,
              height: 128,
              colorDark : "#000000",//前景色
              colorLight : "#ffffff",//背景色
              correctLevel : QRCode.CorrectLevel.H//容错级别默认H
          });
      },
      copy() {
        let clipboard = new Clipboard('.copy')
        ,_this = this;
        clipboard.on('success', e => {
          _this.$total({ message:'成功复制',duration:1000,type: 1 });
          // 释放内存
          clipboard.destroy();
        })
        clipboard.on('error', e => {
          _this.$total({ message:'该浏览器不支持自动复制',duration:1000,type: 0 });
          // 释放内存
          clipboard.destroy();
        })
      },
    }
  }
</script>

<style scoped>
.kd-button-copy{
  padding:0.2rem .625rem;
  max-width:160px;
  display:block;
  margin:3px auto;
}
</style>
