MODx.page.Welcome=function(A){A=A||{};Ext.applyIf(A,{components:[{xtype:"modx-panel-welcome",renderTo:"modx-panel-welcome-div",displayConfigCheck:A.displayConfigCheck,user:MODx.user.id,newsEnabled:A.newsEnabled,securityEnabled:A.securityEnabled}]});MODx.page.Welcome.superclass.constructor.call(this,A);};Ext.extend(MODx.page.Welcome,MODx.Component);Ext.reg("modx-page-welcome",MODx.page.Welcome);MODx.loadWelcomePanel=function(A){if(!A){return ;}MODx.helpWindow=new Ext.Window({title:_("welcome_title"),width:850,height:500,modal:true,layout:"fit",html:'<iframe onload="parent.MODx.helpWindow.getEl().unmask();" src="'+A+'" width="100%" height="100%" frameborder="0"></iframe>'});MODx.helpWindow.show(Ext.getBody());};