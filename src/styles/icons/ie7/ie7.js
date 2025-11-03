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
		el.innerHTML = '<span style="font-family: \'Orion\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-star-active': '&#xe900;',
		'icon-time_empty': '&#xe95d;',
		'icon-edit-horizontal-icons': '&#xe960;',
		'icon-upload_file': '&#xe95c;',
		'icon-description': '&#xe95b;',
		'icon-certificate-check': '&#xe901;',
		'icon-time': '&#xe907;',
		'icon-timer': '&#xe90a;',
		'icon-list-box': '&#xe90e;',
		'icon-download_file': '&#xe948;',
		'icon-check-list': '&#xe913;',
		'icon-ordered-list': '&#xe914;',
		'icon-bullet-list': '&#xe915;',
		'icon-underline': '&#xe916;',
		'icon-strike': '&#xe917;',
		'icon-italic': '&#xe918;',
		'icon-bold': '&#xe919;',
		'icon-status-in-progress': '&#xe91a;',
		'icon-status-pause': '&#xe91e;',
		'icon-users': '&#xe921;',
		'icon-access-pending': '&#xe922;',
		'icon-access-request': '&#xe923;',
		'icon-warning': '&#xe924;',
		'icon-remainder': '&#xe925;',
		'icon-kanban': '&#xe926;',
		'icon-ss-calendar': '&#xe92c;',
		'icon-unsupported-file': '&#xe927;',
		'icon-archive-file': '&#xe928;',
		'icon-doc-file': '&#xe929;',
		'icon-image-file': '&#xe92a;',
		'icon-pdf-file': '&#xe92b;',
		'icon-xls-file': '&#xe92d;',
		'icon-remove-cross': '&#xe92e;',
		'icon-yet-to-launch': '&#xe930;',
		'icon-ir-tools-only': '&#xe931;',
		'icon-failure-cross': '&#xe932;',
		'icon-ir-medium': '&#xe934;',
		'icon-ir-plus': '&#xe935;',
		'icon-ir-premium': '&#xe936;',
		'icon-ir-basic': '&#xe937;',
		'icon-success-tick': '&#xe938;',
		'icon-unchecked': '&#xe93a;',
		'icon-checked': '&#xe93b;',
		'icon-search': '&#xe93c;',
		'icon-away': '&#xe93d;',
		'icon-busy': '&#xe93e;',
		'icon-active': '&#xe93f;',
		'icon-wave': '&#xe940;',
		'icon-euroland-icon': '&#xe947;',
		'icon-euroland-icon-primary': '&#xe949;',
		'icon-Chat_Circle': '&#xe94d;',
		'icon-Mail': '&#xe94e;',
		'icon-Phone': '&#xe94f;',
		'icon-Bell_Notification': '&#xe950;',
		'icon-attachment': '&#xe954;',
		'icon-close': '&#xe955;',
		'icon-dots-horizontal-triple': '&#xe956;',
		'icon-chevron-thin-down': '&#xe957;',
		'icon-chevron-thin-right': '&#xe958;',
		'icon-calendar': '&#xe959;',
		'icon-switch': '&#xe95a;',
		'icon-profile': '&#xe961;',
		'icon-up-arrow': '&#xea3a;',
		'icon-down-arrow': '&#xea3e;',
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
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
