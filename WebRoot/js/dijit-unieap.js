
/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base/focus.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base.focus"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.focus"] = true;
dojo.provide("dijit._base.focus");

// summary:
//		These functions are used to query or set the focus and selection.
//
//		Also, they trace when widgets become actived/deactivated,
//		so that the widget can fire _onFocus/_onBlur events.
//		"Active" here means something similar to "focused", but
//		"focus" isn't quite the right word because we keep track of
//		a whole stack of "active" widgets.  Example:  Combobutton --> Menu -->
//		MenuItem.   The onBlur event for Combobutton doesn't fire due to focusing
//		on the Menu or a MenuItem, since they are considered part of the
//		Combobutton widget.  It only happens when focus is shifted
//		somewhere completely different.

dojo.mixin(dijit,
{
	// _curFocus: DomNode
	//		Currently focused item on screen
	_curFocus: null,

	// _prevFocus: DomNode
	//		Previously focused item on screen
	_prevFocus: null,

	isCollapsed: function(){
		// summary: tests whether the current selection is empty
		var _window = dojo.global;
		var _document = dojo.doc;
		if(_document.selection){ // IE
			return !_document.selection.createRange().text; // Boolean
		}else if(_window.getSelection){
			var selection = _window.getSelection();
			if(dojo.isString(selection)){ // Safari
				return !selection; // Boolean
			}else{ // Mozilla/W3
				return selection.isCollapsed || !selection.toString(); // Boolean
			}
		}
	},

	getBookmark: function(){
		// summary: Retrieves a bookmark that can be used with moveToBookmark to return to the same range
		var bookmark, selection = dojo.doc.selection;
		if(selection){ // IE
			var range = selection.createRange();
			if(selection.type.toUpperCase()=='CONTROL'){
				bookmark = range.length ? dojo._toArray(range) : null;
			}else{
				bookmark = range.getBookmark();
			}
		}else{
			if(dojo.global.getSelection){
				selection = dojo.global.getSelection();
				if(selection){
					var range = selection.getRangeAt(0);
					bookmark = range.cloneRange();
				}
			}else{
				console.debug("No idea how to store the current selection for this browser!");
			}
		}
		return bookmark; // Array
	},

	moveToBookmark: function(/*Object*/bookmark){
		// summary: Moves current selection to a bookmark
		// bookmark: this should be a returned object from dojo.html.selection.getBookmark()
		var _document = dojo.doc;
		if(_document.selection){ // IE
			var range;
			if(dojo.isArray(bookmark)){
				range = _document.body.createControlRange();
				dojo.forEach(bookmark, range.addElement);
			}else{
				range = _document.selection.createRange();
				range.moveToBookmark(bookmark);
			}
			range.select();
		}else{ //Moz/W3C
			var selection = dojo.global.getSelection && dojo.global.getSelection();
			if(selection && selection.removeAllRanges){
				selection.removeAllRanges();
				selection.addRange(bookmark);
			}else{
				console.debug("No idea how to restore selection for this browser!");
			}
		}
	},

	getFocus: function(/*Widget*/menu, /*Window*/ openedForWindow){
		// summary:
		//	Returns the current focus and selection.
		//	Called when a popup appears (either a top level menu or a dialog),
		//	or when a toolbar/menubar receives focus
		//
		// menu:
		//	the menu that's being opened
		//
		// openedForWindow:
		//	iframe in which menu was opened
		//
		// returns:
		//	a handle to restore focus/selection

		return {
			// Node to return focus to
			node: menu && dojo.isDescendant(dijit._curFocus, menu.domNode) ? dijit._prevFocus : dijit._curFocus,

			// Previously selected text
			bookmark:
				!dojo.withGlobal(openedForWindow||dojo.global, dijit.isCollapsed) ?
				dojo.withGlobal(openedForWindow||dojo.global, dijit.getBookmark) :
				null,

			openedForWindow: openedForWindow
		}; // Object
	},

	focus: function(/*Object || DomNode */ handle){
		// summary:
		//		Sets the focused node and the selection according to argument.
		//		To set focus to an iframe's content, pass in the iframe itself.
		// handle:
		//		object returned by get(), or a DomNode

		if(!handle){ return; }

		var node = "node" in handle ? handle.node : handle,		// because handle is either DomNode or a composite object
			bookmark = handle.bookmark,
			openedForWindow = handle.openedForWindow;

		// Set the focus
		// Note that for iframe's we need to use the <iframe> to follow the parentNode chain,
		// but we need to set focus to iframe.contentWindow
		if(node){
			var focusNode = (node.tagName.toLowerCase()=="iframe") ? node.contentWindow : node;
			if(focusNode && focusNode.focus){
				try{
					// Gecko throws sometimes if setting focus is impossible,
					// node not displayed or something like that
					focusNode.focus();
				}catch(e){/*quiet*/}
			}			
			dijit._onFocusNode(node);
		}

		// set the selection
		// do not need to restore if current selection is not empty
		// (use keyboard to select a menu item)
		if(bookmark && dojo.withGlobal(openedForWindow||dojo.global, dijit.isCollapsed)){
			if(openedForWindow){
				openedForWindow.focus();
			}
			try{
				dojo.withGlobal(openedForWindow||dojo.global, moveToBookmark, null, [bookmark]);
			}catch(e){
				/*squelch IE internal error, see http://trac.dojotoolkit.org/ticket/1984 */
			}
		}
	},

	// List of currently active widgets (focused widget and it's ancestors)
	_activeStack: [],

	registerWin: function(/*Window?*/targetWindow){
		// summary:
		//		Registers listeners on the specified window (either the main
		//		window or an iframe) to detect when the user has clicked somewhere.
		//		Anyone that creates an iframe should call this function.

		if(!targetWindow){
			targetWindow = window;
		}

		dojo.connect(targetWindow.document, "onmousedown", null, function(evt){
			dijit._justMouseDowned = true;
			setTimeout(function(){ dijit._justMouseDowned = false; }, 0);
			dijit._onTouchNode(evt.target||evt.srcElement);
		});
		//dojo.connect(targetWindow, "onscroll", ???);

		// Listen for blur and focus events on targetWindow's body
		var body = targetWindow.document.body || targetWindow.document.getElementsByTagName("body")[0];
		if(body){
			if(dojo.isIE){
				body.attachEvent('onactivate', function(evt){
					if(evt.srcElement.tagName.toLowerCase() != "body"){
						dijit._onFocusNode(evt.srcElement);
					}
				});
				body.attachEvent('ondeactivate', function(evt){ dijit._onBlurNode(evt.srcElement); });
			}else{
				body.addEventListener('focus', function(evt){ dijit._onFocusNode(evt.target); }, true);
				body.addEventListener('blur', function(evt){ dijit._onBlurNode(evt.target); }, true);
			}
		}
		body = null;	// prevent memory leak (apparent circular reference via closure)
	},

	_onBlurNode: function(/*DomNode*/ node){
		// summary:
		// 		Called when focus leaves a node.
		//		Usually ignored, _unless_ it *isn't* follwed by touching another node,
		//		which indicates that we tabbed off the last field on the page,
		//		in which case every widget is marked inactive
		dijit._prevFocus = dijit._curFocus;
		dijit._curFocus = null;

		var w = dijit.getEnclosingWidget(node);
		if (w && w._setStateClass){
			w._focused = false;
			w._setStateClass();
		}
		if(dijit._justMouseDowned){
			// the mouse down caused a new widget to be marked as active; this blur event
			// is coming late, so ignore it.
			return;
		}

		// if the blur event isn't followed by a focus event then mark all widgets as inactive.
		if(dijit._clearActiveWidgetsTimer){
			clearTimeout(dijit._clearActiveWidgetsTimer);
		}
		dijit._clearActiveWidgetsTimer = setTimeout(function(){
			delete dijit._clearActiveWidgetsTimer; dijit._setStack([]); }, 100);
	},

	_onTouchNode: function(/*DomNode*/ node){
		// summary
		//		Callback when node is focused or mouse-downed

		// ignore the recent blurNode event
		if(dijit._clearActiveWidgetsTimer){
			clearTimeout(dijit._clearActiveWidgetsTimer);
			delete dijit._clearActiveWidgetsTimer;
		}

		// compute stack of active widgets (ex: ComboButton --> Menu --> MenuItem)
		var newStack=[];
		try{
			while(node){
				if(node.dijitPopupParent){
					node=dijit.byId(node.dijitPopupParent).domNode;
				}else if(node.tagName && node.tagName.toLowerCase()=="body"){
					// is this the root of the document or just the root of an iframe?
					if(node===dojo.body()){
						// node is the root of the main document
						break;
					}
					// otherwise, find the iframe this node refers to (can't access it via parentNode,
					// need to do this trick instead) and continue tracing up the document
					node=dojo.query("iframe").filter(function(iframe){ return iframe.contentDocument.body===node; })[0];
				}else{
					var id = node.getAttribute && node.getAttribute("widgetId");
					if(id){
						newStack.unshift(id);
					}
					node=node.parentNode;
				}
			}
		}catch(e){ /* squelch */ }

		dijit._setStack(newStack);
	},

	_onFocusNode: function(/*DomNode*/ node){
		// summary
		//		Callback when node is focused
		if(node && node.tagName && node.tagName.toLowerCase() == "body"){
			return;
		}
		dijit._onTouchNode(node);
		if(node==dijit._curFocus){ return; }
		dijit._prevFocus = dijit._curFocus;
		dijit._curFocus = node;
		dojo.publish("focusNode", [node]);

		// handle focus/blur styling
		var w = dijit.getEnclosingWidget(node);
		if (w && w._setStateClass){
			w._focused = true;
			w._setStateClass();
		}
	},

	_setStack: function(newStack){
		// summary
		//	The stack of active widgets has changed.  Send out appropriate events and record new stack

		var oldStack = dijit._activeStack;		
		dijit._activeStack = newStack;

		// compare old stack to new stack to see how many elements they have in common
		for(var nCommon=0; nCommon<Math.min(oldStack.length, newStack.length); nCommon++){
			if(oldStack[nCommon] != newStack[nCommon]){
				break;
			}
		}

		// for all elements that have gone out of focus, send blur event
		for(var i=oldStack.length-1; i>=nCommon; i--){
			var widget = dijit.byId(oldStack[i]);
			if(widget){
				dojo.publish("widgetBlur", [widget]);
				if(widget._onBlur){
					widget._onBlur();
				}
			}
		}

		// for all element that have come into focus, send focus event
		for(var i=nCommon; i<newStack.length; i++){
			var widget = dijit.byId(newStack[i]);
			if(widget){
				dojo.publish("widgetFocus", [widget]);
				if(widget._onFocus){
					widget._onFocus();
				}
			}
		}
	}
});

