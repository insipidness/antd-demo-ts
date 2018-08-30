<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript" src="/workflow/request/sunny/tools.js"></script>
<script type="text/javascript">
var clf = 'field64524'; // 差旅费
var ycf = 'field64525'; // 应酬费
var sqr = "field64451";
var gysbh = "field64470";
var lkr = "field64472";
var lkrgh = "field64488";
var wd = "field64474";
var yhzh = "field64473";
var sqdh = "field64507";
var pjshy = "field64515";
var cwzfcn = "field64516";
var ccyfzj = 'field64607'; // 此次应付总计
var yjgs = 'field64478'; // 一级公司，报销人公司
var bxfs = 'field64592' // 报销方式

var clf_sezj = 'field64556' // 税额总计
var clf_jpfy = 'field64557' // 机票费用



//--------------------------------------------------

var clf_dt5_x_hzje = 'field64550_'  // 核准现币金额
var clf_dt5_y_hzje = 'field64552_'  // 报销原币金额
var clf_dt5_hl = 'field64551_' // 汇率
var clf_dt5_bz = 'field64554_' // 备注


var clf_zj = 'field64527' // 应酬费总计
var clf_yjbyj = 'field64586' // 应酬费已借备用金
var clf_ghbyj = 'field64587' // 应酬费归还备用金
var clf_fbxr = 'field64575' // 应酬费付报销人
var clf_ghgsk = 'field64576' //  应酬费归还公司款
var clf_dt7_hl = 'field64560_' // 汇率
var clf_dt7_ghbyj = 'field64562_' // 归还备用金

var ycf_dt8_x_hzje = 'field64573_'  // 核准现币金额
var ycf_dt8_y_hzje = 'field64572_'  // 报销原币金额
var ycf_dt8_hl = 'field64571_' // 汇率
var ycf_dt8_bz = 'field64574_' // 备注

var ycf_zj = 'field64528' // 应酬费总计
var ycf_yjbyj = 'field64588' // 应酬费已借备用金
var ycf_ghbyj = 'field64589' // 应酬费归还备用金
var ycf_fbxr = 'field64577' // 应酬费付报销人
var ycf_ghgsk = 'field64578' //  应酬费归还公司款
var ycf_dt9_hl = 'field64581_' // 汇率
var ycf_dt9_ghbyj = 'field64583_' // 归还备用金

var dt10_xje = 'field64605_'
var dt10_xje_dx = 'field64606_'

var jpfy = 'field64557'
var clf_ftje;
jQuery(document).ready(function () {
    init();
    init_save();
    jQuery("#" + sqr).bindPropertyChange(function (obj) {
        var sqrgh_v = obj.value;
        if (sqrgh_v != "") {
            jQuery.ajax({
                url: "/workflow/request/sunny/getWorkflow31789.jsp",
                type: "post",
                async: false,
                dataType: "json",
                data: {"method": "getcwry", "sqrid": sqrgh_v},
                success: function (data) {
                    setFMVal(pjshy, data.pjshy, data.pjshy);
                    setFMVal(cwzfcn, data.cwcn, data.cwcn);
                }
            });
            jQuery.ajax({
                url: "/workflow/request/sunny/getWorkflow31789.jsp",
                type: "post",
                async: false,
                dataType: "json",
                data: {"method": "getskrinfo", "sqrid": sqrgh_v},
                success: function (data) {
                    setFMVal(lkr, data.id, data.c_yhhmcn);
                    if (data.id != "") {
                        jQuery("#" + lkr + "spanimg").html("");
                    } else {
                        jQuery("#" + lkr + "spanimg").html("<img align=\"absmiddle\" src=\"/images/BacoError_wev8.gif\">");
                    }
                    setFMVal(yhzh, data.c_yhzh, data.c_yhzh);
                    setFMVal(wd, data.c_wd, data.c_wd);
                    setFMVal(lkrgh, data.lkrgh, data.lkrgh);
                    setFMVal(gysbh, data.gysbhid, data.gysbh);
                    if (data.gysbhid != "") {
                        needcheck(gysbh);
                    } else {
                        deleteneedcheck(gysbh);
                    }
                    // setFMVal("requestname", ngrq_v + data.sqrxm + "费用报销", ngrq_v + data.sqrxm + "费用报销");
                }
            });
        } else {
            setFMVal("requestname", "", "");
            setFMVal(lkr, "", "");
            setFMVal(yhzh, "", "");
            setFMVal(wd, "", "");
            setFMVal(lkrgh, "", "");
            setFMVal(gysbh, "", "");
            deleteneedcheck(gysbh);
            setFMVal(sqdh, "", "");
        }
    });
});
function init(){
    bxfsShow()
    bxlxShow()
    setTimeout(hzbwbjeChange,500);
    setTimeout(ghbyjChange,500);
    setTimeout(ftjeFn,500)
}



