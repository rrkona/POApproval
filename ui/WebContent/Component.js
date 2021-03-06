jQuery.sap.declare("sap.ui.sousa.PoApproval.Component");

sap.ui.core.UIComponent.extend("sap.ui.sousa.PoApproval.Component", {

	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.sousa.PoApproval.view.App",
			type : "JS",
			viewData : { component : this }
		});

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");

		// Using OData model to connect against a real service
		var url = "proxy/http/<host>:<port>/sap/opu/odata/sap/ZPOAPPROVAL_SRV/";
		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<pass>");
		oView.setModel(oModel);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");

		// done
		return oView;
	}
});