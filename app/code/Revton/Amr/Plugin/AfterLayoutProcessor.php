<?php

/**
 * @category  Revton
 * @package   Revton_Amr
 */

declare(strict_types=1);

namespace Revton\Amr\Plugin;

use Magento\Customer\Model\Session;
use Magento\Store\Model\StoreManagerInterface;
use Revton\Amr\Helper\Data;
use Magento\Checkout\Block\Checkout\LayoutProcessor;

class AfterLayoutProcessor
{
    /**
     * @param LayoutProcessor $subject
     * @param array $result
     * @return array
     */
    public function afterProcess(LayoutProcessor $subject, array $result): array
    {
        $result['components']['checkout']['children']['steps']['children']['shipping-step']['children']['shippingAddress']['children']['shipping-address-fieldset']['children']['telephone']['component'] = 'Magento_Ui/js/form/element/telephone';
        $result['components']['checkout']['children']['steps']['children']['shipping-step']['children']['shippingAddress']['children']['shipping-address-fieldset']['children']['telephone']['config']['elementTmpl'] = 'ui/form/element/telephone';
        $result['components']['checkout']['children']['steps']['children']['billing-step']['children']['payment']['children']['afterMethods']['children']['billing-address-form']['children']['form-fields']['children']['telephone']['component'] = 'Magento_Ui/js/form/element/telephone';
        $result['components']['checkout']['children']['steps']['children']['billing-step']['children']['payment']['children']['afterMethods']['children']['billing-address-form']['children']['form-fields']['children']['telephone']['config']['elementTmpl'] = 'ui/form/element/telephone';
        return $result;
    }
}
