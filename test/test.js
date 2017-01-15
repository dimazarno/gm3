/** Demo test application.  
 *
 *  WARNING! ACHTUNG! THIS IS FOR DEVELOPMENT PURPOSES ONLY!!!
 *
 */

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 GeoMoose
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


var app = new gm3.Application({
    mapserver_url: '/mapserver/cgi-bin/mapserv',
    mapfile_root: '/usr/local/geomoose/maps/'
});

app.uiUpdate = function(ui) {
    // when the UI hint is set for the service manager
    //  show the service manager tab.
    if(ui.hint == 'service-manager') {
        showTabByName('service-tab');
        app.clearHint();
    }
}

app.loadMapbook({url: 'mapbook.xml'}).then(function() {
    var tracker = new gm3.trackers.LocalStorageTracker(app.store);

    tracker.restore();

    app.registerService('identify', IdentifyService);
    app.registerService('search', SearchService);

    app.add(gm3.components.Catalog, 'catalog');
    app.add(gm3.components.Favorites, 'favorites');
    app.add(gm3.components.VisibleLayers, 'visible-layers');
    app.add(gm3.components.ServiceManager, 'service-tab', /*hasServices*/ true);
    app.add(gm3.components.Toolbar, 'toolbar');
    app.add(gm3.components.Grid, 'results-grid');
    app.add(gm3.components.Version, 'version');
    app.add(gm3.components.Map, 'map');

    tracker.startTracking();

    showTab('catalog');
    
    var feature = {
        geometry: {
            type: 'Polygon',
            coordinates: [[ 
                [-10389434,5577792],
                [-10366527,5577656],
                [-10369441,5561594],
                [-10391264,5558748],
                [-10389434,5577792]
            ]]
        }
    };

    /*
    app.dispatchQuery('identify', null,
        [
            {comparitor: 'ilike', name: 'OWNER_NAME', value: '*Pete*'}
        ],
        ['vector-parcels/ms:parcels']);
    */

});
