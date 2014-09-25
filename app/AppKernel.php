<?php

use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Symbb\Core\InstallBundle\Kernel
{
    
    
    public function registerContainerConfiguration(\Symfony\Component\Config\Loader\LoaderInterface $loader)
    {
        $loader->load(__DIR__ . '/config/config_' . $this->getEnvironment() . '.yml');
    }

    public function registerBundles()
    {
        $parentBundles = parent::registerBundles();
        
        $bundles = array();

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            //$bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
        }

        $bundles = \array_merge($bundles, $parentBundles);

        return $bundles;
    }

    
}
