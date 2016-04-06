// LC i18n: Moved all embedded UI strings out of this js file. JavaScript
// variables are now created in BaseTag.java's addJavaScriptScholarOneStrings()
// and are included prior to including this js file.

  	var currentArea;
    var currentAreaType;
    var currentTarget=1;
    var currentlySubmitting=0;
    var spChLastFocus=null;
    var browser = checkBrowser();
    var handles = new Array();
    var ecomWindow;
    var ap = 0;
    var ap1 = 0;    
    var timer1;
	var initialConditions = new Array();
	var submissionInProgress = 0;
	var okToSendAjaxRequest = true;
	
	function checkIfOKtodoAjax(){
	  return okToSendAjaxRequest;	
	}

    function checkSubmitted(evt)
    {
      if (ap1 == 0){
      }
      else if(ap1==-1)
      {
        ap1=1;
        return false;
      }
      else
      {
        alert(ALERT_WAIT_FOR_SUBMIT);
        return false;
      }
    }
    
    var sn1, sn2, sn3;
    function setNextPage(nextPage)
    {
      sn1 = okToSendAjaxRequest; sn2 = document.forms[0].target; sn3 = document.forms[0].NEXT_PAGE.value;
      okToSendAjaxRequest = false;
	  document.forms[0].target = '';
	  document.forms[0].NEXT_PAGE.value=nextPage;
      //if(checkEmailWindows())
      //{
    	  //getPostParams();
	      //showHourGlass();    
	      //document.forms[0].submit();
      //}      
    }
    function resetNextPage(nextPage)
    {
      okToSendAjaxRequest = sn1;
	  document.forms[0].target = sn2;
	  document.forms[0].NEXT_PAGE.value=sn3;    
    }

    function setData(fieldname, data)
    {
      okToSendAjaxRequest = false;
      document.forms[0].target = '' ;
      document.forms[0][fieldname].value=data;
      getPostParams();
      showHourGlass();
      document.forms[0].submit();
    }

    function setPreActionDataAndPopWindow(preaction, fieldname, data, baseurl, name, x, y)
    {
      okToSendAjaxRequest = false;
      document.forms[0].target = '' ;
      var url = baseurl + '&PRE_ACTION=' + preaction + '&' + fieldname + '=' + data;
      popWindow(url, name, x, y);
    }

    function changeLocale(displayConfirmation)
    {
      var toggleSelectFieldName = 'NEW_USER_PREFERRED_LOCALE_ID';
      var currentLocaleIdFieldName = 'CURRENT_DISPLAY_LOCALE_ID';
   	  if(document.forms[0][toggleSelectFieldName]==null)
   		  return false;

      okToSendAjaxRequest = false;
      document.forms[0].target = '';
      var currentLocaleId = document.forms[0][currentLocaleIdFieldName].value;
      var newLocaleId = document.forms[0][toggleSelectFieldName].value;
      
      if (displayConfirmation)
      {
          var Msg = document.forms[0]['LOCALE_CHANGE_ALERT_MSG1_'+currentLocaleId].value + 
        	document.forms[0]['LOCALE_NAME_IN_CURRENT_LANGUAGE_'+newLocaleId].value + 
        	document.forms[0]['LOCALE_CHANGE_ALERT_MSG2_'+currentLocaleId].value + "\n\n" +
        	document.forms[0]['LOCALE_CHANGE_ALERT_MSG1_'+newLocaleId].value + 
        	document.forms[0]['LOCALE_NAME_IN_NATIVE_LANGUAGE_'+newLocaleId].value + 
        	document.forms[0]['LOCALE_CHANGE_ALERT_MSG2_'+newLocaleId].value;
          
    	  var r=confirm(Msg);
    	  if (r!=true)
    	  {
    		  // revert selected item to original
    		  setSelectedOptionMatchingValue(toggleSelectFieldName, currentLocaleId);
    		  return false;
    	  }
    	  
    	  closeAllWindows();
      }
           
      setFieldSafe('DISPLAY_CHANGE_ACTION', 'CHANGE_DISPLAY_LANGUAGE');
      return true;
    }
    
    function setSelectedOptionMatchingValue(selectFieldId, value)
    {
      var elSel = document.getElementById(selectFieldId);
      var i;
      for (i = 0; i < elSel.length; i++) {
        if (elSel.options[i].value == value) {
          elSel.options[i].selected = true;
          return;
        }
      }
    }

    function setDataAndNextPageTarget(fieldname, data, nextPage)
    {
      okToSendAjaxRequest = false;
      document.forms[0][fieldname].value=data;
      var newTarget = '_' + currentTarget++ ;
      document.forms[0].target = newTarget;
      document.forms[0].NEXT_PAGE.value=nextPage;
      getPostParams();
      showHourGlass();
      document.forms[0].submit();
    }

    function setNextPageTarget(nextPage)
    {
      okToSendAjaxRequest = false;
      var newTarget = '_' + currentTarget++ ;
      document.forms[0].target = newTarget;
      document.forms[0].NEXT_PAGE.value=nextPage;
      getPostParams();
      showHourGlass();	
      document.forms[0].submit();
    }

    function setActionData(action, fieldname, data)
    {
      okToSendAjaxRequest = false;
      document.forms[0].target = '' ;
      document.forms[0].POST_ACTION.value=action;
      document.forms[0][fieldname].value=data;
      getPostParams();
      showHourGlass();
      document.forms[0].submit();
    }

    function setActionPageData(action, page, fieldname, data)
    {
    	  okToSendAjaxRequest = false;
	      document.forms[0].target = '' ;
	      document.forms[0].POST_ACTION.value=action;
	      document.forms[0].NEXT_PAGE.value=page;
	      document.forms[0][fieldname].value=data;
    	if(checkEmailWindows())
    	{
  	      getPostParams();
	      showHourGlass();
	      document.forms[0].submit();
	    }
    }
    function setActionAndPageDataTo(action, page)
    {
      okToSendAjaxRequest = false;
      document.forms[0].target = '' ;
      document.forms[0].POST_ACTION.value=action;
      document.forms[0].NEXT_PAGE.value=page;
      getPostParams();
      showHourGlass();
      document.forms[0].submit();
    }
    function setPostActionPageData(postAction, page, fieldname, data)
    {
      okToSendAjaxRequest = false;
      document.forms[0].target = '' ;
      document.forms[0].POST_ACTION.value=postAction;
      document.forms[0].NEXT_PAGE.value=page;
      document.forms[0][fieldname].value=data;
      getPostParams();
      showHourGlass();
      document.forms[0].submit();
    }

    function postPage()
    {
      okToSendAjaxRequest = false;	
      document.forms[0].target = '' ;
      getPostParams();
      showHourGlass();
      document.forms[0].submit();
    }

		function setInitialCondition(fieldName, fieldValue)
		{
		  initialConditions[fieldName]=fieldValue;
		}

		function setFromInitialConditions()
		{ 
		    for (var prop in initialConditions) {
		        document.forms[0][prop].value=initialConditions[prop]; 
		    }
		}

    function isok(frm)
    {if (ap == 0){ap = 1;return 1;}else{alert(ALERT_WAIT_FOR_SUBMIT);ap1=-1;return 0;}}

		function resetIsOk(frm)
		{ap = 0; return 1;}

		function checkForReload()
		{
		  var timesLoaded = Number(document.forms[0]["TIMES_LOADED"].value);
		  if (timesLoaded == 0) {
		    timesLoaded++;
		    document.forms[0]["TIMES_LOADED"].value=timesLoaded.toString();
		  } else {
		    document.forms[0]["TIMES_LOADED"].value = 0;
		    window.location.reload(true);
		  }
		}
		
	function checkBrowser()
	    {
	      this.ver=navigator.appVersion;
	      this.domX=document.getElementById?1:0;
	      this.ie10=(this.ver.indexOf('MSIE 10')>-1 && this.domX)?1:0;
	      this.ie9=(this.ver.indexOf('MSIE 9')>-1 && this.domX)?1:0;
	      this.ie8=(this.ver.indexOf('MSIE 8')>-1 && this.domX)?1:0;
	      this.ie7=(this.ver.indexOf('MSIE 7')>-1 && this.domX)?1:0;	      
	      this.ie6=(this.ver.indexOf('MSIE 6')>-1 && this.domX)?1:0;
	      this.ie5=(this.ver.indexOf('MSIE 5')>-1 && this.domX)?1:0;
	      this.ie4=(document.all && !this.domX)?1:0;
	      this.ns5=(this.domX && parseInt(this.ver) >= 5) ?1:0;
	      this.ns4=(document.layers && !this.domX)?1:0;
	      return this;
	    }
    
    function setNextPageSecure(nextPage)
    {
      okToSendAjaxRequest = false;
      document.forms[0].target = '' ;
      document.forms[0].NEXT_PAGE.value=nextPage;
      document.url = url;
      getPostParams();
      showHourGlass();
      document.forms[0].submit();
    }
    var sf1, sf2;
    function setField(fieldname, data)
    {
      sf1 = document.forms[0].target; sf2 = document.forms[0][fieldname].value;
      document.forms[0].target = '' ;
      if(document.forms[0][fieldname]!=null)
	      document.forms[0][fieldname].value=data;
    }
    function resetField(fieldname, data)
    {
      document.forms[0].target = sf1 ;
      if(document.forms[0][fieldname]!=null)
	      document.forms[0][fieldname].value=sf2;
    }

    function assignField(fieldname, data)
    {
      document.forms[0].target = '' ;
      if(document.forms[0][fieldname] == null)
      {
	      var input = document.createElement('input')
	      input.type = 'hidden';
	      input.name = fieldname;
	      input.value = data;
	      document.forms[0].appendChild(input);
      }
      else
      {
    	  document.forms[0][fieldname].value=data;
      }
    }

    function setFieldSafe(fieldname, data)
    {
      document.forms[0].target = '' ;
	  // LH_2457 begin Changed for properly working if there are more than one "fieldname" element
	  if (document.forms[0][fieldname] == null || document.forms[0][fieldname].length) 
	  { 
    	  var input = document.createElement('input')
	      input.type = 'hidden';
	      input.name = fieldname;
    	  input.value = data;
	      document.forms[0].appendChild(input);
   	  } 
  	  else 
 	  {
      	document.forms[0][fieldname].value=data;
  	  }
    }

    var sd1, sd2;
    function setDataAndNextPage(fieldname, data, nextPage)
    {
      sd1 = document.forms[0].target;
	  document.forms[0].target = '' ;
	  // LH_2457 begin Changed for properly working if there are more than one "fieldname" element
	  if (document.forms[0][fieldname] != null)
	  {
		  if (document.forms[0][fieldname].length) 
		  { 
		      var input = document.createElement('input')
		      input.type = 'hidden';
		      input.name = fieldname;
		      input.value = data;
		      document.forms[0].appendChild(input);
	      } 
		  else 
		  {
              sd2 = document.forms[0][fieldname].value;
		      document.forms[0][fieldname].value=data;
		  }
	  }
	  // LH_2457 end
	  setNextPage(nextPage);
    }
    function resetDataAndNextPage(fieldname, data, nextPage)
    {
	  document.forms[0].target = sd1 ;
	  // LH_2457 begin Changed for properly working if there are more than one "fieldname" element
	  if (document.forms[0][fieldname] != null)
	  {
		  if (document.forms[0][fieldname].length) 
		  { 
		      var input = document.createElement('input')
		      input.type = 'hidden';
		      input.name = fieldname;
		      input.value = data;
		      document.forms[0].appendChild(input);
	      } 
		  else 
		  {
		      document.forms[0][fieldname].value=sd2;
		  }
	  }
	  // LH_2457 end
	  setNextPage(nextPage);
    }

    function setOpenerField(fieldname, data)
    {
      window.opener.document.forms[0].target = '' ;
      if(window.opener.document.forms[0][fieldname]!=null)
    	  window.opener.document.forms[0][fieldname].value=data;
    }

    function setOpenerFieldSafe(fieldname, data)
    {
    	window.opener.document.forms[0].target = '' ;
	  // LH_2457 begin Changed for properly working if there are more than one "fieldname" element
	  if (window.opener.document.forms[0][fieldname] == null || window.opener.document.forms[0][fieldname].length) 
	  { 
    	  var input = window.opener.document.createElement('input')
	      input.type = 'hidden';
	      input.name = fieldname;
    	  input.value = data;
    	  window.opener.document.forms[0].appendChild(input);
   	  } 
  	  else 
 	  {
  		window.opener.document.forms[0][fieldname].value=data;
  	  }
    }
    function setOpenerNextPage(nextPage)
    {
      okToSendAjaxRequest = false;
	  window.opener.document.forms[0].target = '';
	  window.opener.document.forms[0].NEXT_PAGE.value=nextPage;
	  window.opener.document.forms[0].submit();
    }


    function setOpenerDataAndNextPage(fieldname, data, nextPage)
    {
	  window.opener.document.forms[0].target = '' ;
	  // LH_2457 begin Changed for properly working if there are more than one "fieldname" element
	  if (window.opener.document.forms[0][fieldname] != null)
	  {
		  if (window.opener.document.forms[0][fieldname].length) 
		  { 
		      var input = window.opener.document.createElement('input')
		      input.type = 'hidden';
		      input.name = fieldname;
		      input.value = data;
		      window.opener.document.forms[0].appendChild(input);
	      } 
		  else 
		  {
			  window.opener.document.forms[0][fieldname].value=data;
		  }
	  }
	  // LH_2457 end
	  setOpenerNextPage(nextPage);
    }

    function set2DataAndNextPage(fieldname1, data1, fieldname2, data2, nextPage)
    {
      document.forms[0].target = '' ;
      document.forms[0][fieldname1].value=data1;
      document.forms[0][fieldname2].value=data2;
      setNextPage(nextPage);
    }    

    function setDataAndNextPageSpecifyTarget(fieldname, data, nextPage, newTarget)
    {
      document.forms[0][fieldname].value=data;
      document.forms[0].target = newTarget ;
      setNextPage(nextPage);
    }
    
    function selectCheckBoxes(fieldName)
    {
      var field = fieldName;
      for (var i = 0; i<document.forms[0].elements.length; i++) {
        if ((document.forms[0].elements[i].name.indexOf(field) > -1)) {
          document.forms[0].elements[i].checked = true;
        }
      }
    }
    
    function addHandleToArray(handle)
    {
      var i = 0;
      for (i=0;i<20;i++) {
        if (!handles[i]) {
          handles[i] = handle; 
          break;
        }
      }
    }

    function closeAllWindows()
    {
      var i = 0; 
      for (i=0;i<20;i++) {
        if (handles[i]) {
          handles[i].close(); 
        }
      }
      handles = new Array();      
    }
    
    function showHourGlass()
    {
      ap1 = 1;
      document.body.style.cursor = "wait"; 
    }

    function setDirty(Id)
    {
     var fieldName = 'DIRTY'+Id 
      document.forms[0][fieldName].value='true';
    }
        
    function showSessionWarning(show)    
    {
	    var browserName=navigator.appName;
	    var browserVersion=parseInt(navigator.appVersion);
	    if ((browserName=="Netscape" && browserVersion>=5) || ( browserName=="Microsoft Internet Explorer" && browserVersion>=4))
       {
           document.getElementById('warning').style.left = "205";
           document.getElementById('warning').style.zindex = "1";
           if ( show )
               document.getElementById('warning').style.visibility = "";
           else
               document.getElementById('warning').style.visibility = "hidden";
       }
       else if ((browserName=="Netscape" && browserVersion<5))
       {
           document.layers['warning'].document.close();
           document.layers['warning'].left = "205";
           document.layers['warning'].zindex = "1";
           if ( show )
           document.layers['warning'].visibility = "show";
           else
           document.layers['warning'].visibility = "hide";
       }
       window.scroll(0,0);
       tP.innerText=eval(oT); 
    }

    function showS1Info(show)    
    {
	    var browserName=navigator.appName;
	    var browserVersion=parseInt(navigator.appVersion);
	    if ((browserName=="Netscape" && browserVersion>=5) || ( browserName=="Microsoft Internet Explorer" && browserVersion>=4))
       {     
           document.getElementById('s1info').style.left = tempX - 250;
           document.getElementById('s1info').style.top = tempY;
           document.getElementById('s1info').style.zindex = "1";
           if ( show )
               document.getElementById('s1info').style.visibility = "";
           else
               document.getElementById('s1info').style.visibility = "hidden";
       }
       else if ((browserName=="Netscape" && browserVersion<5))
       {
           document.layers['s1info'].document.close();
           document.layers['s1info'].left = tempX - 250;
           document.layers['s1info'].top = tempY;
           document.layers['s1info'].zindex = "1";
           if ( show )
           document.layers['s1info'].visibility = "show";
           else
           document.layers['s1info'].visibility = "hide";
       }
       window.scroll(0,0);
    }

		// LC i18n TODO: This is returning local machine's timezone and not EST
    function localTime(){ x=new Date(); x.setTime(x.getTime()+ dS() + 600000); return x; } 
    function gmt(){ x=new Date(tN().getUTCFullYear(),tN().getUTCMonth(),tN().getUTCDate(),tN().getUTCHours(),tN().getUTCMinutes(),tN().getUTCSeconds()); x.setTime(x.getTime() + 600000); return x; } 
    
    /*
     * From 2007
     * EST Daylight Saving Time to begin on the second Sunday in March and end on the first Sunday in November.
     *
     */
    function dS()
    {
      var ds = 0;
      var nowDate = new Date(); var startDSOffset = new Date(); var endDS = new Date();

      // Find the second Sunday in March
      startDSOffset.setMonth(2);
      startDSOffset.setDate(1);
      var day1 = startDSOffset.getDay();
      startDSOffset.setDate(15-day1); // second Sunday
      startDSOffset.setHours(2); startDSOffset.setMinutes(0); startDSOffset.setSeconds(0); // set to 2 am
      
      // Find the first Sunday in November
      endDS.setMonth(10);
      endDS.setDate(1);
      var day2 = endDS.getDay();
      endDS.setDate(8-day2); // first Sunday
      endDS.setHours(2); endDS.setMinutes(0); endDS.setSeconds(0); // set to 2 am
      
      if (nowDate > startDSOffset && nowDate <= endDS)
        ds = 3600000;  // yes we fall in the Daylight Saving period. 
    
      return ds; 
    } 
    
    function fD(d,m,h,p)
    { 
      var week=(p<0) ? 7*(p+1):7*(p-1), nm=(p<0)?m+1:m, x=new Date(tN().getUTCFullYear(), nm, 1, h, 0, 0), dOff=0; 
      if(p<0)
      { 
        x.setTime(x.getTime()-86400000); 
      } 
      if(x.getDay()!=d)
      { 
        dOff=(x.getDay()<d)?(d-x.getDay()):0-(x.getDay()-d); 
        if(p<0&&dOff>0)
        { 
          week-=7; 
        } 
        if(p>0&&dOff<0)
        { 
          week+=7; 
        } 
        x.setTime(x.getTime()+((dOff+week)*86400000)); 
      }
      return x; 
    } 

    function tN(){ return new Date(); } 
    function lZ(x){ return (x>9)?x:'0'+x; } 
    function tH(x){ if(x==0){ x=12; } return (x>12)?x-=12:x; } 
    function t24H(x){ return (x>9)?x:'0'+x; } 
    function aP(x){ return (x>11)? PM_STR : AM_STR; } 
    function showTime() { document.write(eval(oT)); }
    
    var oT;
    
    if (PREFER_24HOUR == '1')
    	oT= "t24H(localTime().getHours())+ ':' + lZ(localTime().getMinutes()) + ', ' + t24H(gmt().getHours()) + ':' + lZ(gmt().getMinutes()) + ' ' + GMT_STR";
    else
    	oT= "tH(localTime().getHours()) + ':' + lZ(localTime().getMinutes()) + ' ' + aP(localTime().getHours()) + ', ' + tH(gmt().getHours()) + ':' + lZ(gmt().getMinutes()) + ' ' + aP(gmt().getHours()) + ' ' + GMT_STR";

    //var oT="tH(est().getHours())+':'+lZ(est().getMinutes())+' '+aP(est().getHours())+' EST, '+tH(gmt().getHours())+':'+lZ(gmt().getMinutes())+' '+aP(gmt().getHours())+' GMT'";
        
    function markAsLongRequest()
    { 
      document.forms[0].action = getLongRequestSiteURL();
    }
    
    function textLimit(field, maxlen)
    { 
      if (trimAll(field.value).length > maxlen) {
       field.value = field.value.substring(0, maxlen);
        alert(ALERT_TEXT_LIMIT);
      }
    }
    
    function checkWordLimit(field, wordLimit) 
    { 
      //var fieldValue = trimAll(field.value);   
      field.value = trimAll(field.value);
      var wordArray = field.value.split(' '); 
      var actualLength = 0;
      for(i = 0; i < wordArray.length; i++)
      {
      	if(wordArray[i] != '')
      	{
      		actualLength++;
      	}
      }
      if(actualLength > wordLimit) 
      { 
       for(i = (actualLength - wordLimit); i > 0; i--)
       {
       	field.value = trimAll(field.value.substring(0, field.value.lastIndexOf(' ')));
       }
       alert(ALERT_TEXT_LIMIT);
      } 
     } 
 
      function trimAll(sString) 
      {
      while (sString.substring(0,1) == ' ')
      {
       sString = sString.substring(1, sString.length);
      }
      while (sString.substring(sString.length-1, sString.length) == ' ')
      {
      sString = sString.substring(0,sString.length-1);
      }
     return sString;
     }

 
    function popWindowSimple(url,winname,width,height)
    {
      winX=Math.round(screen.width/2)-(width/2);
      winY=Math.round(screen.height/2)-(height/2);
      winStats='toolbar=no,location=no,directories=no,menubar=no,resizable=yes,';
      winStats+='scrollbars=yes,width='+width+',height='+height;
      if (navigator.appName.indexOf('Microsoft')>=0) {
        winStats+=',left='+winX+',top='+winY+'';
      }else{ 
        winStats+=',screenX='+winX+',screenY='+winY+'';
      }
      window.open(url,winname,winStats);
    }
    
    function popNewWindow(url,winname)
    {
      window.open(url,winname);
    }    
    

	function setTooltipText(proofType,tooltip)
	{
		try 
		{
			var a = document.getElementById(proofType);
			a.title = tooltip;
		} 
		catch (e) 
		{}
	}

    
  

	/* 
	 * this function overrides the form.submit() method for all
	 * forms.  it checks a flag to see if a form is currently being
	 * submitted from this page, and if so, will prevent further 
	 * submissions
	 */
	function newsubmit(event) 
	{
		//override the this method to accomudate multiple submissions possible for Async file upload.
		if(this.name =='file_upload_start_form' 
			|| this.name =='file_upload_completed_form'
			|| this.name =='default_form2'
			|| this.name.indexOf('file_upload_form_') != -1)
		{
			this._submit();
		} else if(submissionInProgress == 0)
	    {
	    	submissionInProgress = 1;
			// call real submit function
			this._submit();
	    }
	    else
	    	alert(ALERT_WAIT_FOR_SUBMIT);
	}

	
	/*
	 * this method is for browsers that do not expose the HTMLFormElement
	 * interface.  the new submit method must be attached by hand to each
	 * of the forms on the page.
	 */
	function attachNewSubmit() {
		for(var fc=0; fc < document.forms.length; fc++) {
			document.forms[fc]._submit = document.forms[fc].submit;
			document.forms[fc].submit = newsubmit;
		}
	}

	/* 
	 * this method is for Safari which allows registration for listening to
	 * onload events, but will not fire onload events when they occur; the
	 * workaround is to override the onload to call attach new submit here
	 * instead of implementing this in the event handling method
	 */
	function initOnLoad() {
		// quit if this function has already been called
		if (arguments.callee.done) return;	
		// flag this function so we don't do the same thing twice
		arguments.callee.done = true;
		// call the new attach function
		attachNewSubmit();
	}

	/*
	 * this block of code sets up the overriding of submit method on all HTML 
	 * forms in this window
	 */
	var catch1;
	try{
		var browserName=navigator.appName;
	    var browserVersion=parseInt(navigator.appVersion);
		if(HTMLFormElement && !(browserName=="Microsoft Internet Explorer" && browserVersion<=4)) 
		{
			// firefox
			HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
			HTMLFormElement.prototype.submit = newsubmit;  
		} else {
			// safari
			window.addEventListener('onload', attachNewSubmit);
			window.onload = initOnLoad;
		}
	} catch (catch1) {
		// ie
		window.attachEvent('onload', attachNewSubmit);
	}
	
	function escapeplus( str ){
      var tmp = escape( str );
      return tmp.replace( /\+/g, '%2B' );
    } 
    
	function setConfirmation(){
		alert(ALERT_STOP_SEARCH);
		return false;
	}

	function resetSubmissionInProgress(){
		submissionInProgress = 0;
	}
	
	var text1;
	function checklength(i)
	{
	var txt;
	txt=document.forms[0].ISSUE_NOTES.value;
	n=txt.length;
	if (n>i) //i is the maxlength of textarea which we have set to 1024
	{
	alert(ALERT_TEXT_OVERFLOW);
	document.forms[0].ISSUE_NOTES.value=document.forms[0].ISSUE_NOTES.value.substring(0, i-1);
	return;
	}
	text1=document.forms[0].ISSUE_NOTES.value;
	}
	
	function IsNumeric(strString)
   {
   var strValidChars = "0123456789";
   var strChar;
   var blnResult = true;

    if (strString.length == 0) 
     {
       return false;
     }

   for (i = 0; i < strString.length && blnResult == true; i++)
      {
        strChar = strString.charAt(i);
        if (strValidChars.indexOf(strChar) == -1)
         {
          blnResult = false;
         }
      }
   return blnResult;
   }