// register top window and all the iframes it contains
	dojo.addOnLoad(dijit.registerWin);

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base/manager.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base.manager"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.manager"] = true;
dojo.provide("dijit._base.manager");

dojo.declare("dijit.WidgetSet", null, {
	constructor: function(){
		// summary:
		//	A set of widgets indexed by id
		this._hash={};
	},

	add: function(/*Widget*/ widget){
		if(this._hash[widget.id]){
			throw new Error("Tried to register widget with id==" + widget.id + " but that id is already registered");
		}
		this._hash[widget.id]=widget;
	},

	remove: function(/*String*/ id){
		delete this._hash[id];
	},

	forEach: function(/*Function*/ func){
		for(var id in this._hash){
			func(this._hash[id]);
		}
	},

	filter: function(/*Function*/ filter){
		var res = new dijit.WidgetSet();
		this.forEach(function(widget){
			if(filter(widget)){ res.add(widget); }
		});
		return res;		// dijit.WidgetSet
	},

	byId: function(/*String*/ id){
		return this._hash[id];
	},

	byClass: function(/*String*/ cls){
		return this.filter(function(widget){ return widget.declaredClass==cls; });	// dijit.WidgetSet
	}
	});

// registry: list of all widgets on page
dijit.registry = new dijit.WidgetSet();

dijit._widgetTypeCtr = {};

dijit.getUniqueId = function(/*String*/widgetType){
	// summary
	//	Generates a unique id for a given widgetType

	var id;
	do{
		id = widgetType + "_" +
			(dijit._widgetTypeCtr[widgetType] !== undefined ?
				++dijit._widgetTypeCtr[widgetType] : dijit._widgetTypeCtr[widgetType] = 0);
	}while(dijit.byId(id));
	return id; // String
};


if(dojo.isIE){
	// Only run this for IE because we think it's only necessary in that case,
	// and because it causes problems on FF.  See bug #3531 for details.
	dojo.addOnUnload(function(){
		dijit.registry.forEach(function(widget){ widget.destroy(); });
	});
}

dijit.byId = function(/*String|Widget*/id){
	// summary:
	//		Returns a widget by its id, or if passed a widget, no-op (like dojo.byId())
	return (dojo.isString(id)) ? dijit.registry.byId(id) : id; // Widget
};

dijit.byNode = function(/* DOMNode */ node){
	// summary:
	//		Returns the widget as referenced by node
	return dijit.registry.byId(node.getAttribute("widgetId")); // Widget
};

dijit.getEnclosingWidget = function(/* DOMNode */ node){
	// summary:
	//		Returns the widget whose dom tree contains node or null if
	//		the node is not contained within the dom tree of any widget
	while(node){
		if(node.getAttribute && node.getAttribute("widgetId")){
			return dijit.registry.byId(node.getAttribute("widgetId"));
		}
		node = node.parentNode;
	}
	return null;
};

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base/place.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base.place"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.place"] = true;
dojo.provide("dijit._base.place");

// ported from dojo.html.util

dijit.getViewport = function(){
	//	summary
	//	Returns the dimensions and scroll position of the viewable area of a browser window

	var _window = dojo.global;
	var _document = dojo.doc;

	// get viewport size
	var w = 0, h = 0;
	if(dojo.isMozilla){
		// mozilla
		// _window.innerHeight includes the height taken by the scroll bar
		// clientHeight is ideal but has DTD issues:
		// #4539: FF reverses the roles of body.clientHeight/Width and documentElement.clientHeight/Width based on the DTD!
		// check DTD to see whether body or documentElement returns the viewport dimensions using this algorithm:
		var minw, minh, maxw, maxh;
		if(_document.body.clientWidth>_document.documentElement.clientWidth){
			minw = _document.documentElement.clientWidth;
			maxw = _document.body.clientWidth;
		}else{
			maxw = _document.documentElement.clientWidth;
			minw = _document.body.clientWidth;
		}
		if(_document.body.clientHeight>_document.documentElement.clientHeight){
			minh = _document.documentElement.clientHeight;
			maxh = _document.body.clientHeight;
		}else{
			maxh = _document.documentElement.clientHeight;
			minh = _document.body.clientHeight;
		}
		w = (maxw > _window.innerWidth) ? minw : maxw;
		h = (maxh > _window.innerHeight) ? minh : maxh;
	}else if(!dojo.isOpera && _window.innerWidth){
		//in opera9, dojo.body().clientWidth should be used, instead
		//of window.innerWidth/document.documentElement.clientWidth
		//so we have to check whether it is opera
		w = _window.innerWidth;
		h = _window.innerHeight;
	}else if(dojo.isIE && _document.documentElement && _document.documentElement.clientHeight){
		w = _document.documentElement.clientWidth;
		h = _document.documentElement.clientHeight;
	}else if(dojo.body().clientWidth){
		// IE5, Opera
		w = dojo.body().clientWidth;
		h = dojo.body().clientHeight;
	}

	// get scroll position
	var scroll = dojo._docScroll();

	return { w: w, h: h, l: scroll.x, t: scroll.y };	//	object
};

dijit.placeOnScreen = function(
	/* DomNode */	node,
	/* Object */		pos,
	/* Object */		corners,
	/* boolean? */		tryOnly){
	//	summary:
	//		Keeps 'node' in the visible area of the screen while trying to
	//		place closest to pos.x, pos.y. The input coordinates are
	//		expected to be the desired document position.
	//
	//		Set which corner(s) you want to bind to, such as
	//		
	//			placeOnScreen(node, {x: 10, y: 20}, ["TR", "BL"])
	//		
	//		The desired x/y will be treated as the topleft(TL)/topright(TR) or
	//		BottomLeft(BL)/BottomRight(BR) corner of the node. Each corner is tested
	//		and if a perfect match is found, it will be used. Otherwise, it goes through
	//		all of the specified corners, and choose the most appropriate one.
	//		
	//		NOTE: node is assumed to be absolutely or relatively positioned.

	var choices = dojo.map(corners, function(corner){ return { corner: corner, pos: pos }; });

	return dijit._place(node, choices);
}

dijit._place = function(/*DomNode*/ node, /* Array */ choices, /* Function */ layoutNode){
	// summary:
	//		Given a list of spots to put node, put it at the first spot where it fits,
	//		of if it doesn't fit anywhere then the place with the least overflow
	// choices: Array
	//		Array of elements like: {corner: 'TL', pos: {x: 10, y: 20} }
	//		Above example says to put the top-left corner of the node at (10,20)
	//	layoutNode: Function(node, orient)
	//		for things like tooltip, they are displayed differently (and have different dimensions)
	//		based on their orientation relative to the parent.   This adjusts the popup based on orientation.

	// get {x: 10, y: 10, w: 100, h:100} type obj representing position of
	// viewport over document
	var view = dijit.getViewport();

	// This won't work if the node is inside a <div style="position: relative">,
	// so reattach it to document.body.   (Otherwise, the positioning will be wrong
	// and also it might get cutoff)
	if(!node.parentNode || String(node.parentNode.tagName).toLowerCase() != "body"){
		//dojo.body().appendChild(node);
		dojo.byId("dijit-popupBody").appendChild(node);
	}

	var best=null;
	for(var i=0; i<choices.length; i++){
		var corner = choices[i].corner;
		var pos = choices[i].pos;

		// configure node to be displayed in given position relative to button
		// (need to do this in order to get an accurate size for the node, because
		// a tooltips size changes based on position, due to triangle)
		if(layoutNode){
			layoutNode(corner);
		}

		// get node's size
		var oldDisplay = node.style.display;
		var oldVis = node.style.visibility;
		node.style.visibility = "hidden";
		node.style.display = "";
		var mb = dojo.marginBox(node);
		node.style.display = oldDisplay;
		node.style.visibility = oldVis;

		// coordinates and size of node with specified corner placed at pos,
		// and clipped by viewport
		var startX = (corner.charAt(1)=='L' ? pos.x : Math.max(view.l, pos.x - mb.w)),
			startY = (corner.charAt(0)=='T' ? pos.y : Math.max(view.t, pos.y -  mb.h)),
			endX = (corner.charAt(1)=='L' ? Math.min(view.l+view.w, startX+mb.w) : pos.x),
			endY = (corner.charAt(0)=='T' ? Math.min(view.t+view.h, startY+mb.h) : pos.y),
			width = endX-startX,
			height = endY-startY,
			overflow = (mb.w-width) + (mb.h-height);

		if(best==null || overflow<best.overflow){
			best = {
				corner: corner,
				aroundCorner: choices[i].aroundCorner,
				x: startX,
				y: startY,
				w: width,
				h: height,
				overflow: overflow
			};
		}
		if(overflow==0){
			break;
		}
	}

	node.style.left = best.x + "px";
	node.style.top = best.y + "px";
	return best;
}

dijit.placeOnScreenAroundElement = function(
	/* DomNode */		node,
	/* DomNode */		aroundNode,
	/* Object */		aroundCorners,
	/* Function */		layoutNode){

	//	summary
	//	Like placeOnScreen, except it accepts aroundNode instead of x,y
	//	and attempts to place node around it.  Uses margin box dimensions.
	//
	//	aroundCorners
	//		specify Which corner of aroundNode should be
	//		used to place the node => which corner(s) of node to use (see the
	//		corners parameter in dijit.placeOnScreen)
	//		e.g. {'TL': 'BL', 'BL': 'TL'}
	//
	//	layoutNode: Function(node, orient)
	//		for things like tooltip, they are displayed differently (and have different dimensions)
	//		based on their orientation relative to the parent.   This adjusts the popup based on orientation.


	// get coordinates of aroundNode
	aroundNode = dojo.byId(aroundNode);
	var oldDisplay = aroundNode.style.display;
	aroundNode.style.display="";
	// #3172: use the slightly tighter border box instead of marginBox
	var aroundNodeW = aroundNode.offsetWidth; //mb.w;
	var aroundNodeH = aroundNode.offsetHeight; //mb.h;
	var aroundNodePos = dojo.coords(aroundNode, true);
	aroundNode.style.display=oldDisplay;

	// Generate list of possible positions for node
	var choices = [];
	for(var nodeCorner in aroundCorners){
		choices.push( {
			aroundCorner: nodeCorner,
			corner: aroundCorners[nodeCorner],
			pos: {
				x: aroundNodePos.x + (nodeCorner.charAt(1)=='L' ? 0 : aroundNodeW),
				y: aroundNodePos.y + (nodeCorner.charAt(0)=='T' ? 0 : aroundNodeH)
			}
		});
	}

	return dijit._place(node, choices, layoutNode);
}

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base/window.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base.window"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.window"] = true;
dojo.provide("dijit._base.window");