function bxfsShow(){
    if(jQuery("#"+bxfs).val() == 0){
        jQuery('.zz').show()
    }else{
        jQuery('.zz').hide()
    }
}
function bxlxShow(){
    if(jQuery("#"+clf).val() == 1){
        jQuery('.clf').show()
        needcheck2(clf_sezj)
        if(jQuery("#"+yjgs).val() == 64){
            jQuery('.jpfy').show()
            needcheck2(clf_jpfy)
        }else{
            jQuery('.jpfy').hide()
            deleteneedcheck2(clf_jpfy)
        }
    }else{
        jQuery('.clf').hide()
        deleteneedcheck2(clf_sezj)
        deleteneedcheck2(clf_jpfy)
    }
    if(jQuery("#"+ycf).val() == 1){
        jQuery('.ycf').show()
    }else{
        jQuery('.ycf').hide()
    }
}

function jpfy(){
    jQuery("#"+jpfy).bind("blur",function(){
        fbxr_count_ghbyj()
    })
}


/**
 *  页面初始化给每个原币金额核准表 核准原币金额 绑定 失去焦点事件
 */
function hzbwbjeChange(){
    var index5 = jQuery("#indexnum5").val() * 1.0;
    var submitdtlid5List = jQuery("#submitdtlid5").val().split(",");
    hzbwbjeChangeFn(index5,clf_dt5_x_hzje,clf_dt5_y_hzje,clf_dt5_hl,clf_dt5_bz,submitdtlid5List,clf_zj,clf_yjbyj,clf_ghbyj,'clf')

    var index8 = jQuery("#indexnum8").val() * 1.0;
    var submitdtlid8List = jQuery("#submitdtlid8").val().split(",");
    hzbwbjeChangeFn(index8,ycf_dt8_x_hzje,ycf_dt8_y_hzje,ycf_dt8_hl,ycf_dt8_bz,submitdtlid8List,ycf_zj,ycf_yjbyj,ycf_ghbyj,'ycf');

    var index11 = jQuery("#indexnum11").val() * 1.0;
    var submitdtlid11List = jQuery("#submitdtlid11").val().split(",");
    hzbwbjeChangeFn(index11,clf_dt11_x_hzje,clf_dt11_y_hzje,clf_dt11_hl,clf_dt11_bz,submitdtlid11List,'','','','ycf');

}

var clf_dt11_x_hzje = 'field64818_'  // 核准现币金额
var clf_dt11_y_hzje = 'field64817_'  // 报销原币金额
var clf_dt11_hl = '' // 汇率
var clf_dt11_bz = 'field64823_' // 备注
var clf_dt11_se = 'field64556'  // 税额
var clf_dt11_bhsje = 'field64819_'; // 不含税金额