/**************************************************
 * Drag function to drag a pop up layer along with the mouse
 * movement.
 **************************************************/
  var Drag = {
    obj : null,
    init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
    {
      o.onmousedown	= Drag.start;
      o.hmode = bSwapHorzRef ? false : true ;
      o.vmode = bSwapVertRef ? false : true ;
      o.root = oRoot && oRoot != null ? oRoot : o ;
      if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
      if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
      if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
      if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";
      o.minX = typeof minX != 'undefined' ? minX : null;
      o.minY = typeof minY != 'undefined' ? minY : null;
      o.maxX = typeof maxX != 'undefined' ? maxX : null;
      o.maxY = typeof maxY != 'undefined' ? maxY : null;
      o.xMapper = fXMapper ? fXMapper : null;
      o.yMapper = fYMapper ? fYMapper : null;
      o.root.onDragStart = new Function();
      o.root.onDragEnd = new Function();
      o.root.onDrag = new Function();
    },

    start : function(e)
    {
       var o = Drag.obj = this;
       e = Drag.fixE(e);
       var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
       var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
       o.root.onDragStart(x, y);
       o.lastMouseX = e.clientX;
       o.lastMouseY = e.clientY;
       if(o.hmode)
       {
          if (o.minX != null) o.minMouseX = e.clientX - x + o.minX;
          if (o.maxX != null) o.maxMouseX = o.minMouseX + o.maxX - o.minX;
       }
       else
       {
          if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
          if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
       }
       if (o.vmode) 
       {
          if (o.minY != null) o.minMouseY = e.clientY - y + o.minY;
          if (o.maxY != null) o.maxMouseY = o.minMouseY + o.maxY - o.minY;
       }
       else
       {
          if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
          if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
       }
       document.onmousemove = Drag.drag;
       document.onmouseup = Drag.end;
       return false;
    },

    drag : function(e)
    {
       e = Drag.fixE(e);
       var o = Drag.obj;
       var ey = e.clientY;
       var ex = e.clientX;
       var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
       var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
       var nx, ny;
       if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
       if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
       if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
       if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

       nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
       ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));
       if (o.xMapper) nx = o.xMapper(y)
       else if(o.yMapper) ny = o.yMapper(x)
       Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
       Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
       Drag.obj.lastMouseX = ex;
       Drag.obj.lastMouseY = ey;
       Drag.obj.root.onDrag(nx, ny);
       return false;
    },

    end : function()
    {
       document.onmousemove = null;
       document.onmouseup   = null;
       Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), 
       parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
       Drag.obj = null;
    },

    fixE : function(e)
    {
       if (typeof e == 'undefined') e = window.event;
       if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
       if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
       return e;
    }
 };

