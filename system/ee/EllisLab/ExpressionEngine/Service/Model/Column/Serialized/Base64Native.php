<?php

namespace EllisLab\ExpressionEngine\Service\Model\Column\Serialized;

use EllisLab\ExpressionEngine\Service\Model\Column\SerializedType;

/**
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		EllisLab Dev Team
 * @copyright	Copyright (c) 2003 - 2014, EllisLab, Inc.
 * @license		https://ellislab.com/expressionengine/user-guide/license.html
 * @link		http://ellislab.com
 * @since		Version 3.0
 * @filesource
 */

// ------------------------------------------------------------------------

/**
 * ExpressionEngine Model Base64 Encoded and Serialized Typed Column
 *
 * @package		ExpressionEngine
 * @subpackage	Model
 * @category	Service
 * @author		EllisLab Dev Team
 * @link		http://ellislab.com
 */
class Base64Native extends SerializedType {

	/**
	 * Called when the column is fetched from db
	 */
	public static function unserialize($db_data)
	{
		return strlen($db_data) ? unserialize(base64_decode($db_data)) : array();
	}

	/**
	 * Called before the column is written to the db
	 */
	public static function serialize($data)
	{
		return base64_encode(serialize($data));
	}

}