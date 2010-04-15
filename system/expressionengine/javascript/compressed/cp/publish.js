/*jslint browser: true, devel: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, immed: true */
"use strict";EE.publish=EE.publish||{};EE.publish.category_editor=function(){var k=[],d=$("<div />"),b=$('<div id="cat_modal_container" />').appendTo(d),j={},g={},l=EE.BASE+"&C=admin_content&M=category_editor&group_id=",f,e,a,h;function c(){return +new Date()}d.dialog({autoOpen:false,height:450,width:600,modal:true});$(".edit_categories_link").each(function(){var m=this.href.substr(this.href.lastIndexOf("=")+1);$(this).data("gid",m);k.push(m)});for(h=0;h<k.length;h++){j[k[h]]=$("#cat_group_container_"+[k[h]]);j[k[h]].data("gid",k[h]);g[k[h]]=$("#cat_group_container_"+[k[h]]).find(".cat_action_buttons").remove()}f=function(m){j[m].text("loading...").load(l+m+"&timestamp="+c()+" .pageContents table",function(){e.call(j[m],j[m].html(),false)})};e=function(r,t){var o=$(this),s=o.data("gid");r=$.trim(r);if(o.hasClass("edit_categories_link")){o=$("#cat_group_container_"+s)}if(r[0]!=="<"&&t){return f(s)}o.closest(".cat_group_container").find("#refresh_categories").show();var u=$(r),p=u.find("form"),q,w;if(p.length){b.html(u);q=b.find("input[type=submit]");w=b.find("form");var m=function(A){var z=A||$(this),x=z.serialize(),y=z.attr("action");$.ajax({url:y,type:"POST",data:x,dataType:"html",beforeSend:function(){o.html("loading...")},success:function(C){C=$.trim(C);d.dialog("close");if(C[0]=="<"){var B=$(C).find(".pageContents table"),D=B.find("form");if(D.length==0){o.html(B)}e.call(o,B,true)}else{e.call(o,C,true)}}});return false};w.submit(m);var v={};v[q.remove().attr("value")]=function(){m(w)};d.dialog("open");d.dialog("option","buttons",v);d.one("dialogclose",function(){f(s)})}else{g[s].clone().appendTo(o).show()}return false};a=function(){var m=$(this).data("gid"),o=".pageContents";if($(this).hasClass("edit_cat_order_trigger")||$(this).hasClass("edit_categories_link")){o+=" table"}if(!m){m=$(this).closest(".cat_group_container").data("gid")}j[m].text("loading...");$.get(this.href+"&timestamp="+c()+o,function(p){var q,r="";p=$.trim(p);if(p[0]=="<"){q=$(p).find(o);r=$("<div />").append(q).html();if(q.find("form").length==0){j[m].html(r)}}e.call(j[m],r,true)});return false};$(".edit_categories_link").click(a);$(".cat_group_container a:not(.cats_done)").live("click",a);$(".cats_done").live("click",function(){var m=$(this).closest(".cat_group_container");m.text("loading...").load(EE.BASE+"&C=content_publish&M=ajax_update_cat_fields&group_id="+m.data("gid")+"&timestamp="+c(),function(o){m.html($(o).html())});return false})};var selected_tab="";function tab_focus(a){if(!$(".menu_"+a).parent().is(":visible")){$("a.delete_tab[href=#"+a+"]").trigger("click")}$(".tab_menu li").removeClass("current");$(".menu_"+a).parent().addClass("current");$(".main_tab").hide();$("#"+a).fadeIn("fast");$(".main_tab").css("z-index","");$("#"+a).css("z-index","5");selected_tab=a}EE.tab_focus=tab_focus;function setup_tabs(){var b=500,c="menu_publish_tab",d=false,a="";$(".main_tab").sortable({handle:".handle",start:function(e,f){f.item.css("width",$(this).parent().css("width"))},stop:function(e,f){f.item.css("width","100%")}});$(".tab_menu li a").droppable({accept:".field_selector",tolerance:"pointer",deactivate:function(g,f){clearTimeout(a);$(".tab_menu li").removeClass("highlight_tab")},drop:function(g,f){field_id=f.draggable.attr("id").substring(11);tab_id=$(this).attr("title").substring(5);$("#hold_field_"+field_id).prependTo("#"+tab_id);$("#hold_field_"+field_id).hide().slideDown();tab_focus(tab_id);return false},over:function(g,f){tab_id=$(this).attr("title").substring(5);$(this).parent().addClass("highlight_tab");a=setTimeout(function(){tab_focus(tab_id);return false},b)},out:function(g,f){if(a!=""){clearTimeout(a)}$(this).parent().removeClass("highlight_tab")}});$("#holder .main_tab").droppable({accept:".field_selector",tolerance:"pointer",drop:function(g,f){field_id=(f.draggable.attr("id")=="hide_title"||f.draggable.attr("id")=="hide_url_title")?f.draggable.attr("id").substring(5):f.draggable.attr("id").substring(11);tab_id=$(this).attr("id");$("#hold_field_"+field_id).prependTo("#"+tab_id);$("#hold_field_"+field_id).hide().slideDown()}});$(".tab_menu li.content_tab a, #publish_tab_list a.menu_focus").unbind(".publish_tabs").bind("mousedown.publish_tabs",function(f){tab_id=$(this).attr("title").substring(5);tab_focus(tab_id);f.preventDefault()}).bind("click.publish_tabs",function(){return false})}setup_tabs();EE.publish.save_layout=function(){var g=0,e={},h={},o={},k=0,j=false,a=0,l=0,b=$("#tab_menu_tabs li.current").attr("id");$(".main_tab").show();$("#tab_menu_tabs a:not(.add_tab_link)").each(function(){if($(this).parent("li").attr("id")&&$(this).parent("li").attr("id")!==""){var q=$(this).text(),p=$(this).text().replace(/ /g,"_").toLowerCase();k=0;visible=true;if($(this).parent("li").is(":visible")){lay_name=q;e[lay_name]={}}else{j=true;visible=false}$("#"+p).find(".publish_field").each(function(){var s=$(this),v=this.id.replace(/hold_field_/,""),u=Math.round((s.width()/s.parent().width())*10)*10,r=$("#sub_hold_field_"+v+" .markItUp ul li:eq(2)"),t;if(r.html()!=="undefined"&&r.css("display")!=="none"){r=true}else{r=false}t={visible:($(this).css("display")==="none"||visible===false)?false:true,collapse:($("#sub_hold_field_"+v).css("display")==="none")?true:false,htmlbuttons:r,width:u+"%"};if(visible===true){t.index=k;e[lay_name][v]=t;k+=1}else{h[v]=t}});if(visible===true){g++}}});if(j==true){var d,c,m,f=0;for(darn in e){m=darn;for(c in e[m]){f=e[m][c]["index"]}break}$.each(h,function(){this["index"]=++f});jQuery.extend(e[m],h)}EE.tab_focus(b.replace(/menu_/,""));if(g===0){$.ee_notice(EE.publish.lang.tab_count_zero,{type:"error"})}else{if($("#layout_groups_holder input:checked").length===0){$.ee_notice(EE.publish.lang.no_member_groups,{type:"error"})}else{$.ajax({type:"POST",dataType:"json",url:EE.BASE+"&C=content_publish&M=save_layout",data:"XID="+EE.XID+"&json_tab_layout="+JSON.stringify(e)+"&"+$("#layout_groups_holder input").serialize()+"&channel_id="+EE.publish.channel_id,success:function(p){if(p.messageType==="success"){$.ee_notice(p.message,{type:"success"})}else{if(p.messageType==="failure"){$.ee_notice(p.message,{type:"error"})}}}})}}};EE.publish.remove_layout=function(){if($("#layout_groups_holder input:checked").length===0){return $.ee_notice(EE.publish.lang.no_member_groups,{type:"error"})}var a="{}";$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=save_layout",data:"XID="+EE.XID+"&json_tab_layout="+a+"&"+$("#layout_groups_holder input").serialize()+"&channel_id="+EE.publish.channel_id+"&field_group="+EE.publish.field_group,success:function(b){$.ee_notice(EE.publish.lang.layout_removed+' <a href="javascript:location=location">'+EE.publish.lang.refresh_layout+"</a>",{duration:0,type:"success"})}})};EE.date_obj_time=(function(){var a=new Date(),d=a.getHours(),b=a.getMinutes(),c=" AM";if(b<10){b="0"+b}if(d>11){d=d-12;c=" PM"}return" '"+d+":"+b+c+"'"}());$(document).ready(function(){var d;$("#layout_group_submit").click(function(){EE.publish.save_layout();return false});$("#layout_group_remove").click(function(){EE.publish.remove_layout();return false});$(".add_author_link").click(function(){$("#add_author_dialog").dialog("open");return false});function b(e){$.get(EE.BASE+"&C=content_publish&M=remove_author",{mid:e.attr("id")});e.parent().fadeOut();$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=build_author_table",data:"is_ajax=true"+$("#publishForm").serialize(),success:function(f){$("#authorsForm").html(f);updateAuthorTable()}})}$("#author_list_sidebar .delete").click(function(){b($(this));return false});$("a.reveal_formatting_buttons").click(function(){$(this).parent().parent().children(".close_container").slideDown();$(this).hide();return false});$("#write_mode_header .reveal_formatting_buttons").hide();$("#holder").corner("bottom-left");if(EE.publish.smileys==true){$("a.glossary_link").click(function(){$(this).parent().siblings(".glossary_content").slideToggle("fast");$(this).parent().siblings(".smileyContent .spellcheck_content").hide();return false});$("a.smiley_link").toggle(function(){$(this).parent().siblings(".smileyContent").slideDown("fast",function(){$(this).css("display","")})},function(){$(this).parent().siblings(".smileyContent").slideUp("fast")});$(this).parent().siblings(".glossary_content, .spellcheck_content").hide();$(".glossary_content a").click(function(){$.markItUp({replaceWith:$(this).attr("title")});return false})}if(EE.publish.autosave){d=function(){var e=$("#tools:visible"),f;if(e.length===1){disable_fields(true)}f=$("#publishForm").serialize();if(e.length===1){disable_fields(false)}$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=autosave_entry",data:f,success:function(g){if(isNaN(g)){if(EE.publish.autosave.error_state=="false"){$.ee_notice(g,{type:"error"});EE.publish.autosave.error_state="true"}}else{if(EE.publish.autosave.error_state=="true"){EE.publish.autosave.error_state="false"}$.ee_notice(EE.publish.autosave.success,{type:"success"})}}})};setInterval(d,1000*EE.publish.autosave.interval)}$(".markItUp ul").append('<li class="btn_plus"><a title="'+EE.lang.add_new_html_button+'" href="'+EE.BASE+"&C=myaccount&M=html_buttons&id="+EE.user_id+'">+</a></li>');$(".btn_plus a").click(function(){return confirm(EE.lang.confirm_exit,"")});$(".markItUpHeader ul").prepend('<li class="close_formatting_buttons"><a href="#"><img width="10" height="10" src="'+EE.THEME_URL+'images/publish_minus.gif" alt="Close Formatting Buttons"/></a></li>');$(".close_formatting_buttons a").toggle(function(){$(this).parent().parent().children(":not(.close_formatting_buttons)").hide();$(this).parent().parent().css("height","13px");$(this).children("img").attr("src",EE.THEME_URL+"images/publish_plus.png")},function(){$(this).parent().parent().children().show();$(this).parent().parent().css("height","22px");$(this).children("img").attr("src",EE.THEME_URL+"images/publish_minus.gif")});if(EE.publish.pages){var c=$("#pages_uri"),a=EE.publish.pages.pagesUri;if(!c.value){c.val(a)}c.focus(function(){if(this.value===a){$(this).val("")}}).blur(function(){if(this.value===""){$(this).val(a)}})}});file_manager_context="";function disable_fields(c){var a=$(".main_tab input, .main_tab textarea, .main_tab select, #submit_button"),b=$("#submit_button"),d=$("#holder").find("a");if(c){a.attr("disabled",true);b.addClass("disabled_field");d.addClass("admin_mode");$("#holder div.markItUp, #holder p.spellcheck").each(function(){$(this).before('<div class="cover" style="position:absolute;width:100%;height:50px;z-index:9999;"></div>').css({})})}else{a.removeAttr("disabled");b.removeClass("disabled_field");d.removeClass("admin_mode");$(".cover").remove()}}function removeAuthor(a){$.get(EE.BASE+"&C=content_publish&M=remove_author",{mid:a.attr("id")});a.parent().fadeOut()}function updateAuthorTable(){$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=build_author_table",data:"XID="+EE.XID+"&is_ajax=true",success:function(a){$("#authorsForm").html(a)}});$(".add_author_modal").bind("click",function(a){add_authors_sidebar(this)})}function add_authors_sidebar(b){var a=$(b).attr("id").substring(16);$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=build_author_sidebar",data:"XID="+EE.XID+"&author_id="+a,success:function(c){$("#author_list_sidebar").append(c).fadeIn();updateAuthorTable()}})}function liveUrlTitle(){var e="",b=EE.publish.word_separator,d=document.getElementById("title").value||"",a=document.getElementById("url_title"),h=new RegExp(b+"{2,}","g"),j=(b!=="_")?/\_/g:/\-/g,k="",g,f;if(e!==""){if(d.substr(0,e.length)===e){d=d.substr(e.length)}}d=d.toLowerCase().replace(j,b);for(g=0;g<d.length;g++){f=d.charCodeAt(g);if(f>=32&&f<128){k+=d.charAt(g)}else{if(f in EE.publish.foreignChars){k+=EE.publish.foreignChars[f]}}}d=k;d=d.replace("/<(.*?)>/g","");d=d.replace(/\s+/g,b);d=d.replace(/\//g,b);d=d.replace(/[^a-z0-9\-\._]/g,"");d=d.replace(/\+/g,b);d=d.replace(h,b);d=d.replace(/^[-_]|[-_]$/g,"");d=d.replace(/\.+$/g,"");if(a){a.value=d}}var selField=false,selMode="normal";function setFieldName(a){if(a!=selField){selField=a;clear_state();tagarray=new Array();usedarray=new Array();running=0}}function taginsert(item,tagOpen,tagClose){var which=eval("item.name");if(!selField){$.ee_notice(no_cursor);return false}var theSelection=false,result=false,theField=document.getElementById("entryform")[selField];if(selMode=="guided"){data=prompt(enter_text,"");if((data!=null)&&(data!="")){result=tagOpen+data+tagClose}}if(document.selection){theSelection=document.selection.createRange().text;theField.focus();if(theSelection){document.selection.createRange().text=(result==false)?tagOpen+theSelection+tagClose:result}else{document.selection.createRange().text=(result==false)?tagOpen+tagClose:result}theSelection="";theField.blur();theField.focus();return}else{if(!isNaN(theField.selectionEnd)){var newStart,scrollPos=theField.scrollTop,selLength=theField.textLength,selStart=theField.selectionStart,selEnd=theField.selectionEnd;if(selEnd<=2&&typeof(selLength)!="undefined"){selEnd=selLength}var s1=(theField.value).substring(0,selStart);var s2=(theField.value).substring(selStart,selEnd);var s3=(theField.value).substring(selEnd,selLength);if(result==false){newStart=selStart+tagOpen.length+s2.length+tagClose.length;theField.value=(result==false)?s1+tagOpen+s2+tagClose+s3:result}else{newStart=selStart+result.length;theField.value=s1+result+s3}theField.focus();theField.selectionStart=newStart;theField.selectionEnd=newStart;theField.scrollTop=scrollPos;return}else{if(selMode=="guided"){curField=document.submit_post[selfField];curField.value+=result;curField.blur();curField.focus();return}}}if(item=="other"){eval("document.getElementById('entryform')."+selField+".value += tagOpen")}else{if(eval(which)==0){var result=tagOpen;eval("document.getElementById('entryform')."+selField+".value += result");eval(which+" = 1");arraypush(tagarray,tagClose);arraypush(usedarray,which);running++;styleswap(which)}else{n=0;for(i=0;i<tagarray.length;i++){if(tagarray[i]==tagClose){n=i;running--;while(tagarray[n]){closeTag=arraypop(tagarray);eval("document.getElementById('entryform')."+selField+".value += closeTag")}while(usedarray[n]){clearState=arraypop(usedarray);eval(clearState+" = 0");document.getElementById(clearState).className="htmlButtonA"}}}if(running<=0&&document.getElementById("close_all").className=="htmlButtonB"){document.getElementById("close_all").className="htmlButtonA"}}}curField=eval("document.getElementById('entryform')."+selField);curField.blur();curField.focus()}$(document).ready(function(){$.ee_filebrowser();var b="";if(EE.publish.show_write_mode==true){$("#write_mode_textarea").markItUp(myWritemodeSettings)}$(".write_mode_trigger").click(function(){if($(this).attr("id").match(/^id_\d+$/)){b="field_"+$(this).attr("id")}else{b=$(this).attr("id").replace(/id_/,"")}$("#write_mode_textarea").val($("#"+b).val());$("#write_mode_textarea").focus();return false});$.each(EE.publish.markitup.fields,function(c,d){$("#"+c).markItUp(mySettings)});$(".btn_img a, .file_manipulate").click(function(){var c;if($(this).closest("#markItUpWrite_mode_textarea").length){c="write_mode_textarea"}else{c=$(this).closest(".publish_field").attr("id").replace("hold_field_","field_id_")}if(c!=undefined){$("#"+c).focus()}window.file_manager_context=$("#"+c).filter("textarea").length?"textarea_a8LogxV4eFdcbC":c});$.ee_filebrowser.add_trigger(".btn_img a, .file_manipulate",function(c){if(window.file_manager_context=="textarea_a8LogxV4eFdcbC"){if(!c.is_image){$.markItUp({name:"Link",key:"L",openWith:'<a href="{filedir_'+c.directory+"}"+c.name+'">',closeWith:"</a>",placeHolder:c.name})}else{$.markItUp({replaceWith:'<img src="{filedir_'+c.directory+"}"+c.name+'" alt="[![Alternative text]!]" '+c.dimensions+"/>"})}}else{$("#"+window.file_manager_context).val("{filedir_"+c.directory+"}"+c.name)}$.ee_filebrowser.reset()});function a(d,e){var c=$("input[name="+e+"]").closest(".publish_field");if(d.is_image==false){c.find(".file_set").show().find(".filename").html('<img src="'+EE.PATH_CP_GBL_IMG+'default.png" alt="'+EE.PATH_CP_GBL_IMG+'default.png" /><br />'+d.name)}else{c.find(".file_set").show().find(".filename").html('<img src="'+d.thumb+'" alt="'+d.name+'" /><br />'+d.name)}$("input[name="+e+"_hidden]").val(d.name);$("select[name="+e+"_directory]").val(d.directory);$.ee_filebrowser.reset()}$("input[type=file]","#publishForm").each(function(){var c=$(this).closest(".publish_field"),d=c.find(".choose_file");$.ee_filebrowser.add_trigger(d,$(this).attr("name"),a);c.find(".remove_file").click(function(){c.find("input[type=hidden]").val("");c.find(".file_set").hide();return false})});$(".hide_field").click(function(){holder_id=$(this).parent().attr("id");field_id=holder_id.substr(11);if($("#sub_hold_field_"+field_id).css("display")=="block"){$("#sub_hold_field_"+field_id).slideUp();$("#hold_field_"+field_id+" .ui-resizable-handle").hide();$("#hold_field_"+field_id+" .field_collapse").attr("src",EE.THEME_URL+"images/field_collapse.png");return false}else{$("#sub_hold_field_"+field_id).slideDown();$("#hold_field_"+field_id+" .ui-resizable-handle").show();$("#hold_field_"+field_id+" .field_collapse").attr("src",EE.THEME_URL+"images/field_expand.png");return false}});$(".close_upload_bar").toggle(function(){$(this).parent().children(":not(.close_upload_bar)").hide();$(this).children("img").attr("src",EE.THEME_URL+"publish_plus.png")},function(){$(this).parent().children().show();$(this).children("img").attr("src",EE.THEME_URL+"publish_minus.gif")});write_mode_height=$(window).height()-(33+59+25);$("#write_mode_writer").css("height",write_mode_height+"px");$("#write_mode_writer textarea").css("height",(write_mode_height-67-17)+"px");$(".publish_to_field").click(function(){$("#"+b).val($("#write_mode_textarea").val());tb_remove();return false});$(".ping_toggle_all").toggle(function(){$("input[class=ping_toggle]").each(function(){this.checked=false})},function(){$("input[class=ping_toggle]").each(function(){this.checked=true})});$(".main_tab").hide();$(".main_tab:first").show();$(".tab_menu li:first").addClass("current");if(EE.publish.title_focus==true){$("#title").focus()}if(EE.publish.which=="new"){$("#title").bind("keyup blur",function(){liveUrlTitle()})}if(EE.publish.versioning_enabled=="n"){$("#revision_button").hide()}else{$("#versioning_enabled").click(function(){if($(this).attr("checked")){$("#revision_button").show()}else{$("#revision_button").hide()}})}EE.publish.category_editor()});