function ftjeFn() {
    hidedist();
    /**
     *  @data 明细行核准报销金额 id
     *  大于总计清空
     */
    jQuery("#"+clf_dt11_se).on("change",function (e,data) {
        var zj_v = jQuery("#"+clf_zj).val();
        var _se = jQuery(this).val();
        var _zj = 0;
        console.log("aaaaaaaaaaaaaaaaaaaaa")
        jQuery("input[id^='" + clf_dt11_x_hzje + "']").each(function () {
            var _i = jQuery(this).attr("id").split("_")[1];
            var _v = (zj_v - jQuery(this).val()) * _se / zj_v;
            setFMVal(clf_dt11_bhsje+_i,_v.toFixed(2),_v.toFixed(2))
            _zj += Number(jQuery(this).val())
        });
        if(_zj > zj_v){
            top.Dialog.alert('总报销金额不能大于总计金额');
            if(data) setFMVal(data,'','');
        }
    });
}


/**
 *  修改核准金额通用方法
 *  @list 明细表总数
 *  @x_hzje 现金额
 *  @y_hzje 原金额
 *  @hl 汇率
 *  @bz 备注
 *  @submitdtlidList 明细行现有几条
 */

function hzbwbjeChangeFn(list,x_hzje,y_hzje,hl,bz,submitdtlidList,table_zj,table_yjbyj,table_ghbyj,type){
    for(var i=0;i<list;i++){
        jQuery("#"+x_hzje+i).bind("blur",function(){
            var index = jQuery(this).attr("id").split("_")[1];
            var count1 = jQuery("#"+y_hzje+index).val();
            /**
             * 分摊金额没有汇率，不走汇率相乘
             */
            if(hl){
                var count2 = jQuery("#"+x_hzje+index).val() * jQuery("#"+hl+index).val();
            }else{
                var count2 = jQuery("#"+x_hzje+index).val() * 1.00
            }
            if(count1 != count2){
                needcheck2(bz+index)
            }else{
                deleteneedcheck2(bz+index)
            }
            var _v = "";
            if(hl){
                for(var i=0;i<submitdtlidList.length;i++){
                    var _this = jQuery("#" + x_hzje + submitdtlidList[i]).val();
                    var _hl = jQuery("#" + hl + submitdtlidList[i]).val();
                    if(_this){
                        _v = (_this)*_hl + (_v-0)
                    }
                }
                var yjbyj = jQuery("#"+table_yjbyj).val();
                var ghbyj = jQuery("#"+table_ghbyj).val();
                setFMVal(table_zj,_v,_v)
                fbxr_count_ghbyj(_v,yjbyj,ghbyj,type)
            }
            jQuery("#"+clf_dt11_se).trigger("change",x_hzje+index)
        })
    }
}


// 归还备用金
function ghbyjChange(){
    //  差旅
    var index6 = jQuery("#indexnum6").val() * 1.0;
    var dt6_ghbyj_list = jQuery("#submitdtlid6").val().split(",");
    ghbyjFn(index6,clf_dt7_ghbyj,dt6_ghbyj_list,clf_dt7_hl,clf_zj,clf_yjbyj,clf_ghbyj,'clf')
    // 应酬
    var index9 = jQuery("#indexnum9").val() * 1.0;
    var dt9_ghbyj_list = jQuery("#submitdtlid9").val().split(",");
    ghbyjFn(index9,ycf_dt9_ghbyj,dt9_ghbyj_list,ycf_dt9_hl,ycf_zj,ycf_yjbyj,ycf_ghbyj,'ycf')
}

/**
 *  归还备用金通用方法
 *  @list 明细表总数
 *  @ghbyj 归还备用金，需要绑定失去焦点的对象
 *  @submitdtlid 总共有多少条
 *  @hl 汇率
 *  @table 主表上的字段
 */
function ghbyjFn(list,ghbyj,submitdtlid,hl,table_zj,table_yjbyj,table_ghbyj,type){
    for(var i=0;i<list;i++){
        jQuery("#"+ghbyj+i).bind("blur",function(){
            var _v = "";
            for(var i=0; i<submitdtlid.length;i++){
                var _this = jQuery("#"+ghbyj+submitdtlid[i]).val();
                var _hl = jQuery("#"+hl+submitdtlid[i]).val();
                if(_this){
                    _v = (_this)*_hl + (_v-0)
                }
            }
            setFMVal(table_ghbyj, _v.toFixed(2), _v.toFixed(2));
            var zj = jQuery("#"+table_zj).val();
            var yjbyj = jQuery("#"+table_yjbyj).val();
            fbxr_count_ghbyj(zj,yjbyj,_v,type)
        })
    }
}


