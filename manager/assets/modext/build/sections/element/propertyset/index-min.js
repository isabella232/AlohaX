Ext.onReady(function(){MODx.load({xtype:"modx-page-property-sets"});});MODx.page.PropertySets=function(A){A=A||{};Ext.applyIf(A,{components:[{xtype:"modx-panel-property-sets",renderTo:"modx-panel-property-sets-div"}],buttons:[{text:_("help_ex"),handler:MODx.loadHelpPane}]});MODx.page.PropertySets.superclass.constructor.call(this,A);};Ext.extend(MODx.page.PropertySets,MODx.Component);Ext.reg("modx-page-property-sets",MODx.page.PropertySets);