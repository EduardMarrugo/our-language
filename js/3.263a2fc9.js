(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"713b":function(e,a,s){"use strict";s.r(a);var t=function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("q-layout",{attrs:{view:"lHh Lpr lFf"}},[s("q-header",{attrs:{elevated:""}},[s("q-toolbar",{staticClass:"bg-light-blue-4"},[s("q-avatar",[s("q-icon",{attrs:{name:"developer_mode"}})],1),s("q-toolbar-title",[e._v(" "+e._s(e.$t("lenguaje"))+" ")]),s("q-btn-toggle",{attrs:{flat:"",color:"white","toggle-color":"lime-13",options:[{label:"EN",value:"en-us"},{label:"ES",value:"es"},{label:"FR",value:"fr"},{label:"JA",value:"ja"}]},on:{input:e.setLocale},model:{value:e.locale,callback:function(a){e.locale=a},expression:"locale"}})],1)],1),s("q-page-container",{staticClass:"bg-grey-1"},[s("router-view",{staticStyle:{"margin-top":"-50px"}})],1)],1)},n=[],l=(s("e260"),s("d3b7"),s("e6cf"),s("3ca3"),s("ddb0"),{data:function(){return{locale:this.$q.lang.isoName}},methods:{setLocale:function(e){var a=this;this.$i18n.locale=e,s("8488")("./".concat(e)).then((function(e){var s=e.default;a.$q.lang.set(s)}))}}}),c=l,o=s("2877"),r=s("4d5a"),f=s("e359"),j=s("65c6"),i=s("cb32"),b=s("0016"),d=s("6ac5"),u=s("6a67"),h=s("09e3"),v=s("eebe"),g=s.n(v),p=Object(o["a"])(c,t,n,!1,null,null,null);a["default"]=p.exports;g()(p,"components",{QLayout:r["a"],QHeader:f["a"],QToolbar:j["a"],QAvatar:i["a"],QIcon:b["a"],QToolbarTitle:d["a"],QBtnToggle:u["a"],QPageContainer:h["a"]})},8488:function(e,a,s){var t={"./":["a6d8",3,0],"./ar":["13ef",9,0],"./ar.js":["13ef",9,0],"./az-latn":["4336",9,0],"./az-latn.js":["4336",9,0],"./bg":["a6b2",9,0],"./bg.js":["a6b2",9,0],"./ca":["8378",9,0],"./ca.js":["8378",9,0],"./cs":["5ddc",9,0],"./cs.js":["5ddc",9,0],"./da":["d3e4",9,0],"./da.js":["d3e4",9,0],"./de":["215a",9,0],"./de.js":["215a",9,0],"./el":["83bc",9,0],"./el.js":["83bc",9,0],"./en-gb":["17f5",9,0],"./en-gb.js":["17f5",9,0],"./en-us":["1f91",9],"./en-us.js":["1f91",9],"./eo":["b25b",9,0],"./eo.js":["b25b",9,0],"./es":["df1a",9,0],"./es.js":["df1a",9,0],"./et":["c3ad",9,0],"./et.js":["c3ad",9,0],"./fa":["a0f3",9,0],"./fa-ir":["b67a",9,0],"./fa-ir.js":["b67a",9,0],"./fa.js":["a0f3",9,0],"./fi":["10c0",9,0],"./fi.js":["10c0",9,0],"./fr":["34fe",9,0],"./fr.js":["34fe",9,0],"./gn":["3c87",9,0],"./gn.js":["3c87",9,0],"./he":["36eb",9,0],"./he.js":["36eb",9,0],"./hr":["007f",9,0],"./hr.js":["007f",9,0],"./hu":["a9af",9,0],"./hu.js":["a9af",9,0],"./id":["7e40",9,0],"./id.js":["7e40",9,0],"./index":["a6d8",3,0],"./index.json":["a6d8",3,0],"./is":["e41d",9,0],"./is.js":["e41d",9,0],"./it":["a745",9,0],"./it.js":["a745",9,0],"./ja":["5521",9,0],"./ja.js":["5521",9,0],"./km":["726e",9,0],"./km.js":["726e",9,0],"./ko-kr":["187f",9,0],"./ko-kr.js":["187f",9,0],"./kur-ckb":["d9db",9,0],"./kur-ckb.js":["d9db",9,0],"./lu":["1ee2",9,0],"./lu.js":["1ee2",9,0],"./lv":["004e",9,0],"./lv.js":["004e",9,0],"./ml":["c454",9,0],"./ml.js":["c454",9,0],"./ms":["bf26",9,0],"./ms.js":["bf26",9,0],"./nb-no":["dacc",9,0],"./nb-no.js":["dacc",9,0],"./nl":["8cf4",9,0],"./nl.js":["8cf4",9,0],"./pl":["700f",9,0],"./pl.js":["700f",9,0],"./pt":["37ed",9,0],"./pt-br":["f476",9,0],"./pt-br.js":["f476",9,0],"./pt.js":["37ed",9,0],"./ro":["fecf",9,0],"./ro.js":["fecf",9,0],"./ru":["14c0",9,0],"./ru.js":["14c0",9,0],"./sk":["15e6",9,0],"./sk.js":["15e6",9,0],"./sl":["5e5a",9,0],"./sl.js":["5e5a",9,0],"./sr":["78dc",9,0],"./sr.js":["78dc",9,0],"./sv":["7107",9,0],"./sv.js":["7107",9,0],"./ta":["3572",9,0],"./ta.js":["3572",9,0],"./th":["c9b0",9,0],"./th.js":["c9b0",9,0],"./tr":["c1a5",9,0],"./tr.js":["c1a5",9,0],"./ug":["c290",9,0],"./ug.js":["c290",9,0],"./uk":["6464",9,0],"./uk.js":["6464",9,0],"./vi":["1fb0",9,0],"./vi.js":["1fb0",9,0],"./zh-hans":["bf69",9,0],"./zh-hans.js":["bf69",9,0],"./zh-hant":["db10",9,0],"./zh-hant.js":["db10",9,0]};function n(e){if(!s.o(t,e))return Promise.resolve().then((function(){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}));var a=t[e],n=a[0];return Promise.all(a.slice(2).map(s.e)).then((function(){return s.t(n,a[1])}))}n.keys=function(){return Object.keys(t)},n.id="8488",e.exports=n}}]);