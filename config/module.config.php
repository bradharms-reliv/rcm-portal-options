<?php

return [

    'rcmPlugin' => [
        'RcmPortalOptions' => [
            'type' => 'Common',
            'display' => 'Portal Menu Options',
            'tooltip' => 'Portal Menu Links',
            'icon' => '',
            'editJs' => '/modules/rcm-portal-options/rcm-portal-options-edit.js',
            'defaultInstanceConfig' => include
                __DIR__ . '/defaultInstanceConfig.php'
        ],
    ],
    'view_manager' => [
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],

    'asset_manager' => [
        'resolver_configs' => [
            'aliases' => [
                'modules/rcm-portal-options/' => __DIR__ . '/../public/',
            ],
            'collections' => [
                'modules/rcm-admin/admin.css' => [
                    'modules/rcm-portal-options/styles.css'
                ],
                'modules/rcm-admin/admin.js' => [
                    'modules/rcm-portal-options/rcm-portal-options-edit.js'
                ],
            ],
        ],

    ],
];