dijit.getDocumentWindow = function(doc){
	//	summary
	// 	Get window object associated with document doc

	// With Safari, there is not way to retrieve the window from the document, so we must fix it.
	if(dojo.isSafari && !doc._parentWindow){
		/*
			This is a Safari specific function that fix the reference to the parent
			window from the document object.
		*/
		var fix=function(win){
			win.document._parentWindow=win;
			for(var i=0; i<win.frames.length; i++){
				fix(win.frames[i]);
			}
		}
		fix(window.top);
	}

	//In some IE versions (at least 6.0), document.parentWindow does not return a
	//reference to the real window object (maybe a copy), so we must fix it as well
	//We use IE specific execScript to attach the real window reference to
	//document._parentWindow for later use
	if(dojo.isIE && window !== document.parentWindow && !doc._parentWindow){
		/*
		In IE 6, only the variable "window" can be used to connect events (others
		may be only copies).
		*/
		doc.parentWindow.execScript("document._parentWindow = window;", "Javascript");
		//to prevent memory leak, unset it after use
		//another possibility is to add an onUnload handler which seems overkill to me (liucougar)
		var win = doc._parentWindow;
		doc._parentWindow = null;
		return win;	//	Window
	}

	return doc._parentWindow || doc.parentWindow || doc.defaultView;	//	Window
}

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base/popup.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base.popup"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.popup"] = true;
dojo.provide("dijit._base.popup");

dojo.require("dijit._base.focus");
dojo.require("dijit._base.place");
dojo.require("dijit._base.window");
dijit.popup = new function(){
	// summary:
	//		This class is used to show/hide widgets as popups.
	//

	var stack = [],
		beginZIndex=1000,
		idGen = 1;

	this.open = function(/*Object*/ args){
		// summary:
		//		Popup the widget at the specified position
		//
		// args: Object
		//		popup: Widget
		//			widget to display,
		//		parent: Widget
		//			the button etc. that is displaying this popup
		//		around: DomNode
		//			DOM node (typically a button); place popup relative to this node
		//		orient: Object
		//			structure specifying possible positions of popup relative to "around" node
		//		onCancel: Function
		//			callback when user has canceled the popup by
		//				1. hitting ESC or
		//				2. by using the popup widget's proprietary cancel mechanism (like a cancel button in a dialog);
		//				   ie: whenever popupWidget.onCancel() is called, args.onCancel is called
		//		onClose: Function
		//			callback whenever this popup is closed
		//		onExecute: Function
		//			callback when user "executed" on the popup/sub-popup by selecting a menu choice, etc. (top menu only)
		//
		// examples:
		//		1. opening at the mouse position
		//			dijit.popup.open({popup: menuWidget, x: evt.pageX, y: evt.pageY});
		//		2. opening the widget as a dropdown
		//			dijit.popup.open({parent: this, popup: menuWidget, around: this.domNode, onClose: function(){...}  });
		//
		//	Note that whatever widget called dijit.popup.open() should also listen to it's own _onBlur callback
		//	(fired from _base/focus.js) to know that focus has moved somewhere else and thus the popup should be closed.

		var widget = args.popup,
			orient = args.orient || {'BL':'TL', 'TL':'BL'},
			around = args.around,
			id = (args.around && args.around.id) ? (args.around.id+"_dropdown") : ("popup_"+idGen++);

		// make wrapper div to hold widget and possibly hold iframe behind it.
		// we can't attach the iframe as a child of the widget.domNode because
		// widget.domNode might be a <table>, <ul>, etc.
		var wrapper = dojo.doc.createElement("div");
		wrapper.id = id;
		wrapper.className="dijitPopup";
		wrapper.style.zIndex = beginZIndex + stack.length;
		wrapper.style.visibility = "hidden";
		if(args.parent){
			wrapper.dijitPopupParent=args.parent.id;
		}
		
//		if(args.tack) {
//			args.tack.appendChild(wrapper);
//		} else {
			dojo.byId("dijit-popupBody").appendChild(wrapper);
			//dojo.body().appendChild(wrapper);
//		}

		widget.domNode.style.display="";
		wrapper.appendChild(widget.domNode);

		var iframe = new dijit.BackgroundIframe(wrapper);

		// position the wrapper node
		var best = around ?
			dijit.placeOnScreenAroundElement(wrapper, around, orient, widget.orient ? dojo.hitch(widget, "orient") : null) :
			dijit.placeOnScreen(wrapper, args, orient == 'R' ? ['TR','BR','TL','BL'] : ['TL','BL','TR','BR']);

		wrapper.style.visibility = "visible";
		// TODO: use effects to fade in wrapper

		var handlers = [];

		// Compute the closest ancestor popup that's *not* a child of another popup.
		// Ex: For a TooltipDialog with a button that spawns a tree of menus, find the popup of the button.
		function getTopPopup(){
			for(var pi=stack.length-1; pi > 0 && stack[pi].parent === stack[pi-1].widget; pi--);
			return stack[pi];
		}

		// provide default escape and tab key handling
		// (this will work for any widget, not just menu)
		handlers.push(dojo.connect(wrapper, "onkeypress", this, function(evt){
			if(evt.keyCode == dojo.keys.ESCAPE && args.onCancel){
				args.onCancel();
			}else if(evt.keyCode == dojo.keys.TAB){
				dojo.stopEvent(evt);
				var topPopup = getTopPopup();
				if(topPopup && topPopup.onCancel){
					topPopup.onCancel();
				}
			}
		}));

		// watch for cancel/execute events on the popup and notify the caller
		// (for a menu, "execute" means clicking an item)
		if(widget.onCancel){
			handlers.push(dojo.connect(widget, "onCancel", null, args.onCancel));
		}

		handlers.push(dojo.connect(widget, widget.onExecute ? "onExecute" : "onChange", null, function(){
			var topPopup = getTopPopup();
			if(topPopup && topPopup.onExecute){
				topPopup.onExecute();
			}
		}));

		stack.push({
			wrapper: wrapper,
			iframe: iframe,
			widget: widget,
			parent: args.parent,
			onExecute: args.onExecute,
			onCancel: args.onCancel,
 			onClose: args.onClose,
			handlers: handlers
		});

		if(widget.onOpen){
			widget.onOpen(best);
		}

		return best;
	};

	this.close = function(/*Widget*/ popup){
		// summary:
		//		Close specified popup and any popups that it parented
		while(dojo.some(stack, function(elem){return elem.widget == popup;})){
			var top = stack.pop(),
				wrapper = top.wrapper,
				iframe = top.iframe,
				widget = top.widget,
				onClose = top.onClose;
	
			if(widget.onClose){
				widget.onClose();
			}
			dojo.forEach(top.handlers, dojo.disconnect);
	
			// #2685: check if the widget still has a domNode so ContentPane can change its URL without getting an error
			if(!widget||!widget.domNode){ return; }
			dojo.style(widget.domNode, "display", "none");
			dojo.byId("dijit-popupBody").appendChild(widget.domNode);
			//dojo.body().appendChild(widget.domNode);
			iframe.destroy();
			dojo._destroyElement(wrapper);
	
			if(onClose){
				onClose();
			}
		}
	};
}();

dijit._frames = new function(){
	// summary: cache of iframes
	var queue = [];

	this.pop = function(){
		var iframe;
		if(queue.length){
			iframe = queue.pop();
			iframe.style.display="";
		}else{
			if(dojo.isIE){
				var html="<iframe src='javascript:\"\"'"
					+ " style='position: absolute; left: 0px; top: 0px;width:0%;"
					+ "z-index: -1; filter:Alpha(Opacity=\"0\");'>";
				iframe = dojo.doc.createElement(html);
			}else{
			 	var iframe = dojo.doc.createElement("iframe");
				iframe.src = 'javascript:""';
				iframe.className = "dijitBackgroundIframe";
			}
			iframe.tabIndex = -1; // Magic to prevent iframe from getting focus on tab keypress - as style didnt work.
			//dojo.body().appendChild(iframe);
			dojo.byId("dijit-popupBody").appendChild(iframe);
		}
		return iframe;
	};

	this.push = function(iframe){
		iframe.style.display="";
		if(dojo.isIE){
			iframe.style.removeExpression("width");
			iframe.style.removeExpression("height");
		}
		queue.push(iframe);
	}
}();

// fill the queue
if(dojo.isIE && dojo.isIE < 7){
	dojo.addOnLoad(function(){
		var f = dijit._frames;
		dojo.forEach([f.pop()], f.push);
	});
}


dijit.BackgroundIframe = function(/* DomNode */node){
	//	summary:
	//		For IE z-index schenanigans. id attribute is required.
	//
	//	description:
	//		new dijit.BackgroundIframe(node)
	//			Makes a background iframe as a child of node, that fills
	//			area (and position) of node

	if(!node.id){ throw new Error("no id"); }
	if((dojo.isIE && dojo.isIE < 7) || (dojo.isFF && dojo.isFF < 3 && dojo.hasClass(dojo.body(), "dijit_a11y"))){
		var iframe = dijit._frames.pop();
		node.appendChild(iframe);
		if(dojo.isIE){
			iframe.style.setExpression("width", "document.getElementById('" + node.id + "').offsetWidth");
			iframe.style.setExpression("height", "document.getElementById('" + node.id + "').offsetHeight");
		}
		this.iframe = iframe;
	}
};

dojo.extend(dijit.BackgroundIframe, {
	destroy: function(){
		//	summary: destroy the iframe
		if(this.iframe){
			dijit._frames.push(this.iframe);
			delete this.iframe;
		}
	}
});

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base/scroll.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base.scroll"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.scroll"] = true;
dojo.provide("dijit._base.scroll");

