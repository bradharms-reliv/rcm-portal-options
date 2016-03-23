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

var RcmPortalOptionsEdit = function (instanceId, container, pluginHandler) {

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
    + '<div class="col-xs-12">'
    + '<div class="removeItem">'
    + '<a><span class="glyphicon glyphicon-remove"></span></a>'
    + '</div>'
    + '<div class="editItem">'
    + '<a><span class="glyphicon glyphicon-pencil"></span></a>'
    + '</div>'
    + '<div class="menuItem">'
    + '<span><a href="">Untitled Link</a></span>'
    + '</div>'
    + '</div>'
    + '</div>';

    /**
     * jQuery object for the two links
     *
     * @type {Object}
     */
    //var aTags = container.find('a');

    var menuItemLink = container.find('.menuItem a');

    var removeButton = container.find('.removeItem');
    var editButton = container.find('.editItem');
    var addItem = container.find('.addNewItem');
    var tipFlyOut = container.find('.tipFlyOut');

    console.log(pluginHandler);


    /**
     * Called by content management system to make this plugin user-editable
     */
    self.initEdit = function () {

        addItem.click(function() {
            console.log('clicked');
            container.find('#rcmPortalOptions').append(newLinkTemplate);
        });


        addItem.removeClass('hidden');
        removeButton.removeClass('hidden');
        editButton.removeClass('hidden');

        editButton.hover(function () {
            tipFlyOut.removeClass('hidden');
        }, function () {
            tipFlyOut.addClass('hidden');
        });

        //Double clicking will show properties dialog
        container.dblclick(self.showEditDialog);

        //Add right click menu
        $.contextMenu({
            selector: rcm.getPluginContainerSelector(instanceId),
            //Here are the right click menu options
            items: {
                edit: {
                    name: 'Edit Properties',
                    icon: 'edit',
                    callback: function () {
                        self.showEditDialog(this);
                    }
                }

            }
        });
    };

    /**
     * Remove the elements we need for editing from the DOM
     */
    self.removeEditElements = function () {
        container.find('.tipFlyOut').remove();
        container.find('.addNew').remove();
    };

    /**
     * Called by content management system to get this plugins data for saving
     * on the server
     *
     * @return {Object}
     */
    self.getSaveData = function () {
        removeButton.addClass('hidden');
        editButton.addClass('hidden');
        self.removeEditElements();
        return {
           'html': container.find('#rcmPortalOptions').html()
        }
    };

    /**
     * Displays a dialog box to edit href and image src
     */
    self.showEditDialog = function (link) {

        console.log(link.text());
        var srcInput = $.dialogIn('text', 'Link Title', menuItemLink.text());
        var hrefInput = $.dialogIn('url', 'Link Url', menuItemLink.attr('href'));

        var form = $('<form></form>')
            .addClass('simple')
            .append(srcInput, hrefInput)
            .dialog({
                title: 'Properties',
                modal: true,
                width: 620,
                buttons: {
                    Cancel: function () {
                        $(this).dialog("close");
                    },
                    Ok: function () {

                        //Get user-entered data from form
                        menuItemLink.text(srcInput.val());
                        menuItemLink.attr('href', hrefInput.val());

                        $(this).dialog('close');
                    }
                }
            }
        );
    };
}