function checkFilesToBeUploaded(pageName, authorIframePageName) 
{
	if(pageName == authorIframePageName && hasFilesToBeUploaded != null && hasFilesToBeUploaded  == true) 
	{
		return false;		
	} else 
	{
		return true;
	}
}

// SF-7128 b
// this function works on IE, FF, Chrome and Safari 
function PutInClipboard(mytext)
{
	if (window.clipboardData)
	{
		// IE
		window.clipboardData.setData("Text", mytext);
    }
    else if (window.netscape)
    {
		// Firefox
		netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
		var copytext=mytext;
		var str = Components.classes["@mozilla.org/supports-string;1"].
		createInstance(Components.interfaces.nsISupportsString);
		if (!str) 
			return;
		str.data = copytext;
		var trans = Components.classes["@mozilla.org/widget/transferable;1"].
				createInstance(Components.interfaces.nsITransferable);
		if (!trans) 
			return;
		trans.addDataFlavor("text/unicode");
		trans.setTransferData("text/unicode",str,copytext.length * 2);
		var clipid = Components.interfaces.nsIClipboard;
		var clip =
				Components.classes["@mozilla.org/widget/clipboard;1"].getService(clipid);
		if (!clip) 
			return;
		clip.setData(trans,null,clipid.kGlobalClipboard);
	}
	else
	{
		// Chrome and Safari
		var obj = document.getElementById('clipboard');
        obj.innerHTML = mytext;
        obj.focus();
        document.execCommand('copy')
	}
   return;	
}
// SF-7128 e