dijit.scrollIntoView = function(/* DomNode */node){
	//	summary
	//	Scroll the passed node into view, if it is not.

	// don't rely on that node.scrollIntoView works just because the function is there
	// it doesnt work in Konqueror or Opera even though the function is there and probably
	// not safari either
	// dont like browser sniffs implementations but sometimes you have to use it
	if(dojo.isIE){
		//only call scrollIntoView if there is a scrollbar for this menu,
		//otherwise, scrollIntoView will scroll the window scrollbar
		if(dojo.marginBox(node.parentNode).h <= node.parentNode.scrollHeight){ //PORT was getBorderBox
			node.scrollIntoView(false);
		}
	}else if(dojo.isMozilla){
		node.scrollIntoView(false);
	}else{
		var parent = node.parentNode;
		var parentBottom = parent.scrollTop + dojo.marginBox(parent).h; //PORT was getBorderBox
		var nodeBottom = node.offsetTop + dojo.marginBox(node).h;
		if(parentBottom < nodeBottom){
			parent.scrollTop += (nodeBottom - parentBottom);
		}else if(parent.scrollTop > node.offsetTop){
			parent.scrollTop -= (parent.scrollTop - node.offsetTop);
		}
	}
};

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base/sniff.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base.sniff"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.sniff"] = true;
dojo.provide("dijit._base.sniff");

// ported from dojo.html.applyBrowserClass (style.js)

//	summary:
//		Applies pre-set class names based on browser & version to the
//		top-level HTML node.  Simply doing a require on this module will
//		establish this CSS.  Modified version of Morris' CSS hack.
(function(){
	var d = dojo;
	var ie = d.isIE;
	var opera = d.isOpera;
	var maj = Math.floor;
	var classes = {
		dj_ie: ie,
//		dj_ie55: ie == 5.5,
		dj_ie6: maj(ie) == 6,
		dj_ie7: maj(ie) == 7,
		dj_iequirks: ie && d.isQuirks,
// NOTE: Opera not supported by dijit
		dj_opera: opera,
		dj_opera8: maj(opera) == 8,
		dj_opera9: maj(opera) == 9,
		dj_khtml: d.isKhtml,
		dj_safari: d.isSafari,
		dj_gecko: d.isMozilla
	}; // no dojo unsupported browsers

	for(var p in classes){
		if(classes[p]){
			var html = dojo.doc.documentElement; //TODO browser-specific DOM magic needed?
			if(html.className){
				html.className += " " + p;
			}else{
				html.className = p;
			}
		}
	}
})();

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base/bidi.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base.bidi"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.bidi"] = true;
dojo.provide("dijit._base.bidi");

// summary: applies a class to the top of the document for right-to-left stylesheet rules

dojo.addOnLoad(function(){
	if(!dojo._isBodyLtr()){
		dojo.addClass(dojo.body(), "dijitRtl");
	}
});

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base/typematic.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base.typematic"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.typematic"] = true;
dojo.provide("dijit._base.typematic");

dijit.typematic = {
	// summary:
	//	These functions are used to repetitively call a user specified callback
	//	method when a specific key or mouse click over a specific DOM node is
	//	held down for a specific amount of time.
	//	Only 1 such event is allowed to occur on the browser page at 1 time.

	_fireEventAndReload: function(){
		this._timer = null;
		this._callback(++this._count, this._node, this._evt);
		this._currentTimeout = (this._currentTimeout < 0) ? this._initialDelay : ((this._subsequentDelay > 1) ? this._subsequentDelay : Math.round(this._currentTimeout * this._subsequentDelay));
		this._timer = setTimeout(dojo.hitch(this, "_fireEventAndReload"), this._currentTimeout);
	},

	trigger: function(/*Event*/ evt, /* Object */ _this, /*DOMNode*/ node, /* Function */ callback, /* Object */ obj, /* Number */ subsequentDelay, /* Number */ initialDelay){
		// summary:
		//      Start a timed, repeating callback sequence.
		//      If already started, the function call is ignored.
		//      This method is not normally called by the user but can be
		//      when the normal listener code is insufficient.
		//	Parameters:
		//	evt: key or mouse event object to pass to the user callback
		//	_this: pointer to the user's widget space.
		//	node: the DOM node object to pass the the callback function
		//	callback: function to call until the sequence is stopped called with 3 parameters:
		//		count: integer representing number of repeated calls (0..n) with -1 indicating the iteration has stopped
		//		node: the DOM node object passed in
		//		evt: key or mouse event object
		//	obj: user space object used to uniquely identify each typematic sequence
		//	subsequentDelay: if > 1, the number of milliseconds until the 3->n events occur
		//		or else the fractional time multiplier for the next event's delay, default=0.9
		//	initialDelay: the number of milliseconds until the 2nd event occurs, default=500ms
		if(obj != this._obj){
			this.stop();
			this._initialDelay = initialDelay || 500;
			this._subsequentDelay = subsequentDelay || 0.90;
			this._obj = obj;
			this._evt = evt;
			this._node = node;
			this._currentTimeout = -1;
			this._count = -1;
			this._callback = dojo.hitch(_this, callback);
			this._fireEventAndReload();
		}
	},

	stop: function(){
		// summary:
		//	  Stop an ongoing timed, repeating callback sequence.
		if(this._timer){
			clearTimeout(this._timer);
			this._timer = null;
		}
		if(this._obj){
			this._callback(-1, this._node, this._evt);
			this._obj = null;
		}
	},

	addKeyListener: function(/*DOMNode*/ node, /*Object*/ keyObject, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay){
		// summary: Start listening for a specific typematic key.
		//	keyObject: an object defining the key to listen for.
		//		key: (mandatory) the keyCode (number) or character (string) to listen for.
		//		ctrlKey: desired ctrl key state to initiate the calback sequence:
		//			pressed (true)
		//			released (false)
		//			either (unspecified)
		//		altKey: same as ctrlKey but for the alt key
		//		shiftKey: same as ctrlKey but for the shift key
		//	See the trigger method for other parameters.
		//	Returns an array of dojo.connect handles
		return [
			dojo.connect(node, "onkeypress", this, function(evt){
				if(evt.keyCode == keyObject.keyCode && (!keyObject.charCode || keyObject.charCode == evt.charCode) &&
				(keyObject.ctrlKey === undefined || keyObject.ctrlKey == evt.ctrlKey) &&
				(keyObject.altKey === undefined || keyObject.altKey == evt.ctrlKey) &&
				(keyObject.shiftKey === undefined || keyObject.shiftKey == evt.ctrlKey)){
					dojo.stopEvent(evt);
					dijit.typematic.trigger(keyObject, _this, node, callback, keyObject, subsequentDelay, initialDelay);
				}else if(dijit.typematic._obj == keyObject){
					dijit.typematic.stop();
				}
			}),
			dojo.connect(node, "onkeyup", this, function(evt){
				if(dijit.typematic._obj == keyObject){
					dijit.typematic.stop();
				}
			})
		];
	},

	addMouseListener: function(/*DOMNode*/ node, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay){
		// summary: Start listening for a typematic mouse click.
		//	See the trigger method for other parameters.
		//	Returns an array of dojo.connect handles
		var dc = dojo.connect;
		return [
			dc(node, "mousedown", this, function(evt){
				dojo.stopEvent(evt);
				dijit.typematic.trigger(evt, _this, node, callback, node, subsequentDelay, initialDelay);
			}),
			dc(node, "mouseup", this, function(evt){
				dojo.stopEvent(evt);
				dijit.typematic.stop();
			}),
			dc(node, "mouseout", this, function(evt){
				dojo.stopEvent(evt);
				dijit.typematic.stop();
			}),
			dc(node, "mousemove", this, function(evt){
				dojo.stopEvent(evt);
			}),
			dc(node, "dblclick", this, function(evt){
				dojo.stopEvent(evt);
				if(dojo.isIE){
					dijit.typematic.trigger(evt, _this, node, callback, node, subsequentDelay, initialDelay);
					setTimeout(dijit.typematic.stop, 50);
				}
			})
		];
	},

	addListener: function(/*Node*/ mouseNode, /*Node*/ keyNode, /*Object*/ keyObject, /*Object*/ _this, /*Function*/ callback, /*Number*/ subsequentDelay, /*Number*/ initialDelay){
		// summary: Start listening for a specific typematic key and mouseclick.
		//	This is a thin wrapper to addKeyListener and addMouseListener.
		//	mouseNode: the DOM node object to listen on for mouse events.
		//	keyNode: the DOM node object to listen on for key events.
		//	See the addMouseListener and addKeyListener methods for other parameters.
		//	Returns an array of dojo.connect handles
		return this.addKeyListener(keyNode, keyObject, _this, callback, subsequentDelay, initialDelay).concat(
			this.addMouseListener(mouseNode, _this, callback, subsequentDelay, initialDelay));
	}
};

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base/wai.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base.wai"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base.wai"] = true;
dojo.provide("dijit._base.wai");

dijit.wai = {
	onload: function(){
		// summary:
		//		Function that detects if we are in high-contrast mode or not,
		//		and sets up a timer to periodically confirm the value.
		//		figure out the background-image style property
		//		and apply that to the image.src property.
		// description:
		//		This must be a named function and not an anonymous
		//		function, so that the widget parsing code can make sure it
		//		registers its onload function after this function.
		//		DO NOT USE "this" within this function.

		// create div for testing if high contrast mode is on or images are turned off
		var div = document.createElement("div");
		div.id = "a11yTestNode";
		div.style.cssText = 'border: 1px solid;'
			+ 'border-color:red green;'
			+ 'position: absolute;'
			+ 'height: 5px;'
			+ 'top: -999px;'
			+ 'background-image: url("' + dojo.moduleUrl("dijit", "form/templates/blank.gif") + '");';
	    if(dojo && dojo.body()) {
		   dojo.body().appendChild(div);
        }
		// test it
		function check(){
			var cs = dojo.getComputedStyle(div);
			if(cs){
				var bkImg = cs.backgroundImage;
				var needsA11y = (cs.borderTopColor==cs.borderRightColor) || (bkImg != null && (bkImg == "none" || bkImg == "url(invalid-url:)" ));
				dojo[needsA11y ? "addClass" : "removeClass"](dojo.body(), "dijit_a11y");
			}
		}
		check();
		if(dojo.isIE){
			setInterval(check, 4000);
		}
	}
};

// Test if computer is in high contrast mode.
// Make sure the a11y test runs first, before widgets are instantiated.
if(dojo.isIE || dojo.isMoz){	// NOTE: checking in Safari messes things up
	dojo._loaders.unshift(dijit.wai.onload);
}

