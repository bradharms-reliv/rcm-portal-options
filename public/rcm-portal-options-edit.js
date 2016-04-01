/**
 * RcmPortalOptions
 *
 * JS for editing RcmPortalOptions
 *
 * PHP version 5.3
 *
 * LICENSE: No License yet
 *
 * @category  Reliv
 * @author    Inna Davis<idavis@relivinc.com>
 * @copyright 2016 Reliv International
 * @license   License.txt New BSD License
 * @version   GIT: <git_id>
 */

var RcmPortalOptionsEdit = function (instanceId, container) {

    /**
     * Always refers to this object unlike the 'this' JS variable;
     *
     * @type {RcmNavigationEdit}
     */
    var self = this;

    /**
     * Used for creating new links
     *
     * @type {String}
     */
    var newLinkTemplate = '<div class="row portalMenuItem">'
            + '<div class="link col-xs-12">'
    + '<div class="menuItem">'
    + '<span><a href="/">Untitled Link</a></span>'
    + '</div></div></div>';


    /**
     * Called by content management system to make this plugin user-editable
     */
    self.initEdit = function () {

        //Double clicking will show properties dialog
        container.delegate('a', 'dblclick', function (event) {
            event.stopPropagation();
            self.showEditDialog($(this));
        });

        //Add right click menu
        $.contextMenu({
            selector: rcm.getPluginContainerSelector(instanceId) + ' .menuItem',
            //Here are the right click menu options
            items: {
                edit: {
                    name: 'Edit Link Properties',
                    icon: 'edit',
                    callback: function () {
                        self.showEditDialog(this, false);
                    }
                },
                separator2: "-",
                deleteLink: {
                    name: 'Delete Link',
                    icon: 'delete',
                    callback: function () {
                        var div = $(this);
                        var a = $(this).parent();
                        var divParent = div.parent();
                        $().confirm(
                            'Delete this link?<br><br>"' + a.html() + '"',
                            function () {
                                div.remove();
                                //Don't let them delete the last link
                                if (divParent.children('div').length == 0) {
                                    div.append(newLinkTemplate);
                                }
                            }
                        );
                    }
                },
                separator3: "-",
                createNew: {
                    name: 'Create New Link',
                    icon: 'edit',
                    callback: function () {
                        var newDiv = $(newLinkTemplate);
                        $(this).parent().parent().parent().append(newDiv);
                        self.showEditDialog(newDiv, true);
                    }
                }
            }
        });

        container.find('#rcmPortalOptions').sortable(
            {
                update: function () {
                },
                connectWith: rcm.getPluginContainerSelector(instanceId) + '#rcmPortalOptions'
            }
        );
    };


    /**
     * Called by content management system to get this plugins data for saving
     * on the server
     *
     * @return {Object}
     */
    self.getSaveData = function () {
        return {
           'html': container.find('#rcmPortalOptions').html()
        }
    };

    /**
     * Displays a dialog box to edit href and image src
     */
    self.showEditDialog = function (link, deleteOnClose) {

        var thisLink = '';

        if (typeof(link.children('span').children('a').html()) == 'undefined') {
            thisLink = link.children('div').children('div').children('span').children('a');
        } else {
            thisLink = link.children('span').children('a');
        }

        //Find out if this answer is 'yes' or 'no'
        var targetBlank = 'no';
        if(thisLink.attr('target') == '_self'){
            targetBlank = 'no';
        } else if (thisLink.attr('target') == '_blank') {
            targetBlank = 'yes';
        }

        var srcInput = $.dialogIn('text', 'Link Title', thisLink.html());
        var hrefInput = $.dialogIn('url', 'Link Url', thisLink.attr('href'));
        var targetBlankInput = $.dialogIn (
            'select',
            'Open in New Window?',
            {
                'no' : 'No',
                'yes': 'Yes'

            },
            targetBlank
        );

        var form = $('<form></form>')
            .addClass('simple')
            .append(srcInput, hrefInput, targetBlankInput)
            .dialog({
                title: 'Properties',
                modal: true,
                width: 620,
                buttons: {
                    Cancel: function () {
                        if (deleteOnClose == true) {
                            link.remove();
                        }
                        $(this).dialog("close");
                    },
                    Ok: function () {
                        //Get user-entered data from form
                        thisLink.text(srcInput.val());
                        thisLink.attr('href', hrefInput.val());
                        thisLink.attr('target', targetBlankInput.val());

                        $(this).dialog('close');

                        if (targetBlankInput.val() == 'yes'){
                            thisLink.attr('target', '_blank');
                        } else {
                            thisLink.removeAttr('target');
                        }
                    }
                }
            }
        );
    };
}