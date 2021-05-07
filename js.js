
// console 공통처리
if(window.console == undefined){console = {log : function(){}};}

var ServiceController = {

    mainForm : null,
    gdMain : null,
    DS_ETCCOVIQTTM01 : [],
    DS_HP_NO : [],
    DS_HISTORY : [],
    DS_Hoso : [],
    historyPop : null,
    gdHistory : null,
    
    saveGb : "insert",

    infoAgreePop : null,
    infoAgreeYn : "0",
    
    infoHosoPop : null,

    /**
     *  Funcion         : init()
     *  Description     : 초기화
     */
    init : function() {
        if (opener) {
            ServiceController.self= Config.pageContext;
        } else {
            ServiceController.self = this;
        }

        ServiceController.mainForm = jQuery(ServiceController.self).find("[name='mainForm']").FormExtender();
        
        ServiceController.setLoadEvent();    // 로드이벤트
        ServiceController.setBindEvent_Btn();// 버튼이벤트
        ServiceController.setBindEvent();
        
        // 설문 조회
        ServiceController.search();
    },

    /**
     *  Funcion         : setLoadEvent()
     *  Description     : 로드 이벤트
     */
    setLoadEvent : function() {

        ServiceController.gdMain = jQuery("table#gdMain").DataBindComponent({
            dataList : []
        });
        
        ServiceController.gdHistory = jQuery("table#gdHistory").DataGridComponent({
            dataList : []
        });
        
        // 자가체크 히스토리 내역 팝업
        ServiceController.historyPop = jQuery("#historyPop").PopupComponent({
            browserPopup : false,
            modal : false,
            width : 300,
            height : 350,
            scrollbars : "1"
        });
        
        // 자가체크 개인정보활용동의 팝업
        ServiceController.infoAgreePop = jQuery("#infoAgreePop").PopupComponent({
            browserPopup : false,
            modal : true,
            width : 730,
            height : 550,
            scrollbars : "1"
        });
        
        /* 서울캠퍼스 호소문 팝업 중지 20210423 
        // 호소문 팝업
        ServiceController.infoHosoPop = jQuery("#infoHosoPop").PopupComponent({
            width    : 850,
            height   : 715,
            sortable : true,
            onCloseX : function(){
                jQuery("#infoHosoPop").find("#btn_info_close").click();
            }
        });*/
        
    },
    
    /**
     *  Funcion         : setBindEvent_Btn()
     *  Description     : 버튼 이벤트 셋팅
     */
    setBindEvent_Btn : function() {
        // 제출 버튼 클릭시
        jQuery("#btn_agree").bind('click', function(){
            ServiceController.infoAgreeYn = "1";
            ServiceController.infoAgreePop.close();
        });
        
        // 제출 버튼 클릭시
        jQuery("#btn_confirm").bind('click', function(){
            if (ServiceController.saveChk()) {
                ServiceController.save();
            }
        });

        // 자가체크 횟수 클릭시 내역 팝업 띄움
        jQuery(".cnt").bind('click', function(){
            ServiceController.historyPop.open();
        });

        // 전체 아니오 클릭시
        jQuery("#lb_all_no").bind('click', function(){
            ServiceController.setAllChk(jQuery("#all_no"));
        });
        jQuery("#all_no").bind('click', function(){
            ServiceController.setAllChk(jQuery("#all_no"));
        });
        
        /* 코로나 호소문 사용 중지 20210423 
        // 호소문 닫기 버튼 클릭 시
        jQuery("#infoHosoPop #btn_info_close").click(function() {
            ServiceController.infoHosoPop.close();
            window.location.href='/port.do';
        });
        */
    },

    /**
     *  Funcion         : setBindEvent()
     *  Description     : 바인드 이벤트()
     */
    setBindEvent : function() {
        jQuery("input[type=radio]").each(function(i) {
            jQuery(this).bind("click", function() {
                if (jQuery(this).prop("checked")) {
                    if (jQuery(this).val() == "a") {
                        jQuery("#"+this.name+"_comment").show();
                        jQuery("#all_no").prop("checked", false);
                    } else {
                        jQuery("#"+this.name+"_comment").hide();
                    }
                }
            });    
        });
    
    },

    search : function() {
        Controller.action = "/PiopAct/findCoronavirusSulmun.do";
        Controller.submit(function(dataList) {

            ServiceController.DS_HISTORY = JCFUtils.getDataList(dataList, "DS_HISTORY");
            ServiceController.gdHistory.bindDataList({ 
                dataList : ServiceController.DS_HISTORY
            });

            ServiceController.DS_ETCCOVIQTTM01 = JCFUtils.getDataList(dataList, "DS_ETCCOVIQTTM01");
            if (ServiceController.DS_ETCCOVIQTTM01.length > 0) {
                ServiceController.saveGb = "update";
                ServiceController.DS_ETCCOVIQTTM01[0].c37 = "";
                ServiceController.DS_ETCCOVIQTTM01[0].c38 = "";
                ServiceController.DS_ETCCOVIQTTM01[0].c39 = "";
                ServiceController.DS_ETCCOVIQTTM01[0].c40 = "";
                ServiceController.DS_ETCCOVIQTTM01[0].c41 = "";
                ServiceController.DS_ETCCOVIQTTM01[0].c42 = "";
                ServiceController.infoAgreeYn = ServiceController.DS_ETCCOVIQTTM01[0].infoAgreeYn;
                
                jQuery("#chkCnt").text(ServiceController.DS_ETCCOVIQTTM01[0].chkCnt);
            } else {
	            ServiceController.DS_ETCCOVIQTTM01 = [{
	                rowUpdateGb : "insert",
	                rowStatus   : "insert",
	                uuid        : "",
	                gaeinNo     : "",
	                c00         : "",
	                c01         : "",
	                c02         : "",
	                c03         : "",
	                c04         : "",
	                c05         : "",
	                c06         : "",
	                c07         : "",
	                c08         : "",
	                c09         : "",
	                c10         : "",
	                c11         : "",
	                c12         : "",
	                c13         : "",
	                c14         : "",
	                c15         : "",
	                c16         : "",
	                c17         : "",
	                c20         : "",
	                c21         : "",
	                c22         : "",
	                c23         : "",
	                c24         : "",
	                c25         : "",
	                c29         : "",
	                c30         : "",
	                c31         : "",
	                c32         : "",
	                c33         : "",
	                c34         : "",
	                c35         : "",
	                c36         : "",
	                c37         : "",
	                c38         : "",
	                c39         : "",
	                c40         : "",
	                c41         : "",
	                c42         : "",
	                infoAgreeYn : "0"
	            }];
	            jQuery("#chkCnt").text("0");
            }

        
            if (ServiceController.infoAgreeYn != "1") {
                ServiceController.infoAgreePop.open();
            }

            ServiceController.gdMain.bindDataList({ 
                dataList : ServiceController.DS_ETCCOVIQTTM01,
                rowIndex : 0
            });
            
            /* 서울 캠퍼스 코로나 호소문 사용 중지 20210423
            ServiceController.DS_Hoso = JCFUtils.getDataList(dataList, "DS_Hoso");
            
            // 20210409 서울캠퍼스일 경우 호소문 일 1회 레이어팝업 보여지도록 반영
            if ("H" == "H") {
                if (ServiceController.DS_Hoso[0].viewYn == 0) {
                    ServiceController.infoHosoPop.open();
                    //호소문 저장
                    ServiceController.saveHosomoon();
                    
                }
            }
            */
            
        });      
        
          
    },
    
    saveChk : function() {
        if (ServiceController.infoAgreeYn != "1") {
            MessageUtils.show({
                msg : "개인정보 수집 활용에 동의를 해야합니다.",
                close : function() {
                    ServiceController.infoAgreePop.open();
                }
            });
            return false;
        }
        if (!jQuery("#gdMain input").validate()){
            return false; 
        }
        if (StringUtils.isEmpty(jQuery("input[name='c37']:checked").val())) {
            MessageUtils.show('1번 문항에 답변하세요.');
            jQuery("input[name='c37']").focus();
            return false;
        }
        else if (StringUtils.isEmpty(jQuery("input[name='c38']:checked").val())) {
            MessageUtils.show('2번 문항에 답변하세요.');
            jQuery("input[name='c38']").focus();
            return false;
        }
        else if (StringUtils.isEmpty(jQuery("input[name='c39']:checked").val())) {
            MessageUtils.show('3번 문항에 답변하세요.');
            jQuery("input[name='c39']").focus();
            return false;
        }
        else if (StringUtils.isEmpty(jQuery("input[name='c40']:checked").val())) {
            MessageUtils.show('4번 문항에 답변하세요.');
            jQuery("input[name='c40']").focus();
            return false;
        }
        else if (StringUtils.isEmpty(jQuery("input[name='c41']:checked").val())) {
            MessageUtils.show('5번 문항에 답변하세요.');
            jQuery("input[name='c41']").focus();
            return false;
        }else if (StringUtils.isEmpty(jQuery("input[name='c42']:checked").val())) {
            MessageUtils.show('6번 문항에 답변하세요.');
            jQuery("input[name='c42']").focus();
            return false;
        }
        
        return true;      
    },
    
    /**
     *  Funcion         : save()
     *  Description     : 설문 저장
     */
    save : function() {
        ServiceController.DS_ETCCOVIQTTM01[0].rowUpdateGb = ServiceController.saveGb;
        ServiceController.DS_ETCCOVIQTTM01[0].rowStatus = ServiceController.saveGb;
        ServiceController.DS_ETCCOVIQTTM01[0].infoAgreeYn = ServiceController.infoAgreeYn;
        
        var params = new Object();
        params.DS_ETCCOVIQTTM01 = ServiceController.DS_ETCCOVIQTTM01[0];

        Controller.action = "/PiopAct/saveCoronavirusSulmun.do";
        Controller.setParams(null, params);
        Controller.submit(function(dataList) {
            MessageUtils.show('설문이 제출 되었습니다.');
            //ServiceController.search();
            window.location.href='/port.do';
        });
    },
    
    /**
     *  Funcion         : saveHosomoon()
     *  Description     : 호소문 저장
     */
     /* 서울 캠퍼스 호소문 사용 중지 20210423
     saveHosomoon : function() {
        
        var params = new Object();
        //params.DS_ETCCOVIQTTM01 = ServiceController.DS_ETCCOVIQTTM01[0];

        Controller.action = "/PiopAct/saveCoronavirusHosomoon.do";
        Controller.setParams(null, params);
        Controller.submit(function(dataList) {
            //MessageUtils.show('설문이 제출 되었습니다.');
            //ServiceController.search();
            //window.location.href='/port.do';
        });
    },*/
    
    /**
     * Function    : setAllChk(obj)
     * Description : 전체 예/아니오 클릭시 셋팅 
     */
    setAllChk : function (obj) {
        if (obj.prop("checked")) {
            jQuery("input[type=radio]").each(function(i) {
                if (jQuery(this).val() == "b") {
                    jQuery(this).prop("checked", true);
                    jQuery(this).trigger("click");
                }
            });
        } else {
            jQuery("input[type=radio]").each(function(i) {
                if (jQuery(this).val() == "b") {
                    jQuery(this).prop("checked", false);
                    jQuery(this).trigger("click");
                }
            });
        }    
    }
    
}
