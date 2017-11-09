/* 
 *  @author    Carlos Cámara - Hepta Technologies
 *  @copyright Copyright (C) 2017 Hepta Technologies SL
 *  @license   http://www.gnu.org/licenses/gpl.html GNU/GPL
 *  @link https://extensions.hepta.es
*/
function launchModal(editor) {
	var selector = "#tweetMeModal";
	jQuery(selector).remove();
	addModalHtml(editor);
	// Will be true if bootstrap 3 is loaded, false if bootstrap 2 or no bootstrap
	var bootstrap3_enabled = (typeof jQuery().emulateTransitionEnd == 'function');
	if (bootstrap3_enabled){
		jQuery(selector).on('shown.bs.modal', function () {

		});
	}
	else {
		jQuery(selector).on('shown', function () {

		});
	}
	jQuery(selector).modal({ backdrop: true, show:true, keyboard:true, remote:'' })   // initialized with no keyboard
	
	return;
}

function getQuoteToInsert(quote)
{
	var tweetThisLink = "http://twitter.com/home/?status=" + encodeURI(quote);

	var quoteElement = jQuery("<blockquote/>")
	var paragraph = jQuery("<p></p>").text(quote)
	var button = jQuery("<a/>").attr('href', tweetThisLink).addClass('btn-link').text('Tweet Me');
	
	return jQuery('<div/>').prepend(quoteElement.prepend(paragraph.prepend(button))).html();
}

function insertText(editor){
	var quote = jQuery('#tweetme-quote').val();

	var htmlToInsert = getQuoteToInsert(quote);

	/** Use the API, if editor supports it **/
	if (window.Joomla && window.Joomla.editors && window.Joomla.editors.instances && window.Joomla.editors.instances.hasOwnProperty(editor)) {
		window.Joomla.editors.instances[editor].replaceSelection(htmlToInsert);
	} else {
		window.jInsertEditorText(htmlToInsert, editor);
	}

	jQuery('#tweetMeModal').hide();
	jQuery('.modal-backdrop').remove();
}

function addModalHtml (editor){
	// Will be true if bootstrap 3 is loaded, false if bootstrap 2 or no bootstrap
	var bootstrap3_enabled = (typeof jQuery().emulateTransitionEnd == 'function');
	if (!document.getElementById("tweetMeModal")){
		if (bootstrap3_enabled){
			tweetMeModal = '<div class="modal   fade" id="tweetMeModal" tabindex="-1" role="dialog" aria-labelledby="tweetMeModalLabel" aria-hidden="true" >'
				+'<div class="modal-dialog modal-lg">'
					+'<div class="modal-content">'
						+'<div class="modal-header">'
							+'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
							+'<h4 class="modal-title" id="tweetMeModalLabel">Tweet Me</h4>'
						+'</div>'
						+'<div class="modal-body">'
							+ '<div class="row-fluid">'
								+'<input type="textarea" id="tweetme-quote" />'
							+ '</div>'
							+ '<div class="row-fluid">'
								+'<button class="btn insertButton" onclick="insertText(\''+editor+'\')">Insert</button>'
							+ '</div>'
						+'</div>'
					+'</div>'
				+'</div>'
			+'</div>';
		}
		else {
			tweetMeModal = '<div class="modal  hide fade" id="tweetMeModal" tabindex="-1" role="dialog" aria-labelledby="tweetMeModalLabel" aria-hidden="true" >'
				+'<div class="modal-dialog modal-lg">'
					+'<div class="modal-content">'
						+'<div class="modal-header">'
							+'<button type="button" class="close"  data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
							+'<h4 class="modal-title" id="tweetMeModalLabel">Tweet Me</h4>'
						+'</div>'
						+'<div class="modal-body">'
							+ '<div class="row-fluid">'
								+ '<div class="span12">'
									+'<label>Quote:</label>'
									+'<input type="textarea" id="tweetme-quote" />'
								+ '</div>'
							+ '</div>'
							+ '<div class="row-fluid">'
								+'<button class="btn insertButton" onclick="insertText(\''+editor+'\')">Insert</button>'
							+ '</div>'
						+'</div>'
					+'</div>'
				+'</div>'
			+'</div>';
		}
		// see http://stackoverflow.com/questions/10636667/bootstrap-modal-appearing-under-background
		jQuery(tweetMeModal).appendTo("body");
	}
}