/* 
 * Function for enabling or disabling child options
 * according parent status
 * Function accept parent Id as first parameter and
 * child Ids as following parameter
 * Example: disableEnableChild("parent", "child1", "child2", "child3")
 */
function disableEnableChild(parentId, childId)
{
  var args = arguments;
  var parent = document.getElementById(parentId);
  var isEnabled = false;
  if (parent.type == 'checkbox')
  {
    isEnabled = !parent.checked;
  }
  for(var i = 1; i < args.length; i++)
  {
    document.getElementById(args[i]).disabled = isEnabled;
  }
}

/**
 * Returns false if non digit key was pressed. It used for input fields which can contain only digits.
 * Example: <input name='number' value='' onkeypress="return isNumberKey(event)">
 * @param evt
 * @return false if non digit key was pressed, true otherwise
 */
function isNumberKey(evt)
{
  var charCode = (evt.which) ? evt.which : evt.keyCode;

  // allow backspace (8), delete (46), arrows (37-40), home (36), end (35) and tab () - 
  //   Need to do this b/c some versions of Firefox (e.g. v3.6) do not automatically handle delete and backspace in keydown handler
  if (charCode==8 || (charCode > 34 && charCode < 41) || charCode == 46 || charCode == 9) 
	return true;
  if(charCode>95 && charCode<106) charCode=charCode-48; //numpad
  var keyChar = String.fromCharCode(charCode);
  var patt=/\d/;
  return patt.test(keyChar);
}