/**
 * 差旅费 付报销人 计算
 * 归还备用金计算 通过js求和
 * @zj 总计
 * @yjbyj 已借备用金
 * @ghbyj 归还备用金
 * @type clf 差旅费
 */
function fbxr_count_ghbyj(zj,yjbyj,ghbyj,type){
    var jpfy_v = jQuery("#"+jpfy).val()
    var count = zj - (yjbyj - ghbyj)
    if(type == 'clf'){
        var count = zj - yjbyj - ghbyj - jpfy_v
    }
    var count1 = zj - yjbyj;
    if(type == 'clf'){
        if(count > 0){
            jQuery('.clf_fbxr').show();
        }else{
            jQuery('.clf_fbxr').hide();
        }
        if(count1 < 0){
            jQuery('.clf_yhgsk').show();
        }else{
            jQuery('.clf_yhgsk').hide();
        }
        setFMVal(clf_fbxr,count.toFixed(2),count.toFixed(2));
        setFMVal(clf_ghgsk,count1.toFixed(2),count1.toFixed(2));
    }else{
        if(count > 0){
            jQuery('.ycf_fbxr').show();
        }else{
            jQuery('.ycf_fbxr').hide();
        }
        if(count1 < 0){
            jQuery('.ycf_yhgsk').show();
        }else{
            jQuery('.ycf_yhgsk').hide();
        }
        setFMVal(ycf_fbxr,count.toFixed(2),count.toFixed(2));
        setFMVal(ycf_ghgsk,count1.toFixed(2),count1.toFixed(2));
    }

    ccyfzj_count()
}

//此次应付总计求和
function ccyfzj_count(){
    var ccyfzj_count = "";
    var count1 = 0;
    var count2 = 0;
    if(jQuery("#"+clf).val()==1){
        count1 = jQuery("#"+clf_fbxr).val() * 1.0;
    }
    if(jQuery("#"+ycf).val()==1){
        count2 = jQuery("#"+ycf_fbxr).val() * 1.0;
    }
    ccyfzj_count = count1 + count2
    setFMVal(ccyfzj,ccyfzj_count.toFixed(2),ccyfzj_count.toFixed(2))
}

// 现金额保存初始化
jQuery("input[id^='" + dt10_xje + "']").each(function(){
    jQuery(this).bind("change",function(){
        setjedx(this)
    })
    setjedx(this)
})


function formatMoney(mnum){
    var mnum = parseFloat(mnum);
    var strOutput="",strTemp="",strInTemp='';
    var unitArray = new Array("圆万亿","仟佰拾","零壹贰叁肆伍陆柒捌玖");
    var mnumArray = mnum.toString().split('.');
    var integralnum = mnumArray[0];
    var integrallen = integralnum.length;
    var decimalnum = (mnum.toString().indexOf('.')>=0) ? mnumArray[1].substr(0, 2) : '0';
    var decimallen = decimalnum.length;
    var ints = parseInt(integrallen/4);
    var inty = integrallen%4;
    if (ints>3 || (ints==3 && inty>0)) return "超出范围";
    if (inty>0)
    {
        ints++;
        integralnum = "0000".substr(inty)+integralnum;
        integrallen = integralnum.length;
    }
    var i = 0;
    while (i<integrallen)
    {
        var strOutTemp = "";
        strTemp = integralnum.substr(i, 4);
        i += 4;
        for (var j=0; j<4; j++)
        {
            strInTemp = parseInt(strTemp.substr(j, 1));
            strOutTemp += unitArray[2].substr(strInTemp, 1);
            if (strInTemp>0 && j<3) strOutTemp += unitArray[1].substr(j, 1);
        }
        strOutTemp = strOutTemp.replace(/零+$/, "");
        ints--;
        if (strOutTemp!="") strOutTemp += unitArray[0].substr(ints, 1);
        if (strTemp.substr(3,1)=='0') strOutTemp += "零";
        strOutput += strOutTemp;
    }
    strOutput = strOutput.replace(/零+/g, "零").replace(/^零/, "").replace(/零$/, "");
    if (strOutput=="圆") strOutput = "";
    if (decimallen==2)
    {
        strOutput += (decimalnum.charAt(0)!='0') ? unitArray[2].substr(parseInt(decimalnum.charAt(0)), 1)+"角" : "零";
        if (strOutput=="零") strOutput = "";
        strOutput += unitArray[2].substr(parseInt(decimalnum.charAt(1)), 1)+"分";
    }
    else
    {
        if (decimalnum!='0') strOutput += unitArray[2].substr(parseInt(decimalnum), 1)+"角";
        if (strOutput!="") strOutput += "整";
    }
    if (strOutput=="") strOutput = "零";
    return strOutput;
}

