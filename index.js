const { Plugin } = require('powercord/entities');
const { waitFor } = require('powercord/util');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const UserModule = getModule(['getCurrentUser'], false);

module.exports = class NSFWBypass extends Plugin {
   async startPlugin() {
      await waitFor('.usernameContainer-1fp4nu');
      inject('nsfw-gate-bypass', UserModule, 'getCurrentUser', (_, res) => {
         if (res.nsfwAllowed == false) res.nsfwAllowed = true;
         return res;
      });
   }

   pluginWillUnload() {
      uninject('nsfw-gate-bypass');
   }
};