/* global moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { DataModels } from './index.constants';
import povertyWelcome from './components/welcome';
import povertyNavbar from './components/navbar';
import povertyMap from './components/map';
import povertyFilters from './components/filters';
import povertyFamily from './components/family';
import povertyBoroughs from './components/boroughs';
import povertyAge from './components/age';
import povertyResults from './components/results';




angular.module('povertyApp', [
  //'ngAnimate',
  //'ngMapHilight',
  //'ngCookies',
  //'ngTouch',
  'ngSanitize',
  // 'ngMessages',
  // 'ngAria',
  'ui.router',
  'ui.bootstrap',
  'toastr',
  // 'wu.masonry',
  'gridster',
  povertyWelcome,
  povertyNavbar,
  povertyMap,
  povertyFilters,
  povertyFamily,
  povertyBoroughs,
  povertyAge,
  povertyResults
  ])
  .constant('moment', moment)
  .config(config)
  .constant('DataModels', DataModels)
  .config(routerConfig)
  .run(runBlock)