function setjedx(arg){
    var _this = arg
    var _index = jQuery(_this).attr("id").split("_")[1]
    var _v = formatMoney(jQuery(_this).val())
    jQuery("#"+dt10_xje_dx+_index).prev().html(_V)
}

//
function init_save(){
    var v1 = "";
    jQuery("input[id^='" + clf_dt5_x_hzje + "']").each(function () {
        var index = jQuery(this).attr("id").split("_")[1];
        var _this = jQuery(this).val();
        var _hl = jQuery("#" + clf_dt5_hl + index).val();
        if(_this){
            v1 = (_this)*_hl + (v1-0)
        }

        var yjbyj = jQuery("#"+clf_yjbyj).val();
        var ghbyj = jQuery("#"+clf_ghbyj).val();
        setFMVal(clf_zj,v1,v1)
        fbxr_count_ghbyj(v1,yjbyj,ghbyj,'clf')
    });

    var v2 = "";
    jQuery("input[id^='" + ycf_dt8_x_hzje + "']").each(function () {
        var index = jQuery(this).attr("id").split("_")[1];
        var _this = jQuery(this).val();
        var _hl = jQuery("#" + ycf_dt8_hl + index).val();
        if(_this){
            v2 = (_this)*_hl + (v2-0)
        }

        var yjbyj = jQuery("#"+ycf_yjbyj).val();
        var ghbyj = jQuery("#"+ycf_ghbyj).val();
        setFMVal(ycf_zj,v2,v2)
        fbxr_count_ghbyj(v2,yjbyj,ghbyj,'ycf')
    });

    var v3 = "";
    jQuery("input[id^='" + clf_dt7_ghbyj + "']").each(function () {
        var index = jQuery(this).attr("id").split("_")[1];
        var _this = jQuery(this).val();
        var _hl = jQuery("#" + clf_dt7_hl + index).val();
        if(_this){
            v3 = (_this)*_hl + (v3-0)
        }
        setFMVal(clf_ghbyj, v3.toFixed(2), v3.toFixed(2));
        var zj = jQuery("#"+clf_zj).val();
        var yjbyj = jQuery("#"+clf_yjbyj).val();
        fbxr_count_ghbyj(zj,yjbyj,v3,'clf')
    });

    var v4 = "";
    jQuery("input[id^='" + ycf_dt9_ghbyj + "']").each(function () {
        var index = jQuery(this).attr("id").split("_")[1];
        var _this = jQuery(this).val();
        var _hl = jQuery("#" + ycf_dt9_hl + index).val();
        if(_this){
            v4 = (_this)*_hl + (v4-0)
        }
        setFMVal(ycf_ghbyj, v4.toFixed(2), v4.toFixed(2));
        var zj = jQuery("#"+ycf_zj).val();
        var yjbyj = jQuery("#"+ycf_yjbyj).val();
        fbxr_count_ghbyj(zj,yjbyj,v4,'ycf')
    });
}

function hidedist(){
    jQuery('.dist').each(function(){
        var _input = jQuery(this).find("input");
        var _span = jQuery(this).find("span");
        var _v = _input.val();
        _input.hide()
        _span.html(_v)
    })
}

</script>















