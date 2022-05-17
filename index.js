const { Plugin } = require('powercord/entities');
const { waitFor } = require('powercord/util');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const { container = null } = getModule(['container', 'customStatus'], false) || {};
const Users = getModule(['getCurrentUser', 'getUser'], false);

module.exports = class NSFWBypass extends Plugin {
   async startPlugin() {
      await waitFor(`.${container}`);
      inject('nsfw-gate-bypass', Users, 'getCurrentUser', (_, res) => {
         if (res?.nsfwAllowed === false) {
            res.nsfwAllowed = true;
         }

         return res;
      });
   }

   pluginWillUnload() {
      uninject('nsfw-gate-bypass');
   }
};
