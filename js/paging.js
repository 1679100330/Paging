var paging = new function(){
	var _obj;
	var _total=30;//总页数
	var _maxtag = 5;//最大标签数
	var tags;//页码标签
	var currentPage = 1;
	return {
		//obj：父容器
		//total：总页数
		init:init,
		getCurrentPage:getCurrentPage
	}
	//初始化
	function init(obj,total,maxtag,onPageClick){
		_obj = obj;
		_total = total||_total;
		_maxtag = maxtag||_maxtag;
		if(_total==1){
			return;
		}
		if(_total<_maxtag){
			_maxtag=_total;
		}		
		var head = createA('首页');
		head.setAttribute('id','paging_head');
		head.style.display='none';
		obj.appendChild(head);
		var previous = createA('上一页');
		previous.setAttribute('id','paging_previous');
		previous.style.display='none';
		obj.appendChild(previous);
		for(var i=0;i<_maxtag;i++){
			var a = createA(i+1);
			a.setAttribute('location',i+1);
			a.setAttribute('name','paging_tag');
			if(i==0){
				a.style.border='1px solid #fff';
				currentPage = 1;
			}
			obj.appendChild(a);
		}
		var next = createA('下一页');
		next.setAttribute('id','paging_next');
		obj.appendChild(next);
		var tail = createA('尾页');
		tail.setAttribute('id','paging_tail');
		obj.appendChild(tail);	
		var span_1 = createSpan("共"+_total+"页");
		span_1.style.marginLeft='5px';
		obj.appendChild(span_1);
		var span_2 = createSpan("到第");
		span_2.style.marginLeft='5px';
		obj.appendChild(span_2);
		obj.appendChild(createInput('paging_num'));
		obj.appendChild(createSpan("页"));
		var go = createA('跳转');
		go.setAttribute('id','paging_go');
		obj.appendChild(go);
		tags = document.getElementsByName('paging_tag');
		//添加事件
		addClickToPaging_head(onPageClick);
		addClickToPaging_previous(onPageClick);
		addClickToPaging_next(onPageClick);
		addClickToPaging_tail(onPageClick);
		addClickToPaging_go(onPageClick);
		addClickToPaging_tag(onPageClick);
	}
	function createA(text){
		var a = document.createElement('a');
		a.appendChild(document.createTextNode(text));
		a.style.display='block';
		a.style.float='left';
		a.style.border='1px solid #999';
		a.style.marginLeft='5px';
		a.style.paddingLeft='5px';
		a.style.paddingRight='5px';
		return a;
	}
	function createSpan(text){
		var span = document.createElement('span');
		span.appendChild(document.createTextNode(text));
		span.style.display='block';
		span.style.float='left';
		span.style.height='20px';
		span.style.lineHeight='20px';
		return span;
	}
	function createInput(id){
		var input = document.createElement('input');
		input.setAttribute('id',id);
		input.setAttribute('type','number');
		input.style.display='block';
		input.style.float='left';
		input.style.width='40px';
		input.style.height='17px';
		input.style.textAlign='center';
		return input;
	}
	function addClickToPaging_head(onPageClick){//首页
		var paging_head = document.getElementById('paging_head');
		if(paging_head.addEventListener){
			paging_head.addEventListener('click',function(){
				for(var j=0;j<_maxtag;j++){
        			tags[j].innerHTML=j+1;
        			tags[j].style.border='1px solid #999';
        		}
				tags[0].style.border='1px solid #fff';
				currentPage = 1;
				onInnerPageClick(onPageClick);
			});
		}else if(paging_head.attachEvent){
			paging_head.attachEvent('onclick',function(){
				for(var j=0;j<_maxtag;j++){
        			tags[j].innerHTML=j+1;
        			tags[j].style.border='1px solid #999';
        		}
				tags[0].style.border='1px solid #fff';
				currentPage = 1;
				onInnerPageClick(onPageClick);
			});
		}
	}
	function addClickToPaging_previous(onPageClick){//上一页
		var paging_previous = document.getElementById('paging_previous');
		if(paging_previous.addEventListener){
			paging_previous.addEventListener('click',function(){
				if(currentPage!='1'){
					for(var j=0;j<_maxtag;j++){
            			var pageNum = parseInt(tags[j].innerHTML);//获取页码
            			if(pageNum==currentPage-1){
            				changeTag(tags[j]);
            				break;
            			}
            		}
				}	
				onInnerPageClick(onPageClick);
			});
		}else if(paging_previous.attachEvent){
			paging_previous.attachEvent('onclick',function(){
				if(currentPage!='1'){
					for(var j=0;j<_maxtag;j++){
            			var pageNum = parseInt(tags[j].innerHTML);//获取页码
            			if(pageNum==currentPage-1){
            				changeTag(tags[j]);
            				break;
            			}
            		}
				}
				onInnerPageClick(onPageClick);
			});
		}
	}
	function addClickToPaging_next(onPageClick){//下一页
		var paging_next = document.getElementById('paging_next');
		if(paging_next.addEventListener){
			paging_next.addEventListener('click',function(){
				if(currentPage!=_total){
					for(var j=0;j<_maxtag;j++){
            			var pageNum = parseInt(tags[j].innerHTML);//获取页码
            			if(pageNum==currentPage+1){
            				changeTag(tags[j]);
            				break;
            			}
            		}
				}	
				onInnerPageClick(onPageClick);
			});
		}else if(paging_next.attachEvent){
			paging_next.attachEvent('onclick',function(){
				if(currentPage!=_total){
					for(var j=0;j<_maxtag;j++){
            			var pageNum = parseInt(tags[j].innerHTML);//获取页码
            			if(pageNum==currentPage+1){
            				changeTag(tags[j]);
            				break;
            			}
            		}
				}
				onInnerPageClick(onPageClick);
			});
		}
	}
	function addClickToPaging_tail(onPageClick){//尾页
		var paging_tail = document.getElementById('paging_tail');
		if(paging_tail.addEventListener){
			paging_tail.addEventListener('click',function(){
				for(var j=0;j<_maxtag;j++){
        			tags[j].innerHTML=_total-_maxtag+j+1;
        			tags[j].style.border='1px solid #999';
        		}
				tags[_maxtag-1].style.border='1px solid #fff';
				currentPage = _total;
				onInnerPageClick(onPageClick);
			});
		}else if(paging_tail.attachEvent){
			paging_tail.attachEvent('onclick',function(){
				for(var j=0;j<_maxtag;j++){
        			tags[j].innerHTML=_total-_maxtag+j+1;
        			tags[j].style.border='1px solid #999';
        		}
				tags[_maxtag-1].style.border='1px solid #fff';
				currentPage = _total;
				onInnerPageClick(onPageClick);
			});
		}
	}
	function addClickToPaging_go(onPageClick){//跳转		
		var paging_go = document.getElementById('paging_go');
		var mid = Math.ceil(_maxtag/2);//获取中间位置
		if(paging_go.addEventListener){
			paging_go.addEventListener('click',function(){
				var paging_num = document.getElementById('paging_num');
				var r = /^\+?[1-9][0-9]*$/;　　//正整数
   				if(!r.test(paging_num.value)){
   					return;
   				}
				var pageNum;
				try{
					pageNum = parseInt(paging_num.value);
				}catch(e){
					return;
				}
				if(pageNum<1||pageNum>_total){//不是有效数字
					return;
				}
				currentPage = pageNum;
				if(pageNum<=mid){
					for(var j=0;j<_maxtag;j++){
						tags[j].innerHTML=j+1;
						tags[j].style.border='1px solid #999';
					}
					tags[pageNum-1].style.border='1px solid #fff';
				}else if(pageNum>=_total-mid){
					for(var j=0;j<_maxtag;j++){
						tags[j].innerHTML=_total-_maxtag+1+j;
						tags[j].style.border='1px solid #999';
					}
					tags[pageNum+_maxtag-_total-1].style.border='1px solid #fff';
				}else{
					for(var j=0;j<_maxtag;j++){
						tags[j].innerHTML=pageNum-mid+j+1;
						tags[j].style.border='1px solid #999';
					}
					tags[mid-1].style.border='1px solid #fff';
				}
				onInnerPageClick(onPageClick);
			});
		}else if(paging_go.attachEvent){
			paging_go.attachEvent('onclick',function(){
				var paging_num = document.getElementById('paging_num');
				var pageNum;
				try{
					pageNum = parseInt(paging_num.value);
				}catch(e){
					return;
				}
				if(pageNum<1||pageNum>_total){//不是有效数字
					return;
				}
				currentPage = pageNum;
				if(pageNum<=mid){
					for(var j=0;j<_maxtag;j++){
						tags[j].innerHTML=j+1;
						tags[j].style.border='1px solid #999';
					}
					tags[pageNum-1].style.border='1px solid #fff';
				}else if(pageNum>=_total-mid){
					for(var j=0;j<_maxtag;j++){
						tags[j].innerHTML=_total-_maxtag+1+j;
						tags[j].style.border='1px solid #999';
					}
					tags[pageNum+_maxtag-_total-1].style.border='1px solid #fff';
				}else{
					for(var j=0;j<_maxtag;j++){
						tags[j].innerHTML=pageNum-mid+j+1;
						tags[j].style.border='1px solid #999';
					}
					tags[mid-1].style.border='1px solid #fff';
				}
				onInnerPageClick(onPageClick);
			});
		}
	}
	function addClickToPaging_tag(onPageClick){//页码标签
		for(var i=0;i<tags.length;i++){
			if(tags[i].addEventListener){
				tags[i].addEventListener('click',function(){
					changeTag(this);
					onInnerPageClick(onPageClick);
				});
			}else if(tags[i].attachEvent){
				tags[i].attachEvent('onclick',function(){//IE
					changeTag(this);
					onInnerPageClick(onPageClick);
				});
			}
		}
	}
	function changeTag(_this){
		//初始化border
		for(var k=0;k<_maxtag;k++){
			tags[k].style.border='1px solid #999';
		}
		var loc = _this.getAttribute('location');//获取位置
		var mid = Math.ceil(_maxtag/2);//获取中间位置
		var pagination = parseInt(_this.innerHTML);//获取标签上的页码
		currentPage=pagination;
		if(loc<mid){//左边位置
			if(pagination<=mid){//页码小于中间位置
				if(pagination>loc){//页码大于位置，右移
					for(var j=0;j<_maxtag;j++){
            			var pageNum = parseInt(tags[j].innerHTML);//获取页码
            			tags[j].innerHTML=pageNum-1;
            		}
    				tags[loc].style.border='1px solid #fff';
				}else{//页码等于位置，不移动
					_this.style.border='1px solid #fff';
				}
			}else{//页码右移
				for(var j=0;j<_maxtag;j++){
        			var pageNum = parseInt(tags[j].innerHTML);//获取页码
        			tags[j].innerHTML=pageNum-(mid-loc);
        		}
				tags[mid-1].style.border='1px solid #fff';
			}
		}else if(loc>mid){//右边位置
			if(pagination>=_total-mid+1){//页码大于最后几页的中间页
				if((_total-pagination)>(_maxtag-loc)){//左移
					for(var j=0;j<_maxtag;j++){
            			var pageNum = parseInt(tags[j].innerHTML);//获取页码
            			tags[j].innerHTML=pageNum+1;
            		}
    				tags[loc-2].style.border='1px solid #fff';
				}else{
					_this.style.border='1px solid #fff';
				}
			}else{//页码左移
				for(var j=0;j<_maxtag;j++){
        			var pageNum = parseInt(tags[j].innerHTML);//获取页码
        			tags[j].innerHTML=pageNum+(loc-mid);
        		}
				tags[mid-1].style.border='1px solid #fff';
			}
		}else{//中间位置
			_this.style.border='1px solid #fff';
		}
	}
	//获取当前页
	function getCurrentPage(){
		return currentPage;
	}
	function onInnerPageClick(onPageClick){
		//console.log(i)
		toggleTag();
		if(onPageClick){
			onPageClick(currentPage);
		}
	}
	function toggleTag(){
		var paging_head = document.getElementById('paging_head');
		var paging_previous = document.getElementById('paging_previous');
		var paging_next = document.getElementById('paging_next');
		var paging_tail = document.getElementById('paging_tail');
		if(currentPage==1){
			paging_head.style.display='none';
			paging_previous.style.display='none';
			paging_next.style.display='block';
			paging_tail.style.display='block';
		}else if(currentPage==_total){
			paging_head.style.display='block';
			paging_previous.style.display='block';
			paging_next.style.display='none';
			paging_tail.style.display='none';
		}else{
			paging_head.style.display='block';
			paging_previous.style.display='block';
			paging_next.style.display='block';
			paging_tail.style.display='block';
		}
	}
}
