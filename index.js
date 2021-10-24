const { Plugin } = require('powercord/entities');
const { waitFor } = require('powercord/util');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const UserModule = getModule(['getNullableCurrentUser'], false);

module.exports = class NSFWBypass extends Plugin {
   async startPlugin() {
      await waitFor('.container-3w7J-x');
      inject('nsfw-gate-bypass', UserModule, 'getCurrentUser', (_, res) => {
         if (res.nsfwAllowed == false) res.nsfwAllowed = true;
         return res;
      });
   }

   pluginWillUnload() {
      uninject('nsfw-gate-bypass');
   }
};