/**
 * Input mask created for ORCID. Can be used for other purposes.
 * Example: <input type=text onKeyDown="javascript:return mask(event,this,'4,9,14','-');" >
 * @param evt - event
 * @param textbox - this control
 * @param loc - location for delimiters - ('4,9,14') every 4,9,14
 * @param delimiter
 * @return false if non alphanumeric key was pressed, true otherwise
 */
function inputMask(evt, textbox, loc, delim){

  var charCode = (evt.which) ? evt.which : evt.keyCode;
  var pos = 0;
  
  if (textbox.selectionStart) {
    pos = textbox.selectionStart;
  } 
  else if (document.selection) {
    var oSel = document.selection.createRange();
    oSel.moveStart ('character', -textbox.value.length);
    pos = oSel.text.length;
  }
  
  //allow backspace, arrows, home, end, delete, ctrlkey
  if (charCode==8 || (charCode > 34 && charCode < 40) || charCode == 46 || evt.ctrlKey) 
	return true;
  else if (evt.altKey)
  	return false;
	
  if (isNumberKey(evt) || (charCode>64 && charCode<91) || (charCode>96 && charCode<123))
  {
    var locs = loc.split(',');
    var str = textbox.value;

    for (var i = 0; i <= locs.length; i++)
    {
	  if (pos == locs[i])
	  {
		if (str.substring(pos, pos+1) != delim)
		{
		  str = str.substring(0,pos) + delim + str.substring(pos,str.length); 
		  textbox.value = str;			  
        }
      }
    }
    return true;
  }
  else
    return false;
}

