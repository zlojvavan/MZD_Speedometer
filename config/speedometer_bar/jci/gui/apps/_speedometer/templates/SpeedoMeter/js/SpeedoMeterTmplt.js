/*
 Copyright 2017
 __________________________________________________________________________

 Filename: SpeedoMeterTmplt.js
 __________________________________________________________________________
 */

log.addSrcFile("SpeedoMeterTmplt.js", "speedometer");

//$.getScript("apps/_speedometer/js/speedometer-config.js");
var speedometerLonghold = false;
/*
 * =========================
 * Constructor
 * =========================
 */
function SpeedoMeterTmplt(uiaId, parentDiv, templateID, controlProperties)
{
    this.divElt = null;
    this.templateName = "SpeedoMeterTmplt";

    this.onScreenClass = "SpeedoMeterTmplt";

    log.debug("  templateID in SpeedoMeterTmplt constructor: " + templateID);

    //@formatter:off
    //set the template properties
    this.properties = {
        "statusBarVisible" : true,
        "leftButtonVisible" : false,
        "rightChromeVisible" : false,
        "hasActivePanel" : false,
        "isDialog" : false
    };
    //@formatter:on

    this.longholdTimeout = null;
    // create the div for template
    this.divElt = document.createElement('div');
    this.divElt.id = templateID;
    this.divElt.className = "TemplateWithStatus";

    parentDiv.appendChild(this.divElt);

    this.divElt.innerHTML = '<!-- MZD Speedometer v5.0 - Digital Bar Mod -->'+
'<div id="speedometerContainer">'+
'	<div id="speedometerMainDiv">' +
' <div class="spdBtn0"></div>' +
' <div class="spdBtn1"></div>' +
' <div class="spdBtn2"></div>' +
' <div class="spdBtn3"></div>' +
' <div class="spdBtn4"></div>' +
'		<div id="speedbarMainDiv" class="digital">' +
//'			<div id="UnitValue" class="speedUnit">Km/h</div>' +
//'			<div id="speedCurrent" class="vehicleSpeed">0</div>' +
'			<div class="speedBar_155"></div>' +
'			<div class="speedBar_150"></div>' +
'			<div class="speedBar_145"></div>' +
'			<div class="speedBar_140"></div>' +
'			<div class="speedBar_135"></div>' +
'			<div class="speedBar_130"></div>' +
'			<div class="speedBar_125"></div>' +
'			<div class="speedBar_120"></div>' +
'			<div class="speedBar_115"></div>' +
'			<div class="speedBar_110"></div>' +
'			<div class="speedBar_105"></div>' +
'			<div class="speedBar_100"></div>' +
'			<div class="speedBar_95"></div>' +
'			<div class="speedBar_90"></div>' +
'			<div class="speedBar_85"></div>' +
'			<div class="speedBar_80"></div>' +
'			<div class="speedBar_75"></div>' +
'			<div class="speedBar_70"></div>' +
'			<div class="speedBar_65"></div>' +
'			<div class="speedBar_60"></div>' +
'			<div class="speedBar_55"></div>' +
'			<div class="speedBar_50"></div>' +
'			<div class="speedBar_45"></div>' +
'			<div class="speedBar_40"></div>' +
'			<div class="speedBar_35"></div>' +
'			<div class="speedBar_30"></div>' +
'			<div class="speedBar_25"></div>' +
'			<div class="speedBar_20"></div>' +
'			<div class="speedBar_15"></div>' +
'			<div class="speedBar_10"></div>' +
'			<div class="speedBar_5"></div>' +
'		</div>' +
'		<div id="vehdataMainDiv">' +
'			<!--div class="phile"></div-->' +
'			<fieldset id="speedCurrentFieldSet" class="' +
((spdTbl.vehSpeed[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.vehSpeed[1]) + " pos" + spdTbl.vehSpeed[2] +'">' +
'				<legend class="vehDataLegends">Veh Speed <span class="spunit">(<span class="speedUnit">Km/h</span>)<span></legend>' +
'				<div class="vehicleSpeed">0</div>' +
'			</fieldset>' +
'			<fieldset id="speedTopFieldSet" class="' +
((spdTbl.topSpeed[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.topSpeed[1]) + " pos" + spdTbl.topSpeed[2] +'">' +
'				<legend class="vehDataLegends">Top Speed</legend>' +
'				<div class="speedTopValue">0</div>' +
'			</fieldset>' +
'			<fieldset id="speedAvgFieldSet" class="' +
((spdTbl.avgSpeed[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.avgSpeed[1]) + " pos" + spdTbl.avgSpeed[2] +'">' +
'				<legend class="vehDataLegends">Avg Speed</legend>' +
'			<div class="speedAvgValue">0</div>' +
'			</fieldset>' +
'			<fieldset id="gpsSpeedFieldSet" class="' +
((spdTbl.gpsSpeed[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.gpsSpeed[1]) + " pos" + spdTbl.gpsSpeed[2] +'">' +
'				<legend class="vehDataLegends">GPS Speed <span class="spunit">(<span class="speedUnit">Km/h</span>)<span></legend>' +
'				<div class="gpsSpeedValue">0</div>' +
'			</fieldset>' +
'			<fieldset id="engineSpeedFieldSet" class="' +
((spdTbl.engSpeed[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.engSpeed[1]) + " pos" + spdTbl.engSpeed[2] +'">' +
'				<legend class="vehDataLegends">Engine Speed</legend>' +
'				<div class="engineSpeedValue">0</div>' +
'			</fieldset>' +
'     <fieldset id="tripTimeFieldSet" class="'+
((spdTbl.trpTime[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.trpTime[1]) + " pos" + spdTbl.trpTime[2] +'">' +
'       <legend class="vehDataLegends">Drive Time</legend>'+
'       <div class="tripTimeValue">0:00</div>'+
'     </fieldset>'+
'     <fieldset id="tripDistFieldSet" class="'+
((spdTbl.trpDist[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.trpDist[1]) + " pos" + spdTbl.trpDist[2] +'">' +
'       <legend class="vehDataLegends">Trip Dist. <span class="spunit">(<span class="distUnit">km</span>)<span></legend>'+
'       <div class="tripDistance">0.00</div>'+
'     </fieldset>'+
'			<fieldset id="outsideTempFieldSet" class="' +
((spdTbl.outTemp[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.outTemp[1]) + " pos" + spdTbl.outTemp[2] +'">' +
'				<legend class="vehDataLegends">Outside  <span class="spunit">(&deg;<span class="tempUnit"></span>)</span></legend>' +
'				<div class="outsideTempValue">0&deg;</div>' +
'			</fieldset>' +
'			<fieldset id="intakeTempFieldSet" class="' +
((spdTbl.inTemp[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.inTemp[1]) + " pos" + spdTbl.inTemp[2] +'">' +
'				<legend class="vehDataLegends">Intake  <span class="spunit">(&deg;<span class="tempUnit"></span>)</span></legend>' +
'				<div class="intakeTempValue">0&deg;</div>' +
'			</fieldset>' +
'			<fieldset id="coolantTempFieldSet" class="' +
((spdTbl.coolTemp[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.coolTemp[1]) + " pos" + spdTbl.coolTemp[2] +'">' +
'				<legend class="vehDataLegends">Coolant  <span class="spunit">(&deg;<span class="tempUnit"></span>)</span></legend>' +
'				<div class="coolantTempValue">0&deg;</div>' +
'			</fieldset>' +
'			<fieldset id="gearPositionFieldSet" class="' +
((spdTbl.gearPos[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.gearPos[1]) + " pos" + spdTbl.gearPos[2] +'">' +
'				<legend class="vehDataLegends">Gear Position</legend>' +
'				<div class="gearPositionValue">0</div>' +
'			</fieldset>' +
'			<fieldset id="gearLeverPositionFieldSet" class="' +
((spdTbl.gearLvr[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.gearLvr[1]) + " pos" + spdTbl.gearLvr[2] +'">' +
'				<legend class="vehDataLegends">Gear Lvr Pos.</legend>' +
'				<div class="gearLeverPositionValue">0</div>' +
'			</fieldset>' +
'     <fieldset id="idleTimeFieldSet" class="'+
((spdTbl.trpIdle[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.trpIdle[1]) + " pos" + spdTbl.trpIdle[2] +'">' +
'       <legend class="vehDataLegends">Idle Time</legend>'+
'       <div class="idleTimeValue">0:00</div>'+
'     </fieldset>'+
'			<fieldset id="TotAvgFuelFieldSet" class="' +
((spdTbl.totFuel[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.totFuel[1]) + " pos" + spdTbl.totFuel[2] +'">' +
'				<legend class="vehDataLegends">Total <span class="fuelEffUnit"></span></legend>' +
'				<div class="TotFuelEfficiency">0.0</div>' +
'			</fieldset>' +
'			<fieldset id="Drv1AvlFuelEFieldSet" class="' +
((spdTbl.trpFuel[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.trpFuel[1]) + " pos" + spdTbl.trpFuel[2] +'">' +
'				<legend class="vehDataLegends">Drive <span class="fuelEffUnit"></span></legend>' +
'				<div class="Drv1AvlFuelEValue">0</div>' +
'			</fieldset>' +
'			<fieldset id="AvgFuelFieldSet" class="' +
((spdTbl.avgFuel[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.avgFuel[1]) + " pos" + spdTbl.avgFuel[2] +'">' +
'				<legend class="vehDataLegends">Avg <span class="fuelEffUnit"></span></legend>' +
'				<div class="avgFuelValue">0.0</div>' +
'			</fieldset>' +
'     <fieldset id="gpsHeadingFieldSet" class="'+
((spdTbl.gpsHead[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.gpsHead[1]) + " pos" + spdTbl.gpsHead[2] +'">' +
'       <legend class="vehDataLegends">Heading</legend>'+
'       <div class="gpsHeading">---</div>'+
'     </fieldset>'+
'     <fieldset id="gpsAltitudeFieldSet" class="'+
((spdTbl.gpsAlt[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.gpsAlt[1]) + " pos" + spdTbl.gpsAlt[2] +'">' +
'       <legend class="vehDataLegends">Altitude <span class="spunit">(<span class="altUnit">m</span>)<span></legend>'+
'       <div class="gpsAltitudeValue">---</div>'+
'     </fieldset>'+
'     <fieldset id="gpsAltitudeMinMaxFieldSet" class="'+
((spdTbl.gpsAltMM[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.gpsAltMM[1]) + " pos" + spdTbl.gpsAltMM[2] +'">' +
'       <legend class="vehDataLegends">ALT Min/Max</legend>'+
'       <div class="gpsAltitudeMinMax">--/--</div>'+
'     </fieldset>'+
'     <fieldset id="gpsLongitudeFieldSet" class="'+
((spdTbl.gpsLon[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.gpsLon[1]) + " pos" + spdTbl.gpsLon[2] +'">' +
'       <legend class="vehDataLegends">Lon.</legend>'+
'       <div class="gpsLongitudeValue">---</div>'+
'     </fieldset>'+
'     <fieldset id="gpsLatitudeFieldSet" class="'+
((spdTbl.gpsLat[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.gpsLat[1]) + " pos" + spdTbl.gpsLat[2] +'">' +
'       <legend class="vehDataLegends">Lat.</legend>'+
'       <div class="gpsLatitudeValue">---</div>'+
'     </fieldset>'+
'     <fieldset id="fuelGaugeFieldSet" class="'+
((spdTbl.fuelLvl[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.fuelLvl[1]) + " pos" + spdTbl.fuelLvl[2] +'">' +
'       <legend class="vehDataLegends">Fuel Gauge</legend>'+
'       <div class="fuelGaugeValue">---</div>'+
'     </fieldset>'+
'     <fieldset id="engineIdleTimeFieldSet" class="'+
((spdTbl.trpEngIdle[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.trpEngIdle[1]) + " pos" + spdTbl.trpEngIdle[2] +'">' +
'       <legend class="vehDataLegends">Engine Idle</legend>'+
'       <div class="engineIdleTimeValue">0:00</div>'+
'     </fieldset>'+
'     <fieldset id="engineSpeedTopFieldSet" class="'+
((spdTbl.engTop[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.engTop[1]) + " pos" + spdTbl.engTop[2] +'">' +
'       <legend class="vehDataLegends">Eng Top Speed</legend>'+
'       <div class="engineSpeedTopValue">0</div>'+
'     </fieldset>'+
'     <fieldset id="batSOCFieldSet" class="'+
((spdTbl.batSOC[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.batSOC[1]) + " pos" + spdTbl.batSOC[2] +'">' +
'       <legend class="vehDataLegends">Battery SOC</legend>'+
'       <div class="batSOCValue">0</div>'+
'     </fieldset>'+
'     <fieldset id="engineLoadFieldSet" class="'+
((spdTbl.engLoad[0]===0) ? "vehDataMain" : "vehDataBar" + spdTbl.engLoad[1]) + " pos" + spdTbl.engLoad[2] +'">' +
'       <legend class="vehDataLegends">Eng Load</legend>'+
'       <div class="engineLoadValue">0</div>'+
'     </fieldset>'+
'		</div>' +
'		</div>' +
'	' +
'	</div>' +
'</div>' +
'<!-- script language="javascript" type="text/javascript">setTimeout(function() {updateSpeedoApp();}, 700);</script -->';
$.getScript('apps/_speedometer/js/speedometerUpdate.js', setTimeout(function() {updateSpeedoApp();}, 700));
}

/*
 * =========================
 * Standard Template API functions
 * =========================
 */

/* (internal - called by the framework)
 * Handles multicontroller events.
 * @param   eventID (string) any of the “Internal event name” values in IHU_GUI_MulticontrollerSimulation.docx (e.g. 'cw',
 * 'ccw', 'select')
 */
 SpeedoMeterTmplt.prototype.handleControllerEvent = function(eventID)
 {
     log.debug("handleController() called, eventID: " + eventID);

     var retValue = 'giveFocusLeft';

     switch(eventID) {
       case "select":
         $('.spdBtn0').click();
         retValue = "consumed";
         break;
       case "up":
         $('.spdBtn1').click();
         retValue = "consumed";
         break;
       case "downStart":
        this.longholdTimeout = setTimeout(function(){
           speedometerLonghold = true;
           $('[class^=speedBar]').toggle();
         }, 2000);
         retValue = "consumed";
         break;
       case "down":
         (speedometerLonghold) ? speedometerLonghold = false : $('.spdBtn2').click();
         clearTimeout(this.longholdTimeout);
         this.longholdTimeout = null;
         retValue = "consumed";
         break;
       case "right":
         $('.spdBtn3').click();
         retValue = "consumed";
         break;
       case "left":
         $('.spdBtn4').click();
         retValue = "consumed";
         break;
       //  case "cw":
       //  case "ccw":
       default:
        retValue = "ignored";
 	}

     return retValue;
 };
/*
 * Called by the app during templateNoLongerDisplayed. Used to perform garbage collection procedures on the template and
 * its controls.
 */
SpeedoMeterTmplt.prototype.cleanUp = function()
{

};

framework.registerTmpltLoaded("SpeedoMeterTmplt");
