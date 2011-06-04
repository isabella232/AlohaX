MODx.panel.Search=function(A){A=A||{};Ext.applyIf(A,{id:"modx-panel-search",autoHeight:true,items:[{html:"<h2>"+_("search")+"</h2>",border:false,cls:"modx-page-header"},{xtype:"portal",items:[{columnWidth:0.97,items:[{title:_("search_criteria"),cls:"x-panel-header",layout:"form",border:false,defaults:{collapsible:false,autoHeight:true,bodyStyle:"padding: 15px;"},items:this.getFields()},{xtype:"modx-grid-search",preventRender:true,bodyStyle:"padding: 0;",width:"100.7%"}]}]}]});MODx.panel.Search.superclass.constructor.call(this,A);};Ext.extend(MODx.panel.Search,MODx.FormPanel,{filters:{},getFields:function(){var A={change:{fn:this.filter,scope:this},render:{fn:this._addEnterKeyHandler}};return[{xtype:"textfield",name:"id",fieldLabel:_("id"),width:100,listeners:A},{xtype:"textfield",name:"pagetitle",fieldLabel:_("pagetitle"),width:300,listeners:A},{xtype:"textfield",name:"longtitle",fieldLabel:_("long_title"),width:300,listeners:A},{xtype:"textarea",name:"content",fieldLabel:_("content"),width:300,grow:true,listeners:A},{xtype:"xcheckbox",name:"published",fieldLabel:_("published"),inputValue:1,checked:false,handler:this.filter,scope:this},{xtype:"xcheckbox",name:"unpublished",fieldLabel:_("unpublished"),inputValue:1,checked:false,handler:this.filter,scope:this},{xtype:"xcheckbox",name:"deleted",fieldLabel:_("deleted"),inputValue:1,checked:false,handler:this.filter,scope:this},{xtype:"xcheckbox",name:"undeleted",fieldLabel:_("undeleted"),inputValue:1,checked:false,handler:this.filter,scope:this}];},filter:function(E,D,A){var C=this.getForm().getValues();C.action="search";var B=Ext.getCmp("modx-grid-search");if(B){B.getStore().baseParams=C;B.getBottomToolbar().changePage(1);B.refresh();}},_addEnterKeyHandler:function(){this.getEl().addKeyListener(Ext.EventObject.ENTER,function(){this.fireEvent("change");},this);}});Ext.reg("modx-panel-search",MODx.panel.Search);MODx.grid.Search=function(A){A=A||{};Ext.applyIf(A,{title:_("search_results"),id:"modx-grid-search",url:MODx.config.connectors_url+"resource/index.php",baseParams:{action:"search"},fields:["id","pagetitle","description","published","deleted","menu"],paging:true,remoteSort:true,columns:[{header:_("id"),dataIndex:"id",width:20,sortable:true},{header:_("pagetitle"),dataIndex:"pagetitle",sortable:true},{header:_("description"),dataIndex:"description",sortable:true},{header:_("published"),dataIndex:"published",width:30,editor:{xtype:"combo-boolean",renderer:"boolean"},editable:false,sortable:true},{header:_("deleted"),dataIndex:"deleted",width:30,editor:{xtype:"combo-boolean",renderer:"boolean"},editable:false,sortable:true}]});MODx.grid.Search.superclass.constructor.call(this,A);};Ext.extend(MODx.grid.Search,MODx.grid.Grid);Ext.reg("modx-grid-search",MODx.grid.Search);