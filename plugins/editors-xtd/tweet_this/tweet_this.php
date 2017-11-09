<?php
/**
 * @subpackage  Editors-xtd.tweet_this
 * 
 * @copyright   Copyright (C) 2017 Hepta Technologies SL. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Editor Tweet This button
 *
 * @package     Joomla.Plugin
 * @subpackage  Editors-xtd.tweet_this
 * @since       3.8
 */
class PlgButtonTweet_this extends JPlugin
{
	/**
	 * Load the language file on instantiation.
	 *
	 * @var    boolean
	 * @since  3.1
	 */
	protected $autoloadLanguage = true;

	/**
	 * Readmore button
	 *
	 * @param   string  $name  The name of the button to add
	 *
	 * @return array A two element array of (imageName, textToInsert)
	 */
	public function onDisplay($name)
	{	
		JHtml::_('bootstrap.framework');

		JHtml::script('plg_editors-xtd_tweet_this/tweet_this.js', array('relative' => true));
		JHtml::stylesheet('plg_editors-xtd_tweet_this/tweet_this.css', array('relative' => true));

		$button = new JObject;
		$button->modal = false;
		$button->class = 'btn';
		$button->onclick = 'launchModal(\''.$name.'\');return false;';
		$button->text = JText::_('PLG_EDITORS-XTD_TWEET_THIS_BUTTON_LOAD');
		$button->name = 'tweetthis-twitter';

		// @TODO: The button writer needs to take into account the javascript directive
		// $button->link', 'javascript:void(0)');
		$button->link = '#';

		return $button;
	}
}

