<?php

namespace Demo\PageBundle\Entity\Pages;

use Demo\PageBundle\Form\Pages\HomePageAdminType;

use Doctrine\ORM\Mapping as ORM;
use Kunstmaan\NodeBundle\Entity\AbstractPage;
use Kunstmaan\PagePartBundle\Helper\HasPageTemplateInterface;
use Symfony\Component\Form\AbstractType;

/**
 * HomePage
 *
 * @ORM\Entity()
 * @ORM\Table(name="home_pages")
 */
class HomePage extends AbstractPage  implements HasPageTemplateInterface
{

    /**
     * Returns the default backend form type for this page
     *
     * @return AbstractType
     */
    public function getDefaultAdminType()
    {
        return new HomePageAdminType();
    }

    /**
     * @return array
     */
    public function getPossibleChildTypes()
    {
        return array(
            array(
                'name'  => 'ContentPage',
                'class' => 'Demo\PageBundle\Entity\Pages\ContentPage'
            ),
            array(
                'name'  => 'BehatTestPage',
                'class' => 'Demo\PageBundle\Entity\Pages\BehatTestPage'
            )
        );
    }

    /**
     * @return string[]
     */
    public function getPagePartAdminConfigurations()
    {
        return array('DemoPageBundle:middle-column', 'DemoPageBundle:left-column', 'DemoPageBundle:right-column');
    }

    /**
     * {@inheritdoc}
     */
    public function getPageTemplates()
    {
        return array('DemoPageBundle:homepage');
    }

    /**
     * @return string
     */
    public function getDefaultView()
    {
        return 'DemoPageBundle:Pages\HomePage:view.html.twig';
    }
}