dojo.mixin(dijit,
{
	hasWaiRole: function(/*Element*/ elem){
		// Summary: Return true if elem has a role attribute and false if not.
		if(elem.hasAttribute){
			return elem.hasAttribute("role");
		}else{
			return elem.getAttribute("role") ? true : false;
		}
	},

	getWaiRole: function(/*Element*/ elem){
		// Summary: Return the role of elem or an empty string if
		//		elem does not have a role.
		var value = elem.getAttribute("role");
		if(value){
			var prefixEnd = value.indexOf(":");
			return prefixEnd == -1 ? value : value.substring(prefixEnd+1);
		}else{
			return "";
		}
	},

	setWaiRole: function(/*Element*/ elem, /*String*/ role){
		// Summary: Set the role on elem. On Firefox 2 and below, "wairole:" is
		//		prepended to the provided role value.
		if(dojo.isFF && dojo.isFF < 3){
			elem.setAttribute("role", "wairole:"+role);
		}else{
			elem.setAttribute("role", role);
		}
	},

	removeWaiRole: function(/*Element*/ elem){
		// Summary: Removes the role attribute from elem.
		elem.removeAttribute("role");
	},

	hasWaiState: function(/*Element*/ elem, /*String*/ state){
		// Summary: Return true if elem has a value for the given state and
		//		false if it does not.
		//		On Firefox 2 and below, we check for an attribute in namespace
		//		"http://www.w3.org/2005/07/aaa" with a name of the given state.
		//		On all other browsers, we check for an attribute called
		//		"aria-"+state.
		if(dojo.isFF && dojo.isFF < 3){
			return elem.hasAttributeNS("http://www.w3.org/2005/07/aaa", state);
		}else{
			if(elem.hasAttribute){
				return elem.hasAttribute("aria-"+state);
			}else{
				return elem.getAttribute("aria-"+state) ? true : false;
			}
		}
	},

	getWaiState: function(/*Element*/ elem, /*String*/ state){
		// Summary: Return the value of the requested state on elem
		//		or an empty string if elem has no value for state.
		//		On Firefox 2 and below, we check for an attribute in namespace
		//		"http://www.w3.org/2005/07/aaa" with a name of the given state.
		//		On all other browsers, we check for an attribute called
		//		"aria-"+state.
		if(dojo.isFF && dojo.isFF < 3){
			return elem.getAttributeNS("http://www.w3.org/2005/07/aaa", state);
		}else{
			var value =  elem.getAttribute("aria-"+state);
			return value ? value : "";
		}
	},

	setWaiState: function(/*Element*/ elem, /*String*/ state, /*String*/ value){
		// Summary: Set state on elem to value.
		//		On Firefox 2 and below, we set an attribute in namespace
		//		"http://www.w3.org/2005/07/aaa" with a name of the given state.
		//		On all other browsers, we set an attribute called
		//		"aria-"+state.
		if(dojo.isFF && dojo.isFF < 3){
			elem.setAttributeNS("http://www.w3.org/2005/07/aaa",
				"aaa:"+state, value);
		}else{
			elem.setAttribute("aria-"+state, value);
		}
	},

	removeWaiState: function(/*Element*/ elem, /*String*/ state){
		// Summary: Removes the given state from elem.
		//		On Firefox 2 and below, we remove the attribute in namespace
		//		"http://www.w3.org/2005/07/aaa" with a name of the given state.
		//		On all other browsers, we remove the attribute called
		//		"aria-"+state.
		if(dojo.isFF && dojo.isFF < 3){
			elem.removeAttributeNS("http://www.w3.org/2005/07/aaa", state);
		}else{
			elem.removeAttribute("aria-"+state);
		}
	}
});

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_base.js
/******************************************************************************/

