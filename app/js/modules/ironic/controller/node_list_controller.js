/*
 * Copyright (c) 2015 Hewlett-Packard Development Company, L.P.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/**
 * Node handling for the Ironic UI.
 */
angular.module('ironic')
  .controller('NodeListController', function($scope, IronicNode, $modal) {
    'use strict';
    var vm = this;

    // Set up controller parameters
    vm.errorMessage = null;
    vm.nodes = null;

    // Load the node list.
    vm.loadNodes = function() {
      vm.errorMessage = null;
      vm.nodes = IronicNode.query({}, function() {
        // Do nothing on success.
      }, function(error) {
        vm.errorMessage = error.data.error_message;
        vm.nodes = null;
      });
    };

    vm.enroll = function() {
      $modal.open({
        'templateUrl': 'view/ironic/enroll/index.html',
        'controller': 'EnrollModalController as ctrl',
        'backdrop': 'static'
      }).result.then(vm.loadNodes);
    };

    vm.loadNodes();
  });
