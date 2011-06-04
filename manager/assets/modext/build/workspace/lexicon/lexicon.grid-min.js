MODx.grid.Lexicon=function(A){A=A||{};Ext.applyIf(A,{id:"modx-grid-lexicon",url:MODx.config.connectors_url+"workspace/lexicon/index.php",fields:["name","value","namespace","topic","language","editedon","overridden"],baseParams:{action:"getList",namespace:"core",topic:"",language:MODx.config.manager_language||"en"},width:"98%",paging:true,autosave:true,columns:[{header:_("name"),dataIndex:"name",width:200,sortable:true,renderer:this._renderStatus},{header:_("value"),dataIndex:"value",width:500,sortable:false,editor:{xtype:"textarea"},renderer:this._renderStatus},{header:_("last_modified"),dataIndex:"editedon",width:125}],tbar:[{text:_("namespace")+":"},{xtype:"modx-combo-namespace",id:"modx-lexicon-filter-namespace",itemId:"namespace",value:"core",width:120,listeners:{select:{fn:this.changeNamespace,scope:this}}},{text:_("topic")+":"},{xtype:"modx-combo-lexicon-topic",id:"modx-lexicon-filter-topic",itemId:"topic",value:"default",pageSize:20,width:120,listeners:{select:{fn:this.changeTopic,scope:this}}},{text:_("language")+":"},{xtype:"modx-combo-language",name:"language",id:"modx-lexicon-filter-language",itemId:"language",value:MODx.config.manager_language||"en",width:100,listeners:{select:{fn:this.changeLanguage,scope:this}}},"->",{xtype:"button",text:_("entry_create"),handler:this.createEntry,scope:this},"-",{xtype:"textfield",name:"name",id:"modx-lexicon-filter-search",itemId:"search",width:120,emptyText:_("search")+"...",listeners:{change:{fn:this.filter.createDelegate(this,["search"],true),scope:this},render:{fn:function(B){new Ext.KeyMap(B.getEl(),{key:Ext.EventObject.ENTER,fn:function(){this.fireEvent("change",this.getValue());this.blur();return true;},scope:B});},scope:this}}},{xtype:"button",id:"modx-lexicon-filter-clear",itemId:"clear",text:_("filter_clear"),listeners:{click:{fn:this.clearFilter,scope:this}}}],pagingItems:[{text:_("reload_from_base"),handler:this.reloadFromBase,scope:this}]});MODx.grid.Lexicon.superclass.constructor.call(this,A);};Ext.extend(MODx.grid.Lexicon,MODx.grid.Grid,{console:null,_renderStatus:function(B,C,D,A){switch(D.data.overridden){case 1:return'<span style="color: green;">'+B+"</span>";break;case 2:return'<span style="color: purple;">'+B+"</span>";default:return"<span>"+B+"</span>";}},filter:function(A,D,C,B){if(!B){return false;}this.store.baseParams[B]=A.getValue();this.getBottomToolbar().changePage(1);this.refresh();return true;},clearFilter:function(){this.store.baseParams={action:"getList",namespace:"core",topic:"default",language:"en"};this.getBottomToolbar().changePage(1);var A=this.getTopToolbar();A.getComponent("namespace").setValue("core");var B=A.getComponent("topic");B.store.baseParams.namespace="core";B.store.load();B.setValue("default");var C=A.getComponent("language");B.store.baseParams.namespace="core";B.store.load();C.setValue("en");A.getComponent("search").setValue("");this.refresh();},changeNamespace:function(A,B,C){this.setFilterParams(A.getValue(),"default","en");},changeTopic:function(A,B,C){this.setFilterParams(null,A.getValue());},changeLanguage:function(A,B,C){this.setFilterParams(null,null,A.getValue());},setFilterParams:function(E,C,B){var A=this.getTopToolbar();if(!A){return false;}var F,G;if(E){A.getComponent("namespace").setValue(E);G=A.getComponent("language");if(G){G.store.baseParams.namespace=E;G.store.load({callback:function(){G.setValue(B||"en");}});}F=A.getComponent("topic");if(F){F.store.baseParams.namespace=E;F.store.baseParams.language=B?B:(G?G.getValue():"en");F.store.load({callback:function(){F.setValue(C||"default");}});}}else{if(C){F=A.getComponent("topic");if(F){F.setValue(C);}}}var D=this.getStore();if(D){if(E){D.baseParams.namespace=E;}if(C){D.baseParams.topic=C||"default";}if(B){D.baseParams.language=B||"en";}D.removeAll();}this.getBottomToolbar().changePage(1);this.refresh();},loadWindow2:function(B,C,D){var A=this.getTopToolbar();this.menu.record={namespace:A.getComponent("namespace").getValue(),language:A.getComponent("language").getValue()};if(D.xtype!="modx-window-lexicon-import"){this.menu.record.topic=A.getComponent("topic").getValue();}this.loadWindow(B,C,D);},reloadFromBase:function(){Ext.Ajax.timeout=0;var A="/workspace/lexicon/reload/";if(this.console===null){this.console=MODx.load({xtype:"modx-console",register:"mgr",topic:A});}else{this.console.setRegister("mgr",A);}this.console.on("complete",function(){this.refresh();},this);this.console.show(Ext.getBody());MODx.Ajax.request({url:this.config.url,params:{action:"reloadFromBase",register:"mgr",topic:A},listeners:{success:{fn:function(B){this.refresh();},scope:this}}});},revertEntry:function(){var A=this.menu.record;A.action="revert";MODx.Ajax.request({url:this.config.url,params:A,listeners:{success:{fn:function(B){this.refresh();},scope:this}}});},getMenu:function(){var B=this.getSelectionModel().getSelected();var A=[];if(B.data.overridden){A.push({text:_("entry_revert"),handler:this.revertEntry});}return A;},createEntry:function(B,D){var C=this.menu.record||{};var A=this.getTopToolbar();C.namespace=A.getComponent("namespace").getValue();C.language=A.getComponent("language").getValue();C.topic=A.getComponent("topic").getValue();if(!this.createEntryWindow){this.createEntryWindow=MODx.load({xtype:"modx-window-lexicon-entry-create",record:C,listeners:{success:{fn:function(E){this.refresh();},scope:this}}});}this.createEntryWindow.reset();this.createEntryWindow.setValues(C);this.createEntryWindow.show(D.target);}});Ext.reg("modx-grid-lexicon",MODx.grid.Lexicon);MODx.window.ExportLexicon=function(A){A=A||{};this.ident=A.ident||"explex"+Ext.id();var B=A.record;Ext.applyIf(A,{title:_("lexicon_export"),url:MODx.config.connectors_url+"workspace/lexicon/index.php",action:"export",fileUpload:true,fields:[{html:_("lexicon_export_desc"),border:false,bodyStyle:"margin: 10px;",id:"modx-"+this.ident+"-desc",itemId:"desc",anchor:"95%"},{xtype:"modx-combo-namespace",fieldLabel:_("namespace"),name:"namespace",id:"modx-"+this.ident+"-namespace",itemId:"namespace",anchor:"95%",listeners:{select:{fn:function(C,E,D){cle=this.fp.getComponent("topic");if(cle){cle.store.baseParams.namespace=C.getValue();cle.setValue("");cle.store.reload();}else{console.log("cle not found");}},scope:this}}},{xtype:"modx-combo-lexicon-topic",fieldLabel:_("topic"),name:"topic",id:"modx-"+this.ident+"-topic",itemId:"topic",anchor:"95%"},{xtype:"modx-combo-language",fieldLabel:_("language"),name:"language",id:"modx-"+this.ident+"-language",itemId:"language",anchor:"95%"}]});MODx.window.ExportLexicon.superclass.constructor.call(this,A);};Ext.extend(MODx.window.ExportLexicon,MODx.Window);Ext.reg("modx-window-lexicon-export",MODx.window.ExportLexicon);MODx.window.LexiconEntryCreate=function(A){A=A||{};this.ident=A.ident||"lexentc"+Ext.id();var B=A.record;Ext.applyIf(A,{title:_("entry_create"),url:MODx.config.connectors_url+"workspace/lexicon/index.php",action:"create",fileUpload:true,fields:[{xtype:"textfield",fieldLabel:_("name"),id:"modx-"+this.ident+"-name",itemId:"name",name:"name",anchor:"95%"},{xtype:"modx-combo-namespace",fieldLabel:_("namespace"),name:"namespace",id:"modx-"+this.ident+"-namespace",itemId:"namespace",anchor:"95%",listeners:{select:{fn:function(C,E,D){cle=this.fp.getComponent("topic");if(cle){cle.store.baseParams.namespace=C.getValue();cle.setValue("");cle.store.reload();}else{console.log("cle not found");}},scope:this}}},{xtype:"modx-combo-lexicon-topic",fieldLabel:_("topic"),name:"topic",id:"modx-"+this.ident+"-topic",itemId:"topic",anchor:"95%"},{xtype:"modx-combo-language",fieldLabel:_("language"),name:"language",id:"modx-"+this.ident+"-language",itemId:"language",anchor:"95%"},{xtype:"textarea",fieldLabel:_("value"),id:"modx-"+this.ident+"-value",itemId:"value",name:"value",anchor:"95%"}]});MODx.window.LexiconEntryCreate.superclass.constructor.call(this,A);};Ext.extend(MODx.window.LexiconEntryCreate,MODx.Window);Ext.reg("modx-window-lexicon-entry-create",MODx.window.LexiconEntryCreate);