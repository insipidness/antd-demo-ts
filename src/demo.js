<!-- script代码，如果需要引用js文件，请使用与HTML中相同的方式。 -->
<script type="text/javascript" src="/workflow/request/sunny/tools.js"></script>
<script>
var sfzjlsp = "field61950";
var mx1bb = "field61943_";
var mx1ysje = "field61942_";
var mx1hl = "field61944_";
var mx1ysbbje = "field61945_";
var mx2bb = "field61951_";
var mx2hl = "field61953_";
var mx2zffs = "field61956_";
var gsbh = "field61972";
var sqrgh = "field61939";
var ngrgh = "field61934";
var bh = "field61928";
var sqr = "field61938";
var gysbh = "field61957";
var lkr = "field61959";
var lkrgh = "field61975";
var wd = "field61961";
var yhzh = "field61960";
var sqdh = "field61994";
var mx3bb = "field61996_";
var mx3lqybje = "field61997_";
var mx3sqrhl = "field61998_";
var mx3lqbbje = "field61999_";
var mx3ybdxje = "field62000_";
var mx3zffs = "field62001_";
var ydjysze = "field61946";
var nggs = "field61929";
var lklx = "field61993";
var sfbhzh = "field61966";
var mx2lqbbje = "field61954_";
var pjshy = "field62002";
var cwzfcn = "field62003";

var yjgs = 'field64680'; // 一级公司，报销人公司


var href = window.location.href
//-------------------------//
var bxr = 'field64653'; // 报销人
var bxrgh = 'field64654'; // 报销人工号
var bxfs = 'field64793' // 报销方式
var clf = 'field62972'; // 差旅费
var ycf = 'field62973'; // 应酬费
var ngrq = "field64650";
var ycfReimburse
var yhzz = 'field64808'
var gsbh = 'field64687'

var needchecklist = ['field64726','field64727'];


jQuery(document).ready(function () {
    init();
    jQuery("#" + bxr).bindPropertyChange(function (obj) {
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
    if(href.indexOf("ViewRequest")==-1){

    }else{

    }
}






function hidedist(){
    jQuery('.dist').each(function(){
        var _input = jQuery(this).find("input");
        var _span = jQuery(this).find("span");
        var _v = _input.val();
        _input.hide()
        _span.html(_v)
    })
    jQuery(".bb_hide").each(function(){
        var _span = jQuery(this).find("span")
        jQuery(this).find("select").hide()
        var _v = jQuery(this).find("select option:selected").text()
        _span.html(_v)
    })
}

/**
 * 汇率select隐藏
 * @id
 * @index 下标
 * @val 值
 */
function select_hl_hide(id,index,val){
    jQuery(".bb_hide").find("select").hide()
    jQuery("#"+id+index+"span").html(val)
}
</script>




