/**
 * closePopup
 * 
 * Function closes a popup window (well really any window) and can either refresh the parent window or not
 * 
 * @param refreshOpener Boolean value specifying whether to refresh the opening window or not.  true mean refresh; false mean do not refresh
 */
function closePopup(refreshOpener)
{
	if (refreshOpener == true) {
		// javascript:setData way
		window.opener.postPage();
		
		// browser refresh way
		// window.opener.location.reload();
	}
	window.close();
}

function checkMultiSelectAtLeastOneSelected(fieldname, alertmessage)
{
	var idx=0;
	var numOptions=0;
	
	if (fieldname == null)
	{
		return false;
	}
	numOptions=document.forms[0][fieldname].length;
	if (numOptions < 1)
	{
		return false;
	}
	for (i=0; i < numOptions; i++)
	{
		if (document.forms[0][fieldname].options[i].selected == true)
		{
			return true;
		}
	}
	if (alertmessage != null)
	{
		alert(alertmessage);
	}
	return false;
}
/*
 * this function is used to prevent user to enter unallowed characters into name fields
 * @param unallowedChars - unallowed characthers array 
 * @param obj - name field (for example text field for first, last or middle name)
 * @param error - java alert message 
 */
function checkAllNameFields(unallowedChars, obj, error)
{
  var name = obj.value;
  if(checkNameFieldsForUnallowedCharacters(unallowedChars,name))
  {
    alert(error);
    if (navigator.userAgent.indexOf('Firefox')!=-1)
     {
      obj.value = "";  
      setTimeout(function() { obj.focus(); }, 10); // obj.focus() doesn't work fine in ff (known ff bug).
     }
     else
     {
       obj.focus();
     }
    return false;
  }
}

