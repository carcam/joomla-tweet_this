<?php
/**
 * @subpackage  content.tweet_this
 * 
 * @copyright   Copyright (C) 2017 Hepta Technologies SL. All rights reserved.
 * @author		Carlos Cámara - https://extensions.hepta.es
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Editor Tweet This button
 *
 * @package     Joomla.Plugin
 * @subpackage  content.tweet_this
 * @since       3.8
 */
class PlgContentTweet_this extends JPlugin
{

	/**
	 * Plugin to insert url in Tweet Me action
	 *
	 * @param   string   $context   The context of the content being passed to the plugin.
	 * @param   object   &$article  The article object.  Note $article->text is also available
	 * @param   mixed    &$params   The article params
	 * @param   integer  $page      The 'page' number
	 *
	 * @return  mixed   true if there is an error. Void otherwise.
	 *
	 * @since   1.6
	 */
	public function onContentPrepare($context, &$article, &$params, $page = 0)
	{
		// Don't run this plugin when the content is being indexed
		if ($context === 'com_finder.indexer')
		{
			return true;
		}

		// Simple performance check to determine whether bot should process further
		if (strpos($article->text, 'tweet-me-button-area') === false)
		{
			return true;
		}

		$doc = new DOMDocument();
		$doc->loadHTML('<?xml encoding="utf-8" ?>' . $article->text);
		$selector = new DOMXPath($doc);

		$result = $selector->query('//div[@class="tweet-me-button-area"]/a');

		foreach($result as $node)
		{
		    $this->replaceNode($node);
		}
		
        $article->text = str_replace('<?xml encoding="utf-8" ?>', '', $doc->saveHTML());
	}
	
	protected function replaceNode($node)
	{
	    $link = $node->getAttribute('href');
    	
        $encodedSentence = preg_replace('~(http(s)?://(www\.)?)?twitter\.com/home/\?status\=~', '', $link);
    	
    	$sentence = urldecode($encodedSentence);
    		
    	$sentence .= " Via " . JUri::base();
    		
    	$finalLink = 'https://twitter.com/home/?status=' . urlencode($sentence);
    		
    	$node->setAttribute('href',$finalLink);
	}
}
