/**
 * Author: Aristo Dakayao
 * Email: da.aristo.y@gmail.com
 * Role: Web & Mobile developer
 */
"use strict";

let dm_ = document;

let lo = dm_.createElement('div');
let so = dm_.createElement('style');

const translator_98 = {

	checkG2og: function () {
		let observer = new MutationObserver(([{ addedNodes }]) => {
			addedNodes.forEach(addedNode => {
				console.log('dom event', addedNode)
				if (addedNode.id === null) {
					return;
				}
				
				// if( !addedNode.href || addedNode.href.startsWith("https://translate.googleapis.com/") === false) {
				// 	return;
				// }
				console.log('id', c)
				let c = addedNode.getAttribute('class')
				if( !c || c.startsWith('goog-te-spinner-pos') === false) {
					return;
				}
				lo.remove();
				so.remove();
				window.scrollTo(0, 0);
				
				// document.body.innerHTML = '<h1>You are using Google Translate!</h1>';
				observer.disconnect();
			});
		});

		observer.observe(document.body, { childList: true, attributes: true });
	},

	/**
	 * Ajouter le loader
	 */
	loPresented: false,
	loAuthorized: true,
	loader: function () {
		if (!this.loAuthorized) {
			return;
		}
		if (!this.loPresented) {
			lo.id = 't98_loader';
			dm_.body.appendChild(lo);

			let sol = `
				body {
					overflow: hidden;
				}
				#t98_loader {
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: #fff;
					background-image: url('https://itcats.in/images/loading.gif');
					background-position: center;
					background-size: 100px;
					background-repeat: no-repeat;
					z-index: 9999 !important;
				}
			`;
			so.textContent = sol;
			if (typeof so!="undefined"){
				this.head.appendChild(so);
				this.loPresented = true;
			}
		}

		if (this.loPresented) {
			let i = setInterval(function () {
				let goEl = dm_.querySelector('.goog-te-spinner-pos');
				if ( goEl ) {
					clearInterval(i);
					// lo.remove();
					// so.remove();
					// window.scrollTo(0, 0);
				}
			}, 2000)
		}
		
	},
	
	init: function () {

		let co = dm_.getElementById('translate_98');

		this.head = dm_.getElementsByTagName("head")[0];
		this.cn = "googtrans";
		this.host = window.location.hostname;
		this.l1 = co.getAttribute('pageLanguage'); 
		this.l2 = co.getAttribute('translateTo');

		let loIs = co.getAttribute('loader');
		this.loAuthorized = (loIs === 'false') ? false : true;

		this.ckDomain = null;

		for (this.ckDomain = this.host.split("."); 2 < this.ckDomain.length;){
			this.ckDomain.shift();
		}

		let x = `
			#google_translate_element,
			.goog-te-banner-frame.skiptranslate,
			.goog-tooltip,
			.goog-tooltip:hover {
				display: none !important;
			}
			body{
				top: 0 !important;
			}
			.goog-text-highlight{
				background-color: transparent !important;
				border: none !important;
				box-shadow: none !important;
			}
		`;
		let s = dm_.createElement('style');
		s.textContent = x;
		if (typeof s!="undefined"){
			this.head.appendChild(s);
		}

		let g = dm_.createElement('script');
		g.setAttribute("type","text/javascript");
		g.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
		g.setAttribute("async", true);
		g.setAttribute("defer", true);
		if (typeof g!="undefined"){
			this.head.appendChild(g)
		}
	},

	removeFontTags: function () {
		/**
		 * coming soon
		 */
	},

	deleteCookie: function () {
		dm_.cookie = this.cn + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	},

	createCookie: function () {
		this.ckDomain = ";domain=" + this.ckDomain.join(".");
		if (!this.l1 || !this.l2) {
			throw('Vérifier que les langues sont décrite !');
		}
		dm_.cookie = this.cn + "=/" + this.l1 + "/" + this.l2 + "; expires=Thu, 07-Mar-2047 20:22:40 GMT; path=/" + this.ckDomain;
	},

	getCookie: function () {
		let name = this.cn + "=";
		let ca = dm_.cookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},

	checkCookie: function () {
		let ch = this.getCookie();
		if (ch != "") {
			let w = ch.split('/')
			if ( (this.l2 !== w[2]) || (this.l1 !== w[1]) ) {
				this.deleteCookie();
				return true;
			}
			return false;
		}
		return true;
	},

	googleTranslateCookieInit: function () {
		if (this.checkCookie()) {
			this.createCookie();
		}
	}
};


translator_98.checkG2og();
translator_98.init();
translator_98.loader();

function googleTranslateElementInit () {
	translator_98.googleTranslateCookieInit()

	new google.translate.TranslateElement({
		pageLanguage: translator_98.l1,
		autoDisplay: false,
		layout: google.translate.TranslateElement
	}, 'google_translate_element');
}