if(!dojo._hasResource["dijit._base"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._base"] = true;
dojo.provide("dijit._base");

dojo.require("dijit._base.focus");
dojo.require("dijit._base.manager");
dojo.require("dijit._base.place");
dojo.require("dijit._base.popup");
dojo.require("dijit._base.scroll");
dojo.require("dijit._base.sniff");
dojo.require("dijit._base.bidi");
dojo.require("dijit._base.typematic");
dojo.require("dijit._base.wai");
dojo.require("dijit._base.window");

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_Widget.js
/******************************************************************************/

if(!dojo._hasResource["dijit._Widget"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._Widget"] = true;
dojo.provide("dijit._Widget");

dojo.require("dijit._base");

dojo.declare("dijit._Widget", null, {
	// summary:
	//		The foundation of dijit widgets. 	
	//
	// id: String
	//		a unique, opaque ID string that can be assigned by users or by the
	//		system. If the developer passes an ID which is known not to be
	//		unique, the specified ID is ignored and the system-generated ID is
	//		used instead.
	id: "",

	// lang: String
	//	Language to display this widget in (like en-us).
	//	Defaults to brower's specified preferred language (typically the language of the OS)
	lang: "",

	// dir: String
	//  Bi-directional support, as defined by the HTML DIR attribute. Either left-to-right "ltr" or right-to-left "rtl".
	dir: "",

	// class: String
	// HTML class attribute
	"class": "",

	// style: String
	// HTML style attribute
	style: "",

	// title: String
	// HTML title attribute
	title: "",

	// srcNodeRef: DomNode
	//		pointer to original dom node
	srcNodeRef: null,

	// domNode: DomNode
	//		this is our visible representation of the widget! Other DOM
	//		Nodes may by assigned to other properties, usually through the
	//		template system's dojoAttachPonit syntax, but the domNode
	//		property is the canonical "top level" node in widget UI.
	domNode: null,

	// attributeMap: Object
	//		A map of attributes and attachpoints -- typically standard HTML attributes -- to set
	//		on the widget's dom, at the "domNode" attach point, by default.
	//		Other node references can be specified as properties of 'this'
	attributeMap: {id:"", dir:"", lang:"", "class":"", style:"", title:""},  // TODO: add on* handlers?

	//page security information definiens
	//     writely : 可写
	//     hidden : 隐藏
	//     disabled : 不可写
	securityId : "",
	//////////// INITIALIZATION METHODS ///////////////////////////////////////

	getSecurityId : function(){
		return this.securityId;
	},
	postscript: function(params, srcNodeRef){
		this.create(params, srcNodeRef);
	},

	create: function(params, srcNodeRef){
		// summary:
		//		To understand the process by which widgets are instantiated, it
		//		is critical to understand what other methods create calls and
		//		which of them you'll want to override. Of course, adventurous
		//		developers could override create entirely, but this should
		//		only be done as a last resort.
		//
		//		Below is a list of the methods that are called, in the order
		//		they are fired, along with notes about what they do and if/when
		//		you should over-ride them in your widget:
		//			
		//			postMixInProperties:
		//				a stub function that you can over-ride to modify
		//				variables that may have been naively assigned by
		//				mixInProperties
		//			# widget is added to manager object here
		//			buildRendering
		//				Subclasses use this method to handle all UI initialization
		//				Sets this.domNode.  Templated widgets do this automatically
		//				and otherwise it just uses the source dom node.
		//			postCreate
		//				a stub function that you can over-ride to modify take
		//				actions once the widget has been placed in the UI

		// store pointer to original dom tree
		this.srcNodeRef = dojo.byId(srcNodeRef);

		// For garbage collection.  An array of handles returned by Widget.connect()
		// Each handle returned from Widget.connect() is an array of handles from dojo.connect()
		this._connects=[];

		// _attaches: String[]
		// 		names of all our dojoAttachPoint variables
		this._attaches=[];

		//mixin our passed parameters
		if(this.srcNodeRef && (typeof this.srcNodeRef.id == "string")){ this.id = this.srcNodeRef.id; }
		if(params){
			dojo.mixin(this,params);
		}
		this.postMixInProperties();

		// generate an id for the widget if one wasn't specified
		// (be sure to do this before buildRendering() because that function might
		// expect the id to be there.
		if(!this.id){
			this.id=dijit.getUniqueId(this.declaredClass.replace(/\./g,"_"));
		}
		dijit.registry.add(this);

		this.buildRendering();

		// Copy attributes listed in attributeMap into the [newly created] DOM for the widget.
		// The placement of these attributes is according to the property mapping in attributeMap.
		// Note special handling for 'style' and 'class' attributes which are lists and can
		// have elements from both old and new structures, and some attributes like "type"
		// cannot be processed this way as they are not mutable.
		if(this.domNode){
			for(var attr in this.attributeMap){
				var mapNode = this[this.attributeMap[attr] || "domNode"];
				if(!mapNode){
					continue;
				}
				var value = this[attr];
				if(typeof value != "object" && (value !== "" || (params && params[attr]))){
					switch(attr){
					case "class":
						dojo.addClass(mapNode, value);
						break;
					case "style":
						if(mapNode.style.cssText){
							mapNode.style.cssText += "; " + value;// FIXME: Opera
						}else{
							mapNode.style.cssText = value;
						}
						break;
					default:
						mapNode.setAttribute(attr, value);
					}
				}
			}
		}

		if(this.domNode){
			this.domNode.setAttribute("widgetId", this.id);
		}
		this.postCreate();
		this._addEventHandler();
	    
		// If srcNodeRef has been processed and removed from the DOM (e.g. TemplatedWidget) then delete it to allow GC.
		if(this.srcNodeRef && !this.srcNodeRef.parentNode){
			delete this.srcNodeRef;
		}	
	},
	
	_addEventHandler : function(){
		var self = this;
		if(this.connectEventHandler){
			if(this.srcNodeRef){
				dojo.addOnLoad(dojo.hitch(self, self.connectEventHandler));
			}else{
				this.connectEventHandler();
			}
		}
	},
	


	postMixInProperties: function(){
		// summary
		//	Called after the parameters to the widget have been read-in,
		//	but before the widget template is instantiated.
		//	Especially useful to set properties that are referenced in the widget template.
	},

	buildRendering: function(){
		// summary:
		//		Construct the UI for this widget, setting this.domNode.
		//		Most widgets will mixin TemplatedWidget, which overrides this method.
		this.domNode = this.srcNodeRef || dojo.doc.createElement('div');
	},

	postCreate: function(){
		// summary:
		//		Called after a widget's dom has been setup
	},

	startup: function(){
		// summary:
		//		Called after a widget's children, and other widgets on the page, have been created.
		//		Provides an opportunity to manipulate any children before they are displayed
		//		This is useful for composite widgets that need to control or layout sub-widgets
		//		Many layout widgets can use this as a wiring phase
	},

	//////////// DESTROY FUNCTIONS ////////////////////////////////

	destroyRecursive: function(/*Boolean*/ finalize){
		// summary:
		// 		Destroy this widget and it's descendants. This is the generic
		// 		"destructor" function that all widget users should call to
		// 		cleanly discard with a widget. Once a widget is destroyed, it's
		// 		removed from the manager object.
		// finalize: Boolean
		//		is this function being called part of global environment
		//		tear-down?

		this.destroyDescendants();
		this.destroy();
	},

	destroy: function(/*Boolean*/ finalize){
		// summary:
		// 		Destroy this widget, but not its descendants
		// finalize: Boolean
		//		is this function being called part of global environment
		//		tear-down?
		this.uninitialize();
		dojo.forEach(this._connects, function(array){
			dojo.forEach(array, dojo.disconnect);
		});
		this.destroyRendering(finalize);
		dijit.registry.remove(this.id);
	},

	destroyRendering: function(/*Boolean*/ finalize){
		// summary:
		//		Destroys the DOM nodes associated with this widget
		// finalize: Boolean
		//		is this function being called part of global environment
		//		tear-down?

		if(this.bgIframe){
			this.bgIframe.destroy();
			delete this.bgIframe;
		}

		if(this.domNode){
			dojo._destroyElement(this.domNode);
			delete this.domNode;
		}

		if(this.srcNodeRef){
			dojo._destroyElement(this.srcNodeRef);
			delete this.srcNodeRef;
		}
	},

	destroyDescendants: function(){
		// summary:
		//		Recursively destroy the children of this widget and their
		//		descendants.

		// TODO: should I destroy in the reverse order, to go bottom up?
		dojo.forEach(this.getDescendants(), function(widget){ widget.destroy(); });
	},

	uninitialize: function(){
		// summary:
		//		stub function. Over-ride to implement custom widget tear-down
		//		behavior.
		return false;
	},

	////////////////// MISCELLANEOUS METHODS ///////////////////

	toString: function(){
		// summary:
		//		returns a string that represents the widget. When a widget is
		//		cast to a string, this method will be used to generate the
		//		output. Currently, it does not implement any sort of reversable
		//		serialization.
		return '[Widget ' + this.declaredClass + ', ' + (this.id || 'NO ID') + ']'; // String
	},

	getDescendants: function(){
		// summary:
		//	return all the descendant widgets
		var list = dojo.query('[widgetId]', this.domNode);
		return list.map(dijit.byNode);		// Array
	},

	nodesWithKeyClick : ["input", "button"],

	connect: function(
			/*Object|null*/ obj,
			/*String*/ event,
			/*String|Function*/ method){

		// summary:
		//		Connects specified obj/event to specified method of this object
		//		and registers for disconnect() on widget destroy.
		//		Special event: "ondijitclick" triggers on a click or enter-down or space-up
		//		Similar to dojo.connect() but takes three arguments rather than four.
		var handles =[];
		if(event == "ondijitclick"){
			var w = this;
			// add key based click activation for unsupported nodes.
			if(!this.nodesWithKeyClick[obj.nodeName]){
				handles.push(dojo.connect(obj, "onkeydown", this,
					function(e){
						if(e.keyCode == dojo.keys.ENTER){
							return (dojo.isString(method))?
								w[method](e) : method.call(w, e);
						}else if(e.keyCode == dojo.keys.SPACE){
							// stop space down as it causes IE to scroll
							// the browser window
							dojo.stopEvent(e);
						}
			 		}));
				handles.push(dojo.connect(obj, "onkeyup", this,
					function(e){
						if(e.keyCode == dojo.keys.SPACE){
							return dojo.isString(method) ?
								w[method](e) : method.call(w, e);
						}
			 		}));
			}
			event = "onclick";
		}
		this._attachDelayEvent(obj, event, this, method,handles);
		//handles.push(dojo.connect(obj, event, this, method));

		// return handles for FormElement and ComboBox
		//this._connects.push(handles);
		return handles;
	},
	_attachDelayEvent : function(obj, event, context, method,handles){ 
		obj[event] = function(){
			handles.push(dojo.connect(obj, event, context, method));
			context._connects.push(handles);
			obj[event].target =null;
			obj[event].apply(obj,arguments);	
		}		
		dojo.addOnUnload(function(){
			obj[event] = null;
		});
	},
	disconnect: function(/*Object*/ handles){
		// summary:
		//		Disconnects handle created by this.connect.
		//		Also removes handle from this widget's list of connects
		for(var i=0; i<this._connects.length; i++){
			if(this._connects[i]==handles){
				dojo.forEach(handles, dojo.disconnect);
				this._connects.splice(i, 1);
				return;
			}
		}
	},

	isLeftToRight: function(){
		// summary:
		//		Checks the DOM to for the text direction for bi-directional support
		// description:
		//		This method cannot be used during widget construction because the widget
		//		must first be connected to the DOM tree.  Parent nodes are searched for the
		//		'dir' attribute until one is found, otherwise left to right mode is assumed.
		//		See HTML spec, DIR attribute for more information.

		if(typeof this._ltr == "undefined"){
			this._ltr = dojo.getComputedStyle(this.domNode).direction != "rtl";
		}
		return this._ltr; //Boolean
	},

	isFocusable: function(){
		// summary:
		//		Return true if this widget can currently be focused
		//		and false if not
		return this.focus && (dojo.style(this.domNode, "display") != "none");
	}
});

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_Templated.js
/******************************************************************************/

if(!dojo._hasResource["dijit._Templated"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._Templated"] = true;
dojo.provide("dijit._Templated");

dojo.require("dijit._Widget");

dojo.require("dojo.string");
dojo.require("dojo.parser");

dojo.declare("dijit._Templated",
	null,
	{
		// summary:
		//		mixin for widgets that are instantiated from a template

		// templateNode: DomNode
		//		a node that represents the widget template. Pre-empts both templateString and templatePath.
		templateNode: null,

		// templateString String:
		//		a string that represents the widget template. Pre-empts the
		//		templatePath. In builds that have their strings "interned", the
		//		templatePath is converted to an inline templateString, thereby
		//		preventing a synchronous network call.
		templateString: null,

		// templatePath: String
		//	Path to template (HTML file) for this widget
		templatePath: null,

		// widgetsInTemplate Boolean:
		//		should we parse the template to find widgets that might be
		//		declared in markup inside it? false by default.
		widgetsInTemplate: false,

		// containerNode DomNode:
		//		holds child elements. "containerNode" is generally set via a
		//		dojoAttachPoint assignment and it designates where children of
		//		the src dom node will be placed
		containerNode: null,

		// skipNodeCache Boolean:
		//		if using a cached widget template node poses issues for a
		//		particular widget class, it can set this property to ensure
		//		that its template is always re-built from a string
		_skipNodeCache: false,

		// method over-ride
		buildRendering: function(){
			// summary:
			//		Construct the UI for this widget from a template, setting this.domNode.

			// Lookup cached version of template, and download to cache if it
			// isn't there already.  Returns either a DomNode or a string, depending on
			// whether or not the template contains ${foo} replacement parameters.
			var cached = dijit._Templated.getCachedTemplate(this.templatePath, this.templateString, this._skipNodeCache);

			var node;
			if(dojo.isString(cached)){
				var className = this.declaredClass, _this = this;
				// Cache contains a string because we need to do property replacement
				// do the property replacement
				var tstr = dojo.string.substitute(cached, this, function(value, key){
					if(key.charAt(0) == '!'){ value = _this[key.substr(1)]; }
					if(typeof value == "undefined"){ throw new Error(className+" template:"+key); } // a debugging aide
					if(!value){ return ""; }

					// Substitution keys beginning with ! will skip the transform step,
					// in case a user wishes to insert unescaped markup, e.g. ${!foo}
					return key.charAt(0) == "!" ? value :
						// Safer substitution, see heading "Attribute values" in
						// http://www.w3.org/TR/REC-html40/appendix/notes.html#h-B.3.2
						value.toString().replace(/"/g,"&quot;"); //TODO: add &amp? use encodeXML method?
				}, this);

				node = dijit._Templated._createNodesFromText(tstr)[0];
			}else{
				// if it's a node, all we have to do is clone it
				node = cached.cloneNode(true);
			}

			// recurse through the node, looking for, and attaching to, our
			// attachment points which should be defined on the template node.
			this._attachTemplateNodes(node);

			var source = this.srcNodeRef;
			if(source && source.parentNode){
				source.parentNode.replaceChild(node, source);
			}

			this.domNode = node;
			if(this.widgetsInTemplate){
				var childWidgets = dojo.parser.parse(node);
				this._attachTemplateNodes(childWidgets, function(n,p){
					return n[p];
				});
			}

			this._fillContent(source);
		},

		_fillContent: function(/*DomNode*/ source){
			// summary:
			//		relocate source contents to templated container node
			//		this.containerNode must be able to receive children, or exceptions will be thrown
			var dest = this.containerNode;
			if(source && dest){
				while(source.hasChildNodes()){
					dest.appendChild(source.firstChild);
				}
			}
		},

		_attachTemplateNodes: function(rootNode, getAttrFunc){
			// summary:
			//		map widget properties and functions to the handlers specified in
			//		the dom node and it's descendants. This function iterates over all
			//		nodes and looks for these properties:
			//			* dojoAttachPoint
			//			* dojoAttachEvent	
			//			* waiRole
			//			* waiState
			// rootNode: DomNode|Array[Widgets]
			//		the node to search for properties. All children will be searched.
			// getAttrFunc: function?
			//		a function which will be used to obtain property for a given
			//		DomNode/Widget

			getAttrFunc = getAttrFunc || function(n,p){ return n.getAttribute(p); };

			var nodes = dojo.isArray(rootNode) ? rootNode : (rootNode.all || rootNode.getElementsByTagName("*"));
			var x=dojo.isArray(rootNode)?0:-1;
			for(; x<nodes.length; x++){
				var baseNode = (x == -1) ? rootNode : nodes[x];
				if(this.widgetsInTemplate && getAttrFunc(baseNode,'dojoType')){
					continue;
				}
				// Process dojoAttachPoint
				var attachPoint = getAttrFunc(baseNode, "dojoAttachPoint");
				if(attachPoint){
					var point, points = attachPoint.split(/\s*,\s*/);
					while(point=points.shift()){
						if(dojo.isArray(this[point])){
							this[point].push(baseNode);
						}else{
							this[point]=baseNode;
						}
					}
				}

				// Process dojoAttachEvent
				var attachEvent = getAttrFunc(baseNode, "dojoAttachEvent");
				if(attachEvent){
					// NOTE: we want to support attributes that have the form
					// "domEvent: nativeEvent; ..."
					var event, events = attachEvent.split(/\s*,\s*/);
					var trim = dojo.trim;
					while(event=events.shift()){
						if(event){
							var thisFunc = null;
							if(event.indexOf(":") != -1){
								// oh, if only JS had tuple assignment
								var funcNameArr = event.split(":");
								event = trim(funcNameArr[0]);
								thisFunc = trim(funcNameArr[1]);
							}else{
								event = trim(event);
							}
							if(!thisFunc){
								thisFunc = event;
							}
							this.connect(baseNode, event, thisFunc);
						}
					}
				}

				// waiRole, waiState
//				var role = getAttrFunc(baseNode, "waiRole");
//				if(role){
//					dijit.setWaiRole(baseNode, role);
//				}
//				var values = getAttrFunc(baseNode, "waiState");
//				if(values){
//					dojo.forEach(values.split(/\s*,\s*/), function(stateValue){
//						if(stateValue.indexOf('-') != -1){
//							var pair = stateValue.split('-');
//							dijit.setWaiState(baseNode, pair[0], pair[1]);
//						}
//					});
//				}

			}
		}
	}
);

// key is either templatePath or templateString; object is either string or DOM tree
dijit._Templated._templateCache = {};

dijit._Templated.getCachedTemplate = function(templatePath, templateString, alwaysUseString){
	// summary:
	//		static method to get a template based on the templatePath or
	//		templateString key
	// templatePath: String
	//		the URL to get the template from. dojo.uri.Uri is often passed as well.
	// templateString: String?
	//		a string to use in lieu of fetching the template from a URL
	// Returns:
	//	Either string (if there are ${} variables that need to be replaced) or just
	//	a DOM tree (if the node can be cloned directly)

	// is it already cached?
	var tmplts = dijit._Templated._templateCache;
	var key = templateString || templatePath;
	var cached = tmplts[key];
	if(cached){
		return cached;
	}

	// If necessary, load template string from template path
	if(!templateString){
		templateString = dijit._Templated._sanitizeTemplateString(dojo._getText(templatePath));
	}

	templateString = dojo.string.trim(templateString);

	if(templateString.match(/\$\{([^\}]+)\}/g) || alwaysUseString){
		// there are variables in the template so all we can do is cache the string
		return (tmplts[key] = templateString); //String
	}else{
		// there are no variables in the template so we can cache the DOM tree
		return (tmplts[key] = dijit._Templated._createNodesFromText(templateString)[0]); //Node
	}
};

dijit._Templated._sanitizeTemplateString = function(/*String*/tString){
	// summary: 
	//		Strips <?xml ...?> declarations so that external SVG and XML
	// 		documents can be added to a document without worry. Also, if the string
	//		is an HTML document, only the part inside the body tag is returned.
	if(tString){
		tString = tString.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, "");
		var matches = tString.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
		if(matches){
			tString = matches[1];
		}
	}else{
		tString = "";
	}
	return tString; //String
};


if(dojo.isIE){
	dojo.addOnUnload(function(){
		var cache = dijit._Templated._templateCache;
		for(var key in cache){
			var value = cache[key];
			if(!isNaN(value.nodeType)){ // isNode equivalent
				dojo._destroyElement(value);
			}
			delete cache[key];
		}
	});
}

(function(){
	var tagMap = {
		cell: {re: /^<t[dh][\s\r\n>]/i, pre: "<table><tbody><tr>", post: "</tr></tbody></table>"},
		row: {re: /^<tr[\s\r\n>]/i, pre: "<table><tbody>", post: "</tbody></table>"},
		section: {re: /^<(thead|tbody|tfoot)[\s\r\n>]/i, pre: "<table>", post: "</table>"}
	};

	// dummy container node used temporarily to hold nodes being created
	var tn;

	dijit._Templated._createNodesFromText = function(/*String*/text){
		// summary:
		//	Attempts to create a set of nodes based on the structure of the passed text.

		if(!tn){
			tn = dojo.doc.createElement("div");
			tn.style.display="none";
			dojo.body().appendChild(tn);
		}
		var tableType = "none";
		var rtext = text.replace(/^\s+/, "");
		for(var type in tagMap){
			var map = tagMap[type];
			if(map.re.test(rtext)){
				tableType = type;
				text = map.pre + text + map.post;
				break;
			}
		}

		tn.innerHTML = text;
		if(tn.normalize){
			tn.normalize();
		}

		var tag = { cell: "tr", row: "tbody", section: "table" }[tableType];
		var _parent = (typeof tag != "undefined") ?
						tn.getElementsByTagName(tag)[0] :
						tn;

		var nodes = [];
		while(_parent.firstChild){
			nodes.push(_parent.removeChild(_parent.firstChild));
		}
		tn.innerHTML="";
		return nodes;	//	Array
	}
})();

// These arguments can be specified for widgets which are used in templates.
// Since any widget can be specified as sub widgets in template, mix it
// into the base widget class.  (This is a hack, but it's effective.)
dojo.extend(dijit._Widget,{
	dojoAttachEvent: "",
	dojoAttachPoint: "",
	waiRole: "",
	waiState:""
})

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/_Container.js
/******************************************************************************/

if(!dojo._hasResource["dijit._Container"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit._Container"] = true;
dojo.provide("dijit._Container");

dojo.declare("dijit._Contained",
	null,
	{
		// summary
		//		Mixin for widgets that are children of a container widget

		getParent: function(){
			// summary:
			//		returns the parent widget of this widget, assuming the parent
			//		implements dijit._Container
			for(var p=this.domNode.parentNode; p; p=p.parentNode){
				var id = p.getAttribute && p.getAttribute("widgetId");
				if(id){
					var parent = dijit.byId(id);
					return parent.isContainer ? parent : null;
				}
			}
			return null;
		},

		_getSibling: function(which){
			var node = this.domNode;
			do{
				node = node[which+"Sibling"];
			}while(node && node.nodeType != 1);
			if(!node){ return null; } // null
			var id = node.getAttribute("widgetId");
			return dijit.byId(id);
		},

		getPreviousSibling: function(){
			// summary:
			//		returns null if this is the first child of the parent,
			//		otherwise returns the next element sibling to the "left".

			return this._getSibling("previous");
		},

		getNextSibling: function(){
			// summary:
			//		returns null if this is the last child of the parent,
			//		otherwise returns the next element sibling to the "right".

			return this._getSibling("next");
		}
	}
);

dojo.declare("dijit._Container",
	null,
	{
		// summary
		//		Mixin for widgets that contain a list of children like SplitContainer

		isContainer: true,

		addChild: function(/*Widget*/ widget, /*int?*/ insertIndex){
			// summary:
			//		Process the given child widget, inserting it's dom node as
			//		a child of our dom node

			if(insertIndex === undefined){
				insertIndex = "last";
			}
			var refNode = this.containerNode || this.domNode;
			if(insertIndex && typeof insertIndex == "number"){
				var children = dojo.query("> [widgetid]", refNode);
				if(children && children.length >= insertIndex){
					refNode = children[insertIndex-1]; insertIndex = "after";
				}
			}
			dojo.place(widget.domNode, refNode, insertIndex);

			// If I've been started but the child widget hasn't been started,
			// start it now.  Make sure to do this after widget has been
			// inserted into the DOM tree, so it can see that it's being controlled by me,
			// so it doesn't try to size itself.
			if(this._started && !widget._started){
				widget.startup();
			}
		},

		removeChild: function(/*Widget*/ widget){
			// summary:
			//		removes the passed widget instance from this widget but does
			//		not destroy it
			var node = widget.domNode;
			node.parentNode.removeChild(node);	// detach but don't destroy
		},

		_nextElement: function(node){
			do{
				node = node.nextSibling;
			}while(node && node.nodeType != 1);
			return node;
		},

		_firstElement: function(node){
			node = node.firstChild;
			if(node && node.nodeType != 1){
				node = this._nextElement(node);
			}
			return node;
		},

		getChildren: function(){
			// summary:
			//		Returns array of children widgets
			return dojo.query("> [widgetId]", this.containerNode || this.domNode).map(dijit.byNode); // Array
		},

		hasChildren: function(){
			// summary:
			//		Returns true if widget has children
			var cn = this.containerNode || this.domNode;
			return !!this._firstElement(cn); // Boolean
		},

		_getSiblingOfChild: function(/*Widget*/ child, /*int*/ dir){
			// summary:
			//		get the next or previous widget sibling of child
			// dir:
			//		if 1, get the next sibling
			//		if -1, get the previous sibling
			var node = child.domNode;
			var which = (dir>0 ? "nextSibling" : "previousSibling");
			do{
				node = node[which];
			}while(node && (node.nodeType != 1 || !dijit.byNode(node)));
			return node ? dijit.byNode(node) : null;
		}
	}
);

dojo.declare("dijit._KeyNavContainer",
	[dijit._Container],
	{

		// summary:
		//		A _Container with keyboard navigation of its children.
		//		To use this mixin, call connectKeyNavHandlers() in
		//		postCreate() and call startupKeyNavChildren() in startup().

/*=====
		// focusedChild: Widget
		//		The currently focused child widget, or null if there isn't one
		focusedChild: null,
=====*/

		_keyNavCodes: {},

		connectKeyNavHandlers: function(/*Array*/ prevKeyCodes, /*Array*/ nextKeyCodes){
			// summary:
			//		Call in postCreate() to attach the keyboard handlers
			//		to the container.
			// preKeyCodes: Array
			//		Key codes for navigating to the previous child.
			// nextKeyCodes: Array
			//		Key codes for navigating to the next child.

			var keyCodes = this._keyNavCodes = {};
			var prev = dojo.hitch(this, this.focusPrev);
			var next = dojo.hitch(this, this.focusNext);
			dojo.forEach(prevKeyCodes, function(code){ keyCodes[code] = prev });
			dojo.forEach(nextKeyCodes, function(code){ keyCodes[code] = next });
			this.connect(this.domNode, "onkeypress", "_onContainerKeypress");
			if(dojo.isIE){
				this.connect(this.domNode, "onactivate", "_onContainerFocus");
				this.connect(this.domNode, "ondeactivate", "_onContainerBlur");
			}else{
				this.connect(this.domNode, "onfocus", "_onContainerFocus");
				this.connect(this.domNode, "onblur", "_onContainerBlur");
			}
		},

		startupKeyNavChildren: function(){
			// summary:
			//		Call in startup() to set child tabindexes to -1
			dojo.forEach(this.getChildren(), dojo.hitch(this, "_setTabIndexMinusOne"));
		},

		addChild: function(/*Widget*/ widget, /*int?*/ insertIndex){
			// summary: Add a child to our _Container
			dijit._KeyNavContainer.superclass.addChild.apply(this, arguments);
			this._setTabIndexMinusOne(widget);
		},

		focus: function(){
			// summary: Default focus() implementation: focus the first child.
			this.focusFirstChild();
		},

		focusFirstChild: function(){
			// summary: Focus the first focusable child in the container.
			this.focusChild(this._getFirstFocusableChild());
		},

		focusNext: function(){
			// summary: Focus the next widget or focal node (for widgets
			//		with multiple focal nodes) within this container.
			if(this.focusedChild && this.focusedChild.hasNextFocalNode
					&& this.focusedChild.hasNextFocalNode()){
				this.focusedChild.focusNext();
				return;
			}
			var child = this._getNextFocusableChild(this.focusedChild, 1);
			if(child.getFocalNodes){
				this.focusChild(child, child.getFocalNodes()[0]);
			}else{
				this.focusChild(child);
			}
		},

		focusPrev: function(){
			// summary: Focus the previous widget or focal node (for widgets
			//		with multiple focal nodes) within this container.
			if(this.focusedChild && this.focusedChild.hasPrevFocalNode
					&& this.focusedChild.hasPrevFocalNode()){
				this.focusedChild.focusPrev();
				return;
			}
			var child = this._getNextFocusableChild(this.focusedChild, -1);
			if(child.getFocalNodes){
				var nodes = child.getFocalNodes();
				this.focusChild(child, nodes[nodes.length-1]);
			}else{
				this.focusChild(child);
			}
		},

		focusChild: function(/*Widget*/ widget, /*Node?*/ node){
			// summary: Focus widget. Optionally focus 'node' within widget.
			if(widget){
				if(this.focusedChild && widget !== this.focusedChild){
					this._onChildBlur(this.focusedChild);
				}
				this.focusedChild = widget;
				if(node && widget.focusFocalNode){
					widget.focusFocalNode(node);
				}else{
					widget.focus();
				}
			}
		},

		_setTabIndexMinusOne: function(/*Widget*/ widget){
			if(widget.getFocalNodes){
				dojo.forEach(widget.getFocalNodes(), function(node){
					node.setAttribute("tabIndex", -1);
				});
			}else{
				(widget.focusNode || widget.domNode).setAttribute("tabIndex", -1);
			}
		},

		_onContainerFocus: function(evt){
			this.domNode.setAttribute("tabIndex", -1);
			if(evt.target === this.domNode){
				this.focusFirstChild();
			}else{
				var widget = dijit.getEnclosingWidget(evt.target);
				if(widget && widget.isFocusable()){
					this.focusedChild = widget;
				}
			}
		},

		_onContainerBlur: function(evt){
			if(this.tabIndex){
				this.domNode.setAttribute("tabIndex", this.tabIndex);
			}
		},

		_onContainerKeypress: function(evt){
			if(evt.ctrlKey || evt.altKey){ return; }
			var func = this._keyNavCodes[evt.keyCode];
			if(func){
				func();
				dojo.stopEvent(evt);
			}
		},

		_onChildBlur: function(/*Widget*/ widget){
			// summary:
			//		Called when focus leaves a child widget to go
			//		to a sibling widget.
		},

		_getFirstFocusableChild: function(){
			return this._getNextFocusableChild(null, 1);
		},

		_getNextFocusableChild: function(child, dir){
			if(child){
				child = this._getSiblingOfChild(child, dir);
			}
			var children = this.getChildren();
			for(var i=0; i < children.length; i++){
				if(!child){
					child = children[(dir>0) ? 0 : (children.length-1)];
				}
				if(child.isFocusable()){
					return child;
				}
				child = this._getSiblingOfChild(child, dir);
			}
		}
	}
);

}



/******************************************************************************/
//     appending E:/mywork/支持/电力项目/project2/Web/content/static/ria/dijit/layout/_LayoutWidget.js
/******************************************************************************/

if(!dojo._hasResource["dijit.layout._LayoutWidget"]){ //_hasResource checks added by build. Do not use _hasResource directly in your code.
dojo._hasResource["dijit.layout._LayoutWidget"] = true;
dojo.provide("dijit.layout._LayoutWidget");

dojo.require("dijit._Widget");
dojo.require("dijit._Container");

dojo.declare("dijit.layout._LayoutWidget",
	[dijit._Widget, dijit._Container, dijit._Contained],
	{
		// summary
		//		Mixin for widgets that contain a list of children like SplitContainer.
		//		Widgets which mixin this code must define layout() to lay out the children

		isLayoutContainer: true,

		postCreate: function(){
			dojo.addClass(this.domNode, "dijitContainer");
		},

		startup: function(){
			// summary:
			//		Called after all the widgets have been instantiated and their
			//		dom nodes have been inserted somewhere under document.body.
			//
			//		Widgets should override this method to do any initialization
			//		dependent on other widgets existing, and then call
			//		this superclass method to finish things off.
			//
			//		startup() in subclasses shouldn't do anything
			//		size related because the size of the widget hasn't been set yet.

			if(this._started){ return; }
			this._started=true;

			if(this.getChildren){
				dojo.forEach(this.getChildren(), function(child){ child.startup(); });
			}

			// If I am a top level widget
			if(!this.getParent || !this.getParent()){
				// Do recursive sizing and layout of all my descendants
				// (passing in no argument to resize means that it has to glean the size itself)
				this.resize();

				// since my parent isn't a layout container, and my style is width=height=100% (or something similar),
				// then I need to watch when the window resizes, and size myself accordingly
				// (passing in no argument to resize means that it has to glean the size itself)
				this.connect(window, 'onresize', function(){this.resize();});
			}
		},

		resize: function(args){
			// summary:
			//		Explicitly set this widget's size (in pixels),
			//		and then call layout() to resize contents (and maybe adjust child widgets)
			//	
			// args: Object?
			//		{w: int, h: int, l: int, t: int}

			var node = this.domNode;

			// set margin box size, unless it wasn't specified, in which case use current size
			if(args){
				dojo.marginBox(node, args);

				// set offset of the node
				if(args.t){ node.style.top = args.t + "px"; }
				if(args.l){ node.style.left = args.l + "px"; }
			}
			// If either height or width wasn't specified by the user, then query node for it.
			// But note that setting the margin box and then immediately querying dimensions may return
			// inaccurate results, so try not to depend on it.
			var mb = dojo.mixin(dojo.marginBox(node), args||{});

			// Save the size of my content box.
			this._contentBox = dijit.layout.marginBox2contentBox(node, mb);

			// Callback for widget to adjust size of it's children
			this.layout();
		},

		layout: function(){
			//	summary
			//		Widgets override this method to size & position their contents/children.
			//		When this is called this._contentBox is guaranteed to be set (see resize()).
			//
			//		This is called after startup(), and also when the widget's size has been
			//		changed.
		}
	}
);

dijit.layout.marginBox2contentBox = function(/*DomNode*/ node, /*Object*/ mb){
	// summary:
	//		Given the margin-box size of a node, return it's content box size.
	//		Functions like dojo.contentBox() but is more reliable since it doesn't have
	//		to wait for the browser to compute sizes.
	var cs = dojo.getComputedStyle(node);
	var me=dojo._getMarginExtents(node, cs);
	var pb=dojo._getPadBorderExtents(node, cs);
	return {
		l: dojo._toPixelValue(node, cs.paddingLeft),
		t: dojo._toPixelValue(node, cs.paddingTop),
		w: mb.w - (me.w + pb.w),
		h: mb.h - (me.h + pb.h)
	};
};

(function(){
	var capitalize = function(word){
		return word.substring(0,1).toUpperCase() + word.substring(1);
	};

	var size = function(widget, dim){
		// size the child
		widget.resize ? widget.resize(dim) : dojo.marginBox(widget.domNode, dim);

		// record child's size, but favor our own numbers when we have them.
		// the browser lies sometimes
		dojo.mixin(widget, dojo.marginBox(widget.domNode));
		dojo.mixin(widget, dim);
	};

	dijit.layout.layoutChildren = function(/*DomNode*/ container, /*Object*/ dim, /*Object[]*/ children){
		/**
		 * summary
		 *		Layout a bunch of child dom nodes within a parent dom node
		 * container:
		 *		parent node
		 * dim:
		 *		{l, t, w, h} object specifying dimensions of container into which to place children
		 * children:
		 *		an array like [ {domNode: foo, layoutAlign: "bottom" }, {domNode: bar, layoutAlign: "client"} ]
		 */

		// copy dim because we are going to modify it
		dim = dojo.mixin({}, dim);

		dojo.addClass(container, "dijitLayoutContainer");

		// Move "client" elements to the end of the array for layout.  a11y dictates that the author
		// needs to be able to put them in the document in tab-order, but this algorithm requires that
		// client be last.
		children = dojo.filter(children, function(item){ return item.layoutAlign != "client"; })
			.concat(dojo.filter(children, function(item){ return item.layoutAlign == "client"; }));

		// set positions/sizes
		dojo.forEach(children, function(child){
			var elm = child.domNode,
				pos = child.layoutAlign;

			// set elem to upper left corner of unused space; may move it later
			var elmStyle = elm.style;
			elmStyle.left = dim.l+"px";
			elmStyle.top = dim.t+"px";
			elmStyle.bottom = elmStyle.right = "auto";

			dojo.addClass(elm, "dijitAlign" + capitalize(pos));

			// set size && adjust record of remaining space.
			// note that setting the width of a <div> may affect it's height.
			if(pos=="top" || pos=="bottom"){
				size(child, { w: dim.w });
				dim.h -= child.h;
				if(pos=="top"){
					dim.t += child.h;
				}else{
					elmStyle.top = dim.t + dim.h + "px";
				}
			}else if(pos=="left" || pos=="right"){
				size(child, { h: dim.h });
				dim.w -= child.w;
				if(pos=="left"){
					dim.l += child.w;
				}else{
					elmStyle.left = dim.l + dim.w + "px";
				}
			}else if(pos=="client"){
				size(child, dim);
			}
		});
	};

})();

}


