const { Plugin } = require('powercord/entities');
const { waitFor } = require('powercord/util');
const { getModule } = require('powercord/webpack');
const { getCurrentUser } = getModule(['getCurrentUser'], false);

module.exports = class NSFWBypass extends Plugin {
   async startPlugin() {
      await waitFor('.usernameContainer-1fp4nu');
      let user = getCurrentUser();
      user._nsfwAllowed = user.nsfwAllowed;
      user.nsfwAllowed = true;
   }

   pluginWillUnload() {
      let user = getCurrentUser()
      user.nsfwAllowed = user._nsfwAllowed;
   }
}