function checkNameFieldsForUnallowedCharacters(unallowedCharacters, name)
{
    if(unallowedCharacters!=null && unallowedCharacters.length >0)
    {
      for(i = 0; i< unallowedCharacters.length; i++)
      {
        var unallowedString = unallowedCharacters[i];
        if(name.indexOf(unallowedString)>=0)
        {
          return true;
        }
      }
    }
    return false;
}
/*
 * this function is used to prevent user to enter unallowed characters into name fields
 * @param unallowedChars - unallowed characthers array 
 * @param obj - name field (for example text field for first, last or middle name)
 * @param error - java alert message 
 */
function checkAllNameFields(unallowedChars, obj, error)
{
  var name = obj.value;
  if(checkNameFieldsForUnallowedCharacters(unallowedChars,name))
  {
    alert(error);
    if (navigator.userAgent.indexOf('Firefox')!=-1)
     {
      obj.value = "";  
      setTimeout(function() { obj.focus(); }, 10); // obj.focus() doesn't work fine in ff (known ff bug).
     }
     else
     {
       obj.focus();
     }
    return false;
  }
}

function checkNameFieldsForUnallowedCharacters(unallowedCharacters, name)
{
    if(unallowedCharacters!=null && unallowedCharacters.length >0)
    {
      for(i = 0; i< unallowedCharacters.length; i++)
      {
        var unallowedString = unallowedCharacters[i];
        if(name.indexOf(unallowedString)>=0)
        {
          return true;
        }
      }
    }
    return false;
}
function changeLocaleNew(displayConfirmation, currentLocaleId, newLocaleId)
{
	if(newLocaleId==null)return false;

	okToSendAjaxRequest = false;
	document.forms[0].target = '';
	if (displayConfirmation)
	{
		var Msg = document.forms[0]['LOCALE_CHANGE_ALERT_MSG1_'+currentLocaleId].value + 
    	document.forms[0]['LOCALE_NAME_IN_CURRENT_LANGUAGE_'+newLocaleId].value + 
    	document.forms[0]['LOCALE_CHANGE_ALERT_MSG2_'+currentLocaleId].value + "\n\n" +
    	document.forms[0]['LOCALE_CHANGE_ALERT_MSG1_'+newLocaleId].value + 
    	document.forms[0]['LOCALE_NAME_IN_NATIVE_LANGUAGE_'+newLocaleId].value + 
    	document.forms[0]['LOCALE_CHANGE_ALERT_MSG2_'+newLocaleId].value;
      
		var r=confirm(Msg);
		if (r!=true)
		{
		  // revert selected item to original
		  setSelectedOptionMatchingValue(toggleSelectFieldName, currentLocaleId);
		  return false;
		}
		else
		{
		  setField('NEW_USER_PREFERRED_LOCALE_ID', newLocaleId);
		}	  
		  
	  
	  closeAllWindows();
	}
	else
	{
	  setField('NEW_USER_PREFERRED_LOCALE_ID', newLocaleId);
	}
       
	setFieldSafe('DISPLAY_CHANGE_ACTION', 'CHANGE_DISPLAY_LANGUAGE');
	return true;
}
// add more OS optionally
var os = (function() {
    var ua = navigator.userAgent.toLowerCase();
    return {
        isWin2K: /windows nt 5.0/.test(ua),
        isXP: /windows nt 5.1/.test(ua),
        isVista: /windows nt 6.0/.test(ua),
        isWin7: /windows nt 6.1/.test(ua),
        isWin8: /windows nt 6.2/.test(ua),
        isWin81: /windows nt 6.3/.test(ua)
    };
}());
