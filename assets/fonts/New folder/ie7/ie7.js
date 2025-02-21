/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'font-FontIcon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'font-aparat': '&#xe900;',
		'font-arrow': '&#xe901;',
		'font-awards': '&#xe902;',
		'font-awsome': '&#xe903;',
		'font-brands': '&#xe904;',
		'font-cart': '&#xe905;',
		'font-cart2': '&#xe906;',
		'font-category': '&#xe907;',
		'font-check-circle': '&#xe908;',
		'font-clock': '&#xe909;',
		'font-close': '&#xe90a;',
		'font-download': '&#xe90b;',
		'font-edit': '&#xe90c;',
		'font-faq': '&#xe90d;',
		'font-filter': '&#xe90e;',
		'font-heart': '&#xe90f;',
		'font-instagram': '&#xe910;',
		'font-post': '&#xe911;',
		'font-profile': '&#xe912;',
		'font-search': '&#xe913;',
		'font-support': '&#xe914;',
		'font-telegram': '&#xe915;',
		'font-timer': '&#xe916;',
		'font-trash': '&#xe917;',
		'font-twitter': '&#xe918;',
		'font-user': '&#xe919;',
		'font-users': '&#xe91a;',
		'font-warning': '&#xe91b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/font-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
